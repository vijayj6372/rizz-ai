export type FeatureMode =
  | "rate-bf"
  | "rate-gf"
  | "rate-crush"
  | "rate-couple"
  | "roast-ex"
  | "rate-ex";

export interface FeatureModeConfig {
  id: FeatureMode;
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  badge: string;
  person1Label: string;
  person2Label: string;
  showPerson2: boolean;
}

export const FEATURE_MODES: FeatureModeConfig[] = [
  {
    id: "rate-bf",
    title: "Rate My Boyfriend",
    subtitle: "Analyze his devotion, green flags & long-term potential ❤️",
    icon: "👦",
    gradient: "from-pink-500 to-rose-600",
    badge: "Boyfriend Rating",
    person1Label: "Your Name",
    person2Label: "Boyfriend's Name",
    showPerson2: true,
  },
  {
    id: "rate-gf",
    title: "Rate My Girlfriend",
    subtitle: "Evaluate her affection, heart sync & relationship magic 💖",
    icon: "👧",
    gradient: "from-purple-500 to-pink-500",
    badge: "Girlfriend Rating",
    person1Label: "Your Name",
    person2Label: "Girlfriend's Name",
    showPerson2: true,
  },
  {
    id: "rate-crush",
    title: "Rate Me vs Crush",
    subtitle: "Discover your crush probability & mutual spark intensity 😍",
    icon: "😍",
    gradient: "from-amber-400 to-rose-500",
    badge: "Crush Match",
    person1Label: "Your Name",
    person2Label: "Crush's Name",
    showPerson2: true,
  },
  {
    id: "rate-couple",
    title: "Rate Me vs GF/BF",
    subtitle: "Complete couple synergy, marriage score & soul connection 💕",
    icon: "💞",
    gradient: "from-rose-500 to-indigo-600",
    badge: "Couple Synergy",
    person1Label: "Partner 1",
    person2Label: "Partner 2",
    showPerson2: true,
  },
  {
    id: "roast-ex",
    title: "Roast My Ex",
    subtitle: "Unfiltered AI savage roast, clown meter & drama score 😂",
    icon: "🔥",
    gradient: "from-orange-500 to-red-600",
    badge: "Savage AI Roast",
    person1Label: "Your Name",
    person2Label: "Ex's Name",
    showPerson2: true,
  },
  {
    id: "rate-ex",
    title: "Rate My Ex",
    subtitle: "Move-on index, regret probability & 'Should You Text?' verdict 💔",
    icon: "💔",
    gradient: "from-slate-700 to-purple-900",
    badge: "Ex Audit",
    person1Label: "Your Name",
    person2Label: "Ex's Name",
    showPerson2: true,
  },
];

export interface MarriageMetrics {
  compatibility: number;
  successScore: number;
  familyCompatibility: number;
  lifeGoalsAlignment: number;
  communicationMatch: number;
  trustLevel: number;
  longTermStability: number;
  advice: string;
}

export interface FallsFirstMetrics {
  fallsFirstProbability: number;
  emotionalAttachment: number;
  interestLevel: number;
  thinkingAboutYou: number;
  crushIntensity: number;
  initiatesContactScore: number;
  obsessionMeter: number;
  attachmentSpeed: number;
  verdict: string;
}

export interface LovesMoreMetrics {
  loveIntensity: number;
  effortScore: number;
  affectionScore: number;
  careLevel: number;
  emotionalInvestment: number;
  giftGiving: number;
  timeInvestment: number;
  actsOfService: number;
  verdict: string;
}

export interface SoulmateMetrics {
  soulConnection: number;
  personalityHarmony: number;
  heartSyncScore: number;
  destinyMatch: number;
  energyCompatibility: number;
  soulmateProbability: number;
  spiritualMatch: number;
  universeAlignment: number;
}

export interface RoastExMetrics {
  savageLevel: number;
  toxicity: number;
  dramaMeter: number;
  walkingRedFlag: number;
  mainCharacterSyndrome: number;
  gaslightingProbability: number;
  clownMeter: number;
  entertainmentRating: number;
  aiRoastText: string;
}

export interface RateExMetrics {
  overallRating: number;
  loyalty: number;
  communication: number;
  effort: number;
  greenFlagsCount: number;
  redFlagsCount: number;
  regretProbability: number;
  shouldYouTextThem: "NEVER!" | "NO WAY 🚫" | "MAYBE FRIENDS 🤝" | "SLIGHT REGRET 😅";
  moveOnScore: number;
}

