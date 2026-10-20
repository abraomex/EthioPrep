import { prisma } from '../db/prisma';
import { AppError } from '../middleware/errorHandler';
import type { CreateSubject, CreateTopic, CreateLesson, CreateQuestion, CreateExam } from '../schemas';

export class AdminService {
  /**
   * Get overview statistics for the admin dashboard.
   */
  async getOverviewStats() {
    const [
      totalUsers,
      totalSubjects,
      totalTopics,
      totalLessons,
      publishedLessons,
      totalQuestions,
      totalExams,
      totalAttempts,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.subject.count(),
      prisma.topic.count(),
      prisma.lesson.count(),
      prisma.lesson.count({ where: { status: 'published' } }),
      prisma.question.count(),
      prisma.exam.count(),
      prisma.attempt.count(),
    ]);

    return {
      totalUsers,
      totalSubjects,
      totalTopics,
      totalLessons,
      publishedLessons,
      totalQuestions,
      totalExams,
      totalAttempts,
    };
  }

  // --- Subject Management ---

  async createSubject(data: CreateSubject) {
    const existing = await prisma.subject.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      throw new AppError('Subject with this slug already exists', 409);
    }

    return await prisma.subject.create({
      data: {
        slug: data.slug,
        stream: data.stream,
        titleEn: data.titleEn,
        titleAm: data.titleAm,
        descriptionEn: data.descriptionEn,
        descriptionAm: data.descriptionAm,
        sortOrder: data.sortOrder,
        published: data.published,
      },
    });
  }

  async updateSubject(id: string, data: Partial<CreateSubject>) {
    const subject = await prisma.subject.findUnique({ where: { id } });
    if (!subject) throw new AppError('Subject not found', 404);

    return await prisma.subject.update({
      where: { id },
      data,
    });
  }

  async deleteSubject(id: string) {
    const subject = await prisma.subject.findUnique({ where: { id } });
    if (!subject) throw new AppError('Subject not found', 404);

    return await prisma.subject.delete({ where: { id } });
  }

  // --- Topic Management ---

  async createTopic(data: CreateTopic) {
    return await prisma.topic.create({
      data: {
        subjectId: data.subjectId,
        parentTopicId: data.parentTopicId || null,
        titleEn: data.titleEn,
        titleAm: data.titleAm,
        sortOrder: data.sortOrder,
        published: data.published,
      },
    });
  }

  async updateTopic(id: string, data: Partial<CreateTopic>) {
    const topic = await prisma.topic.findUnique({ where: { id } });
    if (!topic) throw new AppError('Topic not found', 404);

    return await prisma.topic.update({
      where: { id },
      data,
    });
  }

  async deleteTopic(id: string) {
    const topic = await prisma.topic.findUnique({ where: { id } });
    if (!topic) throw new AppError('Topic not found', 404);

    return await prisma.topic.delete({ where: { id } });
  }

  // --- Lesson Management ---

  async getLessons(options: { topicId?: string; status?: string; search?: string } = {}) {
    const where: Record<string, unknown> = {};
    if (options.topicId) where.topicId = options.topicId;
    if (options.status) where.status = options.status;
    if (options.search) {
      where.OR = [
        { titleEn: { contains: options.search, mode: 'insensitive' } },
        { titleAm: { contains: options.search } },
      ];
    }

    return await prisma.lesson.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
      include: {
        topic: {
          select: {
            id: true,
            titleEn: true,
            titleAm: true,
            subject: {
              select: { id: true, titleEn: true, titleAm: true },
            },
          },
        },
      },
    });
  }

  async createLesson(data: CreateLesson) {
    return await prisma.lesson.create({
      data: {
        topicId: data.topicId,
        titleEn: data.titleEn,
        titleAm: data.titleAm,
        bodyEn: data.bodyEn,
        bodyAm: data.bodyAm,
        status: data.status,
        accessTier: data.accessTier,
        estimatedMinutes: data.estimatedMinutes,
        sortOrder: data.sortOrder,
      },
    });
  }

  async updateLesson(id: string, data: Partial<CreateLesson>) {
    const lesson = await prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new AppError('Lesson not found', 404);

    return await prisma.lesson.update({
      where: { id },
      data,
    });
  }

  async deleteLesson(id: string) {
    const lesson = await prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new AppError('Lesson not found', 404);

    return await prisma.lesson.delete({ where: { id } });
  }

  // --- Question Bank Management ---

  async getQuestions(options: { topicId?: string; difficulty?: string; search?: string } = {}) {
    const where: Record<string, unknown> = {};
    if (options.topicId) where.topicId = options.topicId;
    if (options.difficulty) where.difficulty = options.difficulty;
    if (options.search) {
      where.OR = [
        { promptEn: { contains: options.search, mode: 'insensitive' } },
        { promptAm: { contains: options.search } },
      ];
    }

    return await prisma.question.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        options: { orderBy: { sortOrder: 'asc' } },
        topic: {
          select: {
            id: true,
            titleEn: true,
            titleAm: true,
            subject: { select: { id: true, titleEn: true } },
          },
        },
      },
    });
  }

  async createQuestion(data: CreateQuestion) {
    return await prisma.question.create({
      data: {
        topicId: data.topicId,
        promptEn: data.promptEn,
        promptAm: data.promptAm,
        explanationEn: data.explanationEn,
        explanationAm: data.explanationAm,
        difficulty: data.difficulty,
        status: data.status,
        options: {
          create: data.options.map((opt) => ({
            label: opt.label,
            textEn: opt.textEn,
            textAm: opt.textAm,
            sortOrder: opt.sortOrder,
            isCorrect: opt.isCorrect,
          })),
        },
      },
      include: { options: true },
    });
  }

  async updateQuestion(id: string, data: Partial<CreateQuestion>) {
    const question = await prisma.question.findUnique({ where: { id } });
    if (!question) throw new AppError('Question not found', 404);

    const { options, ...rest } = data;

    return await prisma.$transaction(async (tx) => {
      if (options && options.length > 0) {
        // Delete existing options and recreate
        await tx.questionOption.deleteMany({ where: { questionId: id } });
        await tx.questionOption.createMany({
          data: options.map((opt) => ({
            questionId: id,
            label: opt.label,
            textEn: opt.textEn,
            textAm: opt.textAm,
            sortOrder: opt.sortOrder,
            isCorrect: opt.isCorrect,
          })),
        });
      }

      return await tx.question.update({
        where: { id },
        data: rest,
        include: { options: true },
      });
    });
  }

  async deleteQuestion(id: string) {
    const question = await prisma.question.findUnique({ where: { id } });
    if (!question) throw new AppError('Question not found', 404);

    return await prisma.question.delete({ where: { id } });
  }

  // --- Exam Builder Management ---

  async createExam(data: CreateExam) {
    const { questionIds, ...examData } = data;

    return await prisma.exam.create({
      data: {
        subjectId: examData.subjectId,
        titleEn: examData.titleEn,
        titleAm: examData.titleAm,
        descriptionEn: examData.descriptionEn,
        descriptionAm: examData.descriptionAm,
        durationSeconds: examData.durationSeconds,
        accessTier: examData.accessTier,
        status: examData.status,
        examQuestions: {
          create: questionIds.map((qid, idx) => ({
            questionId: qid,
            sortOrder: idx + 1,
            points: 1, // default 1 point per question
          })),
        },
      },
      include: {
        examQuestions: {
          include: { question: true },
        },
      },
    });
  }

  async updateExam(id: string, data: Partial<CreateExam>) {
    const exam = await prisma.exam.findUnique({ where: { id } });
    if (!exam) throw new AppError('Exam not found', 404);

    const { questionIds, ...examData } = data;

    return await prisma.$transaction(async (tx) => {
      if (questionIds) {
        await tx.examQuestion.deleteMany({ where: { examId: id } });
        await tx.examQuestion.createMany({
          data: questionIds.map((qid, idx) => ({
            examId: id,
            questionId: qid,
            sortOrder: idx + 1,
            points: 1,
          })),
        });
      }

      return await tx.exam.update({
        where: { id },
        data: examData,
      });
    });
  }

  async deleteExam(id: string) {
    const exam = await prisma.exam.findUnique({ where: { id } });
    if (!exam) throw new AppError('Exam not found', 404);

    return await prisma.exam.delete({ where: { id } });
  }
}

export const adminService = new AdminService();

