"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Camera, Heart, Sparkles, ShieldCheck } from "lucide-react";
import { HeaderTitle } from "@/components/HeaderTitle";

/* ─────────────────────────────────────────
   Feature card component
───────────────────────────────────────── */
interface FeatureCardProps {
  title: string;
  subtitle: string;
  desc: string;
  badge: string;
  glowColor: string;
  gradColors: [string, string];
  icon: React.ReactNode;
  href: string;
}

function FeatureCard({
  title,
  subtitle,
  desc,
  badge,
  glowColor,
  gradColors,
  icon,
  href,
}: FeatureCardProps) {
  return (
    <Link href={href} style={{ textDecoration: "none", display: "block", borderRadius: 22 }}>
      <div
        className="fun-card"
        style={{
          borderRadius: 22,
          border: `1.5px solid ${glowColor}60`,
          boxShadow: `0 8px 20px ${glowColor}44`,
          overflow: "hidden",
          transition: "transform 0.18s cubic-bezier(0.34,1.56,0.64,1), opacity 0.15s",
          cursor: "pointer",
        }}
      >
        {/* Dark gradient bg layer */}
        <div
          style={{
            background: "linear-gradient(135deg, #1C0E30 0%, #100820 100%)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 18,
            paddingBottom: 18,
            paddingRight: 16,
            gap: 14,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Color tint overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: `${glowColor}0D`,
              pointerEvents: "none",
            }}
          />

          {/* Left accent bar */}
          <div
            style={{
              width: 5,
              minHeight: 70,
              alignSelf: "stretch",
              backgroundColor: glowColor,
              borderTopRightRadius: 3,
              borderBottomRightRadius: 3,
              flexShrink: 0,
            }}
          />

          {/* Icon */}
          <div
            style={{
              width: 66,
              height: 66,
              borderRadius: 20,
              backgroundColor: `${glowColor}22`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: `linear-gradient(135deg, ${gradColors[0]} 0%, ${gradColors[1]} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.45)",
              }}
            >
              {icon}
            </div>
          </div>

          {/* Text block */}
          <div style={{ flex: 1, position: "relative", zIndex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: glowColor,
                margin: 0,
                letterSpacing: 0.1,
                lineHeight: "24px",
              }}
            >
              {title}
            </p>
            <p
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: `${glowColor}BB`,
                margin: "3px 0 0",
                letterSpacing: 1,
              }}
            >
              {subtitle}
            </p>
            <p
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.42)",
                fontWeight: 500,
                lineHeight: "17px",
                margin: "4px 0 0",
              }}
            >
              {desc}
            </p>
          </div>

          {/* Right: badge + chevron */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              minWidth: 36,
              flexShrink: 0,
              position: "relative",
              zIndex: 1,
            }}
          >
            <span style={{ fontSize: 16, lineHeight: "20px" }}>{badge}</span>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: `linear-gradient(135deg, ${gradColors[0]} 0%, ${gradColors[1]} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronRight size={17} color="#fff" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────
   Feature data (matching source code)
───────────────────────────────────────── */
const features: FeatureCardProps[] = [
  {
    title: "Roast My Selfie",
    subtitle: "SAVAGE MODE · NO MERCY",
    desc: "Upload a photo and get brutally honest AI feedback",
    badge: "🔥🔥🔥",
    glowColor: "#FF6B35",
    gradColors: ["#FF8C42", "#FF4500"],
    icon: <Camera size={32} color="#fff" />,
    href: "/roast-my-selfie",
  },
  {
    title: "Rate My Crush",
    subtitle: "HONEST RATING · 1–10",
    desc: "Find out exactly how attractive they really are",
    badge: "💕💕",
    glowColor: "#E040A0",
    gradColors: ["#F06292", "#C2185B"],
    icon: <Heart size={32} color="#fff" />,
    href: "/rate-my-crush",
  },
  {
    title: "Hot or Not",
    subtitle: "COMPARE 2 PICS · WHO WINS?",
    desc: "Head-to-head battle — only one can win",
    badge: "⭐⭐",
    glowColor: "#D4A800",
    gradColors: ["#FFD740", "#F9A825"],
    icon: (
      <span
        style={{
          fontSize: 22,
          fontWeight: 900,
          color: "#fff",
          letterSpacing: -0.5,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        VS
      </span>
    ),
    href: "/hot-or-not",
  },
  {
    title: "Looksmaxing Tips",
    subtitle: "GLOW-UP GUIDE · LEVEL UP FAST",
    desc: "200+ science-backed tips to maximize your looks",
    badge: "✨✨",
    glowColor: "#00CFA8",
    gradColors: ["#26D0CE", "#1A2980"],
    icon: <Sparkles size={32} color="#fff" />,
    href: "/looksmaxing/tips",
  },
];

/* ─────────────────────────────────────────
   Fun Features Page
───────────────────────────────────────── */
export default function FunFeaturesPage() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "linear-gradient(180deg, #08021A 0%, #0E0622 50%, #130929 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 80,
          left: -60,
          width: 220,
          height: 220,
          borderRadius: "50%",
          backgroundColor: "#E040A020",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 320,
          right: -80,
          width: 200,
          height: 200,
          borderRadius: "50%",
          backgroundColor: "#FF6B3518",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content container */}
      <div
        className="w-full max-w-[480px] md:max-w-[960px]"
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── Header ── */}
        <header
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 18px 10px",
          }}
        >
          <button
            onClick={() => router.push("/")}
            id="fun-back-btn"
            aria-label="Go back"
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background-color 0.15s",
            }}
          >
            <ChevronLeft size={22} color="#fff" />
          </button>

          <HeaderTitle title="Rizz AI" fontSize={24} />

          {/* Spacer for centering */}
          <div style={{ width: 44 }} aria-hidden="true" />
        </header>

        {/* ── Scrollable content ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            padding: "4px 16px 60px",
          }}
        >
          {/* Hero card */}
          <div
            style={{
              borderRadius: 22,
              border: "1px solid rgba(180,100,255,0.22)",
              padding: "16px",
              overflow: "hidden",
              background: "linear-gradient(135deg, #2A1050 0%, #1A0838 100%)",
              boxShadow: "0 6px 14px rgba(123,47,190,0.35)",
              position: "relative",
            }}
          >
            {/* Top accent line */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 1.5,
                backgroundColor: "rgba(224,64,160,0.5)",
              }}
            />

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 13 }}>
              {/* Robot icon */}
              <div
                aria-hidden="true"
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 16,
                  backgroundColor: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 28 }}>🤖</span>
              </div>

              <div style={{ flex: 1 }}>
                <p
                  style={{ color: "#fff", fontWeight: 800, fontSize: 16, margin: 0, lineHeight: 1.3 }}
                >
                  Your AI judge is ready.
                </p>
                <p
                  style={{
                    color: "#E040A0",
                    fontWeight: 700,
                    fontSize: 13,
                    margin: "4px 0 0",
                    lineHeight: 1.3,
                  }}
                >
                  Pick a mode and let it rip 😈
                </p>
              </div>

              {/* LIVE badge */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 5,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 9,
                    backgroundColor: "rgba(0,255,136,0.15)",
                    border: "1px solid rgba(0,255,136,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#00FF88",
                    }}
                  />
                </div>
                <p
                  style={{
                    color: "#00FF88",
                    fontSize: 9,
                    fontWeight: 900,
                    letterSpacing: 1,
                    margin: 0,
                  }}
                >
                  LIVE
                </p>
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "10px 0",
            }}
          >
            <ShieldCheck size={13} color="rgba(255,255,255,0.2)" aria-hidden="true" />
            <p
              style={{
                color: "rgba(255,255,255,0.2)",
                fontSize: 11,
                fontWeight: 500,
                margin: 0,
              }}
            >
              100% offline · no data sent · instant results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
