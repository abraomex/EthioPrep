import { Button } from './Button';

interface ErrorMessageProps {
  title: string;
  message: string;
  type?: 'inline' | 'banner' | 'page';
  onRetry?: () => void;
  onDismiss?: () => void;
}

export function ErrorMessage({
  title,
  message,
  type = 'banner',
  onRetry,
  onDismiss,
}: ErrorMessageProps) {
  if (type === 'inline') {
    return (
      <p className="text-body-sm text-status-error" role="alert">
        {message}
      </p>
    );
  }

  if (type === 'page') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center" role="alert">
        <span className="text-6xl mb-4" role="img" aria-hidden="true">⚠️</span>
        <h2 className="text-h2 font-semibold text-text-primary mb-2">{title}</h2>
        <p className="text-body text-text-secondary max-w-md mb-6">{message}</p>
        {onRetry && (
          <Button variant="primary" onClick={onRetry}>
            Try Again
          </Button>
        )}
      </div>
    );
  }

  // Banner
  return (
    <div
      className="bg-red-50 border-l-4 border-status-error px-4 py-3 rounded-badge flex items-start justify-between gap-3"
      role="alert"
    >
      <div>
        <p className="text-body-sm font-semibold text-status-error">{title}</p>
        <p className="text-body-sm text-text-secondary">{message}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {onRetry && (
          <Button variant="ghost" size="sm" onClick={onRetry}>
            Retry
          </Button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-text-muted hover:text-text-primary text-lg leading-none"
            aria-label="Dismiss"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
