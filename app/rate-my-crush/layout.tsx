import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rate My Crush & Free AI Dating Assistant — Rizz AI",
  description:
    "Upload a screenshot or picture of your crush for instant AI rating, pickup line suggestions, and match analysis for Tinder, Hinge & Bumble.",
  keywords: [
    "rate my crush",
    "rate my bf",
    "rate my gf",
    "ai wingman app",
    "free dating assitant",
    "rizz reply app",
    "tinder",
    "hinge",
    "bumble",
  ],
  alternates: {
    canonical: "https://rizz-ai.space/rate-my-crush",
  },
  openGraph: {
    title: "Rate My Crush & Free AI Dating Assistant | Rizz AI",
    description:
      "Get instant AI rating & response advice for your crush's photo or chat screenshots.",
    url: "https://rizz-ai.space/rate-my-crush",
  },
};

export default function RateMyCrushLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
