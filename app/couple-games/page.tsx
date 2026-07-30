"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";

/* ──────────────────────────────────────────────
   TYPES
────────────────────────────────────────────── */
type GameType = "flashcard" | "wyr" | "tod" | "wheel" | "bingo" | "quiz";
type Domain =
  | "all"
  | "favs"
  | "connection"
  | "love"
  | "comm"
  | "party"
  | "lifestyle"
  | "growth"
  | "stages";

interface Category {
  id: string;
  title: string;
  emoji: string;
  count: number;
  domain: Exclude<Domain, "all" | "favs">;
  type: GameType;
  desc: string;
}

/* ──────────────────────────────────────────────
   1. DATA – 100+ CATEGORIES
────────────────────────────────────────────── */
const DOMAIN_TOPICS: Record<Exclude<Domain, "all" | "favs">, string[]> = {
  connection: [
    "Icebreakers", "Deep Questions", "First Dates", "Pillow Talk", "Secret Desires",
    "Mind Reading", "Unspoken Thoughts", "Flirtation", "Eye Contact", "Chemistry Check",
    "Intimate Prompts", "Late Night Talk", "Soul Connection",
  ],
  love: [
    "Love Languages", "Attachment Styles", "Apology Languages", "Physical Intimacy",
    "Affirmations", "Trust Building", "Reassurance", "Vulnerability", "Love Maps",
    "Nostalgia", "Sensual Touch", "Emotional Resonance", "Heart to Heart",
  ],
  comm: [
    "Conflict Resolution", "Hard Conversations", "Stress Response", "Active Listening",
    "Emotional Intelligence", "Anger Management", "Repair Strategies", "Non-Verbal Cues",
    "Texting Habits", "De-escalation", "Honesty Test", "Boundary Sync",
  ],
  party: [
    "Would You Rather", "Truth or Dare", "This or That", "Never Have I Ever",
    "Most Likely To", "Two Truths & Lie", "Red Green Flags", "Hot Takes",
    "Unpopular Opinions", "Couple Trivia", "Kiss Marry Kill", "21 Questions",
    "Spin Wheel", "Couple Bingo",
  ],
  lifestyle: [
    "Financial Mindset", "Budgeting & Assets", "Career Ambitions", "Work-Life Harmony",
    "Vacation & Travel", "Home & Living", "Moving In Together", "Raising Children",
    "Family Dynamics", "In-Laws & Boundaries", "Social Life",
  ],
  growth: [
    "Daily Check-In", "Weekly Audit", "Health & Fitness", "Mental Health Support",
    "Sleep Rhythms", "Personal Growth", "Screen Time Limits", "Spiritual Alignment",
    "Philosophy & Meaning", "Bucket List", "Micro Habits",
  ],
  stages: [
    "Long Distance", "Dating Chemistry", "Engagement Prep", "Questions Before Marriage",
    "Newlywed Bliss", "Married Life 5+ Years", "Golden Anniversary", "Parent Life",
    "Re-igniting Spark",
  ],
};

const ALL_EMOJIS = [
  "💬", "🌊", "🌙", "🍷", "😤", "✍️", "🔍", "🤫", "🥂", "💒", "🤯", "💖", "🔥", "⚡", "🙈",
  "👆", "🤥", "✅", "💍", "🎯", "🧊", "🧠", "🍻", "📲", "🏆", "🚩", "💘", "✈️", "🩺", "🔑", "👶", "🕊️",
];

let _catIdCount = 0;
const CATEGORIES_DATA: Category[] = [];
(Object.keys(DOMAIN_TOPICS) as Exclude<Domain, "all" | "favs">[]).forEach((dom) => {
  DOMAIN_TOPICS[dom].forEach((topic) => {
    _catIdCount++;
    const emoji = ALL_EMOJIS[_catIdCount % ALL_EMOJIS.length];
    let type: GameType = "flashcard";
    if (topic.includes("Would You Rather") || topic.includes("This or That")) type = "wyr";
    else if (topic.includes("Truth or Dare")) type = "tod";
    else if (topic.includes("Spin Wheel")) type = "wheel";
    else if (topic.includes("Bingo")) type = "bingo";
    else if (topic.includes("Quiz") || topic.includes("Style")) type = "quiz";
    CATEGORIES_DATA.push({
      id: `cat_${_catIdCount}`,
      title: topic,
      emoji,
      count: 20,
      domain: dom,
      type,
      desc: `Spark deep connection with ${topic.toLowerCase()} prompts.`,
    });
  });
});

