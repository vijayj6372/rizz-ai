"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { Settings, Menu } from "lucide-react";
import SplashScreen from "@/components/SplashScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { HomeSeoSection } from "@/components/HomeSeoSection";
import { SettingsSheet } from "@/components/SettingsSheet";
import { useLanguage } from "@/context/LanguageContext";
import { TRANSLATIONS } from "@/data/translations";
import OnboardingFlow from "@/components/OnboardingFlow";
import { useTheme } from "@/hooks/useTheme";

/* ─────────────────────────────────────────
   Feature button icons
───────────────────────────────────────── */
function ScanBracketIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="12" height="4" rx="2.5" fill="white" opacity="0.95" />
      <rect x="31" y="5" width="12" height="4" rx="2.5" fill="white" opacity="0.95" />
      <rect x="5" y="5" width="4" height="12" rx="2.5" fill="white" opacity="0.95" />
      <rect x="39" y="5" width="4" height="12" rx="2.5" fill="white" opacity="0.95" />
      <rect x="5" y="39" width="12" height="4" rx="2.5" fill="white" opacity="0.95" />
      <rect x="31" y="39" width="12" height="4" rx="2.5" fill="white" opacity="0.95" />
      <rect x="5" y="31" width="4" height="12" rx="2.5" fill="white" opacity="0.95" />
      <rect x="39" y="31" width="4" height="12" rx="2.5" fill="white" opacity="0.95" />
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M8 12C8 9.8 9.8 8 12 8H36C38.2 8 40 9.8 40 12V28C40 30.2 38.2 32 36 32H26L18 40V32H12C9.8 32 8 30.2 8 28V12Z"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.95"
      />
    </svg>
  );
}

function FaceSparkleIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="13" stroke="white" strokeWidth="3" fill="none" opacity="0.95" />
      <path
        d="M18 28C18 28 20 32 24 32C28 32 30 28 30 28"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.95"
      />
      <circle cx="19" cy="22" r="2.2" fill="white" opacity="0.95" />
      <circle cx="29" cy="22" r="2.2" fill="white" opacity="0.95" />
      {/* Sparkle top-right */}
      <path
        d="M36 8 L37.5 11 L41 12.5 L37.5 14 L36 17 L34.5 14 L31 12.5 L34.5 11 Z"
        fill="white"
        opacity="0.85"
      />
      <path
        d="M40 4 L40.8 5.8 L42.5 6.5 L40.8 7.2 L40 9 L39.2 7.2 L37.5 6.5 L39.2 5.8 Z"
        fill="white"
        opacity="0.55"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Home Page
───────────────────────────────────────── */
let globalSplashDone = false;

export default function HomePage() {
  const [splashDone, setSplashDone] = useState(globalSplashDone);
  const [onboarded, setOnboarded] = useState<boolean | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { isDark, theme } = useTheme();
  const { language } = useLanguage();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  React.useEffect(() => {
    try {
      const isDone = localStorage.getItem("rizz_onboarded") === "true";
      setOnboarded(isDone);
    } catch {
      setOnboarded(true);
    }
  }, []);

  const handleSplashFinish = useCallback(() => {
    globalSplashDone = true;
    setSplashDone(true);
  }, []);

  const homeFeatures = [
    {
      id: "upload-screenshot",
      href: "/upload-screenshot",
      icon: <ScanBracketIcon />,
      label: t.uploadScreenshotTitle,
      ariaLabel: t.uploadScreenshotTitle,
    },
    {
      id: "pickup-line",
      href: "/pickup-line",
      icon: <ChatBubbleIcon />,
      label: t.pickupLineTitle,
      ariaLabel: t.pickupLineTitle,
    },
    {
      id: "looksmaxing",
      href: "/looksmaxing",
      icon: <FaceSparkleIcon />,
      label: t.looksmaxingTitle,
      ariaLabel: t.looksmaxingTitle,
    },
  ];

  const bg = "linear-gradient(180deg, #ABBFF2 0%, #BCCFFA 100%)";

  if (!splashDone) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (onboarded === false) {
    return <OnboardingFlow onComplete={() => setOnboarded(true)} />;
  }

  return (
    <>
      <main
        style={{
          minHeight: "100dvh",
          background: bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="w-full max-w-[420px] md:max-w-[900px]"
          style={{
            padding: "env(safe-area-inset-top, 16px) 20px env(safe-area-inset-bottom, 32px)",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: "100dvh",
          }}
        >
          {/* ── Top bar ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 16,
              paddingBottom: 4,
            }}
          >
            <button
              onClick={() => setSheetOpen(true)}
              id="btn-settings"
              aria-label="Settings"
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                backgroundColor: "#F86B6D",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 0px #D95657, 0 4px 10px rgba(217, 86, 87, 0.3)",
                flexShrink: 0,
              }}
            >
              <Settings size={22} color="#FFFFFF" strokeWidth={2.2} />
            </button>

            <Link
              href="/fun-features"
              id="btn-menu"
              aria-label="Menu"
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                backgroundColor: "#F86B6D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 0px #D95657, 0 4px 10px rgba(217, 86, 87, 0.3)",
                flexShrink: 0,
                textDecoration: "none",
              }}
            >
              <Menu size={22} color="#FFFFFF" strokeWidth={2.2} />
            </Link>
          </div>

          {/* ── Title ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 36,
              paddingBottom: 28,
            }}
          >
            <HeaderTitle title="Rizz AI" fontSize={70} />
          </div>

          {/* ── Feature buttons ── */}
          <div
            className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6"
            style={{ marginTop: 28, marginBottom: 40 }}
          >
            {homeFeatures.map((feat) => (
              <Link
                key={feat.id}
                href={feat.href}
                id={`home-btn-${feat.id}`}
                aria-label={feat.ariaLabel}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  className="home-feature-btn"
                  style={{
                    backgroundColor: "#F86B6D",
                    borderRadius: 32,
                    height: 152,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    boxShadow: "0 6px 0px #D95657, 0 6px 14px rgba(217, 86, 87, 0.4)",
                    cursor: "pointer",
                    transition: "transform 0.16s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.16s",
                    userSelect: "none",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <div style={{ transform: "scale(1.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {feat.icon}
                  </div>
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: "#FFFFFF",
                      margin: 0,
                      textAlign: "center",
                      lineHeight: 1.2,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {feat.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* ── Bottom Navigation Bar (placed on top of #1 Dating AI SEO Card) ── */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <BottomNav currentPath="/" variant="light" inline />
          </div>

          {/* ── SEO Rich Content & FAQ Accordion (#1 Dating AI textbox) ── */}
          <HomeSeoSection />

          {/* ── Professional Footer ── */}
          <Footer variant="light" currentPath="/" showInlineNav={false} />
        </div>
      </main>

      <SettingsSheet isOpen={sheetOpen} onCloseAction={() => setSheetOpen(false)} />
    </>
  );
}
