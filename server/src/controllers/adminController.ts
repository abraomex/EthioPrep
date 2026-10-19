import type { Request, Response, NextFunction } from 'express';
import { adminService } from '../services/adminService';

export class AdminController {
  async getOverviewStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await adminService.getOverviewStats();
      res.status(200).json({ success: true, data: stats });
    } catch (error) {
      next(error);
    }
  }

  // Subjects
  async createSubject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const subject = await adminService.createSubject(req.body);
      res.status(201).json({ success: true, data: subject });
    } catch (error) {
      next(error);
    }
  }

  async updateSubject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const subject = await adminService.updateSubject(id, req.body);
      res.status(200).json({ success: true, data: subject });
    } catch (error) {
      next(error);
    }
  }

  async deleteSubject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      await adminService.deleteSubject(id);
      res.status(200).json({ success: true, message: 'Subject deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  // Topics
  async createTopic(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const topic = await adminService.createTopic(req.body);
      res.status(201).json({ success: true, data: topic });
    } catch (error) {
      next(error);
    }
  }

  async updateTopic(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const topic = await adminService.updateTopic(id, req.body);
      res.status(200).json({ success: true, data: topic });
    } catch (error) {
      next(error);
    }
  }

  async deleteTopic(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      await adminService.deleteTopic(id);
      res.status(200).json({ success: true, message: 'Topic deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  // Lessons
  async getLessons(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const topicId = req.query.topicId as string | undefined;
      const status = req.query.status as string | undefined;
      const search = req.query.search as string | undefined;

      const lessons = await adminService.getLessons({ topicId, status, search });
      res.status(200).json({ success: true, data: lessons });
    } catch (error) {
      next(error);
    }
  }

  async createLesson(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const lesson = await adminService.createLesson(req.body);
      res.status(201).json({ success: true, data: lesson });
    } catch (error) {
      next(error);
    }
  }

  async updateLesson(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const lesson = await adminService.updateLesson(id, req.body);
      res.status(200).json({ success: true, data: lesson });
    } catch (error) {
      next(error);
    }
  }

  async deleteLesson(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      await adminService.deleteLesson(id);
      res.status(200).json({ success: true, message: 'Lesson deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  // Questions
  async getQuestions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const topicId = req.query.topicId as string | undefined;
      const difficulty = req.query.difficulty as string | undefined;
      const search = req.query.search as string | undefined;

      const questions = await adminService.getQuestions({ topicId, difficulty, search });
      res.status(200).json({ success: true, data: questions });
    } catch (error) {
      next(error);
    }
  }

  async createQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const question = await adminService.createQuestion(req.body);
      res.status(201).json({ success: true, data: question });
    } catch (error) {
      next(error);
    }
  }

  async updateQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const question = await adminService.updateQuestion(id, req.body);
      res.status(200).json({ success: true, data: question });
    } catch (error) {
      next(error);
    }
  }

  async deleteQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      await adminService.deleteQuestion(id);
      res.status(200).json({ success: true, message: 'Question deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  // Exams
  async createExam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const exam = await adminService.createExam(req.body);
      res.status(201).json({ success: true, data: exam });
    } catch (error) {
      next(error);
    }
  }

  async updateExam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const exam = await adminService.updateExam(id, req.body);
      res.status(200).json({ success: true, data: exam });
    } catch (error) {
      next(error);
    }
  }

  async deleteExam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      await adminService.deleteExam(id);
      res.status(200).json({ success: true, message: 'Exam deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export const adminController = new AdminController();

