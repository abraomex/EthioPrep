import type { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';
import { setSessionCookie, clearSessionCookie } from '../lib/auth';
import type { RegisterRequest, LoginRequest } from '../schemas';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: RegisterRequest = req.body;
      const { user, token } = await authService.register(data);

      setSessionCookie(res, token);

      res.status(201).json({
        success: true,
        message: 'Account created successfully',
        data: {
          user,
          token, // also return token for API/mobile clients
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: LoginRequest = req.body;
      const { user, token } = await authService.login(data);

      setSessionCookie(res, token);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      clearSessionCookie(res);
      res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Not authenticated' });
        return;
      }

      const user = await authService.getCurrentUser(req.user.userId);

      res.status(200).json({
        success: true,
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();

