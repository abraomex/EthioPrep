import { Router } from 'express';
import { lessonController } from '../controllers/lessonController';

const router = Router();

// GET /api/v1/lessons/:id (Public free or Authenticated premium)
router.get('/:id', (req, res, next) => lessonController.getLessonById(req, res, next));

export default router;

