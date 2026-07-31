"use client";

import React, { use } from "react";
import IceBreakerGamePage from "../ice-breaker-questions-for-couples/page";
import WouldYouRatherCouplesPage from "../would-you-rather-for-couples/page";
import CoupleGamesPage from "@/app/couple-games/page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function GameSlugPage({ params }: PageProps) {
  const { slug } = use(params);

  if (slug === "ice-breaker-questions-for-couples" || slug.includes("icebreaker") || slug.includes("ice-breaker")) {
    return <IceBreakerGamePage />;
  }

  if (slug === "would-you-rather-for-couples" || slug.includes("would-you-rather") || slug.includes("wyr")) {
    return <WouldYouRatherCouplesPage />;
  }

  // Fallback to general games directory
  return <CoupleGamesPage />;
}
