import { useLanguage } from '../lib/i18n';

export function AboutPage() {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-[800px] mx-auto px-4 py-12 space-y-10">
      <div>
        <h1 className="text-h1 font-bold text-brand-navy mb-4">{t('about.title')}</h1>
        <p className="text-body text-text-secondary leading-relaxed">
          {language === 'am'
            ? 'EthioPrep የኢትዮጵያ የ12ኛ ክፍል ተማሪዎች የብሔራዊ ፈተናቸውን በብቃት እንዲዘጋጁ የተፈጠረ የትምህርት መድረክ ነው። የትምህርት ይዘታችን በእንግሊዝኛ እና በአማርኛ የተዘጋጀ ሲሆን፣ ለተማሪዎች ተስማሚ በሆነ መንገድ ቀርቧል።'
            : 'EthioPrep is a bilingual educational technology platform engineered specifically for Ethiopian Grade 12 students preparing for the National Educational Assessment Examination (NEAE). Built on modern, lightweight web technologies to ensure seamless performance on mobile networks across all regions.'}
        </p>
      </div>

      <div className="p-6 rounded-card bg-brand-bg-alt/50 border border-border">
        <h3 className="text-h3 font-bold text-brand-navy mb-2">Curriculum Integrity & Disclaimer</h3>
        <p className="text-body-sm text-text-secondary leading-relaxed">
          All practice questions, worked examples, and lesson notes follow standard Ethiopian Grade 12 Ministry of Education syllabi. EthioPrep is an independent educational prep platform developed to assist students in their studies, and is not officially affiliated with or endorsed by government examination authorities.
        </p>
      </div>

      <div>
        <h2 className="text-h2 font-bold text-brand-navy mb-4">{t('about.faq')}</h2>
        <div className="space-y-4">
          <div className="p-4 bg-surface rounded-card border border-border">
            <h4 className="font-bold text-body text-brand-navy mb-1">
              Is EthioPrep free for students?
            </h4>
            <p className="text-body-sm text-text-secondary">
              Yes! All core curriculum lessons, sample practice questions, formula sheets, and basic progress tracking are completely free. Optional advanced timed mock exam packages and deep analytics will be offered in the future.
            </p>
          </div>
          <div className="p-4 bg-surface rounded-card border border-border">
            <h4 className="font-bold text-body text-brand-navy mb-1">
              Does it work on slow 3G mobile connections?
            </h4>
            <p className="text-body-sm text-text-secondary">
              Yes. EthioPrep is mobile-first, lightweight, and uses offline answer caching in your browser session so you never lose your progress even if your internet connection temporarily drops during an exam.
            </p>
          </div>
          <div className="p-4 bg-surface rounded-card border border-border">
            <h4 className="font-bold text-body text-brand-navy mb-1">
              Can I study in Amharic?
            </h4>
            <p className="text-body-sm text-text-secondary">
              Yes. You can switch between English and Amharic anytime using the globe icon at the top of the screen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

