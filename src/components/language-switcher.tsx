"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { ChevronDown, Globe } from "lucide-react";

type GoogleTranslationConfig = {
  sourceLanguage: string;
  defaultLanguage: string;
  languages: { name: string; title: string }[];
};

const COOKIE_NAME = "googtrans";
const COOKIE_MAX_AGE_DAYS = 365;
const fallbackLanguages = [
  { name: "de", title: "Deutsch" },
  { name: "en", title: "English" },
];

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : undefined;
}

function setCookie(name: string, value: string, maxAgeDays = COOKIE_MAX_AGE_DAYS) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAgeDays * 24 * 60 * 60}`;
}

const LanguageSwitcherComponent = () => {
  const [currentLang, setCurrentLang] = useState("de");
  const [config, setConfig] = useState<GoogleTranslationConfig | null>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleConfig = () => {
      const translationConfig = window.__GOOGLE_TRANSLATION_CONFIG__;
      if (!translationConfig) return;

      setConfig(translationConfig);
      const cookie = getCookie(COOKIE_NAME);
      const lang = cookie?.split("/")?.[2] || translationConfig.defaultLanguage;
      setCurrentLang(lang);
    };

    if (window.__GOOGLE_TRANSLATION_CONFIG__) {
      handleConfig();
    }

    window.addEventListener("translationConfigReady", handleConfig);
    return () => {
      window.removeEventListener("translationConfigReady", handleConfig);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLang = (lang: string) => {
    const sourceLanguage = config?.sourceLanguage ?? "en";
    setCookie(COOKIE_NAME, `/${sourceLanguage}/${lang}`);
    setCurrentLang(lang);
    setOpen(false);
    if (typeof window !== "undefined") {
      document.documentElement.lang = lang;
      window.location.reload();
    }
  };

  const languages = config?.languages ?? fallbackLanguages;
  const activeLangObj = languages.find((l) => l.name === currentLang) || languages[0];

  return (
    <div ref={dropdownRef} className="notranslate relative inline-flex" translate="no">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="h-4 w-4 text-slate-500" />
        <span>{activeLangObj.title}</span>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 min-w-[130px] overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
          {languages.map((language) => (
            <button
              key={language.name}
              type="button"
              onClick={() => switchLang(language.name)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                currentLang === language.name
                  ? "bg-blue-50 font-semibold text-[#1672E6]"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>{language.title}</span>
              {currentLang === language.name && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#1672E6]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const LanguageSwitcher = dynamic(() => Promise.resolve(LanguageSwitcherComponent), {
  ssr: false,
});

export default LanguageSwitcher;