export interface BonusMetrics {
  luckyCoupleScore: number;
  chemistryLevel: number;
  happinessPotential: number;
  attractionStrength: number;
  conversationVibe: number;
  futureTogetherScore: number;
  greenFlagRatio: number;
  redFlagRatio: number;
  relationshipValue: number;
  romanceLevel: number;
  perfectMatchScore: number;
}

export interface RadarPoint {
  subject: string;
  A: number;
  fullMark: number;
}

export interface LoveMetrics {
  romance: number;
  communication: number;
  passion: number;
  harmony: number;
}

export interface LoveLifeResult {
  id: string;
  featureMode: FeatureMode;
  name1: string;
  name2: string;
  photo1?: string;
  photo2?: string;
  score: number;
  compatibilityDesc: string;
  marriageText: string;
  marriageMonthYear: string;
  childrenCount: number;
  childrenText: string;
  metrics: LoveMetrics;
  marriage: MarriageMetrics;
  whoFallsFirst: FallsFirstMetrics;
  whoLovesMore: LovesMoreMetrics;
  soulmates: SoulmateMetrics;
  roastEx?: RoastExMetrics;
  rateEx?: RateExMetrics;
  bonusMetrics: BonusMetrics;
  radarData: RadarPoint[];
  aiSummary: {
    overview: string;
    strengths: string[];
    weaknesses: string[];
    greenFlags: string[];
    redFlags: string[];
    advice: string;
    futurePrediction: string;
  };
  createdAt: string;
}

