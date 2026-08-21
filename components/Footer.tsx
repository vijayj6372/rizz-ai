"use client";

import React from "react";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";

interface FooterProps {
  variant?: "light" | "dark";
  currentPath?: string;
  showInlineNav?: boolean;
}

export function Footer({
  variant = "light",
  currentPath = "/",
  showInlineNav = true,
}: FooterProps) {
  const isDark = variant === "dark";

  return (
    <footer
      style={{
        width: "100%",
        marginTop: "auto",
        paddingTop: 36,
        paddingBottom: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      {/* ── 1. Bottom Navigation Bar before footer ruler ── */}
      {showInlineNav && (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 12, marginBottom: 24 }}>
          <BottomNav currentPath={currentPath} variant={variant} inline />
        </div>
      )}

      {/* ── 2. Footer Ruler (Gradient Divider) ── */}
      <div
        style={{
          width: "100%",
          maxWidth: 640,
          height: 2,
          borderRadius: 999,
          background: isDark
            ? "linear-gradient(90deg, rgba(244, 63, 94, 0) 0%, rgba(244, 63, 94, 0.6) 25%, rgba(168, 85, 247, 0.7) 50%, rgba(99, 102, 241, 0.6) 75%, rgba(99, 102, 241, 0) 100%)"
            : "linear-gradient(90deg, rgba(248, 107, 109, 0) 0%, rgba(248, 107, 109, 0.6) 25%, rgba(168, 85, 247, 0.7) 50%, rgba(99, 102, 241, 0.6) 75%, rgba(99, 102, 241, 0) 100%)",
          boxShadow: isDark
            ? "0 0 12px rgba(244, 63, 94, 0.3)"
            : "0 0 12px rgba(248, 107, 109, 0.25)",
          margin: "6px auto 16px",
        }}
      />

      {/* ── 3. SEO Keyword & FAQ Section (AFTER FOOTER RULER) ── */}
      <section
        aria-label="Rizz AI Features and FAQ"
        style={{
          width: "100%",
          maxWidth: 640,
          padding: "24px 20px",
          backgroundColor: isDark ? "rgba(30, 30, 46, 0.7)" : "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
          borderRadius: 24,
          border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 108, 109, 0.2)",
          color: isDark ? "#E2E8F0" : "#1E293B",
          boxShadow: isDark ? "0 8px 24px rgba(0,0,0,0.3)" : "0 8px 24px rgba(0, 0, 0, 0.04)",
          textAlign: "left",
          margin: "0 auto 12px",
        }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: isDark ? "#FB7185" : "#E11D48",
            marginBottom: 10,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Rizz AI — #1 Free AI Wingman App, Rizz Generator & Dating Assistant
        </h2>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: isDark ? "#94A3B8" : "#475569", marginBottom: 18, textAlign: "center" }}>
          Welcome to <strong>Rizz AI</strong> (<code>rizzai.space</code>) — the ultimate <strong>free AI wingman app</strong>, <strong>rizz generator</strong>, and dating reply assistant. Whether you are looking for <strong>flirting pick up lines</strong> for Tinder, Hinge, or Bumble, instant <strong>looksmaxing AI face ratings</strong> on the <strong>PSL scale</strong>, or <strong>free couple games to play online</strong>, Rizz AI gives you the confidence to level up your dating game.
        </p>

        <h2 style={{ fontSize: 18, fontWeight: 800, color: isDark ? "#F8FAFC" : "#0F172A", marginTop: 20, marginBottom: 10 }}>
          Why Choose Rizz AI App?
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          <div style={{ padding: 12, background: isDark ? "rgba(255,255,255,0.04)" : "#FFF5F5", borderRadius: 14, border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #FFE4E6" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: isDark ? "#FB7185" : "#E11D48", margin: "0 0 4px" }}>🌶️ Smooth Rizz Lines Generator</h3>
            <p style={{ fontSize: 12.5, color: isDark ? "#94A3B8" : "#64748B", margin: 0, lineHeight: 1.45 }}>
              Get the <strong>best pick up lines</strong>, <strong>funny pick up lines</strong>, <strong>cheesy pick up lines</strong>, and <strong>corny pick up lines for guys</strong> with our custom chili heat slider.
            </p>
          </div>
          <div style={{ padding: 12, background: isDark ? "rgba(255,255,255,0.04)" : "#F0FDF4", borderRadius: 14, border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #DCFCE7" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: isDark ? "#4ADE80" : "#16A34A", margin: "0 0 4px" }}>🗿 Looksmaxing AI & PSL Scale</h3>
            <p style={{ fontSize: 12.5, color: isDark ? "#94A3B8" : "#64748B", margin: 0, lineHeight: 1.45 }}>
              Instant <strong>face attractiveness test</strong> and <strong>looksmax scale app</strong> rating with actionable <strong>glow up tips</strong> on <strong>how to looksmax</strong> and improve facial aesthetics.
            </p>
          </div>
          <div style={{ padding: 12, background: isDark ? "rgba(255,255,255,0.04)" : "#EFF6FF", borderRadius: 14, border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #DBEAFE" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: isDark ? "#60A5FA" : "#2563EB", margin: "0 0 4px" }}>❤️ Online Couple Games & Love Test</h3>
            <p style={{ fontSize: 12.5, color: isDark ? "#94A3B8" : "#64748B", margin: 0, lineHeight: 1.45 }}>
              Play <strong>free couple games online</strong>, answer deep <strong>couple game questions</strong>, test <strong>name compatibility quiz</strong> scores, and enjoy <strong>Hot or Not photo rater</strong>.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: isDark ? "#F8FAFC" : "#0F172A", marginTop: 24, marginBottom: 12 }}>
          Frequently Asked Questions (FAQ)
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <details style={{ padding: 10, backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#F8FAFC", borderRadius: 12, border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0" }}>
            <summary style={{ fontWeight: 700, cursor: "pointer", color: isDark ? "#F1F5F9" : "#1E293B", fontSize: 13.5 }}>
              What is Rizz AI and how does the AI Wingman app work?
            </summary>
            <p style={{ fontSize: 13, color: isDark ? "#94A3B8" : "#475569", marginTop: 6, margin: 0, lineHeight: 1.5 }}>
              Rizz AI is a free AI-powered wingman app (rizzai.space) designed to help you craft irresistible chat replies, generate pickup lines for Tinder, Hinge, or Bumble, and analyze facial attractiveness with AI looksmaxing ratings.
            </p>
          </details>

          <details style={{ padding: 10, backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#F8FAFC", borderRadius: 12, border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0" }}>
            <summary style={{ fontWeight: 700, cursor: "pointer", color: isDark ? "#F1F5F9" : "#1E293B", fontSize: 13.5 }}>
              Is Rizz AI free to use?
            </summary>
            <p style={{ fontSize: 13, color: isDark ? "#94A3B8" : "#475569", marginTop: 6, margin: 0, lineHeight: 1.5 }}>
              Yes! Rizz AI is 100% free with no login required. You can generate unlimited rizz lines, test face ratings on the PSL scale, play couple games, and roast selfies anytime online.
            </p>
          </details>

          <details style={{ padding: 10, backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#F8FAFC", borderRadius: 12, border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0" }}>
            <summary style={{ fontWeight: 700, cursor: "pointer", color: isDark ? "#F1F5F9" : "#1E293B", fontSize: 13.5 }}>
              How do I get a glow up and increase my PSL scale rating?
            </summary>
            <p style={{ fontSize: 13, color: isDark ? "#94A3B8" : "#475569", marginTop: 6, margin: 0, lineHeight: 1.5 }}>
              Our Looksmaxing AI tool analyzes face symmetry, jawline definition, and hair aesthetics, providing step-by-step glow up tips, skincare advice, and grooming strategies to help you looksmax effectively.
            </p>
          </details>
        </div>
      </section>

      {/* ── 4. Links: About • Contact • Privacy Policy • Terms of Service ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          flexWrap: "wrap",
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        <Link
          href="/about"
          style={{
            color: isDark ? "#FB7185" : "#E11D48",
            textDecoration: "none",
            padding: "4px 8px",
            borderRadius: 8,
            transition: "all 0.2s",
          }}
        >
          About
        </Link>
        <span style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(17,24,28,0.25)", fontSize: 16 }}>•</span>
        <Link
          href="/contact"
          style={{
            color: isDark ? "#FB7185" : "#E11D48",
            textDecoration: "none",
            padding: "4px 8px",
            borderRadius: 8,
            transition: "all 0.2s",
          }}
        >
          Contact
        </Link>
        <span style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(17,24,28,0.25)", fontSize: 16 }}>•</span>
        <Link
          href="/privacy"
          style={{
            color: isDark ? "#FB7185" : "#E11D48",
            textDecoration: "none",
            padding: "4px 8px",
            borderRadius: 8,
            transition: "all 0.2s",
          }}
        >
          Privacy Policy
        </Link>
        <span style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(17,24,28,0.25)", fontSize: 16 }}>•</span>
        <Link
          href="/terms"
          style={{
            color: isDark ? "#FB7185" : "#E11D48",
            textDecoration: "none",
            padding: "4px 8px",
            borderRadius: 8,
            transition: "all 0.2s",
          }}
        >
          Terms of Service
        </Link>
      </div>

      {/* ── 5. Main Feature Quick Links (SEO Interlinking) ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          flexWrap: "wrap",
          fontSize: 13,
          fontWeight: 600,
          opacity: 0.85,
          maxWidth: 600,
          textAlign: "center",
        }}
      >
        <Link href="/pickup-line" style={{ color: isDark ? "#E2E8F0" : "#475569", textDecoration: "none" }}>
          Pickup Lines & Rizz Lines
        </Link>
        <span>•</span>
        <Link href="/looksmaxing" style={{ color: isDark ? "#E2E8F0" : "#475569", textDecoration: "none" }}>
          Looksmaxing AI Rating
        </Link>
        <span>•</span>
        <Link href="/couple-games" style={{ color: isDark ? "#E2E8F0" : "#475569", textDecoration: "none" }}>
          Online Couple Games
        </Link>
        <span>•</span>
        <Link href="/hot-or-not" style={{ color: isDark ? "#E2E8F0" : "#475569", textDecoration: "none" }}>
          Hot or Not Photo Rater
        </Link>
        <span>•</span>
        <Link href="/lovetest" style={{ color: isDark ? "#E2E8F0" : "#475569", textDecoration: "none" }}>
          Love Test Calculator
        </Link>
      </div>

      {/* ── 6. Copyright line ── */}
      <p
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: isDark ? "rgba(226, 232, 240, 0.5)" : "rgba(17,24,28,0.6)",
          margin: 0,
          letterSpacing: "-0.01em",
        }}
      >
        Rizz AI © 2026 · rizzai.space · Free AI Wingman App
      </p>
    </footer>
  );
}
