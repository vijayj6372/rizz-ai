"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Heart, RefreshCw, Copy, Sparkles, MessageSquare, Download, Share2, AlertCircle } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { CopiedToast } from "@/components/CopiedToast";
import { HeaderTitle } from "@/components/HeaderTitle";
import { CRUSH_COMMENTS } from "@/data/crushAnalysisData";

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const BADGES = [
  "Solid 5 Energy 🐝",
  "Top Tier Rizz 👑",
  "Wife Material 💍",
  "Husband Material 🥂",
  "Dangerous Vibe ⚡",
  "Pure Gold ✨"
];

const RECOMMENDATIONS = [
  { verdict: "MARRY THEM", text: "Absolute catch. Send that text right now!" },
  { verdict: "GO FOR IT", text: "High potential. They are definitely interested." },
  { verdict: "WHY NOT", text: "Decent but you could aim higher." },
  { verdict: "DANGER ZONE", text: "High risk of heartbreak. Proceed with caution." }
];

const LOADING_PHRASES = [
  "Scanning facial keypoints...",
  "Analyzing facial geometry...",
  "Computing symmetry & attraction...",
  "Measuring partner chemistry...",
  "Formulating final verdict..."
];

export default function RateMyCrushPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [yourName, setYourName] = useState("");
  const [crushName, setCrushName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [animateBars, setAnimateBars] = useState(false);

  // Result parameters
  const [score, setScore] = useState<number>(7.7);
  const [badge, setBadge] = useState<string>("Wife Material 💍");
  const [datingPotential, setDatingPotential] = useState<number>(70);
  const [verdict, setVerdict] = useState<string>("GO FOR IT");
  const [verdictDesc, setVerdictDesc] = useState<string>("High potential. They are definitely interested.");
  const [comment, setComment] = useState<string>("");
  const [breakdown, setBreakdown] = useState<{ label: string; val: number }[]>([]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target?.result as string);
      setHasRated(false);
      setAnimateBars(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!imagePreview || isAnalyzing) return;
    setIsAnalyzing(true);
    setAnimateBars(false);

    // Simulate cybernetic analyzer sequence
    for (let i = 0; i < LOADING_PHRASES.length; i++) {
      setLoadingStage(i);
      await new Promise((r) => setTimeout(r, 550));
    }

    const rawScore = parseFloat((Math.random() * (9.5 - 4.5) + 4.5).toFixed(1));
    setScore(rawScore);
    setBadge(getRandomItem(BADGES));
    setDatingPotential(Math.min(99, Math.max(15, Math.floor(rawScore * 10 - Math.random() * 8))));

    let rec = RECOMMENDATIONS[2];
    if (rawScore >= 8.5) rec = RECOMMENDATIONS[0];
    else if (rawScore >= 7.0) rec = RECOMMENDATIONS[1];
    else if (rawScore < 5.3) rec = RECOMMENDATIONS[3];

    setVerdict(rec.verdict);
    setVerdictDesc(rec.text);

    const generatedBreakdown = [
      { label: "Attractiveness", val: parseFloat((rawScore + (Math.random() * 1.6 - 0.8)).toFixed(1)) },
      { label: "Rizz Potential", val: parseFloat((rawScore + (Math.random() * 1.6 - 0.8)).toFixed(1)) },
      { label: "Partner Energy", val: parseFloat((rawScore + (Math.random() * 1.6 - 0.8)).toFixed(1)) },
      { label: "Face Symmetry", val: parseFloat((rawScore + (Math.random() * 1.6 - 0.8)).toFixed(1)) },
      { label: "Vibe Score", val: parseFloat((rawScore + (Math.random() * 1.6 - 0.8)).toFixed(1)) },
    ].map(m => ({
      ...m,
      val: Math.min(10, Math.max(2, m.val))
    }));

    setBreakdown(generatedBreakdown);
    setComment(getRandomItem(CRUSH_COMMENTS));
    setIsAnalyzing(false);
    setHasRated(true);

    setTimeout(() => {
      setAnimateBars(true);
    }, 150);
  };

  const copyVerdictText = () => {
    const textToCopy = `Rizz AI Crush Rating: ${score}/10 | Potential: ${datingPotential}%\nRecommendation: ${verdict} - ${verdictDesc}\n"${comment}"`;
    try {
      navigator.clipboard.writeText(textToCopy);
      showToast("✅ Scorecard verdict copied!");
    } catch {
      showToast("❌ Failed to copy to clipboard.");
    }
  };

  const triggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const reset = () => {
    setImagePreview(null);
    setHasRated(false);
    setAnimateBars(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const downloadCardImage = async () => {
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
      link.download = `rizz-ai-crush-card.png`;
      link.href = dataUrl;
      link.click();
      showToast("✅ Card saved successfully!");
    } catch (err) {
      console.error("Export error:", err);
      showToast("❌ Failed to save scorecard image.");
    }
  };

  // Get dynamic colors based on recommendation
  const getVerdictTheme = (v: string) => {
    switch (v) {
      case "MARRY THEM":
        return { color: "#00CFA8", bg: "rgba(0, 207, 168, 0.04)", border: "rgba(0, 207, 168, 0.25)" };
      case "GO FOR IT":
        return { color: "#D946EF", bg: "rgba(217, 70, 239, 0.04)", border: "rgba(217, 70, 239, 0.25)" };
      case "WHY NOT":
        return { color: "#FFA726", bg: "rgba(255, 167, 38, 0.04)", border: "rgba(255, 167, 38, 0.25)" };
      case "DANGER ZONE":
        return { color: "#F86B6D", bg: "rgba(248, 107, 109, 0.04)", border: "rgba(248, 107, 109, 0.25)" };
      default:
        return { color: "#D946EF", bg: "rgba(217, 70, 239, 0.04)", border: "rgba(217, 70, 239, 0.25)" };
    }
  };

  const vTheme = getVerdictTheme(verdict);
  const progressPercent = Math.min(100, Math.round(((loadingStage + 1) / LOADING_PHRASES.length) * 100));

  return (
    <PageLayout
      showBack
      backHref="/fun-features"
      variant="dark"
      header={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: 0.5, fontFamily: "LilitaOne, var(--font-lilita-one), cursive" }}>Rizz AI</span>
          <div
            style={{
              padding: "3px 10px",
              borderRadius: 99,
              backgroundColor: "rgba(217, 70, 239, 0.15)",
              border: "1.5px solid rgba(217, 70, 239, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#D946EF", fontWeight: 900, fontSize: 10, letterSpacing: 0.5 }}>
              CRUSH RATER
            </span>
          </div>
        </div>
      }
      fullWidth
    >
      {/* Keyframe & Custom class styling injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heartbeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.1); }
          28% { transform: scale(1); }
          42% { transform: scale(1.1); }
          70% { transform: scale(1); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanLines {
          from { background-position: 0 0; }
          to { background-position: 0 30px; }
        }
        .pulse-heart {
          animation: heartbeat 1.8s infinite ease-in-out;
        }
        .animate-slide-up {
          animation: fadeSlideUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .interactive-card {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .interactive-card:hover {
          transform: translateY(-4px);
        }
        .slot-interactive {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .slot-interactive:hover {
          transform: translateY(-4px);
          border-color: #D946EF !important;
          box-shadow: 0 0 15px rgba(217, 70, 239, 0.2);
        }
        .scanning-grid-hud {
          position: absolute;
          inset: 0;
          background-size: 20px 20px;
          background-image: 
            linear-gradient(to right, rgba(217, 70, 239, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(217, 70, 239, 0.08) 1px, transparent 1px);
          animation: scanGrid 5s linear infinite;
          pointer-events: none;
          z-index: 5;
        }
      ` }} />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="crush-file-input"
        aria-label="Upload photo of your crush"
      />

      {/* Futuristic analysis loader */}
      {isAnalyzing && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(8, 2, 26, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(20, 10, 35, 0.95)",
              padding: "28px 36px",
              borderRadius: 24,
              border: "1px solid rgba(217, 70, 239, 0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 15px 40px rgba(0,0,0,0.5), 0 0 25px rgba(217, 70, 239, 0.15)",
              width: "100%",
              maxWidth: 320,
              textAlign: "center"
            }}
          >
            <div style={{ position: "relative", width: 60, height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <RefreshCw size={36} color="#D946EF" style={{ animation: "spin 1.4s linear infinite" }} />
              <Heart size={16} color="#D946EF" fill="#D946EF" style={{ position: "absolute", animation: "pulse 1.2s infinite ease-in-out" }} />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 16, letterSpacing: 0.5 }}>
                Analyzing Crush...
              </span>
              <span style={{ color: "#D946EF", fontWeight: 800, fontSize: 12, opacity: 0.9 }}>
                {LOADING_PHRASES[loadingStage]}
              </span>
            </div>

            {/* Micro progress bar */}
            <div style={{ width: "100%", height: 4, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden", marginTop: 4 }}>
              <div style={{ width: `${progressPercent}%`, height: "100%", backgroundColor: "#D946EF", transition: "width 0.4s ease" }} />
            </div>
          </div>
        </div>
      )}

      {/* Main Container Wrapper */}
      <div className="w-full max-w-[420px] md:max-w-[860px] mx-auto px-1" style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
        
        {!hasRated ? (
          /* STATE 1: INITIAL UPLOAD VIEW */
          <div className="animate-slide-up max-w-[420px] mx-auto w-full flex flex-col gap-5" style={{ flex: 1 }}>
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 5 }}>
              <p
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.45)",
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Honest AI Rater · No Sugarcoating
              </p>
            </div>

            {/* Names Input Form */}
            <div 
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                padding: "16px 14px",
                borderRadius: 20,
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 10, fontWeight: 900, color: "rgba(255,255,255,0.5)", letterSpacing: 0.5 }}>YOUR NAME</label>
                <input
                  type="text"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  placeholder="Your name"
                  style={{
                    width: "100%",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 12,
                    padding: "10px 12px",
                    fontSize: 13,
                    color: "#fff",
                    outline: "none",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 10, fontWeight: 900, color: "rgba(255,255,255,0.5)", letterSpacing: 0.5 }}>CRUSH&apos;S NAME</label>
                <input
                  type="text"
                  value={crushName}
                  onChange={(e) => setCrushName(e.target.value)}
                  placeholder="Crush's name"
                  style={{
                    width: "100%",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 12,
                    padding: "10px 12px",
                    fontSize: 13,
                    color: "#fff",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Dotted Upload Card Zone */}
            <div
              onClick={triggerUpload}
              className="slot-interactive"
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                border: "2px dashed rgba(217, 70, 239, 0.3)",
                borderRadius: 28,
                padding: imagePreview ? "12px" : "70px 24px",
                backgroundColor: "rgba(217, 70, 239, 0.01)",
                transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                position: "relative",
                aspectRatio: imagePreview ? "1/1" : "auto",
                overflow: "hidden",
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)"
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && triggerUpload()}
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Crush photo preview"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: "rgba(8, 2, 26, 0.75)",
                      padding: "10px 0",
                      textAlign: "center",
                      backdropFilter: "blur(6px)",
                      borderTop: "1px solid rgba(255,255,255,0.08)"
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 800, color: "#D946EF", letterSpacing: 0.5 }}>
                      Tap to replace photo
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="pulse-heart" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 68, height: 68, borderRadius: 34, backgroundColor: "rgba(217,70,239,0.1)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 15px rgba(217,70,239,0.15)" }}>
                      <Heart size={32} color="#D946EF" fill="#D946EF" />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center", textAlign: "center" }}>
                    <p style={{ fontSize: 17, fontWeight: 900, color: "#FFFFFF", margin: 0, letterSpacing: 0.2 }}>
                      Upload Photo of Your Crush
                    </p>
                    <p style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.45)", margin: 0, fontWeight: 500 }}>
                      Supports selfies, profile screenshots, or casual pics
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Primary Rating Action Button */}
            <button
              onClick={handleAnalyze}
              disabled={!imagePreview || isAnalyzing}
              style={{
                width: "100%",
                paddingTop: 16,
                paddingBottom: 16,
                borderRadius: 22,
                backgroundColor: imagePreview ? "#D946EF" : "rgba(255,255,255,0.05)",
                color: imagePreview ? "#FFFFFF" : "rgba(255,255,255,0.25)",
                fontSize: 16,
                fontWeight: 900,
                border: "none",
                cursor: !imagePreview || isAnalyzing ? "not-allowed" : "pointer",
                boxShadow: imagePreview ? "0 6px 20px rgba(217, 70, 239, 0.3)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",
                transform: imagePreview ? "scale(1)" : "scale(0.98)"
              }}
            >
              <Heart size={16} fill={imagePreview ? "#fff" : "none"} stroke={imagePreview ? "#fff" : "currentColor"} />
              <span style={{ fontFamily: "LilitaOne, var(--font-lilita-one), cursive", letterSpacing: 0.8 }}>Rate Crush Now</span>
            </button>

            {/* Safety metrics footer */}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0 8px", marginTop: "auto", opacity: 0.35 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: 0.5 }}>🔒 PRIVATE PROCESSING</span>
              <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: 0.5 }}>⚡ INSTANT RUN</span>
              <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: 0.5 }}>✨ SECURE SSL</span>
            </div>
          </div>
        ) : (
          /* STATE 2: COMPLETED RATING RESULT VIEW */
          <div className="animate-slide-up flex flex-col md:flex-row gap-6 w-full items-start" style={{ paddingBottom: 30 }}>
            
            {/* Left Column: Overhauled Crush Profile Card & Operations */}
            <div className="w-full md:w-[360px] flex-shrink-0 flex flex-col gap-4">
              
              {/* Overhauled Card Capture Block */}
              <div
                ref={cardRef}
                style={{
                  backgroundColor: "#110B24",
                  border: "1.5px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 28,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.5), inset 0 0 30px rgba(217, 70, 239, 0.05)"
                }}
              >
                {/* Watermark header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 9, fontWeight: 900, color: "rgba(255,255,255,0.25)", letterSpacing: 1.5 }}>
                    RIZZAI.SPACE
                  </span>
                  <span style={{ fontSize: 9, fontWeight: 900, color: "#D946EF", display: "flex", alignItems: "center", gap: 4 }}>
                    <Sparkles size={10} /> CRUSH RATER
                  </span>
                </div>

                {/* Overhauled LARGE Photo display */}
                <div 
                  style={{ 
                    width: "100%", 
                    height: 270, 
                    borderRadius: 22, 
                    overflow: "hidden", 
                    position: "relative",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.3)"
                  }}
                >
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Crush profile display"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  )}

                  {/* Frosted details banner overlay overlayed on photo bottom */}
                  <div 
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(to top, rgba(8, 2, 22, 0.95) 0%, rgba(8, 2, 22, 0.45) 100%)",
                      backdropFilter: "blur(6px)",
                      padding: "16px 14px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                      <span style={{ fontSize: 16, fontWeight: 900, color: "#fff", letterSpacing: 0.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {crushName ? crushName.toUpperCase() : "YOUR CRUSH"}
                      </span>
                      <span style={{ fontSize: 9, fontWeight: 900, color: "#D946EF", letterSpacing: 1.2 }}>
                        {badge.toUpperCase()}
                      </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 8, fontWeight: 900, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>RATING</span>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                        <span style={{ fontSize: 22, fontWeight: 950, color: "#D946EF" }}>{score}</span>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 800 }}>/10</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-photo ratings metrics */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  
                  {/* Star Score representation */}
                  <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 14 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: 20,
                          color: s <= Math.round(score / 2) ? "#D946EF" : "rgba(255,255,255,0.12)",
                          textShadow: s <= Math.round(score / 2) ? "0 0 10px rgba(217, 70, 239, 0.4)" : "none"
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Dating Potential Rounded Slider */}
                  <div
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: 16,
                      padding: "10px 14px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 4
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 900, color: "rgba(255,255,255,0.45)", letterSpacing: 0.5, flexShrink: 0 }}>
                      DATING POTENTIAL
                    </span>

                    {/* Progress Slider track */}
                    <div style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: animateBars ? `${datingPotential}%` : "0%",
                          backgroundColor: "#D946EF",
                          boxShadow: "0 0 10px #D946EF",
                          borderRadius: 3,
                          transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      />
                    </div>

                    <span style={{ fontSize: 13, fontWeight: 950, color: "#D946EF", flexShrink: 0 }}>
                      {datingPotential}%
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Operations Grid */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {/* Reset button */}
                <button
                  onClick={reset}
                  style={{
                    width: "100%",
                    paddingTop: 15,
                    paddingBottom: 15,
                    borderRadius: 18,
                    border: "none",
                    background: "linear-gradient(135deg, #00F0FF 0%, #D946EF 100%)",
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: 15,
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(217, 70, 239, 0.25)",
                    transition: "transform 0.15s, opacity 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  🔁 Rate Another Crush
                </button>

                <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                  <button
                    onClick={downloadCardImage}
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
                    onClick={copyVerdictText}
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

            {/* Right Column: AI Analysis & Breakdown Details */}
            <div className="flex-1 w-full flex flex-col gap-4">
              
              {/* Dynamic themed Recommendation Card */}
              <div
                className="interactive-card"
                style={{
                  backgroundColor: "rgba(20,10,35,0.75)",
                  border: `1.5px solid ${vTheme.border}`,
                  borderRadius: 24,
                  padding: "18px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 6,
                  boxShadow: `0 8px 24px ${vTheme.color}10`,
                  backdropFilter: "blur(10px)"
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 900, color: "rgba(255,255,255,0.45)", letterSpacing: 1.5 }}>
                  AI RECOMMENDATION
                </span>
                
                <h3 
                  style={{ 
                    fontSize: 24, 
                    fontWeight: 950, 
                    color: vTheme.color, 
                    margin: 0, 
                    letterSpacing: 0.5,
                    fontFamily: "LilitaOne, var(--font-lilita-one), cursive",
                    textShadow: `0 0 10px ${vTheme.color}35`
                  }}
                >
                  {verdict}
                </h3>
                
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", fontWeight: 500, margin: 0, maxWidth: 300 }}>
                  {verdictDesc}
                </p>
              </div>

              {/* Detailed head-to-head metrics breakdown */}
              <div
                className="interactive-card"
                style={{
                  backgroundColor: "rgba(17,10,32,0.75)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 24,
                  padding: "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                  backdropFilter: "blur(10px)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 10 }}>
                  <Sparkles size={15} color="#D946EF" />
                  <h4 style={{ fontSize: 14, fontWeight: 900, color: "#FFFFFF", margin: 0, letterSpacing: 0.8, textTransform: "uppercase" }}>
                    CRUSH ATTRACTIVENESS breakdown
                  </h4>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {breakdown.map((item) => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {/* Label */}
                      <span style={{ width: 110, fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.45)", letterSpacing: 0.2 }}>
                        {item.label}
                      </span>

                      {/* Progress slider */}
                      <div style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
                        <div
                          style={{
                            height: "100%",
                            width: animateBars ? `${item.val * 10}%` : "0%",
                            backgroundColor: "#D946EF",
                            boxShadow: "0 0 8px #D946EF",
                            borderRadius: 4,
                            transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                          }}
                        />
                      </div>

                      {/* Score Badge */}
                      <span style={{ width: 28, fontSize: 13, fontWeight: 950, color: "#D946EF", textAlign: "right" }}>
                        {item.val.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Analysis Quote bubble */}
              <div
                className="interactive-card"
                style={{
                  backgroundColor: "rgba(20,10,35,0.75)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 24,
                  padding: "18px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                  backdropFilter: "blur(10px)",
                  position: "relative"
                }}
              >
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <MessageSquare size={15} color="rgba(255,255,255,0.4)" />
                    <span style={{ fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.45)", letterSpacing: 0.8 }}>
                      AI CRITIQUE
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(comment);
                      showToast("✅ Critique copied!");
                    }}
                    style={{
                      border: "1.5px solid rgba(255,255,255,0.1)",
                      backgroundColor: "rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.6)",
                      borderRadius: 10,
                      padding: "4px 10px",
                      fontSize: 10,
                      fontWeight: 800,
                      cursor: "pointer",
                      transition: "all 0.15s",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)")}
                  >
                    <Copy size={10} />
                    Copy
                  </button>
                </div>

                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, fontWeight: 500, margin: 0, paddingLeft: 4 }}>
                  &ldquo;{comment}&rdquo;
                </p>
              </div>

              {/* Rating counter details */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, opacity: 0.35, marginTop: 4 }}>
                <span style={{ fontSize: 12 }}>👥</span>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: "#fff", letterSpacing: 0.5 }}>
                  3,124 PEOPLE RATED THEIR CRUSHES TODAY
                </span>
              </div>
            </div>
            
          </div>
        )}
      </div>

      <CopiedToast visible={toastVisible} onHide={() => setToastVisible(false)} message={toastMsg} />
    </PageLayout>
  );
}
