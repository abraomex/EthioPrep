import { useLanguage } from '../../lib/i18n';

interface LanguageSwitcherProps {
  compact?: boolean;
  className?: string;
}

export function LanguageSwitcher({ compact = false, className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'am' : 'en');
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-badge text-body-sm font-medium
        transition-all duration-150 cursor-pointer border
        bg-surface/10 hover:bg-surface/20 text-white border-white/20
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
        ${className}
      `.trim()}
      aria-label={`Switch to ${language === 'en' ? 'Amharic' : 'English'}`}
      title={language === 'en' ? 'Switch to አማርኛ' : 'Switch to English'}
    >
      <span className="text-base" role="img" aria-hidden="true">🌐</span>
      {compact ? (
        <span className="font-bold tracking-wide uppercase">{language === 'en' ? 'EN' : 'አማ'}</span>
      ) : (
        <span className="font-medium">
          {language === 'en' ? (
            <>
              <span className="font-bold text-white">EN</span>
              <span className="text-white/60 mx-1">|</span>
              <span className="text-white/80">አማርኛ</span>
            </>
          ) : (
            <>
              <span className="font-bold text-white">አማ</span>
              <span className="text-white/60 mx-1">|</span>
              <span className="text-white/80">English</span>
            </>
          )}
        </span>
      )}
    </button>
  );
}

