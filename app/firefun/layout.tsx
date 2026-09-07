import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FireFun - Fun Dating Questions and Games | Rizz AI",
  description:
    "Play FireFun, a collection of fun dating questions and interactive relationship games from Rizz AI.",
  alternates: {
    canonical: "https://www.rizzai.space/firefun",
  },
};

export default function FireFunLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
