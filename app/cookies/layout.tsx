import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - Rizz AI",
  description:
    "Learn how Rizz AI uses browser storage and cookies to support essential app features and remember your preferences.",
  alternates: {
    canonical: "https://www.rizzai.space/cookies",
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
