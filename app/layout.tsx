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
  "rizz app",
  "rizzai app",
  "rizz gpt",
  "pick up lines",
  "rizz lines",
  "flirting pick up lines",
  "best pick up lines",
  "funny pick up lines",
  "cheesy pick up lines",
  "good pick up lines",
  "rizz ai",
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
  "rizz app free",
  "rizz app online",
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
  "how to have a glow up",
  "how to get a glow up",
  "tips for glow up",
  "looksmax ai",
  "face rating",
  "face attractiveness test",
  "attractiveness face test",
  "looksmaxxed",
  "looksmaxing",
  "looksmaxxing",
  "looksmaxxed app",
  "looksmaxing app",
  "looksmaxxing app",
  "free looksmaxxed app",
  "free looksmaxing app",
  "free looksmaxxing app",
  "umax",
  "psl scale",
  "ai face rater",
  "psl scale test",
  "psl rating test",
  "psl rating scale",
  "best pick up line",
  "pickup lines cute",
  "pick up lines for flirting",
  "adorable pick up lines",
  "tinder",
  "hinge",
  "bumble",
  "chat up lines",
  "parade",
  "theknot",
  "couples game",
  "couple games",
  "couples games",
  "couple game questions",
  "coup card game",
  "couple games questions",
  "couples game questions",
  "couples games questions",
  "game of questions for couples",
  "Free Couple Games to Play Online | lovely",
  "Online Games for Couples",
  "hot or not hot",
  "hot or not website",
  "hot and not",
  "roast my ex",
  "roast me",
  "rate my bf",
  "rate my gf",
  "hotornot",
  "hot or not site",
  "love test name",
  "love match test",
  "name compatibility quiz",
  "love meter",
  "love calculator names",
];

/* ─── Global SEO Metadata ─── */
export const metadata: Metadata = {
  title: {
    default: "Rizz AI — #1 Free AI Wingman, Pickup Line Generator & Looksmaxing Rating App",
    template: "%s | Rizz AI (rizz-ai.space)",
  },
  description:
    "Rizz AI (rizz-ai.space) is your free AI wingman & dating assistant. Generate smooth rizz lines, flirty pickup lines for Tinder/Hinge/Bumble, PSL scale AI face rating, glow up tips, selfie roasts, and online couple games.",
  keywords: seoKeywords,
  authors: [{ name: "Rizz AI Team", url: "https://rizz-ai.space" }],
  creator: "Rizz AI",
  publisher: "Rizz AI",
  metadataBase: new URL("https://rizz-ai.space"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rizz AI — #1 AI Wingman, Pickup Lines & Looksmaxing Rating App",
    description:
      "Level up your rizz with free AI pickup lines, PSL scale face rating, selfie roasts, and online couple games. Try Rizz AI now!",
    url: "https://rizz-ai.space",
    siteName: "Rizz AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Rizz AI — Free AI Wingman App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizz AI — #1 AI Wingman & Pickup Line Generator",
    description:
      "Get smooth rizz lines, flirty pickup lines, looksmaxing PSL face ratings & couple games at rizz-ai.space",
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
  alternateName: ["RizzAI App", "Rizz GPT", "Rizz Generator"],
  url: "https://rizz-ai.space",
  description:
    "Free AI Wingman app, Pickup Line Generator, Looksmaxing AI Face Rating, and Couple Games for Tinder, Hinge & Bumble.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://rizz-ai.space/pickup-line?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Rizz AI — Free AI Wingman & Dating Assistant",
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
    ratingCount: "12850",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={lilitaOne.variable}>
      <head>
        {/* Preconnect for faster loading */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="Dc3uCozuXOMGTsKUWOyzpX2VokIgnkfoSKsfRmg9I1U" />

        {/* Mobile & PWA meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Rizz AI" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <ErrorBoundary>
            <SoundListener />
            {children}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
