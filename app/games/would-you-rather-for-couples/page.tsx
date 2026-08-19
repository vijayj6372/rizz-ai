"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import {
  Heart,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  Shuffle,
  ArrowRight,
} from "lucide-react";

/* ──────────────────────────────────────────────
   WYR DILEMMAS DATA (40 COUPLE DILEMMAS)
────────────────────────────────────────────── */
interface Dilemma {
  id: number;
  optionA: string;
  optionB: string;
  pctA: number;
  pctB: number;
}

const WYR_DILEMMAS: Dilemma[] = [
  { id: 1, optionA: "Live in a cabin in the mountains", optionB: "Live in a beach house by the ocean", pctA: 48, pctB: 52 },
  { id: 2, optionA: "Always have to say what's on your mind", optionB: "Never be able to speak again", pctA: 78, pctB: 22 },
  { id: 3, optionA: "Cook dinner together every night", optionB: "Go out to eat every night", pctA: 64, pctB: 36 },
  { id: 4, optionA: "Relive your first date forever", optionB: "Fast-forward to your 50th anniversary", pctA: 71, pctB: 29 },
  { id: 5, optionA: "Have a personal chef for life", optionB: "Have a personal masseuse for life", pctA: 55, pctB: 45 },
  { id: 6, optionA: "Know all your partner's thoughts", optionB: "Have your partner know all your thoughts", pctA: 38, pctB: 62 },
  { id: 7, optionA: "Travel the world for a year together", optionB: "Buy your dream home together", pctA: 68, pctB: 32 },
  { id: 8, optionA: "Always be 10 minutes early", optionB: "Always be fashionably late", pctA: 59, pctB: 41 },
  { id: 9, optionA: "Take a cross-country road trip", optionB: "Take a luxury island cruise", pctA: 45, pctB: 55 },
  { id: 10, optionA: "Never use social media again", optionB: "Never watch movies or TV again", pctA: 82, pctB: 18 },
  { id: 11, optionA: "Spend a weekend camping in nature", optionB: "Spend a weekend at a 5-star spa resort", pctA: 35, pctB: 65 },
  { id: 12, optionA: "Wake up at 5 AM together every day", optionB: "Stay up until 3 AM together every night", pctA: 42, pctB: 58 },
  { id: 13, optionA: "Get matching subtle tattoos", optionB: "Wear matching outfits on dates", pctA: 63, pctB: 37 },
  { id: 14, optionA: "Adopt 3 adorable pets", optionB: "Travel to 3 new countries each year", pctA: 49, pctB: 51 },
  { id: 15, optionA: "Have unlimited free gourmet coffee", optionB: "Have unlimited free plane tickets", pctA: 31, pctB: 69 },
  { id: 16, optionA: "Be able to read each other's mind", optionB: "Be able to feel each other's emotions", pctA: 52, pctB: 48 },
  { id: 17, optionA: "Win a couple's dancing competition", optionB: "Win a couple's cooking competition", pctA: 41, pctB: 59 },
  { id: 18, optionA: "Live in a bustling downtown city apartment", optionB: "Live in a quiet countryside cottage", pctA: 38, pctB: 62 },
  { id: 19, optionA: "Have a cozy movie night at home", optionB: "Go out dancing at a high-energy venue", pctA: 76, pctB: 24 },
  { id: 20, optionA: "Share all phone passwords", optionB: "Share all clothes and wardrobe", pctA: 84, pctB: 16 },
  { id: 21, optionA: "Always agree on what to eat", optionB: "Always agree on what movie to watch", pctA: 67, pctB: 33 },
  { id: 22, optionA: "Have a surprise party thrown for you", optionB: "Plan a secret surprise getaway for partner", pctA: 39, pctB: 61 },
  { id: 23, optionA: "Never have to do laundry again", optionB: "Never have to wash dishes again", pctA: 56, pctB: 44 },
  { id: 24, optionA: "Speak every language fluently together", optionB: "Play every musical instrument fluently", pctA: 74, pctB: 26 },
  { id: 25, optionA: "Be famous for a week", optionB: "Be invisible whenever you want", pctA: 28, pctB: 72 },
  { id: 26, optionA: "Have a cozy fireplace in winter", optionB: "Have a private swimming pool in summer", pctA: 51, pctB: 49 },
  { id: 27, optionA: "Receive handwritten love letters", optionB: "Receive unexpected romantic gifts", pctA: 65, pctB: 35 },
  { id: 28, optionA: "Have a 3-day weekend every week", optionB: "Take a full month off every summer", pctA: 58, pctB: 42 },
  { id: 29, optionA: "Have a sunset dinner on the beach", optionB: "Have a sunrise breakfast in bed", pctA: 61, pctB: 39 },
  { id: 30, optionA: "Travel back in time to your childhoods", optionB: "Travel 50 years into future together", pctA: 47, pctB: 53 },
  { id: 31, optionA: "Play board games all evening", optionB: "Play video games together all evening", pctA: 53, pctB: 47 },
  { id: 32, optionA: "Have a dog that talks", optionB: "Have a cat that performs magic tricks", pctA: 79, pctB: 21 },
  { id: 33, optionA: "Always know what gift partner wants", optionB: "Always be surprised by partner's gifts", pctA: 44, pctB: 56 },
  { id: 34, optionA: "Have an endless supply of pizza", optionB: "Have an endless supply of ice cream", pctA: 57, pctB: 43 },
  { id: 35, optionA: "Sing a duet together at karaoke", optionB: "Do a comedy roast of each other", pctA: 62, pctB: 38 },
  { id: 36, optionA: "Live in a warm sunny climate forever", optionB: "Experience 4 distinct seasons", pctA: 54, pctB: 46 },
  { id: 37, optionA: "Have a private island for a month", optionB: "Have a private jet for a year", pctA: 48, pctB: 52 },
  { id: 38, optionA: "Be master stargazers", optionB: "Be master scuba divers", pctA: 50, pctB: 50 },
  { id: 39, optionA: "Love story turned into a bestseller book", optionB: "Love story turned into a blockbuster movie", pctA: 43, pctB: 57 },
  { id: 40, optionA: "Never fight over minor chores again", optionB: "Never disagree on travel destinations", pctA: 72, pctB: 28 },
];

