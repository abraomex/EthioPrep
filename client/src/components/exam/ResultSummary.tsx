import { ProgressBar } from '../ui/ProgressBar';

export interface TopicScore {
  topicTitle: string;
  correct: number;
  total: number;
  percentage: number;
}

interface ResultSummaryProps {
  score: number;
  maxScore: number;
  timeTakenSeconds: number;
  totalTimeSeconds: number;
  topicBreakdown: TopicScore[];
  className?: string;
}

export function ResultSummary({
  score,
  maxScore,
  timeTakenSeconds,
  topicBreakdown,
  className = '',
}: ResultSummaryProps) {
  const percentage = Math.round((score / maxScore) * 100);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s.toString().padStart(2, '0')}s`;
  };

  let feedbackBadge = 'bg-status-success/10 text-status-success border-status-success/30';
  let feedbackText = 'Excellent! Exceptional national exam readiness!';
  let feedbackMessageAm = 'እጅግ በጣም ጥሩ! ለብሔራዊ ፈተና ከፍተኛ ዝግጁነት አሳይተዋል።';

  if (percentage < 50) {
    feedbackBadge = 'bg-status-error/10 text-status-error border-status-error/30';
    feedbackText = 'Needs Improvement. Review weak chapter lessons and retake.';
    feedbackMessageAm = 'መሻሻል ያስፈልጋል። ደካማ ምዕራፎችን በመከለስ እንደገና ይሞክሩ።';
  } else if (percentage < 70) {
    feedbackBadge = 'bg-amber-500/15 text-amber-700 border-amber-300';
    feedbackText = 'Fair Result. Focus on chapters scoring under 60%.';
    feedbackMessageAm = 'ተቀባይነት ያለው ውጤት። ከ60% በታች ባስመዘገቧቸው ምዕራፎች ላይ ያተኩሩ።';
  } else if (percentage < 90) {
    feedbackBadge = 'bg-brand-teal/10 text-brand-teal border-brand-teal/30';
    feedbackText = 'Good Work! Solid understanding of core concepts.';
    feedbackMessageAm = 'ጥሩ ሥራ! ዋና ዋና ፅንሰ-ሀሳቦችን በደንብ ተረድተዋል።';
  }

  return (
    <div className={`space-y-6 ${className}`.trim()}>
      {/* Score Header Card */}
      <div className="bg-surface rounded-card p-6 sm:p-8 border border-border shadow-card text-center space-y-4">
        <span className={`inline-block px-3 py-1 rounded-badge text-caption font-bold border ${feedbackBadge}`}>
          {feedbackText}
        </span>

        <div className="py-2">
          <div className="text-5xl sm:text-6xl font-black text-brand-navy tracking-tight">
            {percentage}%
          </div>
          <p className="text-body font-semibold text-text-secondary mt-1">
            {score} / {maxScore} Points Awarded
          </p>
          <p className="text-caption text-text-muted mt-0.5">
            ⏱ Time Taken: {formatTime(timeTakenSeconds)}
          </p>
        </div>

        <p className="text-body-sm text-text-secondary max-w-md mx-auto italic">
          "{feedbackMessageAm}"
        </p>
      </div>

      {/* Topic-by-Topic Mastery Breakdown */}
      <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="font-bold text-body sm:text-h3 text-brand-navy">
            Topic Performance Breakdown
          </h3>
          <span className="text-caption text-text-muted">Target: ≥ 70%</span>
        </div>

        <div className="space-y-4">
          {topicBreakdown.map((t, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-body-sm">
                <span className="font-medium text-text-primary">{t.topicTitle}</span>
                <span className={`font-bold ${t.percentage < 60 ? 'text-status-error' : 'text-brand-navy'}`}>
                  {t.correct} / {t.total} ({t.percentage}%)
                </span>
              </div>
              <ProgressBar
                value={t.percentage}
                variant={t.percentage < 60 ? 'error' : t.percentage < 80 ? 'teal' : 'success'}
                aria-label={`Mastery for ${t.topicTitle}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

