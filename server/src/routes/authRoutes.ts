import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validate } from '../middleware/validate';
import { authLimiter } from '../middleware/rateLimit';
import { requireAuth } from '../middleware/auth';
import { RegisterRequestSchema, LoginRequestSchema } from '../schemas';

const router = Router();

router.post('/register', authLimiter, validate(RegisterRequestSchema), (req, res, next) => {
  authController.register(req, res, next);
});

router.post('/login', authLimiter, validate(LoginRequestSchema), (req, res, next) => {
  authController.login(req, res, next);
});

router.post('/logout', (req, res, next) => {
  authController.logout(req, res, next);
});

router.get('/me', requireAuth, (req, res, next) => {
  authController.getMe(req, res, next);
});

export default router;

