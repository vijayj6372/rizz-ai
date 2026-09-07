"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clipboard,
  Dice5,
  Expand,
  Heart,
  MessageCircle,
  RotateCcw,
  Shuffle,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import type { GameModule, QuestionItem } from "@/data/coupleGamesData";

const STORAGE_KEY = "rizz-couple-game-favorites";

function readFavorites(slug: string) {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as Record<string, string[]>;
    return saved[slug] || [];
  } catch {
    return [];
  }
}

export default function CoupleGamePlayer({ game }: { game: GameModule }) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<"a" | "b" | null>(null);
  const [mode, setMode] = useState<"truth" | "dare">("truth");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const [utility, setUtility] = useState<"dice" | "coin" | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const startX = useRef<number | null>(null);
  const question = game.questions[index % game.questions.length];
  const progress = ((index + 1) / game.questions.length) * 100;
  const isFavorite = favorites.includes(question.id);

  useEffect(() => {
    setFavorites(readFavorites(game.slug));
  }, [game.slug]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") next();
      if (event.key === "ArrowLeft") previous();
      if (event.key.toLowerCase() === "f") toggleFavorite();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  }

  function next() {
    setIndex((current) => (current + 1) % game.questions.length);
    setChoice(null);
  }

  function previous() {
    setIndex((current) => (current - 1 + game.questions.length) % game.questions.length);
    setChoice(null);
  }

  function shuffle() {
    setIndex(Math.floor(Math.random() * game.questions.length));
    setChoice(null);
    showToast("Shuffled the deck");
  }

  function toggleFavorite() {
    const nextFavorites = isFavorite
      ? favorites.filter((id) => id !== question.id)
      : [...favorites, question.id];
    const saved = (() => {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as Record<string, string[]>;
      } catch {
        return {};
      }
    })();
    saved[game.slug] = nextFavorites;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    setFavorites(nextFavorites);
    showToast(isFavorite ? "Removed from favorites" : "Saved to favorites");
  }

  async function copyQuestion() {
    await navigator.clipboard?.writeText(question.text);
    showToast("Question copied");
  }

  async function shareQuestion() {
    if (navigator.share) {
      await navigator.share({ title: game.title, text: question.text, url: window.location.href });
      return;
    }
    await copyQuestion();
  }

  async function toggleFullscreen() {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  }

  const questionLabel = useMemo(() => {
    if (question.type === "truth") return "Truth";
    if (question.type === "dare") return "Dare";
    return "Your prompt";
  }, [question.type]);

  return (
    <main className="couple-player" onTouchStart={(event) => { startX.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => {
      if (startX.current === null) return;
      const distance = (event.changedTouches[0]?.clientX ?? 0) - startX.current;
      if (Math.abs(distance) > 60) distance < 0 ? next() : previous();
      startX.current = null;
    }}>
      <div className="player-shell">
        <header className="player-header">
          <Link href="/couple-games" className="icon-button" aria-label="Back to couple games"><ArrowLeft size={19} /></Link>
          <div className="player-title"><span>{game.emoji}</span><span>{game.title}</span></div>
          <button className="icon-button" onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}><Expand size={18} /></button>
        </header>

        <div className="player-progress" aria-label={`Question ${index + 1} of ${game.questionCount}`}>
          <div className="progress-copy"><span>Card {index + 1}</span><span>of {game.questionCount}</span></div>
          <div className="progress-track"><span style={{ width: `${Math.min(progress, 100)}%` }} /></div>
        </div>

        <section className="prompt-card" aria-live="polite">
          <div className="prompt-card-top"><span className="eyebrow"><Sparkles size={14} /> {questionLabel}</span><button className={`favorite-button ${isFavorite ? "is-saved" : ""}`} onClick={toggleFavorite} aria-label={isFavorite ? "Remove favorite" : "Save favorite"}><Heart size={19} fill={isFavorite ? "currentColor" : "none"} /></button></div>
          <p className="prompt-text">{question.text}</p>
          {question.optionA && question.optionB ? (
            <div className="choice-grid">
              {[{ id: "a" as const, text: question.optionA }, { id: "b" as const, text: question.optionB }].map((option) => (
                <button key={option.id} className={`choice-option ${choice === option.id ? "selected" : ""}`} onClick={() => setChoice(option.id)}><span>{option.id === "a" ? "A" : "B"}</span>{option.text}{choice === option.id && <Check size={17} />}</button>
              ))}
            </div>
          ) : null}
          {question.type === "truth" || question.type === "dare" ? (
            <div className="mode-switcher" role="tablist" aria-label="Truth or dare mode">
              {(["truth", "dare"] as const).map((item) => <button key={item} className={mode === item ? "active" : ""} onClick={() => setMode(item)}>{item === "truth" ? "Truth" : "Dare"}</button>)}
            </div>
          ) : null}
          <div className="prompt-actions"><button onClick={copyQuestion}><Clipboard size={17} /> Copy</button><button onClick={shareQuestion}><MessageCircle size={17} /> Share</button></div>
        </section>

        <div className="player-controls"><button className="control-button" onClick={previous} aria-label="Previous card"><ChevronLeft /></button><button className="next-button" onClick={next}>Next card <ChevronRight size={18} /></button><button className="control-button" onClick={shuffle} aria-label="Shuffle deck"><Shuffle size={18} /></button></div>

        <div className="utility-row"><button onClick={() => setUtility("dice")}><Dice5 size={17} /> Roll dice</button><button onClick={() => setUtility("coin")}><CircleHelp size={17} /> Flip coin</button><button onClick={() => { setIndex(0); setChoice(null); }}><RotateCcw size={16} /> Restart</button></div>
        <p className="play-hint">Swipe the card or use the arrow keys to move through the deck.</p>
      </div>

      {utility && <div className="utility-modal" role="dialog" aria-modal="true" aria-label={utility === "dice" ? "Dice result" : "Coin result"} onClick={() => setUtility(null)}><div className="utility-dialog" onClick={(event) => event.stopPropagation()}><button className="close-dialog" onClick={() => setUtility(null)} aria-label="Close"><X size={17} /></button><div className="utility-symbol">{utility === "dice" ? "🎲" : "🪙"}</div><h2>{utility === "dice" ? Math.ceil(Math.random() * 6) : Math.random() > 0.5 ? "Heads" : "Tails"}</h2><p>{utility === "dice" ? "Highest roll goes first." : "Let fate choose who answers."}</p><button className="next-button" onClick={() => setUtility(null)}>Got it</button></div></div>}
      {toast && <div className="player-toast" role="status">{toast}</div>}
    </main>
  );
}
