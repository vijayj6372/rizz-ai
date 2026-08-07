"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  MessageSquare,
  Flame,
  Zap,
  ChevronDown,
  ShieldCheck,
  Smartphone,
  Star,
  Compass,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "What is Rizz AI and how does this AI Dating App work?",
    a: "Rizz AI (rizzai.space) is the #1 free AI dating app and AI wingman designed to level up your dating game. Powered by advanced Rizz GPT intelligence, it crafts witty chat responses, generates clever pickup lines for Tinder, Hinge, and Bumble, provides instant PSL looksmaxing face ratings, and offers interactive couple games.",
  },
  {
    q: "Is the Rizz App 100% free online without download?",
    a: "Yes! Rizz AI is a 100% free rizz app online that works directly in any web browser on your phone or desktop. There are no subscriptions, paywalls, or app store downloads required to start generating irresistible rizz lines or analyzing conversations.",
  },
  {
    q: "How does the AI Dating Chatbot help with Tinder, Hinge, and Bumble?",
    a: "Our AI dating chatbot and screenshot analyzer analyzes your match's bio, photos, and conversation history. In seconds, it suggests flirty openers, hilarious comebacks, or romantic responses tailored to your chosen tone (smooth, bold, witty, or spicy).",
  },
  {
    q: "What is Looksmaxing AI and PSL Scale Face Rating?",
    a: "Looksmaxing AI uses facial geometry analysis to calculate facial symmetry, canthal tilt, jawline definition, and overall aesthetic harmony on the PSL scale. It provides personalized, actionable grooming and style tips to help you maximize your attractiveness.",
  },
  {
    q: "Can I use Rizz AI from my Instagram bio link?",
    a: "Absolutely! Rizz AI is optimized for all mobile browsers and social media in-app browsers like Instagram, TikTok, and Facebook. You can easily click links, generate lines, take selfies, and upload screenshots on the go.",
  },
];

const SEO_HIGHLIGHTS = [
  {
    icon: <Sparkles size={20} color="#F86B6D" />,
    title: "AI Rizz & Rizz GPT",
    desc: "Generate irresistible pickup lines & smooth replies powered by cutting-edge dating AI models.",
    href: "/pickup-line",
  },
  {
    icon: <MessageSquare size={20} color="#F86B6D" />,
    title: "AI Dating Chatbot",
    desc: "Upload chat screenshots from Tinder, Bumble, or Hinge for witty context-aware responses.",
    href: "/upload-screenshot",
  },
  {
    icon: <Flame size={20} color="#F86B6D" />,
    title: "Looksmaxing AI Rating",
    desc: "Instant PSL scale face rating, eye shape analysis & personalized glow-up roadmaps.",
    href: "/looksmaxing",
  },
  {
    icon: <Compass size={20} color="#F86B6D" />,
    title: "Fun Dating & Couple Games",
    desc: "Deep couple questions, Roast My Selfie, Rate My Crush & compatibility tests.",
    href: "/fun-features",
  },
];

export function HomeSeoSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section
      aria-label="Rizz AI Features and Overview"
      className="w-full text-slate-800"
      style={{
        marginTop: 24,
        marginBottom: 36,
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* ── SEO Hero Summary Card ── */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(12px)",
          borderRadius: 28,
          padding: "24px 20px",
          border: "1.5px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span
            style={{
              background: "#F86B6D",
              color: "#FFFFFF",
              fontSize: 11,
              fontWeight: 800,
              padding: "3px 10px",
              borderRadius: 999,
              textTransform: "uppercase",
              letterSpacing: 0.8,
            }}
          >
            #1 Dating AI
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} fill="#FFA726" color="#FFA726" />
            ))}
            <span style={{ fontSize: 12, fontWeight: 700, color: "#555", marginLeft: 4 }}>
              4.9 (14k+ reviews)
            </span>
          </div>
        </div>

        <h1
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: "#1F1A3A",
            lineHeight: 1.3,
            margin: "0 0 10px 0",
          }}
        >
          Rizz AI — The #1 Free AI Dating App & Dating AI Wingman
        </h1>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: "#3F3D56",
            margin: 0,
          }}
        >
          Welcome to <strong>Rizz AI</strong> (<em>rizzai.space</em>), the ultimate free{" "}
          <strong>rizz app online</strong> designed to elevate your dating life. Whether you need an{" "}
          <strong>AI dating chatbot</strong> to reply to matches on Tinder, Hinge, or Bumble, instant{" "}
          <strong>AI rizz</strong> pickup lines from our <strong>Rizz GPT</strong> engine, or an in-depth{" "}
          <strong>looksmaxing face rating</strong>, Rizz AI gives you every tool to spark chemistry and leave an unforgettable impression.
        </p>

        {/* Feature Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          style={{ marginTop: 18 }}
        >
          {SEO_HIGHLIGHTS.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "14px 14px",
                borderRadius: 18,
                background: "rgba(255, 255, 255, 0.9)",
                border: "1px solid rgba(248, 107, 109, 0.15)",
                textDecoration: "none",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              className="hover:scale-[1.02] active:scale-[0.98]"
            >
              <div
                style={{
                  background: "#FFF0F0",
                  padding: 8,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: "#1F1A3A",
                    margin: "0 0 2px 0",
                  }}
                >
                  {item.title}
                </h2>
                <p
                  style={{
                    fontSize: 12,
                    lineHeight: 1.4,
                    color: "#5C5A6F",
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Why Choose Rizz AI Card ── */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(12px)",
          borderRadius: 28,
          padding: "24px 20px",
          border: "1.5px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h2
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#1F1A3A",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Zap size={20} color="#F86B6D" />
          Why Rizz AI is the Best Free Rizz App Online
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <ShieldCheck size={18} color="#F86B6D" style={{ marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: "#3F3D56", margin: 0, lineHeight: 1.5 }}>
              <strong>100% Free & No Sign-Up</strong>: Enjoy unlimited access to all AI rizz generators, pickup lines, and dating tools without paywalls.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <Smartphone size={18} color="#F86B6D" style={{ marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: "#3F3D56", margin: 0, lineHeight: 1.5 }}>
              <strong>Mobile & Instagram Ready</strong>: Fast, responsive web app optimized for mobile users, TikTok, and Instagram bio links.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <Flame size={18} color="#F86B6D" style={{ marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: "#3F3D56", margin: 0, lineHeight: 1.5 }}>
              <strong>High Conversion Rizz GPT</strong>: Proven conversation starters and charismatic responses tailored to make you stand out on dating apps.
            </p>
          </div>
        </div>
      </div>

      {/* ── Interactive FAQ Accordion ── */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(12px)",
          borderRadius: 28,
          padding: "24px 20px",
          border: "1.5px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h2
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#1F1A3A",
            marginBottom: 16,
          }}
        >
          Frequently Asked Questions
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                style={{
                  borderRadius: 16,
                  background: isOpen ? "#FFFFFF" : "rgba(255, 255, 255, 0.85)",
                  border: "1px solid rgba(248, 107, 109, 0.15)",
                  overflow: "hidden",
                  transition: "background 0.2s ease, box-shadow 0.2s ease",
                  boxShadow: isOpen ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  aria-expanded={isOpen}
                  id={`faq-btn-${index}`}
                >
                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1F1A3A",
                      margin: 0,
                      paddingRight: 10,
                    }}
                  >
                    {faq.q}
                  </h3>
                  <ChevronDown
                    size={18}
                    color="#F86B6D"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                      flexShrink: 0,
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 16px 14px 16px",
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "#4A485F",
                      animation: "fadeIn 0.2s ease",
                    }}
                  >
                    <p style={{ margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
