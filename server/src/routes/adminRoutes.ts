import { Router } from 'express';
import { adminController } from '../controllers/adminController';
import { requireAuth, requireRole } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  CreateSubjectSchema,
  CreateTopicSchema,
  CreateLessonSchema,
  CreateQuestionSchema,
  CreateExamSchema,
} from '../schemas';

const router = Router();

// Protect ALL admin routes: must be authenticated and have role === 'admin'
router.use(requireAuth, requireRole('admin'));

// Stats Overview
router.get('/stats', (req, res, next) => {
  adminController.getOverviewStats(req, res, next);
});

// Subject CRUD
router.post('/subjects', validate(CreateSubjectSchema), (req, res, next) => {
  adminController.createSubject(req, res, next);
});
router.put('/subjects/:id', (req, res, next) => {
  adminController.updateSubject(req, res, next);
});
router.delete('/subjects/:id', (req, res, next) => {
  adminController.deleteSubject(req, res, next);
});

// Topic CRUD
router.post('/topics', validate(CreateTopicSchema), (req, res, next) => {
  adminController.createTopic(req, res, next);
});
router.put('/topics/:id', (req, res, next) => {
  adminController.updateTopic(req, res, next);
});
router.delete('/topics/:id', (req, res, next) => {
  adminController.deleteTopic(req, res, next);
});

// Lesson CRUD
router.get('/lessons', (req, res, next) => {
  adminController.getLessons(req, res, next);
});
router.post('/lessons', validate(CreateLessonSchema), (req, res, next) => {
  adminController.createLesson(req, res, next);
});
router.put('/lessons/:id', (req, res, next) => {
  adminController.updateLesson(req, res, next);
});
router.delete('/lessons/:id', (req, res, next) => {
  adminController.deleteLesson(req, res, next);
});

// Question Bank CRUD
router.get('/questions', (req, res, next) => {
  adminController.getQuestions(req, res, next);
});
router.post('/questions', validate(CreateQuestionSchema), (req, res, next) => {
  adminController.createQuestion(req, res, next);
});
router.put('/questions/:id', (req, res, next) => {
  adminController.updateQuestion(req, res, next);
});
router.delete('/questions/:id', (req, res, next) => {
  adminController.deleteQuestion(req, res, next);
});

// Exam Builder CRUD
router.post('/exams', validate(CreateExamSchema), (req, res, next) => {
  adminController.createExam(req, res, next);
});
router.put('/exams/:id', (req, res, next) => {
  adminController.updateExam(req, res, next);
});
router.delete('/exams/:id', (req, res, next) => {
  adminController.deleteExam(req, res, next);
});

export default router;