/* ──────────────────────────────────────────────
   2. QUESTION ENGINE
────────────────────────────────────────────── */
const Q_TEMPLATES = [
  "What is one thing about {topic} that always makes you feel connected to me?",
  "How has your perspective on {topic} evolved over the past year?",
  "If we could improve one aspect of our {topic}, what would it be?",
  "What is a cherished memory you have regarding {topic}?",
  "How can I better support you when it comes to {topic}?",
  "What is a boundary around {topic} that is super important to you?",
  "What is a fun, spontaneous goal we should set for {topic}?",
  "What surprised you most about me regarding {topic} when we first met?",
  "If you had to describe our {topic} in three words, what would they be?",
  "What is something small I do regarding {topic} that you secretly love?",
  "What is your dream scenario for our future {topic}?",
  "How do you prefer we navigate challenges with {topic}?",
  "What is a question about {topic} you've always wanted to ask me?",
  "What is one ritual or daily habit we could start for {topic}?",
  "When do you feel most appreciated when it comes to {topic}?",
  "What lesson about {topic} did you learn from your childhood?",
  "If we could take a weekend trip dedicated to {topic}, where would we go?",
  "What is a silly or funny memory we share about {topic}?",
  "How do you like to recharge when {topic} gets overwhelming?",
  "What makes you feel most proud of our relationship's {topic}?",
];

function generateQuestions(cat: Category): string[] {
  return Q_TEMPLATES.map((tmpl) => tmpl.replace("{topic}", cat.title.toLowerCase()));
}

/* ──────────────────────────────────────────────
   3. PARTICLE STARFIELD
────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    type P = { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number };
    const pts: P[] = Array.from({ length: 65 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3, speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.x += p.speedX; p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      });
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 0 }} />
  );
}

/* ──────────────────────────────────────────────
   4. SOUND FX
────────────────────────────────────────────── */
function useSoundFx() {
  const ctxRef = useRef<AudioContext | null>(null);
  const init = useCallback(() => {
    if (!ctxRef.current && typeof window !== "undefined") {
      const AC = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
      if (AC) ctxRef.current = new AC();
    }
  }, []);
  const playPop = useCallback(() => {
    init();
    const ctx = ctxRef.current; if (!ctx) return;
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.08);
  }, [init]);
  const playChime = useCallback(() => {
    init();
    const ctx = ctxRef.current; if (!ctx) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.3);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.06); osc.stop(ctx.currentTime + idx * 0.06 + 0.3);
    });
  }, [init]);
  return { playPop, playChime };
}

/* ──────────────────────────────────────────────
   5. TOAST
────────────────────────────────────────────── */
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%",
      transform: `translateX(-50%) translateY(${visible ? "0" : "100px"})`,
      background: "rgba(15,14,23,0.94)", border: "1px solid #ff3b70",
      color: "#fff", padding: "12px 24px", borderRadius: 9999,
      fontSize: "0.9rem", fontWeight: 700, boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
      zIndex: 10000, opacity: visible ? 1 : 0,
      transition: "transform 0.3s ease, opacity 0.3s ease",
      pointerEvents: "none", whiteSpace: "nowrap",
    }}>{message}</div>
  );
}

/* ──────────────────────────────────────────────
   6. SHARED STYLES
────────────────────────────────────────────── */
const btnPrimary: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  gap: 8, padding: "13px 24px", fontFamily: "inherit",
  fontSize: "0.92rem", fontWeight: 700, borderRadius: 9999, border: "none",
  cursor: "pointer",
  background: "linear-gradient(135deg,#ff3b70 0%,#a855f7 50%,#6366f1 100%)",
  color: "#fff", boxShadow: "0 0 30px rgba(255,59,112,0.3)",
  transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", minHeight: 44, width: "100%",
};

