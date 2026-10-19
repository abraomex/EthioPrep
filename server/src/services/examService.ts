import { prisma } from '../db/prisma';
import { AppError } from '../middleware/errorHandler';
import type { AccessTier, UserRole } from '@prisma/client';

export class ExamService {
  /**
   * Get list of published exams, optionally filtered by subject.
   */
  async getExams(subjectId?: string) {
    const where: Record<string, unknown> = {
      status: 'published',
    };
    if (subjectId) {
      where.subjectId = subjectId;
    }

    const exams = await prisma.exam.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        subject: {
          select: {
            id: true,
            titleEn: true,
            titleAm: true,
            slug: true,
            stream: true,
          },
        },
        _count: {
          select: { examQuestions: true },
        },
      },
    });

    return exams.map((exam) => ({
      id: exam.id,
      subjectId: exam.subjectId,
      titleEn: exam.titleEn,
      titleAm: exam.titleAm,
      descriptionEn: exam.descriptionEn,
      descriptionAm: exam.descriptionAm,
      durationSeconds: exam.durationSeconds,
      accessTier: exam.accessTier,
      status: exam.status,
      questionCount: exam._count.examQuestions,
      subject: exam.subject,
    }));
  }

  /**
   * Get single exam details (instructions).
   */
  async getExamById(id: string, userTier: AccessTier = 'free') {
    const exam = await prisma.exam.findUnique({
      where: { id },
      include: {
        subject: {
          select: {
            id: true,
            titleEn: true,
            titleAm: true,
            slug: true,
            stream: true,
          },
        },
        _count: {
          select: { examQuestions: true },
        },
      },
    });

    if (!exam || exam.status !== 'published') {
      throw new AppError('Exam not found or is currently unavailable', 404);
    }

    // Check freemium entitlement
    if (exam.accessTier === 'premium' && userTier !== 'premium') {
      throw new AppError('This exam requires an active EthioPrep Premium subscription', 403);
    }

    return {
      id: exam.id,
      subjectId: exam.subjectId,
      titleEn: exam.titleEn,
      titleAm: exam.titleAm,
      descriptionEn: exam.descriptionEn,
      descriptionAm: exam.descriptionAm,
      durationSeconds: exam.durationSeconds,
      accessTier: exam.accessTier,
      status: exam.status,
      questionCount: exam._count.examQuestions,
      subject: exam.subject,
    };
  }

  /**
   * Start a new timed exam attempt.
   * CRITICAL: Strips isCorrect from options and explanations from questions.
   */
  async startAttempt(examId: string, userId: string, userTier: AccessTier = 'free') {
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
        examQuestions: {
          orderBy: { sortOrder: 'asc' },
          include: {
            question: {
              include: {
                options: {
                  orderBy: { sortOrder: 'asc' },
                },
              },
            },
          },
        },
      },
    });

    if (!exam || exam.status !== 'published') {
      throw new AppError('Exam not found or unavailable', 404);
    }

    // Freemium check
    if (exam.accessTier === 'premium' && userTier !== 'premium') {
      throw new AppError('This exam requires an active EthioPrep Premium subscription', 403);
    }

    if (exam.examQuestions.length === 0) {
      throw new AppError('This exam currently has no questions assigned', 400);
    }

    // Check for an already active non-expired attempt
    const existingActiveAttempt = await prisma.attempt.findFirst({
      where: {
        examId,
        userId,
        status: 'active',
        expiresAt: { gt: new Date() },
      },
      include: {
        answers: true,
      },
    });

    // Compute duration + 60s network grace period
    const startedAt = new Date();
    const networkGraceSeconds = 60;
    const expiresAt = new Date(startedAt.getTime() + (exam.durationSeconds + networkGraceSeconds) * 1000);

    const totalMaxScore = exam.examQuestions.reduce((acc, eq) => acc + eq.points, 0);

    // Reuse existing attempt if still active, or create a new one
    const attempt = existingActiveAttempt || await prisma.attempt.create({
      data: {
        examId,
        userId,
        startedAt,
        expiresAt,
        status: 'active',
        maxScore: totalMaxScore,
      },
    });

    // Map questions and STRIP answers/explanations
    const sanitizedQuestions = exam.examQuestions.map((eq, index) => {
      const q = eq.question;
      return {
        id: q.id,
        index: index + 1,
        sortOrder: eq.sortOrder,
        points: eq.points,
        topicId: q.topicId,
        promptEn: q.promptEn,
        promptAm: q.promptAm,
        difficulty: q.difficulty,
        // STRICTLY OMIT explanationEn and explanationAm!
        options: q.options.map((opt) => ({
          id: opt.id,
          label: opt.label,
          textEn: opt.textEn,
          textAm: opt.textAm,
          sortOrder: opt.sortOrder,
          // STRICTLY OMIT isCorrect!
        })),
      };
    });

    return {
      attempt: {
        id: attempt.id,
        examId: attempt.examId,
        startedAt: attempt.startedAt,
        expiresAt: attempt.expiresAt,
        status: attempt.status,
        durationSeconds: exam.durationSeconds,
      },
      exam: {
        id: exam.id,
        titleEn: exam.titleEn,
        titleAm: exam.titleAm,
        durationSeconds: exam.durationSeconds,
        questionCount: sanitizedQuestions.length,
      },
      questions: sanitizedQuestions,
      draftAnswers: existingActiveAttempt?.answers.map((a) => ({
        questionId: a.questionId,
        selectedOptionId: a.selectedOptionId,
      })) || [],
    };
  }

  /**
   * Buffer draft answers for an active attempt.
   */
  async saveDraftAnswers(
    attemptId: string,
    userId: string,
    answers: Array<{ questionId: string; selectedOptionId: string | null }>
  ) {
    const attempt = await prisma.attempt.findUnique({
      where: { id: attemptId },
    });

    if (!attempt) {
      throw new AppError('Attempt not found', 404);
    }

    if (attempt.userId !== userId) {
      throw new AppError('Forbidden: Not authorized to modify this attempt', 403);
    }

    if (attempt.status !== 'active') {
      throw new AppError(`Cannot save answers to an attempt that is ${attempt.status}`, 400);
    }

    // Check if time has expired
    if (new Date() > attempt.expiresAt) {
      await prisma.attempt.update({
        where: { id: attemptId },
        data: { status: 'expired' },
      });
      throw new AppError('Exam time limit has expired. Answers can no longer be saved.', 403);
    }

    // Batch upsert answers
    for (const ans of answers) {
      await prisma.attemptAnswer.upsert({
        where: {
          attemptId_questionId: {
            attemptId,
            questionId: ans.questionId,
          },
        },
        update: {
          selectedOptionId: ans.selectedOptionId,
        },
        create: {
          attemptId,
          questionId: ans.questionId,
          selectedOptionId: ans.selectedOptionId,
        },
      });
    }

    return { success: true, savedCount: answers.length };
  }

  /**
   * Submit and grade the exam attempt inside a single PostgreSQL transaction.
   */
  async submitAttempt(
    attemptId: string,
    userId: string,
    submittedAnswers: Array<{ questionId: string; selectedOptionId: string | null }>
  ) {
    const attempt = await prisma.attempt.findUnique({
      where: { id: attemptId },
      include: {
        exam: {
          include: {
            examQuestions: {
              include: {
                question: {
                  include: {
                    options: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!attempt) {
      throw new AppError('Attempt not found', 404);
    }

    if (attempt.userId !== userId) {
      throw new AppError('Forbidden: Not authorized to submit this attempt', 403);
    }

    if (attempt.status !== 'active') {
      throw new AppError(`Attempt has already been ${attempt.status}`, 400);
    }

    // Verify time limit (with additional 30 seconds for latency)
    const now = new Date();
    const submissionDeadline = new Date(attempt.expiresAt.getTime() + 30_000);
    const isExpired = now > submissionDeadline;

    // Execute grading and update inside a PostgreSQL transaction
    return await prisma.$transaction(async (tx) => {
      let totalScore = 0;
      let totalMaxScore = 0;
      const answerRecords = [];

      for (const eq of attempt.exam.examQuestions) {
        const question = eq.question;
        totalMaxScore += eq.points;

        // Find student submission for this question
        const submitted = submittedAnswers.find((a) => a.questionId === question.id);
        const selectedOptionId = submitted?.selectedOptionId || null;

        // Find the true correct option
        const correctOption = question.options.find((opt) => opt.isCorrect);
        const isCorrect = Boolean(
          selectedOptionId && correctOption && selectedOptionId === correctOption.id
        );
        const pointsAwarded = isCorrect ? eq.points : 0;
        totalScore += pointsAwarded;

        answerRecords.push({
          attemptId,
          questionId: question.id,
          selectedOptionId,
          isCorrect,
          pointsAwarded,
        });
      }

      // Persist all graded answers
      for (const record of answerRecords) {
        await tx.attemptAnswer.upsert({
          where: {
            attemptId_questionId: {
              attemptId: record.attemptId,
              questionId: record.questionId,
            },
          },
          update: {
            selectedOptionId: record.selectedOptionId,
            isCorrect: record.isCorrect,
            pointsAwarded: record.pointsAwarded,
          },
          create: record,
        });
      }

      const finalStatus = isExpired ? 'expired' : 'submitted';

      // Update attempt
      const updatedAttempt = await tx.attempt.update({
        where: { id: attemptId },
        data: {
          score: totalScore,
          maxScore: totalMaxScore,
          submittedAt: now,
          status: finalStatus,
        },
      });

      const percentage = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;

      return {
        attemptId: updatedAttempt.id,
        examId: attempt.examId,
        score: totalScore,
        maxScore: totalMaxScore,
        percentage,
        status: updatedAttempt.status,
        submittedAt: updatedAttempt.submittedAt,
        durationSeconds: Math.round((now.getTime() - attempt.startedAt.getTime()) / 1000),
      };
    });
  }

  /**
   * Get graded attempt results with full explanations and topic analysis.
   */
  async getAttemptResults(attemptId: string, userId: string, userRole: UserRole) {
    const attempt = await prisma.attempt.findUnique({
      where: { id: attemptId },
      include: {
        exam: {
          include: {
            subject: {
              select: {
                id: true,
                titleEn: true,
                titleAm: true,
                slug: true,
              },
            },
            examQuestions: {
              orderBy: { sortOrder: 'asc' },
              include: {
                question: {
                  include: {
                    options: {
                      orderBy: { sortOrder: 'asc' },
                    },
                    topic: {
                      select: {
                        id: true,
                        titleEn: true,
                        titleAm: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        answers: true,
      },
    });

    if (!attempt) {
      throw new AppError('Attempt not found', 404);
    }

    // Security check: only the student who took the test or an admin can view results
    if (attempt.userId !== userId && userRole !== 'admin') {
      throw new AppError('Forbidden: Not authorized to view these results', 403);
    }

    if (attempt.status === 'active') {
      throw new AppError('Attempt is still active and has not been submitted yet', 400);
    }

    const answerMap = new Map<string, { selectedOptionId: string | null; isCorrect: boolean | null; pointsAwarded: number }>();
    for (const ans of attempt.answers) {
      answerMap.set(ans.questionId, {
        selectedOptionId: ans.selectedOptionId,
        isCorrect: ans.isCorrect,
        pointsAwarded: ans.pointsAwarded ?? 0,
      });
    }

    // Build question reviews and topic breakdown
    const topicStats = new Map<string, { topicId: string; titleEn: string; titleAm: string; total: number; correct: number }>();

    const questionReviews = attempt.exam.examQuestions.map((eq, index) => {
      const q = eq.question;
      const studentAnswer = answerMap.get(q.id);
      const selectedOptionId = studentAnswer?.selectedOptionId || null;
      const isCorrect = studentAnswer?.isCorrect || false;

      // Update topic stats
      const topic = q.topic;
      const existing = topicStats.get(topic.id) || {
        topicId: topic.id,
        titleEn: topic.titleEn,
        titleAm: topic.titleAm,
        total: 0,
        correct: 0,
      };
      existing.total += 1;
      if (isCorrect) existing.correct += 1;
      topicStats.set(topic.id, existing);

      return {
        id: q.id,
        index: index + 1,
        promptEn: q.promptEn,
        promptAm: q.promptAm,
        explanationEn: q.explanationEn,
        explanationAm: q.explanationAm,
        points: eq.points,
        pointsAwarded: studentAnswer?.pointsAwarded || 0,
        isCorrect,
        selectedOptionId,
        topic: {
          id: topic.id,
          titleEn: topic.titleEn,
          titleAm: topic.titleAm,
        },
        options: q.options.map((opt) => ({
          id: opt.id,
          label: opt.label,
          textEn: opt.textEn,
          textAm: opt.textAm,
          isCorrect: opt.isCorrect,
        })),
      };
    });

    const topicBreakdown = Array.from(topicStats.values()).map((t) => ({
      ...t,
      percentage: t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0,
    }));

    const score = attempt.score ?? 0;
    const maxScore = attempt.maxScore ?? 0;
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    const timeTakenSeconds = attempt.submittedAt
      ? Math.round((attempt.submittedAt.getTime() - attempt.startedAt.getTime()) / 1000)
      : attempt.exam.durationSeconds;

    return {
      attemptId: attempt.id,
      examId: attempt.examId,
      examTitleEn: attempt.exam.titleEn,
      examTitleAm: attempt.exam.titleAm,
      subject: attempt.exam.subject,
      status: attempt.status,
      score,
      maxScore,
      percentage,
      timeTakenSeconds,
      startedAt: attempt.startedAt,
      submittedAt: attempt.submittedAt,
      topicBreakdown,
      questions: questionReviews,
    };
  }
}

export const examService = new ExamService();
