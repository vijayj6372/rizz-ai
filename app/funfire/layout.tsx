import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FunFire - Couple Games and Conversation Starters | Rizz AI",
  description:
    "Try FunFire for playful couple games, conversation starters, and fun relationship challenges.",
  alternates: {
    canonical: "https://www.rizzai.space/funfire",
  },
};

export default function FunFireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
