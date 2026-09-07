export type GameCategory =
  | "classics"
  | "conversation"
  | "fun"
  | "romance"
  | "lifestyle";

export type QuestionType = "prompt" | "choice" | "truth" | "dare";

export interface QuestionItem {
  id: string;
  text: string;
  optionA?: string;
  optionB?: string;
  type?: QuestionType;
}

export interface GameModule {
  slug: string;
  title: string;
  emoji: string;
  category: GameCategory;
  description: string;
  questionCount: number;
  estimatedTime: string;
  bestFor: string;
  questions: QuestionItem[];
}

const questions = (
  slug: string,
  items: Array<Omit<QuestionItem, "id">>,
): QuestionItem[] => items.map((item, index) => ({ ...item, id: `${slug}-${index + 1}` }));

export const coupleGames: GameModule[] = [
  {
    slug: "would-you-rather",
    title: "Would You Rather",
    emoji: "🤔",
    category: "classics",
    description: "Trade impossible choices, laugh loudly, and learn what your partner really values.",
    questionCount: 150,
    estimatedTime: "10-30 min",
    bestFor: "Date nights, road trips",
    questions: questions("would-you-rather", [
      { text: "Where would you rather wake up together?", optionA: "In a cabin in the mountains", optionB: "In a beach house by the ocean", type: "choice" },
      { text: "Which shared superpower would you choose?", optionA: "Read each other's minds", optionB: "Pause time for private adventures", type: "choice" },
      { text: "What would make the better surprise date?", optionA: "A mystery city weekend", optionB: "A cozy night designed at home", type: "choice" },
      { text: "Which future sounds more exciting?", optionA: "Travel the world for a year", optionB: "Build a dream home together", type: "choice" },
      { text: "Which tiny luxury would you keep forever?", optionA: "Unlimited coffee", optionB: "Unlimited plane tickets", type: "choice" },
    ]),
  },
  {
    slug: "this-or-that",
    title: "This or That",
    emoji: "⚡",
    category: "classics",
    description: "Make quick couple choices and see where your tastes match or surprise each other.",
    questionCount: 100,
    estimatedTime: "5-20 min",
    bestFor: "First dates, quick breaks",
    questions: questions("this-or-that", [
      { text: "Pick your perfect evening.", optionA: "Sunset dinner", optionB: "Sunrise breakfast", type: "choice" },
      { text: "Choose a weekend mood.", optionA: "City exploring", optionB: "Quiet countryside", type: "choice" },
      { text: "Choose a love language to receive today.", optionA: "Thoughtful words", optionB: "A thoughtful action", type: "choice" },
      { text: "Choose a shared hobby.", optionA: "Cooking together", optionB: "Dancing together", type: "choice" },
      { text: "Choose a keepsake.", optionA: "Handwritten letters", optionB: "Printed photos", type: "choice" },
    ]),
  },
  {
    slug: "truth-or-dare",
    title: "Truth or Dare",
    emoji: "🔥",
    category: "classics",
    description: "A playful, couple-friendly truth or dare deck with room for sweet and silly moments.",
    questionCount: 70,
    estimatedTime: "10-25 min",
    bestFor: "Sleepovers, parties",
    questions: questions("truth-or-dare", [
      { text: "What is one small thing I do that makes you feel loved?", type: "truth" },
      { text: "Tell me the first thing you noticed about me.", type: "truth" },
      { text: "Give your partner a dramatic movie-trailer compliment.", type: "dare" },
      { text: "Recreate your first impression of your partner.", type: "dare" },
      { text: "What is a dream you have not told many people about?", type: "truth" },
    ]),
  },
  {
    slug: "never-have-i-ever",
    title: "Never Have I Ever",
    emoji: "🙈",
    category: "classics",
    description: "Swap stories about the things you have tried, almost tried, or secretly want to try.",
    questionCount: 60,
    estimatedTime: "10-20 min",
    bestFor: "Double dates, parties",
    questions: questions("never-have-i-ever", [
      { text: "Never have I ever planned a surprise and nearly spoiled it." },
      { text: "Never have I ever laughed at the worst possible moment." },
      { text: "Never have I ever wanted to learn a totally unexpected skill." },
      { text: "Never have I ever sent a message to the wrong person." },
      { text: "Never have I ever taken a spontaneous trip." },
    ]),
  },
  {
    slug: "conversation-starters",
    title: "Conversation Starters",
    emoji: "💬",
    category: "conversation",
    description: "Easy prompts that turn a quiet moment into a conversation worth remembering.",
    questionCount: 40,
    estimatedTime: "10-30 min",
    bestFor: "New couples, dinner dates",
    questions: questions("conversation-starters", [
      { text: "What has been the best part of your week so far?" },
      { text: "What is something you want us to make time for this month?" },
      { text: "Which ordinary moment with me do you secretly love?" },
      { text: "What would your ideal slow Sunday look like?" },
      { text: "What is something you are curious to learn about me?" },
    ]),
  },
  {
    slug: "deep-questions",
    title: "Deep Questions",
    emoji: "🌊",
    category: "conversation",
    description: "Thoughtful prompts for the honest, unhurried conversations that make relationships stronger.",
    questionCount: 35,
    estimatedTime: "20-45 min",
    bestFor: "Long evenings, meaningful check-ins",
    questions: questions("deep-questions", [
      { text: "What part of your life feels most like it is becoming yours?" },
      { text: "What does feeling safe in a relationship mean to you?" },
      { text: "Which lesson from your past still shapes how you love?" },
      { text: "What kind of support is hardest for you to ask for?" },
      { text: "What do you hope we never take for granted?" },
    ]),
  },
  {
    slug: "pillow-talk",
    title: "Pillow Talk",
    emoji: "🌙",
    category: "conversation",
    description: "Soft, intimate questions for late nights when you want to feel a little closer.",
    questionCount: 30,
    estimatedTime: "15-30 min",
    bestFor: "Bedtime, quiet weekends",
    questions: questions("pillow-talk", [
      { text: "What is your favorite memory of us from this year?" },
      { text: "When do you feel most understood by me?" },
      { text: "What tiny ritual should we create together?" },
      { text: "What is a place you would love to fall asleep beside me?" },
      { text: "What would make tomorrow feel especially good?" },
    ]),
  },
  {
    slug: "funny-questions",
    title: "Funny Questions",
    emoji: "😂",
    category: "fun",
    description: "Low-pressure questions designed to produce ridiculous answers and inside jokes.",
    questionCount: 60,
    estimatedTime: "5-15 min",
    bestFor: "Laugh breaks, group dates",
    questions: questions("funny-questions", [
      { text: "What would your completely useless superpower be?" },
      { text: "Which animal would be the worst couples therapist?" },
      { text: "What is the funniest wrong assumption someone has made about you?" },
      { text: "If our relationship had a theme song, what would it be?" },
      { text: "What food would you ban from our kitchen for dramatic reasons?" },
    ]),
  },
  {
    slug: "red-green-flags",
    title: "Red or Green Flag",
    emoji: "🚩",
    category: "fun",
    description: "Debate everyday relationship scenarios and compare your personal green and red flags.",
    questionCount: 54,
    estimatedTime: "10-25 min",
    bestFor: "New couples, double dates",
    questions: questions("red-green-flags", [
      { text: "They bring snacks for the whole group without being asked." },
      { text: "They clap when the movie ends in a cinema." },
      { text: "They remember your coffee order after hearing it once." },
      { text: "They turn every small disagreement into a courtroom speech." },
      { text: "They send you a photo of a dog they saw because it looked like your dog." },
    ]),
  },
  {
    slug: "romantic-questions",
    title: "Romantic Questions",
    emoji: "💕",
    category: "romance",
    description: "Warm prompts for appreciation, affection, and remembering what makes your bond special.",
    questionCount: 60,
    estimatedTime: "15-30 min",
    bestFor: "Date nights, anniversaries",
    questions: questions("romantic-questions", [
      { text: "What moment made you realize we were becoming something special?" },
      { text: "What kind of affection always makes your day better?" },
      { text: "What is one date we should recreate?" },
      { text: "What do you think we do especially well as a team?" },
      { text: "What would you put in a time capsule about us?" },
    ]),
  },
  {
    slug: "flirty-questions",
    title: "Flirty Questions",
    emoji: "😏",
    category: "romance",
    description: "Playful, consenting prompts that keep the spark bright without taking themselves too seriously.",
    questionCount: 60,
    estimatedTime: "10-20 min",
    bestFor: "Date nights, texting",
    questions: questions("flirty-questions", [
      { text: "What is the most attractive thing I do without realizing it?" },
      { text: "Which outfit of mine should make a comeback?" },
      { text: "What kind of surprise date would make you blush?" },
      { text: "What compliment from me never gets old?" },
      { text: "What is your favorite way for us to steal five minutes together?" },
    ]),
  },
  {
    slug: "love-language-quiz",
    title: "Love Language Quiz",
    emoji: "💝",
    category: "romance",
    description: "A quick five-style quiz to compare how you naturally give and receive care.",
    questionCount: 15,
    estimatedTime: "5-10 min",
    bestFor: "New relationships, check-ins",
    questions: questions("love-language-quiz", [
      { text: "When you have had a difficult day, what helps most?", optionA: "A thoughtful hug", optionB: "Someone taking a task off your plate", type: "choice" },
      { text: "Which surprise feels more meaningful?", optionA: "A handwritten note", optionB: "Undivided time together", type: "choice" },
      { text: "How do you most naturally show care?", optionA: "Saying exactly what I appreciate", optionB: "Giving a small thoughtful gift", type: "choice" },
      { text: "What makes an ordinary day feel special?", optionA: "A planned little date", optionB: "A spontaneous touch or cuddle", type: "choice" },
      { text: "What would you remember longest?", optionA: "A beautiful compliment", optionB: "A partner helping without being asked", type: "choice" },
    ]),
  },
  {
    slug: "long-distance-connect",
    title: "Long Distance Connect",
    emoji: "🌍",
    category: "lifestyle",
    description: "Small prompts and rituals that help couples feel present across the miles.",
    questionCount: 55,
    estimatedTime: "10-25 min",
    bestFor: "Long-distance couples, video calls",
    questions: questions("long-distance-connect", [
      { text: "What part of your day do you most wish I could have seen?" },
      { text: "What shared ritual could make distance feel smaller?" },
      { text: "What should our next visit absolutely include?" },
      { text: "What photo from today would you send me with no explanation?" },
      { text: "What are we building together while we wait for our next reunion?" },
    ]),
  },
  {
    slug: "relationship-check-in",
    title: "Relationship Check-In",
    emoji: "🩺",
    category: "lifestyle",
    description: "A calm, constructive check-in for noticing what is working and what needs care.",
    questionCount: 55,
    estimatedTime: "20-40 min",
    bestFor: "Monthly check-ins, growing couples",
    questions: questions("relationship-check-in", [
      { text: "What has felt especially good between us lately?" },
      { text: "Where could we make more room for each other?" },
      { text: "Is there a small unresolved thing we should gently talk through?" },
      { text: "What support would feel useful this week?" },
      { text: "What should we celebrate before this conversation ends?" },
    ]),
  },
  {
    slug: "bucket-list",
    title: "Couple Bucket List",
    emoji: "✈️",
    category: "lifestyle",
    description: "Turn daydreams into a shared list of adventures, experiments, and tiny wins.",
    questionCount: 55,
    estimatedTime: "15-30 min",
    bestFor: "Planning dates, travel dreams",
    questions: questions("bucket-list", [
      { text: "What place should we visit before the end of this year?" },
      { text: "What skill would be fun to learn together?" },
      { text: "What ordinary thing should we turn into a tradition?" },
      { text: "What is one brave, slightly impractical dream we should keep?" },
      { text: "What adventure could we do on a very small budget?" },
    ]),
  },
];

