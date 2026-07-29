export interface LoveVibe {
  name: string;
  description: string;
}

export interface LoveStatus {
  name: string;
  description: string;
}

export interface LoveColor {
  name: string;
  hex: string;
  description: string;
}

export interface LoveDay {
  name: string;
  emoji: string;
  description: string;
}

export interface LoveSymbol {
  name: string;
  emoji: string;
  description: string;
}

export interface AstrologyMatch {
  sign: string;
  description: string;
}

export interface HorizonIdea {
  title: string;
  emoji: string;
  description: string;
}

export interface FutureForecast {
  oneYear: string;
  threeYears: string;
  fiveYears: string;
  tenYears: string;
}

export const LOVE_VIBES: LoveVibe[] = [
  { name: "Romantic", description: "High balance of romance, affection, and passion." },
  { name: "Playful & Fun", description: "Heavy on inside jokes, friendly teasing, and high energy adventures." },
  { name: "Intense & Passionate", description: "Magnetically drawn to each other with deep, all-consuming emotion." },
  { name: "Cozy & Comfortable", description: "Feels like Sunday morning. Peaceful, safe, and deeply grounding." },
  { name: "Adventurous", description: "Constantly pushing boundaries, exploring new places, and growing together." },
  { name: "Intellectual", description: "Connected through deep conversations, late-night debates, and shared philosophy." },
  { name: "Mystical & Karmic", description: "An unexplainable spiritual bond that feels written in the stars." }
];

export const LOVE_STATUSES: LoveStatus[] = [
  { name: "The One", description: "Strong emotional, personal, and spiritual alignment." },
  { name: "Soulmates", description: "Destined to cross paths and walk through life side-by-side." },
  { name: "Twin Flames", description: "Mirror souls reflecting each other's strengths and growth areas." },
  { name: "Power Couple", description: "Unstoppable together, bringing out the absolute best in each other's ambitions." },
  { name: "Perfect Match", description: "Flawless chemistry where understanding comes completely naturally." },
  { name: "Slow Burn", description: "Growing warmer and deeper day by day, built to last a lifetime." },
  { name: "Complicated but Worth It", description: "High sparks and intense growth requiring patience, but the rewards are unmatched." }
];

export const LOVE_COLORS: LoveColor[] = [
  { name: "Purple Dream", hex: "#8A2BE2", description: "Symbolizes devotion, magic, and deep mystery." },
  { name: "Crimson Passion", hex: "#DC143C", description: "Represents burning desire, strength, and unwavering loyalty." },
  { name: "Rose Quartz", hex: "#F7CAC9", description: "Embodies gentle warmth, unconditional love, and empathy." },
  { name: "Golden Sunshine", hex: "#FFD700", description: "Brings radiant positivity, abundance, and laughter to your bond." },
  { name: "Electric Aqua", hex: "#00FFFF", description: "Stands for fresh energy, clear communication, and excitement." },
  { name: "Forest Devotion", hex: "#228B22", description: "Symbolizes growth, healing, security, and deep-rooted trust." },
  { name: "Coral Romance", hex: "#FF7F50", description: "Represents vibrant joy, warmth, and mutual playfulness." },
  { name: "Midnight Indigo", hex: "#191970", description: "Stands for spiritual depth, protective instincts, and quiet understanding." }
];

export const LOVE_DAYS: LoveDay[] = [
  { name: "Monday", emoji: "☕", description: "Perfect for starting new habits, planning futures, and quiet morning cuddles." },
  { name: "Tuesday", emoji: "🎯", description: "Great for building momentum, support in goals, and high-energy dates." },
  { name: "Wednesday", emoji: "🍻", description: "Favorable for communication, sharing ideas, and mid-week relaxation." },
  { name: "Thursday", emoji: "🕯️", description: "Ideal for intimate dinners, deep conversations, and reflective moments." },
  { name: "Friday", emoji: "🥂", description: "Sparkles with fun weekend energy, romance, and leaving stress behind." },
  { name: "Saturday", emoji: "🎡", description: "Best for shared adventures, travel, exploring, and building core memories." },
  { name: "Sunday", emoji: "🥞", description: "Made for lazy mornings, cooking together, and comforting sanctuary vibes." }
];

export const LOVE_SYMBOLS: LoveSymbol[] = [
  { name: "White Dove", emoji: "🕊️", description: "Represents peace, harmony, and faithful lifelong love." },
  { name: "Lovebirds", emoji: "🦜", description: "Represents nesting comfort, continuous chatter, and close affection." },
  { name: "Red Rose", emoji: "🌹", description: "The ultimate symbol of classic romance, passion, and deep devotion." },
  { name: "Interlocking Hearts", emoji: "💞", description: "Represents two lives beautifully woven into one synchronized heartbeat." },
  { name: "Swan Couple", emoji: "🦢", description: "Symbol of elegance, purity, and choosing a partner for life." },
  { name: "Red Panda", emoji: "🐼", description: "Represents playfulness, unique charm, and mutual protection." },
  { name: "Dolphin Pair", emoji: "🐬", description: "Represents high intelligence, emotional depth, and playful freedom." },
  { name: "Koala Hug", emoji: "🐨", description: "Represents cozy security, strong attachment, and comforting warmth." }
];

