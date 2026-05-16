import { createContext, useContext, useState, useEffect } from 'react';
import id from './id.json';
import en from './en.json';

const translations = { id, en };
const SUPPORTED_LANGUAGES = ['id', 'en'];
const DEFAULT_LANGUAGE = 'id';
const STORAGE_KEY = 'lex-lingua-lang';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && SUPPORTED_LANGUAGES.includes(saved) ? saved : DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const switchLanguage = (lang) => {
    if (SUPPORTED_LANGUAGES.includes(lang)) setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t, SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
