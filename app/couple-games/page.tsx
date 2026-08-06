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
   TYPES & CATEGORY DATA
────────────────────────────────────────────── */
export type GameType = "flashcard" | "wyr" | "tod" | "wheel" | "bingo" | "quiz";
export type Domain =
  | "all"
  | "favs"
  | "party"
  | "connection"
  | "fun"
  | "romance"
  | "lifestyle";

export interface Category {
  id: string;
  slug: string;
  title: string;
  emoji: string;
  count: number;
  domain: Exclude<Domain, "all" | "favs">;
  categoryName: string;
  type: GameType;
  desc: string;
}

export const CATEGORIES_SECTION_CONFIG: Record<
  Exclude<Domain, "all" | "favs">,
  { label: string; color: string; bg: string; icon: string }
> = {
  party: {
    label: "Classic Party Games",
    color: "#D9476B",
    bg: "rgba(217, 71, 107, 0.12)",
    icon: "🎲",
  },
  connection: {
    label: "Conversation & Connection",
    color: "#3B82F6",
    bg: "rgba(59, 130, 246, 0.12)",
    icon: "💬",
  },
  fun: {
    label: "Fun & Lighthearted",
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.12)",
    icon: "🎈",
  },
  romance: {
    label: "Romance & Intimacy",
    color: "#EC4899",
    bg: "rgba(236, 72, 153, 0.12)",
    icon: "❤️",
  },
  lifestyle: {
    label: "Lifestyle & Growth",
    color: "#10B981",
    bg: "rgba(16, 185, 129, 0.12)",
    icon: "🌱",
  },
};