export const SUN_SIGNS: AstrologyMatch[] = [
  { sign: "Cancer Compatibility", description: "Nurturing energy creates deep emotional bonds and a cozy sanctuary." },
  { sign: "Scorpio Compatibility", description: "Magnetic attraction and loyalty create a protective, passionate union." },
  { sign: "Pisces Compatibility", description: "Dreamy romance and mutual empathy allow you to connect without words." },
  { sign: "Taurus Compatibility", description: "Stable, sensual, and grounded alignment ensures a secure, long-lasting future." },
  { sign: "Virgo Compatibility", description: "Practical devotion and mutual improvement make you an efficient, caring team." },
  { sign: "Capricorn Compatibility", description: "Strong ambitions and shared values build a powerful, respected foundation." },
  { sign: "Aries Compatibility", description: "Fiery passion, direct honesty, and thrilling energy keep the spark alive." },
  { sign: "Leo Compatibility", description: "Warm generosity, pride in each other, and creative expression light up your path." },
  { sign: "Sagittarius Compatibility", description: "Spontaneous adventures and philosophical discussions keep your bond fresh." },
  { sign: "Gemini Compatibility", description: "High wit, endless conversations, and mental stimulation ensure you never get bored." },
  { sign: "Libra Compatibility", description: "Aesthetically pleasing harmony, fair balance, and romantic peace guide you." },
  { sign: "Aquarius Compatibility", description: "Visionary teamwork, unique independence, and a deep friendship define you." }
];

export const MOON_SIGNS: AstrologyMatch[] = [
  { sign: "Scorpio Moon Compatibility", description: "Adds emotional intensity, passion, and a fiercely protective loyalty." },
  { sign: "Taurus Moon Compatibility", description: "Brings emotional stability, comfort, and physical affection to the daily routine." },
  { sign: "Cancer Moon Compatibility", description: "Ensures intuitive empathy, deep maternal/paternal care, and family warmth." },
  { sign: "Leo Moon Compatibility", description: "Infuses emotional warmth, dramatic romance, and generous expressions of love." },
  { sign: "Aries Moon Compatibility", description: "Instills emotional courage, direct reactions, and exciting, active devotion." },
  { sign: "Gemini Moon Compatibility", description: "Brings talkative feelings, playful intellectual bonding, and a lighthearted touch." },
  { sign: "Libra Moon Compatibility", description: "Adds peaceful emotional diplomacy, romantic idealism, and a love for harmony." },
  { sign: "Sagittarius Moon Compatibility", description: "Brings emotional optimism, humor, and a shared love for truth and freedom." },
  { sign: "Capricorn Moon Compatibility", description: "Adds quiet emotional depth, structured reliability, and serious long-term intent." },
  { sign: "Aquarius Moon Compatibility", description: "Fosters a deep friendly bond, unconventional comfort, and open acceptance." },
  { sign: "Pisces Moon Compatibility", description: "Brings rich spiritual depth, psychic sensitivity, and poetic romance." },
  { sign: "Virgo Moon Compatibility", description: "Brings helpful caring instincts, attentiveness to details, and practical support." }
];

export const RISING_SIGNS: AstrologyMatch[] = [
  { sign: "Pisces Ascendant Compatibility", description: "Brings dreamy romanticism, soft magnetism, and mutual emotional empathy." },
  { sign: "Libra Ascendant Compatibility", description: "Encourages elegant social harmony, shared sense of beauty, and graceful bonding." },
  { sign: "Leo Ascendant Compatibility", description: "Radiates high confidence, dramatic presentation, and joyful, sunny attraction." },
  { sign: "Scorpio Ascendant Compatibility", description: "Adds a mysterious aura, magnetic attraction, and deep emotional security." },
  { sign: "Taurus Ascendant Compatibility", description: "Fosters steady paces, comfortable settings, and appreciation of fine things." },
  { sign: "Gemini Ascendant Compatibility", description: "Brings curious, lively first impressions and adaptive, chatty connection." },
  { sign: "Cancer Ascendant Compatibility", description: "Evokes warm, welcoming first impressions and protective, nesting instincts." },
  { sign: "Aries Ascendant Compatibility", description: "Sparks immediate chemical attraction, competitive fun, and high speed romance." },
  { sign: "Virgo Ascendant Compatibility", description: "Adds clean, organized layouts, analytical compatibility, and healthy living." },
  { sign: "Sagittarius Ascendant Compatibility", description: "Brings broad perspectives, shared laughter, and high travel compatibility." },
  { sign: "Capricorn Ascendant Compatibility", description: "Encourages mature representation, high social status, and professional support." },
  { sign: "Aquarius Ascendant Compatibility", description: "Sparks creative eccentricities, progressive ideals, and unique date choices." }
];