const btnSecondary: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  gap: 8, padding: "13px 24px", fontFamily: "inherit",
  fontSize: "0.92rem", fontWeight: 700, borderRadius: 9999,
  border: "1px solid rgba(255,255,255,0.08)",
  cursor: "pointer", background: "rgba(255,255,255,0.06)",
  color: "#f8fafc", backdropFilter: "blur(12px)", minHeight: 44,
};

/* ──────────────────────────────────────────────
   7. FLASHCARD PLAYER
────────────────────────────────────────────── */
function FlashcardPlayer({ cat, question, stepIndex, totalSteps, isFav, onToggleFav, onNext, onCopy }: {
  cat: Category; question: string; stepIndex: number; totalSteps: number;
  isFav: boolean; onToggleFav: () => void; onNext: () => void; onCopy: (t: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const dragging = useRef(false);

  const handleMouseDown = (clientX: number) => { dragging.current = true; startX.current = clientX; };
  const handleMouseMove = (clientX: number) => {
    if (!dragging.current || !cardRef.current) return;
    const diff = clientX - startX.current;
    cardRef.current.style.transform = `translateX(${diff}px) rotate(${diff * 0.05}deg)`;
  };
  const handleMouseUp = (clientX: number) => {
    if (!dragging.current) return; dragging.current = false;
    const diff = clientX - startX.current;
    if (Math.abs(diff) > 80) onNext();
    else if (cardRef.current) cardRef.current.style.transform = "none";
  };

  return (
    <>
      <div
        ref={cardRef}
        onMouseDown={(e) => handleMouseDown(e.clientX)}
        onMouseMove={(e) => handleMouseMove(e.clientX)}
        onMouseUp={(e) => handleMouseUp(e.clientX)}
        onTouchStart={(e) => handleMouseDown(e.touches[0].clientX)}
        onTouchMove={(e) => handleMouseMove(e.touches[0].clientX)}
        onTouchEnd={(e) => handleMouseUp(e.changedTouches[0].clientX)}
        style={{
          width: "100%", minHeight: 260,
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 32, padding: "24px 22px",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          textAlign: "center", boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
          backdropFilter: "blur(20px)", marginBottom: 20,
          cursor: "grab", userSelect: "none",
          transition: "opacity 0.3s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", padding: "6px 14px",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 9999, fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8",
          }}>{cat.title}</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onToggleFav} title="Favorite" style={{
              background: isFav ? "rgba(255,59,112,0.18)" : "rgba(255,255,255,0.06)",
              border: `1px solid ${isFav ? "#ff3b70" : "rgba(255,255,255,0.08)"}`,
              color: isFav ? "#ff3b70" : "#94a3b8",
              width: 38, height: 38, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: 14, transition: "all 0.2s", minHeight: "auto",
            }}>❤️</button>
            <button onClick={() => onCopy(question)} title="Copy" style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
              color: "#94a3b8", width: 38, height: 38, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s", minHeight: "auto",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .912 2 2.036v1.893m-2 3.929h4c1.105 0 2 .912 2 2.036v10.893c0 1.124-.895 2.036-2 2.036h-8c-1.105 0-2-.912-2-2.036V12.893c0-1.124.895-2.036 2-2.036z"/>
              </svg>
            </button>
          </div>
        </div>

        <div style={{ fontSize: "1.35rem", fontWeight: 800, lineHeight: 1.38, color: "#fff", margin: "auto 0", padding: "10px 0" }}>
          &ldquo;{question}&rdquo;
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600 }}>
          <span>Question {stepIndex + 1} of {totalSteps}</span>
          <span>Swipe or tap Next →</span>
        </div>
      </div>
      <button onClick={onNext} style={btnPrimary}>
        <span>Next Question</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </>
  );
}

