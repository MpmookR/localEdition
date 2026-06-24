"use client";

import { useLanguage, type Language } from "@/app/i18n/language-context";

function ToggleButton({
  language,
  active,
  onSelect,
  children,
}: {
  language: Language;
  active: boolean;
  onSelect: (language: Language) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(language)}
      className={`cursor-pointer rounded-[4px] px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors ${
        active ? "bg-gold text-background" : "text-cream/70"
      }`}
    >
      {children}
    </button>
  );
}

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-[8px] border border-gold/40 bg-background/60 p-1">
      <ToggleButton language="en" active={language === "en"} onSelect={setLanguage}>
        EN
      </ToggleButton>
      <ToggleButton language="th" active={language === "th"} onSelect={setLanguage}>
        TH
      </ToggleButton>
    </div>
  );
}
