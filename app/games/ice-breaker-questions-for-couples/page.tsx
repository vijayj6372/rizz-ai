"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import {
  Heart,
  Share2,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  HelpCircle,
  BookOpen,
  Zap,
  Flame,
  Volume2,
  VolumeX,
  Shuffle,
  Smile,
  ArrowRight,
} from "lucide-react";

/* ──────────────────────────────────────────────
   DATA DEFINITIONS
────────────────────────────────────────────── */
const FEATURED_QUESTIONS = [
  "What's the most embarrassing song on your playlist?",
  "If you were famous, what would you be famous for?",
  "What's your guilty pleasure TV show?",
  "If you could have dinner with anyone, dead or alive, who?",
  "What's the weirdest food combination you secretly love?",
  "What's a skill you wish you had?",
  "If you woke up with a superpower, what would it be?",
  "What's the best compliment you've ever received?",
  "What would your dream vacation look like?",
  "If you could master one instrument overnight, which one?",
];

const EXTENDED_QUESTIONS = [
  "What's the funniest childhood memory you've never told me?",
  "If you could live in any TV show universe for a week, which one?",
  "What is your ultimate comfort movie when you are feeling down?",
  "What's a fashion trend you secretly hope never comes back?",
  "If we could pack our bags right now and go anywhere, where to?",
  "What was your very first impression of me when we first met?",
  "What's the most unusual gift you've ever received from someone?",
  "If you had to enter a talent show in 10 minutes, what would you do?",
  "What is a habit of mine that you find surprisingly adorable?",
  "If you could only eat one meal for the rest of your life, what is it?",
  "What's the boldest thing you've ever done on a dare?",
  "If we won the lottery tomorrow, what's the first silly thing we'd buy?",
  "What's your favorite way for us to spend a lazy Sunday together?",
  "If you could learn the truth about one historical mystery, which one?",
  "What's a nickname you had as a kid that you hated?",
];

const ALL_PROMPTS = [...FEATURED_QUESTIONS, ...EXTENDED_QUESTIONS];

const TIPS = [
  {
    icon: "📱",
    title: "Put phones face-down",
    text: "Put phones face-down for anything unrelated to the game.",
  },
  {
    icon: "🕯️",
    title: "Set the mood",
    text: "Set the mood, dim lights, a drink, zero distractions.",
  },
  {
    icon: "❓",
    title: "Ask 'Why?'",
    text: "If an answer surprises you, ask 'why?' before moving on.",
  },
  {
    icon: "🔄",
    title: "Rotate turn order",
    text: "Rotate who goes first each round so it stays balanced.",
  },
  {
    icon: "⭐",
    title: "Save your favorites",
    text: "Save your favorite answers, they're gold to laugh about later.",
  },
];

const FAQS = [
  {
    question: "What makes a good ice breaker for couples?",
    answer:
      "Fun, non-threatening, and story-inducing. Good ice breakers make you think and laugh, not feel interrogated.",
  },
  {
    question: "Can long-term couples benefit from ice breakers?",
    answer:
      "Definitely! People change over time. Ice breakers reignite curiosity about your partner and create fresh topics even after years.",
  },
  {
    question: "How often should couples play?",
    answer:
      "Many couples use Lovely daily for just 5 minutes. Even one quick question during breakfast can brighten your day.",
  },
];

const RELATED_GAMES = [
  {
    id: "deep-questions",
    title: "Deep Conversation Prompts",
    emoji: "🌊",
    desc: "Explore soul connection, vulnerability, and life goals.",
    tag: "Connection",
    color: "from-purple-600 to-indigo-600",
  },
  {
    id: "would-you-rather",
    title: "Would You Rather: Couples Edition",
    emoji: "⚡",
    desc: "Hilarious, impossible dilemmas made for partner date nights.",
    tag: "Party Game",
    color: "from-pink-600 to-rose-600",
  },
  {
    id: "truth-or-dare",
    title: "Truth or Dare for Couples",
    emoji: "🔥",
    desc: "Playful truths and naughty dares to spice things up.",
    tag: "Flirty",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "love-languages",
    title: "Love Languages & Attachment",
    emoji: "💖",
    desc: "Discover how your partner feels most loved and valued.",
    tag: "Relationship",
    color: "from-rose-500 to-pink-500",
  },
];

