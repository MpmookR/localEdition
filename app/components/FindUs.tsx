"use client";

import { useLanguage } from "@/app/i18n/language-context";

type Address = {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  province?: string | null;
  postal?: string | null;
};

type Settings = {
  barName: string | null;
  addressEn: Address | null;
  addressTh: Address | null;
  openDaysEn: string | null;
  openDaysTh: string | null;
  openTimeEn: string | null;
  openTimeTh: string | null;
  mapUrl: string | null;
  mapEmbedUrl: string | null;
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
    <section className="flex flex-col text-center gap-4 px-8 pt-2 pb-6 sm:px-24 sm:pt-4 sm:pb-8">
      <p className="text-xs uppercase tracking-[0.3em] text-muted">{copy.findUs}</p>
      <h2 className="text-lg uppercase tracking-widest text-gold font-bold">
        {settings.barName} · Hatyai
      </h2>
      <p className="text-sm tracking-widest text-muted">{copy.location}</p>

      <div className="grid grid-cols-2 divide-x divide-gold/15 border border-gold/15 rounded-lg text-left text-sm">
        <div className="flex flex-col gap-1 p-4">
          <span className="text-xs uppercase tracking-widest text-muted">
            {copy.open}
          </span>
          <span className="text-cream text-base tracking-widest">{openDays}</span>
        </div>
        <div className="flex flex-col gap-1 p-4">
          <span className="text-xs uppercase tracking-widest text-muted">
            {copy.hours}
          </span>
          <span className="text-cream text-base tracking-widest">{openTime}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 bg-muted/10 border border-gold/15 rounded-lg p-4 text-left text-base text-cream tracking-widest">
        {address && (
          <div className="flex gap-4 items-center">
            <svg className="mt-0.5 shrink-0 text-gold" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            <div className="flex flex-col gap-0.2">
              {address.line1 && <span>{address.line1}</span>}
              {address.line2 && <span className="text-muted">{address.line2}</span>}
              {(address.city || address.province || address.postal) && (
                <span className="text-muted">
                  {[address.city, address.province, address.postal].filter(Boolean).join(', ')}
                </span>
              )}
            </div>
          </div>
        )}

        <hr className="border-gold/15" />

        {settings.phone && (
          <div className="flex items-center gap-4">
            <svg className="shrink-0 text-gold" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9a16 16 0 0 0 7.91 7.91l1.18-1.18a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z"/>
            </svg>
            <span>{settings.phone}</span>
          </div>
        )}
        {settings.email && (
          <div className="flex items-center gap-4">
            <svg className="shrink-0 text-gold" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <span>{settings.email}</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-4 sm:gap-8 ">
      {settings.mapEmbedUrl ? (
        <iframe
          src={settings.mapEmbedUrl}
          className="h-60 w-full rounded-lg border border-gold/15  sm:h-96"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location map"
        />
      ) : (
        <div
          className="flex h-52 w-full items-center justify-center rounded-lg border border-gold/15 bg-muted/10 text-xs uppercase tracking-widest text-muted"
          aria-hidden
        >
          Map placeholder
        </div>
      )}

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
      </div>

      {settings.socialLinks && settings.socialLinks.length > 0 && (
        <div className="flex justify-center gap-4">
          {settings.socialLinks.map((link) => (
            <a
              key={link._key}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-gold/30 px-6 py-3 text-xs uppercase tracking-widest text-cream font-semibold transition-colors duration-400 hover:bg-gold hover:text-background "
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
