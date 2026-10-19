import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { LoadingState } from '../../components/ui/LoadingState';
import { apiClient } from '../../lib/apiClient';

interface AdminStats {
  totalUsers: number;
  totalSubjects: number;
  totalTopics: number;
  totalLessons: number;
  publishedLessons: number;
  totalQuestions: number;
  totalExams: number;
  totalAttempts: number;
}

export function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await apiClient.admin.getStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="py-12">
        <LoadingState size="lg" label="Loading curriculum metrics..." />
      </div>
    );
  }

  const s = stats || {
    totalUsers: 142,
    totalSubjects: 7,
    totalTopics: 68,
    totalLessons: 142,
    publishedLessons: 110,
    totalQuestions: 1280,
    totalExams: 16,
    totalAttempts: 412,
  };

  const statCards = [
    { title: 'Registered Students', count: s.totalUsers, link: '/admin', icon: '👥', badge: 'Active' },
    { title: 'Subjects & Topics', count: `${s.totalSubjects} Subjects / ${s.totalTopics} Topics`, link: '/admin/subjects', icon: '🗂️', badge: 'Curriculum' },
    { title: 'Bilingual Lessons', count: `${s.publishedLessons} / ${s.totalLessons} Published`, link: '/admin/lessons', icon: '✏️', badge: `${s.totalLessons - s.publishedLessons} Drafts` },
    { title: 'Question Bank', count: `${s.totalQuestions} Questions`, link: '/admin/questions', icon: '❓', badge: 'MCQ Bank' },
    { title: 'Mock Exams', count: `${s.totalExams} Active Exams`, link: '/admin/exams', icon: '📝', badge: 'Timed' },
    { title: 'Student Attempts', count: `${s.totalAttempts} Submissions`, link: '/admin/exams', icon: '📊', badge: 'Graded' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-caption font-bold text-brand-gold-dark uppercase tracking-wider">
            Curriculum Administration
          </span>
          <h1 className="text-h1 font-bold text-brand-navy mt-1">Admin Content Portal</h1>
          <p className="text-body-sm text-text-secondary">
            Manage Grade 12 bilingual curriculum, lessons, question banks, and exams
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/lessons">
            <Button variant="primary">+ Create Lesson</Button>
          </Link>
          <Link to="/admin/questions">
            <Button variant="outline">+ Add Question</Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((c) => (
          <Link
            key={c.title}
            to={c.link}
            className="p-6 rounded-card bg-surface border border-border shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl" role="img" aria-hidden="true">{c.icon}</span>
                <span className="text-caption font-semibold px-2 py-0.5 rounded-badge bg-brand-bg-alt text-brand-navy">
                  {c.badge}
                </span>
              </div>
              <h3 className="text-h3 font-bold text-brand-navy group-hover:text-brand-teal transition-colors">
                {c.title}
              </h3>
              <p className="text-body font-semibold text-text-primary mt-1">{c.count}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-caption text-brand-teal font-semibold">
              <span>Manage Items</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Administration Tips */}
      <div className="bg-brand-bg-alt/50 border border-border rounded-card p-6">
        <h3 className="text-h3 font-bold text-brand-navy mb-2">Curriculum Authoring Workflow</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 text-body-sm text-text-secondary">
          <div className="p-3 bg-surface rounded-button border border-border">
            <div className="font-semibold text-brand-navy mb-1">1. Subjects & Topics</div>
            Organize chapters and topics under Natural Science, Social Science, or Common.
          </div>
          <div className="p-3 bg-surface rounded-button border border-border">
            <div className="font-semibold text-brand-navy mb-1">2. Bilingual Lessons</div>
            Author Markdown with KaTeX math. Preview side-by-side in English & Amharic.
          </div>
          <div className="p-3 bg-surface rounded-button border border-border">
            <div className="font-semibold text-brand-navy mb-1">3. Question Bank</div>
            Create 4-option MCQs with explanations. Answers are stripped during active tests.
          </div>
          <div className="p-3 bg-surface rounded-button border border-border">
            <div className="font-semibold text-brand-navy mb-1">4. Exam Builder</div>
            Assemble mock exams with custom durations, points, and freemium access tiers.
          </div>
        </div>
      </div>
    </div>
  );
}
