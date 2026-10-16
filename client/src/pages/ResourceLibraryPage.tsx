import { useState } from 'react';
import { useLanguage } from '../lib/i18n';
import { Input } from '../components/ui/Input';
import { AccessBadge } from '../components/ui/AccessBadge';
import { EmptyState } from '../components/ui/EmptyState';
import { mockResources } from '../lib/mockData';

export function ResourceLibraryPage() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState<string>('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredResources = mockResources.filter((res) => {
    const matchesStream = selectedStream === 'all' || res.stream === selectedStream;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesStream;

    const matchesEn = res.titleEn.toLowerCase().includes(query) || res.licenseNote.toLowerCase().includes(query);
    const matchesAm = res.titleAm.includes(query);
    return matchesStream && (matchesEn || matchesAm);
  });

  const handleDownload = (id: string, title: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`[Demo Download] Successfully downloaded:\n"${title}"\nFile is ready for offline study.`);
    }, 800);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <span className="text-caption font-bold text-brand-teal uppercase tracking-wider">
          Study Materials &amp; Downloads
        </span>
        <h1 className="text-h1 font-bold text-brand-navy mt-1 mb-2">
          {t('nav.resources')}
        </h1>
        <p className="text-body text-text-secondary max-w-2xl leading-relaxed">
          {language === 'am'
            ? 'ለ12ኛ ክፍል ብሔራዊ ፈተና የሚረዱ የሒሳብ ቀመሮች፣ የፊዚክስና ኬሚስትሪ ማጠቃለያዎች እና የታሪክ ሰንጠረዦች። በነጻ ያውርዱ።'
            : 'Downloadable formula sheets, chapter summaries, and verified Grade 12 references to support low-bandwidth offline study.'}
        </p>
      </div>

      {/* Search and Stream Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-surface p-4 rounded-card border border-border shadow-card">
        <div className="w-full sm:max-w-xs">
          <Input
            id="resource-search"
            type="search"
            label=""
            placeholder={language === 'am' ? 'ግብዓቶችን ይፈልጉ...' : 'Search formula sheets, notes...'}
            value={searchQuery}
            onChange={setSearchQuery}
            leftIcon={<span>🔍</span>}
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Resources' },
            { id: 'natural_science', label: '🔬 Natural Science' },
            { id: 'social_science', label: '🏛️ Social Science' },
            { id: 'common', label: '📖 Common' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedStream(tab.id)}
              className={`
                px-3 py-1.5 rounded-button text-body-sm font-semibold whitespace-nowrap transition-colors cursor-pointer
                ${selectedStream === tab.id
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

      {/* Resource List or Empty State */}
      {filteredResources.length === 0 ? (
        <EmptyState
          icon="search"
          title="No Resources Found"
          description={`No study guides or formula sheets matched "${searchQuery}".`}
          action={{
            label: "Reset Filters",
            onClick: () => {
              setSearchQuery('');
              setSelectedStream('all');
            },
          }}
        />
      ) : (
        <div className="space-y-4">
          {filteredResources.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-card bg-surface border border-border shadow-card hover:shadow-card-hover transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-caption font-bold px-2 py-0.5 rounded bg-brand-navy/10 text-brand-navy">
                    {item.format} • {item.fileSize}
                  </span>
                  <AccessBadge tier={item.accessTier} size="sm" />
                  <span className="text-caption text-text-muted">
                    {item.downloadsCount.toLocaleString()} downloads
                  </span>
                </div>

                <h3 className="font-bold text-body sm:text-h3 text-brand-navy">
                  {language === 'am' ? item.titleAm : item.titleEn}
                </h3>

                <p className="text-caption text-text-muted flex items-center gap-1.5">
                  <span>📜</span>
                  <span>{item.licenseNote}</span>
                </p>
              </div>

              <div className="shrink-0 self-start sm:self-center">
                <button
                  type="button"
                  disabled={downloadingId === item.id}
                  onClick={() => handleDownload(item.id, language === 'am' ? item.titleAm : item.titleEn)}
                  className={`
                    px-5 py-2.5 rounded-button text-body-sm font-bold flex items-center gap-2 transition-all cursor-pointer
                    ${downloadingId === item.id
                      ? 'bg-brand-teal/50 text-white cursor-wait'
                      : 'bg-brand-teal hover:bg-brand-teal-light text-white shadow-sm'
                    }
                  `.trim()}
                >
                  <span>⬇</span>
                  <span>{downloadingId === item.id ? 'Downloading...' : 'Download PDF'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
