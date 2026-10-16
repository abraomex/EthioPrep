import { useState } from 'react';
import { useLanguage } from '../lib/i18n';
import { Input } from '../components/ui/Input';
import { AccessBadge } from '../components/ui/AccessBadge';

export function ResourceLibraryPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const sampleResources = [
    {
      id: 'res-1',
      titleEn: 'Grade 12 Mathematics Formula Sheet (Summary)',
      titleAm: 'የ12ኛ ክፍል የሒሳብ ቀመሮች ማጠቃለያ ወረቀት',
      subject: 'Mathematics',
      type: 'PDF',
      license: 'Public Educational Material (MoE Ethiopia Reference)',
      tier: 'free' as const,
    },
    {
      id: 'res-2',
      titleEn: 'Physics Mechanics & Thermodynamics Quick Guide',
      titleAm: 'የፊዚክስ ሜካኒክስ እና ቴርሞዳይናሚክስ አጭር መመሪያ',
      subject: 'Physics',
      type: 'PDF',
      license: 'EthioPrep Open Educational Resource',
      tier: 'free' as const,
    },
    {
      id: 'res-3',
      titleEn: 'Chemistry Common Organic Reaction Mechanisms',
      titleAm: 'የኬሚስትሪ የተለመዱ የኦርጋኒክ ምላሾች መመሪያ',
      subject: 'Chemistry',
      type: 'PDF',
      license: 'EthioPrep Open Educational Resource',
      tier: 'premium' as const,
    },
    {
      id: 'res-4',
      titleEn: 'Grade 12 English Grammar & Vocabulary Pocket Guide',
      titleAm: 'የ12ኛ ክፍል እንግሊዝኛ ሰዋሰው እና የቃላት አጠቃቀም መመሪያ',
      subject: 'English',
      type: 'PDF',
      license: 'Open Access',
      tier: 'free' as const,
    },
  ];

  const filtered = sampleResources.filter((r) => {
    const title = language === 'am' ? r.titleAm : r.titleEn;
    return title.toLowerCase().includes(searchQuery.toLowerCase()) || r.subject.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-h1 font-bold text-text-primary mb-2">Resource Library</h1>
        <p className="text-body text-text-secondary">
          Downloadable formula sheets, study guides, and verified curriculum references.
        </p>
      </div>

      <div className="mb-6 max-w-sm">
        <Input
          id="res-search"
          label=""
          placeholder="Search resources..."
          value={searchQuery}
          onChange={setSearchQuery}
          leftIcon={<span>🔍</span>}
        />
      </div>

      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-card bg-surface border border-border shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-caption font-bold text-brand-teal uppercase">{item.subject}</span>
                <span className="text-caption px-2 py-0.5 rounded bg-brand-bg text-text-muted">{item.type}</span>
                <AccessBadge tier={item.tier} />
              </div>
              <h3 className="font-bold text-body text-brand-navy">
                {language === 'am' ? item.titleAm : item.titleEn}
              </h3>
              <p className="text-caption text-text-muted mt-1">{item.license}</p>
            </div>
            <button
              type="button"
              onClick={() => alert(`Download started for: ${item.titleEn}`)}
              className="px-4 py-2 rounded-button bg-brand-navy text-white text-body-sm font-semibold hover:bg-brand-navy-light transition-colors self-start sm:self-auto cursor-pointer"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
