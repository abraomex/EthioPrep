import { Link } from 'react-router-dom';
import { useLanguage } from '../../lib/i18n';

interface FooterProps {
  minimal?: boolean;
}

export function Footer({ minimal = false }: FooterProps) {
  const { t, language } = useLanguage();

  if (minimal) {
    return (
      <footer className="w-full bg-brand-navy-dark text-white/70 py-6 border-t border-white/10 text-caption text-center">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>{t('footer.copyright')}</p>
          <div className="flex items-center gap-4 text-white/60">
            <Link to="/about" className="hover:text-white transition-colors">{t('footer.about')}</Link>
            <Link to="/about" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
            <Link to="/about" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full bg-brand-navy-dark text-white pt-12 pb-24 md:pb-12 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-badge bg-brand-teal flex items-center justify-center font-extrabold text-white text-base">
                E
              </span>
              <span className="font-bold text-lg text-white">EthioPrep</span>
            </div>
            <p className="text-body-sm text-white/70 leading-relaxed">
              {language === 'am'
                ? 'የኢትዮጵያ የ12ኛ ክፍል ብሔራዊ ፈተና ዝግጅት መድረክ። ሁለት ቋንቋ ትምህርቶች፣ ጥያቄዎች እና የውጤት ክትትል።'
                : 'Empowering Ethiopian Grade 12 students with bilingual lessons, timed practice exams, and progress analytics.'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-body-sm font-semibold text-white uppercase tracking-wider mb-3">
              {language === 'am' ? 'ፈጣን ማገናኛዎች' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-body-sm text-white/70">
              <li>
                <Link to="/subjects" className="hover:text-white transition-colors">
                  {t('nav.subjects')}
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  {t('nav.resources')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors text-brand-gold">
                  {t('home.hero.cta.start')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Streams */}
          <div>
            <h4 className="text-body-sm font-semibold text-white uppercase tracking-wider mb-3">
              {language === 'am' ? 'የትምህርት ዥረቶች' : 'Curriculum Streams'}
            </h4>
            <ul className="space-y-2 text-body-sm text-white/70">
              <li>
                <Link to="/subjects?stream=natural_science" className="hover:text-white transition-colors">
                  🔬 {t('home.streams.natural')}
                </Link>
              </li>
              <li>
                <Link to="/subjects?stream=social_science" className="hover:text-white transition-colors">
                  🏛️ {t('home.streams.social')}
                </Link>
              </li>
              <li>
                <Link to="/subjects?stream=common" className="hover:text-white transition-colors">
                  📖 {t('home.streams.common')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-body-sm font-semibold text-white uppercase tracking-wider mb-3">
              {t('about.contact')}
            </h4>
            <ul className="space-y-2 text-body-sm text-white/70">
              <li>Email: contact@ethioprep.edu.et</li>
              <li>Addis Ababa, Ethiopia</li>
              <li className="pt-2 flex gap-3 text-white/80">
                <Link to="/about" className="hover:text-white">{t('footer.terms')}</Link>
                <span>•</span>
                <Link to="/about" className="hover:text-white">{t('footer.privacy')}</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Curriculum Disclaimer Box */}
        <div className="bg-white/5 border border-white/10 rounded-card p-4 mb-8 text-caption text-white/60 leading-relaxed">
          <span className="font-semibold text-white/80 mr-1">
            {language === 'am' ? 'ማሳሰቢያ:' : 'Disclaimer:'}
          </span>
          {t('footer.disclaimer')}
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-caption text-white/50 gap-2">
          <p>{t('footer.copyright')}</p>
          <p>Designed for mobile accessibility across Ethiopia</p>
        </div>
      </div>
    </footer>
  );
}

