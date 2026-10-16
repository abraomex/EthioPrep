import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { Input } from '../components/ui/Input';
import { AccessBadge } from '../components/ui/AccessBadge';

export function SubjectCatalogPage() {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeStream = searchParams.get('stream') || 'all';
  const [searchQuery, setSearchQuery] = useState('');

  const sampleSubjects = [
    {
      id: 'sub-1',
      slug: 'mathematics',
      titleEn: 'Mathematics',
      titleAm: 'ሒሳብ',
      descriptionEn: 'Calculus, Vectors, Sequences, Matrices, and Statistics for Grade 12.',
      descriptionAm: 'የ12ኛ ክፍል ካልኩለስ፣ ቬክተሮች፣ ዝርዝሮች እና ስታቲስቲክስ።',
      stream: 'natural_science',
      topicCount: 12,
      questionCount: 240,
    },
    {
      id: 'sub-2',
      slug: 'physics',
      titleEn: 'Physics',
      titleAm: 'ፊዚክስ',
      descriptionEn: 'Mechanics, Electromagnetism, Thermodynamics, and Modern Physics.',
      descriptionAm: 'ሜካኒክስ፣ ኤሌክትሮማግኔቲዝም፣ ቴርሞዳይናሚክስ እና ዘመናዊ ፊዚክስ።',
      stream: 'natural_science',
      topicCount: 10,
      questionCount: 180,
    },
    {
      id: 'sub-3',
      slug: 'chemistry',
      titleEn: 'Chemistry',
      titleAm: 'ኬሚስትሪ',
      descriptionEn: 'Physical chemistry, Organic reaction mechanisms, and Industrial chemistry.',
      descriptionAm: 'አካላዊ ኬሚስትሪ፣ ኦርጋኒክ ኬሚስትሪ እና ኢንዱስትሪያዊ ኬሚስትሪ።',
      stream: 'natural_science',
      topicCount: 11,
      questionCount: 200,
    },
    {
      id: 'sub-4',
      slug: 'biology',
      titleEn: 'Biology',
      titleAm: 'ስነ-ህይወት',
      descriptionEn: 'Genetics, Ecology, Physiology, Evolution, and Microbiology.',
      descriptionAm: 'ጄኔቲክስ፣ ኢኮሎጂ፣ የሰው አካል ፊዚዮሎጂ እና ማይክሮባዮሎጂ።',
      stream: 'natural_science',
      topicCount: 13,
      questionCount: 260,
    },
    {
      id: 'sub-5',
      slug: 'economics',
      titleEn: 'Economics',
      titleAm: 'ኢኮኖሚክስ',
      descriptionEn: 'Microeconomics, Macroeconomics, and National Economic Planning.',
      descriptionAm: 'ማይክሮ ኢኮኖሚክስ፣ ማክሮ ኢኮኖሚክስ እና ብሔራዊ የኢኮኖሚ እቅድ።',
      stream: 'social_science',
      topicCount: 9,
      questionCount: 150,
    },
    {
      id: 'sub-6',
      slug: 'history',
      titleEn: 'History',
      titleAm: 'ታሪክ',
      descriptionEn: 'Modern Ethiopian History and Global Historical Developments.',
      descriptionAm: 'የኢትዮጵያ ዘመናዊ ታሪክ እና ዓለም አቀፍ ታሪካዊ ክስተቶች።',
      stream: 'social_science',
      topicCount: 8,
      questionCount: 160,
    },
    {
      id: 'sub-7',
      slug: 'english',
      titleEn: 'English',
      titleAm: 'እንግሊዝኛ',
      descriptionEn: 'Reading comprehension, Grammar, Vocabulary, and Essay structure.',
      descriptionAm: 'የንባብ ግንዛቤ፣ ሰዋሰው፣ የቃላት አጠቃቀም እና የድርሰት አጻጻፍ።',
      stream: 'common',
      topicCount: 10,
      questionCount: 220,
    },
  ];

  const filtered = sampleSubjects.filter((s) => {
    const matchesStream = activeStream === 'all' || s.stream === activeStream;
    const title = language === 'am' ? s.titleAm : s.titleEn;
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.titleAm.includes(searchQuery);
    return matchesStream && matchesSearch;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-h1 font-bold text-text-primary mb-2">{t('subjects.title')}</h1>
        <p className="text-body text-text-secondary">
          {language === 'am'
            ? 'ሁሉንም የ12ኛ ክፍል ትምህርቶች በዥረት ለይተው ያግኙ'
            : 'Explore all Grade 12 subjects structured according to the Ethiopian national curriculum'}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        <div className="w-full sm:max-w-xs">
          <Input
            id="subject-search"
            type="search"
            label=""
            placeholder={t('subjects.search')}
            value={searchQuery}
            onChange={setSearchQuery}
            leftIcon={<span>🔍</span>}
          />
        </div>

        {/* Stream Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: t('subjects.filter.all') },
            { id: 'natural_science', label: t('home.streams.natural') },
            { id: 'social_science', label: t('home.streams.social') },
            { id: 'common', label: t('home.streams.common') },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSearchParams(tab.id === 'all' ? {} : { stream: tab.id })}
              className={`
                px-4 py-2 rounded-button text-body-sm font-medium whitespace-nowrap transition-colors cursor-pointer
                ${activeStream === tab.id
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-surface text-text-secondary hover:bg-brand-bg hover:text-text-primary border border-border'
                }
              `.trim()}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((subject) => (
          <Link
            key={subject.id}
            to={`/subjects/${subject.slug}`}
            className="p-6 rounded-card bg-surface border border-border shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-caption font-semibold uppercase tracking-wider text-brand-teal">
                  {subject.stream.replace('_', ' ')}
                </span>
                <AccessBadge tier="free" />
              </div>
              <h3 className="text-h3 font-bold text-brand-navy group-hover:text-brand-teal transition-colors mb-2">
                {language === 'am' ? subject.titleAm : subject.titleEn}
              </h3>
              <p className="text-body-sm text-text-secondary line-clamp-2 mb-4">
                {language === 'am' ? subject.descriptionAm : subject.descriptionEn}
              </p>
            </div>
            <div className="pt-4 border-t border-border flex items-center justify-between text-caption text-text-muted">
              <span>{subject.topicCount} {t('subjects.topics')}</span>
              <span>{subject.questionCount} {t('subjects.questions')}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