export const catalogSlugs = [
  "would-you-rather-for-couples", "this-or-that-for-couples", "truth-or-dare-for-couples", "never-have-i-ever-for-couples", "most-likely-to-for-couples", "two-truths-and-a-lie-for-couples", "yes-or-no-questions-for-couples", "mr-and-mrs-questions", "couple-quiz-how-well-do-you-know-me",
  "conversation-starters-for-couples", "deep-questions-for-couples", "pillow-talk-questions-for-couples", "date-night-questions-for-couples", "pet-peeve-or-dealbreaker", "finish-my-sentence", "mystery-scenarios", "guilty-pleasures", "first-date-questions", "questions-for-married-couples", "hypothetical-questions-for-couples", "questions-to-ask-your-partner", "relationship-questions-to-ask", "questions-to-ask-before-marriage", "questions-to-ask-your-fiance", "questions-to-ask-your-spouse", "100-questions-to-ask-your-partner", "50-questions-for-couples",
  "ice-breaker-questions-for-couples", "speed-dating-questions-for-couples", "funny-questions-for-couples", "couple-trivia-questions", "21-questions-for-couples", "how-well-do-you-know-me-questions-for-couples", "drinking-games-for-couples", "couple-challenge-questions", "hot-seat-questions-for-couples", "who-knows-me-better-questions-for-couples", "rapid-fire-questions-for-couples", "red-flag-green-flag", "hot-takes", "emoji-decoder", "love-mad-libs", "spin-the-wheel", "predict-your-partner", "couple-superlatives", "song-lyric-challenge", "truth-or-drink-questions", "kiss-marry-kill-for-couples", "20-questions-game-for-couples", "unpopular-opinions-for-couples", "fun-questions-for-couples", "paranoia-questions-for-couples", "finish-the-sentence-for-couples", "wedding-shoe-game-questions", "would-you-still-love-me-if-questions",
  "romantic-questions-for-couples", "questions-to-ask-your-boyfriend", "questions-to-ask-your-girlfriend", "newlywed-game-questions", "36-questions-to-fall-in-love", "love-language-quiz-for-couples", "questions-to-ask-your-husband", "questions-to-ask-your-wife", "questions-to-ask-your-crush", "flirty-questions-to-ask-a-guy", "flirty-questions-to-ask-a-girl", "anniversary-questions-for-couples", "intimate-questions-for-couples", "cute-couple-games", "questions-that-will-make-you-cry",
  "long-distance-relationship-games", "couple-bucket-list-ideas", "relationship-check-in-questions", "texting-games-for-couples", "couples-compatibility-test", "at-home-date-night-ideas-for-couples", "couple-bingo", "valentines-day-games-for-couples", "road-trip-games-for-couples", "couple-games-no-equipment", "date-night-games-for-couples", "couple-games-online-free", "couple-games-to-play-at-home", "attachment-style-quiz-for-couples", "journal-prompts-for-couples", "questions-before-moving-in-together", "questions-to-ask-before-having-kids", "gottman-love-map-questions", "apology-language-quiz-for-couples",
];

