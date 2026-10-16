import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { Button } from '../components/ui/Button';

export function HistoryPage() {
  const { t } = useLanguage();

  const attempts = [
    {
      id: 'att-1',
      examTitle: 'Grade 12 Mathematics National Mock Examination 1',
      score: 34,
      maxScore: 40,
      percentage: 85,
      date: '2026-10-15',
      timeTaken: '64 min',
    },
    {
      id: 'att-2',
      examTitle: 'Physics Mechanics Midterm Practice',
      score: 22,
      maxScore: 30,
      percentage: 73,
      date: '2026-10-12',
      timeTaken: '45 min',
    },
    {
      id: 'att-3',
      examTitle: 'Chemistry Chemical Equilibrium Quiz',
      score: 11,
      maxScore: 20,
      percentage: 55,
      date: '2026-10-08',
      timeTaken: '30 min',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 font-bold text-brand-navy mb-1">{t('nav.history')}</h1>
        <p className="text-body-sm text-text-secondary">
          Review your past exam attempts, scores, and explanations
        </p>
      </div>

      <div className="bg-surface rounded-card border border-border shadow-card overflow-hidden">
        <div className="divide-y divide-border">
          {attempts.map((att) => (
            <div key={att.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-brand-bg transition-colors">
              <div>
                <span className="text-caption text-text-muted">{att.date} • {att.timeTaken}</span>
                <h3 className="font-bold text-body text-brand-navy mt-1">{att.examTitle}</h3>
                <div className="flex items-center gap-3 mt-2 text-caption">
                  <span className="font-semibold text-text-primary">
                    Score: {att.score}/{att.maxScore}
                  </span>
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    att.percentage >= 80
                      ? 'bg-status-success/10 text-status-success'
                      : att.percentage >= 60
                      ? 'bg-brand-teal/10 text-brand-teal'
                      : 'bg-status-error/10 text-status-error'
                  }`}>
                    {att.percentage}%
                  </span>
                </div>
              </div>
              <Link to={`/attempts/${att.id}/results`}>
                <Button size="sm" variant="outline">
                  View Results &amp; Explanations →
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

