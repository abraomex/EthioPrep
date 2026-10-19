import { Router } from 'express';
import authRoutes from './authRoutes';
import subjectRoutes from './subjectRoutes';
import lessonRoutes from './lessonRoutes';
import examRoutes from './examRoutes';
import attemptRoutes from './attemptRoutes';

const router = Router();

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'EthioPrep Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Mount module routes
router.use('/auth', authRoutes);
router.use('/subjects', subjectRoutes);
router.use('/lessons', lessonRoutes);
router.use('/exams', examRoutes);
router.use('/attempts', attemptRoutes);

export default router;
