import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { Button } from '../components/ui/Button';

export function ExamResultsPage() {
  const { t } = useLanguage();

  const results = {
    score: 34,
    maxScore: 40,
    percentage: 85,
    timeTakenSeconds: 3840, // 64 min
    topicBreakdown: [
      { topic: 'Limits and Continuity', score: 9, total: 10, pct: 90 },
      { topic: 'Derivatives and Applications', score: 14, total: 15, pct: 93 },
      { topic: 'Integrals and Techniques', score: 7, total: 10, pct: 70 },
      { topic: 'Vectors & Coordinate Geometry', score: 4, total: 5, pct: 80 },
    ],
    questions: [
      {
        num: 1,
        prompt: 'If f(x) = 3x^2 - 4x + 7, what is f\'(2)?',
        yourAnswer: '8 (Option A)',
        correctAnswer: '8 (Option A)',
        isCorrect: true,
        explanation: 'f\'(x) = 6x - 4. Substituting x = 2 gives 6(2) - 4 = 12 - 4 = 8.',
      },
      {
        num: 2,
        prompt: 'What is the limit of (sin x)/x as x approaches 0?',
        yourAnswer: '1 (Option B)',
        correctAnswer: '1 (Option B)',
        isCorrect: true,
        explanation: 'Standard trigonometric limit theorem: lim_{x->0} (sin x)/x = 1.',
      },
      {
        num: 3,
        prompt: 'The area under the curve y = 2x from x = 0 to x = 3 is equal to:',
        yourAnswer: '6 (Option A)',
        correctAnswer: '9 (Option B)',
        isCorrect: false,
        explanation: 'Integral of 2x dx from 0 to 3 is [x^2]_0^3 = 3^2 - 0 = 9.',
      },
    ],
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 py-8 space-y-8">
      {/* Result Summary Card */}
      <div className="bg-surface rounded-card p-6 md:p-8 border border-border shadow-card text-center space-y-4">
        <span className="text-caption font-bold uppercase tracking-wider text-status-success">
          Exam Completed &amp; Graded
        </span>
        <h1 className="text-h1 font-bold text-brand-navy">
          {t('results.title')}
        </h1>

        <div className="flex items-center justify-center gap-6 py-4">
          <div>
            <p className="text-4xl md:text-5xl font-black text-brand-teal">
              {results.percentage}%
            </p>
            <p className="text-body-sm font-semibold text-text-secondary mt-1">
              {results.score} / {results.maxScore} pts
            </p>
          </div>
        </div>

        <p className="text-body font-semibold text-brand-navy">
          {t('results.good')}
        </p>

        <div className="pt-4 border-t border-border flex flex-wrap items-center justify-center gap-3">
          <Link to="/dashboard">
            <Button variant="primary">Return to Dashboard</Button>
          </Link>
          <Link to="/exams/math-mock-1/instructions">
            <Button variant="outline">Retake Exam</Button>
          </Link>
        </div>
      </div>

      {/* Topic-by-Topic Breakdown */}
      <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-4">
        <h3 className="text-h3 font-bold text-brand-navy">{t('results.topicBreakdown')}</h3>
        <div className="space-y-3">
          {results.topicBreakdown.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-body-sm font-medium">
                <span>{item.topic}</span>
                <span>{item.score} / {item.total} ({item.pct}%)</span>
              </div>
              <div className="w-full bg-border rounded-pill h-2 overflow-hidden">
                <div
                  className={`h-full rounded-pill ${item.pct >= 80 ? 'bg-status-success' : 'bg-brand-gold'}`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Question by Question Review */}
      <div className="space-y-4">
        <h3 className="text-h3 font-bold text-brand-navy">{t('results.questionReview')}</h3>
        {results.questions.map((q) => (
          <div
            key={q.num}
            className={`p-5 rounded-card border shadow-card space-y-3 bg-surface ${
              q.isCorrect ? 'border-status-success/30' : 'border-status-error/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-body-sm text-text-muted">Question {q.num}</span>
              <span
                className={`px-2.5 py-0.5 rounded-badge text-caption font-bold ${
                  q.isCorrect
                    ? 'bg-status-success/10 text-status-success'
                    : 'bg-status-error/10 text-status-error'
                }`}
              >
                {q.isCorrect ? '✓ Correct' : '✗ Incorrect'}
              </span>
            </div>

            <p className="font-bold text-body text-brand-navy">{q.prompt}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body-sm">
              <div className="p-2.5 rounded bg-brand-bg">
                <span className="text-caption text-text-muted block">Your Answer:</span>
                <span className={q.isCorrect ? 'text-status-success font-semibold' : 'text-status-error font-semibold'}>
                  {q.yourAnswer}
                </span>
              </div>
              <div className="p-2.5 rounded bg-brand-bg">
                <span className="text-caption text-text-muted block">Correct Answer:</span>
                <span className="text-status-success font-semibold">
                  {q.correctAnswer}
                </span>
              </div>
            </div>

            <div className="pt-2 text-body-sm text-text-secondary bg-surface-muted p-3 rounded border border-border">
              <strong className="text-brand-navy block mb-1">Explanation:</strong>
              {q.explanation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

