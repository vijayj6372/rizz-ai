import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Pickup Lines & Rizz Lines Generator (Flirting, Funny, Cheesy)",
  description:
    "Generate smooth rizz lines, flirting pick up lines for Tinder, Hinge & Bumble, funny pick up lines, cheesy pick up lines, and cute pickup lines for guys & girls.",
  keywords: [
    "pick up lines",
    "rizz lines",
    "flirting pick up lines",
    "best pick up lines",
    "funny pick up lines",
    "cheesy pick up lines",
    "good pick up lines",
    "corny pick up lines",
    "rizz pick up lines",
    "rizz pickup lines",
    "pick up lines for guys",
    "cute pick up lines",
    "good rizz lines",
    "rizz up lines",
    "smooth rizz lines",
    "pick up lines funny",
    "pick up lines with rizz",
    "best pick up line",
    "pickup lines cute",
    "pick up lines for flirting",
    "adorable pick up lines",
    "chat up lines",
    "tinder",
    "hinge",
    "bumble",
    "parade",
    "theknot",
    "rizz generator",
  ],
  alternates: {
    canonical: "https://rizz-ai.space/pickup-line",
  },
  openGraph: {
    title: "Best Rizz Lines & Pickup Lines Generator | Rizz AI",
    description:
      "Instant AI generator for smooth rizz lines, flirty pick up lines, funny & cheesy pickup lines for dating apps.",
    url: "https://rizz-ai.space/pickup-line",
  },
};

export default function PickupLineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
