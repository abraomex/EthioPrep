import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { AccessBadge } from '../components/ui/AccessBadge';
import { mockFullLessons } from '../lib/mockLessons';

interface BookmarkItem {
  id: string;
  targetId: string;
  type: 'lesson' | 'question';
  titleEn: string;
  titleAm: string;
  subjectTitle: string;
  chapterTitle: string;
  link: string;
  tier: 'free' | 'premium';
}

export function BookmarksPage() {
  const { t, language } = useLanguage();
  const [filterType, setFilterType] = useState<'all' | 'lesson' | 'question'>('all');
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ethioprep_bookmarks');
      const savedIds: string[] = saved ? JSON.parse(saved) : [];

      // Always populate with demo bookmarks if empty so user has an immediate interactive experience
      const initialIds = savedIds.length > 0 ? savedIds : ['les-math-201', 'les-math-101'];

      const mapped: BookmarkItem[] = initialIds.map((id) => {
        const full = mockFullLessons[id];
        if (full) {
          return {
            id,
            targetId: id,
            type: 'lesson',
            titleEn: `${full.lessonNumber} ${full.titleEn}`,
            titleAm: `${full.lessonNumber} ${full.titleAm}`,
            subjectTitle: full.subjectTitleEn,
            chapterTitle: full.chapterTitleEn,
            link: `/lessons/${full.id}`,
            tier: full.accessTier,
          };
        }
        return {
          id,
          targetId: id,
          type: 'lesson',
          titleEn: 'Calculus Limit Definition',
          titleAm: 'የሊሚት መሰረታዊ ትርጉም',
          subjectTitle: 'Mathematics',
          chapterTitle: 'Limits and Continuity',
          link: `/lessons/${id}`,
          tier: 'free',
        };
      });

      // Add a sample question bookmark as well
      mapped.push({
        id: 'bm-q-1',
        targetId: 'q-101',
        type: 'question',
        titleEn: 'Evaluating indeterminate form 0/0 using conjugate multiplication',
        titleAm: 'ያልተወሰነ ቅርጽ 0/0 በኮንጁጌት ማባዛት የማስላት ጥያቄ',
        subjectTitle: 'Mathematics',
        chapterTitle: 'Limits and Continuity',
        link: '/practice/math-ch2',
        tier: 'free',
      });

      setBookmarks(mapped);
    } catch {
      // Ignore
    }
  }, []);

  const handleRemove = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    try {
      const remainingLessonIds = updated
        .filter((b) => b.type === 'lesson')
        .map((b) => b.targetId);
      localStorage.setItem('ethioprep_bookmarks', JSON.stringify(remainingLessonIds));
    } catch {
      // Ignore
    }
  };

  const filtered = bookmarks.filter((b) => {
    if (filterType === 'all') return true;
    return b.type === filterType;
  });

  return (
    <div className="max-w-[900px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-caption font-bold text-brand-teal uppercase tracking-wider">
            Saved Content
          </span>
          <h1 className="text-h1 font-bold text-brand-navy mt-1">
            {t('nav.bookmarks')}
          </h1>
          <p className="text-body-sm text-text-secondary">
            Quickly review saved lessons and questions from your past study sessions
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-surface p-1 rounded-card border border-border self-start sm:self-auto">
          {[
            { id: 'all', label: 'All Saved' },
            { id: 'lesson', label: '📖 Lessons' },
            { id: 'question', label: '❓ Questions' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterType(tab.id as typeof filterType)}
              className={`
                px-3 py-1.5 rounded-button text-caption font-bold transition-colors cursor-pointer
                ${filterType === tab.id
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
                }
              `.trim()}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookmarks List or Empty State */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="bookmarks"
          title={language === 'am' ? 'ምንም ዕልባቶች የሉም' : 'No Bookmarks Found'}
          description={
            language === 'am'
              ? 'በትምህርት ወቅት አስቸጋሪ ርዕሶችን ወይም ጥያቄዎችን በዕልባት ምልክት በማድረግ እዚህ ማግኘት ይችላሉ።'
              : 'Save challenging lessons and questions while studying to review them before your exam.'
          }
          action={{
            label: 'Browse Subjects',
            onClick: () => window.location.assign('/subjects'),
          }}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-card bg-surface border border-border shadow-card hover:shadow-card-hover transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-caption font-bold text-brand-teal uppercase">
                    {item.subjectTitle} • {item.chapterTitle}
                  </span>
                  <span className="text-caption px-2 py-0.5 rounded bg-brand-bg text-text-muted capitalize">
                    {item.type}
                  </span>
                  <AccessBadge tier={item.tier} size="sm" />
                </div>

                <h3 className="font-bold text-body text-brand-navy">
                  {language === 'am' ? item.titleAm : item.titleEn}
                </h3>
              </div>

              <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                <Link to={item.link}>
                  <Button size="sm" variant="primary">
                    {item.type === 'lesson' ? 'Open Lesson →' : 'Practice Question →'}
                  </Button>
                </Link>

                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="p-2 rounded-button text-text-muted hover:text-status-error hover:bg-red-50 transition-colors cursor-pointer text-sm font-bold"
                  title="Remove from bookmarks"
                  aria-label="Remove bookmark"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
