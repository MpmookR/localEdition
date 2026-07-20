/**
 * Root layout — wraps every page in the app (including the menu page customers
 * land on after scanning the QR code). Hosts the single LanguageProvider
 * instance so the EN/TH selection persists across client-side navigation,
 * plus a global scroll-to-top-on-navigate fix. See ../doc.md for the full
 * project overview.
 */
import type { Metadata } from "next";
import {
  Cinzel_Decorative,
  Cormorant_Garamond,
  Mali,
  Noto_Serif_Thai,
  Trirong,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/app/i18n/language-context";
import { ScrollToTop } from "@/app/components/ScrollToTop";
import { SanityLive } from "@/sanity/lib/live";

// English display (h1).
const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Thai display (h1) — pairs with Cinzel Decorative, picked up via :lang(th).
const trirong = Trirong({
  variable: "--font-trirong",
  subsets: ["latin", "thai"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

// English body (h2, p, footer).
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

// Thai body (h2, p, footer) — pairs with Cormorant Garamond, picked up via
// :lang(th). No italic style available for this font.
const notoSerifThai = Noto_Serif_Thai({
  variable: "--font-noto-serif-thai",
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600"],
});

// Owner's handwritten note, shared across both languages — supports thai subset.
const mali = Mali({
  variable: "--font-mali",
  subsets: ["latin", "thai"],
  weight: ["400", "600"],
});

// do we need it? 
export const metadata: Metadata = {
  title: "Local Edition — Hatyai",
  description: "Cocktails, beers, and slow nights in Hatyai, Thailand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzelDecorative.variable} ${trirong.variable} ${cormorantGaramond.variable} ${notoSerifThai.variable} ${mali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollToTop />
        <LanguageProvider>{children}</LanguageProvider>
        <SanityLive />
      </body>
    </html>
  );
}
