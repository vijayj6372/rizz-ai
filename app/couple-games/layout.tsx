import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Couple Games to Play Online — Couple Game Questions & Quizzes",
  description:
    "Play free online games for couples! Explore fun couple game questions, icebreakers, relationship card games, and game of questions for couples.",
  keywords: [
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
  ],
  alternates: {
    canonical: "https://www.rizzai.space/couple-games",
  },
  openGraph: {
    title: "Free Online Games for Couples | Rizz AI",
    description:
      "Play top couple games online with interactive questions, relationship icebreakers, and couple quizzes.",
    url: "https://www.rizzai.space/couple-games",
  },
};

export default function CoupleGamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
