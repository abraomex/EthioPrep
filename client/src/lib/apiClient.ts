import type { Stream, Language, AccessTier } from '../../../shared/types';
import { mockSubjects } from './mockData';
import { mockFullLessons } from './mockLessons';
import { mockExams } from './mockExams';

export interface ApiUser {
  id: string;
  email: string;
  displayName: string;
  role: 'student' | 'admin';
  stream: Stream;
  preferredLanguage: Language;
  accessTier: AccessTier;
  createdAt: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Array<{ path: string; message: string }>;
}

const BASE_URL = '/api/v1';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const config: RequestInit = {
    ...options,
    credentials: 'include', // send & receive HttpOnly cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const res = await fetch(url, config);
    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      const error: ApiError = {
        message: json.message || `Request failed with status ${res.status}`,
        statusCode: res.status,
        errors: json.errors,
      };
      throw error;
    }

    return json.data !== undefined ? json.data : json;
  } catch (err: any) {
    if (err.statusCode) {
      throw err;
    }
    // Network failure (server offline)
    console.warn(`[EthioPrep API] Network error connecting to ${endpoint}:`, err.message || err);
    throw {
      message: 'Network error: could not connect to EthioPrep server.',
      statusCode: 0,
    };
  }
}

export const apiClient = {
  // --- Auth Endpoints ---
  auth: {
    async register(data: {
      email: string;
      password: string;
      displayName: string;
      stream: Stream;
      preferredLanguage: Language;
    }): Promise<{ user: ApiUser; token?: string }> {
      try {
        return await request('/auth/register', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      } catch (err: any) {
        if (err.statusCode === 0) {
          // Dev fallback
          const mockUser: ApiUser = {
            id: 'mock-user-1',
            email: data.email,
            displayName: data.displayName,
            role: 'student',
            stream: data.stream,
            preferredLanguage: data.preferredLanguage,
            accessTier: 'free',
            createdAt: new Date().toISOString(),
          };
          localStorage.setItem('ethioprep_mock_user', JSON.stringify(mockUser));
          return { user: mockUser };
        }
        throw err;
      }
    },

    async login(data: { email: string; password: string }): Promise<{ user: ApiUser; token?: string }> {
      try {
        return await request('/auth/login', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      } catch (err: any) {
        if (err.statusCode === 0) {
          // Dev fallback: allow login with demo credentials
          const isAdmin = data.email.includes('admin');
          const mockUser: ApiUser = {
            id: isAdmin ? 'mock-admin-id' : 'mock-student-id',
            email: data.email,
            displayName: isAdmin ? 'Abebe Admin' : 'Dawit Kebede',
            role: isAdmin ? 'admin' : 'student',
            stream: 'natural_science',
            preferredLanguage: 'en',
            accessTier: isAdmin ? 'premium' : 'free',
            createdAt: new Date().toISOString(),
          };
          localStorage.setItem('ethioprep_mock_user', JSON.stringify(mockUser));
          return { user: mockUser };
        }
        throw err;
      }
    },

    async logout(): Promise<void> {
      try {
        await request('/auth/logout', { method: 'POST' });
      } catch {
        // ignore
      } finally {
        localStorage.removeItem('ethioprep_mock_user');
      }
    },

    async getMe(): Promise<ApiUser | null> {
      try {
        const data = await request<{ user: ApiUser }>('/auth/me');
        return data.user;
      } catch (err: any) {
        if (err.statusCode === 0) {
          const stored = localStorage.getItem('ethioprep_mock_user');
          if (stored) {
            try {
              return JSON.parse(stored);
            } catch {
              return null;
            }
          }
        }
        return null;
      }
    },
  },

  // --- Subjects Endpoints ---
  subjects: {
    async getAll(options: { stream?: string; search?: string } = {}) {
      try {
        const params = new URLSearchParams();
        if (options.stream) params.set('stream', options.stream);
        if (options.search) params.set('search', options.search);
        return await request<any[]>(`/subjects?${params.toString()}`);
      } catch (err: any) {
        if (err.statusCode === 0) {
          return mockSubjects;
        }
        throw err;
      }
    },

    async getBySlug(slug: string) {
      try {
        return await request<any>(`/subjects/${slug}`);
      } catch (err: any) {
        if (err.statusCode === 0) {
          const found = mockSubjects.find((s) => s.slug === slug);
          if (found) return found;
        }
        throw err;
      }
    },
  },

  // --- Lessons Endpoints ---
  lessons: {
    async getById(id: string) {
      try {
        return await request<any>(`/lessons/${id}`);
      } catch (err: any) {
        if (err.statusCode === 0) {
          const found = mockFullLessons[id] || Object.values(mockFullLessons)[0];
          return found;
        }
        throw err;
      }
    },
  },

  // --- Exams Endpoints ---
  exams: {
    async getAll(subjectId?: string) {
      try {
        const url = subjectId ? `/exams?subjectId=${subjectId}` : '/exams';
        return await request<any[]>(url);
      } catch (err: any) {
        if (err.statusCode === 0) {
          return Object.values(mockExams);
        }
        throw err;
      }
    },

    async getById(id: string) {
      try {
        return await request<any>(`/exams/${id}`);
      } catch (err: any) {
        if (err.statusCode === 0) {
          const found = mockExams[id] || Object.values(mockExams)[0];
          return found;
        }
        throw err;
      }
    },

    async startAttempt(examId: string) {
      return await request<any>(`/exams/${examId}/attempts`, {
        method: 'POST',
      });
    },
  },

  // --- Attempts Endpoints ---
  attempts: {
    async saveDraftAnswers(attemptId: string, answers: Array<{ questionId: string; selectedOptionId: string | null }>) {
      return await request<any>(`/attempts/${attemptId}/answers`, {
        method: 'PUT',
        body: JSON.stringify({ answers }),
      });
    },

    async submit(attemptId: string, answers: Array<{ questionId: string; selectedOptionId: string | null }>) {
      return await request<any>(`/attempts/${attemptId}/submit`, {
        method: 'POST',
        body: JSON.stringify({ answers }),
      });
    },

    async getResults(attemptId: string) {
      return await request<any>(`/attempts/${attemptId}/results`);
    },
  },

  // --- Admin Endpoints ---
  admin: {
    async getStats() {
      try {
        return await request<any>('/admin/stats');
      } catch (err: any) {
        if (err.statusCode === 0) {
          return {
            totalUsers: 124,
            totalSubjects: 7,
            totalTopics: 68,
            totalLessons: 142,
            publishedLessons: 110,
            totalQuestions: 1280,
            totalExams: 16,
            totalAttempts: 412,
          };
        }
        throw err;
      }
    },

    // Subjects
    async createSubject(data: any) {
      return await request<any>('/admin/subjects', { method: 'POST', body: JSON.stringify(data) });
    },
    async updateSubject(id: string, data: any) {
      return await request<any>(`/admin/subjects/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    },
    async deleteSubject(id: string) {
      return await request<any>(`/admin/subjects/${id}`, { method: 'DELETE' });
    },

    // Topics
    async createTopic(data: any) {
      return await request<any>('/admin/topics', { method: 'POST', body: JSON.stringify(data) });
    },
    async updateTopic(id: string, data: any) {
      return await request<any>(`/admin/topics/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    },
    async deleteTopic(id: string) {
      return await request<any>(`/admin/topics/${id}`, { method: 'DELETE' });
    },

    // Lessons
    async getLessons(params: { topicId?: string; status?: string; search?: string } = {}) {
      const q = new URLSearchParams();
      if (params.topicId) q.set('topicId', params.topicId);
      if (params.status) q.set('status', params.status);
      if (params.search) q.set('search', params.search);
      try {
        return await request<any[]>(`/admin/lessons?${q.toString()}`);
      } catch (err: any) {
        if (err.statusCode === 0) {
          return Object.values(mockFullLessons);
        }
        throw err;
      }
    },
    async createLesson(data: any) {
      return await request<any>('/admin/lessons', { method: 'POST', body: JSON.stringify(data) });
    },
    async updateLesson(id: string, data: any) {
      return await request<any>(`/admin/lessons/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    },
    async deleteLesson(id: string) {
      return await request<any>(`/admin/lessons/${id}`, { method: 'DELETE' });
    },

    // Questions
    async getQuestions(params: { topicId?: string; difficulty?: string; search?: string } = {}) {
      const q = new URLSearchParams();
      if (params.topicId) q.set('topicId', params.topicId);
      if (params.difficulty) q.set('difficulty', params.difficulty);
      if (params.search) q.set('search', params.search);
      return await request<any[]>(`/admin/questions?${q.toString()}`);
    },
    async createQuestion(data: any) {
      return await request<any>('/admin/questions', { method: 'POST', body: JSON.stringify(data) });
    },
    async updateQuestion(id: string, data: any) {
      return await request<any>(`/admin/questions/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    },
    async deleteQuestion(id: string) {
      return await request<any>(`/admin/questions/${id}`, { method: 'DELETE' });
    },

    // Exams
    async createExam(data: any) {
      return await request<any>('/admin/exams', { method: 'POST', body: JSON.stringify(data) });
    },
    async updateExam(id: string, data: any) {
      return await request<any>(`/admin/exams/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    },
    async deleteExam(id: string) {
      return await request<any>(`/admin/exams/${id}`, { method: 'DELETE' });
    },
  },
};
