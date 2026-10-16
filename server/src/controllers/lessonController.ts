import type { Request, Response, NextFunction } from 'express';
import { lessonService } from '../services/lessonService';

export class LessonController {
  async getLessonById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      // In Stage 6, unauthenticated or free tier defaults to 'free'; in Stage 7 session auth will inject req.user
      const userTier = (req as unknown as { user?: { accessTier: 'free' | 'premium' } }).user?.accessTier || 'free';

      const lesson = await lessonService.getLessonById(id, userTier);

      res.json({
        success: true,
        data: lesson,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const lessonController = new LessonController();
