import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { Button } from '../components/ui/Button';
import { TranslationFallbackBadge } from '../components/ui/TranslationFallbackBadge';

export function LessonViewerPage() {
  const { id } = useParams();
  const { language } = useLanguage();
  const [bookmarked, setBookmarked] = useState(false);
  const [completed, setCompleted] = useState(false);

  const lesson = {
    id: id || 'les-1',
    titleEn: '1.2 Limit Laws and Computing Limits',
    titleAm: '1.2 የሊሚት ህጎችና ስሌት',
    estimatedMinutes: 12,
    hasAmharic: true,
    subjectTitle: 'Mathematics',
    topicTitle: 'Limits and Continuity',
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4 text-caption text-text-muted">
        <div className="flex items-center gap-1.5 truncate">
          <Link to="/subjects" className="hover:text-brand-teal">Subjects</Link>
          <span>/</span>
          <Link to="/subjects/mathematics" className="hover:text-brand-teal">{lesson.subjectTitle}</Link>
          <span>/</span>
          <span className="text-text-primary truncate">{lesson.topicTitle}</span>
        </div>
        <Link to="/dashboard" className="shrink-0 text-brand-teal hover:underline">
          Dashboard
        </Link>
      </div>

      {/* Lesson Header */}
      <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-caption text-text-muted font-medium">
            ⏱ {lesson.estimatedMinutes} min read
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={bookmarked ? 'primary' : 'outline'}
              onClick={() => setBookmarked(!bookmarked)}
            >
              {bookmarked ? '🔖 Bookmarked' : '🔖 Bookmark'}
            </Button>
            <Button
              size="sm"
              variant={completed ? 'secondary' : 'primary'}
              onClick={() => setCompleted(!completed)}
            >
              {completed ? '✓ Completed' : 'Mark Completed'}
            </Button>
          </div>
        </div>

        <h1 className="text-h1 font-bold text-brand-navy">
          {language === 'am' ? lesson.titleAm : lesson.titleEn}
        </h1>

        {language === 'am' && !lesson.hasAmharic && (
          <TranslationFallbackBadge />
        )}
      </div>

      {/* Lesson Body Content */}
      <article className="bg-surface rounded-card p-6 md:p-8 border border-border shadow-card prose max-w-none space-y-6">
        <section>
          <h2 className="text-h2 font-bold text-brand-navy mb-3">1. Basic Limit Theorems</h2>
          <p className="text-body text-text-secondary leading-relaxed">
            {'Let c be a constant and suppose that lim_{x -> a} f(x) = L and lim_{x -> a} g(x) = M both exist. Then:'}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-body text-text-secondary my-4">
            <li><strong>Sum Rule:</strong> {'lim_{x -> a} [f(x) + g(x)] = L + M'}</li>
            <li><strong>Difference Rule:</strong> {'lim_{x -> a} [f(x) - g(x)] = L - M'}</li>
            <li><strong>Product Rule:</strong> {'lim_{x -> a} [f(x) * g(x)] = L * M'}</li>
            <li><strong>Quotient Rule:</strong> {'lim_{x -> a} [f(x) / g(x)] = L / M, provided M != 0.'}</li>
          </ul>
        </section>

        {/* Worked Example Callout Box */}
        <section className="bg-brand-bg-alt/60 border-l-4 border-brand-teal p-5 rounded-r-card space-y-3">
          <span className="text-caption font-bold uppercase tracking-wider text-brand-teal">
            Worked Example 1.2
          </span>
          <h3 className="text-h3 font-bold text-brand-navy">
            {'Evaluate: lim_{x -> 3} (x^2 - 9) / (x - 3)'}
          </h3>
          <p className="text-body text-text-secondary">
            <strong>Step 1: Direct Substitution</strong><br />
            {'Plugging in x = 3 gives (3^2 - 9) / (3 - 3) = 0/0 (indeterminate form).'}
          </p>
          <p className="text-body text-text-secondary">
            <strong>Step 2: Factor the Numerator</strong><br />
            {'x^2 - 9 = (x - 3)(x + 3).'}
          </p>
          <p className="text-body text-text-secondary">
            <strong>Step 3: Simplify and Compute</strong><br />
            {'lim_{x -> 3} [(x - 3)(x + 3)] / (x - 3) = lim_{x -> 3} (x + 3) = 3 + 3 = 6.'}
          </p>
        </section>

        {/* Practice CTA */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/practice/top-1" className="w-full sm:w-auto">
            <Button variant="primary" fullWidth size="lg">
              Practice This Topic Questions →
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/lessons/les-1">
              <Button variant="outline" size="sm">← Previous</Button>
            </Link>
            <Link to="/lessons/les-3">
              <Button variant="outline" size="sm">Next →</Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
