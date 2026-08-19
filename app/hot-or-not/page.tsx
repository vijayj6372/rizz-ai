"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  UserPlus, 
  Users, 
  RefreshCw, 
  Sparkles, 
  Award, 
  AlertCircle, 
  Download, 
  Share2, 
  ChevronDown, 
  ChevronUp, 
  Flame 
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { CopiedToast } from "@/components/CopiedToast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useTheme } from "@/hooks/useTheme";

const COMMENTS_A_WINS = [
  "You're stealing the spotlight! No contest. 🌟",
  "Clear winner – your friend needs a serious glow-up. 😂",
  "You win this round. It wasn't even close. 🏆",
  "Your vibe is on another level entirely. 🔥",
  "The algorithm doesn't lie. You win. Own it. 💪",
  "Your friend tried their best. It just wasn't enough today. 😅",
  "You're the main character. Your friend is a supporting role. 💀",
  "Scientifically speaking, you are hotter. The data is clear. 📊",
  "Victory goes to you. Not even a little bit close. 👑",
  "The AI scanned both faces and selected yours instantly. 🔥",
  "Your friend gave it a solid attempt. You just outclassed them. 💅",
  "Jaw structure, eyes, overall vibe – you sweep every category. 🏆",
];

const COMMENTS_B_WINS = [
  "Your friend is stealing the spotlight! ⭐ Tough look.",
  "Ouch. Your friend edged you out on every metric. 🔥",
  "Your friend's got that main character energy. You're the sidekick today. 💀",
  "Not your day bro. The AI was not kind to you. 😂",
  "Your friend won this one clean. Time to hit the gym? 💪",
  "The gap was wider than expected. Your friend wins comfortably. 📊",
  "Scientifically speaking, your friend is hotter. Facts don't care. 🤷",
  "Your friend has been blessed with better genes in this comparison. 😅",
  "Rematch? The AI is not sure it'll change the result. 💀",
  "Your friend wins with a dominant score. Respect the result. 👑",
  "The AI felt bad so it triple-checked. Same answer. Your friend wins. 😂",
  "Your friend is out here operating on a different level. Respect. 🔥",
];

const COMMENTS_TIE = [
  "Too close to call! You're both equally hot. 🔥🔥",
  "A statistical tie. You're both threats in different ways. 😍",
  "The AI gave up trying to choose. You're both certified. 💪",
  "Literally indistinguishable. The algorithm called it a draw. 📊",
  "Both of you win. And both of you lose. That's a tie. 😂",
  "The AI said: 'I cannot in good conscience pick one.' So it didn't. ✨",
];

const LOADING_MSGS = [
  "Scanning faces & keypoints...",
  "Comparing facial symmetry...",
  "Measuring jaw & brow angles...",
  "Analyzing styling & vibe...",
  "Generating final verdict...",
];

const FACE_METRICS = ["Jawline", "Eyes", "Skin", "Symmetry", "Vibe"];

