import type { Request, Response, NextFunction } from 'express';
import { subjectService } from '../services/subjectService';

export class SubjectController {
  async getSubjects(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : 20;
      const stream = req.query.stream as string | undefined;
      const search = req.query.search as string | undefined;

      const result = await subjectService.getSubjects({
        page,
        pageSize,
        stream,
        search,
      });

      res.json({
        success: true,
        data: result.subjects,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  async getSubjectBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = req.params.slug as string;
      const subject = await subjectService.getSubjectBySlug(slug);

      res.json({
        success: true,
        data: subject,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const subjectController = new SubjectController();
