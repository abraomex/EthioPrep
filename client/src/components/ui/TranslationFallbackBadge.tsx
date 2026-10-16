import { useLanguage } from '../../lib/i18n';

interface TranslationFallbackBadgeProps {
  className?: string;
}

export function TranslationFallbackBadge({ className = '' }: TranslationFallbackBadgeProps) {
  const { t } = useLanguage();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-caption font-medium bg-amber-50 text-amber-800 border border-amber-200 rounded-badge ${className}`}
      role="note"
      aria-label="Translation pending notice"
    >
      <span className="text-amber-500 font-bold" aria-hidden="true">
        ℹ
      </span>
      {t('lesson.translationPending')}
    </span>
  );
}

