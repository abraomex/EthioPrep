import { prisma } from '../db/prisma';
import { AppError } from '../middleware/errorHandler';

export class LessonService {
  async getLessonById(id: string, userAccessTier: 'free' | 'premium' = 'free') {
    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        topic: {
          select: {
            id: true,
            titleEn: true,
            titleAm: true,
            subject: {
              select: {
                id: true,
                slug: true,
                titleEn: true,
                titleAm: true,
                stream: true,
              },
            },
          },
        },
      },
    });

    if (!lesson || lesson.status !== 'published') {
      throw new AppError('Lesson not found or is currently in draft', 404);
    }

    // Server-enforced freemium access control
    if (lesson.accessTier === 'premium' && userAccessTier !== 'premium') {
      // Return safe preview with locked body
      return {
        id: lesson.id,
        topicId: lesson.topicId,
        titleEn: lesson.titleEn,
        titleAm: lesson.titleAm,
        accessTier: lesson.accessTier,
        estimatedMinutes: lesson.estimatedMinutes,
        isLocked: true,
        topic: lesson.topic,
        previewMessage: 'This lesson requires an active EthioPrep Premium subscription.',
      };
    }

    // Find previous and next lessons in the same topic
    const [prevLesson, nextLesson] = await Promise.all([
      prisma.lesson.findFirst({
        where: {
          topicId: lesson.topicId,
          status: 'published',
          sortOrder: { lt: lesson.sortOrder },
        },
        orderBy: { sortOrder: 'desc' },
        select: { id: true, titleEn: true, titleAm: true },
      }),
      prisma.lesson.findFirst({
        where: {
          topicId: lesson.topicId,
          status: 'published',
          sortOrder: { gt: lesson.sortOrder },
        },
        orderBy: { sortOrder: 'asc' },
        select: { id: true, titleEn: true, titleAm: true },
      }),
    ]);

    return {
      ...lesson,
      isLocked: false,
      prevLesson,
      nextLesson,
    };
  }
}

export const lessonService = new LessonService();

