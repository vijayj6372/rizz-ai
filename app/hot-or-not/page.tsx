"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { UserPlus, Users, RefreshCw, Sparkles, Award, AlertCircle } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
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
  "The AI scanned both faces and selected yours instantly. You're welcome. 🔥",
  "Your friend gave it a solid attempt. You just outclassed them.",
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
  "Your friend wins with a dominant score. Respect the result.",
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
  "Scanning both faces...",
  "Comparing facial symmetry...",
  "Running hotness algorithm...",
  "Calculating who wins...",
  "Delivering the verdict...",
];

const FACE_METRICS = ["Jawline", "Eyes", "Skin", "Symmetry", "Vibe"];

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

  const [imageA, setImageA] = useState<string | null>(null);
  const [imageB, setImageB] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [animateBars, setAnimateBars] = useState(false);

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

    // Run loading sequence stages
    for (let i = 0; i < LOADING_MSGS.length; i++) {
      setLoadingMsgIdx(i);
      await new Promise((r) => setTimeout(r, 480));
    }

    const scoreA = getRandomScore(5.0, 9.6);
    const scoreB = getRandomScore(5.0, 9.6);
    const diff = Math.abs(scoreA - scoreB);
    let winner: "A" | "B" | "tie";
    let comment: string;
    let margin: string;

    if (diff < 0.4) {
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
      score: getRandomScore(Math.max(3, scoreA - 1.5), Math.min(10, scoreA + 1.5)),
    }));
    const metricsB = FACE_METRICS.map((label) => ({
      label,
      score: getRandomScore(Math.max(3, scoreB - 1.5), Math.min(10, scoreB + 1.5)),
    }));

    setMatchCount((c) => c + 1);
    setResult({ scoreA, scoreB, metricsA, metricsB, winner, comment, margin });
    setLoading(false);

    // Trigger progressive bar animation
    setTimeout(() => {
      setAnimateBars(true);
    }, 100);
  };

  const reset = () => {
    setImageA(null);
    setImageB(null);
    setResult(null);
    setAnimateBars(false);
    if (fileInputARef.current) fileInputARef.current.value = "";
    if (fileInputBRef.current) fileInputBRef.current.value = "";
  };

  const winnerColor =
    result?.winner === "A" ? "#FFD700" : result?.winner === "B" ? "#E040A0" : "#00CFA8";

  return (
    <PageLayout
      showBack
      backHref="/fun-features"
      variant="dark"
      header={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: 0.5 }}>Rizz AI</span>
          {matchCount > 0 && (
            <div
              style={{
                padding: "3px 10px",
                borderRadius: 99,
                backgroundColor: "#FFD700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(255, 215, 0, 0.4)",
              }}
            >
              <span style={{ color: "#000", fontWeight: 900, fontSize: 11, letterSpacing: 0.5 }}>
                MATCHES: {matchCount}
              </span>
            </div>
          )}
        </div>
      }
      fullWidth
    >
      {/* Animation Styles Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scannerAnimation {
          0% { top: 0%; opacity: 0.8; }
          50% { top: 100%; opacity: 0.8; }
          100% { top: 0%; opacity: 0.8; }
        }
        @keyframes vsPulse {
          0% { transform: scale(1); box-shadow: 0 0 10px rgba(255,255,255,0.1); }
          50% { transform: scale(1.08); box-shadow: 0 0 20px rgba(255, 215, 0, 0.4); }
          100% { transform: scale(1); box-shadow: 0 0 10px rgba(255,255,255,0.1); }
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scanning-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #00FF88, transparent);
          box-shadow: 0 0 12px #00FF88;
          z-index: 10;
          animation: scannerAnimation 2s ease-in-out infinite;
        }
        .slot-interactive {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s, box-shadow 0.2s;
        }
        .slot-interactive:hover {
          transform: translateY(-4px);
        }
        .slot-interactive:active {
          transform: scale(0.98);
        }
      ` }} />

      <div
        style={{
          width: "100%",
          maxWidth: 480,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          color: "#fff",
          animation: "floatUp 0.4s ease-out",
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 800,
            color: "rgba(255, 255, 255, 0.45)",
            letterSpacing: 2,
            textAlign: "center",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          Compare 2 Pics · Who&apos;s Hotter?
        </p>

        {/* ── Photo slots row ── */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 14 }}>
          {/* Slot A */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div
              onClick={() => pickImage("A")}
              className="slot-interactive"
              style={{
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: 24,
                overflow: "hidden",
                borderWidth: result?.winner === "A" ? 3 : 2,
                borderStyle: result ? "solid" : "dashed",
                borderColor:
                  result?.winner === "A"
                    ? "#FFD700"
                    : result?.winner === "B"
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(248,107,109,0.35)",
                backgroundColor: "rgba(255,255,255,0.02)",
                boxShadow: result?.winner === "A" ? "0 0 20px rgba(255, 215, 0, 0.3)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: loading ? "not-allowed" : "pointer",
                position: "relative",
                opacity: result?.winner === "B" ? 0.6 : 1,
              }}
            >
              {imageA ? (
                <Image
                  src={imageA}
                  alt="Pic A"
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(248,107,109,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <UserPlus size={22} color="#F86B6D" />
                  </div>
                  <span style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.45)", fontWeight: 700 }}>Tap to add</span>
                </div>
              )}

              {loading && <div className="scanning-line" />}

              {result?.winner === "A" && (
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "rgba(255, 215, 0, 0.95)",
                    borderRadius: 12,
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                    zIndex: 2,
                  }}
                >
                  👑
                </div>
              )}
            </div>

            <span style={{ fontSize: 14, color: result?.winner === "A" ? "#FFD700" : "rgba(255, 255, 255, 0.6)", fontWeight: 800 }}>You</span>

            {result && (
              <div
                style={{
                  padding: "6px 16px",
                  borderRadius: 20,
                  minWidth: 64,
                  textAlign: "center",
                  backgroundColor: result.winner === "A" ? "#FFD700" : "rgba(255, 255, 255, 0.08)",
                  color: result.winner === "A" ? "#000" : "rgba(255,255,255,0.7)",
                  fontWeight: 900,
                  fontSize: 16,
                  boxShadow: result.winner === "A" ? "0 4px 12px rgba(255,215,0,0.25)" : "none",
                }}
              >
                {result.scoreA.toFixed(1)}
              </div>
            )}
          </div>

          {/* VS Center */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 40, gap: 8, minWidth: 54 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: result ? winnerColor : "#F86B6D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 15,
                color: "#000",
                boxShadow: result ? `0 0 15px ${winnerColor}` : "0 4px 10px rgba(0,0,0,0.2)",
                animation: loading ? "vsPulse 1.2s ease-in-out infinite" : "none",
                transition: "all 0.3s",
              }}
            >
              VS
            </div>

            {result && (
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                  color: winnerColor,
                  letterSpacing: 0.5,
                  backgroundColor: `${winnerColor}15`,
                  padding: "2px 8px",
                  borderRadius: 8,
                }}
              >
                {result.winner === "tie" ? "TIE" : `+${result.margin}`}
              </span>
            )}
          </div>

          {/* Slot B */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div
              onClick={() => pickImage("B")}
              className="slot-interactive"
              style={{
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: 24,
                overflow: "hidden",
                borderWidth: result?.winner === "B" ? 3 : 2,
                borderStyle: result ? "solid" : "dashed",
                borderColor:
                  result?.winner === "B"
                    ? "#E040A0"
                    : result?.winner === "A"
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(248,107,109,0.35)",
                backgroundColor: "rgba(255,255,255,0.02)",
                boxShadow: result?.winner === "B" ? "0 0 20px rgba(224, 64, 160, 0.3)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: loading ? "not-allowed" : "pointer",
                position: "relative",
                opacity: result?.winner === "A" ? 0.6 : 1,
              }}
            >
              {imageB ? (
                <Image
                  src={imageB}
                  alt="Pic B"
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(248,107,109,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Users size={22} color="#F86B6D" />
                  </div>
                  <span style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.45)", fontWeight: 700 }}>Tap to add</span>
                </div>
              )}

              {loading && <div className="scanning-line" />}

              {result?.winner === "B" && (
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "rgba(224, 64, 160, 0.95)",
                    borderRadius: 12,
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                    zIndex: 2,
                  }}
                >
                  👑
                </div>
              )}
            </div>

            <span style={{ fontSize: 14, color: result?.winner === "B" ? "#E040A0" : "rgba(255, 255, 255, 0.6)", fontWeight: 800 }}>Friend</span>

            {result && (
              <div
                style={{
                  padding: "6px 16px",
                  borderRadius: 20,
                  minWidth: 64,
                  textAlign: "center",
                  backgroundColor: result.winner === "B" ? "#E040A0" : "rgba(255, 255, 255, 0.08)",
                  color: result.winner === "B" ? "#fff" : "rgba(255,255,255,0.7)",
                  fontWeight: 900,
                  fontSize: 16,
                  boxShadow: result.winner === "B" ? "0 4px 12px rgba(224,64,160,0.25)" : "none",
                }}
              >
                {result.scoreB.toFixed(1)}
              </div>
            )}
          </div>
        </div>

        {/* File Inputs */}
        <input
          ref={fileInputARef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e, "A")}
          id="hot-or-not-input-a"
          aria-label="Upload first photo for comparison"
        />
        <input
          ref={fileInputBRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e, "B")}
          id="hot-or-not-input-b"
          aria-label="Upload second photo for comparison"
        />

        {/* CTA compare button */}
        {!result && (
          <button
            onClick={compare}
            disabled={!imageA || !imageB || loading}
            style={{
              width: "100%",
              paddingTop: 18,
              paddingBottom: 18,
              borderRadius: 22,
              background: !imageA || !imageB ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #FFD740 0%, #F9A825 100%)",
              color: !imageA || !imageB ? "rgba(255,255,255,0.25)" : "#000",
              fontSize: 17,
              fontWeight: 900,
              border: "none",
              cursor: !imageA || !imageB || loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              boxShadow: imageA && imageB && !loading ? "0 6px 20px rgba(249,168,37,0.35)" : "none",
              transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
              transform: imageA && imageB && !loading ? "scale(1)" : "scale(0.98)",
            }}
          >
            {loading ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <RefreshCw size={18} className="animate-spin" />
                <span>{LOADING_MSGS[loadingMsgIdx]}</span>
              </div>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Who&apos;s Hotter?</span>
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
              opacity: 0.4,
              padding: "10px 0",
            }}
          >
            <AlertCircle size={14} />
            <p style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>
              Upload 2 photos above to start comparing!
            </p>
          </div>
        )}

        {/* ── Results Panel (Stunning Game-like Verdict screen) ── */}
        {result && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "floatUp 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
            {/* Verdict Card */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(30,30,46,0.95) 0%, rgba(20,20,32,0.95) 100%)",
                borderRadius: 24,
                border: `1.5px solid ${winnerColor}80`,
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                textAlign: "center",
                boxShadow: `0 8px 32px ${winnerColor}28`,
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: `${winnerColor}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 2,
                }}
              >
                <Award size={24} color={winnerColor} />
              </div>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  color: winnerColor,
                  margin: 0,
                  letterSpacing: 0.5,
                }}
              >
                {result.winner === "tie" ? "IT'S A TIE! 🔥🔥" : `${result.winner === "A" ? "YOU WIN" : "FRIEND WINS"}! 👑`}
              </h2>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.85)",
                  fontSize: 15,
                  lineHeight: 1.55,
                  fontWeight: 500,
                  margin: 0,
                  maxWidth: 360,
                }}
              >
                {result.comment}
              </p>
            </div>

            {/* Metrics head-to-head breakdown */}
            <div
              style={{
                backgroundColor: "#1E1E2E",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 24,
                padding: "20px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Sparkles size={16} color="#FFD700" />
                <p style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: 0, letterSpacing: 0.2 }}>
                  Head-to-Head Breakdown
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
                      gap: 8,
                    }}
                  >
                    {/* Score A */}
                    <span
                      style={{
                        width: 36,
                        fontSize: 13,
                        fontWeight: 900,
                        textAlign: "center",
                        color: aWins ? "#FFD700" : "rgba(255,255,255,0.35)",
                        transition: "color 0.5s",
                      }}
                    >
                      {metric.score.toFixed(1)}
                    </span>

                    {/* Bars + label in center */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                      <div
                        style={{
                          height: 6,
                          backgroundColor: "rgba(255,255,255,0.04)",
                          borderRadius: 3,
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        {/* Left bar (from center leftwards) */}
                        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                          <div
                            style={{
                              height: "100%",
                              width: animateBars ? `${metric.score * 10}%` : "0%",
                              backgroundColor: aWins ? "#FFD700" : "rgba(255,255,255,0.12)",
                              borderRadius: 3,
                              transition: "width 1s cubic-bezier(0.25, 1, 0.5, 1)",
                            }}
                          />
                        </div>

                        {/* Center spacer line */}
                        <div style={{ width: 2, backgroundColor: "rgba(255,255,255,0.08)" }} />

                        {/* Right bar */}
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              height: "100%",
                              width: animateBars ? `${mB.score * 10}%` : "0%",
                              backgroundColor: bWins ? "#E040A0" : "rgba(255,255,255,0.12)",
                              borderRadius: 3,
                              transition: "width 1s cubic-bezier(0.25, 1, 0.5, 1)",
                            }}
                          />
                        </div>
                      </div>

                      <span
                        style={{
                          color: "rgba(255,255,255,0.35)",
                          fontSize: 9,
                          fontWeight: 800,
                          textAlign: "center",
                          letterSpacing: 1,
                          textTransform: "uppercase",
                        }}
                      >
                        {metric.label}
                      </span>
                    </div>

                    {/* Score B */}
                    <span
                      style={{
                        width: 36,
                        fontSize: 13,
                        fontWeight: 900,
                        textAlign: "center",
                        color: bWins ? "#E040A0" : "rgba(255,255,255,0.35)",
                        transition: "color 0.5s",
                      }}
                    >
                      {mB.score.toFixed(1)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Actions Card / "New Match" button */}
            <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <button
                onClick={reset}
                style={{
                  flex: 1,
                  paddingTop: 16,
                  paddingBottom: 16,
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.12)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")}
              >
                🔁 New Match
              </button>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
