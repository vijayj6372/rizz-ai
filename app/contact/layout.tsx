import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Rizz AI",
  description:
    "Contact the Rizz AI team with questions, feedback, or support requests about our free AI dating tools.",
  alternates: {
    canonical: "https://www.rizzai.space/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
