/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";

type TranslationConfig = {
  sourceLanguage: string;
  defaultLanguage: string;
  languages: { name: string; title: string }[];
};

declare global {
  interface Window {
    TranslateInit?: () => void;
    __GOOGLE_TRANSLATION_CONFIG__?: TranslationConfig;
    __GOOGLE_TRANSLATION_DOM_PATCHED__?: boolean;
    google?: any;
  }
}

const COOKIE_NAME = "googtrans";
const SCRIPT_ID = "google-translate-script";
const COOKIE_MAX_AGE_DAYS = 365;

const translationConfig: TranslationConfig = {
  sourceLanguage: "en",
  defaultLanguage: "de",
  languages: [
    { title: "Deutsch", name: "de" },
    { title: "English", name: "en" },
  ],
};

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : undefined;
}

function setCookie(name: string, value: string, maxAgeDays = COOKIE_MAX_AGE_DAYS) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAgeDays * 24 * 60 * 60}`;
}

function ensureDefaultLanguageCookie() {
  const currentCookie = getCookie(COOKIE_NAME);
  if (currentCookie) return;

  setCookie(
    COOKIE_NAME,
    `/${translationConfig.sourceLanguage}/${translationConfig.defaultLanguage}`
  );
}

function patchGoogleTranslateDomConflicts() {
  if (typeof window === "undefined" || window.__GOOGLE_TRANSLATION_DOM_PATCHED__) {
    return;
  }

  window.__GOOGLE_TRANSLATION_DOM_PATCHED__ = true;

  const originalRemoveChild = Node.prototype.removeChild;
  const originalInsertBefore = Node.prototype.insertBefore;

  Node.prototype.removeChild = function removeChild<T extends Node>(child: T) {
    if (child.parentNode !== this) {
      return child;
    }
    return originalRemoveChild.call(this, child) as T;
  };

  Node.prototype.insertBefore = function insertBefore<T extends Node>(
    newNode: T,
    referenceNode: Node | null
  ) {
    if (referenceNode && referenceNode.parentNode !== this) {
      return originalInsertBefore.call(this, newNode, null) as T;
    }
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };
}

function dispatchConfigReady() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("translationConfigReady"));
  }
}

function initTranslate() {
  const el = document.getElementById("google_translate_element");
  if (!el || !window.google?.translate?.TranslateElement) {
    return;
  }

  el.innerHTML = "";
  new window.google.translate.TranslateElement(
    {
      pageLanguage: translationConfig.sourceLanguage,
      includedLanguages: translationConfig.languages.map((l) => l.name).join(","),
      autoDisplay: false,
    },
    "google_translate_element"
  );
  suppressGoogleBanner();
}

function suppressGoogleBanner() {
  if (typeof document === "undefined") return;

  const hideBanner = () => {
    if (document.body && document.body.style.top && document.body.style.top !== "0px") {
      document.body.style.top = "0px";
    }
    const frames = document.querySelectorAll(
      ".goog-te-banner-frame, iframe.skiptranslate, #goog-gt-tt, .VIpgJd-ZVi9od-aZ2wEe-wOHMyf"
    );
    frames.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.display = "none";
      htmlEl.style.visibility = "hidden";
      htmlEl.style.height = "0px";
    });
  };

  hideBanner();
  const interval = setInterval(hideBanner, 200);
  setTimeout(() => clearInterval(interval), 10000);
}

function loadGoogleTranslateScript() {
  if (document.getElementById(SCRIPT_ID)) {
    initTranslate();
    return;
  }

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.src = "https://translate.google.com/translate_a/element.js?cb=TranslateInit";
  script.async = true;
  document.body.appendChild(script);
}

export default function TranslateProvider() {
  useEffect(() => {
    window.__GOOGLE_TRANSLATION_CONFIG__ = translationConfig;
    window.TranslateInit = initTranslate;

    patchGoogleTranslateDomConflicts();
    ensureDefaultLanguageCookie();
    dispatchConfigReady();
    loadGoogleTranslateScript();
    suppressGoogleBanner();
  }, []);

  return <div id="google_translate_element" aria-hidden="true" className="hidden" />;
}