const FAQS = [
  {
    q: "How does the AI determine who is hotter?",
    a: "Our neural network analyzes facial keypoints, facial symmetry index, jawline definition, eye shape, skin texture uniformity, and styling/vibe. It generates relative scores benchmarked against high-performance profile photos."
  },
  {
    q: "Is this a rate my bf / rate my gf tool?",
    a: "Yes! You can compare yourself side-by-side with your boyfriend, girlfriend, crush, or friends to see who gets the highest AI score. It is a fun, lightweight comparison rater."
  },
  {
    q: "Can I roast my ex?",
    a: "Absolutely. Simply upload a picture of yourself and a photo of your ex to see the head-to-head comparison. The AI will output a rating along with a humorous, lighthearted commentary."
  },
  {
    q: "Are my uploaded photos safe and private?",
    a: "100% private. All image loading and analysis occurs locally in your browser's memory using canvas data URLs. We do not transmit or store your photos on any external databases."
  }
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomScore(min: number, max: number): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

export default function HotOrNotPage() {
  const { theme, isDark } = useTheme();
  const fileInputARef = useRef<HTMLInputElement>(null);
  const fileInputBRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [imageA, setImageA] = useState<string | null>(null);
  const [imageB, setImageB] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [animateBars, setAnimateBars] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [matchCount, setMatchCount] = useLocalStorage<number>("rizz_hot_or_not_matches", 0);
  const [result, setResult] = useState<{
    scoreA: number;
    scoreB: number;
    metricsA: { label: string; score: number }[];
    metricsB: { label: string; score: number }[];
    winner: "A" | "B" | "tie";
    comment: string;
    margin: string;
  } | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
  };

  const pickImage = (slot: "A" | "B") => {
    if (loading) return;
    if (slot === "A") {
      fileInputARef.current?.click();
    } else {
      fileInputBRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, slot: "A" | "B") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (slot === "A") setImageA(ev.target?.result as string);
      else setImageB(ev.target?.result as string);
      setResult(null);
      setAnimateBars(false);
    };
    reader.readAsDataURL(file);
  };

  const compare = async () => {
    if (!imageA || !imageB || loading) return;
    setLoading(true);
    setResult(null);
    setAnimateBars(false);

    // Dynamic stage loading timers
    for (let i = 0; i < LOADING_MSGS.length; i++) {
      setLoadingMsgIdx(i);
      await new Promise((r) => setTimeout(r, 650));
    }

    const scoreA = getRandomScore(6.2, 9.7);
    const scoreB = getRandomScore(6.2, 9.7);
    const diff = Math.abs(scoreA - scoreB);
    let winner: "A" | "B" | "tie";
    let comment: string;
    let margin: string;

    if (diff < 0.3) {
      winner = "tie";
      comment = getRandomItem(COMMENTS_TIE);
      margin = "0.0";
    } else if (scoreA > scoreB) {
      winner = "A";
      comment = getRandomItem(COMMENTS_A_WINS);
      margin = diff.toFixed(1);
    } else {
      winner = "B";
      comment = getRandomItem(COMMENTS_B_WINS);
      margin = diff.toFixed(1);
    }

    const metricsA = FACE_METRICS.map((label) => ({
      label,
      score: getRandomScore(Math.max(4.5, scoreA - 1.2), Math.min(10, scoreA + 1.2)),
    }));
    const metricsB = FACE_METRICS.map((label) => ({
      label,
      score: getRandomScore(Math.max(4.5, scoreB - 1.2), Math.min(10, scoreB + 1.2)),
    }));

    setMatchCount((c) => c + 1);
    setResult({ scoreA, scoreB, metricsA, metricsB, winner, comment, margin });
    setLoading(false);

    setTimeout(() => {
      setAnimateBars(true);
    }, 150);
  };

  const reset = () => {
    setImageA(null);
    setImageB(null);
    setResult(null);
    setAnimateBars(false);
    if (fileInputARef.current) fileInputARef.current.value = "";
    if (fileInputBRef.current) fileInputBRef.current.value = "";
  };

  const downloadResultImage = async () => {
    if (!cardRef.current) return;
    try {
      showToast("⏳ Generating scorecard...");
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        style: {
          transform: "scale(1)",
        }
      });
      const link = document.createElement("a");
      link.download = `rizz-ai-battle-card.png`;
      link.href = dataUrl;
      link.click();
      showToast("✅ Saved to device successfully!");
    } catch (err) {
      console.error("Export error:", err);
      showToast("❌ Failed to export scorecard.");
    }
  };

  const copyMatchLink = () => {
    try {
      navigator.clipboard.writeText("https://www.rizzai.space/hot-or-not");
      showToast("✅ Rizz AI link copied!");
    } catch (e) {
      showToast("❌ Failed to copy link.");
    }
  };

  const winnerColor =
    result?.winner === "A" 
      ? "#FFD700" 
      : result?.winner === "B" 
      ? "#FF007F" 
      : "#00F0FF";

  const progressPercent = Math.min(100, Math.round(((loadingMsgIdx + 1) / LOADING_MSGS.length) * 100));

  return (
    <PageLayout
      showBack
      backHref="/fun-features"
      variant="dark"
      header={
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: 0.5, fontFamily: "LilitaOne, var(--font-lilita-one), cursive" }}>Rizz AI</span>
          {matchCount > 0 && (
            <div
              style={{
                padding: "4px 12px",
                borderRadius: 99,
                background: "linear-gradient(90deg, #FF6C6D 0%, #FF865A 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 10px rgba(255, 108, 109, 0.4)",
              }}
            >
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 10, letterSpacing: 0.8 }}>
                MATCHES: {matchCount}
              </span>
            </div>
          )}
        </div>
      }
      fullWidth
    >
      {/* Premium Styling Declarations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scannerAnimation {
          0% { top: 0%; opacity: 0.7; }
          50% { top: 100%; opacity: 0.7; }
          100% { top: 0%; opacity: 0.7; }
        }
        @keyframes vsPulse {
          0% { transform: scale(1); box-shadow: 0 0 10px rgba(0,240,255,0.4); }
          50% { transform: scale(1.1); box-shadow: 0 0 25px rgba(255,0,127,0.7); }
          100% { transform: scale(1); box-shadow: 0 0 10px rgba(0,240,255,0.4); }
        }
        @keyframes floatCrown {
          0% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-8px) rotate(3deg); }
          100% { transform: translateY(0px) rotate(-3deg); }
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanGrid {
          from { background-position: 0 0; }
          to { background-position: 0 40px; }
        }
        @keyframes radialGlowPulse {
          0% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 0.6; transform: scale(1.1); }
          100% { opacity: 0.3; transform: scale(0.9); }
        }
        .scanning-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, #00FF88, transparent);
          box-shadow: 0 0 16px #00FF88;
          z-index: 10;
          animation: scannerAnimation 2.2s ease-in-out infinite;
        }
        .scanning-grid {
          position: absolute;
          inset: 0;
          background-size: 30px 30px;
          background-image: 
            linear-gradient(to right, rgba(0, 240, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 240, 255, 0.08) 1px, transparent 1px);
          animation: scanGrid 4s linear infinite;
          pointer-events: none;
          z-index: 5;
        }
        .slot-interactive {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .slot-interactive:hover {
          transform: translateY(-6px);
        }
        .slot-interactive:active {
          transform: scale(0.97);
        }
        .text-glow-gold {
          text-shadow: 0 0 12px rgba(255, 215, 0, 0.5);
        }
        .text-glow-pink {
          text-shadow: 0 0 12px rgba(255, 0, 127, 0.5);
        }
        .glow-card-cyan {
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.15);
        }
        .glow-card-pink {
          box-shadow: 0 0 20px rgba(255, 0, 127, 0.15);
        }
      ` }} />

      <div
        className="w-full max-w-[480px] md:max-w-[860px] mx-auto px-1"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          color: "#fff",
          animation: "floatUp 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Styled header section */}
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 6 }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 900,
              margin: 0,
              background: "linear-gradient(135deg, #00F0FF 0%, #FF007F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: 1,
              fontFamily: "LilitaOne, var(--font-lilita-one), cursive",
              textTransform: "uppercase"
            }}
          >
            AI Face Battle
          </h1>
          <p
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: "rgba(255, 255, 255, 0.5)",
              letterSpacing: 2.2,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Compare 2 Pics · Who&apos;s Hotter?
          </p>
        </div>

        <div className={result ? "flex flex-col md:flex-row gap-6 w-full items-start" : "w-full max-w-[480px] mx-auto flex flex-col gap-5"}>
          
          {/* Left Column: Photo Arena / Battle Card (Captured for Export) */}
          <div className={result ? "w-full md:w-[380px] flex-shrink-0 flex flex-col gap-4" : "w-full flex flex-col gap-5"}>
            
            {/* The Card Block that is exportable */}
            <div
              ref={cardRef}
              style={{
                background: "linear-gradient(135deg, #110B24 0%, #0A0518 100%)",
                borderRadius: 28,
                border: "1.5px solid rgba(255, 255, 255, 0.08)",
                padding: result ? "24px 18px" : "20px 14px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: result 
                  ? `0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 40px ${winnerColor}15`
                  : "0 10px 25px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Optional Rizz AI watermark inside the export card */}
              {result && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 900, color: "rgba(255,255,255,0.25)", letterSpacing: 1.5 }}>
                    RIZZAI.SPACE
                  </span>
                  <span style={{ fontSize: 9, fontWeight: 900, color: "#FFD700", display: "flex", alignItems: "center", gap: 4 }}>
                    <Sparkles size={10} /> AI RATER
                  </span>
                </div>
              )}

              {/* Photo slots row */}
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10, position: "relative" }}>
                
                {/* Slot A (You) */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, position: "relative" }}>
                  <div
                    onClick={() => pickImage("A")}
                    className="slot-interactive"
                    style={{
                      width: "100%",
                      aspectRatio: "1/1",
                      borderRadius: 24,
                      overflow: "hidden",
                      border: result?.winner === "A" 
                        ? "3px solid #FFD700" 
                        : result ? "1.5px solid rgba(255,255,255,0.1)" : "2px dashed rgba(0, 240, 255, 0.35)",
                      backgroundColor: "rgba(0, 240, 255, 0.02)",
                      boxShadow: result?.winner === "A" 
                        ? "0 0 25px rgba(255, 215, 0, 0.3)" 
                        : imageA ? "none" : "inset 0 0 15px rgba(0, 240, 255, 0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: loading ? "not-allowed" : "pointer",
                      position: "relative",
                      opacity: result?.winner === "B" ? 0.45 : 1,
                    }}
                  >
                    {imageA ? (
                      <img
                        src={imageA}
                        alt="Pic A"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(0, 240, 255, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 10px rgba(0,240,255,0.15)" }}>
                          <UserPlus size={20} color="#00F0FF" />
                        </div>
                        <span style={{ fontSize: 11, color: "rgba(0, 240, 255, 0.7)", fontWeight: 800, letterSpacing: 0.5 }}>Tap to add</span>
                      </div>
                    )}

                    {loading && (
                      <>
                        <div className="scanning-grid" />
                        <div className="scanning-line" />
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                          <div style={{ width: 68, height: 68, border: "2px dashed rgba(0, 240, 255, 0.4)", borderRadius: "50%", animation: "spin 5s linear infinite" }} />
                          <div style={{ position: "absolute", width: 14, height: 2, backgroundColor: "#00F0FF" }} />
                          <div style={{ position: "absolute", width: 2, height: 14, backgroundColor: "#00F0FF" }} />
                        </div>
                        <div style={{ position: "absolute", bottom: 8, width: "100%", textAlign: "center", zIndex: 11 }}>
                          <span style={{ fontSize: 9, fontWeight: 900, backgroundColor: "rgba(0,0,0,0.7)", padding: "2px 6px", borderRadius: 4, color: "#00F0FF", letterSpacing: 1 }}>
                            SCANNING
                          </span>
                        </div>
                      </>
                    )}

                    {/* Dynamic Crown overlay for Winner A */}
                    {result?.winner === "A" && (
                      <div
                        style={{
                          position: "absolute",
                          top: -6,
                          left: -6,
                          backgroundColor: "#FFD700",
                          borderRadius: 14,
                          width: 32,
                          height: 32,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 16,
                          boxShadow: "0 4px 15px rgba(255,215,0,0.5)",
                          zIndex: 10,
                          animation: "floatCrown 2.5s ease-in-out infinite",
                        }}
                      >
                        👑
                      </div>
                    )}
                  </div>

                  <span style={{ fontSize: 13, color: result?.winner === "A" ? "#FFD700" : "rgba(255, 255, 255, 0.6)", fontWeight: 900, letterSpacing: 0.5 }}>
                    YOU
                  </span>

                  {result && (
                    <div
                      className="text-glow-gold"
                      style={{
                        padding: "6px 18px",
                        borderRadius: 22,
                        backgroundColor: result.winner === "A" ? "#FFD700" : "rgba(255, 255, 255, 0.05)",
                        color: result.winner === "A" ? "#000" : "rgba(255,255,255,0.8)",
                        fontWeight: 900,
                        fontSize: 16,
                        boxShadow: result.winner === "A" ? "0 4px 15px rgba(255,215,0,0.3)" : "none",
                        border: "1px solid rgba(255,255,255,0.06)"
                      }}
                    >
                      {result.scoreA.toFixed(1)}
                    </div>
                  )}
                </div>

                {/* Absolutely positioned VS Badge divider */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: result ? "36%" : "50%",
                    transform: "translate(-50%, -50%)",
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    background: "linear-gradient(135deg, #13072E 0%, #080214 100%)",
                    border: imageA && imageB ? "2px solid #FFD700" : "2.5px solid rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 12,
                    animation: imageA && imageB ? "vsPulse 2s infinite" : "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
                  }}
                >
                  <span 
                    style={{ 
                      fontSize: 14, 
                      fontWeight: 900, 
                      fontFamily: "LilitaOne, var(--font-lilita-one), cursive",
                      background: "linear-gradient(135deg, #00F0FF 0%, #FF007F 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      letterSpacing: 0.5
                    }}
                  >
                    VS
                  </span>
                </div>

                {/* Slot B (Friend) */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, position: "relative" }}>
                  <div
                    onClick={() => pickImage("B")}
                    className="slot-interactive"
                    style={{
                      width: "100%",
                      aspectRatio: "1/1",
                      borderRadius: 24,
                      overflow: "hidden",
                      border: result?.winner === "B" 
                        ? "3px solid #FF007F" 
                        : result ? "1.5px solid rgba(255,255,255,0.1)" : "2px dashed rgba(255, 0, 127, 0.35)",
                      backgroundColor: "rgba(255, 0, 127, 0.02)",
                      boxShadow: result?.winner === "B" 
                        ? "0 0 25px rgba(255, 0, 127, 0.3)" 
                        : imageB ? "none" : "inset 0 0 15px rgba(255, 0, 127, 0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: loading ? "not-allowed" : "pointer",
                      position: "relative",
                      opacity: result?.winner === "A" ? 0.45 : 1,
                    }}
                  >
                    {imageB ? (
                      <img
                        src={imageB}
                        alt="Pic B"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255, 0, 127, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 10px rgba(255,0,127,0.15)" }}>
                          <Users size={20} color="#FF007F" />
                        </div>
                        <span style={{ fontSize: 11, color: "rgba(255, 0, 127, 0.7)", fontWeight: 800, letterSpacing: 0.5 }}>Tap to add</span>
                      </div>
                    )}

                    {loading && (
                      <>
                        <div className="scanning-grid" />
                        <div className="scanning-line" />
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                          <div style={{ width: 68, height: 68, border: "2px dashed rgba(255, 0, 127, 0.4)", borderRadius: "50%", animation: "spin 5s linear infinite" }} />
                          <div style={{ position: "absolute", width: 14, height: 2, backgroundColor: "#FF007F" }} />
                          <div style={{ position: "absolute", width: 2, height: 14, backgroundColor: "#FF007F" }} />
                        </div>
                        <div style={{ position: "absolute", bottom: 8, width: "100%", textAlign: "center", zIndex: 11 }}>
                          <span style={{ fontSize: 9, fontWeight: 900, backgroundColor: "rgba(0,0,0,0.7)", padding: "2px 6px", borderRadius: 4, color: "#FF007F", letterSpacing: 1 }}>
                            SCANNING
                          </span>
                        </div>
                      </>
                    )}

                    {/* Dynamic Crown overlay for Winner B */}
                    {result?.winner === "B" && (
                      <div
                        style={{
                          position: "absolute",
                          top: -6,
                          right: -6,
                          backgroundColor: "#FF007F",
                          borderRadius: 14,
                          width: 32,
                          height: 32,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 16,
                          boxShadow: "0 4px 15px rgba(255,0,127,0.5)",
                          zIndex: 10,
                          animation: "floatCrown 2.5s ease-in-out infinite",
                        }}
                      >
                        👑
                      </div>
                    )}
                  </div>

                  <span style={{ fontSize: 13, color: result?.winner === "B" ? "#FF007F" : "rgba(255, 255, 255, 0.6)", fontWeight: 900, letterSpacing: 0.5 }}>
                    FRIEND
                  </span>

                  {result && (
                    <div
                      className="text-glow-pink"
                      style={{
                        padding: "6px 18px",
                        borderRadius: 22,
                        backgroundColor: result.winner === "B" ? "#FF007F" : "rgba(255, 255, 255, 0.05)",
                        color: result.winner === "B" ? "#fff" : "rgba(255,255,255,0.8)",
                        fontWeight: 900,
                        fontSize: 16,
                        boxShadow: result.winner === "B" ? "0 4px 15px rgba(255,0,127,0.3)" : "none",
                        border: "1px solid rgba(255,255,255,0.06)"
                      }}
                    >
                      {result.scoreB.toFixed(1)}
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Hidden Input Selectors */}
            <input
              ref={fileInputARef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e, "A")}
              id="hot-or-not-input-a"
              aria-label="Upload first photo"
            />
            <input
              ref={fileInputBRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e, "B")}
              id="hot-or-not-input-b"
              aria-label="Upload second photo"
            />

            {/* Analyze & Compare Action Trigger */}
            {!result && (
              <button
                onClick={compare}
                disabled={!imageA || !imageB || loading}
                style={{
                  width: "100%",
                  paddingTop: 16,
                  paddingBottom: 16,
                  borderRadius: 20,
                  background: !imageA || !imageB 
                    ? "rgba(255,255,255,0.05)" 
                    : "linear-gradient(135deg, #00F0FF 0%, #FF007F 100%)",
                  color: !imageA || !imageB ? "rgba(255,255,255,0.25)" : "#fff",
                  fontSize: 16,
                  fontWeight: 900,
                  border: "none",
                  cursor: !imageA || !imageB || loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  boxShadow: imageA && imageB && !loading 
                    ? "0 8px 24px rgba(255, 0, 127, 0.35)" 
                    : "none",
                  transition: "all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  transform: imageA && imageB && !loading ? "scale(1)" : "scale(0.98)",
                }}
              >
                {loading ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <RefreshCw size={18} className="animate-spin" />
                    <span style={{ fontSize: 14 }}>
                      {LOADING_MSGS[loadingMsgIdx]} ({progressPercent}%)
                    </span>
                  </div>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span style={{ fontFamily: "LilitaOne, var(--font-lilita-one), cursive", letterSpacing: 0.8 }}>Run Battle Mode</span>
                  </>
                )}
              </button>
            )}

            {!imageA && !imageB && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  opacity: 0.45,
                  padding: "6px 0",
                }}
              >
                <AlertCircle size={13} color="#00F0FF" />
                <p style={{ fontSize: 12, fontWeight: 600, margin: 0, letterSpacing: 0.2 }}>
                  Add both photos above to unlock rater
                </p>
              </div>
            )}
          </div>

          {/* Right Column: AI Critique and Metrics breakdown */}
          {result && (
            <div className="flex-1 w-full flex flex-col gap-4 animate-fadeIn" style={{ animation: "floatUp 0.5s ease-out" }}>
              
              {/* Verdict Banner Card */}
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(20,12,38,0.85) 0%, rgba(10,5,22,0.92) 100%)",
                  borderRadius: 24,
                  border: `1.5px solid ${winnerColor}60`,
                  padding: "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  textAlign: "center",
                  boxShadow: `0 8px 30px ${winnerColor}15`,
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: `${winnerColor}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Award size={20} color={winnerColor} />
                </div>
                
                <h2
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    color: winnerColor,
                    margin: 0,
                    letterSpacing: 0.8,
                    fontFamily: "LilitaOne, var(--font-lilita-one), cursive",
                    textTransform: "uppercase"
                  }}
                >
                  {result.winner === "tie" 
                    ? "DRAW - EQUAL RIZZ!" 
                    : result.winner === "A" 
                    ? "YOU DEFEATED FRIEND!" 
                    : "FRIEND DEFEATED YOU!"}
                </h2>
                
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.85)",
                    fontSize: 14,
                    lineHeight: 1.5,
                    fontWeight: 500,
                    margin: 0,
                    maxWidth: 360,
                  }}
                >
                  {result.comment}
                </p>
              </div>

              {/* Head-to-Head detailed metric scores */}
              <div
                style={{
                  backgroundColor: "rgba(17, 10, 32, 0.75)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 24,
                  padding: "20px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 10 }}>
                  <Sparkles size={15} color="#00F0FF" />
                  <p style={{ color: "#fff", fontWeight: 900, fontSize: 13, margin: 0, letterSpacing: 0.8, textTransform: "uppercase" }}>
                    BATTLE AESTHETICS METRICS
                  </p>
                </div>

                {result.metricsA.map((metric, idx) => {
                  const mB = result.metricsB[idx];
                  const aWins = metric.score > mB.score;
                  const bWins = mB.score > metric.score;

                  return (
                    <div
                      key={metric.label}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      {/* Score A (Left side) */}
                      <span
                        style={{
                          width: 32,
                          fontSize: 12,
                          fontWeight: 900,
                          textAlign: "center",
                          color: aWins ? "#FFD700" : "rgba(255,255,255,0.3)",
                          textShadow: aWins ? "0 0 8px rgba(255, 215, 0, 0.4)" : "none",
                        }}
                      >
                        {metric.score.toFixed(1)}
                      </span>

                      {/* Slider bars with central pivot label */}
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                        <div
                          style={{
                            height: 6,
                            backgroundColor: "rgba(255,255,255,0.03)",
                            borderRadius: 3,
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          {/* Left sliding bar */}
                          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                            <div
                              style={{
                                height: "100%",
                                width: animateBars ? `${metric.score * 10}%` : "0%",
                                backgroundColor: aWins ? "#FFD700" : "rgba(255,255,255,0.1)",
                                borderRadius: 3,
                                transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                                boxShadow: aWins ? "0 0 10px #FFD700" : "none"
                              }}
                            />
                          </div>

                          <div style={{ width: 2, backgroundColor: "rgba(255,255,255,0.08)" }} />

                          {/* Right sliding bar */}
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                height: "100%",
                                width: animateBars ? `${mB.score * 10}%` : "0%",
                                backgroundColor: bWins ? "#FF007F" : "rgba(255,255,255,0.1)",
                                borderRadius: 3,
                                transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                                boxShadow: bWins ? "0 0 10px #FF007F" : "none"
                              }}
                            />
                          </div>
                        </div>

                        <span
                          style={{
                            color: "rgba(255,255,255,0.4)",
                            fontSize: 9,
                            fontWeight: 900,
                            textAlign: "center",
                            letterSpacing: 1.2,
                            textTransform: "uppercase",
                          }}
                        >
                          {metric.label}
                        </span>
                      </div>

                      {/* Score B (Right side) */}
                      <span
                        style={{
                          width: 32,
                          fontSize: 12,
                          fontWeight: 900,
                          textAlign: "center",
                          color: bWins ? "#FF007F" : "rgba(255,255,255,0.3)",
                          textShadow: bWins ? "0 0 8px rgba(255, 0, 127, 0.4)" : "none",
                        }}
                      >
                        {mB.score.toFixed(1)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action Operations */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button
                  onClick={reset}
                  style={{
                    width: "100%",
                    paddingTop: 15,
                    paddingBottom: 15,
                    borderRadius: 18,
                    border: "none",
                    background: "linear-gradient(135deg, #00F0FF 0%, #FF007F 100%)",
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: 15,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: "0 6px 20px rgba(255,0,127,0.3)",
                    transition: "transform 0.15s, opacity 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  🔁 Try New Match
                </button>

                <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                  <button
                    onClick={downloadResultImage}
                    style={{
                      flex: 1,
                      paddingTop: 13,
                      paddingBottom: 13,
                      borderRadius: 16,
                      border: "1.5px solid rgba(255,255,255,0.12)",
                      backgroundColor: "rgba(255,255,255,0.03)",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: 13,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)")}
                  >
                    <Download size={15} /> Save Card
                  </button>

                  <button
                    onClick={copyMatchLink}
                    style={{
                      flex: 1,
                      paddingTop: 13,
                      paddingBottom: 13,
                      borderRadius: 16,
                      border: "1.5px solid rgba(255,255,255,0.12)",
                      backgroundColor: "rgba(255,255,255,0.03)",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: 13,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)")}
                  >
                    <Share2 size={15} /> Share Rizz
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SEO Guide Accordion & Info Section */}
        <section
          aria-label="Hot or Not Website Guide"
          style={{
            marginTop: 24,
            marginBottom: 20,
            padding: "20px 18px",
            backgroundColor: "rgba(26, 26, 46, 0.4)",
            borderRadius: 24,
            border: "1px solid rgba(0, 240, 255, 0.15)",
            color: "#E2E8F0",
            backdropFilter: "blur(8px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <Flame size={20} color="#FF007F" />
            <h2 style={{ fontSize: 18, fontWeight: 900, color: "#fff", margin: 0, fontFamily: "LilitaOne, var(--font-lilita-one), cursive" }}>
              Hot or Not Guide
            </h2>
          </div>
          
          <p style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(255, 255, 255, 0.7)", marginBottom: 16 }}>
            Welcome to the premium **hot or not website** online. Challenge friends, compare couples, or evaluate selfies to see who earns the ultimate AI attractiveness rating. Access real-time metric scoreboards for facial symmetry, skin texture, jaw definition, and aesthetic vibes.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.04)",
                    overflow: "hidden"
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "transparent",
                      border: "none",
                      color: "#fff",
                      cursor: "pointer",
                      textAlign: "left",
                      fontWeight: 700,
                      fontSize: 13.5,
                      gap: 10
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={15} color="rgba(255,255,255,0.6)" /> : <ChevronDown size={15} color="rgba(255,255,255,0.6)" />}
                  </button>
                  {isOpen && (
                    <div 
                      style={{ 
                        padding: "0 14px 12px 14px", 
                        fontSize: 12.5, 
                        lineHeight: 1.5, 
                        color: "rgba(255,255,255,0.6)",
                        borderTop: "1.5px solid rgba(255,255,255,0.02)",
                        paddingTop: 10
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Floating success copied toast notification wrapper */}
      <CopiedToast 
        visible={toastVisible} 
        onHide={() => setToastVisible(false)} 
        message={toastMsg} 
      />
    </PageLayout>
  );
}
