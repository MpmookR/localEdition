"use client";

import { useLanguage } from "@/app/i18n/language-context";

type Settings = {
  barName: string | null;
  addressEn: string | null;
  addressTh: string | null;
  openDaysEn: string | null;
  openDaysTh: string | null;
  openTimeEn: string | null;
  openTimeTh: string | null;
  mapUrl: string | null;
  phone: string | null;
  email: string | null;
  socialLinks: Array<{ label?: string; url?: string; _key: string }> | null;
};

const COPY = {
  en: {
    findUs: "Find Us",
    location: "Songkhla, Thailand",
    open: "Open",
    hours: "Hours",
    getDirection: "Get Direction",
  },
  th: {
    findUs: "พบเราได้ที่",
    location: "สงขลา, ประเทศไทย",
    open: "เปิด",
    hours: "เวลา",
    getDirection: "เส้นทาง",
  },
} as const;

export function FindUs({ settings }: { settings: Settings | null }) {
  const { language } = useLanguage();
  const copy = COPY[language];

  if (!settings) return null;

  const address =
    language === "en" ? settings.addressEn : settings.addressTh ?? settings.addressEn;
  const openDays =
    language === "en" ? settings.openDaysEn : settings.openDaysTh ?? settings.openDaysEn;
  const openTime =
    language === "en" ? settings.openTimeEn : settings.openTimeTh ?? settings.openTimeEn;

  return (
    <section className="flex flex-col gap-6 px-6 py-10 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-muted">{copy.findUs}</p>
      <h2 className="text-xl uppercase tracking-widest text-gold">
        {settings.barName} · Hatyai
      </h2>
      <p className="text-sm text-muted">{copy.location}</p>

      <div className="grid grid-cols-2 divide-x divide-gold/15 border border-gold/15 text-left text-sm">
        <div className="flex flex-col gap-1 p-4">
          <span className="text-xs uppercase tracking-widest text-muted">
            {copy.open}
          </span>
          <span className="text-cream">{openDays}</span>
        </div>
        <div className="flex flex-col gap-1 p-4">
          <span className="text-xs uppercase tracking-widest text-muted">
            {copy.hours}
          </span>
          <span className="text-cream">{openTime}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 border border-gold/15 p-4 text-left text-sm text-cream">
        {address && <p>{address}</p>}
        {settings.phone && <p>{settings.phone}</p>}
        {settings.email && <p>{settings.email}</p>}
      </div>

      {/* placeholder for the embedded map in the mockup */}
      <div
        className="flex h-40 w-full items-center justify-center border border-gold/15 bg-muted/10 text-xs uppercase tracking-widest text-muted"
        aria-hidden
      >
        Map placeholder
      </div>

      {settings.mapUrl && (
        <a
          href={settings.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="self-center text-sm uppercase tracking-widest text-gold underline-offset-4 hover:underline"
        >
          {copy.getDirection} →
        </a>
      )}

      {settings.socialLinks && settings.socialLinks.length > 0 && (
        <div className="flex justify-center gap-3">
          {settings.socialLinks.map((link) => (
            <a
              key={link._key}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-gold/30 px-4 py-2 text-xs uppercase tracking-widest text-cream"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
