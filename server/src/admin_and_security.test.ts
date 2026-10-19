import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from './app';
import { prisma } from './db/prisma';
import { createSessionToken } from './lib/auth';

// Mock prisma database calls
vi.mock('./db/prisma', () => ({
  prisma: {
    user: {
      count: vi.fn(),
      findUnique: vi.fn(),
    },
    subject: {
      count: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    topic: {
      count: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    lesson: {
      count: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    question: {
      count: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    exam: {
      count: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    attempt: {
      count: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    $transaction: vi.fn(),
  },
}));

describe('Stage 9: Automated Testing & Security Audit', () => {
  const app = createApp();

  const adminToken = createSessionToken({
    userId: 'admin-001',
    email: 'admin@ethioprep.com',
    role: 'admin',
    stream: 'common',
    preferredLanguage: 'en',
    accessTier: 'premium',
  });

  const studentToken = createSessionToken({
    userId: 'student-001',
    email: 'student@ethioprep.com',
    role: 'student',
    stream: 'natural_science',
    preferredLanguage: 'am',
    accessTier: 'free',
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ============================================================
  // 1. Role-Based Access Control (RBAC) Security Verification
  // ============================================================

  describe('RBAC & Admin Route Security', () => {
    it('GET /api/v1/admin/stats should reject unauthenticated requests with 401', async () => {
      const res = await request(app).get('/api/v1/admin/stats');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Authentication required');
    });

    it('GET /api/v1/admin/stats should reject non-admin (student) requests with 403 Forbidden', async () => {
      const res = await request(app)
        .get('/api/v1/admin/stats')
        .set('Authorization', `Bearer ${studentToken}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Forbidden');
    });

    it('GET /api/v1/admin/stats should return aggregate counts for authenticated admin', async () => {
      vi.mocked(prisma.user.count).mockResolvedValueOnce(1250);
      vi.mocked(prisma.subject.count).mockResolvedValueOnce(6);
      vi.mocked(prisma.topic.count).mockResolvedValueOnce(45);
      vi.mocked(prisma.lesson.count)
        .mockResolvedValueOnce(120) // total lessons
        .mockResolvedValueOnce(115); // published lessons
      vi.mocked(prisma.question.count).mockResolvedValueOnce(850);
      vi.mocked(prisma.exam.count).mockResolvedValueOnce(18);
      vi.mocked(prisma.attempt.count).mockResolvedValueOnce(4320);

      const res = await request(app)
        .get('/api/v1/admin/stats')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual({
        totalUsers: 1250,
        totalSubjects: 6,
        totalTopics: 45,
        totalLessons: 120,
        publishedLessons: 115,
        totalQuestions: 850,
        totalExams: 18,
        totalAttempts: 4320,
      });
    });
  });

  // ============================================================
  // 2. Admin Subject CRUD Operations
  // ============================================================

  describe('Admin Subject CRUD', () => {
    it('POST /api/v1/admin/subjects should create subject with valid schema', async () => {
      vi.mocked(prisma.subject.findUnique).mockResolvedValueOnce(null);
      vi.mocked(prisma.subject.create).mockResolvedValueOnce({
        id: 'sub-math-1',
        slug: 'mathematics-natural',
        stream: 'natural_science',
        titleEn: 'Mathematics (Natural Science)',
        titleAm: 'ሂሳብ (የተፈጥሮ ሳይንስ)',
        descriptionEn: 'Grade 12 Natural Science Math',
        descriptionAm: 'የ12ኛ ክፍል የተፈጥሮ ሳይንስ ሂሳብ',
        sortOrder: 1,
        published: true,
      } as any);

      const res = await request(app)
        .post('/api/v1/admin/subjects')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          slug: 'mathematics-natural',
          stream: 'natural_science',
          titleEn: 'Mathematics (Natural Science)',
          titleAm: 'ሂሳብ (የተፈጥሮ ሳይንስ)',
          descriptionEn: 'Grade 12 Natural Science Math',
          descriptionAm: 'የ12ኛ ክፍል የተፈጥሮ ሳይንስ ሂሳብ',
          sortOrder: 1,
          published: true,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.slug).toBe('mathematics-natural');
      expect(prisma.subject.create).toHaveBeenCalled();
    });

    it('POST /api/v1/admin/subjects should reject duplicate slug with 409 Conflict', async () => {
      vi.mocked(prisma.subject.findUnique).mockResolvedValueOnce({
        id: 'existing-id',
        slug: 'mathematics-natural',
      } as any);

      const res = await request(app)
        .post('/api/v1/admin/subjects')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          slug: 'mathematics-natural',
          stream: 'natural_science',
          titleEn: 'Mathematics (Natural Science)',
          titleAm: 'ሂሳብ (የተፈጥሮ ሳይንስ)',
          descriptionEn: 'Grade 12 Natural Science Math',
          descriptionAm: 'የ12ኛ ክፍል የተፈጥሮ ሳይንስ ሂሳብ',
          sortOrder: 1,
          published: true,
        });

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('already exists');
    });

    it('DELETE /api/v1/admin/subjects/:id should delete existing subject', async () => {
      vi.mocked(prisma.subject.findUnique).mockResolvedValueOnce({ id: 'sub-math-1' } as any);
      vi.mocked(prisma.subject.delete).mockResolvedValueOnce({ id: 'sub-math-1' } as any);

      const res = await request(app)
        .delete('/api/v1/admin/subjects/sub-math-1')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain('deleted successfully');
    });
  });

  // ============================================================
  // 3. Admin Topic CRUD Operations
  // ============================================================

  describe('Admin Topic CRUD', () => {
    it('POST /api/v1/admin/topics should create topic under subject', async () => {
      vi.mocked(prisma.topic.create).mockResolvedValueOnce({
        id: 'top-1',
        subjectId: '11111111-1111-1111-1111-111111111111',
        titleEn: 'Vectors in 3D',
        titleAm: 'ቬክተሮች በ3D',
        sortOrder: 1,
        published: true,
      } as any);

      const res = await request(app)
        .post('/api/v1/admin/topics')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          subjectId: '11111111-1111-1111-1111-111111111111',
          titleEn: 'Vectors in 3D',
          titleAm: 'ቬክተሮች በ3D',
          sortOrder: 1,
          published: true,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.titleEn).toBe('Vectors in 3D');
    });
  });

  // ============================================================
  // 4. Admin Lesson CRUD Operations
  // ============================================================

  describe('Admin Lesson CRUD', () => {
    it('POST /api/v1/admin/lessons should create a bilingual lesson with KaTeX content', async () => {
      vi.mocked(prisma.lesson.create).mockResolvedValueOnce({
        id: 'les-1',
        topicId: '11111111-1111-1111-1111-111111111111',
        titleEn: 'Kinematics Formulas',
        titleAm: 'የእንቅስቃሴ ቀመሮች',
        bodyEn: 'Velocity equation: $$v = u + at$$',
        bodyAm: 'የፍጥነት ቀመር፡ $$v = u + at$$',
        status: 'published',
        accessTier: 'free',
        estimatedMinutes: 12,
        sortOrder: 1,
      } as any);

      const res = await request(app)
        .post('/api/v1/admin/lessons')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          topicId: '11111111-1111-1111-1111-111111111111',
          titleEn: 'Kinematics Formulas',
          titleAm: 'የእንቅስቃሴ ቀመሮች',
          bodyEn: 'Velocity equation: $$v = u + at$$',
          bodyAm: 'የፍጥነት ቀመር፡ $$v = u + at$$',
          status: 'published',
          accessTier: 'free',
          estimatedMinutes: 12,
          sortOrder: 1,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.bodyEn).toContain('$$v = u + at$$');
    });

    it('GET /api/v1/admin/lessons should filter lessons by search keyword', async () => {
      vi.mocked(prisma.lesson.findMany).mockResolvedValueOnce([
        {
          id: 'les-1',
          titleEn: 'Kinematics Formulas',
          titleAm: 'የእንቅስቃሴ ቀመሮች',
          status: 'published',
          topic: {
            id: 'top-1',
            titleEn: 'Mechanics',
            titleAm: 'መካኒክስ',
            subject: { id: 'sub-1', titleEn: 'Physics', titleAm: 'ፊዚክስ' },
          },
        } as any,
      ]);

      const res = await request(app)
        .get('/api/v1/admin/lessons?search=Kinematics')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].titleEn).toBe('Kinematics Formulas');
    });
  });

  // ============================================================
  // 5. Admin Question Bank & Exam CRUD Operations
  // ============================================================

  describe('Admin Question & Exam CRUD', () => {
    it('POST /api/v1/admin/questions should validate and save MCQ with bilingual options', async () => {
      vi.mocked(prisma.question.create).mockResolvedValueOnce({
        id: 'q-new-1',
        topicId: '11111111-1111-1111-1111-111111111111',
        promptEn: 'Solve for x: $$2x + 4 = 10$$',
        promptAm: 'ለ x አስላ፡ $$2x + 4 = 10$$',
        explanationEn: 'Subtract 4, divide by 2: x = 3',
        explanationAm: '4 ቀንስ፣ በ2 አካፍል፡ x = 3',
        difficulty: 'easy',
        status: 'published',
        options: [
          { id: 'opt-1', label: 'A', textEn: 'x = 2', textAm: 'x = 2', sortOrder: 1, isCorrect: false },
          { id: 'opt-2', label: 'B', textEn: 'x = 3', textAm: 'x = 3', sortOrder: 2, isCorrect: true },
        ],
      } as any);

      const res = await request(app)
        .post('/api/v1/admin/questions')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          topicId: '11111111-1111-1111-1111-111111111111',
          promptEn: 'Solve for x: $$2x + 4 = 10$$',
          promptAm: 'ለ x አስላ፡ $$2x + 4 = 10$$',
          explanationEn: 'Subtract 4, divide by 2: x = 3',
          explanationAm: '4 ቀንስ፣ በ2 አካፍል፡ x = 3',
          difficulty: 'easy',
          status: 'published',
          options: [
            { label: 'A', textEn: 'x = 2', textAm: 'x = 2', sortOrder: 1, isCorrect: false },
            { label: 'B', textEn: 'x = 3', textAm: 'x = 3', sortOrder: 2, isCorrect: true },
          ],
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.options[1].isCorrect).toBe(true);
    });

    it('POST /api/v1/admin/exams should build exam with linked questions', async () => {
      vi.mocked(prisma.exam.create).mockResolvedValueOnce({
        id: 'exam-new-1',
        subjectId: '11111111-1111-1111-1111-111111111111',
        titleEn: 'Unit 1 Mini-Exam',
        titleAm: 'የምዕራፍ 1 ሚኒ ፈተና',
        descriptionEn: 'Short assessment',
        descriptionAm: 'አጭር ምዘና',
        durationSeconds: 1800,
        accessTier: 'free',
        status: 'published',
        examQuestions: [
          { questionId: '22222222-2222-2222-2222-222222222222', sortOrder: 1, points: 1 },
        ],
      } as any);

      const res = await request(app)
        .post('/api/v1/admin/exams')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          subjectId: '11111111-1111-1111-1111-111111111111',
          titleEn: 'Unit 1 Mini-Exam',
          titleAm: 'የምዕራፍ 1 ሚኒ ፈተና',
          descriptionEn: 'Short assessment',
          descriptionAm: 'አጭር ምዘና',
          durationSeconds: 1800,
          accessTier: 'free',
          status: 'published',
          questionIds: ['22222222-2222-2222-2222-222222222222'],
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.titleEn).toBe('Unit 1 Mini-Exam');
    });
  });

  // ============================================================
  // 6. Security Defenses & Edge-Case Verification
  // ============================================================

  describe('Security Edge-Cases & Attack Mitigations', () => {
    it('should mark attempt as expired when submitted past deadline and grace window', async () => {
      const pastDeadline = new Date(Date.now() - 120 * 1000); // 120 seconds expired
      vi.mocked(prisma.attempt.findUnique).mockResolvedValueOnce({
        id: 'att-expired',
        userId: 'student-001',
        status: 'active',
        startedAt: new Date(Date.now() - 3800 * 1000),
        expiresAt: pastDeadline,
        exam: { examQuestions: [] },
      } as any);

      vi.mocked(prisma.$transaction).mockImplementationOnce(async (callback: any) => {
        const txMock = {
          attemptAnswer: { upsert: vi.fn() },
          attempt: {
            update: vi.fn().mockResolvedValue({
              id: 'att-expired',
              score: 0,
              maxScore: 0,
              status: 'expired',
              submittedAt: new Date(),
            }),
          },
        };
        return await callback(txMock);
      });

      const res = await request(app)
        .post('/api/v1/attempts/att-expired/submit')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ answers: [] });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('expired');
    });

    it('should reject draft answer saves if attempt time limit has expired with 403', async () => {
      vi.mocked(prisma.attempt.findUnique).mockResolvedValueOnce({
        id: 'att-late',
        userId: 'student-001',
        status: 'active',
        expiresAt: new Date(Date.now() - 10 * 1000), // expired 10s ago
      } as any);

      const res = await request(app)
        .put('/api/v1/attempts/att-late/answers')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ answers: [] });

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('time limit has expired');
    });

    it('should reject submission on already submitted or expired attempt with 400', async () => {
      vi.mocked(prisma.attempt.findUnique).mockResolvedValueOnce({
        id: 'att-already-closed',
        userId: 'student-001',
        status: 'submitted',
        startedAt: new Date(),
        expiresAt: new Date(),
      } as any);

      const res = await request(app)
        .post('/api/v1/attempts/att-already-closed/submit')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ answers: [] });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('already been submitted');
    });

    it('should safely handle SQL meta-characters and injection payloads via parameterized queries', async () => {
      // Prisma uses parameterized SQL queries. Malicious SQL payloads should never execute raw SQL.
      vi.mocked(prisma.lesson.findMany).mockResolvedValueOnce([]);

      const maliciousSqlString = "'; DROP TABLE users; --";
      const res = await request(app)
        .get(`/api/v1/admin/lessons?search=${encodeURIComponent(maliciousSqlString)}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(prisma.lesson.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: [
              { titleEn: { contains: maliciousSqlString, mode: 'insensitive' } },
              { titleAm: { contains: maliciousSqlString } },
            ],
          }),
        })
      );
    });

    it('should reject malformed UUID identifiers on admin routes with 400 Bad Request', async () => {
      const res = await request(app)
        .post('/api/v1/admin/topics')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          subjectId: 'not-a-valid-uuid',
          titleEn: 'Test',
          titleAm: 'ፈተና',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
