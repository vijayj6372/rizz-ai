"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type LanguageCode =
  | "en"
  | "zh"
  | "ja"
  | "pt"
  | "it"
  | "ru"
  | "fr"
  | "de"
  | "es"
  | "hi";

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  countryCode: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸", countryCode: "us" },
  { code: "zh", name: "Mandarin Chinese", nativeName: "中文", flag: "🇨🇳", countryCode: "cn" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", countryCode: "jp" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷", countryCode: "br" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", countryCode: "it" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", countryCode: "ru" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", countryCode: "fr" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", countryCode: "de" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", countryCode: "es" },
  { code: "hi", name: "Hinglish", nativeName: "Hinglish", flag: "🇮🇳", countryCode: "in" },
];

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentLanguageOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  currentLanguageOption: LANGUAGES[0],
});

const STORAGE_KEY = "rizz_app_language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY) as LanguageCode;
      if (savedLang && LANGUAGES.some((l) => l.code === savedLang)) {
        setLanguageState(savedLang);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore errors
    }
  };

  const currentLanguageOption =
    LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, currentLanguageOption }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
