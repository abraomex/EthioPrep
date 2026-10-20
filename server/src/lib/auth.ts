import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import type { Response } from 'express';
import type { UserRole, Stream, Language, AccessTier } from '@prisma/client';

export interface UserSessionPayload {
  userId: string;
  email: string;
  role: UserRole;
  stream: Stream;
  preferredLanguage: Language;
  accessTier: AccessTier;
}

export const SESSION_COOKIE_NAME = 'ethioprep_session';

const JWT_SECRET = process.env.SESSION_SECRET || 'ethioprep-super-secret-development-key-32chars';
const SESSION_EXPIRATION = '7d';

/**
 * Hash a plain-text password using Argon2id.
 */
export async function hashPassword(plainText: string): Promise<string> {
  return argon2.hash(plainText, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16, // 64 MB
    timeCost: 3,
    parallelism: 1,
  });
}

/**
 * Verify a plain-text password against an Argon2 hash.
 */
export async function verifyPassword(hash: string, plainText: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, plainText);
  } catch {
    return false;
  }
}

/**
 * Create a signed JWT session token.
 */
export function createSessionToken(payload: UserSessionPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: SESSION_EXPIRATION,
  });
}

/**
 * Verify and decode a JWT session token.
 */
export function verifySessionToken(token: string): UserSessionPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserSessionPayload & { exp: number };
    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      stream: decoded.stream,
      preferredLanguage: decoded.preferredLanguage,
      accessTier: decoded.accessTier,
    };
  } catch {
    return null;
  }
}

/**
 * Attach an HttpOnly secure session cookie to the response.
 */
export function setSessionCookie(res: Response, token: string): void {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: '/',
  });
}

/**
 * Clear the session cookie from the client.
 */
export function clearSessionCookie(res: Response): void {
  const isProduction = process.env.NODE_ENV === 'production';
  res.clearCookie(SESSION_COOKIE_NAME, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    path: '/',
  });
}

