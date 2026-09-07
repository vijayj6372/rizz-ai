import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fun Features - Rizz AI Dating Tools",
  description:
    "Explore Rizz AI's free fun features for dating, flirting, relationship games, and conversation ideas.",
  alternates: {
    canonical: "https://www.rizzai.space/fun-features",
  },
};

export default function FunFeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
