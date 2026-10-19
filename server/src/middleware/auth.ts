import type { Request, Response, NextFunction } from 'express';
import type { UserRole, AccessTier } from '@prisma/client';
import { verifySessionToken, SESSION_COOKIE_NAME, type UserSessionPayload } from '../lib/auth';
import { AppError } from './errorHandler';
import { prisma } from '../db/prisma';

declare global {
  namespace Express {
    interface Request {
      user?: UserSessionPayload;
    }
  }
}

/**
 * Optional authentication middleware.
 * Inspects HttpOnly cookies and Authorization Bearer headers.
 * If a valid token is present, attaches req.user without throwing if absent.
 */
export async function authenticate(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    let token = req.cookies?.[SESSION_COOKIE_NAME];

    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.substring(7).trim();
    }

    if (!token) {
      return next();
    }

    const payload = verifySessionToken(token);
    if (!payload) {
      return next();
    }

    // Attach user session payload to request
    req.user = payload;
    next();
  } catch {
    next();
  }
}

/**
 * Mandatory authentication middleware.
 * Ensures the user has a valid active session.
 */
export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  if (!req.user) {
    throw new AppError('Authentication required to access this resource', 401);
  }
  next();
}

/**
 * Role-based access control middleware (e.g. requireRole('admin')).
 */
export function requireRole(allowedRoles: UserRole | UserRole[]) {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError('Forbidden: You do not have permission to access this resource', 403);
    }

    next();
  };
}

/**
 * Helper to check entitlement between user access tier and resource access tier.
 */
export function hasEntitlement(userTier: AccessTier = 'free', resourceTier: AccessTier = 'free'): boolean {
  if (resourceTier === 'free') return true;
  return userTier === 'premium';
}

/**
 * Server-side freemium entitlement check for a specific tier requirement.
 */
export function requireEntitlement(requiredTier: AccessTier) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (requiredTier === 'free') {
      return next();
    }

    if (!req.user) {
      throw new AppError('Sign in required to access premium content', 401);
    }

    if (req.user.accessTier !== 'premium') {
      throw new AppError('This content requires an active EthioPrep Premium subscription', 403);
    }

    next();
  };
}

