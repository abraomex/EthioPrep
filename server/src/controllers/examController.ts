import type { Request, Response, NextFunction } from 'express';
import { examService } from '../services/examService';

export class ExamController {
  async getExams(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const subjectId = req.query.subjectId as string | undefined;
      const exams = await examService.getExams(subjectId);
      res.status(200).json({
        success: true,
        data: exams,
      });
    } catch (error) {
      next(error);
    }
  }

  async getExamById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const userTier = req.user?.accessTier || 'free';
      const exam = await examService.getExamById(id, userTier);
      res.status(200).json({
        success: true,
        data: exam,
      });
    } catch (error) {
      next(error);
    }
  }

  async startAttempt(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const examId = req.params.id as string;
      const userId = req.user!.userId;
      const userTier = req.user!.accessTier;

      const data = await examService.startAttempt(examId, userId, userTier);
      res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async saveDraftAnswers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const attemptId = req.params.id as string;
      const userId = req.user!.userId;
      const answers = req.body.answers || [];

      const result = await examService.saveDraftAnswers(attemptId, userId, answers);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async submitAttempt(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const attemptId = req.params.id as string;
      const userId = req.user!.userId;
      const answers = req.body.answers || [];

      const result = await examService.submitAttempt(attemptId, userId, answers);
      res.status(200).json({
        success: true,
        message: 'Exam submitted and graded successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getResults(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const attemptId = req.params.id as string;
      const userId = req.user!.userId;
      const userRole = req.user!.role;

      const results = await examService.getAttemptResults(attemptId, userId, userRole);
      res.status(200).json({
        success: true,
        data: results,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const examController = new ExamController();

