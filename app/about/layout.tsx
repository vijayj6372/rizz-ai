import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Rizz AI - Your Free AI Dating Assistant",
  description:
    "Learn about Rizz AI, a free AI dating assistant for pickup lines, conversation help, couple games, and relationship tools.",
  alternates: {
    canonical: "https://www.rizzai.space/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
