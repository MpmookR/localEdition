"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Language = "en" | "th";

const STORAGE_KEY = "local-edition-language";

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "th";
}

// localStorage only fires the native "storage" event in *other* tabs, so
// setLanguage below dispatches one manually to notify this tab's subscribers.
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): Language {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLanguage(stored) ? stored : "en";
}

// Server has no localStorage — render "en" until the client snapshot takes
// over post-hydration, same fallback used when nothing is stored yet.
function getServerSnapshot(): Language {
  return "en";
}

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLanguage = useCallback((next: Language) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {/* `contents` keeps this wrapper out of the flex layout — it only
          exists to put `lang` on an ancestor so the :lang(th) font-swap
          rules in globals.css activate. */}
      <div lang={language} className="contents">
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
