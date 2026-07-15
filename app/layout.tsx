import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// next/font self-hosts and pre-sizes fallbacks, so there's no layout shift
// when the webfonts swap in.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hiired.example"),
  title: "Hiired — Swipe to apply for UK graduate jobs",
  description:
    "Hiired matches UK graduates to roles from employers who post directly on the platform. Swipe right and it's a real application — plus practice for the reasoning tests that come next.",
  openGraph: {
    title: "Hiired — Swipe to apply for UK graduate jobs",
    description:
      "Match to real graduate roles, swipe to apply, and practise the reasoning tests employers use.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-2xs focus:uppercase focus:tracking-label focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
