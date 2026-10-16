import { useLanguage } from '../../lib/i18n';

interface AccessBadgeProps {
  tier: 'free' | 'premium';
  size?: 'sm' | 'md';
}

const tierStyles: Record<string, string> = {
  free: 'bg-status-success/10 text-status-success border-status-success/20',
  premium: 'bg-brand-gold/10 text-brand-gold-dark border-brand-gold/20',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-2 py-0.5 text-caption',
  md: 'px-3 py-1 text-body-sm',
};

export function AccessBadge({ tier, size = 'sm' }: AccessBadgeProps) {
  const { t } = useLanguage();

  return (
    <span
      className={`
        inline-flex items-center font-medium border rounded-badge
        ${tierStyles[tier]}
        ${sizeStyles[size]}
      `.trim()}
    >
      {tier === 'free' ? t('common.free') : t('common.premium')}
    </span>
  );
}
