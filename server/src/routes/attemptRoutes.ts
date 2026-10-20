import { Router } from 'express';
import { examController } from '../controllers/examController';
import { requireAuth } from '../middleware/auth';
import { examSubmissionLimiter } from '../middleware/rateLimit';
import { validate } from '../middleware/validate';
import { SubmitAttemptSchema } from '../schemas';

const router = Router();

router.put('/:id/answers', requireAuth, examSubmissionLimiter, validate(SubmitAttemptSchema), (req, res, next) => {
  examController.saveDraftAnswers(req, res, next);
});

router.post('/:id/submit', requireAuth, examSubmissionLimiter, validate(SubmitAttemptSchema), (req, res, next) => {
  examController.submitAttempt(req, res, next);
});

router.get('/:id/results', requireAuth, (req, res, next) => {
  examController.getResults(req, res, next);
});

export default router;

