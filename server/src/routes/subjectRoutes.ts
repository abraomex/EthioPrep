import { Router } from 'express';
import { subjectController } from '../controllers/subjectController';

const router = Router();

// GET /api/v1/subjects (Public: filter by stream, search, pagination)
router.get('/', (req, res, next) => subjectController.getSubjects(req, res, next));

// GET /api/v1/subjects/:slug (Public: subject overview and topic tree)
router.get('/:slug', (req, res, next) => subjectController.getSubjectBySlug(req, res, next));

export default router;

