import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { useAuth } from '../lib/auth/AuthContext';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';

export function DashboardPage() {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-surface rounded-card p-6 border border-border shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-caption font-bold text-brand-teal uppercase tracking-wider">
            {user?.stream.replace('_', ' ')} Stream
          </span>
          <h1 className="text-h1 font-bold text-brand-navy mt-1">
            {t('dashboard.welcome')}, {user?.displayName}!
          </h1>
          <p className="text-body-sm text-text-secondary mt-1">
            {language === 'am' ? 'የጥናት እድገትዎን እና የቅርብ ጊዜ ውጤቶችዎን ይከታተሉ' : 'Track your learning progress, review mistakes, and prepare for your national exam'}
          </p>
        </div>
        <Link to="/exams/math-mock-1/instructions">
          <Button variant="primary">
            Start Practice Exam →
          </Button>
        </Link>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-surface rounded-card border border-border shadow-card">
          <p className="text-caption text-text-muted">{t('dashboard.lessons')}</p>
          <p className="text-2xl font-bold text-brand-navy mt-1">24 / 86</p>
          <p className="text-caption text-status-success font-medium mt-1">28% completed</p>
        </div>
        <div className="p-4 bg-surface rounded-card border border-border shadow-card">
          <p className="text-caption text-text-muted">{t('dashboard.tests')}</p>
          <p className="text-2xl font-bold text-brand-navy mt-1">8 taken</p>
          <p className="text-caption text-text-muted mt-1">3 this week</p>
        </div>
        <div className="p-4 bg-surface rounded-card border border-border shadow-card">
          <p className="text-caption text-text-muted">{t('dashboard.avgScore')}</p>
          <p className="text-2xl font-bold text-brand-teal mt-1">74%</p>
          <p className="text-caption text-status-success font-medium mt-1">+6% vs last week</p>
        </div>
        <div className="p-4 bg-surface rounded-card border border-border shadow-card">
          <p className="text-caption text-text-muted">{t('dashboard.studyTime')}</p>
          <p className="text-2xl font-bold text-brand-navy mt-1">14.5 hrs</p>
          <p className="text-caption text-text-muted mt-1">Keep it up!</p>
        </div>
      </div>

      {/* Continue Learning & Study Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Learning Card */}
        <div className="p-6 bg-surface rounded-card border border-border shadow-card flex flex-col justify-between">
          <div>
            <span className="text-caption font-bold text-brand-teal uppercase">
              {t('dashboard.continueLearning')}
            </span>
            <h3 className="text-h3 font-bold text-brand-navy mt-2">
              Mathematics: Chapter 2 — Derivatives
            </h3>
            <p className="text-body-sm text-text-secondary mt-1">
              Lesson 2.3: The Chain Rule and Power Rule Applications
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-caption text-text-muted mb-1">
                <span>Progress</span>
                <span>65%</span>
              </div>
              <ProgressBar value={65} aria-label="Lesson progress" />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-caption text-text-muted">~8 min left</span>
            <Link to="/lessons/les-5">
              <Button size="sm" variant="primary">
                {t('dashboard.continue')} →
              </Button>
            </Link>
          </div>
        </div>

        {/* Rule-Based Recommendations */}
        <div className="p-6 bg-surface rounded-card border border-border shadow-card">
          <span className="text-caption font-bold text-brand-gold-dark uppercase">
            {t('dashboard.recommendations')}
          </span>
          <h3 className="text-h3 font-bold text-brand-navy mt-2 mb-4">
            Topics Needing Attention (&lt;60% Accuracy)
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-button bg-red-50 border border-red-200 flex items-center justify-between">
              <div>
                <p className="text-body-sm font-bold text-red-900">
                  Physics: Thermodynamics (42% accuracy)
                </p>
                <p className="text-caption text-red-700">Missed 7 out of 12 questions in last quiz</p>
              </div>
              <Link to="/lessons/physics-thermo">
                <Button size="sm" variant="danger">Review</Button>
              </Link>
            </div>
            <div className="p-3 rounded-button bg-amber-50 border border-amber-200 flex items-center justify-between">
              <div>
                <p className="text-body-sm font-bold text-amber-900">
                  Math: Integration by Parts (54% accuracy)
                </p>
                <p className="text-caption text-amber-700">Review worked examples and formula rules</p>
              </div>
              <Link to="/lessons/math-integrals">
                <Button size="sm" variant="outline">Study</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Mastery Progress Bars */}
      <div className="p-6 bg-surface rounded-card border border-border shadow-card">
        <h3 className="text-h3 font-bold text-brand-navy mb-4">{t('dashboard.topicMastery')}</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-body-sm font-medium mb-1">
              <span>Calculus: Limits &amp; Continuity</span>
              <span>85%</span>
            </div>
            <ProgressBar value={85} aria-label="Limits mastery" />
          </div>
          <div>
            <div className="flex justify-between text-body-sm font-medium mb-1">
              <span>Physics: Mechanics &amp; Motion</span>
              <span>92%</span>
            </div>
            <ProgressBar value={92} aria-label="Mechanics mastery" />
          </div>
          <div>
            <div className="flex justify-between text-body-sm font-medium mb-1">
              <span>Chemistry: Reaction Kinetics</span>
              <span>68%</span>
            </div>
            <ProgressBar value={68} aria-label="Kinetics mastery" />
          </div>
          <div>
            <div className="flex justify-between text-body-sm font-medium mb-1">
              <span className="text-red-700 font-semibold">Physics: Thermodynamics (Weak)</span>
              <span className="text-red-700 font-semibold">42%</span>
            </div>
            <ProgressBar value={42} variant="error" aria-label="Thermodynamics mastery" />
          </div>
        </div>
      </div>
    </div>
  );
}

