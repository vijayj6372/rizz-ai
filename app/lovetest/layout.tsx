import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Love Test by Name & Love Match Compatibility Quiz | Rizz AI",
  description:
    "Take the free love test name calculator! Calculate love match test compatibility, name compatibility quiz score, and test love meter percentage.",
  keywords: [
    "love test name",
    "love match test",
    "name compatibility quiz",
    "love meter",
    "love calculator names",
  ],
  alternates: {
    canonical: "https://rizz-ai.space/lovetest",
  },
  openGraph: {
    title: "Love Test by Name & Love Match Calculator | Rizz AI",
    description:
      "Test name compatibility percentage with AI love meter & match quiz.",
    url: "https://rizz-ai.space/lovetest",
  },
};

export default function LoveTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
