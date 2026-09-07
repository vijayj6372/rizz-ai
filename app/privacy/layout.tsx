import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Rizz AI",
  description:
    "Read the Rizz AI privacy policy to learn how information is handled when you use our free dating and relationship tools.",
  alternates: {
    canonical: "https://www.rizzai.space/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
