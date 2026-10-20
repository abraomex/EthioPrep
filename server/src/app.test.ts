import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import { createApp } from './app';
import { prisma } from './db/prisma';

// Mock prisma for isolated API contract verification
vi.mock('./db/prisma', () => ({
  prisma: {
    subject: {
      count: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
    lesson: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
    },
  },
}));

describe('EthioPrep Express API', () => {
  const app = createApp();

  describe('GET /api/v1/health', () => {
    it('should return 200 OK with service health info', async () => {
      const response = await request(app).get('/api/v1/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ok');
      expect(response.body.service).toBe('EthioPrep Backend API');
      expect(response.body.version).toBe('1.0.0');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('GET /api/unknown-endpoint', () => {
    it('should return 404 for undefined routes', async () => {
      const response = await request(app).get('/api/unknown-route');
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('API endpoint not found');
    });
  });

  describe('GET /api/v1/subjects', () => {
    it('should return paginated list of subjects', async () => {
      vi.mocked(prisma.subject.count).mockResolvedValueOnce(2);
      vi.mocked(prisma.subject.findMany).mockResolvedValueOnce([
        {
          id: 'sub-1',
          slug: 'physics',
          stream: 'natural_science',
          titleEn: 'Physics',
          titleAm: 'ፊዚክስ',
          descriptionEn: 'Grade 12 Physics',
          descriptionAm: 'የ12ኛ ክፍል ፊዚክስ',
          sortOrder: 1,
          published: true,
          _count: { topics: 5, resources: 3 },
        } as any,
      ]);

      const response = await request(app).get('/api/v1/subjects');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].slug).toBe('physics');
      expect(response.body.data[0].topicCount).toBe(5);
      expect(response.body.pagination.totalCount).toBe(2);
    });
  });

  describe('GET /api/v1/lessons/:id', () => {
    it('should enforce freemium access and mask premium content for free users', async () => {
      vi.mocked(prisma.lesson.findUnique).mockResolvedValueOnce({
        id: 'lesson-prem-1',
        topicId: 'topic-1',
        titleEn: 'Advanced Rotational Motion',
        titleAm: 'የተራቀቀ የዙር እንቅስቃሴ',
        bodyEn: 'Confidential premium lesson content',
        bodyAm: 'ሚስጥራዊ የፕሪሚየም ይዘት',
        status: 'published',
        accessTier: 'premium',
        estimatedMinutes: 20,
        sortOrder: 2,
        topic: {
          id: 'topic-1',
          titleEn: 'Rotational Motion',
          titleAm: 'የዙር እንቅስቃሴ',
          subject: {
            id: 'sub-1',
            slug: 'physics',
            titleEn: 'Physics',
            titleAm: 'ፊዚክስ',
            stream: 'natural_science',
          },
        },
      } as any);

      const response = await request(app).get('/api/v1/lessons/lesson-prem-1');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.isLocked).toBe(true);
      expect(response.body.data.bodyEn).toBeUndefined(); // Body must be protected!
      expect(response.body.data.previewMessage).toContain('requires an active EthioPrep Premium subscription');
    });

    it('should return full lesson content when lesson access tier is free', async () => {
      vi.mocked(prisma.lesson.findUnique).mockResolvedValueOnce({
        id: 'lesson-free-1',
        topicId: 'topic-1',
        titleEn: 'Angular Kinematics',
        titleAm: 'የአንግል እንቅስቃሴ',
        bodyEn: '# Angular Kinematics\n\nStudy equations...',
        bodyAm: '# የአንግል እንቅስቃሴ...',
        status: 'published',
        accessTier: 'free',
        estimatedMinutes: 15,
        sortOrder: 1,
        topic: {
          id: 'topic-1',
          titleEn: 'Rotational Motion',
          titleAm: 'የዙር እንቅስቃሴ',
          subject: {
            id: 'sub-1',
            slug: 'physics',
            titleEn: 'Physics',
            titleAm: 'ፊዚክስ',
            stream: 'natural_science',
          },
        },
      } as any);

      vi.mocked(prisma.lesson.findFirst).mockResolvedValue(null);

      const response = await request(app).get('/api/v1/lessons/lesson-free-1');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.isLocked).toBe(false);
      expect(response.body.data.bodyEn).toContain('Angular Kinematics');
    });
  });
});

