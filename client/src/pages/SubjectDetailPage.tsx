import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { Button } from '../components/ui/Button';
import { AccessBadge } from '../components/ui/AccessBadge';
import { TopicRow } from '../components/subjects/TopicRow';
import { EmptyState } from '../components/ui/EmptyState';
import { mockSubjects } from '../lib/mockData';

export function SubjectDetailPage() {
  const { slug } = useParams();
  const { language, t } = useLanguage();

  const subject = mockSubjects.find((s) => s.slug === slug) || mockSubjects[0];

  if (!subject) {
    return (
      <div className="max-w-[1000px] mx-auto px-4 py-16">
        <EmptyState
          icon="subjects"
          title="Subject Not Found"
          description="The requested subject syllabus does not exist or has been archived."
          action={{
            label: "Return to Subjects",
            onClick: () => window.location.assign("/subjects"),
          }}
        />
      </div>
    );
  }

  const streamLabels: Record<string, string> = {
    natural_science: t('home.streams.natural'),
    social_science: t('home.streams.social'),
    common: t('home.streams.common'),
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-caption text-text-muted mb-6" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-brand-teal transition-colors">
          {t('nav.home')}
        </Link>
        <span>/</span>
        <Link to="/subjects" className="hover:text-brand-teal transition-colors">
          {t('nav.subjects')}
        </Link>
        <span>/</span>
        <span className="text-brand-navy font-semibold">
          {language === 'am' ? subject.titleAm : subject.titleEn}
        </span>
      </nav>

      {/* Subject Header Banner Card */}
      <div className="bg-surface rounded-card p-6 md:p-8 border border-border shadow-card mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl select-none" role="img" aria-hidden="true">
              {subject.icon}
            </span>
            <div>
              <span className="px-2.5 py-0.5 rounded-badge text-caption font-bold bg-brand-teal/10 text-brand-teal border border-brand-teal/20 uppercase tracking-wide">
                {streamLabels[subject.stream] || subject.stream.replace('_', ' ')}
              </span>
              <span className="ml-2">
                <AccessBadge tier="free" size="sm" />
              </span>
            </div>
          </div>

          <Link to={`/exams/${subject.slug}-mock-1/instructions`}>
            <Button variant="primary" size="md" className="shadow-sm">
              Practice {language === 'am' ? subject.titleAm : subject.titleEn} Mock Exam →
            </Button>
          </Link>
        </div>

        <h1 className="text-h1 sm:text-3xl font-black text-brand-navy mb-3">
          {language === 'am' ? subject.titleAm : subject.titleEn}
        </h1>

        <p className="text-body text-text-secondary leading-relaxed max-w-3xl mb-6">
          {language === 'am' ? subject.descriptionAm : subject.descriptionEn}
        </p>

        {/* Quick Stats Bar */}
        <div className="pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-body-sm">
          <div>
            <span className="text-caption text-text-muted block">Chapters</span>
            <span className="font-bold text-brand-navy text-lg">{subject.chapters.length}</span>
          </div>
          <div>
            <span className="text-caption text-text-muted block">Total Lessons</span>
            <span className="font-bold text-brand-navy text-lg">
              {subject.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)}
            </span>
          </div>
          <div>
            <span className="text-caption text-text-muted block">Question Bank</span>
            <span className="font-bold text-brand-navy text-lg">{subject.questionCount} Qs</span>
          </div>
          <div>
            <span className="text-caption text-text-muted block">Language Support</span>
            <span className="font-bold text-brand-teal text-lg">EN + አማ</span>
          </div>
        </div>
      </div>

      {/* Chapters Outline Tree */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-h2 font-bold text-brand-navy">
            {language === 'am' ? 'የሥርዓተ-ትምህርት ምዕራፎች' : 'Curriculum Chapters'}
          </h2>
          <span className="text-caption text-text-muted">
            Tap a chapter to reveal lessons &amp; practice sets
          </span>
        </div>

        {subject.chapters.map((chapter, index) => (
          <TopicRow
            key={chapter.id}
            chapter={chapter}
            defaultExpanded={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