const fallbackQuestions = (slug: string, title: string): QuestionItem[] =>
  questions(slug, [
    { text: `What is one thing you would love to explore together through ${title.toLowerCase()}?` },
    { text: `What is your funniest memory connected to ${title.toLowerCase()}?` },
    { text: `How could we make ${title.toLowerCase()} part of a great date?` },
    { text: `What would surprise me about your answer to ${title.toLowerCase()}?` },
    { text: `What is one small goal we could set around ${title.toLowerCase()}?` },
  ]);

export const gameBySlug = (slug: string): GameModule => {
  const aliases: Record<string, string> = {
    "would-you-rather-for-couples": "would-you-rather",
    "truth-or-dare-for-couples": "truth-or-dare",
    "conversation-starters-for-couples": "conversation-starters",
    "deep-questions-for-couples": "deep-questions",
    "pillow-talk-questions-for-couples": "pillow-talk",
    "funny-questions-for-couples": "funny-questions",
    "romantic-questions-for-couples": "romantic-questions",
    "love-language-quiz-for-couples": "love-language-quiz",
    "long-distance-relationship-games": "long-distance-connect",
    "couple-bucket-list-ideas": "bucket-list",
    "relationship-check-in-questions": "relationship-check-in",
  };
  const knownGame = coupleGames.find((game) => game.slug === (aliases[slug] || slug));
  if (knownGame) return knownGame;

  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    slug,
    title,
    emoji: "💬",
    category: "fun",
    description: `A playful set of ${title.toLowerCase()} prompts for couples to enjoy together.`,
    questionCount: 20,
    estimatedTime: "5-20 min",
    bestFor: "Date nights and relaxed conversations",
    questions: fallbackQuestions(slug, title),
  };
};

export const gameCategoryLabels: Record<GameCategory, string> = {
  classics: "Classics",
  conversation: "Conversation",
  fun: "Fun & Chill",
  romance: "Romance & Spice",
  lifestyle: "Lifestyle & Growth",
};
