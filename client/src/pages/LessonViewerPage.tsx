import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { Button } from '../components/ui/Button';
import { TranslationFallbackBadge } from '../components/ui/TranslationFallbackBadge';
import { LessonContent } from '../components/learning/LessonContent';
import { AccessBadge } from '../components/ui/AccessBadge';
import { mockFullLessons } from '../lib/mockLessons';
import { mockSubjects } from '../lib/mockData';

export function LessonViewerPage() {
  const { id } = useParams();
  const { language, t } = useLanguage();

  const lessonId = id || 'les-math-201';
  const lesson = mockFullLessons[lessonId] || mockFullLessons['les-math-201'];

  // Current Subject and Chapter hierarchy for sidebar
  const currentSubject =
    mockSubjects.find((s) => s.slug === lesson.subjectSlug) || mockSubjects[0];

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Bookmarks persistence
  const [isBookmarked, setIsBookmarked] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ethioprep_bookmarks');
      if (saved) {
        const list = JSON.parse(saved);
        setIsBookmarked(list.includes(lesson.id));
      }
    } catch {
      // Ignore
    }
  }, [lesson.id]);

  const toggleBookmark = () => {
    try {
      const saved = localStorage.getItem('ethioprep_bookmarks');
      const list: string[] = saved ? JSON.parse(saved) : [];
      let updated: string[];
      if (list.includes(lesson.id)) {
        updated = list.filter((item) => item !== lesson.id);
        setIsBookmarked(false);
      } else {
        updated = [...list, lesson.id];
        setIsBookmarked(true);
      }
      localStorage.setItem('ethioprep_bookmarks', JSON.stringify(updated));
    } catch {
      setIsBookmarked(!isBookmarked);
    }
  };

  // Completion persistence
  const [isCompleted, setIsCompleted] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ethioprep_completed_lessons');
      if (saved) {
        const list = JSON.parse(saved);
        setIsCompleted(list.includes(lesson.id));
      }
    } catch {
      // Ignore
    }
  }, [lesson.id]);

  const toggleComplete = () => {
    try {
      const saved = localStorage.getItem('ethioprep_completed_lessons');
      const list: string[] = saved ? JSON.parse(saved) : [];
      let updated: string[];
      if (list.includes(lesson.id)) {
        updated = list.filter((item) => item !== lesson.id);
        setIsCompleted(false);
      } else {
        updated = [...list, lesson.id];
        setIsCompleted(true);
      }
      localStorage.setItem('ethioprep_completed_lessons', JSON.stringify(updated));
    } catch {
      setIsCompleted(!isCompleted);
    }
  };

  const lessonBody =
    language === 'am' && lesson.hasAmharic ? lesson.bodyAm : lesson.bodyEn;

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col bg-brand-bg">
      {/* Top Breadcrumb & Control Bar */}
      <div className="sticky top-16 z-20 bg-surface border-b border-border px-4 py-2.5 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2 text-caption text-text-muted truncate">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:inline-flex p-1.5 rounded-badge hover:bg-brand-bg text-brand-navy font-bold cursor-pointer"
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarOpen ? '◀ Hide Topics' : '▶ Show Topics'}
          </button>
          <span className="hidden md:inline-block">|</span>
          <Link to={`/subjects/${lesson.subjectSlug}`} className="hover:text-brand-teal truncate">
            {language === 'am' ? lesson.subjectTitleAm : lesson.subjectTitleEn}
          </Link>
          <span>/</span>
          <span className="text-brand-navy font-semibold truncate">
            {language === 'am' ? lesson.chapterTitleAm : lesson.chapterTitleEn}
          </span>
        </div>

        {/* Mobile Topic Drawer Trigger */}
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="md:hidden px-3 py-1 rounded-badge bg-brand-teal/10 text-brand-teal font-semibold text-caption"
        >
          📑 Chapter Outline
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant={isBookmarked ? 'primary' : 'outline'}
            onClick={toggleBookmark}
            className={isBookmarked ? 'bg-brand-gold text-brand-navy border-brand-gold hover:bg-brand-gold-light' : ''}
          >
            <span>🔖</span>
            <span className="hidden sm:inline-block">
              {isBookmarked ? t('lesson.bookmarked') : t('lesson.bookmark')}
            </span>
          </Button>

          <Button
            size="sm"
            variant={isCompleted ? 'secondary' : 'primary'}
            onClick={toggleComplete}
          >
            <span>{isCompleted ? '✓' : '○'}</span>
            <span className="hidden sm:inline-block">
              {isCompleted ? t('lesson.completed') : t('lesson.markComplete')}
            </span>
          </Button>
        </div>
      </div>

      <div className="flex-1 flex max-w-[1400px] w-full mx-auto">
        {/* Collapsible Desktop Topic Tree Sidebar */}
        {sidebarOpen && (
          <aside className="hidden md:block w-72 bg-surface border-r border-border p-4 overflow-y-auto shrink-0 max-h-[calc(100vh-120px)] sticky top-[114px]">
            <h3 className="font-bold text-body-sm text-brand-navy uppercase tracking-wider mb-3">
              {language === 'am' ? lesson.subjectTitleAm : lesson.subjectTitleEn} Lessons
            </h3>
            <div className="space-y-4">
              {currentSubject.chapters.map((ch) => (
                <div key={ch.id} className="space-y-1">
                  <p className="text-caption font-bold text-text-primary px-2 py-1 bg-surface-muted rounded">
                    CH {ch.chapterNumber}: {language === 'am' ? ch.titleAm : ch.titleEn}
                  </p>
                  <div className="space-y-0.5 pl-2">
                    {ch.lessons.map((les) => {
                      const isCurrent = les.id === lesson.id;
                      return (
                        <Link
                          key={les.id}
                          to={`/lessons/${les.id}`}
                          className={`
                            block px-2.5 py-1.5 rounded-button text-caption transition-colors
                            ${isCurrent
                              ? 'bg-brand-teal text-white font-bold shadow-sm'
                              : 'text-text-secondary hover:bg-brand-bg hover:text-text-primary'
                            }
                          `}
                        >
                          <div className="flex items-center justify-between">
                            <span className="truncate">
                              {les.lessonNumber} {language === 'am' ? les.titleAm : les.titleEn}
                            </span>
                            <AccessBadge tier={les.accessTier} size="sm" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* Main Lesson Content Reading Area */}
        <main className="flex-1 px-4 sm:px-8 py-8 max-w-[820px] mx-auto w-full space-y-8">
          {/* Lesson Metadata Header */}
          <div className="space-y-3 border-b border-border pb-6">
            <div className="flex items-center justify-between gap-2">
              <span className="text-caption font-semibold px-2.5 py-1 rounded bg-brand-navy/10 text-brand-navy">
                Lesson {lesson.lessonNumber}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-caption text-text-muted">
                  ⏱ {lesson.estimatedMinutes} {t('lesson.estimatedTime')}
                </span>
                <AccessBadge tier={lesson.accessTier} />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
              {language === 'am' ? lesson.titleAm : lesson.titleEn}
            </h1>

            {/* Translation Pending Banner */}
            {language === 'am' && !lesson.hasAmharic && (
              <TranslationFallbackBadge className="mt-2" />
            )}
          </div>

          {/* Markdown + KaTeX Body */}
          <article className="bg-surface rounded-card p-6 sm:p-10 border border-border shadow-card">
            <LessonContent content={lessonBody} language={language} />

            {/* End of Lesson: Topic Practice CTA */}
            <div className="mt-12 pt-8 border-t border-border bg-brand-bg/50 p-6 rounded-card space-y-4">
              <div>
                <span className="text-caption font-bold text-brand-teal uppercase tracking-wider">
                  Checkpoint
                </span>
                <h3 className="font-bold text-body sm:text-h3 text-brand-navy mt-1">
                  Ready to test what you learned?
                </h3>
                <p className="text-body-sm text-text-secondary mt-1">
                  Solve practice questions for this chapter with step-by-step solutions.
                </p>
              </div>

              <Link to={`/practice/${lesson.topicId}`} className="inline-block">
                <Button variant="primary" size="lg" className="shadow-md">
                  {t('lesson.practiceThisTopic')} →
                </Button>
              </Link>
            </div>

            {/* Previous / Next Lesson Navigation */}
            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between gap-4">
              {lesson.prevLessonId ? (
                <Link to={`/lessons/${lesson.prevLessonId}`}>
                  <Button variant="outline" size="sm">
                    ← {t('lesson.previous')}
                  </Button>
                </Link>
              ) : (
                <div />
              )}

              {lesson.nextLessonId && (
                <Link to={`/lessons/${lesson.nextLessonId}`}>
                  <Button variant="primary" size="sm">
                    {t('lesson.next')} →
                  </Button>
                </Link>
              )}
            </div>
          </article>
        </main>
      </div>

      {/* Mobile Chapter Outline Drawer */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden flex justify-end"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            className="w-4/5 max-w-xs bg-surface h-full p-4 overflow-y-auto space-y-4 shadow-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-bold text-body text-brand-navy">Curriculum Outline</h3>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="text-text-muted hover:text-text-primary text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            {currentSubject.chapters.map((ch) => (
              <div key={ch.id} className="space-y-1">
                <p className="text-caption font-bold text-brand-navy">
                  CH {ch.chapterNumber}: {language === 'am' ? ch.titleAm : ch.titleEn}
                </p>
                <div className="space-y-1 pl-2">
                  {ch.lessons.map((les) => (
                    <Link
                      key={les.id}
                      to={`/lessons/${les.id}`}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`
                        block p-2 rounded-button text-caption
                        ${les.id === lesson.id ? 'bg-brand-teal text-white font-bold' : 'text-text-secondary hover:bg-brand-bg'}
                      `}
                    >
                      {les.lessonNumber} {language === 'am' ? les.titleAm : les.titleEn}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