export const CATEGORIES_DATA: Category[] = [
  {
    "id": "game_1",
    "slug": "would-you-rather-for-couples",
    "title": "Would You Rather",
    "emoji": "🤔",
    "count": 40,
    "domain": "party",
    "categoryName": "Classic Party Games",
    "type": "wyr",
    "desc": "Spark deep connection with would you rather prompts."
  },
  {
    "id": "game_2",
    "slug": "this-or-that-for-couples",
    "title": "This or That",
    "emoji": "⚡",
    "count": 35,
    "domain": "party",
    "categoryName": "Classic Party Games",
    "type": "wyr",
    "desc": "Spark deep connection with this or that prompts."
  },
  {
    "id": "game_3",
    "slug": "truth-or-dare-for-couples",
    "title": "Truth or Dare",
    "emoji": "🔥",
    "count": 30,
    "domain": "party",
    "categoryName": "Classic Party Games",
    "type": "tod",
    "desc": "Spark deep connection with truth or dare prompts."
  },
  {
    "id": "game_4",
    "slug": "never-have-i-ever-for-couples",
    "title": "Never Have I Ever",
    "emoji": "🙈",
    "count": 15,
    "domain": "party",
    "categoryName": "Classic Party Games",
    "type": "flashcard",
    "desc": "Spark deep connection with never have i ever prompts."
  },
  {
    "id": "game_5",
    "slug": "most-likely-to-for-couples",
    "title": "Most Likely To",
    "emoji": "👆",
    "count": 15,
    "domain": "party",
    "categoryName": "Classic Party Games",
    "type": "flashcard",
    "desc": "Spark deep connection with most likely to prompts."
  },
  {
    "id": "game_6",
    "slug": "two-truths-and-a-lie-for-couples",
    "title": "Two Truths & a Lie",
    "emoji": "🤥",
    "count": 15,
    "domain": "party",
    "categoryName": "Classic Party Games",
    "type": "flashcard",
    "desc": "Spark deep connection with two truths & a lie prompts."
  },
  {
    "id": "game_7",
    "slug": "yes-or-no-questions-for-couples",
    "title": "Yes or No",
    "emoji": "✅",
    "count": 15,
    "domain": "party",
    "categoryName": "Classic Party Games",
    "type": "flashcard",
    "desc": "Spark deep connection with yes or no prompts."
  },
  {
    "id": "game_8",
    "slug": "mr-and-mrs-questions",
    "title": "Mr & Mrs Quiz",
    "emoji": "👰",
    "count": 15,
    "domain": "party",
    "categoryName": "Classic Party Games",
    "type": "quiz",
    "desc": "Spark deep connection with mr & mrs quiz prompts."
  },
  {
    "id": "game_9",
    "slug": "couple-quiz-how-well-do-you-know-me",
    "title": "Couple Quiz",
    "emoji": "🏆",
    "count": 15,
    "domain": "party",
    "categoryName": "Classic Party Games",
    "type": "quiz",
    "desc": "Spark deep connection with couple quiz prompts."
  },
  {
    "id": "game_10",
    "slug": "conversation-starters-for-couples",
    "title": "Conversation Starters",
    "emoji": "💬",
    "count": 40,
    "domain": "connection",
    "categoryName": "Conversation & Connection",
    "type": "flashcard",
    "desc": "Spark deep connection with conversation starters prompts."
  },
  {
    "id": "game_11",
    "slug": "deep-questions-for-couples",
    "title": "Deep Questions",
    "emoji": "🌊",
    "count": 35,
    "domain": "connection",
    "categoryName": "Conversation & Connection",
    "type": "flashcard",
    "desc": "Spark deep connection with deep questions prompts."
  },
  {
    "id": "game_12",
    "slug": "pillow-talk-questions-for-couples",
    "title": "Pillow Talk",
    "emoji": "🌙",
    "count": 30,
    "domain": "connection",
    "categoryName": "Conversation & Connection",
    "type": "flashcard",
    "desc": "Spark deep connection with pillow talk prompts."
  },
  {
    "id": "game_13",
    "slug": "date-night-questions-for-couples",
    "title": "Date Night Questions",
    "emoji": "🍷",
    "count": 15,
    "domain": "connection",
    "categoryName": "Conversation & Connection",
    "type": "flashcard",
    "desc": "Spark deep connection with date night questions prompts."
  },
  {
    "id": "game_14",
    "slug": "pet-peeve-or-dealbreaker",
    "title": "Pet Peeve or Dealbreaker",
    "emoji": "😤",
    "count": 15,
    "domain": "connection",
    "categoryName": "Conversation & Connection",
    "type": "flashcard",
    "desc": "Spark deep connection with pet peeve or dealbreaker prompts."
  },
  {
    "id": "game_15",
    "slug": "finish-my-sentence",
    "title": "Finish My Sentence",
    "emoji": "✍️",
    "count": 15,
    "domain": "connection",
    "categoryName": "Conversation & Connection",
    "type": "flashcard",
    "desc": "Spark deep connection with finish my sentence prompts."
  },
  {
    "id": "game_16",
    "slug": "mystery-scenarios",
    "title": "Mystery Scenarios",
    "emoji": "🔍",
    "count": 15,
    "domain": "connection",
    "categoryName": "Conversation & Connection",
    "type": "flashcard",
    "desc": "Spark deep connection with mystery scenarios prompts."
  },
  {
    "id": "game_17",
    "slug": "guilty-pleasures",
    "title": "Guilty Pleasures",
    "emoji": "🤫",
    "count": 15,
    "domain": "connection",
    "categoryName": "Conversation & Connection",
    "type": "flashcard",
    "desc": "Spark deep connection with guilty pleasures prompts."
  },
  {
    "id": "game_18",
    "slug": "first-date-questions",
    "title": "First Date Questions",
    "emoji": "🥂",
    "count": 15,
    "domain": "connection",
    "categoryName": "Conversation & Connection",
    "type": "flashcard",
    "desc": "Spark deep connection with first date questions prompts."
  },
  {
    "id": "game_19",
    "slug": "questions-for-married-couples",
    "title": "Married Couples",
    "emoji": "💒",
    "count": 15,
    "domain": "connection",
    "categoryName": "Conversation & Connection",
    "type": "flashcard",
    "desc": "Spark deep connection with married couples prompts."
  },
  {
    "id": "game_20",
    "slug": "hypothetical-questions-for-couples",
    "title": "Hypothetical Questions",
    "emoji": "🤯",
    "count": 15,
    "domain": "connection",
    "categoryName": "Conversation & Connection",
    "type": "flashcard",
    "desc": "Spark deep connection with hypothetical questions prompts."
  },
  {
    "id": "game_21",
    "slug": "questions-to-ask-your-partner",
    "title": "Questions for Partners",
    "emoji": "💬",
    "count": 15,
    "domain": "connection",
    "categoryName": "Conversation & Connection",
    "type": "flashcard",
    "desc": "Spark deep connection with questions for partners prompts."
  },
  {
    "id": "game_22",
    "slug": "relationship-questions-to-ask",
    "title": "Relationship Questions",
    "emoji": "💑",
    "count": 15,
    "domain": "connection",
    "categoryName": "Conversation & Connection",
    "type": "flashcard",
    "desc": "Spark deep connection with relationship questions prompts."
  },
  {
    "id": "game_23",
    "slug": "questions-to-ask-before-marriage",
    "title": "Questions Before Marriage",
    "emoji": "💍",
    "count": 45,
    "domain": "connection",
    "categoryName": "Conversation & Connection",
    "type": "flashcard",
    "desc": "Spark deep connection with questions before marriage prompts."
  },
  {
    "id": "game_24",
    "slug": "questions-to-ask-your-fiance",
    "title": "Questions for Your Fiancé",
    "emoji": "💎",
    "count": 40,
    "domain": "connection",
    "categoryName": "Conversation & Connection",
    "type": "flashcard",
    "desc": "Spark deep connection with questions for your fiancé prompts."
  },
  {
    "id": "game_25",
    "slug": "questions-to-ask-your-spouse",
    "title": "Questions for Your Spouse",
    "emoji": "💞",
    "count": 40,
    "domain": "connection",
    "categoryName": "Conversation & Connection",
    "type": "flashcard",
    "desc": "Spark deep connection with questions for your spouse prompts."
  },
  {
    "id": "game_26",
    "slug": "100-questions-to-ask-your-partner",
    "title": "100 Questions for Your Partner",
    "emoji": "💯",
    "count": 103,
    "domain": "connection",
    "categoryName": "Conversation & Connection",
    "type": "flashcard",
    "desc": "Spark deep connection with 100 questions for your partner prompts."
  },
  {
    "id": "game_27",
    "slug": "50-questions-for-couples",
    "title": "50 Questions for Couples",
    "emoji": "🎯",
    "count": 50,
    "domain": "connection",
    "categoryName": "Conversation & Connection",
    "type": "flashcard",
    "desc": "Spark deep connection with 50 questions for couples prompts."
  },
  {
    "id": "game_28",
    "slug": "ice-breaker-questions-for-couples",
    "title": "Ice Breakers",
    "emoji": "🧊",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with ice breakers prompts."
  },
  {
    "id": "game_29",
    "slug": "speed-dating-questions-for-couples",
    "title": "Speed Dating",
    "emoji": "⏱️",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with speed dating prompts."
  },
  {
    "id": "game_30",
    "slug": "funny-questions-for-couples",
    "title": "Funny Questions",
    "emoji": "😂",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with funny questions prompts."
  },
  {
    "id": "game_31",
    "slug": "couple-trivia-questions",
    "title": "Couple Trivia",
    "emoji": "🧠",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "quiz",
    "desc": "Spark deep connection with couple trivia prompts."
  },
  {
    "id": "game_32",
    "slug": "21-questions-for-couples",
    "title": "21 Questions",
    "emoji": "🎯",
    "count": 21,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with 21 questions prompts."
  },
  {
    "id": "game_33",
    "slug": "how-well-do-you-know-me-questions-for-couples",
    "title": "How Well Do You Know Me",
    "emoji": "🎓",
    "count": 20,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "quiz",
    "desc": "Spark deep connection with how well do you know me prompts."
  },
  {
    "id": "game_34",
    "slug": "drinking-games-for-couples",
    "title": "Drinking Games",
    "emoji": "🍻",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with drinking games prompts."
  },
  {
    "id": "game_35",
    "slug": "couple-challenge-questions",
    "title": "Couple Challenges",
    "emoji": "📲",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with couple challenges prompts."
  },
  {
    "id": "game_36",
    "slug": "hot-seat-questions-for-couples",
    "title": "Hot Seat",
    "emoji": "🔥",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with hot seat prompts."
  },
  {
    "id": "game_37",
    "slug": "who-knows-me-better-questions-for-couples",
    "title": "Who Knows Me Better",
    "emoji": "🏆",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with who knows me better prompts."
  },
  {
    "id": "game_38",
    "slug": "rapid-fire-questions-for-couples",
    "title": "Rapid Fire",
    "emoji": "⚡",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with rapid fire prompts."
  },
  {
    "id": "game_39",
    "slug": "red-flag-green-flag",
    "title": "Red/Green Flag",
    "emoji": "🚩",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with red/green flag prompts."
  },
  {
    "id": "game_40",
    "slug": "hot-takes",
    "title": "Hot Takes",
    "emoji": "🔥",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with hot takes prompts."
  },
  {
    "id": "game_41",
    "slug": "emoji-decoder",
    "title": "Emoji Decoder",
    "emoji": "🧩",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with emoji decoder prompts."
  },
  {
    "id": "game_42",
    "slug": "love-mad-libs",
    "title": "Love Mad Libs",
    "emoji": "📝",
    "count": 1,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with love mad libs prompts."
  },
  {
    "id": "game_43",
    "slug": "spin-the-wheel",
    "title": "Spin the Wheel",
    "emoji": "🎡",
    "count": 16,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "wheel",
    "desc": "Spark deep connection with spin the wheel prompts."
  },
  {
    "id": "game_44",
    "slug": "predict-your-partner",
    "title": "Predict Your Partner",
    "emoji": "🔮",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with predict your partner prompts."
  },
  {
    "id": "game_45",
    "slug": "couple-superlatives",
    "title": "Couple Superlatives",
    "emoji": "🏆",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with couple superlatives prompts."
  },
  {
    "id": "game_46",
    "slug": "song-lyric-challenge",
    "title": "Song Lyrics",
    "emoji": "🎵",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with song lyrics prompts."
  },
  {
    "id": "game_47",
    "slug": "truth-or-drink-questions",
    "title": "Truth or Drink",
    "emoji": "🥂",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "tod",
    "desc": "Spark deep connection with truth or drink prompts."
  },
  {
    "id": "game_48",
    "slug": "kiss-marry-kill-for-couples",
    "title": "Kiss Marry Kill",
    "emoji": "💋",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with kiss marry kill prompts."
  },
  {
    "id": "game_49",
    "slug": "20-questions-game-for-couples",
    "title": "20 Questions",
    "emoji": "❓",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with 20 questions prompts."
  },
  {
    "id": "game_50",
    "slug": "unpopular-opinions-for-couples",
    "title": "Unpopular Opinions",
    "emoji": "🔥",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with unpopular opinions prompts."
  },
  {
    "id": "game_51",
    "slug": "fun-questions-for-couples",
    "title": "Fun Questions",
    "emoji": "😄",
    "count": 15,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with fun questions prompts."
  },
  {
    "id": "game_52",
    "slug": "paranoia-questions-for-couples",
    "title": "Paranoia Questions",
    "emoji": "👀",
    "count": 40,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with paranoia questions prompts."
  },
  {
    "id": "game_53",
    "slug": "finish-the-sentence-for-couples",
    "title": "Finish the Sentence",
    "emoji": "✏️",
    "count": 30,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with finish the sentence prompts."
  },
  {
    "id": "game_54",
    "slug": "wedding-shoe-game-questions",
    "title": "Wedding Shoe Game",
    "emoji": "👠",
    "count": 20,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with wedding shoe game prompts."
  },
  {
    "id": "game_55",
    "slug": "would-you-still-love-me-if-questions",
    "title": "Would You Still Love Me If",
    "emoji": "💘",
    "count": 20,
    "domain": "fun",
    "categoryName": "Fun & Lighthearted",
    "type": "flashcard",
    "desc": "Spark deep connection with would you still love me if prompts."
  },
  {
    "id": "game_56",
    "slug": "romantic-questions-for-couples",
    "title": "Romantic Questions",
    "emoji": "💕",
    "count": 15,
    "domain": "romance",
    "categoryName": "Romance & Intimacy",
    "type": "flashcard",
    "desc": "Spark deep connection with romantic questions prompts."
  },
  {
    "id": "game_57",
    "slug": "questions-to-ask-your-boyfriend",
    "title": "Ask Your Boyfriend",
    "emoji": "💙",
    "count": 15,
    "domain": "romance",
    "categoryName": "Romance & Intimacy",
    "type": "flashcard",
    "desc": "Spark deep connection with ask your boyfriend prompts."
  },
  {
    "id": "game_58",
    "slug": "questions-to-ask-your-girlfriend",
    "title": "Ask Your Girlfriend",
    "emoji": "💗",
    "count": 15,
    "domain": "romance",
    "categoryName": "Romance & Intimacy",
    "type": "flashcard",
    "desc": "Spark deep connection with ask your girlfriend prompts."
  },
  {
    "id": "game_59",
    "slug": "newlywed-game-questions",
    "title": "Newlywed Game",
    "emoji": "💍",
    "count": 15,
    "domain": "romance",
    "categoryName": "Romance & Intimacy",
    "type": "flashcard",
    "desc": "Spark deep connection with newlywed game prompts."
  },
  {
    "id": "game_60",
    "slug": "36-questions-to-fall-in-love",
    "title": "36 Questions to Fall in Love",
    "emoji": "💘",
    "count": 20,
    "domain": "romance",
    "categoryName": "Romance & Intimacy",
    "type": "flashcard",
    "desc": "Spark deep connection with 36 questions to fall in love prompts."
  },
  {
    "id": "game_61",
    "slug": "love-language-quiz-for-couples",
    "title": "Love Language Quiz",
    "emoji": "💝",
    "count": 15,
    "domain": "romance",
    "categoryName": "Romance & Intimacy",
    "type": "quiz",
    "desc": "Spark deep connection with love language quiz prompts."
  },
  {
    "id": "game_62",
    "slug": "questions-to-ask-your-husband",
    "title": "Ask Your Husband",
    "emoji": "👨",
    "count": 15,
    "domain": "romance",
    "categoryName": "Romance & Intimacy",
    "type": "flashcard",
    "desc": "Spark deep connection with ask your husband prompts."
  },
  {
    "id": "game_63",
    "slug": "questions-to-ask-your-wife",
    "title": "Ask Your Wife",
    "emoji": "👩",
    "count": 15,
    "domain": "romance",
    "categoryName": "Romance & Intimacy",
    "type": "flashcard",
    "desc": "Spark deep connection with ask your wife prompts."
  },
  {
    "id": "game_64",
    "slug": "questions-to-ask-your-crush",
    "title": "Ask Your Crush",
    "emoji": "😍",
    "count": 15,
    "domain": "romance",
    "categoryName": "Romance & Intimacy",
    "type": "flashcard",
    "desc": "Spark deep connection with ask your crush prompts."
  },
  {
    "id": "game_65",
    "slug": "flirty-questions-to-ask-a-guy",
    "title": "Flirty Questions (Him)",
    "emoji": "😏",
    "count": 15,
    "domain": "romance",
    "categoryName": "Romance & Intimacy",
    "type": "flashcard",
    "desc": "Spark deep connection with flirty questions (him) prompts."
  },
  {
    "id": "game_66",
    "slug": "flirty-questions-to-ask-a-girl",
    "title": "Flirty Questions (Her)",
    "emoji": "🌹",
    "count": 15,
    "domain": "romance",
    "categoryName": "Romance & Intimacy",
    "type": "flashcard",
    "desc": "Spark deep connection with flirty questions (her) prompts."
  },
  {
    "id": "game_67",
    "slug": "anniversary-questions-for-couples",
    "title": "Anniversary Questions",
    "emoji": "🎂",
    "count": 15,
    "domain": "romance",
    "categoryName": "Romance & Intimacy",
    "type": "flashcard",
    "desc": "Spark deep connection with anniversary questions prompts."
  },
  {
    "id": "game_68",
    "slug": "intimate-questions-for-couples",
    "title": "Intimate Questions",
    "emoji": "🌙",
    "count": 15,
    "domain": "romance",
    "categoryName": "Romance & Intimacy",
    "type": "flashcard",
    "desc": "Spark deep connection with intimate questions prompts."
  },
  {
    "id": "game_69",
    "slug": "cute-couple-games",
    "title": "Cute Couple Games",
    "emoji": "🥰",
    "count": 15,
    "domain": "romance",
    "categoryName": "Romance & Intimacy",
    "type": "flashcard",
    "desc": "Spark deep connection with cute couple games prompts."
  },
  {
    "id": "game_70",
    "slug": "questions-that-will-make-you-cry",
    "title": "Questions That Make You Cry",
    "emoji": "🥹",
    "count": 15,
    "domain": "romance",
    "categoryName": "Romance & Intimacy",
    "type": "flashcard",
    "desc": "Spark deep connection with questions that make you cry prompts."
  },
  {
    "id": "game_71",
    "slug": "long-distance-relationship-games",
    "title": "Long Distance",
    "emoji": "🌍",
    "count": 15,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "flashcard",
    "desc": "Spark deep connection with long distance prompts."
  },
  {
    "id": "game_72",
    "slug": "couple-bucket-list-ideas",
    "title": "Bucket List",
    "emoji": "✈️",
    "count": 15,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "flashcard",
    "desc": "Spark deep connection with bucket list prompts."
  },
  {
    "id": "game_73",
    "slug": "relationship-check-in-questions",
    "title": "Relationship Check-In",
    "emoji": "🩺",
    "count": 15,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "flashcard",
    "desc": "Spark deep connection with relationship check-in prompts."
  },
  {
    "id": "game_74",
    "slug": "texting-games-for-couples",
    "title": "Texting Games",
    "emoji": "📱",
    "count": 15,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "flashcard",
    "desc": "Spark deep connection with texting games prompts."
  },
  {
    "id": "game_75",
    "slug": "couples-compatibility-test",
    "title": "Compatibility Test",
    "emoji": "🔮",
    "count": 15,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "flashcard",
    "desc": "Spark deep connection with compatibility test prompts."
  },
  {
    "id": "game_76",
    "slug": "at-home-date-night-ideas-for-couples",
    "title": "At-Home Date Night",
    "emoji": "🏠",
    "count": 15,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "flashcard",
    "desc": "Spark deep connection with at-home date night prompts."
  },
  {
    "id": "game_77",
    "slug": "couple-bingo",
    "title": "Couple Bingo",
    "emoji": "🎱",
    "count": 25,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "bingo",
    "desc": "Spark deep connection with couple bingo prompts."
  },
  {
    "id": "game_78",
    "slug": "valentines-day-games-for-couples",
    "title": "Valentine&#x27;s Day Games",
    "emoji": "💝",
    "count": 15,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "flashcard",
    "desc": "Spark deep connection with valentine&#x27;s day games prompts."
  },
  {
    "id": "game_79",
    "slug": "road-trip-games-for-couples",
    "title": "Road Trip Games",
    "emoji": "🚗",
    "count": 15,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "flashcard",
    "desc": "Spark deep connection with road trip games prompts."
  },
  {
    "id": "game_80",
    "slug": "couple-games-no-equipment",
    "title": "No Equipment Games",
    "emoji": "🤲",
    "count": 15,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "flashcard",
    "desc": "Spark deep connection with no equipment games prompts."
  },
  {
    "id": "game_81",
    "slug": "date-night-games-for-couples",
    "title": "Date Night Games",
    "emoji": "🌃",
    "count": 12,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "flashcard",
    "desc": "Spark deep connection with date night games prompts."
  },
  {
    "id": "game_82",
    "slug": "couple-games-online-free",
    "title": "Free Online Games",
    "emoji": "🎮",
    "count": 15,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "flashcard",
    "desc": "Spark deep connection with free online games prompts."
  },
  {
    "id": "game_83",
    "slug": "couple-games-to-play-at-home",
    "title": "Games to Play at Home",
    "emoji": "🏠",
    "count": 12,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "flashcard",
    "desc": "Spark deep connection with games to play at home prompts."
  },
  {
    "id": "game_84",
    "slug": "attachment-style-quiz-for-couples",
    "title": "Attachment Style Quiz",
    "emoji": "🧠",
    "count": 15,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "quiz",
    "desc": "Spark deep connection with attachment style quiz prompts."
  },
  {
    "id": "game_85",
    "slug": "journal-prompts-for-couples",
    "title": "Couples Journal Prompts",
    "emoji": "📓",
    "count": 15,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "flashcard",
    "desc": "Spark deep connection with couples journal prompts prompts."
  },
  {
    "id": "game_86",
    "slug": "questions-before-moving-in-together",
    "title": "Before Moving In",
    "emoji": "🔑",
    "count": 18,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "flashcard",
    "desc": "Spark deep connection with before moving in prompts."
  },
  {
    "id": "game_87",
    "slug": "questions-to-ask-before-having-kids",
    "title": "Before Having Kids",
    "emoji": "👶",
    "count": 18,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "flashcard",
    "desc": "Spark deep connection with before having kids prompts."
  },
  {
    "id": "game_88",
    "slug": "gottman-love-map-questions",
    "title": "Love Map Questions",
    "emoji": "🗺️",
    "count": 15,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "flashcard",
    "desc": "Spark deep connection with love map questions prompts."
  },
  {
    "id": "game_89",
    "slug": "apology-language-quiz-for-couples",
    "title": "Apology Language Quiz",
    "emoji": "🕊️",
    "count": 15,
    "domain": "lifestyle",
    "categoryName": "Lifestyle & Growth",
    "type": "quiz",
    "desc": "Spark deep connection with apology language quiz prompts."
  }
];

