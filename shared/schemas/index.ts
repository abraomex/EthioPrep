import { z } from 'zod';

// ============================================================
// Enums & Primitive Schemas
// ============================================================

export const UserRoleSchema = z.enum(['student', 'admin']);
export const StreamSchema = z.enum(['natural_science', 'social_science', 'common']);
export const LanguageSchema = z.enum(['en', 'am']);
export const AccessTierSchema = z.enum(['free', 'premium']);
export const ContentStatusSchema = z.enum(['draft', 'published', 'archived']);
export const AttemptStatusSchema = z.enum(['active', 'submitted', 'graded', 'expired']);
export const DifficultySchema = z.enum(['easy', 'medium', 'hard']);
export const ResourceTypeSchema = z.enum(['pdf', 'video', 'article', 'link']);

// ============================================================
// Pagination & Query Filters
// ============================================================

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().optional(),
  stream: StreamSchema.or(z.literal('all')).optional(),
});

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;

// ============================================================
// Authentication Schemas
// ============================================================

export const RegisterRequestSchema = z.object({
  email: z.string().email('Valid email is required').toLowerCase().trim(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters').trim(),
  stream: StreamSchema.default('natural_science'),
  preferredLanguage: LanguageSchema.default('en'),
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const LoginRequestSchema = z.object({
  email: z.string().email('Valid email is required').toLowerCase().trim(),
  password: z.string().min(1, 'Password is required'),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

// ============================================================
// Subject & Topic Schemas
// ============================================================

export const CreateSubjectSchema = z.object({
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  stream: StreamSchema,
  titleEn: z.string().min(2).max(200).trim(),
  titleAm: z.string().min(2).max(200).trim(),
  descriptionEn: z.string().min(5).trim(),
  descriptionAm: z.string().min(5).trim(),
  sortOrder: z.number().int().default(0),
  published: z.boolean().default(false),
});

export type CreateSubject = z.infer<typeof CreateSubjectSchema>;

export const CreateTopicSchema = z.object({
  subjectId: z.string().uuid(),
  parentTopicId: z.string().uuid().nullable().optional(),
  titleEn: z.string().min(2).max(200).trim(),
  titleAm: z.string().min(2).max(200).trim(),
  sortOrder: z.number().int().default(0),
  published: z.boolean().default(false),
});

export type CreateTopic = z.infer<typeof CreateTopicSchema>;

// ============================================================
// Lesson Schemas
// ============================================================

export const CreateLessonSchema = z.object({
  topicId: z.string().uuid(),
  titleEn: z.string().min(2).max(200).trim(),
  titleAm: z.string().min(2).max(200).trim(),
  bodyEn: z.string().min(10),
  bodyAm: z.string().min(10),
  status: ContentStatusSchema.default('draft'),
  accessTier: AccessTierSchema.default('free'),
  estimatedMinutes: z.number().int().positive().default(10),
  sortOrder: z.number().int().default(0),
});

export type CreateLesson = z.infer<typeof CreateLessonSchema>;

// ============================================================
// Question & Options Schemas
// ============================================================

export const CreateQuestionOptionSchema = z.object({
  label: z.string().max(5).trim(),
  textEn: z.string().min(1).trim(),
  textAm: z.string().min(1).trim(),
  sortOrder: z.number().int().default(0),
  isCorrect: z.boolean().default(false),
});

export const CreateQuestionSchema = z.object({
  topicId: z.string().uuid(),
  promptEn: z.string().min(5).trim(),
  promptAm: z.string().min(5).trim(),
  explanationEn: z.string().min(5).trim(),
  explanationAm: z.string().min(5).trim(),
  difficulty: DifficultySchema.default('medium'),
  status: ContentStatusSchema.default('published'),
  options: z.array(CreateQuestionOptionSchema).min(2).max(6),
});

export type CreateQuestion = z.infer<typeof CreateQuestionSchema>;

// ============================================================
// Exam & Attempt Schemas
// ============================================================

export const CreateExamSchema = z.object({
  subjectId: z.string().uuid(),
  titleEn: z.string().min(3).max(200).trim(),
  titleAm: z.string().min(3).max(200).trim(),
  descriptionEn: z.string().min(5).trim(),
  descriptionAm: z.string().min(5).trim(),
  durationSeconds: z.number().int().min(60).max(18000), // 1 min to 5 hrs
  accessTier: AccessTierSchema.default('free'),
  status: ContentStatusSchema.default('draft'),
  questionIds: z.array(z.string().uuid()).min(1),
});

export type CreateExam = z.infer<typeof CreateExamSchema>;

export const SaveAttemptAnswerSchema = z.object({
  questionId: z.string().uuid(),
  selectedOptionId: z.string().uuid().nullable(),
});

export const SubmitAttemptSchema = z.object({
  answers: z.array(SaveAttemptAnswerSchema),
});

export type SubmitAttempt = z.infer<typeof SubmitAttemptSchema>;

// ============================================================
// Bookmark & Progress Schemas
// ============================================================

export const ToggleBookmarkSchema = z.object({
  lessonId: z.string().uuid().optional(),
  questionId: z.string().uuid().optional(),
}).refine(
  (data) => (data.lessonId && !data.questionId) || (!data.lessonId && data.questionId),
  { message: 'Provide either lessonId or questionId, but not both.' }
);

export type ToggleBookmark = z.infer<typeof ToggleBookmarkSchema>;

