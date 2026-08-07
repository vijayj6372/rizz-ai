import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SoundListener } from "@/components/SoundListener";
import "./globals.css";

const lilitaOne = localFont({
  src: "../public/fonts/LilitaOne-Regular.ttf",
  variable: "--font-lilita-one",
  display: "swap",
  preload: true,
  fallback: ["cursive"],
});

/* ─── SEO Target Keywords ─── */
const seoKeywords = [
  "rizz",
  "rizz ai",
  "rizz app",
  "dating ai",
  "ai dating app",
  "rizz gpt",
  "ai rizz",
  "rizz app online",
  "rizz app free",
  "ai dating chatbot",
  "rizzai.space",
  "rizz space",
  "rizzai",
  "RIZZ AI chat",
  "Free Rizz AI",
  "RizzChat app",
  "Rizz AI response",
  "RIZZ AI bot",
  "Free Rizz AI website",
  "Rizz ai gemini",
  "Dating assistant AI free",
  "Smooth Rizz AI",
  "Rizz AI free online",
  "Free rizz ai download",
  "Free rizz ai apk",
  "Free rizz ai for android",
  "Best free rizz ai",
  "RIZZ AI assistant",
  "Rizz ai assistant app",
  "Rizz AI free",
  "Rizz ai assistant review",
  "Rizz AI dating assistant",
  "Plug AI Rizz app",
  "Rizz AI screenshot",
  "pick up lines",
  "rizz lines",
  "flirting pick up lines",
  "best pick up lines",
  "funny pick up lines",
  "cheesy pick up lines",
  "good pick up lines",
  "best rizz lines",
  "corny pick up lines",
  "rizz pick up lines",
  "rizz pickup lines",
  "pick up lines for guys",
  "cute pick up lines",
  "good rizz lines",
  "rizz up lines",
  "smooth rizz lines",
  "pick up lines funny",
  "pick up lines with rizz",
  "free rizz app",
  "free ai wingman",
  "ai wingman app",
  "free dating assitant",
  "rizzapp",
  "rizzing",
  "rizz apps free",
  "rizz generator",
  "rizz reply app",
  "rizzbot",
  "rizz helper",
  "looksmaxing rating",
  "looksmax",
  "looksmaxing ai",
  "looksmaxing meaning",
  "look max",
  "how to looksmax",
  "looksmaxing scale app",
  "looksmaxing scale",
  "how to glow up",
  "glow up tips",
  "looksmax ai",
  "face rating",
  "face attractiveness test",
  "attractiveness face test",
  "looksmaxxed",
  "looksmaxing",
  "looksmaxxing",
  "looksmaxing app",
  "psl scale",
  "ai face rater",
  "psl rating test",
  "psl rating scale",
  "tinder",
  "hinge",
  "bumble",
  "couple games",
  "couples games",
  "game of questions for couples",
  "hot or not website",
  "roast my selfie",
  "rate my crush",
  "love test name",
  "love calculator names",
];

/* ─── Global SEO Metadata ─── */
export const metadata: Metadata = {
  title: {
    default: "Rizz AI — #1 Free Dating AI, AI Wingman & AI Dating App",
    template: "%s | Rizz AI (www.rizzai.space)",
  },
  description:
    "Rizz AI (rizzai.space) is the #1 free AI dating app, dating AI wingman & rizz gpt chatbot. Get smooth AI rizz lines, Tinder/Hinge/Bumble replies, PSL face ratings & couple games online for free.",
  keywords: seoKeywords,
  authors: [{ name: "Rizz AI Team", url: "https://www.rizzai.space" }],
  creator: "Rizz AI",
  publisher: "Rizz AI",
  metadataBase: new URL("https://www.rizzai.space"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "96x96", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Rizz AI — #1 Free Dating AI, AI Wingman & AI Dating App",
    description:
      "Rizz AI (rizzai.space) is the #1 free AI dating app, dating AI wingman & rizz gpt chatbot. Get smooth AI rizz lines, Tinder/Hinge/Bumble replies, PSL face ratings & couple games online for free.",
    url: "https://www.rizzai.space",
    siteName: "Rizz AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Rizz AI — #1 Free AI Dating App & AI Wingman",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizz AI — #1 Free Dating AI & AI Dating App",
    description:
      "Get smooth rizz lines, flirty pickup lines, looksmaxing PSL face ratings & couple games at rizzai.space",
    creator: "@Vijay_Jadav_7",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "Dc3uCozuXOMGTsKUWOyzpX2VokIgnkfoSKsfRmg9I1U",
  },
  other: {
    "google-site-verification": "Dc3uCozuXOMGTsKUWOyzpX2VokIgnkfoSKsfRmg9I1U",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Rizz AI",
    "mobile-web-app-capable": "yes",
    "format-detection": "telephone=no",
  },
};

/* ─── Viewport (mobile-first) ─── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#F6766E",
  viewportFit: "cover",
};

/* ─── Schema.org Structured Data (JSON-LD) ─── */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rizz AI",
  alternateName: [
    "Rizz AI",
    "Rizz App",
    "Dating AI",
    "AI Dating App",
    "Rizz GPT",
    "AI Rizz",
    "Rizz App Online",
    "Rizz App Free",
    "AI Dating Chatbot",
    "rizzai.space",
  ],
  url: "https://www.rizzai.space",
  description:
    "Rizz AI is the #1 free AI dating app, dating AI wingman & rizz gpt chatbot for Tinder, Hinge & Bumble.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.rizzai.space/pickup-line?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Rizz AI — Free Dating AI & AI Dating App",
  operatingSystem: "Web, iOS, Android",
  applicationCategory: "LifestyleApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "14850",
  },
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Rizz AI and how does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rizz AI (rizzai.space) is a free AI dating app and AI wingman designed to generate charismatic pickup lines, witty conversation replies for Tinder, Hinge, and Bumble, PSL face rating analysis, and couple games.",
      },
    },
    {
      "@type": "Question",
      name: "Is Rizz AI free to use online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Rizz AI is 100% free to use online on both mobile and desktop without requiring any download, credit card, or subscription.",
      },
    },
    {
      "@type": "Question",
      name: "What is Rizz GPT / AI Dating Chatbot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rizz GPT is an advanced AI dating chatbot trained to help you craft irresistible dating chat replies, comeback lines, romantic compliments, and conversation starters.",
      },
    },
  ],
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rizz AI",
  url: "https://www.rizzai.space",
  logo: "https://www.rizzai.space/icon.png",
  sameAs: ["https://x.com/Vijay_Jadav_7"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={lilitaOne.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <ErrorBoundary>
            <SoundListener />
            {children}
          </ErrorBoundary>
        </ThemeProvider>

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
