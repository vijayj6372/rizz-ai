import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Glow Up & Glow Up Tips — Complete Looksmaxing Guide",
  description:
    "Discover actionable glow up tips on how to have a glow up, improve facial symmetry, haircut, jawline, skincare, and elevate your PSL scale score.",
  keywords: [
    "how to glow up",
    "glow up tips",
    "how to have a glow up",
    "how to get a glow up",
    "tips for glow up",
    "how to looksmax",
    "looksmaxing meaning",
    "psl scale",
    "looksmaxing scale",
  ],
  alternates: {
    canonical: "https://rizz-ai.space/looksmaxing/tips",
  },
  openGraph: {
    title: "Glow Up Tips & How to Glow Up Guide | Rizz AI",
    description:
      "Expert tips for a massive glow up. Learn how to looksmax your facial features and style.",
    url: "https://rizz-ai.space/looksmaxing/tips",
  },
};

export default function LooksmaxingTipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
