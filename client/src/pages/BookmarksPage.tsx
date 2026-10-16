import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';

export function BookmarksPage() {
  const { t } = useLanguage();
  const [bookmarks, setBookmarks] = useState([
    {
      id: 'bm-1',
      title: '1.2 Limit Laws and Computing Limits',
      subject: 'Mathematics',
      topic: 'Limits and Continuity',
      type: 'lesson',
      link: '/lessons/les-2',
    },
    {
      id: 'bm-2',
      title: 'Thermodynamics: Heat Engines and Carnot Cycle',
      subject: 'Physics',
      topic: 'Thermodynamics',
      type: 'lesson',
      link: '/lessons/physics-thermo',
    },
  ]);

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 font-bold text-brand-navy mb-1">{t('nav.bookmarks')}</h1>
        <p className="text-body-sm text-text-secondary">
          Quickly access saved lessons and practice questions
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <EmptyState
          icon="bookmarks"
          title="No Bookmarks Yet"
          description="Save difficult lessons and questions during your studies to review them here later."
          action={{
            label: 'Browse Subjects',
            onClick: () => window.location.assign('/subjects'),
          }}
        />
      ) : (
        <div className="space-y-3">
          {bookmarks.map((bm) => (
            <div
              key={bm.id}
              className="p-4 rounded-card bg-surface border border-border shadow-card flex items-center justify-between gap-4"
            >
              <div>
                <span className="text-caption font-bold text-brand-teal uppercase">
                  {bm.subject} • {bm.topic}
                </span>
                <h3 className="font-bold text-body text-brand-navy mt-0.5">{bm.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <Link to={bm.link}>
                  <Button size="sm" variant="primary">Study</Button>
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeBookmark(bm.id)}
                  aria-label="Remove bookmark"
                >
                  ✕
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

