import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { Input } from '../components/ui/Input';
import { SubjectCard } from '../components/subjects/SubjectCard';
import { EmptyState } from '../components/ui/EmptyState';
import { mockSubjects } from '../lib/mockData';

export function SubjectCatalogPage() {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeStream = searchParams.get('stream') || 'all';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubjects = mockSubjects.filter((subject) => {
    const matchesStream = activeStream === 'all' || subject.stream === activeStream;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesStream;

    const matchesEnglish =
      subject.titleEn.toLowerCase().includes(query) ||
      subject.descriptionEn.toLowerCase().includes(query);

    const matchesAmharic =
      subject.titleAm.includes(query) ||
      subject.descriptionAm.includes(query);

    return matchesStream && (matchesEnglish || matchesAmharic);
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <span className="text-caption font-bold text-brand-teal uppercase tracking-wider">
          Ethiopian Grade 12 Syllabi
        </span>
        <h1 className="text-h1 font-bold text-brand-navy mt-1 mb-2">
          {t('subjects.title')}
        </h1>
        <p className="text-body text-text-secondary max-w-2xl">
          {language === 'am'
            ? 'ሁሉንም የ12ኛ ክፍል ትምህርቶች በዥረት ለይተው ያግኙ። የተሟሉ ምዕራፎችን፣ ትምህርቶችን እና የልምምድ ጥያቄዎችን ይዟል።'
            : 'Explore all Grade 12 subjects structured by academic stream. Study lesson notes, worked examples, and prepare for national exams.'}
        </p>
      </div>

      {/* Search and Stream Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 bg-surface p-4 rounded-card border border-border shadow-card">
        {/* Search Input */}
        <div className="w-full md:max-w-xs">
          <Input
            id="subject-search-input"
            type="search"
            label=""
            placeholder={language === 'am' ? 'ትምህርቶችን ይፈልጉ...' : 'Search subjects...'}
            value={searchQuery}
            onChange={setSearchQuery}
            leftIcon={<span>🔍</span>}
          />
        </div>

        {/* Stream Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {[
            { id: 'all', label: t('subjects.filter.all') },
            { id: 'natural_science', label: `🔬 ${t('home.streams.natural')}` },
            { id: 'social_science', label: `🏛️ ${t('home.streams.social')}` },
            { id: 'common', label: `📖 ${t('home.streams.common')}` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                if (tab.id === 'all') {
                  setSearchParams({});
                } else {
                  setSearchParams({ stream: tab.id });
                }
              }}
              className={`
                px-4 py-2 rounded-button text-body-sm font-semibold whitespace-nowrap transition-all cursor-pointer
                ${activeStream === tab.id
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-surface-muted text-text-secondary hover:bg-brand-bg hover:text-text-primary border border-border'
                }
              `.trim()}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Grid or Empty State */}
      {filteredSubjects.length === 0 ? (
        <EmptyState
          icon="search"
          title={language === 'am' ? 'ምንም ትምህርት አልተገኘም' : 'No Subjects Found'}
          description={
            language === 'am'
              ? `ከ "${searchQuery}" ጋር የሚዛመድ ትምህርት አልተገኘም። እባክዎ ፍለጋዎን ያስተካክሉ።`
              : `No subjects matched your search for "${searchQuery}". Try selecting another stream or clearing your search.`
          }
          action={{
            label: language === 'am' ? 'ሁሉንም ትምህርቶች አሳይ' : 'Clear Filters',
            onClick: () => {
              setSearchQuery('');
              setSearchParams({});
            },
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      )}
    </div>
  );
}
