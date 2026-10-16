import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { Button } from '../components/ui/Button';
import { AccessBadge } from '../components/ui/AccessBadge';

export function SubjectDetailPage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({ 'top-1': true });

  const toggleTopic = (id: string) => {
    setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const subject = {
    titleEn: slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Mathematics',
    titleAm: 'ሒሳብ',
    stream: 'natural_science',
    descriptionEn: 'Comprehensive Grade 12 curriculum including limits, derivatives, integrals, and vector spaces.',
    descriptionAm: 'የ12ኛ ክፍል ሙሉ ሥርዓተ ትምህርት ሊሚቶች፣ ዴሪቬቲቭ፣ ኢንቴግራል እና ቬክተሮችን ያካትታል።',
    topics: [
      {
        id: 'top-1',
        titleEn: 'Chapter 1: Limits and Continuity',
        titleAm: 'ምዕራፍ 1፡ ሊሚት እና ቀጣይነት',
        lessons: [
          { id: 'les-1', titleEn: '1.1 Introduction to Limits', titleAm: '1.1 የሊሚት መግቢያ', tier: 'free' as const, time: 8 },
          { id: 'les-2', titleEn: '1.2 Limit Laws and Computing Limits', titleAm: '1.2 የሊሚት ህጎችና ስሌት', tier: 'free' as const, time: 12 },
          { id: 'les-3', titleEn: '1.3 Continuity and Asymptotes', titleAm: '1.3 ቀጣይነት እና አሲምፕቶቶች', tier: 'premium' as const, time: 15 },
        ],
      },
      {
        id: 'top-2',
        titleEn: 'Chapter 2: Derivatives and Applications',
        titleAm: 'ምዕራፍ 2፡ ዴሪቬቲቭ እና ተግባራዊ አጠቃቀሞች',
        lessons: [
          { id: 'les-4', titleEn: '2.1 Definition of the Derivative', titleAm: '2.1 የዴሪቬቲቭ ትርጉም', tier: 'free' as const, time: 10 },
          { id: 'les-5', titleEn: '2.2 Product, Quotient, and Chain Rules', titleAm: '2.2 የብዜት፣ የክፍፍል እና የሰንሰለት ህጎች', tier: 'premium' as const, time: 14 },
          { id: 'les-6', titleEn: '2.3 Extreme Values and Optimization', titleAm: '2.3 ከፍተኛና ዝቅተኛ እሴቶች', tier: 'premium' as const, time: 18 },
        ],
      },
      {
        id: 'top-3',
        titleEn: 'Chapter 3: Integrals and Techniques',
        titleAm: 'ምዕራፍ 3፡ ኢንቴግራል እና ዘዴዎች',
        lessons: [
          { id: 'les-7', titleEn: '3.1 Indefinite and Definite Integrals', titleAm: '3.1 ያልተወሰኑ እና የተወሰኑ ኢንቴግራሎች', tier: 'free' as const, time: 12 },
          { id: 'les-8', titleEn: '3.2 Integration by Substitution and Parts', titleAm: '3.2 የተተኪ እና በክፍል የመደመር ዘዴ', tier: 'premium' as const, time: 20 },
        ],
      },
    ],
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-caption text-text-muted mb-4">
        <Link to="/subjects" className="hover:text-brand-teal">Subjects</Link>
        <span>/</span>
        <span className="text-text-primary capitalize">{slug}</span>
      </div>

      {/* Header Banner */}
      <div className="bg-surface rounded-card p-6 md:p-8 border border-border shadow-card mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <span className="px-3 py-1 rounded-badge text-caption font-bold bg-brand-teal/10 text-brand-teal uppercase">
            {subject.stream.replace('_', ' ')}
          </span>
          <Link to={`/exams/math-mock-1/instructions`}>
            <Button variant="primary" size="sm">
              Practice Mock Exam →
            </Button>
          </Link>
        </div>
        <h1 className="text-h1 font-bold text-brand-navy mb-2">
          {language === 'am' ? subject.titleAm : subject.titleEn}
        </h1>
        <p className="text-body text-text-secondary leading-relaxed">
          {language === 'am' ? subject.descriptionAm : subject.descriptionEn}
        </p>
      </div>

      {/* Chapters & Topics Tree */}
      <div className="space-y-4">
        <h2 className="text-h2 font-bold text-text-primary mb-4">Curriculum Outline</h2>
        {subject.topics.map((topic) => {
          const isOpen = !!expandedTopics[topic.id];
          return (
            <div key={topic.id} className="bg-surface border border-border rounded-card overflow-hidden">
              <button
                type="button"
                onClick={() => toggleTopic(topic.id)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-brand-bg transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-brand-teal font-bold">{isOpen ? '▼' : '▶'}</span>
                  <span className="font-bold text-body text-brand-navy">
                    {language === 'am' ? topic.titleAm : topic.titleEn}
                  </span>
                </div>
                <span className="text-caption text-text-muted">
                  {topic.lessons.length} lessons
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-border divide-y divide-border bg-surface-muted">
                  {topic.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="px-6 py-3.5 flex items-center justify-between hover:bg-white transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-text-muted text-sm">📄</span>
                        <Link
                          to={`/lessons/${lesson.id}`}
                          className="font-medium text-body-sm text-text-primary hover:text-brand-teal transition-colors"
                        >
                          {language === 'am' ? lesson.titleAm : lesson.titleEn}
                        </Link>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-caption text-text-muted">{lesson.time} min</span>
                        <AccessBadge tier={lesson.tier} />
                        <Link to={`/lessons/${lesson.id}`}>
                          <Button size="sm" variant="ghost">Study</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                  <div className="p-3 bg-brand-bg/50 flex justify-end">
                    <Link to={`/practice/${topic.id}`}>
                      <Button size="sm" variant="outline" className="text-caption">
                        Practice {language === 'am' ? topic.titleAm : topic.titleEn} Questions →
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

