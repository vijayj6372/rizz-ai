import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Looksmaxing AI & PSL Scale Face Rating App — Free Glow Up Test",
  description:
    "AI face rating & attractiveness face test based on the PSL scale. Learn how to looksmax, how to glow up with personalized glow up tips, and test face attractiveness instantly.",
  keywords: [
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
  ],
  alternates: {
    canonical: "https://www.rizzai.space/looksmaxing",
  },
  openGraph: {
    title: "Looksmaxing AI & PSL Scale Face Rating App | Rizz AI",
    description:
      "Rate facial attractiveness, discover your PSL scale score, and get instant glow up tips with free Looksmaxing AI.",
    url: "https://www.rizzai.space/looksmaxing",
  },
};

export default function LooksmaxingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
