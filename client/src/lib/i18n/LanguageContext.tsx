import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { translations, type TranslationKey } from './translations';

type Language = 'en' | 'am';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  getLocalizedText: <T extends Record<string, unknown>>(
    item: T,
    field: string,
    lang?: Language
  ) => { text: string; isFallback: boolean };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'ethioprep_lang';

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'am') return stored;
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[language][key] ?? translations.en[key] ?? key;
    },
    [language]
  );

  const getLocalizedText = useCallback(
    <T extends Record<string, unknown>>(item: T, field: string, lang?: Language) => {
      const currentLang = lang ?? language;
      const localizedField = `${field}${currentLang === 'am' ? 'Am' : 'En'}` as keyof T;
      const fallbackField = `${field}En` as keyof T;
      const snakeLocalized = `${field}_${currentLang}` as keyof T;
      const snakeFallback = `${field}_en` as keyof T;

      // Try camelCase first, then snake_case
      const localizedValue = (item[localizedField] ?? item[snakeLocalized]) as string | undefined;
      const fallbackValue = (item[fallbackField] ?? item[snakeFallback]) as string | undefined;

      if (localizedValue && localizedValue.trim() !== '') {
        return { text: localizedValue, isFallback: false };
      }
      return {
        text: fallbackValue ?? '',
        isFallback: currentLang === 'am',
      };
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getLocalizedText }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
