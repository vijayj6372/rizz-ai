import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hot or Not Website — Rate My BF, Rate My GF & Roast My Ex",
  description:
    "Play Hot or Not online! The legendary hot or not website where you can rate photos, rate my bf, rate my gf, and roast my ex with AI rating scores.",
  keywords: [
    "hot or not hot",
    "hot or not website",
    "hot and not",
    "roast my ex",
    "roast me",
    "rate my bf",
    "rate my gf",
    "hotornot",
    "hot or not site",
  ],
  alternates: {
    canonical: "https://www.rizzai.space/hot-or-not",
  },
  openGraph: {
    title: "Hot or Not Website & Photo Rater | Rizz AI",
    description:
      "Play Hot or Not online! Get AI ratings for photos, rate your crush, or roast your ex.",
    url: "https://www.rizzai.space/hot-or-not",
  },
};

export default function HotOrNotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
