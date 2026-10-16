import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { Button } from '../components/ui/Button';
import { SubjectCard } from '../components/subjects/SubjectCard';
import { mockSubjects } from '../lib/mockData';

export function HomePage() {
  const { t, language } = useLanguage();

  const featuredSubjects = mockSubjects.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-16 md:py-24 px-4 relative overflow-hidden">
        {/* Subtle decorative radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-brand-teal/10 blur-3xl pointer-events-none" />

        <div className="max-w-[840px] mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-white/10 text-brand-gold text-caption font-semibold tracking-wide uppercase border border-white/15">
            <span>🇪🇹</span>
            <span>
              {language === 'am'
                ? 'የኢትዮጵያ የ12ኛ ክፍል ብሔራዊ ፈተና ዝግጅት'
                : 'Ethiopia Grade 12 National Exam Preparation'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            {t('home.hero.title')}
          </h1>

          <p className="text-body sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            {t('home.hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link to="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-brand-teal hover:bg-brand-teal-light text-white shadow-lg text-body font-bold">
                {t('home.hero.cta.start')} →
              </Button>
            </Link>
            <Link to="/subjects" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10 text-body font-semibold">
                {t('home.hero.cta.browse')}
              </Button>
            </Link>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-caption text-white/60">
            <span className="flex items-center gap-1.5">✓ 100% Free Core Lessons</span>
            <span className="flex items-center gap-1.5">✓ English &amp; አማርኛ</span>
            <span className="flex items-center gap-1.5">✓ Works Offline During Exams</span>
            <span className="flex items-center gap-1.5">✓ Formula Sheets &amp; KaTeX</span>
          </div>
        </div>
      </section>

      {/* Stream Quick Filters Section */}
      <section className="py-12 px-4 max-w-[1200px] mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-h2 font-bold text-brand-navy mb-2">
            {language === 'am' ? 'የትምህርት ዥረትዎን ይምረጡ' : 'Select Your Stream'}
          </h2>
          <p className="text-body text-text-secondary max-w-xl mx-auto">
            {language === 'am'
              ? 'በትምህርት ሚኒስቴር ሥርዓተ-ትምህርት መሠረት የተዘጋጁ ትምህርቶችና ፈተናዎች'
              : 'Official syllabi structured specifically for Ethiopian national examination standards'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/subjects?stream=natural_science"
            className="p-6 rounded-card bg-surface border-2 border-brand-teal/30 hover:border-brand-teal shadow-card hover:shadow-card-hover transition-all flex flex-col items-center text-center group"
          >
            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">🔬</span>
            <h3 className="text-h3 font-bold text-brand-navy mb-1">{t('home.streams.natural')}</h3>
            <p className="text-body-sm text-text-secondary mb-3">
              Mathematics, Physics, Chemistry, Biology, English
            </p>
            <span className="text-caption font-bold text-brand-teal mt-auto">Browse Natural Science →</span>
          </Link>

          <Link
            to="/subjects?stream=social_science"
            className="p-6 rounded-card bg-surface border-2 border-brand-gold/40 hover:border-brand-gold shadow-card hover:shadow-card-hover transition-all flex flex-col items-center text-center group"
          >
            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">🏛️</span>
            <h3 className="text-h3 font-bold text-brand-navy mb-1">{t('home.streams.social')}</h3>
            <p className="text-body-sm text-text-secondary mb-3">
              Economics, History, Geography, General Math, English
            </p>
            <span className="text-caption font-bold text-brand-gold-dark mt-auto">Browse Social Science →</span>
          </Link>

          <Link
            to="/subjects?stream=common"
            className="p-6 rounded-card bg-surface border-2 border-brand-navy/20 hover:border-brand-navy shadow-card hover:shadow-card-hover transition-all flex flex-col items-center text-center group"
          >
            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">📖</span>
            <h3 className="text-h3 font-bold text-brand-navy mb-1">{t('home.streams.common')}</h3>
            <p className="text-body-sm text-text-secondary mb-3">
              English Grammar, Aptitude, General Knowledge, Logic
            </p>
            <span className="text-caption font-bold text-brand-navy mt-auto">Browse Common Subjects →</span>
          </Link>
        </div>
      </section>

      {/* Featured Subjects */}
      <section className="bg-surface py-14 px-4 border-y border-border">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-caption font-bold text-brand-teal uppercase tracking-wider">
                Curriculum Overview
              </span>
              <h2 className="text-h2 font-bold text-brand-navy mt-1">
                {t('home.featured')}
              </h2>
            </div>
            <Link to="/subjects" className="text-body-sm font-semibold text-brand-teal hover:underline">
              View All {mockSubjects.length} Subjects →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSubjects.map((sub) => (
              <SubjectCard key={sub.id} subject={sub} />
            ))}
          </div>
        </div>
      </section>

      {/* "How EthioPrep Works" 5-Step Process */}
      <section className="py-16 px-4 max-w-[1200px] mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-caption font-bold text-brand-teal uppercase tracking-wider">
            Structured Learning Method
          </span>
          <h2 className="text-h2 font-bold text-brand-navy mt-1 mb-3">
            {t('home.howItWorks')}
          </h2>
          <p className="text-body text-text-secondary max-w-xl mx-auto">
            A proven 5-step loop designed to maximize student scores on the Ethiopian Grade 12 National Exam.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              step: '1',
              title: t('home.steps.discover'),
              titleAm: 'ያግኙ',
              desc: 'Select your stream and find relevant chapters matching your school schedule.',
              icon: '🔍',
            },
            {
              step: '2',
              title: t('home.steps.learn'),
              titleAm: 'ይማሩ',
              desc: 'Study bite-sized bilingual lessons with worked examples and KaTeX formulas.',
              icon: '📖',
            },
            {
              step: '3',
              title: t('home.steps.practice'),
              titleAm: 'ይለማመዱ',
              desc: 'Test your understanding with timed mock exams and offline answer caching.',
              icon: '⏱️',
            },
            {
              step: '4',
              title: t('home.steps.review'),
              titleAm: 'ይከልሱ',
              desc: 'Read step-by-step explanations for every right and wrong answer.',
              icon: '📝',
            },
            {
              step: '5',
              title: t('home.steps.improve'),
              titleAm: 'ይሻሻሉ',
              desc: 'Target weak topics (<60% score) with rule-based study recommendations.',
              icon: '📈',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-card bg-surface border border-border shadow-card flex flex-col items-center text-center relative"
            >
              <div className="w-12 h-12 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center font-bold text-xl mb-3">
                {item.icon}
              </div>
              <span className="text-caption font-bold text-brand-teal uppercase">Step {item.step}</span>
              <h3 className="font-bold text-body text-brand-navy mt-1 mb-2">
                {language === 'am' ? item.titleAm : item.title}
              </h3>
              <p className="text-caption text-text-secondary leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Free vs Premium Comparison Table */}
      <section className="bg-surface py-16 px-4 border-y border-border">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-10">
            <span className="text-caption font-bold text-brand-gold-dark uppercase tracking-wider">
              Transparent Access Model
            </span>
            <h2 className="text-h2 font-bold text-brand-navy mt-1 mb-2">
              {t('home.comparison.title')}
            </h2>
            <p className="text-body text-text-secondary">
              Core learning is completely free for every Ethiopian student.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-card shadow-card overflow-hidden">
            <div className="grid grid-cols-3 bg-surface-muted p-4 border-b border-border text-body-sm font-bold text-brand-navy">
              <div>Curriculum Feature</div>
              <div className="text-center text-status-success">Free Tier</div>
              <div className="text-center text-brand-gold-dark">Premium Tier</div>
            </div>

            {[
              { feat: 'Grade 12 Core Subject Lessons', free: 'Selected Core', prem: 'Complete Library' },
              { feat: 'Bilingual (English / Amharic) Toggle', free: '✓ Included', prem: '✓ Included' },
              { feat: 'Math Notation & KaTeX Formulas', free: '✓ Full KaTeX', prem: '✓ Full KaTeX' },
              { feat: 'Topic Practice Quizzes', free: 'Selected Questions', prem: 'Full Question Bank' },
              { feat: 'Timed National Mock Exams', free: 'Sample Mocks', prem: 'All 16+ Mocks' },
              { feat: 'Explanations & Worked Steps', free: '✓ Included', prem: '✓ Detailed Breakdown' },
              { feat: 'Topic Weakness Alerts (<60%)', free: 'Basic Alerts', prem: 'Advanced Analytics' },
              { feat: 'Downloadable Formula Sheets', free: 'Public Summaries', prem: 'All Printable PDFs' },
            ].map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-3 p-4 border-b border-border/50 text-body-sm hover:bg-brand-bg transition-colors"
              >
                <div className="font-medium text-text-primary">{row.feat}</div>
                <div className="text-center text-text-secondary">{row.free}</div>
                <div className="text-center font-bold text-brand-navy">{row.prem}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 px-4 bg-brand-navy text-white text-center">
        <div className="max-w-[700px] mx-auto space-y-5">
          <h2 className="text-3xl font-extrabold tracking-tight">
            {t('home.cta.banner')}
          </h2>
          <p className="text-body text-white/80">
            Join thousands of Grade 12 students preparing for higher education entrance.
          </p>
          <div className="pt-2">
            <Link to="/register">
              <Button size="lg" className="bg-brand-teal hover:bg-brand-teal-light text-white font-bold shadow-lg">
                {t('home.cta.register')} →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
