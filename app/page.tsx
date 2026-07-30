"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { Settings, Menu, ScanLine, MessageCircle, Sparkles, Plus } from "lucide-react";
import SplashScreen from "@/components/SplashScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useTheme } from "@/hooks/useTheme";
import { AppColors } from "@/constants/theme";

/* ─────────────────────────────────────────
   Settings / About bottom sheet
───────────────────────────────────────── */
function SettingsSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.45)",
          zIndex: 998,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transition: "opacity 0.3s ease",
          backdropFilter: isOpen ? "blur(2px)" : "none",
        }}
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: `translateX(-50%) translateY(${isOpen ? "0%" : "105%"})`,
          width: "100%",
          maxWidth: 480,
          zIndex: 999,
          transition: "transform 0.38s cubic-bezier(0.34, 1.26, 0.64, 1)",
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          overflow: "hidden",
          background: "linear-gradient(180deg, #FF6C6D 0%, #FF865A 50%, #F69C50 100%)",
          padding: "12px 24px 52px",
        }}
      >
        {/* Drag handle */}
        <div
          style={{
            width: 44,
            height: 4,
            borderRadius: 2,
            backgroundColor: "rgba(255,255,255,0.45)",
            margin: "0 auto 32px",
          }}
        />

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <a
            href="mailto:vijayj6372@gmail.com"
            id="settings-email"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: 999,
              padding: "17px 24px",
              fontSize: 16,
              fontWeight: 700,
              color: "#1a1a1a",
              textDecoration: "none",
              boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            Send us an Email
          </a>

          <a
            href="https://x.com/Vijay_Jadav_7"
            target="_blank"
            rel="noopener noreferrer"
            id="settings-about"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: 999,
              padding: "17px 24px",
              fontSize: 16,
              fontWeight: 700,
              color: "#1a1a1a",
              textDecoration: "none",
              boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            About me
          </a>
        </div>

        {/* Privacy Policy */}
        <div style={{ marginTop: 28, textAlign: "center" }}>
          <a
            href="https://sites.google.com/view/rizz-ai-privacy-policy-com/home"
            target="_blank"
            rel="noopener noreferrer"
            id="settings-privacy"
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.9)",
              textDecoration: "underline",
              fontWeight: 500,
              letterSpacing: 0.2,
            }}
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   Feature button icons (matching the photo)
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
   Feature button data
───────────────────────────────────────── */
const HOME_FEATURES = [
  {
    id: "upload-screenshot",
    href: "/upload-screenshot",
    icon: <ScanBracketIcon />,
    label: "Upload Screenshot\nof a Convo",
    ariaLabel: "Upload a conversation screenshot",
  },
  {
    id: "pickup-line",
    href: "/pickup-line",
    icon: <ChatBubbleIcon />,
    label: "Give me a pickup line",
    ariaLabel: "Get a pickup line",
  },
  {
    id: "looksmaxing",
    href: "/looksmaxing",
    icon: <FaceSparkleIcon />,
    label: "Looksmaxing",
    ariaLabel: "Looksmaxing tips",
  },
];

/* ─────────────────────────────────────────
   Home Page
───────────────────────────────────────── */
let globalSplashDone = false;

export default function HomePage() {
  const [splashDone, setSplashDone] = useState(globalSplashDone);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { isDark, theme } = useTheme();

  const handleSplashFinish = useCallback(() => {
    globalSplashDone = true;
    setSplashDone(true);
  }, []);

  const bg = "linear-gradient(180deg, #ABBFF2 0%, #BCCFFA 100%)";

  return (
    <>
      {!splashDone && <SplashScreen onFinish={handleSplashFinish} />}

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
              paddingTop: 80,
              paddingBottom: 40,
            }}
          >
            <HeaderTitle title="Rizz AI" fontSize={76} />
          </div>

          {/* ── Feature buttons ── */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[20px]">
            {HOME_FEATURES.map((feat) => (
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
                    borderRadius: 36,
                    height: 175,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    boxShadow: "0 6px 0px #D95657, 0 6px 14px rgba(217, 86, 87, 0.4)",
                    cursor: "pointer",
                    transition: "transform 0.16s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.16s",
                    userSelect: "none",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <div style={{ transform: "scale(1.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {feat.icon}
                  </div>
                  <p
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#FFFFFF",
                      margin: 0,
                      textAlign: "center",
                      lineHeight: 1.25,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {feat.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* ── Bottom Navigation Bar ── */}
          <div
            id="bottom-navbar"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.55)",
              borderRadius: 24,
              padding: "10px 14px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
              width: "100%",
              maxWidth: 420,
              margin: "32px auto 16px",
              gap: 8,
            }}
          >
            {/* 1) Home */}
            <Link
              href="/"
              id="nav-home"
              aria-label="Home"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: 16,
                backgroundColor: "rgba(255, 255, 255, 0.65)",
                fontSize: 24,
                textDecoration: "none",
                transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.15) translateY(-2px)";
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.65)";
              }}
            >
              🏠
            </Link>

            {/* 2) Love Test */}
            <Link
              href="/lovetest"
              id="nav-love-test"
              aria-label="Love Test"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: 16,
                fontSize: 24,
                textDecoration: "none",
                transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.15) translateY(-2px)";
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              ❤️
            </Link>

            {/* 3) Plus (Fun Features) */}
            <Link
              href="/fun-features"
              id="nav-fun-features"
              aria-label="Fun Features"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: 16,
                backgroundColor: "#F86B6D",
                color: "#FFFFFF",
                textDecoration: "none",
                transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: "0 4px 12px rgba(248, 107, 109, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.2) rotate(90deg)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(248, 107, 109, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(248, 107, 109, 0.3)";
              }}
            >
              <Plus size={24} color="#FFF" strokeWidth={3} />
            </Link>

            {/* 4) FireFun AI */}
            <Link
              href="/firefun"
              id="nav-firefun"
              aria-label="FireFun AI"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: 16,
                fontSize: 24,
                textDecoration: "none",
                transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.15) translateY(-2px)";
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              🔥
            </Link>

            {/* 5) Love Life (Marriage & Children Predictor) */}
            <Link
              href="/lovelife"
              id="nav-lovelife"
              aria-label="Love Life Predictor"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: 16,
                fontSize: 24,
                textDecoration: "none",
                transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.15) translateY(-2px)";
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              💋
            </Link>

            {/* 6) Couple Games */}
            <Link
              href="/couple-games"
              id="nav-couple-games"
              aria-label="Couple Games"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: 16,
                fontSize: 24,
                textDecoration: "none",
                transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.15) translateY(-2px)";
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              🎮
            </Link>
          </div>

          {/* ── Footer ── */}
          <p
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgba(17,24,28,0.4)",
              marginTop: "auto",
              paddingTop: 36,
            }}
          >
            Rizz AI © 2025 · Made with ❤️
          </p>
        </div>
      </main>

      <SettingsSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)} />
    </>
  );
}
