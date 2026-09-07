import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Would You Rather Questions for Couples - Rizz AI",
  description:
    "Play would-you-rather questions for couples and discover fun new things about each other.",
  alternates: {
    canonical:
      "https://www.rizzai.space/games/would-you-rather-for-couples",
  },
};

export default function WouldYouRatherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