/* ──────────────────────────────────────────────
   QUESTION ENGINE
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
  "What lesson about {topic} did you learn from your past experiences?",
  "If we could take a trip dedicated to {topic}, where would we go?",
  "What is a silly or funny memory we share about {topic}?",
  "How do you like to recharge when {topic} gets overwhelming?",
  "What makes you feel most proud of our relationship's {topic}?",
];

function generateQuestions(cat: Category): string[] {
  return Q_TEMPLATES.map((tmpl) => tmpl.replace("{topic}", cat.title.toLowerCase()));
}

/* ──────────────────────────────────────────────
   PARTICLE STARFIELD & SOUND FX
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
    const pts: P[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.25, speedY: (Math.random() - 0.5) * 0.25,
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
   GAME PLAYER COMPONENTS
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
   GAME CARD COMPONENT
────────────────────────────────────────────── */
function GameCard({ cat, onClick }: { cat: Category; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const isIcebreaker = cat.title.toLowerCase().includes("icebreaker");

  const secConfig = CATEGORIES_SECTION_CONFIG[cat.domain] || {
    color: "#D9476B",
    bg: "rgba(217, 71, 107, 0.12)",
  };

  const isWyr = cat.title.toLowerCase().includes("would you rather") || cat.slug === "would-you-rather-for-couples";

  const cardContent = (
    <div
      onClick={(isIcebreaker || isWyr) ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.035)",
        border: `1px solid ${hovered ? secConfig.color : "rgba(255,255,255,0.07)"}`,
        borderRadius: 22, padding: "18px 20px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        cursor: "pointer", transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        position: "relative", overflow: "hidden", backdropFilter: "blur(16px)",
        minHeight: 146,
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? `0 10px 25px -5px ${secConfig.color}33` : "none",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{
            fontSize: "1.7rem", width: 46, height: 46, borderRadius: 14,
            background: secConfig.bg,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `inset 0 0 0 1px ${secConfig.color}33`,
          }}>{cat.emoji}</div>
          <div style={{
            fontSize: "0.72rem", fontWeight: 800, padding: "3px 9px",
            background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)",
            color: "#10b981", borderRadius: 9999, textTransform: "uppercase", letterSpacing: "0.05em",
          }}>Free</div>
        </div>
        <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fff", marginBottom: 4, letterSpacing: "-0.01em" }}>{cat.title}</div>
        <div style={{ fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.45 }}>{cat.desc}</div>
      </div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginTop: 14, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.05)",
        fontSize: "0.8rem", color: "#94a3b8", fontWeight: 600,
      }}>
        <span>{cat.count} Prompts</span>
        <div style={{
          width: 26, height: 26, borderRadius: "50%",
          background: hovered ? secConfig.color : "rgba(255,255,255,0.06)",
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

  if (isWyr) {
    return (
      <Link href="/games/would-you-rather-for-couples" style={{ textDecoration: "none", color: "inherit" }}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

/* ──────────────────────────────────────────────
   DOMAIN TABS DATA
────────────────────────────────────────────── */
const DOMAIN_TABS: { id: Domain; label: string; count: number }[] = [
  { id: "all", label: "All Games", count: 89 },
  { id: "party", label: "🎲 Party Games", count: 9 },
  { id: "connection", label: "💬 Conversation", count: 18 },
  { id: "fun", label: "🎈 Fun & Lighthearted", count: 28 },
  { id: "romance", label: "❤️ Romance & Intimacy", count: 15 },
  { id: "lifestyle", label: "🌱 Lifestyle & Growth", count: 19 },
  { id: "favs", label: "❤️ Favorites", count: 0 },
];

/* ──────────────────────────────────────────────
   MAIN PAGE COMPONENT
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

  const groupedSections = useMemo(() => {
    if (domain !== "all" || search) return null;
    const groups: { dom: Exclude<Domain, "all" | "favs">; items: Category[] }[] = [
      { dom: "party", items: [] },
      { dom: "connection", items: [] },
      { dom: "fun", items: [] },
      { dom: "romance", items: [] },
      { dom: "lifestyle", items: [] },
    ];
    filtered.forEach((cat) => {
      const g = groups.find((grp) => grp.dom === cat.domain);
      if (g) g.items.push(cat);
    });
    return groups.filter((g) => g.items.length > 0);
  }, [domain, search, filtered]);

  return (
    <>
      <ParticleCanvas />
      <Toast message={toast.msg} visible={toast.visible} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        @keyframes pulseDot{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.4);opacity:0.6}}
        @keyframes cgOverlayIn{from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:scale(1)}}
        .cg-page *{box-sizing:border-box}
        .cg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin-bottom:32px}
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
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "6px 14px", background: "rgba(255,59,112,0.12)",
                border: "1px solid rgba(255,59,112,0.4)", borderRadius: 9999,
                fontSize: "0.85rem", fontWeight: 800, color: "#ff3b70", whiteSpace: "nowrap",
              }}>🔥 {streak} Day Streak</div>

              <button onClick={playRandom} style={{ ...btnSecondary, padding: "8px 14px", fontSize: "0.82rem", width: "auto" }}>
                Roll 🎲
              </button>

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
                89 Categories
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
            }}>✨ 89 Categories • 2,000+ Connection Prompts</div>

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
              Would You Rather, Truth or Dare, Deep Questions, Pillow Talk, and 85 more. Spark real conversations in 5 minutes.
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
              <span><b style={{ color: "#fff" }}>89</b> Categories</span>
              <span><b style={{ color: "#fff" }}>2,000+</b> Questions</span>
              <span><b style={{ color: "#fff" }}>100%</b> Free</span>
            </div>
          </section>

          {/* ── SEARCH & FILTER ── */}
          <section style={{ margin: "16px 0 28px", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ position: "relative", width: "100%", maxWidth: 540, margin: "0 auto" }}>
              <svg style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#64748b", pointerEvents: "none" }}
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search across 89 categories & 2,000+ questions..."
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
                >
                  {tab.label} {tab.id !== "favs" ? `(${tab.count})` : ""}
                </button>
              ))}
            </div>
          </section>

          {/* ── GRID ── */}
          <main>
            {groupedSections ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
                {groupedSections.map(({ dom, items }) => {
                  const cfg = CATEGORIES_SECTION_CONFIG[dom];
                  return (
                    <div key={dom} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: cfg.color, flexShrink: 0 }} />
                        <h3 style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.25em", color: cfg.color, margin: 0 }}>
                          {cfg.label}
                        </h3>
                        <div style={{ flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.06)" }} />
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b" }}>{items.length} games</span>
                      </div>

                      <div className="cg-grid">
                        {items.map((cat) => (
                          <GameCard
                            key={cat.id}
                            cat={cat}
                            onClick={() => { playPop(); setActiveGame(cat); }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
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
              </div>
            )}
          </main>

          {/* SEO Keyword & Guide Section */}
          <section
            aria-label="Free Couple Games Online Guide"
            style={{
              marginTop: 48,
              marginBottom: 20,
              padding: "24px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              borderRadius: 24,
              border: "1px solid rgba(255, 108, 109, 0.2)",
              color: "#E2E8F0",
              textAlign: "left",
            }}
          >
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ff6c6d", marginBottom: 10 }}>
              Free Couple Games to Play Online | Lovely & Rizz AI
            </h1>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "#94a3b8", marginBottom: 16 }}>
              Looking for <strong>online games for couples</strong>, <strong>couple games questions</strong>, or <strong>game of questions for couples</strong>? Play 89 free online couple games with deep questions, truth or dare, relationship quizzes, and <strong>coup card game</strong> inspired challenges.
            </p>

            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", marginTop: 16, marginBottom: 8 }}>
              Top Online Games for Couples
            </h2>
            <ul style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.7, paddingLeft: 20 }}>
              <li><strong>Classic Party Games:</strong> Would You Rather, Truth or Dare, Never Have I Ever, Most Likely To.</li>
              <li><strong>Deep Connection Questions:</strong> Build intimate bonds with thought-provoking questions.</li>
              <li><strong>Romance & Intimacy:</strong> Spark deep desire, romantic feelings, and playful flirty questions.</li>
            </ul>
          </section>

          {/* ── MORE ON THIS TOPIC & RICH FOOTER ── */}
          <section style={{ margin: "48px 0 0", textAlign: "center" }}>
            <div style={{
              fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em",
              color: "#94a3b8", marginBottom: 10
            }}>
              KEEP EXPLORING
            </div>
            <h2 style={{
              fontSize: "2.2rem", fontWeight: 300, fontFamily: "Georgia, serif", color: "#fff", marginBottom: 24
            }}>
              More on this topic
            </h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 54 }}>
              <Link href="/games/would-you-rather-for-couples" style={{
                padding: "12px 24px", borderRadius: 9999, backgroundColor: "#FFFFFF", color: "#0F172A",
                fontSize: "0.92rem", fontWeight: 700, textDecoration: "none", transition: "transform 0.2s, boxShadow 0.2s",
                boxShadow: "0 4px 15px rgba(255,255,255,0.1)"
              }}>Would You Rather</Link>
              <Link href="/games/truth-or-dare-for-couples" style={{
                padding: "12px 24px", borderRadius: 9999, backgroundColor: "#FFFFFF", color: "#0F172A",
                fontSize: "0.92rem", fontWeight: 700, textDecoration: "none", transition: "transform 0.2s, boxShadow 0.2s",
                boxShadow: "0 4px 15px rgba(255,255,255,0.1)"
              }}>Truth or Dare</Link>
              <Link href="/games/never-have-i-ever-for-couples" style={{
                padding: "12px 24px", borderRadius: 9999, backgroundColor: "#FFFFFF", color: "#0F172A",
                fontSize: "0.92rem", fontWeight: 700, textDecoration: "none", transition: "transform 0.2s, boxShadow 0.2s",
                boxShadow: "0 4px 15px rgba(255,255,255,0.1)"
              }}>Never Have I Ever</Link>
              <Link href="/games/deep-questions-for-couples" style={{
                padding: "12px 24px", borderRadius: 9999, backgroundColor: "#FFFFFF", color: "#0F172A",
                fontSize: "0.92rem", fontWeight: 700, textDecoration: "none", transition: "transform 0.2s, boxShadow 0.2s",
                boxShadow: "0 4px 15px rgba(255,255,255,0.1)"
              }}>Questions for Couples</Link>
            </div>
          </section>

          {/* ── BURGUNDY FOOTER ── */}
          <footer style={{
            width: "100vw",
            marginLeft: "calc(-50vw + 50%)",
            marginRight: "calc(-50vw + 50%)",
            backgroundColor: "#3B0F19",
            color: "#F8FAFC",
            padding: "54px 24px 110px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            boxSizing: "border-box",
          }}>
            <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 36, textAlign: "left" }}>
              
              {/* Brand Column */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 12,
                    background: "linear-gradient(135deg,#ff3b70 0%,#a855f7 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
                  }}>
                    ❤️
                  </div>
                  <span style={{ fontSize: "1.45rem", fontWeight: 800, color: "#fff", fontFamily: "Georgia, serif" }}>Lovely</span>
                </div>
                <p style={{ fontSize: "0.88rem", color: "#CBD5E1", lineHeight: 1.6, margin: 0, maxWidth: 260 }}>
                  Daily games, challenges, and activities designed to bring couples closer together.
                </p>
              </div>

              {/* POPULAR GAMES Column */}
              <div>
                <h4 style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#F472B6", marginBottom: 16 }}>
                  POPULAR GAMES
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: "0.9rem" }}>
                  <li><Link href="/games/would-you-rather-for-couples" style={{ color: "#E2E8F0", textDecoration: "none", transition: "color 0.2s" }}>🧐 Would You Rather</Link></li>
                  <li><Link href="/games/truth-or-dare-for-couples" style={{ color: "#E2E8F0", textDecoration: "none", transition: "color 0.2s" }}>🔥 Truth or Dare</Link></li>
                  <li><Link href="/games/this-or-that-for-couples" style={{ color: "#E2E8F0", textDecoration: "none", transition: "color 0.2s" }}>⚡ This or That</Link></li>
                  <li><Link href="/games/never-have-i-ever-for-couples" style={{ color: "#E2E8F0", textDecoration: "none", transition: "color 0.2s" }}>🙈 Never Have I Ever</Link></li>
                  <li><Link href="/games/most-likely-to-for-couples" style={{ color: "#E2E8F0", textDecoration: "none", transition: "color 0.2s" }}>👆 Most Likely To</Link></li>
                  <li><Link href="/games/deep-questions-for-couples" style={{ color: "#E2E8F0", textDecoration: "none", transition: "color 0.2s" }}>💬 Deep Questions</Link></li>
                  <li><Link href="/games/date-night-questions-for-couples" style={{ color: "#E2E8F0", textDecoration: "none", transition: "color 0.2s" }}>🌙 Date Night Questions</Link></li>
                  <li style={{ marginTop: 4 }}>
                    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ background: "none", border: "none", color: "#FF385C", fontWeight: 800, fontSize: "0.88rem", cursor: "pointer", padding: 0 }}>
                      Browse all →
                    </button>
                  </li>
                </ul>
              </div>

              {/* BROWSE Column */}
              <div>
                <h4 style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#F472B6", marginBottom: 16 }}>
                  BROWSE
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: "0.9rem" }}>
                  <li><button onClick={() => setDomain("all")} style={{ background: "none", border: "none", color: "#E2E8F0", cursor: "pointer", padding: 0, fontSize: "inherit", fontFamily: "inherit" }}>All Games</button></li>
                  <li><button onClick={() => setDomain("party")} style={{ background: "none", border: "none", color: "#E2E8F0", cursor: "pointer", padding: 0, fontSize: "inherit", fontFamily: "inherit" }}>Classics</button></li>
                  <li><button onClick={() => setDomain("connection")} style={{ background: "none", border: "none", color: "#E2E8F0", cursor: "pointer", padding: 0, fontSize: "inherit", fontFamily: "inherit" }}>Conversation</button></li>
                  <li><button onClick={() => setDomain("romance")} style={{ background: "none", border: "none", color: "#E2E8F0", cursor: "pointer", padding: 0, fontSize: "inherit", fontFamily: "inherit" }}>Romantic</button></li>
                  <li><button onClick={() => setDomain("lifestyle")} style={{ background: "none", border: "none", color: "#E2E8F0", cursor: "pointer", padding: 0, fontSize: "inherit", fontFamily: "inherit" }}>Date Night Ideas</button></li>
                  <li><button onClick={() => setDomain("fun")} style={{ background: "none", border: "none", color: "#E2E8F0", cursor: "pointer", padding: 0, fontSize: "inherit", fontFamily: "inherit" }}>Love Language Quiz</button></li>
                </ul>
              </div>

              {/* COMPANY Column */}
              <div>
                <h4 style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#F472B6", marginBottom: 16 }}>
                  COMPANY
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: "0.9rem" }}>
                  <li><Link href="/about" style={{ color: "#E2E8F0", textDecoration: "none" }}>About</Link></li>
                  <li><Link href="/contact" style={{ color: "#E2E8F0", textDecoration: "none" }}>Contact</Link></li>
                  <li><Link href="/privacy" style={{ color: "#E2E8F0", textDecoration: "none" }}>Privacy Policy</Link></li>
                  <li><Link href="/terms" style={{ color: "#E2E8F0", textDecoration: "none" }}>Terms of Service</Link></li>
                </ul>
              </div>
            </div>

            <div style={{ maxWidth: 1160, margin: "40px auto 0", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, fontSize: "0.82rem", color: "#94A3B8" }}>
              <p style={{ margin: 0 }}>© 2026 Lovely & Rizz AI · rizzai.space · All rights reserved.</p>
              <p style={{ margin: 0 }}>Designed to bring couples closer together.</p>
            </div>
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
