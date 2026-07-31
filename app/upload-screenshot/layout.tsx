import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Screenshot Analyzer & Rizz Reply Assistant — Rizz AI",
  description:
    "Upload chat screenshots from Tinder, Hinge, Bumble or Instagram to get perfect AI rizz replies and flirting suggestions.",
  keywords: [
    "rizz reply app",
    "ai wingman app",
    "free dating assitant",
    "rizz generator",
    "tinder",
    "hinge",
    "bumble",
  ],
  alternates: {
    canonical: "https://rizz-ai.space/upload-screenshot",
  },
};

export default function UploadScreenshotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
