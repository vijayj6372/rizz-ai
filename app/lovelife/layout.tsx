import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LoveLife Calculator - Marriage & Children Prediction Compatibility Test",
  description:
    "Test your relationship compatibility with our LoveLife Calculator! Predict marriage dates, future children, and analyze chemistry between couples with our free love compatibility test.",
  keywords: [
    "love life calculator",
    "marriage prediction",
    "children prediction",
    "couple compatibility test",
    "relationship compatibility",
    "love compatibility calculator",
    "marriage date prediction",
    "future children prediction",
    "couple goals",
    "love match",
    "relationship test",
    "compatibility score",
    "love percentage",
    "marriage forecast",
    "family prediction",
  ],
  alternates: {
    canonical: "https://www.rizzai.space/lovelife",
  },
  openGraph: {
    title: "LoveLife Calculator - Marriage & Children Prediction | Rizz AI",
    description:
      "Test your relationship compatibility! Predict marriage dates, future children, and analyze chemistry between couples with our free love compatibility test.",
    url: "https://www.rizzai.space/lovelife",
  },
};

export default function LoveLifeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
