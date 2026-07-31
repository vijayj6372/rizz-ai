"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Heart, 
  Sparkles, 
  Share2, 
  RefreshCw, 
  Award, 
  Activity, 
  Calendar, 
  MapPin, 
  User, 
  Copy, 
  Check, 
  Compass, 
  Zap, 
  Smile, 
  Infinity,
  Star
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useTheme } from "@/hooks/useTheme";
import { AppColors } from "@/constants/theme";
import {
  LOVE_VIBES,
  LOVE_STATUSES,
  LOVE_COLORS,
  LOVE_DAYS,
  LOVE_SYMBOLS,
  SUN_SIGNS,
  MOON_SIGNS,
  RISING_SIGNS,
  FIRST_MEETING_IDEAS,
  MARRIAGE_TIMELINES,
  PERFECT_DATE_LOCATIONS,
  PERFECT_DATE_IDEAS,
  COMMON_INTERESTS,
  FUTURE_FORECASTS
} from "@/data/loveTestData";

// Deterministic hash based on characters of the combined names
function calculateLoveResult(name1: string, name2: string) {
  const n1 = name1.trim().toLowerCase();
  const n2 = name2.trim().toLowerCase();
  
  // Sort to ensure Priya + Vijay equals Vijay + Priya
  const combined = [n1, n2].sort().join("+");
  
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  hash = Math.abs(hash);
  
  // Scale score to 45% - 99%
  const score = 45 + (hash % 55); 
  
  let stars = 3;
  let ratingText = "Good Compatibility";
  let subText = "You two have a solid foundation, with strong chemistry and potential!";
  
  if (score < 55) {
    stars = 2;
    ratingText = "Average Compatibility";
    subText = "A couple with potential, but you'll need work and patience to align your worlds.";
  } else if (score < 75) {
    stars = 3;
    ratingText = "Good Compatibility";
    subText = "Great vibe! You share deep trust and standard alignment on core dreams.";
  } else if (score < 90) {
    stars = 4;
    ratingText = "Very High Compatibility";
    subText = "Your love is amazing! Exceptional emotional bond and shared sparks.";
  } else {
    stars = 5;
    ratingText = "Outstanding Compatibility";
    subText = "Absolute soulmates! Written in the stars, pure alignment in every universe.";
  }

  // Derive selection indexes
  const vibeIndex = hash % LOVE_VIBES.length;
  const statusIndex = (hash >> 1) % LOVE_STATUSES.length;
  const colorIndex = (hash >> 2) % LOVE_COLORS.length;
  const dayIndex = (hash >> 3) % LOVE_DAYS.length;
  const symbolIndex = (hash >> 4) % LOVE_SYMBOLS.length;
  
  const sunIndex = (hash >> 5) % SUN_SIGNS.length;
  const moonIndex = (hash >> 6) % MOON_SIGNS.length;
  const risingIndex = (hash >> 7) % RISING_SIGNS.length;
  
  const meetingIndex = (hash >> 8) % FIRST_MEETING_IDEAS.length;
  const marriageIndex = (hash >> 9) % MARRIAGE_TIMELINES.length;
  const dateLocationIndex = (hash >> 10) % PERFECT_DATE_LOCATIONS.length;
  const dateIdeaIndex = (hash >> 11) % PERFECT_DATE_IDEAS.length;
  const commonInterestIndex = (hash >> 12) % COMMON_INTERESTS.length;
  
  const forecastIndex = (hash >> 13) % FUTURE_FORECASTS.length;
  
  // Dimension percentages (Intimacy, Trust, Love, Long Term)
  const intimacy = 40 + ((hash >> 14) % 59);
  const trust = 50 + ((hash >> 15) % 49);
  const love = 40 + ((hash >> 16) % 59);
  const longTerm = 45 + ((hash >> 17) % 54);
  
  // Energy percentages
  const spiritual = 40 + ((hash >> 18) % 59);
  const intellectual = 40 + ((hash >> 19) % 59);
  const behavior = 45 + ((hash >> 20) % 54);
  const karmic = 50 + ((hash >> 21) % 49);

  return {
    score,
    stars,
    ratingText,
    subText,
    vibe: LOVE_VIBES[vibeIndex],
    status: LOVE_STATUSES[statusIndex],
    color: LOVE_COLORS[colorIndex],
    day: LOVE_DAYS[dayIndex],
    symbol: LOVE_SYMBOLS[symbolIndex],
    sunSign: SUN_SIGNS[sunIndex],
    moonSign: MOON_SIGNS[moonIndex],
    risingSign: RISING_SIGNS[risingIndex],
    firstMeeting: FIRST_MEETING_IDEAS[meetingIndex],
    marriageTimeline: MARRIAGE_TIMELINES[marriageIndex],
    perfectLocation: PERFECT_DATE_LOCATIONS[dateLocationIndex],
    perfectIdea: PERFECT_DATE_IDEAS[dateIdeaIndex],
    commonInterest: COMMON_INTERESTS[commonInterestIndex],
    forecast: FUTURE_FORECASTS[forecastIndex],
    dimensions: { intimacy, trust, love, longTerm },
    energies: { spiritual, intellectual, behavior, karmic }
  };
}