export const FIRST_MEETING_IDEAS: HorizonIdea[] = [
  { title: "Cozy Coffee Shop", emoji: "☕", description: "Allows casual conversation and a deep, low-pressure connection." },
  { title: "Art Gallery Walk", emoji: "🎨", description: "Triggers inspiring dialogue, shared perspectives, and cultural sparks." },
  { title: "Indie Bookstore Browsing", emoji: "📚", description: "Sharing favorite stories and getting a peek into each other's minds." },
  { title: "Scenic Sunset Walk", emoji: "🌅", description: "Perfect backdrops for quiet moments and comfortable silence." },
  { title: "Board Game Cafe", emoji: "🎲", description: "Sparks playful competition and breaks the ice immediately with laughter." }
];

export const MARRIAGE_TIMELINES: string[] = [
  "16 months", "24 months", "18 months", "3 years", "12 months", "30 months", "5 years"
];

export const PERFECT_DATE_LOCATIONS: HorizonIdea[] = [
  { title: "Theme Park", emoji: "🎡", description: "For shared thrills, laughter, and high-energy excitement." },
  { title: "Botanical Garden", emoji: "🌸", description: "Strolling through beautiful greenery and serene, romantic paths." },
  { title: "Rooftop Lounge", emoji: "🌃", description: "Stunning city skyline views, soft lighting, and a premium atmosphere." },
  { title: "Retro Arcade", emoji: "🕹️", description: "Nostalgic game battles, neon lights, and lighthearted playfulness." },
  { title: "Drive-In Movie Theater", emoji: "🎬", description: "Cozy car setup, movie magic, and intimate snack sharing." },
  { title: "Beach Picnic", emoji: "🏖️", description: "Listening to ocean waves while sharing delicious food under the sun." }
];

export const PERFECT_DATE_IDEAS: HorizonIdea[] = [
  { title: "Cooking a Meal Together", emoji: "🍳", description: "Strengthens teamwork, domestic intimacy, and mutual appreciation." },
  { title: "Star Gazing", emoji: "✨", description: "Lay under the open sky, share secrets, and talk about the universe." },
  { title: "Pottery Class", emoji: "🏺", description: "A creative, hands-on experience that leads to playful mess and memory making." },
  { title: "Escape Room Challenge", emoji: "🔑", description: "Tests problem-solving, communications, and cooperative triumph." },
  { title: "Karaoke Duet Night", emoji: "🎤", description: "Being silly, singing favorite romantic jams, and laughing together." },
  { title: "Hiking to a Waterfall", emoji: "🥾", description: "Active journey ending in a scenic, refreshing, and intimate spot." }
];

export const COMMON_INTERESTS: HorizonIdea[] = [
  { title: "Film & Movies", emoji: "🎥", description: "Enjoying storytelling, discussing plots, and endless movie nights." },
  { title: "Photography & Travel", emoji: "✈️", description: "Capturing memories and exploring foreign streets together." },
  { title: "Culinary Adventures", emoji: "🍕", description: "Exploring new restaurants, testing recipes, and appreciating great food." },
  { title: "Music & Concerts", emoji: "🎵", description: "Sharing playlist discoveries, singing along, and attending live gigs." },
  { title: "Fitness & Hiking", emoji: "🏃", description: "Staying healthy, active, and pushing each other's personal goals." },
  { title: "Gaming & Pop Culture", emoji: "🎮", description: "Teaming up in virtual worlds and geeky conventions." }
];

export const FUTURE_FORECASTS: FutureForecast[] = [
  {
    oneYear: "Thrilling exploration, learning quirks, and deepening emotional attachment.",
    threeYears: "Overcoming hurdles together to solidify a deep, unbreakable trust.",
    fiveYears: "Growing stronger with lasting harmony, career support, and shared goals.",
    tenYears: "Unfading love, deep-seated emotional foundation, and absolute lifelong commitment."
  },
  {
    oneYear: "Spontaneous weekend trips, countless inside jokes, and forming a close bond.",
    threeYears: "Moving in together, sharing daily rituals, and establishing custom dynamics.",
    fiveYears: "Building a beautiful, cozy sanctuary and achieving financial milestones together.",
    tenYears: "A legacy of love, holding hands like day one, and looking back on a life well-lived."
  },
  {
    oneYear: "Exciting chemistry, discovering common passions, and introduction to close circles.",
    threeYears: "Navigating life changes side-by-side and developing deep compromise skills.",
    fiveYears: "Expanding horizons together, perhaps traveling the world or building a project.",
    tenYears: "A deep, soul-level friendship that remains vibrant, warm, and absolutely secure."
  }
];
