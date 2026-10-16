import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { Button } from '../components/ui/Button';

export function HomePage() {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-16 md:py-24 px-4 text-center">
        <div className="max-w-[800px] mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-white/10 text-brand-gold text-body-sm font-medium">
            <span>✨</span>
            <span>{language === 'am' ? 'የኢትዮጵያ የ12ኛ ክፍል መማሪያ መድረክ' : 'Ethiopia\'s Grade 12 Prep Platform'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {t('home.hero.title')}
          </h1>
          <p className="text-body sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link to="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-brand-teal hover:bg-brand-teal-light text-white shadow-lg">
                {t('home.hero.cta.start')}
              </Button>
            </Link>
            <Link to="/subjects" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10">
                {t('home.hero.cta.browse')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stream Quick Filters */}
      <section className="py-12 px-4 max-w-[1200px] mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-h2 font-bold text-text-primary mb-2">
            {language === 'am' ? 'የትምህርት ዥረት ይምረጡ' : 'Choose Your Stream'}
          </h2>
          <p className="text-body text-text-secondary">
            {language === 'am' ? 'የተዘጋጁ ትምህርቶችን እና የፈተና ጥያቄዎችን ያግኙ' : 'Curated lessons and practice exams designed for national success'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/subjects?stream=natural_science"
            className="p-6 rounded-card bg-surface border border-border shadow-card hover:shadow-card-hover transition-all group flex flex-col items-center text-center"
          >
            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">🔬</span>
            <h3 className="text-h3 font-bold text-brand-navy mb-1">{t('home.streams.natural')}</h3>
            <p className="text-body-sm text-text-secondary">Math, Physics, Chemistry, Biology, English</p>
          </Link>
          <Link
            to="/subjects?stream=social_science"
            className="p-6 rounded-card bg-surface border border-border shadow-card hover:shadow-card-hover transition-all group flex flex-col items-center text-center"
          >
            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">🏛️</span>
            <h3 className="text-h3 font-bold text-brand-navy mb-1">{t('home.streams.social')}</h3>
            <p className="text-body-sm text-text-secondary">History, Geography, Economics, Math, English</p>
          </Link>
          <Link
            to="/subjects?stream=common"
            className="p-6 rounded-card bg-surface border border-border shadow-card hover:shadow-card-hover transition-all group flex flex-col items-center text-center"
          >
            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">📖</span>
            <h3 className="text-h3 font-bold text-brand-navy mb-1">{t('home.streams.common')}</h3>
            <p className="text-body-sm text-text-secondary">English, Civics, Aptitude, General Knowledge</p>
          </Link>
        </div>
      </section>

      {/* 5-Step Process */}
      <section className="bg-surface py-12 px-4 border-y border-border">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-h2 font-bold text-center text-text-primary mb-8">
            {t('home.howItWorks')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { num: '1', title: t('home.steps.discover'), desc: 'Browse subjects & streams' },
              { num: '2', title: t('home.steps.learn'), desc: 'Bilingual lessons with KaTeX math' },
              { num: '3', title: t('home.steps.practice'), desc: 'Timed mock exams & quizzes' },
              { num: '4', title: t('home.steps.review'), desc: 'Detailed explanations & notes' },
              { num: '5', title: t('home.steps.improve'), desc: 'Target your weak areas' },
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center p-4">
                <div className="w-10 h-10 rounded-full bg-brand-teal text-white flex items-center justify-center font-bold text-lg mb-2">
                  {step.num}
                </div>
                <h4 className="font-bold text-body text-brand-navy">{step.title}</h4>
                <p className="text-caption text-text-secondary mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free vs Premium Section */}
      <section className="py-12 px-4 max-w-[900px] mx-auto w-full">
        <h2 className="text-h2 font-bold text-center text-text-primary mb-8">
          {t('home.comparison.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-card bg-surface border border-border shadow-card">
            <span className="inline-block px-2.5 py-1 rounded-badge text-caption font-bold bg-status-success/10 text-status-success mb-3">
              {t('common.free')}
            </span>
            <h3 className="text-h3 font-bold text-brand-navy mb-2">Core Learning</h3>
            <p className="text-body-sm text-text-secondary mb-4">Always free for every Grade 12 student</p>
            <ul className="space-y-2 text-body-sm text-text-secondary">
              <li className="flex items-center gap-2">✓ Selected lessons across all subjects</li>
              <li className="flex items-center gap-2">✓ Basic topic quizzes & answer keys</li>
              <li className="flex items-center gap-2">✓ Standard progress tracking</li>
              <li className="flex items-center gap-2">✓ Public study resources & formulas</li>
            </ul>
          </div>
          <div className="p-6 rounded-card bg-surface border-2 border-brand-gold shadow-card relative">
            <span className="inline-block px-2.5 py-1 rounded-badge text-caption font-bold bg-brand-gold/10 text-brand-gold-dark mb-3">
              {t('common.premium')}
            </span>
            <h3 className="text-h3 font-bold text-brand-navy mb-2">Advanced Prep</h3>
            <p className="text-body-sm text-text-secondary mb-4">Full access for deep preparation</p>
            <ul className="space-y-2 text-body-sm text-text-secondary">
              <li className="flex items-center gap-2">✓ Complete lesson library with worked examples</li>
              <li className="flex items-center gap-2">✓ Full timed national mock exams</li>
              <li className="flex items-center gap-2">✓ Topic mastery analytics & weak area alerts</li>
              <li className="flex items-center gap-2">✓ Offline downloadable practice sets</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