/* ──────────────────────────────────────────────
   8. WOULD YOU RATHER PLAYER
────────────────────────────────────────────── */
function WyrPlayer({ question, onNext }: { question: string; onNext: () => void }) {
  const [voted, setVoted] = useState<"a" | "b" | null>(null);
  const optStyle = (which: "a" | "b"): React.CSSProperties => ({
    width: "100%", padding: "22px 18px", textAlign: "center",
    background: voted === which ? "rgba(255,59,112,0.14)" : "rgba(255,255,255,0.04)",
    border: `2px solid ${voted === which ? "#ff3b70" : "rgba(255,255,255,0.08)"}`,
    borderRadius: 24, cursor: voted ? "default" : "pointer",
    transition: "all 0.2s", position: "relative", overflow: "hidden",
  });
  const pct = (which: "a" | "b") => which === "a" ? "64%" : "36%";

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 14 }}>
      {(["a", "b"] as const).map((which, idx) => (
        <React.Fragment key={which}>
          {idx === 1 && (
            <div style={{ textAlign: "center", fontSize: "0.85rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>OR</div>
          )}
          <div onClick={() => !voted && setVoted(which)} style={optStyle(which)}>
            {voted && (
              <div style={{
                position: "absolute", top: 0, left: 0, height: "100%", width: pct(which),
                background: "linear-gradient(90deg,rgba(255,59,112,0.25),rgba(139,92,246,0.25))",
                transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}/>
            )}
            <div style={{ position: "relative", zIndex: 2, fontSize: "1.15rem", fontWeight: 800, color: "#fff", marginBottom: 6 }}>
              {which === "a" ? `Option A: ${question}` : "Option B: Focus on spontaneous adventure instead"}
            </div>
            {voted && (
              <div style={{ position: "relative", zIndex: 2, fontSize: "0.88rem", fontWeight: 700, color: "#ff3b70" }}>
                {pct(which)} of couples chose this
              </div>
            )}
          </div>
        </React.Fragment>
      ))}
      <button onClick={onNext} style={{ ...btnPrimary, marginTop: 10 }}>
        <span>Next Question</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────
   9. PLAYER OVERLAY
────────────────────────────────────────────── */
function PlayerOverlay({ cat, onClose, favorites, onToggleFav, onToast }: {
  cat: Category; onClose: () => void; favorites: string[];
  onToggleFav: (id: string) => void; onToast: (msg: string) => void;
}) {
  const { playPop, playChime } = useSoundFx();
  const [stepIndex, setStepIndex] = useState(0);
  const questions = useMemo(() => generateQuestions(cat), [cat]);
  const question = questions[stepIndex % questions.length];

  const nextStep = useCallback(() => {
    playPop();
    setStepIndex((i) => i + 1);
  }, [playPop]);

  const handleCopy = useCallback((text: string) => {
    playPop();
    navigator.clipboard.writeText(text).catch(() => {});
    onToast("Copied to clipboard!");
  }, [playPop, onToast]);

  const handleToggleFav = useCallback(() => {
    playChime();
    const isFav = favorites.includes(cat.id);
    onToggleFav(cat.id);
    onToast(isFav ? "Removed from Favorites" : "Added to Favorites ❤️");
  }, [playChime, onToggleFav, cat.id, favorites, onToast]);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(7,6,11,0.95)", backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)", zIndex: 1000,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 16, animation: "cgOverlayIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards",
    }}>
      <div style={{ width: "100%", maxWidth: 580, maxHeight: "96vh", overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", padding: 4 }}>
        {/* Top bar */}
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <button
            onClick={() => { playPop(); onClose(); }}
            style={{
              width: 42, height: 42, borderRadius: "50%",
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)",
              color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0, minHeight: "auto",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: 8, textAlign: "center" }}>
            <span>{cat.emoji}</span><span>{cat.title}</span>
          </div>

          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#94a3b8", whiteSpace: "nowrap" }}>
            {stepIndex + 1} of {questions.length}
          </span>
        </div>

        {/* Game content */}
        <div style={{ width: "100%" }}>
          {cat.type === "wyr" ? (
            <WyrPlayer question={question} onNext={nextStep} />
          ) : (
            <FlashcardPlayer
              cat={cat} question={question} stepIndex={stepIndex} totalSteps={questions.length}
              isFav={favorites.includes(cat.id)} onToggleFav={handleToggleFav}
              onNext={nextStep} onCopy={handleCopy}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   10. GAME CARD
────────────────────────────────────────────── */
function GameCard({ cat, onClick }: { cat: Category; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const isIcebreaker = cat.title.toLowerCase().includes("icebreaker");

  const cardContent = (
    <div
      onClick={isIcebreaker ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 24, padding: "18px 20px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        cursor: "pointer", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        position: "relative", overflow: "hidden", backdropFilter: "blur(16px)",
        minHeight: 150,
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 4px 12px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{
            fontSize: "1.85rem", width: 44, height: 44, borderRadius: 16,
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>{cat.emoji}</div>
          <div style={{
            fontSize: "0.7rem", fontWeight: 800, padding: "3px 8px",
            background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)",
            color: "#10b981", borderRadius: 9999, textTransform: "uppercase", letterSpacing: "0.05em",
          }}>Free</div>
        </div>
        <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fff", marginBottom: 4, letterSpacing: "-0.01em" }}>{cat.title}</div>
        <div style={{ fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.4 }}>{cat.desc}</div>
      </div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.05)",
        fontSize: "0.8rem", color: "#94a3b8", fontWeight: 600,
      }}>
        <span>25 Prompts</span>
        <div style={{
          width: 26, height: 26, borderRadius: "50%",
          background: hovered ? "linear-gradient(135deg,#ff3b70 0%,#a855f7 50%,#6366f1 100%)" : "rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", transition: "all 0.2s",
          transform: hovered ? "translateX(3px)" : "none",
          fontSize: 14,
        }}>→</div>
      </div>
    </div>
  );

  if (isIcebreaker) {
    return (
      <Link href="/games/ice-breaker-questions-for-couples" style={{ textDecoration: "none", color: "inherit" }}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

/* ──────────────────────────────────────────────
   11. DOMAIN TABS DATA
────────────────────────────────────────────── */
const DOMAIN_TABS: { id: Domain; label: string }[] = [
  { id: "all", label: "All Categories (100+)" },
  { id: "favs", label: "❤️ Favorites" },
  { id: "connection", label: "Core Connection" },
  { id: "love", label: "Love & Attachment" },
  { id: "comm", label: "Communication" },
  { id: "party", label: "Party Games" },
  { id: "lifestyle", label: "Lifestyle & Future" },
  { id: "growth", label: "Growth & Health" },
  { id: "stages", label: "Life Stages" },
];

/* ──────────────────────────────────────────────
   12. MAIN PAGE COMPONENT
────────────────────────────────────────────── */
export default function CoupleGamesPage() {
  const [domain, setDomain] = useState<Domain>("all");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [streak, setStreak] = useState(1);
  const [activeGame, setActiveGame] = useState<Category | null>(null);
  const [toast, setToast] = useState({ msg: "", visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { playPop, playChime } = useSoundFx();

  // Hydrate from localStorage
  useEffect(() => {
    try {
      setFavorites(JSON.parse(localStorage.getItem("lovely_favs") || "[]"));
      setStreak(parseInt(localStorage.getItem("lovely_streak") || "1"));
    } catch {/* ignore */}
  }, []);

  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, visible: true });
    toastTimer.current = setTimeout(() => setToast({ msg: "", visible: false }), 2500);
  }, []);

  const toggleFavorite = useCallback((catId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId];
      localStorage.setItem("lovely_favs", JSON.stringify(next));
      return next;
    });
  }, []);

  const playRandom = useCallback(() => {
    playChime();
    setActiveGame(CATEGORIES_DATA[Math.floor(Math.random() * CATEGORIES_DATA.length)]);
  }, [playChime]);

  const filtered = useMemo(() => CATEGORIES_DATA.filter((cat) => {
    if (domain === "favs") return favorites.includes(cat.id);
    const matchDom = domain === "all" || cat.domain === domain;
    const matchSearch = !search || cat.title.toLowerCase().includes(search.toLowerCase().trim());
    return matchDom && matchSearch;
  }), [domain, search, favorites]);

  return (
    <>
      <ParticleCanvas />
      <Toast message={toast.msg} visible={toast.visible} />

      {/* Global style injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        @keyframes pulseDot{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.4);opacity:0.6}}
        @keyframes cgOverlayIn{from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:scale(1)}}
        .cg-page *{box-sizing:border-box}
        .cg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin-bottom:40px}
        .cg-tabs{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap}
        @media(max-width:768px){
          .cg-grid{grid-template-columns:repeat(2,1fr)!important;gap:14px!important}
          .cg-tabs{justify-content:flex-start!important;flex-wrap:nowrap!important;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding-bottom:6px}
          .cg-tabs::-webkit-scrollbar{display:none}
          .cg-hero-title{font-size:2.2rem!important}
          .cg-hero-actions{flex-direction:column!important;width:100%!important}
          .cg-hero-actions button{width:100%!important}
          .cg-nav{flex-wrap:wrap!important;gap:8px!important}
        }
        @media(max-width:480px){
          .cg-grid{grid-template-columns:1fr!important;gap:12px!important}
          .cg-hero-title{font-size:1.85rem!important}
        }
      `}</style>

      <div
        className="cg-page"
        style={{
          position: "relative", zIndex: 1, width: "100%", minHeight: "100vh",
          background: "#07060b", color: "#f8fafc",
          fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif",
          WebkitFontSmoothing: "antialiased",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 1160, padding: "16px 24px", display: "flex", flexDirection: "column" }}>

          {/* ── NAVIGATION ── */}
          <header className="cg-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", marginBottom: 8 }}>
            <Link href="/" style={{
              display: "flex", alignItems: "center", gap: 10,
              fontSize: "1.45rem", fontWeight: 800, letterSpacing: "-0.03em",
              color: "#fff", textDecoration: "none",
            }}>
              <div style={{
                width: 36, height: 36,
                background: "linear-gradient(135deg,#ff3b70 0%,#a855f7 50%,#6366f1 100%)",
                borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 15px rgba(255,59,112,0.4)", flexShrink: 0,
              }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <span>Lovely</span>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              {/* Streak */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "6px 14px", background: "rgba(255,59,112,0.12)",
                border: "1px solid rgba(255,59,112,0.4)", borderRadius: 9999,
                fontSize: "0.85rem", fontWeight: 800, color: "#ff3b70", whiteSpace: "nowrap",
              }}>🔥 {streak} Day Streak</div>

              {/* Roll random */}
              <button onClick={playRandom} style={{ ...btnSecondary, padding: "8px 14px", fontSize: "0.82rem", width: "auto" }}>
                Roll 🎲
              </button>

              {/* Live badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "6px 14px", background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: 9999,
                fontSize: "0.8rem", fontWeight: 600, color: "#94a3b8",
                backdropFilter: "blur(12px)", whiteSpace: "nowrap",
              }}>
                <span style={{
                  width: 7, height: 7, background: "#ff3b70", borderRadius: "50%",
                  boxShadow: "0 0 10px #ff3b70",
                  display: "inline-block",
                  animation: "pulseDot 1.8s infinite",
                }}/>
                100+ Categories
              </div>
            </div>
          </header>

          {/* ── HERO ── */}
          <section style={{ textAlign: "center", padding: "24px 0 30px", maxWidth: 800, margin: "0 auto", width: "100%" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12,
              padding: "6px 14px", background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: 9999,
              fontSize: "0.8rem", fontWeight: 600, color: "#94a3b8",
            }}>✨ 100+ Categories • 2,000+ Connection Prompts</div>

            <h1
              className="cg-hero-title"
              style={{
                fontSize: "2.9rem", fontWeight: 800, lineHeight: 1.15,
                letterSpacing: "-0.04em", margin: "14px 0 12px",
                background: "linear-gradient(135deg,#ffffff 30%,#f472b6 70%,#c084fc 100%)",
                WebkitBackgroundClip: "text", backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Games for couples that actually connect you
            </h1>

            <p style={{ fontSize: "1.1rem", color: "#94a3b8", marginBottom: 22, fontWeight: 400 }}>
              Explore icebreakers, deep conversations, attachment style quizzes, Would You Rather, Truth or Dare, and over 100 categories. Spark real connection in 5 minutes.
            </p>

            <div className="cg-hero-actions" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
              <button onClick={playRandom} style={btnPrimary}>
                Pick a Random Game 🎲
              </button>
              <button
                onClick={() => { playPop(); setDomain("favs"); }}
                style={{ ...btnSecondary, flexShrink: 0 }}
              >
                ❤️ My Favorites ({favorites.length})
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginTop: 14, fontSize: "0.85rem", color: "#94a3b8", fontWeight: 600, flexWrap: "wrap" }}>
              <span><b style={{ color: "#fff" }}>100+</b> Categories</span>
              <span><b style={{ color: "#fff" }}>2,000+</b> Questions</span>
              <span><b style={{ color: "#fff" }}>100%</b> Free</span>
            </div>
          </section>

          {/* ── SEARCH & FILTER ── */}
          <section style={{ margin: "16px 0 28px", display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Search */}
            <div style={{ position: "relative", width: "100%", maxWidth: 540, margin: "0 auto" }}>
              <svg style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#64748b", pointerEvents: "none" }}
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search across 100+ categories & 2,000+ questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%", padding: "14px 20px 14px 46px",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 9999, color: "#fff", fontFamily: "inherit",
                  fontSize: "0.95rem", outline: "none", backdropFilter: "blur(16px)",
                  minHeight: "auto",
                }}
              />
            </div>

            {/* Domain tabs */}
            <div className="cg-tabs">
              {DOMAIN_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { playPop(); setDomain(tab.id); }}
                  style={{
                    padding: "9px 16px", borderRadius: 9999,
                    background: domain === tab.id
                      ? "linear-gradient(135deg,#ff3b70 0%,#a855f7 50%,#6366f1 100%)"
                      : "rgba(255,255,255,0.04)",
                    border: domain === tab.id ? "none" : "1px solid rgba(255,255,255,0.08)",
                    fontSize: "0.82rem", fontWeight: 700,
                    color: domain === tab.id ? "#fff" : "#94a3b8",
                    cursor: "pointer", transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)",
                    userSelect: "none", flexShrink: 0, minHeight: 40,
                    boxShadow: domain === tab.id ? "0 4px 15px rgba(255,59,112,0.4)" : "none",
                    fontFamily: "inherit", whiteSpace: "nowrap",
                  }}
                >{tab.label}</button>
              ))}
            </div>
          </section>

          {/* ── GRID ── */}
          <main>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "24px 0 16px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", display: "flex", alignItems: "center", gap: 10, margin: 0 }}>
                Categories &amp; Games
                <span style={{
                  fontSize: "0.8rem", fontWeight: 700, padding: "3px 10px",
                  background: "rgba(255,255,255,0.08)", borderRadius: 9999, color: "#94a3b8",
                }}>{filtered.length} Categories</span>
              </h2>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>
                No categories found. Try clearing your search filter or adding favorites!
              </div>
            ) : (
              <div className="cg-grid">
                {filtered.map((cat) => (
                  <GameCard
                    key={cat.id}
                    cat={cat}
                    onClick={() => { playPop(); setActiveGame(cat); }}
                  />
                ))}
              </div>
            )}
          </main>

          {/* ── FOOTER ── */}
          <footer style={{ marginTop: "auto", padding: "32px 0 90px", textAlign: "center", fontSize: "0.85rem", color: "#64748b", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <p>© 2026 Lovely. Mobile-Responsive Couple Connection Platform.</p>
          </footer>
        </div>
      </div>

      {/* ── GAME PLAYER OVERLAY ── */}
      {activeGame && (
        <PlayerOverlay
          cat={activeGame}
          onClose={() => setActiveGame(null)}
          favorites={favorites}
          onToggleFav={toggleFavorite}
          onToast={showToast}
        />
      )}

      {/* ── BOTTOM NAVIGATION BAR ── */}
      <BottomNav currentPath="/couple-games" variant="dark" />
    </>
  );
}