const COMPATIBILITY_DESCRIPTIONS: { threshold: number; text: string }[] = [
  {
    threshold: 95,
    text: "An extraordinary chemistry! Your connection is written in the stars! ⛰️💖",
  },
  {
    threshold: 90,
    text: "Unstoppable connection! You two are absolute soulmates! ✨💫",
  },
  {
    threshold: 85,
    text: "Pure magic! A passionate and deeply comforting bond! 🔥🌹",
  },
  {
    threshold: 80,
    text: "High-voltage sparks! Endless laughter and total harmony! ⚡🥂",
  },
  {
    threshold: 75,
    text: "Sweet & harmonious! Built on trust, warmth, and cozy cuddles! 🥞☕",
  },
  {
    threshold: 70,
    text: "A beautiful slow burn! Growing warmer and stronger every day! 🌱🌸",
  },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MARRIAGE_TEMPLATES = [
  "Let the preparations begin! Your wedding is planned for {monthYear}! 💒🥂",
  "A fairytale sunset ceremony is waiting for you in {monthYear}! 💍✨",
  "Get ready for the party of the century! You'll exchange vows in {monthYear}! 🎉👰",
  "Destiny has chosen its date! Your dream wedding takes place in {monthYear}! 🕊️💖",
];

const ROAST_QUOTES = [
  "This person's text response rate moves slower than a software update on 2G Wi-Fi 🐢.",
  "They think being 'emotionally unavailable' is a luxury lifestyle brand 🤡.",
  "100% chance they still check their ex's Spotify public playlists for subliminal messages 😂.",
  "Their red flags are so bright you could use them as emergency flares on a dark highway 🚩⚡.",
  "Main character syndrome level: 99.9%. They treat relationships like an audition for a reality TV show 📺.",
];

export function calculateLoveLife(
  name1: string,
  name2: string = "",
  mode: FeatureMode = "rate-couple",
  photo1?: string,
  photo2?: string,
  quizAnswers?: Record<string, string>
): LoveLifeResult {
  const n1 = name1.trim().toLowerCase() || "person a";
  const n2 = name2.trim().toLowerCase() || "person b";
  const combined = [n1, n2, mode].sort().join("+");

  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  // Score boost from quiz if answered
  const quizBonus = quizAnswers ? Object.keys(quizAnswers).length * 2 : 0;
  
  // Base overall score
  let baseMin = mode === "roast-ex" ? 42 : mode === "rate-ex" ? 55 : 76;
  let scoreRange = mode === "roast-ex" ? 50 : mode === "rate-ex" ? 40 : 23;
  const rawScore = baseMin + (absHash % scoreRange) + (quizBonus % 5);
  const score = Math.min(99, Math.max(35, rawScore));

  const matchDesc =
    COMPATIBILITY_DESCRIPTIONS.find((d) => score >= d.threshold) ||
    COMPATIBILITY_DESCRIPTIONS[COMPATIBILITY_DESCRIPTIONS.length - 1];

  // Marriage Month/Year
  const startYear = 2028 + (absHash % 6);
  const monthIndex = absHash % 12;
  const monthYear = `${MONTHS[monthIndex]} ${startYear}`;
  const marriageTemplate = MARRIAGE_TEMPLATES[absHash % MARRIAGE_TEMPLATES.length];
  const marriageText = marriageTemplate.replace("{monthYear}", monthYear);

  // Children calculation
  const childrenCount = 1 + ((absHash >> 3) % 4);
  const childEmojis = ["👶", "👧", "👦"];
  const childEntries: string[] = [];
  for (let i = 0; i < childrenCount; i++) {
    const emoji = childEmojis[(absHash + i) % childEmojis.length];
    const year = startYear + 1 + i * 2;
    childEntries.push(`one ${emoji} in ${year}`);
  }
  const childrenText =
    childrenCount === 1
      ? `You will have 1 child! ${childEntries[0]}! 🍼`
      : `You will have ${childrenCount} children! ${childEntries.join(", ")}! 🍼`;

  // Super Feature 1: Marriage Compatibility
  const marriageComp = Math.min(99, Math.max(50, score + ((absHash % 7) - 3)));
  const marriage: MarriageMetrics = {
    compatibility: marriageComp,
    successScore: Math.min(99, Math.max(52, marriageComp + ((absHash % 5) - 2))),
    familyCompatibility: 75 + ((absHash * 3) % 24),
    lifeGoalsAlignment: 78 + ((absHash * 5) % 21),
    communicationMatch: 70 + ((absHash * 7) % 28),
    trustLevel: 80 + ((absHash * 11) % 19),
    longTermStability: 76 + ((absHash * 13) % 23),
    advice: "Focus on open weekly heart-to-hearts and shared long-term financial planning.",
  };

  // Super Feature 2: Who Falls First?
  const fallsFirstProb = 65 + (absHash % 34);
  const winnerName = fallsFirstProb > 80 ? (name1 || "You") : (name2 || "Your Partner");
  const whoFallsFirst: FallsFirstMetrics = {
    fallsFirstProbability: fallsFirstProb,
    emotionalAttachment: 72 + ((absHash * 4) % 27),
    interestLevel: 82 + ((absHash * 6) % 17),
    thinkingAboutYou: 88 + ((absHash * 8) % 11),
    crushIntensity: 85 + ((absHash * 2) % 14),
    initiatesContactScore: 79 + ((absHash * 9) % 20),
    obsessionMeter: 70 + ((absHash * 14) % 29),
    attachmentSpeed: 77 + ((absHash * 10) % 22),
    verdict: `${winnerName} fell hard first! Couldn't keep their eyes off you! 😍🔥`,
  };

  // Super Feature 3: Who Loves More?
  const loverName = (absHash % 2 === 0) ? (name1 || "You") : (name2 || "Your Partner");
  const whoLovesMore: LovesMoreMetrics = {
    loveIntensity: 84 + ((absHash * 3) % 15),
    effortScore: 78 + ((absHash * 5) % 21),
    affectionScore: 82 + ((absHash * 7) % 17),
    careLevel: 89 + ((absHash * 9) % 10),
    emotionalInvestment: 85 + ((absHash * 11) % 14),
    giftGiving: 73 + ((absHash * 13) % 25),
    timeInvestment: 80 + ((absHash * 15) % 19),
    actsOfService: 86 + ((absHash * 17) % 13),
    verdict: `${loverName} shows slightly higher emotional investment & daily effort! 👑💖`,
  };

  // Super Feature 4: Are We Soulmates?
  const soulmates: SoulmateMetrics = {
    soulConnection: Math.min(99, Math.max(60, score + ((absHash % 9) - 4))),
    personalityHarmony: 75 + ((absHash * 4) % 24),
    heartSyncScore: 82 + ((absHash * 8) % 17),
    destinyMatch: 86 + ((absHash * 12) % 13),
    energyCompatibility: 88 + ((absHash * 16) % 11),
    soulmateProbability: Math.min(99, Math.max(65, score + 2)),
    spiritualMatch: 79 + ((absHash * 20) % 20),
    universeAlignment: 91 + ((absHash * 24) % 8),
  };

  // Roast Ex metrics
  const roastQuoteIndex = absHash % ROAST_QUOTES.length;
  const roastEx: RoastExMetrics = {
    savageLevel: 85 + (absHash % 14),
    toxicity: 60 + ((absHash * 3) % 35),
    dramaMeter: 70 + ((absHash * 5) % 28),
    walkingRedFlag: 65 + ((absHash * 7) % 32),
    mainCharacterSyndrome: 80 + ((absHash * 9) % 19),
    gaslightingProbability: 55 + ((absHash * 11) % 40),
    clownMeter: 88 + ((absHash * 13) % 11),
    entertainmentRating: 95,
    aiRoastText: ROAST_QUOTES[roastQuoteIndex],
  };

  // Rate Ex metrics
  const rateEx: RateExMetrics = {
    overallRating: Math.max(30, score - 25),
    loyalty: 55 + ((absHash * 2) % 40),
    communication: 48 + ((absHash * 4) % 45),
    effort: 52 + ((absHash * 6) % 42),
    greenFlagsCount: 1 + (absHash % 3),
    redFlagsCount: 3 + (absHash % 5),
    regretProbability: 78 + (absHash % 20),
    shouldYouTextThem: absHash % 4 === 0 ? "SLIGHT REGRET 😅" : absHash % 4 === 1 ? "MAYBE FRIENDS 🤝" : absHash % 4 === 2 ? "NO WAY 🚫" : "NEVER!",
    moveOnScore: 88 + (absHash % 11),
  };

  // Bonus Metrics
  const bonusMetrics: BonusMetrics = {
    luckyCoupleScore: 80 + ((absHash * 2) % 19),
    chemistryLevel: 85 + ((absHash * 4) % 14),
    happinessPotential: 88 + ((absHash * 6) % 11),
    attractionStrength: 90 + ((absHash * 8) % 9),
    conversationVibe: 83 + ((absHash * 10) % 16),
    futureTogetherScore: 86 + ((absHash * 12) % 13),
    greenFlagRatio: 82,
    redFlagRatio: 18,
    relationshipValue: 92,
    romanceLevel: 87 + ((absHash * 14) % 12),
    perfectMatchScore: score,
  };

  // Radar Data
  const radarData: RadarPoint[] = [
    { subject: "Romance 🌹", A: bonusMetrics.romanceLevel, fullMark: 100 },
    { subject: "Communication 💬", A: marriage.communicationMatch, fullMark: 100 },
    { subject: "Passion 🔥", A: bonusMetrics.chemistryLevel, fullMark: 100 },
    { subject: "Harmony 🧘", A: soulmates.personalityHarmony, fullMark: 100 },
    { subject: "Trust 🤝", A: marriage.trustLevel, fullMark: 100 },
    { subject: "Future 🚀", A: bonusMetrics.futureTogetherScore, fullMark: 100 },
  ];

  // AI Summary & Insights
  const p1 = name1 || "Partner 1";
  const p2 = name2 || "Partner 2";
  const aiSummary = {
    overview: `Analysis reveals a powerful synergy between ${p1} and ${p2}. With an overall match index of ${score}%, your emotional frequency aligns remarkably well across key lifestyle indicators.`,
    strengths: [
      "High emotional security and intuitive communication style",
      "Shared sense of humor and mutual support during challenges",
      "Strong attraction spark backed by genuine care and friendship",
    ],
    weaknesses: [
      "Occasional miscommunication when discussing long-term plans",
      "Needing more scheduled quality dates during busy weeks",
    ],
    greenFlags: [
      "Actively listens without interrupting",
      "Celebrates small achievements together",
      "Respects personal boundaries and growth space",
    ],
    redFlags: [
      "Tendency to procrastinate conflict resolution",
      "Overanalyzing late texts",
    ],
    advice:
      "Nurture your connection with small daily acts of appreciation and plan a quarterly getaway together!",
    futurePrediction: `High probability of long-term milestone achievements by ${startYear}! Keep building your shared dreams!`,
  };

  return {
    id: `love-${Date.now()}-${absHash}`,
    featureMode: mode,
    name1: name1.trim(),
    name2: name2.trim(),
    photo1,
    photo2,
    score,
    compatibilityDesc: matchDesc.text,
    marriageText,
    marriageMonthYear: monthYear,
    childrenCount,
    childrenText,
    metrics: {
      romance: bonusMetrics.romanceLevel,
      communication: marriage.communicationMatch,
      passion: bonusMetrics.chemistryLevel,
      harmony: soulmates.personalityHarmony,
    },
    marriage,
    whoFallsFirst,
    whoLovesMore,
    soulmates,
    roastEx: (mode === "roast-ex" || mode === "rate-ex") ? roastEx : undefined,
    rateEx: (mode === "rate-ex") ? rateEx : undefined,
    bonusMetrics,
    radarData,
    aiSummary,
    createdAt: new Date().toISOString(),
  };
}
