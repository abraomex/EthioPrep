import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from './app';
import { prisma } from './db/prisma';
import { hashPassword, createSessionToken } from './lib/auth';

// Mock prisma database calls
vi.mock('./db/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    subject: {
      findMany: vi.fn(),
      count: vi.fn(),
      findUnique: vi.fn(),
    },
    lesson: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
    },
    exam: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
    attempt: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    attemptAnswer: {
      upsert: vi.fn(),
    },
    $transaction: vi.fn(),
  },
}));

describe('Stage 7: Security, Authentication & Server-Side Exam Grading', () => {
  const app = createApp();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ============================================================
  // 1. Authentication Tests
  // ============================================================

  describe('Authentication Endpoints', () => {
    it('POST /api/v1/auth/register should hash password, set HttpOnly cookie, and return user', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(null);
      vi.mocked(prisma.user.create).mockResolvedValueOnce({
        id: 'usr-123',
        email: 'student@example.com',
        displayName: 'Abebe Kebede',
        role: 'student',
        stream: 'natural_science',
        preferredLanguage: 'en',
        accessTier: 'free',
        createdAt: new Date(),
      } as any);

      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'Student@Example.com', // test email normalization
          password: 'Password123!',
          displayName: 'Abebe Kebede',
          stream: 'natural_science',
          preferredLanguage: 'en',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe('student@example.com');
      expect(res.body.data.user.passwordHash).toBeUndefined(); // never leak hash

      // Verify HttpOnly session cookie
      const cookies = res.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies[0]).toMatch(/ethioprep_session=/);
      expect(cookies[0].toLowerCase()).toMatch(/httponly/);

      // Verify Argon2 hash was created and stored
      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            email: 'student@example.com',
            passwordHash: expect.stringMatching(/^\$argon2id\$/),
          }),
        })
      );
    });

    it('POST /api/v1/auth/register should reject duplicate email with 409', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce({
        id: 'existing-id',
        email: 'duplicate@example.com',
      } as any);

      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'Password123!',
          displayName: 'Existing User',
        });

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('already exists');
    });

    it('POST /api/v1/auth/login should authenticate valid user and set session cookie', async () => {
      const realHash = await hashPassword('Secret123!');
      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce({
        id: 'usr-login',
        email: 'student@example.com',
        passwordHash: realHash,
        displayName: 'Abebe Kebede',
        role: 'student',
        stream: 'natural_science',
        preferredLanguage: 'am',
        accessTier: 'free',
        createdAt: new Date(),
      } as any);

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'student@example.com',
          password: 'Secret123!',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.displayName).toBe('Abebe Kebede');
      expect(res.headers['set-cookie']).toBeDefined();
    });

    it('POST /api/v1/auth/login should reject invalid password with 401', async () => {
      const realHash = await hashPassword('CorrectPassword1!');
      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce({
        id: 'usr-login',
        email: 'student@example.com',
        passwordHash: realHash,
      } as any);

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'student@example.com',
          password: 'WrongPassword!',
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Invalid email or password');
    });

    it('GET /api/v1/auth/me should return current profile when authenticated via Bearer token', async () => {
      const token = createSessionToken({
        userId: 'usr-profile',
        email: 'profile@example.com',
        role: 'student',
        stream: 'natural_science',
        preferredLanguage: 'en',
        accessTier: 'free',
      });

      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce({
        id: 'usr-profile',
        email: 'profile@example.com',
        displayName: 'Profile User',
        role: 'student',
        stream: 'natural_science',
        preferredLanguage: 'en',
        accessTier: 'free',
        createdAt: new Date(),
      } as any);

      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.id).toBe('usr-profile');
    });

    it('GET /api/v1/auth/me should reject unauthenticated request with 401', async () => {
      const res = await request(app).get('/api/v1/auth/me');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('POST /api/v1/auth/logout should clear session cookie', async () => {
      const res = await request(app).post('/api/v1/auth/logout');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      const cookies = res.headers['set-cookie'];
      expect(cookies[0]).toMatch(/ethioprep_session=;/);
    });
  });

  // ============================================================
  // 2. Freemium & Authorization Tests
  // ============================================================

  describe('Freemium & Entitlement Checks', () => {
    it('should block free tier user from starting a premium exam attempt with 403', async () => {
      const freeToken = createSessionToken({
        userId: 'usr-free',
        email: 'free@example.com',
        role: 'student',
        stream: 'natural_science',
        preferredLanguage: 'en',
        accessTier: 'free',
      });

      vi.mocked(prisma.exam.findUnique).mockResolvedValueOnce({
        id: 'exam-premium-1',
        titleEn: 'National Mock Exam 2026 (Curated)',
        titleAm: 'የ2018 ብሔራዊ የሞዴል ፈተና',
        accessTier: 'premium',
        status: 'published',
        durationSeconds: 7200,
        examQuestions: [{ id: 'eq-1' }],
      } as any);

      const res = await request(app)
        .post('/api/v1/exams/exam-premium-1/attempts')
        .set('Authorization', `Bearer ${freeToken}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('EthioPrep Premium');
    });
  });

  // ============================================================
  // 3. Tamper-Proof Exam Engine Tests
  // ============================================================

  describe('Tamper-Proof Exam Engine', () => {
    const studentToken = createSessionToken({
      userId: 'student-42',
      email: 'student42@example.com',
      role: 'student',
      stream: 'natural_science',
      preferredLanguage: 'en',
      accessTier: 'free',
    });

    it('POST /api/v1/exams/:id/attempts should start attempt and STRIP isCorrect and explanations', async () => {
      vi.mocked(prisma.exam.findUnique).mockResolvedValueOnce({
        id: 'exam-phy-1',
        titleEn: 'Physics Mock Exam 1',
        titleAm: 'የፊዚክስ ፈተና 1',
        durationSeconds: 3600, // 60 mins
        accessTier: 'free',
        status: 'published',
        examQuestions: [
          {
            sortOrder: 1,
            points: 2,
            question: {
              id: 'q-101',
              topicId: 'top-1',
              promptEn: 'What is the SI unit of angular velocity?',
              promptAm: 'የአንግል ፍጥነት የSI መለኪያ ምንድን ነው?',
              difficulty: 'medium',
              explanationEn: 'SECRET EXPLANATION: radians per second (rad/s)',
              explanationAm: 'ሚስጥራዊ ማብራሪያ፡ ራዲያን በሰከንድ',
              options: [
                { id: 'opt-a', label: 'A', textEn: 'm/s', textAm: 'ሜ/ሰ', sortOrder: 1, isCorrect: false },
                { id: 'opt-b', label: 'B', textEn: 'rad/s', textAm: 'ራድ/ሰ', sortOrder: 2, isCorrect: true },
                { id: 'opt-c', label: 'C', textEn: 'm/s^2', textAm: 'ሜ/ሰ^2', sortOrder: 3, isCorrect: false },
              ],
            },
          },
        ],
      } as any);

      vi.mocked(prisma.attempt.findFirst).mockResolvedValueOnce(null);
      vi.mocked(prisma.attempt.create).mockResolvedValueOnce({
        id: 'att-999',
        examId: 'exam-phy-1',
        userId: 'student-42',
        startedAt: new Date(),
        expiresAt: new Date(Date.now() + (3600 + 60) * 1000),
        status: 'active',
      } as any);

      const res = await request(app)
        .post('/api/v1/exams/exam-phy-1/attempts')
        .set('Authorization', `Bearer ${studentToken}`);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.attempt.id).toBe('att-999');

      const returnedQuestion = res.body.data.questions[0];
      expect(returnedQuestion.promptEn).toContain('angular velocity');

      // CRITICAL TAMPER-PROOF VERIFICATION:
      // Neither explanation nor isCorrect must be leaked!
      expect(returnedQuestion.explanationEn).toBeUndefined();
      expect(returnedQuestion.explanationAm).toBeUndefined();
      for (const opt of returnedQuestion.options) {
        expect(opt.isCorrect).toBeUndefined();
      }
    });

    it('PUT /api/v1/attempts/:id/answers should save draft answers for active attempt', async () => {
      vi.mocked(prisma.attempt.findUnique).mockResolvedValueOnce({
        id: 'att-999',
        userId: 'student-42',
        status: 'active',
        expiresAt: new Date(Date.now() + 1800 * 1000), // still valid
      } as any);

      vi.mocked(prisma.attemptAnswer.upsert).mockResolvedValue({} as any);

      const res = await request(app)
        .put('/api/v1/attempts/att-999/answers')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          answers: [
            { questionId: '11111111-1111-1111-1111-111111111111', selectedOptionId: '22222222-2222-2222-2222-222222222222' },
          ],
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(prisma.attemptAnswer.upsert).toHaveBeenCalled();
    });

    it('POST /api/v1/attempts/:id/submit should calculate score server-side and persist in transaction', async () => {
      vi.mocked(prisma.attempt.findUnique).mockResolvedValueOnce({
        id: 'att-999',
        userId: 'student-42',
        status: 'active',
        startedAt: new Date(Date.now() - 600 * 1000), // 10 min ago
        expiresAt: new Date(Date.now() + 3000 * 1000),
        exam: {
          examQuestions: [
            {
              points: 5,
              question: {
                id: '11111111-1111-1111-1111-111111111111',
                options: [
                  { id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', isCorrect: false },
                  { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', isCorrect: true },
                ],
              },
            },
            {
              points: 5,
              question: {
                id: '33333333-3333-3333-3333-333333333333',
                options: [
                  { id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', isCorrect: false },
                  { id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', isCorrect: true },
                ],
              },
            },
          ],
        },
      } as any);

      // Mock transaction execution
      vi.mocked(prisma.$transaction).mockImplementationOnce(async (callback: any) => {
        const txMock = {
          attemptAnswer: { upsert: vi.fn() },
          attempt: {
            update: vi.fn().mockResolvedValue({
              id: 'att-999',
              score: 5,
              maxScore: 10,
              status: 'submitted',
              submittedAt: new Date(),
            }),
          },
        };
        return await callback(txMock);
      });

      const res = await request(app)
        .post('/api/v1/attempts/att-999/submit')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          answers: [
            { questionId: '11111111-1111-1111-1111-111111111111', selectedOptionId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' }, // correct (5 pts)
            { questionId: '33333333-3333-3333-3333-333333333333', selectedOptionId: 'dddddddd-dddd-dddd-dddd-dddddddddddd' }, // wrong (0 pts)
          ],
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.score).toBe(5);
      expect(res.body.data.maxScore).toBe(10);
      expect(res.body.data.percentage).toBe(50);
      expect(res.body.data.status).toBe('submitted');
    });

    it('GET /api/v1/attempts/:id/results should return full explanations and topic analysis after submission', async () => {
      vi.mocked(prisma.attempt.findUnique).mockResolvedValueOnce({
        id: 'att-999',
        userId: 'student-42',
        status: 'submitted',
        startedAt: new Date(Date.now() - 1200 * 1000),
        submittedAt: new Date(Date.now() - 300 * 1000),
        score: 5,
        maxScore: 10,
        exam: {
          titleEn: 'Physics Mock',
          titleAm: 'የፊዚክስ ፈተና',
          durationSeconds: 3600,
          subject: { id: 's-1', titleEn: 'Physics', titleAm: 'ፊዚክስ', slug: 'physics' },
          examQuestions: [
            {
              points: 5,
              question: {
                id: 'q-1',
                promptEn: 'Prompt EN',
                promptAm: 'Prompt AM',
                explanationEn: 'Full English explanation',
                explanationAm: 'የአማርኛ ማብራሪያ',
                topic: { id: 'top-1', titleEn: 'Kinematics', titleAm: 'እንቅስቃሴ' },
                options: [
                  { id: 'opt-1', label: 'A', textEn: 'Opt A', textAm: 'ምርጫ ሀ', isCorrect: true },
                ],
              },
            },
          ],
        },
        answers: [
          { questionId: 'q-1', selectedOptionId: 'opt-1', isCorrect: true, pointsAwarded: 5 },
        ],
      } as any);

      const res = await request(app)
        .get('/api/v1/attempts/att-999/results')
        .set('Authorization', `Bearer ${studentToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.score).toBe(5);
      expect(res.body.data.questions[0].explanationEn).toBe('Full English explanation');
      expect(res.body.data.questions[0].options[0].isCorrect).toBe(true);
      expect(res.body.data.topicBreakdown[0].percentage).toBe(100);
    });

    it('GET /api/v1/attempts/:id/results should forbid other students from viewing results', async () => {
      const imposterToken = createSessionToken({
        userId: 'imposter-99',
        email: 'imposter@example.com',
        role: 'student',
        stream: 'natural_science',
        preferredLanguage: 'en',
        accessTier: 'free',
      });

      vi.mocked(prisma.attempt.findUnique).mockResolvedValueOnce({
        id: 'att-999',
        userId: 'student-42', // belongs to student-42!
        status: 'submitted',
      } as any);

      const res = await request(app)
        .get('/api/v1/attempts/att-999/results')
        .set('Authorization', `Bearer ${imposterToken}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Not authorized');
    });
  });
});
