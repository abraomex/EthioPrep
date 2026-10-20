import { Router } from 'express';
import { examController } from '../controllers/examController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', (req, res, next) => {
  examController.getExams(req, res, next);
});

router.get('/:id', (req, res, next) => {
  examController.getExamById(req, res, next);
});

router.post('/:id/attempts', requireAuth, (req, res, next) => {
  examController.startAttempt(req, res, next);
});

export default router;