const LOADING_STEPS = [
  "Formulating compatibility matrix...",
  "Consulting astrological alignments...",
  "Analyzing name vibrations...",
  "Calculating love timeline vectors...",
  "Assembling final romance report..."
];

export default function LoveTestPage() {
  const { theme, isDark } = useTheme();
  
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<ReturnType<typeof calculateLoveResult> | null>(null);
  
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const resultsRef = useRef<HTMLDivElement>(null);

  // Deep wine/burgundy theme values
  const pageBg = "linear-gradient(180deg, #4A0E2E 0%, #30051B 50%, #1A000D 100%)";
  const glassInputBg = "rgba(255, 255, 255, 0.1)";
  const glassInputBorder = "1px solid rgba(255, 255, 255, 0.25)";
  
  // High contrast white cards with dark burgundy text inside
  const reportCardBg = "#FFFFFF";
  const reportCardBorder = "1px solid #FFE4EC";
  const cardTitleColor = "#4A0E2E"; // Deep burgundy for section headers
  const cardLabelColor = "#9A6D85"; // Softer rose-burgundy for labels
  const cardValueColor = "#30051B"; // Dark wine for text values
  const cardDescColor = "#5E4452"; // Dark charcoal-burgundy for descriptions

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) {
      setErrorMsg("Please enter both names to test compatibility!");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    
    // Cycle through cute loading messages
    let step = 0;
    setLoadingMsg(LOADING_STEPS[0]);
    const interval = setInterval(() => {
      step++;
      if (step < LOADING_STEPS.length) {
        setLoadingMsg(LOADING_STEPS[step]);
      }
    }, 450);

    setTimeout(() => {
      clearInterval(interval);
      const res = calculateLoveResult(name1, name2);
      setResultData(res);
      setLoading(false);
      setShowResult(true);
      
      // Smooth scroll to top of results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 2200);
  };

  const handleReset = () => {
    setName1("");
    setName2("");
    setShowResult(false);
    setResultData(null);
  };

  const handleCopyResults = () => {
    if (!resultData) return;
    const shareText = `❤️ LOVE TEST RESULTS ❤️
🧔 ${name1} + 👩 ${name2}
📊 Love Compatibility: ${resultData.score}%
⭐ Rating: ${resultData.stars}/5 Stars ("${resultData.ratingText}")
✨ Vibe: ${resultData.vibe.name}
🔮 Status: ${resultData.status.name}
🕊️ Love Symbol: ${resultData.symbol.name} ${resultData.symbol.emoji}
💍 Marriage Timeline: ${resultData.marriageTimeline}
🎯 Test your love on Rizz AI!`;

    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!resultData) return;
    const shareText = `❤️ Love compatibility score for ${name1} and ${name2} is ${resultData.score}%! Test yours on Rizz AI.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Rizz AI Love Test",
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        handleCopyResults();
      }
    } else {
      handleCopyResults();
    }
  };

  return (
    <PageLayout
      showBack={true}
      backHref="/"
      backLabel="Home"
      header={<HeaderTitle title="Love Test" />}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          margin: "0 auto",
          padding: "16px 8px 48px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Force page background override + custom keyframes */}
        <style>{`
          /* Override PageLayout background to force dark burgundy theme globally */
          div[data-theme] > div, body {
            background: linear-gradient(180deg, #4A0E2E 0%, #30051B 50%, #1A000D 100%) !important;
          }
          @keyframes heartBeat {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
          }
          @keyframes heartPulse {
            0% { transform: translate(-50%, -50%) scale(0.95); }
            50% { transform: translate(-50%, -50%) scale(1.1); }
            100% { transform: translate(-50%, -50%) scale(0.95); }
          }
          @keyframes loadingBar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* INPUT MODE */}
        {!showResult && !loading && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 28,
              padding: "32px 24px",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 54,
                  display: "inline-block",
                  animation: "heartBeat 1.5s infinite alternate",
                }}
              >
                ❤️
              </div>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  margin: "8px 0 4px",
                  color: "#FFDEE9",
                  fontFamily: "var(--font-lilita-one), cursive",
                }}
              >
                Love Calculator
              </h2>
              <p style={{ fontSize: 13, opacity: 0.8, margin: 0, color: "#FFFFFF" }}>
                Enter your names to compute deep compatibility vectors
              </p>
            </div>

            <form onSubmit={handleCalculate} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, color: "#FFDEE9" }}>
                  <span>🧔</span> Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  maxLength={30}
                  style={{
                    height: 48,
                    borderRadius: 14,
                    border: "none",
                    backgroundColor: "#FFFFFF",
                    color: "#30051B",
                    padding: "0 16px",
                    fontSize: 15,
                    fontWeight: 600,
                    outline: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, color: "#FFDEE9" }}>
                  <span>👩</span> Partner's Name
                </label>
                <input
                  type="text"
                  placeholder="Enter their name..."
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  maxLength={30}
                  style={{
                    height: 48,
                    borderRadius: 14,
                    border: "none",
                    backgroundColor: "#FFFFFF",
                    color: "#30051B",
                    padding: "0 16px",
                    fontSize: 15,
                    fontWeight: 600,
                    outline: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                />
              </div>

              {errorMsg && (
                <div style={{ color: "#FF8C94", fontSize: 13, textAlign: "center", fontWeight: 600 }}>
                  ⚠️ {errorMsg}
                </div>
              )}

              <button
                type="submit"
                style={{
                  height: 52,
                  borderRadius: 16,
                  border: "none",
                  background: "linear-gradient(135deg, #F86B6D 0%, #D81B60 100%)",
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: "0 8px 24px rgba(248, 107, 109, 0.4)",
                  marginTop: 8,
                  transition: "transform 0.1s, opacity 0.1s",
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <Heart size={18} fill="#fff" />
                Calculate Love Compatibility
              </button>
            </form>
          </div>
        )}

        {/* LOADING ANIMATION */}
        {loading && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 28,
              padding: "48px 24px",
              backdropFilter: "blur(12px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              minHeight: 300,
            }}
          >
            <div style={{ position: "relative", width: 80, height: 80 }}>
              <div
                style={{
                  fontSize: 64,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  animation: "heartPulse 1.2s infinite ease-in-out",
                }}
              >
                💖
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  margin: "0 0 8px",
                  color: "#FFDEE9",
                  minHeight: 24,
                }}
              >
                {loadingMsg}
              </p>
              <div
                style={{
                  width: 140,
                  height: 4,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 2,
                  overflow: "hidden",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "60%",
                    backgroundColor: "#F86B6D",
                    borderRadius: 2,
                    animation: "loadingBar 1.5s infinite ease-in-out",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* COMPATIBILITY RESULTS SHOW */}
        {showResult && resultData && (
          <div
            ref={resultsRef}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              animation: "fadeIn 0.5s ease-out",
            }}
          >
            {/* Main Score Poster (High Contrast Gradient Card with White Text) */}
            <div
              style={{
                background: "linear-gradient(135deg, #FF5E7E 0%, #D81B60 100%)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 28,
                padding: "32px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: "#FFD3E1", textTransform: "uppercase", marginBottom: 6 }}>
                💘 Love Test Result 💘
              </div>
              <h1
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  margin: "0 0 16px",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-lilita-one), cursive",
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                {name1} + {name2}
              </h1>

              {/* Glowing Heart Ring Container */}
              <div
                style={{
                  position: "relative",
                  width: 170,
                  height: 170,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                {/* Rotating SVG gradient ring */}
                <svg style={{ position: "absolute", width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                  <circle
                    cx="85"
                    cy="85"
                    r="75"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="85"
                    cy="85"
                    r="75"
                    stroke="#FFFFFF"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 75}
                    strokeDashoffset={2 * Math.PI * 75 * (1 - resultData.score / 100)}
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.8))" }}
                  />
                </svg>

                {/* Score Number inside a central red heart */}
                <div
                  style={{
                    position: "absolute",
                    width: 110,
                    height: 110,
                    backgroundColor: "#FFFFFF",
                    borderRadius: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                    border: "3px solid #FFDEE9",
                  }}
                >
                  <span style={{ fontSize: 38, fontWeight: 900, color: "#D81B60", lineHeight: 1 }}>
                    {resultData.score}%
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#7D566B", textTransform: "uppercase", letterSpacing: 0.5 }}>
                    compatible
                  </span>
                </div>
              </div>

              {/* Stars Rating (High Quality SVG Stars) */}
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={22}
                    color="#FFD700"
                    fill={s <= resultData.stars ? "#FFD700" : "transparent"}
                    style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }}
                  />
                ))}
              </div>

              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#FFFFFF",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  padding: "6px 16px",
                  borderRadius: 20,
                  display: "inline-block",
                  marginBottom: 12,
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                💕 {resultData.ratingText} 💕
              </div>

              <p style={{ fontSize: 14, opacity: 0.95, maxWidth: 360, margin: "0 0 24px", lineHeight: 1.5, color: "#FFFFFF" }}>
                "{resultData.subText}"
              </p>

              {/* Share & Play Again Actions */}
              <div style={{ display: "flex", width: "100%", gap: 12, justifyContent: "center" }}>
                <button
                  onClick={handleShare}
                  style={{
                    flex: 1,
                    maxWidth: 180,
                    height: 48,
                    borderRadius: 14,
                    border: "none",
                    backgroundColor: "#FFFFFF",
                    color: "#D81B60",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
                    transition: "transform 0.1s",
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <Share2 size={16} color="#D81B60" />
                  Share Result
                </button>

                <button
                  onClick={handleReset}
                  style={{
                    flex: 1,
                    maxWidth: 180,
                    height: 48,
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.4)",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    transition: "background-color 0.2s, transform 0.1s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.25)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <RefreshCw size={14} color="#FFFFFF" />
                  Play Again
                </button>
              </div>

              {copied && (
                <div
                  style={{
                    position: "absolute",
                    bottom: -15,
                    backgroundColor: "#FFFFFF",
                    color: "#D81B60",
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "6px 14px",
                    borderRadius: 12,
                    boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                    animation: "fadeIn 0.2s",
                  }}
                >
                  Copied compatibility summary!
                </div>
              )}
            </div>

            {/* DETAIL BREAKDOWNS (High Contrast Solid White Cards with Dark Text) */}

            {/* 1) Personality & Match Traits */}
            <div
              style={{
                background: reportCardBg,
                border: reportCardBorder,
                borderRadius: 24,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 8, color: cardTitleColor }}>
                <Sparkles size={18} color="#D81B60" />
                Personality & Match Traits
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ backgroundColor: "#FFF5F7", padding: "12px 16px", borderRadius: 14, borderLeft: "4px solid #F86B6D", border: "1px solid #FFE4EB" }}>
                  <div style={{ fontSize: 11, color: cardLabelColor, textTransform: "uppercase", fontWeight: 700, letterSpacing: 0.5 }}>Vibe</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: cardValueColor }}>{resultData.vibe.name}</div>
                  <div style={{ fontSize: 13, color: cardDescColor, marginTop: 4, lineHeight: 1.4 }}>{resultData.vibe.description}</div>
                </div>

                <div style={{ backgroundColor: "#FFF5F7", padding: "12px 16px", borderRadius: 14, borderLeft: "4px solid #D81B60", border: "1px solid #FFE4EB" }}>
                  <div style={{ fontSize: 11, color: cardLabelColor, textTransform: "uppercase", fontWeight: 700, letterSpacing: 0.5 }}>Status</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: cardValueColor }}>{resultData.status.name} ✨</div>
                  <div style={{ fontSize: 13, color: cardDescColor, marginTop: 4, lineHeight: 1.4 }}>{resultData.status.description}</div>
                </div>
              </div>
            </div>

            {/* 2) Core Relationship Dimensions */}
            <div
              style={{
                background: reportCardBg,
                border: reportCardBorder,
                borderRadius: 24,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 8, color: cardTitleColor }}>
                <Heart size={18} color="#D81B60" />
                Core Relationship Dimensions
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Intimacy", value: resultData.dimensions.intimacy, color: "#FF5E7E" },
                  { label: "Trust", value: resultData.dimensions.trust, color: "#2B8DE3" },
                  { label: "Love", value: resultData.dimensions.love, color: "#D81B60" },
                  { label: "Long Term Projection", value: resultData.dimensions.longTerm, color: "#2F9E44" },
                ].map((d) => (
                  <div key={d.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700 }}>
                      <span style={{ color: cardValueColor }}>{d.label}</span>
                      <span style={{ color: d.color }}>{d.value}%</span>
                    </div>
                    <div style={{ height: 10, backgroundColor: "#FFE4EC", borderRadius: 5, overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${d.value}%`,
                          backgroundColor: d.color,
                          borderRadius: 5,
                          boxShadow: `0 0 8px ${d.color}66`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3) Lucky Love Matches */}
            <div
              style={{
                background: reportCardBg,
                border: reportCardBorder,
                borderRadius: 24,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 8, color: cardTitleColor }}>
                <Award size={18} color="#D81B60" />
                Lucky Love Matches
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Lucky Color */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, backgroundColor: "#FFF5F7", padding: 12, borderRadius: 16, border: "1px solid #FFE4EB" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      backgroundColor: resultData.color.hex,
                      boxShadow: `0 4px 12px ${resultData.color.hex}88`,
                      border: "2px solid #FFFFFF",
                    }}
                  />
                  <div>
                    <div style={{ fontSize: 11, color: cardLabelColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Lucky Love Color</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: cardValueColor }}>{resultData.color.name}</div>
                    <div style={{ fontSize: 12, color: cardDescColor }}>{resultData.color.description}</div>
                  </div>
                </div>

                {/* Lucky Day */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, backgroundColor: "#FFF5F7", padding: 12, borderRadius: 16, border: "1px solid #FFE4EB" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      backgroundColor: "#FFF0F3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      border: "1px solid #FFE4EB",
                    }}
                  >
                    {resultData.day.emoji}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: cardLabelColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Lucky Love Day</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: cardValueColor }}>{resultData.day.name}</div>
                    <div style={{ fontSize: 12, color: cardDescColor }}>{resultData.day.description}</div>
                  </div>
                </div>

                {/* Love Symbol */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, backgroundColor: "#FFF5F7", padding: 12, borderRadius: 16, border: "1px solid #FFE4EB" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      backgroundColor: "#FFF0F3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      border: "1px solid #FFE4EB",
                    }}
                  >
                    {resultData.symbol.emoji}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: cardLabelColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Love Symbol / Animal</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: cardValueColor }}>{resultData.symbol.name}</div>
                    <div style={{ fontSize: 12, color: cardDescColor }}>{resultData.symbol.description}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4) Daily Love Astrology */}
            <div
              style={{
                background: reportCardBg,
                border: reportCardBorder,
                borderRadius: 24,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 8, color: cardTitleColor }}>
                <Compass size={18} color="#D81B60" />
                Daily Love Astrology
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { title: "Sun Sign Compatibility", ...resultData.sunSign },
                  { title: "Moon Sign Compatibility", ...resultData.moonSign },
                  { title: "Rising Sign / Ascendant", ...resultData.risingSign },
                ].map((s, idx) => (
                  <div key={idx} style={{ backgroundColor: "#FFF5F7", padding: 14, borderRadius: 16, border: "1px solid #FFE4EB" }}>
                    <div style={{ fontSize: 11, color: cardLabelColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.title}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#D81B60", margin: "3px 0" }}>{s.sign}</div>
                    <div style={{ fontSize: 12, color: cardDescColor, lineHeight: 1.4 }}>{s.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5) Dating & Relationship Horizons */}
            <div
              style={{
                background: reportCardBg,
                border: reportCardBorder,
                borderRadius: 24,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 8, color: cardTitleColor }}>
                <Calendar size={18} color="#D81B60" />
                Dating & Relationship Horizons
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "First Meeting Idea", item: resultData.firstMeeting },
                  { label: "Marriage Timeline Forecast", item: { title: resultData.marriageTimeline, emoji: "💍", description: "Estimated timeline for formalizing deeper life commitment." } },
                  { label: "Perfect Date Location", item: resultData.perfectLocation },
                  { label: "Perfect Date Idea", item: resultData.perfectIdea },
                  { label: "Common Interest / Hobby", item: resultData.commonInterest },
                ].map((h, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 12, backgroundColor: "#FFF5F7", padding: 12, borderRadius: 16, border: "1px solid #FFE4EB" }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        backgroundColor: "#FFF0F3",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        flexShrink: 0,
                        border: "1px solid #FFE4EB",
                      }}
                    >
                      {h.item.emoji}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: cardLabelColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{h.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: cardValueColor }}>{h.item.title}</div>
                      <div style={{ fontSize: 12, color: cardDescColor }}>{h.item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6) Relationship Energy & Timeline */}
            <div
              style={{
                background: reportCardBg,
                border: reportCardBorder,
                borderRadius: 24,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 8, color: cardTitleColor }}>
                <Zap size={18} color="#D81B60" />
                Relationship Energy & Timeline
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Spiritual Energy", value: resultData.energies.spiritual, color: "#E03131" },
                  { label: "Intellectual Energy", value: resultData.energies.intellectual, color: "#1971C2" },
                  { label: "Behavior & Affinity Match", value: resultData.energies.behavior, color: "#E8590C" },
                  { label: "Karmic Bond Strength", value: resultData.energies.karmic, color: "#C2255C" },
                ].map((e) => (
                  <div key={e.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700 }}>
                      <span style={{ color: cardValueColor }}>{e.label}</span>
                      <span style={{ color: e.color }}>{e.value}%</span>
                    </div>
                    <div style={{ height: 8, backgroundColor: "#FFE4EC", borderRadius: 4, overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${e.value}%`,
                          backgroundColor: e.color,
                          borderRadius: 4,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7) Milestones & Future Outlook */}
            <div
              style={{
                background: reportCardBg,
                border: reportCardBorder,
                borderRadius: 24,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                marginBottom: 16,
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 8, color: cardTitleColor }}>
                <Infinity size={18} color="#D81B60" />
                Milestones & Future Outlook
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative", paddingLeft: 12 }}>
                {/* Vertical timeline line */}
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    bottom: 10,
                    left: 4,
                    width: 2,
                    backgroundColor: "#FFD3E1",
                  }}
                />

                {[
                  { year: "1 Year", forecast: resultData.forecast.oneYear, emoji: "🌱" },
                  { year: "3 Years", forecast: resultData.forecast.threeYears, emoji: "🤝" },
                  { year: "5 Years", forecast: resultData.forecast.fiveYears, emoji: "🏡" },
                  { year: "10+ Years", forecast: resultData.forecast.tenYears, emoji: "✨" },
                ].map((m, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 16, position: "relative" }}>
                    {/* Timeline bullet */}
                    <div
                      style={{
                        position: "absolute",
                        left: -13,
                        top: 4,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: "#D81B60",
                        border: "2px solid #FFFFFF",
                        boxShadow: "0 0 6px rgba(216, 27, 96, 0.4)",
                      }}
                    />
                    
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#D81B60", display: "flex", alignItems: "center", gap: 6 }}>
                        <span>{m.emoji}</span> {m.year} Forecast
                      </div>
                      <div style={{ fontSize: 13, color: cardValueColor, marginTop: 4, lineHeight: 1.4 }}>
                        {m.forecast}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Copy/Share bar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", marginTop: 8 }}>
              <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 700, color: "#FFFFFF" }}>💖 Create Your Love Details 💖</div>
              <div style={{ display: "flex", gap: 12, width: "100%", justifyContent: "center" }}>
                <button
                  onClick={handleCopyResults}
                  style={{
                    flex: 1,
                    height: 48,
                    borderRadius: 14,
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)")}
                >
                  <Copy size={15} color="#FFFFFF" />
                  Copy Report Text
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SEO Keyword & Guide Section */}
        <section
          aria-label="Love Test & Compatibility Calculator Guide"
          style={{
            marginTop: 32,
            marginBottom: 16,
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            borderRadius: 20,
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#FFFFFF",
          }}
        >
          <h1 style={{ fontSize: 20, fontWeight: 900, color: "#FF8A9E", marginBottom: 8 }}>
            Love Test by Name & Love Match Compatibility Quiz
          </h1>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255, 255, 255, 0.8)", margin: 0 }}>
            Discover your <strong>love match test</strong> score and <strong>name compatibility quiz</strong> percentage! Our free <strong>love meter</strong> and <strong>love calculator names</strong> tool analyzes name numerology, emotional vibe alignment, and marriage timeline for couples.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
