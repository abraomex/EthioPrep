import type { KeyboardEvent } from 'react';

interface QuestionOptionProps {
  label: string;
  text: string;
  isSelected: boolean;
  onSelect: () => void;
  reviewMode?: boolean;
  isCorrect?: boolean;
  wasSelected?: boolean;
  disabled?: boolean;
  className?: string;
}

export function QuestionOption({
  label,
  text,
  isSelected,
  onSelect,
  reviewMode = false,
  isCorrect,
  wasSelected,
  disabled = false,
  className = '',
}: QuestionOptionProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
      e.preventDefault();
      onSelect();
    }
  };

  // Determine appearance in review mode vs active exam mode
  let containerStyle = 'border-border bg-surface hover:bg-brand-bg hover:border-brand-teal/40';
  let badgeStyle = 'bg-surface-muted text-text-secondary border-border';

  if (reviewMode) {
    if (isCorrect) {
      containerStyle = 'border-status-success bg-green-50/80 ring-1 ring-status-success text-status-success';
      badgeStyle = 'bg-status-success text-white border-status-success';
    } else if (wasSelected && !isCorrect) {
      containerStyle = 'border-status-error bg-red-50/80 ring-1 ring-status-error text-status-error';
      badgeStyle = 'bg-status-error text-white border-status-error';
    } else {
      containerStyle = 'border-border bg-surface opacity-70';
      badgeStyle = 'bg-surface-muted text-text-muted border-border';
    }
  } else if (isSelected) {
    containerStyle = 'border-brand-teal bg-brand-teal/10 font-bold ring-2 ring-brand-teal/20 text-brand-navy';
    badgeStyle = 'bg-brand-teal text-white border-brand-teal shadow-sm';
  }

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      disabled={disabled}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className={`
        w-full p-4 rounded-button border text-left flex items-start sm:items-center gap-3.5 transition-all duration-150 cursor-pointer
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal
        ${disabled ? 'cursor-default' : ''}
        ${containerStyle}
        ${className}
      `.trim()}
    >
      <span
        className={`
          w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border transition-colors
          ${badgeStyle}
        `.trim()}
      >
        {reviewMode && isCorrect ? '✓' : reviewMode && wasSelected && !isCorrect ? '✗' : label}
      </span>

      <span className="text-body flex-1 leading-relaxed text-text-primary">
        {text}
      </span>

      {reviewMode && isCorrect && (
        <span className="text-caption font-bold text-status-success uppercase shrink-0">
          Correct
        </span>
      )}
      {reviewMode && wasSelected && !isCorrect && (
        <span className="text-caption font-bold text-status-error uppercase shrink-0">
          Your Answer
        </span>
      )}
    </button>
  );
}

