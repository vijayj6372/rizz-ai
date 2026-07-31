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

/* ─── SEO Metadata ─── */
export const metadata: Metadata = {
  title: {
    default: "Rizz AI — Perfect Pickup Lines & Dating Tips",
    template: "%s | Rizz AI",
  },
  description:
    "AI-powered pickup lines, looksmaxing tips, selfie roasts, and dating advice. Level up your rizz game with Rizz AI.",
  keywords: [
    "rizz",
    "pickup lines",
    "dating tips",
    "looksmaxing",
    "AI",
    "flirting",
    "roast my selfie",
    "rate my crush",
  ],
  authors: [{ name: "Rizz AI" }],
  creator: "Rizz AI",
  metadataBase: new URL("https://rizzai.space"),
  openGraph: {
    title: "Rizz AI — Perfect Pickup Lines & Dating Tips",
    description: "AI-powered pickup lines, looksmaxing tips & selfie roasts.",
    type: "website",
    locale: "en_US",
    siteName: "Rizz AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizz AI",
    description: "AI-powered pickup lines, looksmaxing tips & selfie roasts.",
    creator: "@Vijay_Jadav_7",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

/* ─── Viewport (mobile-first) ─── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#F6766E",
  viewportFit: "cover", // enables safe-area support on iOS
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={lilitaOne.variable}>
      <head>
        {/* Preconnect for faster resource loading */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* PWA / Apple */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Rizz AI" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
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
