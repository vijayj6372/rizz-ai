"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onFinish: () => void;
}

/**
 * Web port of SplashScreenView.
 * CSS keyframe animations replace react-native-reanimated shared values.
 * LinearGradient is replaced by a CSS linear-gradient background.
 */
export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "pulse" | "exit">("enter");

  useEffect(() => {
    // After logo pop-in (700ms), trigger glow pulse
    const pulseTimer = setTimeout(() => setPhase("pulse"), 700);
    // After glow pulse (1000ms in), start fade-out
    const exitTimer = setTimeout(() => setPhase("exit"), 1700);
    // After fade-out animation (500ms), call onFinish
    const finishTimer = setTimeout(() => onFinish(), 2200);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`splash-container splash-${phase}`}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        background: "linear-gradient(180deg, #0D0520 0%, #1A0A2E 50%, #2D1055 100%)",
      }}
    >
      {/* Radial glow */}
      <div className={`splash-glow ${phase === "pulse" ? "splash-glow--pulse" : ""}`} />

      {/* Logo */}
      <div className={`splash-logo splash-logo--${phase}`}>
        <Image
          src="/images/splash-logo.png"
          alt="Rizz AI"
          width={280}
          height={280}
          priority
          unoptimized
          style={{ objectFit: "contain", borderRadius: "22%", display: "block" }}
        />
      </div>
    </div>
  );
}
