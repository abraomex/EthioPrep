interface LoadingStateProps {
  variant?: 'spinner' | 'skeleton' | 'dots';
  size?: 'sm' | 'md' | 'lg' | 'full-page';
  label?: string;
}

const spinnerSizes: Record<string, string> = {
  sm: 'h-5 w-5',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  'full-page': 'h-16 w-16',
};

export function LoadingState({ variant = 'spinner', size = 'md', label }: LoadingStateProps) {
  if (variant === 'dots') {
    return (
      <div className="flex items-center gap-1" role="status" aria-label={label ?? 'Loading'}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-2 bg-brand-teal rounded-full animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'skeleton') {
    return (
      <div className="animate-pulse space-y-3" role="status" aria-label={label ?? 'Loading'}>
        <div className="h-6 bg-brand-bg-alt rounded-badge w-3/4" />
        <div className="h-4 bg-brand-bg-alt rounded-badge w-full" />
        <div className="h-4 bg-brand-bg-alt rounded-badge w-5/6" />
        <div className="h-4 bg-brand-bg-alt rounded-badge w-2/3" />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${size === 'full-page' ? 'min-h-[60vh]' : ''}`}
      role="status"
      aria-label={label ?? 'Loading'}
    >
      <svg
        className={`animate-spin text-brand-teal ${spinnerSizes[size]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      {label && <p className="text-body-sm text-text-muted">{label}</p>}
    </div>
  );
}
