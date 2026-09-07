import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Rizz AI Free Dating Assistant Platform",
  description:
    "Read the Terms of Service for Rizz AI - your free AI dating assistant platform. Learn about our fair usage policy, intellectual property rights, and user agreement terms.",
  keywords: [
    "terms of service",
    "terms and conditions",
    "user agreement",
    "rizz ai terms",
    "dating app terms",
    "ai assistant terms",
    "privacy terms",
    "usage policy",
    "fair usage",
    "intellectual property",
  ],
  alternates: {
    canonical: "https://www.rizzai.space/terms",
  },
  openGraph: {
    title: "Terms of Service - Rizz AI Free Dating Assistant",
    description:
      "Read the Terms of Service for Rizz AI - your free AI dating assistant platform. Learn about our fair usage policy and user agreement terms.",
    url: "https://www.rizzai.space/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
