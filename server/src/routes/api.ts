import { Router } from 'express';
import subjectRoutes from './subjectRoutes';
import lessonRoutes from './lessonRoutes';

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

// Resource routes
router.use('/subjects', subjectRoutes);
router.use('/lessons', lessonRoutes);

export default router;

