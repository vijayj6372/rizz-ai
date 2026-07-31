import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Roast My Selfie & Roast My Ex Generator — Rizz AI",
  description:
    "Upload a picture and get hilarious, savage AI roasts for your selfie or ex. Instant laugh guaranteed with AI Roast Generator.",
  keywords: [
    "roast my selfie",
    "roast my ex",
    "roast me",
    "funny roasts",
    "rizzbot roast",
    "ai photo roast",
  ],
  alternates: {
    canonical: "https://rizz-ai.space/roast-my-selfie",
  },
  openGraph: {
    title: "AI Roast My Selfie & Roast My Ex | Rizz AI",
    description:
      "Get savage, funny AI roasts for your selfies and photos instantly.",
    url: "https://rizz-ai.space/roast-my-selfie",
  },
};

export default function RoastMySelfieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
