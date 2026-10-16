import { Link } from 'react-router-dom';
import { useLanguage } from '../../lib/i18n';
import { AccessBadge } from '../ui/AccessBadge';
import type { MockSubjectWithDetails } from '../../lib/mockData';

interface SubjectCardProps {
  subject: MockSubjectWithDetails;
  showStats?: boolean;
}

export function SubjectCard({ subject, showStats = true }: SubjectCardProps) {
  const { language, t } = useLanguage();

  const streamBadgeColors: Record<string, string> = {
    natural_science: 'bg-brand-teal/10 text-brand-teal border-brand-teal/20',
    social_science: 'bg-brand-gold/15 text-brand-gold-dark border-brand-gold/30',
    common: 'bg-brand-navy/10 text-brand-navy border-brand-navy/20',
  };

  const streamLabels: Record<string, string> = {
    natural_science: t('home.streams.natural'),
    social_science: t('home.streams.social'),
    common: t('home.streams.common'),
  };

  return (
    <Link
      to={`/subjects/${subject.slug}`}
      className="p-6 rounded-card bg-surface border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-teal"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl select-none" role="img" aria-hidden="true">
              {subject.icon}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-badge text-caption font-bold border ${
                streamBadgeColors[subject.stream] || streamBadgeColors.common
              }`}
            >
              {streamLabels[subject.stream] || subject.stream.replace('_', ' ')}
            </span>
          </div>
          <AccessBadge tier="free" size="sm" />
        </div>

        <h3 className="text-h3 font-bold text-brand-navy group-hover:text-brand-teal transition-colors mb-2">
          {language === 'am' ? subject.titleAm : subject.titleEn}
        </h3>

        <p className="text-body-sm text-text-secondary line-clamp-3 leading-relaxed mb-4">
          {language === 'am' ? subject.descriptionAm : subject.descriptionEn}
        </p>
      </div>

      {showStats && (
        <div className="pt-4 border-t border-border flex items-center justify-between text-caption text-text-muted">
          <span className="flex items-center gap-1 font-medium">
            <span>📚</span>
            <span>{subject.chapters?.length || subject.topicCount} {t('subjects.chapters')}</span>
          </span>
          <span className="flex items-center gap-1 font-medium">
            <span>❓</span>
            <span>{subject.questionCount} {t('subjects.questions')}</span>
          </span>
        </div>
      )}
    </Link>
  );
}

