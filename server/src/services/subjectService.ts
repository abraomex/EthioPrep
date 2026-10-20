import { prisma } from '../db/prisma';
import type { Stream, Prisma } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

export interface SubjectQueryOptions {
  page?: number;
  pageSize?: number;
  stream?: string;
  search?: string;
}

export class SubjectService {
  async getSubjects(options: SubjectQueryOptions = {}) {
    const { page = 1, pageSize = 20, stream, search } = options;
    const skip = (page - 1) * pageSize;

    const where: Prisma.SubjectWhereInput = {
      published: true,
    };

    if (stream && stream !== 'all') {
      where.stream = stream as Stream;
    }

    if (search && search.trim() !== '') {
      const q = search.trim();
      where.OR = [
        { titleEn: { contains: q, mode: 'insensitive' } },
        { titleAm: { contains: q } },
        { descriptionEn: { contains: q, mode: 'insensitive' } },
        { descriptionAm: { contains: q } },
      ];
    }

    const [totalCount, subjects] = await Promise.all([
      prisma.subject.count({ where }),
      prisma.subject.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { sortOrder: 'asc' },
        include: {
          _count: {
            select: {
              topics: true,
              resources: true,
            },
          },
        },
      }),
    ]);

    return {
      subjects: subjects.map((s) => ({
        id: s.id,
        slug: s.slug,
        stream: s.stream,
        titleEn: s.titleEn,
        titleAm: s.titleAm,
        descriptionEn: s.descriptionEn,
        descriptionAm: s.descriptionAm,
        sortOrder: s.sortOrder,
        published: s.published,
        topicCount: s._count.topics,
        resourceCount: s._count.resources,
      })),
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  }

  async getSubjectBySlug(slug: string) {
    const subject = await prisma.subject.findUnique({
      where: { slug },
      include: {
        topics: {
          where: { published: true, parentTopicId: null },
          orderBy: { sortOrder: 'asc' },
          include: {
            lessons: {
              where: { status: 'published' },
              orderBy: { sortOrder: 'asc' },
              select: {
                id: true,
                titleEn: true,
                titleAm: true,
                accessTier: true,
                estimatedMinutes: true,
                sortOrder: true,
              },
            },
            childTopics: {
              where: { published: true },
              orderBy: { sortOrder: 'asc' },
              include: {
                lessons: {
                  where: { status: 'published' },
                  orderBy: { sortOrder: 'asc' },
                  select: {
                    id: true,
                    titleEn: true,
                    titleAm: true,
                    accessTier: true,
                    estimatedMinutes: true,
                    sortOrder: true,
                  },
                },
              },
            },
          },
        },
        exams: {
          where: { status: 'published' },
          select: {
            id: true,
            titleEn: true,
            titleAm: true,
            durationSeconds: true,
            accessTier: true,
          },
        },
      },
    });

    if (!subject || !subject.published) {
      throw new AppError('Subject not found or has been archived', 404);
    }

    return subject;
  }
}

export const subjectService = new SubjectService();
