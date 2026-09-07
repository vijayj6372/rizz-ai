import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Icebreaker Questions for Couples - Rizz AI",
  description:
    "Use these fun icebreaker questions for couples to start meaningful conversations and get closer together.",
  alternates: {
    canonical:
      "https://www.rizzai.space/games/ice-breaker-questions-for-couples",
  },
};

export default function IcebreakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
