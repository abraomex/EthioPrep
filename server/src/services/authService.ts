import { prisma } from '../db/prisma';
import { hashPassword, verifyPassword, createSessionToken, type UserSessionPayload } from '../lib/auth';
import { AppError } from '../middleware/errorHandler';
import type { RegisterRequest, LoginRequest } from '../schemas';

export class AuthService {
  async register(data: RegisterRequest) {
    const normalizedEmail = data.email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw new AppError('An account with this email already exists', 409);
    }

    // Hash password with Argon2id
    const passwordHash = await hashPassword(data.password);

    // Create user in PostgreSQL
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        displayName: data.displayName.trim(),
        role: 'student',
        stream: data.stream,
        preferredLanguage: data.preferredLanguage,
        accessTier: 'free',
      },
      select: {
        id: true,
        email: true,
        displayName: true,
        role: true,
        stream: true,
        preferredLanguage: true,
        accessTier: true,
        createdAt: true,
      },
    });

    // Create session token
    const token = createSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      stream: user.stream,
      preferredLanguage: user.preferredLanguage,
      accessTier: user.accessTier,
    });

    return { user, token };
  }

  async login(data: LoginRequest) {
    const normalizedEmail = data.email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isValid = await verifyPassword(user.passwordHash, data.password);
    if (!isValid) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = createSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      stream: user.stream,
      preferredLanguage: user.preferredLanguage,
      accessTier: user.accessTier,
    });

    const sanitizedUser = {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      stream: user.stream,
      preferredLanguage: user.preferredLanguage,
      accessTier: user.accessTier,
      createdAt: user.createdAt,
    };

    return { user: sanitizedUser, token };
  }

  async getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        displayName: true,
        role: true,
        stream: true,
        preferredLanguage: true,
        accessTier: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}

export const authService = new AuthService();

