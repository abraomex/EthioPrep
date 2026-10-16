import { useEffect } from 'react';

interface TimerProps {
  remainingSeconds: number;
  totalSeconds: number;
  onExpire: () => void;
  isPaused?: boolean;
  className?: string;
}

export function Timer({
  remainingSeconds,
  totalSeconds,
  onExpire,
  isPaused = false,
  className = '',
}: TimerProps) {
  useEffect(() => {
    if (isPaused) return;

    if (remainingSeconds <= 0) {
      onExpire();
    }
  }, [remainingSeconds, isPaused, onExpire]);

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  const formattedTime =
    hours > 0
      ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      : `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const timePct = Math.max(0, Math.min(100, (remainingSeconds / totalSeconds) * 100));

  // Determine urgency visual state
  const isCritical = remainingSeconds < 60; // < 1 min: pulse red
  const isWarning = remainingSeconds < 300 && !isCritical; // < 5 min: amber

  return (
    <div
      className={`flex items-center gap-2.5 px-3 py-1.5 rounded-badge border transition-colors select-none ${
        isCritical
          ? 'bg-status-error/15 border-status-error text-status-error animate-pulse'
          : isWarning
          ? 'bg-amber-500/15 border-amber-500 text-amber-400 font-bold'
          : 'bg-white/10 border-white/20 text-white font-medium'
      } ${className}`.trim()}
      role="timer"
      aria-live="polite"
      aria-label={`Time remaining: ${formattedTime}`}
    >
      <span className="text-base leading-none" role="img" aria-hidden="true">
        ⏱
      </span>
      <span className="font-mono text-body sm:text-lg font-bold tracking-wider">
        {formattedTime}
      </span>
      <div className="hidden sm:block w-12 h-1.5 bg-white/20 rounded-pill overflow-hidden">
        <div
          className={`h-full rounded-pill transition-all duration-1000 ${
            isCritical ? 'bg-status-error' : isWarning ? 'bg-amber-400' : 'bg-brand-teal'
          }`}
          style={{ width: `${timePct}%` }}
        />
      </div>
    </div>
  );
}