const SAMPLE_QUESTIONS = [
  "Live in a cabin in the mountains or Live in a beach house by the ocean",
  "Always have to say what's on your mind or Never be able to speak again",
  "Cook dinner together every night or Go out to eat every night",
  "Relive your first date forever or Fast-forward to your 50th anniversary",
  "Have a personal chef or Have a personal masseuse",
  "Know all your partner's thoughts or Have your partner know all yours",
  "Travel the world for a year together or Buy your dream home together",
  "Always be 10 minutes early or Always be fashionably late",
];

const TIPS = [
  { icon: "📱", title: "Put phones face-down", text: "Put phones face-down for anything unrelated to the game." },
  { icon: "🕯️", title: "Set the mood", text: "Set the mood, dim lights, a drink, zero distractions." },
  { icon: "❓", title: "Ask 'why?'", text: "If an answer surprises you, ask 'why?' before moving on." },
  { icon: "🔄", title: "Rotate turn order", text: "Rotate who goes first each round so it stays balanced." },
  { icon: "⭐", title: "Save favorite answers", text: "Save your favorite answers, they're gold to laugh about later." },
];

const FAQS = [
  {
    q: "How do you play Would You Rather as a couple?",
    a: "Each round presents two scenarios. Both partners pick their preference, then reveal at the same time. The conversations that follow are the best part!"
  },
  {
    q: "Is Would You Rather good for relationships?",
    a: "Absolutely! It's a playful way to learn about your partner's values, preferences, and sense of humor. Therapists often recommend light games like this to keep communication open."
  },
  {
    q: "How many Would You Rather questions are there?",
    a: "This page has 40+ Would You Rather dilemmas designed specifically for couples, with new ones added regularly."
  }
];

