import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Screenshot Analyzer & Rizz Reply Assistant — Free Rizz AI Chat",
  description:
    "Upload chat screenshots from Tinder, Hinge, Bumble or Instagram to get perfect Rizz AI responses, chat replies, and dating wingman suggestions.",
  keywords: [
    "Rizz AI screenshot",
    "Plug AI Rizz app",
    "RIZZ AI chat",
    "Rizz AI response",
    "Rizz AI dating assistant",
    "Smooth Rizz AI",
    "rizz reply app",
    "ai wingman app",
    "free dating assistant",
    "rizz generator",
    "tinder",
    "hinge",
    "bumble",
  ],
  alternates: {
    canonical: "https://www.rizzai.space/upload-screenshot",
  },
  openGraph: {
    title: "AI Screenshot Analyzer & Rizz Reply Assistant | Rizz AI",
    description:
      "Upload chat screenshots to generate instant smooth rizz replies and chat suggestions.",
    url: "https://www.rizzai.space/upload-screenshot",
  },
};

export default function UploadScreenshotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
