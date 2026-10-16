import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { useAuth } from '../lib/auth/AuthContext';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';

export function DashboardPage() {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const continueLesson = {
    id: 'les-math-201',
    subject: 'Mathematics',
    subjectAm: 'ሒሳብ',
    chapter: 'Chapter 2: Limits and Continuity',
    chapterAm: 'ምዕራፍ 2፡ ሊሚት እና ቀጣይነት',
    lessonTitle: '2.1 Definition of Limits and Direct Evaluation',
    lessonTitleAm: '2.1 የሊሚት ትርጉም እና ቀጥተኛ ስሌት',
    progress: 70,
    minutesLeft: 4,
  };

  const topicMasteryList = [
    { title: 'Calculus: Limits & Continuity', scorePct: 88, status: 'strong' },
    { title: 'Calculus: Derivatives & Tangents', scorePct: 76, status: 'good' },
    { title: 'Calculus: Indefinite Integrals', scorePct: 54, status: 'weak' },
    { title: 'Physics: Mechanics & Motion', scorePct: 92, status: 'strong' },
    { title: 'Physics: Thermodynamics & Carnot', scorePct: 42, status: 'weak' },
    { title: 'Chemistry: Acid-Base pH Equilibria', scorePct: 68, status: 'good' },
  ];

  const recentAttempts = [
    {
      id: 'att-1',
      examId: 'math-mock-1',
      titleEn: 'Grade 12 Mathematics National Mock Examination 1',
      titleAm: 'የ12ኛ ክፍል ሒሳብ ብሔራዊ ሞዴል ፈተና 1',
      score: 34,
      maxScore: 40,
      percentage: 85,
      date: 'Oct 15, 2026',
      timeTaken: '64 min',
    },
    {
      id: 'att-2',
      examId: 'phys-mid-1',
      titleEn: 'Physics Midterm Simulation (Mechanics & Waves)',
      titleAm: 'የፊዚክስ አጋማሽ ፈተና (ሜካኒክስ እና ሞገዶች)',
      score: 22,
      maxScore: 30,
      percentage: 73,
      date: 'Oct 12, 2026',
      timeTaken: '48 min',
    },
    {
      id: 'att-3',
      examId: 'chem-quiz-1',
      titleEn: 'Chemistry Solutions & Colligative Properties Quiz',
      titleAm: 'የኬሚስትሪ ሙሙቶችና ኮሊጌቲቭ ባህሪያት ፈተና',
      score: 11,
      maxScore: 20,
      percentage: 55,
      date: 'Oct 09, 2026',
      timeTaken: '28 min',
    },
  ];

  // Rule-based recommendations: find topics with score < 60%
  const weakTopics = topicMasteryList.filter((t) => t.scorePct < 60);

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto">
      {/* Welcome Banner */}
      <div className="bg-surface rounded-card p-6 sm:p-8 border border-border shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-caption font-bold text-brand-teal uppercase tracking-wider">
              {user?.stream.replace('_', ' ')} Stream
            </span>
            <span className="text-caption text-text-muted">• Ethiopian Grade 12</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
            {t('dashboard.welcome')}, {user?.displayName || 'Student'}!
          </h1>

          <p className="text-body-sm text-text-secondary mt-1 max-w-xl">
            {language === 'am'
              ? 'የትምህርት ግስጋሴዎን፣ የፈተና ታሪክዎን እና ደካማ ቦታዎችን ይከታተሉ።'
              : 'Track your curriculum mastery, practice exam results, and follow rule-based study suggestions.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/exams/math-mock-1/instructions">
            <Button variant="primary" size="md" className="shadow-sm font-bold">
              Take Practice Exam →
            </Button>
          </Link>
          <Link to="/subjects">
            <Button variant="outline" size="md">
              Browse Subjects
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-surface rounded-card border border-border shadow-card">
          <span className="text-caption text-text-muted font-medium">{t('dashboard.lessons')}</span>
          <p className="text-2xl sm:text-3xl font-black text-brand-navy mt-1">28 / 86</p>
          <p className="text-caption text-status-success font-semibold mt-1">✓ 32% Completed</p>
        </div>

        <div className="p-5 bg-surface rounded-card border border-border shadow-card">
          <span className="text-caption text-text-muted font-medium">{t('dashboard.tests')}</span>
          <p className="text-2xl sm:text-3xl font-black text-brand-navy mt-1">9 Taken</p>
          <p className="text-caption text-text-muted mt-1">3 completed this week</p>
        </div>

        <div className="p-5 bg-surface rounded-card border border-border shadow-card">
          <span className="text-caption text-text-muted font-medium">{t('dashboard.avgScore')}</span>
          <p className="text-2xl sm:text-3xl font-black text-brand-teal mt-1">76%</p>
          <p className="text-caption text-status-success font-semibold mt-1">↑ +5% National Trend</p>
        </div>

        <div className="p-5 bg-surface rounded-card border border-border shadow-card">
          <span className="text-caption text-text-muted font-medium">{t('dashboard.studyTime')}</span>
          <p className="text-2xl sm:text-3xl font-black text-brand-navy mt-1">16.5 hrs</p>
          <p className="text-caption text-brand-teal font-semibold mt-1">On Track for Exam</p>
        </div>
      </div>

      {/* Continue Learning + Rule-Based Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Learning Card */}
        <div className="p-6 rounded-card bg-surface border border-border shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-caption font-bold text-brand-teal uppercase tracking-wider">
                {t('dashboard.continueLearning')}
              </span>
              <span className="text-caption text-text-muted">
                ~{continueLesson.minutesLeft} min left
              </span>
            </div>

            <h3 className="font-bold text-body sm:text-h3 text-brand-navy">
              {language === 'am' ? continueLesson.lessonTitleAm : continueLesson.lessonTitle}
            </h3>

            <p className="text-caption text-text-muted mt-1">
              {language === 'am' ? continueLesson.subjectAm : continueLesson.subject} • {language === 'am' ? continueLesson.chapterAm : continueLesson.chapter}
            </p>

            <div className="mt-6 space-y-1.5">
              <div className="flex justify-between text-caption font-semibold">
                <span className="text-text-secondary">Lesson Completion</span>
                <span className="text-brand-teal">{continueLesson.progress}%</span>
              </div>
              <ProgressBar value={continueLesson.progress} variant="teal" aria-label="Lesson completion" />
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
            <span className="text-caption text-text-muted">Pick up where you left off</span>
            <Link to={`/lessons/${continueLesson.id}`}>
              <Button size="sm" variant="primary" className="font-bold">
                {t('dashboard.continue')} →
              </Button>
            </Link>
          </div>
        </div>

        {/* Rule-Based Study Recommendations (<60% accuracy) */}
        <div className="p-6 rounded-card bg-surface border border-border shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-caption font-bold text-status-warning uppercase tracking-wider">
                🎯 {t('dashboard.recommendations')}
              </span>
            </div>

            <h3 className="font-bold text-body sm:text-h3 text-brand-navy mb-1">
              Target Weak Areas (&lt;60% Accuracy)
            </h3>
            <p className="text-caption text-text-secondary mb-4">
              Rule-based study suggestions generated from your recent exam and quiz mistakes.
            </p>

            <div className="space-y-3">
              {weakTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-button bg-red-50 border border-red-200 flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-status-error font-bold text-caption">⚠ Critical</span>
                      <p className="text-body-sm font-bold text-red-950">{topic.title}</p>
                    </div>
                    <p className="text-caption text-red-800">
                      Scoring {topic.scorePct}% • Below 60% national passing threshold
                    </p>
                  </div>

                  <Link to="/lessons/les-math-201" className="shrink-0">
                    <Button size="sm" variant="danger" className="text-caption font-bold">
                      Study Topic
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-caption text-text-muted">
            <span>Updating after every test submission</span>
            <Link to="/history" className="text-brand-teal font-semibold hover:underline">
              View History →
            </Link>
          </div>
        </div>
      </div>

      {/* Topic Mastery Progress Bars */}
      <div className="bg-surface rounded-card p-6 sm:p-8 border border-border shadow-card space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="text-h2 font-bold text-brand-navy">
              {t('dashboard.topicMastery')}
            </h2>
            <p className="text-body-sm text-text-secondary">
              Calculated across all completed lessons, practice quizzes, and mock exams
            </p>
          </div>
          <span className="text-caption font-bold text-brand-teal">
            National Standard: ≥ 70%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topicMasteryList.map((item, idx) => (
            <div key={idx} className="space-y-2 p-3 rounded-card bg-surface-muted border border-border">
              <div className="flex items-center justify-between text-body-sm">
                <span className="font-semibold text-brand-navy">{item.title}</span>
                <span
                  className={`font-bold ${
                    item.scorePct >= 80
                      ? 'text-status-success'
                      : item.scorePct >= 60
                      ? 'text-brand-teal'
                      : 'text-status-error'
                  }`}
                >
                  {item.scorePct}%
                </span>
              </div>
              <ProgressBar
                value={item.scorePct}
                variant={item.scorePct >= 80 ? 'success' : item.scorePct >= 60 ? 'teal' : 'error'}
                aria-label={`Mastery for ${item.title}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Exam Attempt History Table */}
      <div className="bg-surface rounded-card border border-border shadow-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-h2 font-bold text-brand-navy">{t('dashboard.recentExams')}</h2>
            <p className="text-body-sm text-text-secondary">
              Past timed examination records and server-graded results
            </p>
          </div>
          <Link to="/history" className="text-body-sm text-brand-teal font-semibold hover:underline">
            {t('dashboard.viewAll')} →
          </Link>
        </div>

        <div className="divide-y divide-border">
          {recentAttempts.map((attempt) => (
            <div
              key={attempt.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-brand-bg transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-caption text-text-muted">{attempt.date}</span>
                  <span className="text-caption text-text-muted">• {attempt.timeTaken}</span>
                </div>
                <h3 className="font-bold text-body text-brand-navy">
                  {language === 'am' ? attempt.titleAm : attempt.titleEn}
                </h3>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="text-right">
                  <span className="font-bold text-body text-brand-navy block">
                    {attempt.score} / {attempt.maxScore}
                  </span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-caption font-bold ${
                      attempt.percentage >= 80
                        ? 'bg-status-success/10 text-status-success'
                        : attempt.percentage >= 60
                        ? 'bg-brand-teal/10 text-brand-teal'
                        : 'bg-status-error/10 text-status-error'
                    }`}
                  >
                    {attempt.percentage}%
                  </span>
                </div>

                <Link to={`/attempts/${attempt.examId}/results`}>
                  <Button size="sm" variant="outline">
                    Review →
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
