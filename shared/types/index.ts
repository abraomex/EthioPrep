// ============================================================
// EthioPrep — Shared TypeScript Types
// ============================================================

// --- Enums ---
export type UserRole = 'student' | 'admin';
export type Stream = 'natural_science' | 'social_science' | 'common';
export type Language = 'en' | 'am';
export type AccessTier = 'free' | 'premium';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type AttemptStatus = 'active' | 'submitted' | 'graded' | 'expired';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type ResourceType = 'pdf' | 'video' | 'article' | 'link';

// --- Bilingual Helper ---
export interface BilingualText {
  en: string;
  am: string;
}

// --- User ---
export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  stream: Stream;
  preferredLanguage: Language;
  accessTier: AccessTier;
  createdAt: string;
}

// --- Subject ---
export interface Subject {
  id: string;
  slug: string;
  stream: Stream;
  titleEn: string;
  titleAm: string;
  descriptionEn: string;
  descriptionAm: string;
  sortOrder: number;
  published: boolean;
  topicCount?: number;
  questionCount?: number;
}

// --- Topic ---
export interface Topic {
  id: string;
  subjectId: string;
  parentTopicId: string | null;
  titleEn: string;
  titleAm: string;
  sortOrder: number;
  published: boolean;
  lessonCount?: number;
  questionCount?: number;
  children?: Topic[];
  completionPercent?: number;
}

// --- Lesson ---
export interface Lesson {
  id: string;
  topicId: string;
  titleEn: string;
  titleAm: string;
  bodyEn: string;
  bodyAm: string;
  status: ContentStatus;
  accessTier: AccessTier;
  estimatedMinutes: number;
}

// --- Resource ---
export interface Resource {
  id: string;
  subjectId: string;
  titleEn: string;
  titleAm: string;
  resourceType: ResourceType;
  url: string;
  licenseNote: string;
  accessTier: AccessTier;
  published: boolean;
}

// --- Question & Options ---
export interface QuestionOption {
  id: string;
  questionId: string;
  label: string;
  textEn: string;
  textAm: string;
  sortOrder: number;
  isCorrect?: boolean; // stripped during active exams
}

export interface Question {
  id: string;
  topicId: string;
  promptEn: string;
  promptAm: string;
  explanationEn?: string; // stripped during active exams
  explanationAm?: string; // stripped during active exams
  difficulty: Difficulty;
  status: ContentStatus;
  options: QuestionOption[];
}

// --- Exam ---
export interface Exam {
  id: string;
  subjectId: string;
  titleEn: string;
  titleAm: string;
  descriptionEn: string;
  descriptionAm: string;
  durationSeconds: number;
  accessTier: AccessTier;
  status: ContentStatus;
  questionCount?: number;
}

// --- Exam Question (join) ---
export interface ExamQuestion {
  examId: string;
  questionId: string;
  sortOrder: number;
  points: number;
}

// --- Attempt ---
export interface Attempt {
  id: string;
  userId: string;
  examId: string;
  startedAt: string;
  expiresAt: string;
  submittedAt: string | null;
  score: number | null;
  maxScore: number | null;
  status: AttemptStatus;
}

// --- Attempt Answer ---
export interface AttemptAnswer {
  attemptId: string;
  questionId: string;
  selectedOptionId: string | null;
  isCorrect?: boolean;
  pointsAwarded?: number;
}

// --- Lesson Progress ---
export interface LessonProgress {
  userId: string;
  lessonId: string;
  completedAt: string;
  updatedAt: string;
}

// --- Bookmark ---
export interface Bookmark {
  id: string;
  userId: string;
  lessonId: string | null;
  questionId: string | null;
  createdAt: string;
}

// --- API Response Wrappers ---
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

// --- Dashboard ---
export interface DashboardData {
  continueLearning: {
    lessonId: string;
    lessonTitle: BilingualText;
    topicTitle: BilingualText;
    subjectTitle: BilingualText;
    estimatedMinutesLeft: number;
  } | null;
  stats: {
    completedLessons: number;
    totalLessons: number;
    examsTaken: number;
    averageScore: number;
    studyHours: number;
  };
  topicMastery: Array<{
    topicId: string;
    topicTitle: BilingualText;
    percentage: number;
  }>;
  recentAttempts: Array<{
    attemptId: string;
    examTitle: BilingualText;
    score: number;
    maxScore: number;
    percentage: number;
    completedAt: string;
  }>;
  recommendations: Array<{
    type: 'review_topic' | 'take_exam';
    title: BilingualText;
    reason: string;
    targetId: string;
  }>;
}
