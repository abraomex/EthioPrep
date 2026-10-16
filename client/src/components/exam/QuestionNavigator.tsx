interface QuestionNavigatorProps {
  totalQuestions: number;
  currentIndex: number;
  answeredIndices: Set<number>;
  flaggedIndices: Set<number>;
  onNavigate: (index: number) => void;
  className?: string;
}

export function QuestionNavigator({
  totalQuestions,
  currentIndex,
  answeredIndices,
  flaggedIndices,
  onNavigate,
  className = '',
}: QuestionNavigatorProps) {
  const answeredCount = answeredIndices.size;
  const flaggedCount = flaggedIndices.size;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className={`bg-surface rounded-card p-4 border border-border shadow-card space-y-4 ${className}`.trim()}>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-body-sm text-brand-navy">Question Navigator</h3>
        <span className="text-caption text-text-muted">
          {currentIndex + 1} of {totalQuestions}
        </span>
      </div>

      {/* Grid of Question Number Buttons */}
      <div className="grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto pr-1">
        {Array.from({ length: totalQuestions }, (_, idx) => {
          const isCurrent = idx === currentIndex;
          const isAnswered = answeredIndices.has(idx);
          const isFlagged = flaggedIndices.has(idx);

          let cellClass = 'bg-surface text-text-primary border-border hover:bg-brand-bg';
          if (isAnswered && isFlagged) {
            cellClass = 'bg-brand-teal text-white border-brand-gold ring-2 ring-brand-gold';
          } else if (isAnswered) {
            cellClass = 'bg-brand-teal text-white border-brand-teal';
          } else if (isFlagged) {
            cellClass = 'bg-brand-gold text-white border-brand-gold';
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onNavigate(idx)}
              className={`
                aspect-square rounded-button border text-xs font-bold flex items-center justify-center transition-all cursor-pointer relative
                ${cellClass}
                ${isCurrent ? 'ring-2 ring-brand-navy ring-offset-2' : ''}
              `}
              aria-label={`Question ${idx + 1}${isAnswered ? ', answered' : ', unanswered'}${isFlagged ? ', flagged' : ''}`}
            >
              {idx + 1}
              {isFlagged && (
                <span className="absolute -top-1 -right-1 text-[10px] leading-none">
                  🚩
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend & Stats */}
      <div className="pt-3 border-t border-border grid grid-cols-2 gap-2 text-caption text-text-secondary">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-brand-teal shrink-0" />
          <span>Answered ({answeredCount})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-surface border border-border shrink-0" />
          <span>Unanswered ({unansweredCount})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-brand-gold shrink-0" />
          <span>Flagged ({flaggedCount})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full border-2 border-brand-navy shrink-0" />
          <span>Current (Q{currentIndex + 1})</span>
        </div>
      </div>
    </div>
  );
}

