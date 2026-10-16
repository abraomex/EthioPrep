import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../lib/i18n';
import { AccessBadge } from '../ui/AccessBadge';
import { Button } from '../ui/Button';
import type { MockChapter } from '../../lib/mockData';

interface TopicRowProps {
  chapter: MockChapter;
  defaultExpanded?: boolean;
}

export function TopicRow({ chapter, defaultExpanded = false }: TopicRowProps) {
  const { language, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-surface border border-border rounded-card overflow-hidden shadow-card transition-all">
      {/* Chapter Row Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-brand-bg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-teal"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3.5 pr-2">
          <span
            className={`w-6 h-6 rounded-full bg-brand-bg flex items-center justify-center text-xs font-bold text-brand-teal transition-transform duration-200 shrink-0 ${
              isExpanded ? 'rotate-90 bg-brand-teal text-white' : ''
            }`}
          >
            ▶
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-caption font-bold px-2 py-0.5 rounded bg-brand-navy/10 text-brand-navy">
                CH {chapter.chapterNumber}
              </span>
              <h3 className="font-bold text-body sm:text-h3 text-brand-navy">
                {language === 'am' ? chapter.titleAm : chapter.titleEn}
              </h3>
            </div>
            <p className="text-caption text-text-secondary mt-1 hidden sm:block">
              {language === 'am' ? chapter.descriptionAm : chapter.descriptionEn}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-caption text-text-muted hidden md:inline-block">
            {chapter.lessons.length} {t('subjects.topics')} • {chapter.questionCount} {t('subjects.questions')}
          </span>
          <span className="text-caption text-text-muted md:hidden">
            {chapter.lessons.length} L
          </span>
        </div>
      </button>

      {/* Expanded Lesson Sub-Tree */}
      {isExpanded && (
        <div className="border-t border-border bg-surface-muted divide-y divide-border">
          {chapter.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="px-5 sm:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brand-teal">{lesson.lessonNumber}</span>
                  <Link
                    to={`/lessons/${lesson.id}`}
                    className="font-semibold text-body-sm text-brand-navy hover:text-brand-teal transition-colors"
                  >
                    {language === 'am' ? lesson.titleAm : lesson.titleEn}
                  </Link>
                </div>
                <p className="text-caption text-text-secondary max-w-xl">
                  {language === 'am' ? lesson.summaryAm : lesson.summaryEn}
                </p>
              </div>

              <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                <span className="text-caption text-text-muted">
                  ⏱ {lesson.estimatedMinutes} min
                </span>
                <AccessBadge tier={lesson.accessTier} size="sm" />
                <Link to={`/lessons/${lesson.id}`}>
                  <Button size="sm" variant="ghost">Study →</Button>
                </Link>
              </div>
            </div>
          ))}

          {/* Chapter Practice CTA Footer */}
          <div className="p-4 bg-brand-bg/60 flex items-center justify-between flex-wrap gap-3">
            <span className="text-caption text-text-secondary font-medium">
              Ready to test your knowledge on Chapter {chapter.chapterNumber}?
            </span>
            <Link to={`/practice/${chapter.id}`}>
              <Button size="sm" variant="primary">
                Practice Chapter {chapter.chapterNumber} Questions ({chapter.questionCount} Qs) →
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

