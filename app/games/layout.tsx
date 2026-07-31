import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Games for Couples & Icebreaker Questions | Rizz AI",
  description:
    "Fun online games for couples, icebreaker questions, coup card game challenges, and deep relationship games.",
  keywords: [
    "couples game",
    "couple games",
    "couples games",
    "couple game questions",
    "coup card game",
    "game of questions for couples",
    "Online Games for Couples",
  ],
  alternates: {
    canonical: "https://rizz-ai.space/games",
  },
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