export default function IceBreakerGamePage() {
  const [deck, setDeck] = useState<string[]>(ALL_PROMPTS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [cardAnimation, setCardAnimation] = useState<"none" | "slide-left" | "slide-right">("none");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);

  // Sound generator web audio API
  const playAudioFeedback = useCallback(() => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      const ctx = new AC();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio context fallbacks
    }
  }, [soundEnabled]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleNext = useCallback(() => {
    playAudioFeedback();
    setCardAnimation("slide-left");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % deck.length);
      setCardAnimation("none");
    }, 180);
  }, [deck.length, playAudioFeedback]);

  const handlePrev = useCallback(() => {
    playAudioFeedback();
    setCardAnimation("slide-right");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
      setCardAnimation("none");
    }, 180);
  }, [deck.length, playAudioFeedback]);

  const handleShuffle = () => {
    playAudioFeedback();
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    showToast("Prompts shuffled! 🎲");
  };

  const toggleFavorite = (question: string) => {
    playAudioFeedback();
    setFavorites((prev) => {
      const isFav = prev.includes(question);
      const updated = isFav
        ? prev.filter((q) => q !== question)
        : [...prev, question];
      showToast(isFav ? "Removed from Favorites" : "Saved to Favorites ❤️");
      return updated;
    });
  };

  const copyQuestionText = (text: string, idx?: number) => {
    playAudioFeedback();
    navigator.clipboard.writeText(text);
    if (idx !== undefined) setCopiedIndex(idx);
    showToast("Question copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sharePage = () => {
    playAudioFeedback();
    if (navigator.share) {
      navigator.share({
        title: "Ice Breaker Questions for Couples",
        text: "Play through playful ice breaker questions with your partner on Lovely!",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      showToast("Link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const jumpToPrompt = (promptText: string) => {
    const idx = deck.indexOf(promptText);
    if (idx !== -1) {
      setCurrentIndex(idx);
    } else {
      setDeck([promptText, ...deck]);
      setCurrentIndex(0);
    }
    const deckElem = document.getElementById("game-deck");
    if (deckElem) {
      deckElem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    showToast("Loaded in prompt player!");
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) handleNext();
      else handlePrev();
    }
  };

  const currentQuestion = deck[currentIndex] || FEATURED_QUESTIONS[0];
  const isCurrentFav = favorites.includes(currentQuestion);
  const progressPct = ((currentIndex + 1) / deck.length) * 100;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#09080e] text-slate-800 dark:text-slate-100 font-sans pb-28 selection:bg-rose-500 selection:text-white transition-colors duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-slate-900/95 dark:bg-slate-100/95 text-white dark:text-slate-900 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-xl border border-rose-500/30 flex items-center gap-2 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Structured SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Lovely - Ice Breaker Questions for Couples",
            "applicationCategory": "EntertainmentApplication",
            "operatingSystem": "All",
            "description": "Fun, lighthearted ice breaker questions designed for couples to spark playful conversations and rediscover each other on date nights.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />

      {/* TOP NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-[#09080e]/80 border-b border-slate-200/60 dark:border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/couple-games"
            className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-xl sm:text-2xl tracking-tight group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-rose-500/30 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-current text-white" />
            </div>
            <span>Lovely</span>
          </Link>
          <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            Couples Ice Breakers
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
            title={soundEnabled ? "Mute sounds" : "Enable sounds"}
            aria-label="Sound Toggle"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          
          <button
            onClick={sharePage}
            className="p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
            title="Share Game"
            aria-label="Share"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          </button>

          <Link
            href="/couple-games"
            className="text-xs sm:text-sm font-bold px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm"
          >
            All Games
          </Link>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">

        {/* HERO HEADER */}
        <section className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-700 dark:text-teal-300 text-xs font-extrabold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-500" />
            <span>Featured Couple Game</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
            Ice Breaker Questions for Couples
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Lighthearted questions that bring out your playful side. Great for date nights or rediscovering each other.
          </p>
        </section>

        {/* INTERACTIVE FLASHCARD GAME PLAYER (DECK SECTION) */}
        <section id="game-deck" className="mb-14 sm:mb-18">
          <div className="bg-white dark:bg-[#13111c] border border-slate-200/80 dark:border-white/10 rounded-3xl p-4 sm:p-8 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden backdrop-blur-2xl">
            
            {/* Top Deck Info Bar */}
            <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-extrabold text-teal-600 dark:text-teal-400 tracking-wider uppercase">
                  {currentIndex + 1} OF {deck.length}
                </span>
                
                {/* Progress bar line */}
                <div className="w-24 sm:w-44 h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShuffle}
                  className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  title="Shuffle prompts"
                  aria-label="Shuffle"
                >
                  <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={() => toggleFavorite(currentQuestion)}
                  className={`p-2 rounded-xl transition-colors ${
                    isCurrentFav
                      ? "text-rose-500 bg-rose-50 dark:bg-rose-500/10"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
                  }`}
                  title={isCurrentFav ? "Remove Favorite" : "Save Favorite"}
                  aria-label="Favorite"
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isCurrentFav ? "fill-rose-500" : ""}`} />
                </button>

                <button
                  onClick={() => copyQuestionText(currentQuestion)}
                  className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  title="Copy question text"
                  aria-label="Copy Prompt"
                >
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* TEAL FLASHCARD CONTAINER (Matches user screenshot 2) */}
            <div
              ref={cardRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className={`w-full min-h-[260px] sm:min-h-[320px] rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col justify-between items-center text-center cursor-grab active:cursor-grabbing select-none transition-all duration-200 shadow-xl ${
                cardAnimation === "slide-left"
                  ? "-translate-x-4 opacity-50 scale-95"
                  : cardAnimation === "slide-right"
                  ? "translate-x-4 opacity-50 scale-95"
                  : "translate-x-0 opacity-100 scale-100"
              }`}
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #06b6d4 100%)",
                boxShadow: "0 20px 45px -15px rgba(13, 148, 136, 0.4)",
              }}
            >
              <div className="w-full flex items-center justify-between text-teal-100 text-xs font-semibold uppercase tracking-widest">
                <span>Prompt Card</span>
                <span>Tap or swipe</span>
              </div>

              {/* Central Question Text */}
              <div className="my-auto py-6 sm:py-8 px-2">
                <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-relaxed sm:leading-snug tracking-tight">
                  {currentQuestion}
                </h2>
              </div>

              <div className="w-full flex items-center justify-between text-teal-100/80 text-xs font-medium">
                <span>Swipe left/right to navigate</span>
                <span className="hidden sm:inline">Use ← → keys</span>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={handlePrev}
                className="px-4 sm:px-6 py-3.5 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              {/* Main Next Question Button */}
              <button
                onClick={handleNext}
                className="flex-1 sm:flex-initial px-6 sm:px-10 py-3.5 sm:py-4 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 dark:shadow-white/10 transition-all hover:scale-[1.02] active:scale-98"
              >
                <span>Next question</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={() => {
                  setCurrentIndex(0);
                  showToast("Restarted from Question 1");
                }}
                className="p-3.5 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all"
                title="Restart deck"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="mb-14 sm:mb-18 bg-white dark:bg-[#13111c] border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              About Ice Breakers for Couples
            </h2>
          </div>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Ice breakers aren&apos;t just for first dates, they&apos;re for any couple who wants to keep things fresh. Even if you&apos;ve been together for years, there are always new things to discover about each other. These questions are designed to be fun and surprising, helping you see your partner in a new light.
          </p>
        </section>

        {/* FEATURED / SAMPLE QUESTIONS LIST */}
        <section className="mb-14 sm:mb-18">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Sample questions to get you started
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Tap any question to jump into the prompt player
              </p>
            </div>
            <span className="hidden sm:inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-300">
              10 Featured Prompts
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {FEATURED_QUESTIONS.map((q, idx) => (
              <div
                key={idx}
                className="group relative bg-white dark:bg-[#13111c] border border-slate-200/80 dark:border-white/10 hover:border-teal-500/50 dark:hover:border-teal-500/50 rounded-2xl p-4 sm:p-5 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <button
                    onClick={() => copyQuestionText(q, idx)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                    title="Copy"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 mb-4 leading-snug">
                  &ldquo;{q}&rdquo;
                </p>

                <button
                  onClick={() => jumpToPrompt(q)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-teal-50 dark:hover:bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Play this prompt</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* HOW TO PLAY */}
        <section className="mb-14 sm:mb-18 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-extrabold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 text-teal-300" />
              <span>Easy Setup</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-8">
              How to play Ice Breakers
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 font-extrabold flex items-center justify-center text-base shrink-0 border border-teal-500/30">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-base text-white mb-1">Grab your partner</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Sit face-to-face or curl up on the couch together.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 font-extrabold flex items-center justify-center text-base shrink-0 border border-teal-500/30">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-base text-white mb-1">Open this page</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Open this page on a phone or laptop and tap to start.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 font-extrabold flex items-center justify-center text-base shrink-0 border border-teal-500/30">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-base text-white mb-1">Take turns</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Take turns answering, reacting, and asking follow-up questions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 font-extrabold flex items-center justify-center text-base shrink-0 border border-teal-500/30">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-base text-white mb-1">No timer, no pressure</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    No timer, no pressure—the goal is simply to slow down and connect.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY COUPLES LOVE THIS GAME */}
        <section className="mb-14 sm:mb-18 bg-white dark:bg-[#13111c] border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
                <Flame className="w-5 h-5" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Why couples love this game
              </h2>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              Romance
            </span>
          </div>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Psychologists find that novel, playful experiences release dopamine and rebuild attraction in long-term relationships. Ice Breakers works because it creates a structured excuse to ask things you&apos;d normally skip, and laugh at the answers together. A handful of prompts is often enough to turn a regular Tuesday into a real date night.
          </p>
        </section>

        {/* TIPS TO MAKE IT MORE FUN */}
        <section className="mb-14 sm:mb-18">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Tips to make it more fun
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {TIPS.map((tip, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#13111c] border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 shadow-sm hover:border-teal-500/30 transition-all"
              >
                <span className="text-2xl mb-3 block">{tip.icon}</span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1.5">
                  {tip.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="mb-14 sm:mb-18 bg-white dark:bg-[#13111c] border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200/80 dark:border-white/10 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="text-teal-500 font-extrabold text-xl shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* DISCOVER MORE GAMES */}
        <section className="mb-14 sm:mb-18">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Discover more games
            </h2>
            <Link
              href="/couple-games"
              className="text-xs sm:text-sm font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
            >
              <span>Explore all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RELATED_GAMES.map((g) => (
              <Link
                key={g.id}
                href="/couple-games"
                className="group bg-white dark:bg-[#13111c] border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 rounded-2xl p-5 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{g.emoji}</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                      {g.tag}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors mb-1.5">
                    {g.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {g.desc}
                  </p>
                </div>
                <div className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                  <span>Play Game</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-12 text-center text-xs text-slate-500 dark:text-slate-500 border-t border-slate-200/60 dark:border-white/10">
        <p className="mb-2">© 2026 Lovely. Mobile-Responsive Couple Connection Platform.</p>
        <p>Built to spark meaningful conversations and date night fun.</p>
      </footer>

      {/* FIXED BOTTOM NAV BAR */}
      <BottomNav currentPath="/couple-games" variant="dark" />
    </div>
  );
}
