interface ProgressBarProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  variant?: 'auto' | 'teal' | 'gold' | 'success' | 'error';
  'aria-label': string;
}

const heightClasses: Record<string, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

function getAutoColor(value: number): string {
  if (value >= 90) return 'bg-status-success';
  if (value >= 60) return 'bg-brand-teal';
  return 'bg-brand-gold';
}

const variantColors: Record<string, string> = {
  teal: 'bg-brand-teal',
  gold: 'bg-brand-gold',
  success: 'bg-status-success',
  error: 'bg-status-error',
};

export function ProgressBar({
  value,
  size = 'md',
  showLabel = false,
  variant = 'auto',
  'aria-label': ariaLabel,
}: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));
  const fillColor = variant === 'auto' ? getAutoColor(clampedValue) : variantColors[variant];

  return (
    <div className="flex items-center gap-2 w-full">
      <div
        className={`flex-1 bg-border rounded-pill overflow-hidden ${heightClasses[size]}`}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      >
        <div
          className={`${fillColor} ${heightClasses[size]} rounded-pill transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-body-sm font-medium text-text-secondary min-w-[3rem] text-right">
          {clampedValue === 100 ? '✓' : `${clampedValue}%`}
        </span>
      )}
    </div>
  );
}