const RELATED_GAMES = [
  { title: "Ice Breakers", desc: "Fun, lighthearted prompts to spark conversation and connection with your partner.", slug: "ice-breaker-questions-for-couples", emoji: "🧊" },
  { title: "This or That", desc: "Quick-fire picks between two things. Fast, fun, and surprisingly revealing about your compatibility.", slug: "this-or-that-for-couples", emoji: "⚡" },
  { title: "Truth or Dare", desc: "The classic party game redesigned for two. Choose truth for revealing questions or dare for playful challenges.", slug: "truth-or-dare-for-couples", emoji: "🔥" },
  { title: "Never Have I Ever", desc: "Discover surprising things about each other with this classic game. Share experiences you've had (or haven't) and compare.", slug: "never-have-i-ever-for-couples", emoji: "🙈" }
];

export default function WouldYouRatherCouplesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<"A" | "B" | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const dilemma = WYR_DILEMMAS[currentIndex];

  const playPopSound = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AC) audioContextRef.current = new AC();
      }
      const ctx = audioContextRef.current;
      if (ctx && ctx.state !== "closed") {
        if (ctx.state === "suspended") ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(540, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch {
      // Audio context fallback
    }
  }, []);

  const handleSelect = (choice: "A" | "B") => {
    playPopSound();
    setSelectedChoice(choice);
  };

  const handleNext = () => {
    playPopSound();
    setSelectedChoice(null);
    setCurrentIndex((prev) => (prev + 1) % WYR_DILEMMAS.length);
  };

  const handlePrev = () => {
    playPopSound();
    setSelectedChoice(null);
    setCurrentIndex((prev) => (prev - 1 + WYR_DILEMMAS.length) % WYR_DILEMMAS.length);
  };

  const handleShuffle = () => {
    playPopSound();
    setSelectedChoice(null);
    const randomIndex = Math.floor(Math.random() * WYR_DILEMMAS.length);
    setCurrentIndex(randomIndex);
  };

  const toggleFavorite = () => {
    playPopSound();
    setFavorites((prev) =>
      prev.includes(dilemma.id) ? prev.filter((id) => id !== dilemma.id) : [...prev, dilemma.id]
    );
  };

  const handleCopy = () => {
    playPopSound();
    const textToCopy = `Would You Rather: ${dilemma.optionA} OR ${dilemma.optionB}?`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFavorite = favorites.includes(dilemma.id);
  const progressPercent = ((currentIndex + 1) / WYR_DILEMMAS.length) * 100;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF9F6",
        color: "#1E293B",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Navigation Bar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
          padding: "12px 24px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/couple-games" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#FF385C", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20 }}>
              ❤️
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>Lovely</span>
          </Link>
          <Link href="/couple-games" style={{ fontSize: 14, fontWeight: 700, color: "#64748B", textDecoration: "none", transition: "color 0.2s" }}>
            Games
          </Link>
        </div>
      </nav>

      {/* Main Page Container */}
      <main style={{ maxWidth: 860, margin: "0 auto", padding: "40px 20px 80px" }}>
        
        {/* Header Title Section */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h1 style={{ fontSize: 42, fontWeight: 300, fontFamily: "Georgia, serif", color: "#0F172A", marginBottom: 12, letterSpacing: "-0.02em" }}>
            Would You Rather: Couple Edition
          </h1>
          <p style={{ fontSize: 18, color: "#64748B", maxWidth: 580, margin: "0 auto", lineHeight: 1.5 }}>
            Couple dilemmas designed to spark conversation, laughs, and the occasional debate.
          </p>
        </div>

        {/* Interactive Dilemma Card */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 28,
            padding: "32px 28px",
            boxShadow: "0 10px 35px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            marginBottom: 48,
          }}
        >
          {/* Progress Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
              {currentIndex + 1} OF {WYR_DILEMMAS.length}
            </span>
            <div style={{ flex: 1, height: 4, backgroundColor: "#F1F5F9", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progressPercent}%`, backgroundColor: "#FF385C", transition: "width 0.3s ease" }} />
            </div>
          </div>

          {/* Prompt Question */}
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", textAlign: "center", marginBottom: 28 }}>
            Which do you prefer?
          </h2>

          {/* Dilemma Option Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 28 }}>
            
            {/* Option A */}
            <button
              onClick={() => handleSelect("A")}
              style={{
                padding: "24px 20px",
                borderRadius: 20,
                backgroundColor: selectedChoice === "A" ? "#FFF1F2" : "#FAFAFA",
                border: selectedChoice === "A" ? "2px solid #FF385C" : "1px solid #E2E8F0",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {selectedChoice && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: 4,
                    width: `${dilemma.pctA}%`,
                    backgroundColor: "#FF385C",
                    transition: "width 0.5s ease",
                  }}
                />
              )}
              <span style={{ fontSize: 16, fontWeight: 700, color: selectedChoice === "A" ? "#E11D48" : "#1E293B", lineHeight: 1.45, display: "block" }}>
                {dilemma.optionA}
              </span>
              {selectedChoice && (
                <span style={{ fontSize: 13, fontWeight: 800, color: "#FF385C", marginTop: 8, display: "block" }}>
                  {dilemma.pctA}% picked this
                </span>
              )}
            </button>

            {/* Option B */}
            <button
              onClick={() => handleSelect("B")}
              style={{
                padding: "24px 20px",
                borderRadius: 20,
                backgroundColor: selectedChoice === "B" ? "#FFF1F2" : "#FAFAFA",
                border: selectedChoice === "B" ? "2px solid #FF385C" : "1px solid #E2E8F0",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {selectedChoice && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: 4,
                    width: `${dilemma.pctB}%`,
                    backgroundColor: "#FF385C",
                    transition: "width 0.5s ease",
                  }}
                />
              )}
              <span style={{ fontSize: 16, fontWeight: 700, color: selectedChoice === "B" ? "#E11D48" : "#1E293B", lineHeight: 1.45, display: "block" }}>
                {dilemma.optionB}
              </span>
              {selectedChoice && (
                <span style={{ fontSize: 13, fontWeight: 800, color: "#FF385C", marginTop: 8, display: "block" }}>
                  {dilemma.pctB}% picked this
                </span>
              )}
            </button>
          </div>

          {/* Action Toolbar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid #F1F5F9" }}>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={handlePrev}
                style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B" }}
                aria-label="Previous question"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleShuffle}
                style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B" }}
                title="Shuffle"
              >
                <Shuffle size={18} />
              </button>
              <button
                onClick={toggleFavorite}
                style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: isFavorite ? "#FFF1F2" : "#F8FAFC", border: `1px solid ${isFavorite ? "#FF385C" : "#E2E8F0"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: isFavorite ? "#FF385C" : "#64748B" }}
                title="Favorite"
              >
                <Heart size={18} fill={isFavorite ? "#FF385C" : "none"} />
              </button>
              <button
                onClick={handleCopy}
                style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: copied ? "#10B981" : "#64748B" }}
                title="Copy dilemma"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>

            <button
              onClick={handleNext}
              style={{
                padding: "12px 24px",
                borderRadius: 24,
                backgroundColor: "#FF385C",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: 15,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 4px 14px rgba(255, 56, 92, 0.3)",
              }}
            >
              <span>Next Prompt</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ── ABOUT SECTION ── */}
        <section style={{ marginBottom: 44 }}>
          <h2 style={{ fontSize: 28, fontWeight: 300, fontFamily: "Georgia, serif", color: "#0F172A", marginBottom: 16 }}>
            About <span style={{ color: "#FF385C", fontStyle: "italic" }}>Would You Rather</span> for Couples
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "#475569" }}>
            Would You Rather is one of the most popular couple games because it reveals surprising preferences and sparks conversations you&apos;d never have otherwise. Whether you&apos;re on a long car ride, having a cozy night in, or just looking for a fun way to connect, these dilemmas will get you both laughing and debating. Studies show that playful interactions strengthen relationship bonds, and Would You Rather is the perfect way to keep things light while learning something new about your partner.
          </p>
        </section>

        {/* ── SAMPLE QUESTIONS ── */}
        <section style={{ marginBottom: 44 }}>
          <h2 style={{ fontSize: 24, fontWeight: 300, fontFamily: "Georgia, serif", color: "#0F172A", marginBottom: 16 }}>
            Sample questions to get you started
          </h2>
          <ul style={{ paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {SAMPLE_QUESTIONS.map((item, idx) => (
              <li key={idx} style={{ fontSize: 15, color: "#334155", lineHeight: 1.6 }}>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ fontSize: 13, fontStyle: "italic", color: "#94A3B8", marginTop: 14 }}>
            Tap the game above to play through all prompts.
          </p>
        </section>

        {/* ── HOW TO PLAY ── */}
        <section style={{ marginBottom: 44 }}>
          <h2 style={{ fontSize: 24, fontWeight: 300, fontFamily: "Georgia, serif", color: "#0F172A", marginBottom: 16 }}>
            How to play Would You Rather
          </h2>
          <ol style={{ paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            <li style={{ fontSize: 15, color: "#334155", lineHeight: 1.6 }}>
              Grab your partner, sit face-to-face or curl up on the couch.
            </li>
            <li style={{ fontSize: 15, color: "#334155", lineHeight: 1.6 }}>
              Open this page on a phone or laptop and tap to start.
            </li>
            <li style={{ fontSize: 15, color: "#334155", lineHeight: 1.6 }}>
              Take turns answering, reacting, and asking follow-up questions.
            </li>
            <li style={{ fontSize: 15, color: "#334155", lineHeight: 1.6 }}>
              No timer, no pressure, the goal is to slow down and connect.
            </li>
          </ol>
        </section>

        {/* ── WHY COUPLES LOVE THIS GAME ── */}
        <section style={{ marginBottom: 44 }}>
          <h2 style={{ fontSize: 24, fontWeight: 300, fontFamily: "Georgia, serif", color: "#0F172A", marginBottom: 16 }}>
            Why couples love this game
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "#475569" }}>
            Psychologists find that novel, playful experiences release dopamine and rebuild attraction in long-term relationships. Would You Rather works because it creates a structured excuse to ask things you&apos;d normally skip, and laugh at the answers together. A handful of prompts is often enough to turn a regular Tuesday into a real date night.
          </p>
        </section>

        {/* ── TIPS TO MAKE IT MORE FUN ── */}
        <section style={{ marginBottom: 44 }}>
          <h2 style={{ fontSize: 24, fontWeight: 300, fontFamily: "Georgia, serif", color: "#0F172A", marginBottom: 16 }}>
            Tips to make it more fun
          </h2>
          <ul style={{ paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {TIPS.map((tip, idx) => (
              <li key={idx} style={{ fontSize: 15, color: "#334155", lineHeight: 1.6 }}>
                <strong>{tip.title}:</strong> {tip.text}
              </li>
            ))}
          </ul>
        </section>

        {/* ── FREQUENTLY ASKED QUESTIONS (ACCORDION) ── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 300, fontFamily: "Georgia, serif", color: "#0F172A", marginBottom: 20 }}>
            Frequently asked questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  border: "1px solid #E2E8F0",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: "100%",
                    padding: "18px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>{faq.q}</span>
                  <span style={{ fontSize: 20, fontWeight: 400, color: "#FF385C" }}>{openFaq === idx ? "−" : "+"}</span>
                </button>
                {openFaq === idx && (
                  <div style={{ padding: "0 20px 18px", fontSize: 14, lineHeight: 1.65, color: "#475569", borderTop: "1px solid #F1F5F9" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── DISCOVER MORE / RELATED COUPLE GAMES ── */}
        <section>
          <h2 style={{ fontSize: 28, fontWeight: 300, fontFamily: "Georgia, serif", color: "#0F172A", textAlign: "center", marginBottom: 24 }}>
            More couple games
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {RELATED_GAMES.map((game, idx) => (
              <Link
                key={idx}
                href={`/games/${game.slug}`}
                style={{
                  textDecoration: "none",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 20,
                  padding: 22,
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s, boxShadow 0.2s",
                }}
              >
                <div>
                  <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "#FFF1F2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 14 }}>
                    {game.emoji}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>{game.title}</h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.45, margin: 0 }}>{game.desc}</p>
                </div>
                <div style={{ marginTop: 16, fontSize: 13, fontWeight: 800, color: "#FF385C", display: "flex", alignItems: "center", gap: 4 }}>
                  <span>Play now</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      <BottomNav currentPath="/couple-games" variant="light" />
    </div>
  );
}
