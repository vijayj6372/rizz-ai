"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage, LanguageCode } from "@/context/LanguageContext";
import { CountryFlag } from "./CountryFlag";

interface OnboardingFlowProps {
  onComplete: () => void;
}

interface LanguageItem {
  code: LanguageCode;
  countryCode: string;
  flagEmoji: string;
  nativeName: string;
  name: string;
}

const LANGUAGES_LIST: LanguageItem[] = [
  { code: "en", countryCode: "us", flagEmoji: "🇺🇸", nativeName: "English", name: "English" },
  { code: "zh", countryCode: "cn", flagEmoji: "🇨🇳", nativeName: "中文", name: "Mandarin Chinese" },
  { code: "ja", countryCode: "jp", flagEmoji: "🇯🇵", nativeName: "日本語", name: "Japanese" },
  { code: "pt", countryCode: "br", flagEmoji: "🇧🇷", nativeName: "Português", name: "Portuguese" },
  { code: "it", countryCode: "it", flagEmoji: "🇮🇹", nativeName: "Italiano", name: "Italian" },
  { code: "ru", countryCode: "ru", flagEmoji: "🇷🇺", nativeName: "Русский", name: "Russian" },
  { code: "fr", countryCode: "fr", flagEmoji: "🇫🇷", nativeName: "Français", name: "French" },
  { code: "de", countryCode: "de", flagEmoji: "🇩🇪", nativeName: "Deutsch", name: "German" },
  { code: "es", countryCode: "es", flagEmoji: "🇪🇸", nativeName: "Español", name: "Spanish" },
  { code: "hi", countryCode: "in", flagEmoji: "🇮🇳", nativeName: "Hinglish", name: "Hinglish" },
];

const ONBOARDING_TEXTS: Record<LanguageCode, any> = {
  en: {
    chooseLangTitle: "Choose Your Preferred Language",
    chooseLangDesc: "Select the language you want Rizz AI to speak with you",
    stepOf: (curr: number, total: number) => `Step ${curr} of ${total}`,
    btnChooseLang: "Choose Language →",
    namePlaceholder: "Enter your name...",
    btnLetsGo: "Let's Go! 🚀",
    luckyTitle: "Lucky Winner!",
    luckyDesc: "✨ You are lucky! You get unlimited free premium $ 100 worth of paid features for free✨",
    btnActionPlan: "See Your AI-Powered Action Plan →",
    luckyBanner: "✨ You are lucky! You get unlimited free premium paid features ✨",
    whatWeLearned: "What We Learned About You",
    yourSuperpower: "YOUR SUPERPOWER",
    yourGrowthEdge: "YOUR GROWTH EDGE",
    btnUnlockGrowth: "🔓 Unlock personalized growth plan",
    planIncludesTitle: "Your Personalized Plan Includes",
    btnUnlockFree: "UNLOCK FREE",
    savedBanner: "🔒 Your personalized results are saved",
    moreInsights: "+2 more insights",
    tapToUnlock: "Tap to unlock for free",
    rapidGrowthTitle: "Rapid Growth Curve",
    rapidGrowthDesc: "You are highly adaptive. Your rate of confidence growth is currently projected in the top 5% of users.",
    contextOptTitle: "Context Optimization",
    contextOptDesc: "You perform exceptionally well in digital (text-based) interactions. Let's capitalize on this strength.",
    toastInsightsUnlocked: "Dynamic insights unlocked successfully! 🔓",
    toastGrowthUnlocked: "Personalized growth plan unlocked! 🚀",
  },
  fr: {
    chooseLangTitle: "Choisissez Votre Langue Préférée",
    chooseLangDesc: "Sélectionnez la langue dans laquelle Rizz AI doit vous répondre",
    stepOf: (curr: number, total: number) => `Étape ${curr} sur ${total}`,
    btnChooseLang: "Choisir la Langue →",
    namePlaceholder: "Entrez votre prénom...",
    btnLetsGo: "C'est parti ! 🚀",
    luckyTitle: "Gagnant Chanceux !",
    luckyDesc: "✨ Vous avez de la chance ! Obtenez toutes les fonctionnalités premium gratuitement✨",
    btnActionPlan: "Voir Votre Plan d'Action IA →",
    luckyBanner: "✨ Vous avez de la chance ! Accès illimité aux fonctionnalités premium ✨",
    whatWeLearned: "Ce Que Nous Avons Appris Sur Vous",
    yourSuperpower: "VOTRE SUPER-POUVOIR",
    yourGrowthEdge: "VOTRE AXE DE PROGRESSION",
    btnUnlockGrowth: "🔓 Débloquer votre plan personnalisé",
    planIncludesTitle: "Votre Plan Personnalisé Comprend",
    btnUnlockFree: "DÉBLOQUER GRATUITEMENT",
    savedBanner: "🔒 Vos résultats personnalisés sont sauvegardés",
    moreInsights: "+2 analyses supplémentaires",
    tapToUnlock: "Appuyez pour débloquer gratuitement",
    rapidGrowthTitle: "Courbe de Croissance Rapide",
    rapidGrowthDesc: "Vous êtes très adaptable. Votre progression de confiance est estimée dans le top 5%.",
    contextOptTitle: "Optimisation de Contexte",
    contextOptDesc: "Vous excellez dans les échanges par message. Exploitions cette force au maximum.",
    toastInsightsUnlocked: "Analyses débloquées avec succès ! 🔓",
    toastGrowthUnlocked: "Plan de croissance débloqué ! 🚀",
  },
  de: {
    chooseLangTitle: "Wähle Deine Bevorzugte Sprache",
    chooseLangDesc: "Wähle die Sprache, in der Rizz AI mit dir sprechen soll",
    stepOf: (curr: number, total: number) => `Schritt ${curr} von ${total}`,
    btnChooseLang: "Sprache wählen →",
    namePlaceholder: "Gib deinen Namen ein...",
    btnLetsGo: "Los geht's! 🚀",
    luckyTitle: "Glücklicher Gewinner!",
    luckyDesc: "✨ Du hast Glück! Erhalte alle Premium-Funktionen kostenlos✨",
    seeActionPlanBtn: "Deinen KI-Aktionsplan ansehen →",
    luckyBanner: "✨ Du hast Glück! Unbegrenzter kostenloser Premium-Zugang ✨",
    whatWeLearned: "Was Wir Über Dich Gelernt Haben",
    yourSuperpower: "DEINE SUPERKRAFT",
    yourGrowthEdge: "DEIN WACHSTUMSPOTENZIAL",
    btnUnlockGrowth: "🔓 Entwicklungsplan freischalten",
    planIncludesTitle: "Dein Persönlicher Plan Enthält",
    btnUnlockFree: "KOSTENLOS FREISCHALTEN",
    savedBanner: "🔒 Deine persönlichen Ergebnisse wurden gespeichert",
    moreInsights: "+2 weitere Einblicke",
    tapToUnlock: "Tippen zum kostenlosen Freischalten",
    rapidGrowthTitle: "Schnelle Wachstumskurve",
    rapidGrowthDesc: "Du bist sehr anpassungsfähig. Dein Selbstbewusstsein wächst im Top-5%-Bereich.",
    contextOptTitle: "Kontext-Optimierung",
    contextOptDesc: "Du bist besonders stark in Textnachrichten. Lass uns diese Stärke nutzen.",
    toastInsightsUnlocked: "Einblicke erfolgreich freigeschaltet! 🔓",
    toastGrowthUnlocked: "Wachstumsplan freigeschaltet! 🚀",
  },
  es: {
    chooseLangTitle: "Elige Tu Idioma Preferido",
    chooseLangDesc: "Selecciona el idioma en el que quieres que Rizz AI te hable",
    stepOf: (curr: number, total: number) => `Paso ${curr} de ${total}`,
    btnChooseLang: "Elegir Idioma →",
    namePlaceholder: "Ingresa tu nombre...",
    btnLetsGo: "¡Vamos! 🚀",
    luckyTitle: "¡Ganador Con Suerte!",
    luckyDesc: "✨ ¡Tienes suerte! Obtén todas las funciones premium gratis✨",
    btnActionPlan: "Ver Tu Plan de Acción IA →",
    luckyBanner: "✨ ¡Tienes suerte! Acceso ilimitado a funciones premium gratis ✨",
    whatWeLearned: "Lo Que Aprendimos De Ti",
    yourSuperpower: "TU SUPERPODER",
    yourGrowthEdge: "TU ÁREA DE CRECIMIENTO",
    btnUnlockGrowth: "🔓 Desbloquear plan personalizado",
    planIncludesTitle: "Tu Plan Personalizado Incluye",
    btnUnlockFree: "DESBLOQUEAR GRATIS",
    savedBanner: "🔒 Tus resultados personalizados están guardados",
    moreInsights: "+2 análisis adicionales",
    tapToUnlock: "Toca para desbloquear gratis",
    rapidGrowthTitle: "Curva de Crecimiento Rápido",
    rapidGrowthDesc: "Eres muy adaptable. Tu nivel de confianza crecerá dentro del top 5%.",
    contextOptTitle: "Optimización de Contexto",
    contextOptDesc: "Destacas en mensajes de texto. Aprovechemos al máximo esta fortaleza.",
    toastInsightsUnlocked: "Análisis desbloqueados con éxito! 🔓",
    toastGrowthUnlocked: "Plan de crecimiento desbloqueado! 🚀",
  },
  pt: {
    chooseLangTitle: "Escolha Seu Idioma Preferido",
    chooseLangDesc: "Selecione o idioma que você quer que o Rizz AI use com você",
    stepOf: (curr: number, total: number) => `Passo ${curr} de ${total}`,
    btnChooseLang: "Escolher Idioma →",
    namePlaceholder: "Digite seu nome...",
    btnLetsGo: "Vamos Lá! 🚀",
    luckyTitle: "Vencedor Com Sorte!",
    luckyDesc: "✨ Você está com sorte! Ganhe todas as funcionalidades premium de graça✨",
    btnActionPlan: "Ver Seu Plano de Ação IA →",
    luckyBanner: "✨ Você está com sorte! Acesso ilimitado a recursos premium de graça ✨",
    whatWeLearned: "O Que Aprendemos Sobre Você",
    yourSuperpower: "SEU SUPERPODER",
    yourGrowthEdge: "SEU PONTO DE EVOLUÇÃO",
    btnUnlockGrowth: "🔓 Desbloquear plano personalizado",
    planIncludesTitle: "Seu Plano Personalizado Inclui",
    btnUnlockFree: "DESBLOQUEAR GRÁTIS",
    savedBanner: "🔒 Seus resultados personalizados estão salvos",
    moreInsights: "+2 análises extras",
    tapToUnlock: "Toque para desbloquear grátis",
    rapidGrowthTitle: "Curva de Crescimento Rápido",
    rapidGrowthDesc: "Você é extremamente adaptável. Sua confiança deve evoluir no top 5%.",
    contextOptTitle: "Otimização de Contexto",
    contextOptDesc: "Você se destaca em conversas de texto. Vamos aproveitar essa força.",
    toastInsightsUnlocked: "Análises desbloqueadas com sucesso! 🔓",
    toastGrowthUnlocked: "Plano de evolução desbloqueado! 🚀",
  },
  it: {
    chooseLangTitle: "Scegli la Tua Lingua Preferita",
    chooseLangDesc: "Seleziona la lingua con cui vuoi che Rizz AI comunichi con te",
    stepOf: (curr: number, total: number) => `Passaggio ${curr} di ${total}`,
    btnChooseLang: "Scegli Lingua →",
    namePlaceholder: "Inserisci il tuo nome...",
    btnLetsGo: "Andiamo! 🚀",
    luckyTitle: "Vincitore Fortunato!",
    luckyDesc: "✨ Sei fortunato! Ottieni tutte le funzionalità premium gratis✨",
    btnActionPlan: "Vedi il Tuo Piano d'Azione IA →",
    luckyBanner: "✨ Sei fortunato! Accesso illimitato a funzionalità premium gratis ✨",
    whatWeLearned: "Cosa Abbiamo Imparato Su di Te",
    yourSuperpower: "IL TUO SUPERPOTERE",
    yourGrowthEdge: "IL TUO PUNTO DI CRESCITA",
    btnUnlockGrowth: "🔓 Sblocca piano di crescita personalizzato",
    planIncludesTitle: "Il Tuo Piano Personalizzato Include",
    btnUnlockFree: "SBLOCCA GRATIS",
    savedBanner: "🔒 I tuoi risultati personalizzati sono salvati",
    moreInsights: "+2 ulteriori analisi",
    tapToUnlock: "Tocca per sbloccare gratis",
    rapidGrowthTitle: "Curva di Crescita Rapida",
    rapidGrowthDesc: "Sei molto adattabile. La tua crescita di autostima è stimata nel top 5%.",
    contextOptTitle: "Ottimizzazione del Contesto",
    contextOptDesc: "Eccelli nei messaggi di testo. Sfruttiamo al massimo questa forza.",
    toastInsightsUnlocked: "Analisi sbloccate con successo! 🔓",
    toastGrowthUnlocked: "Piano di crescita sbloccato! 🚀",
  },
  ru: {
    chooseLangTitle: "Выберите Предпочитаемый Язык",
    chooseLangDesc: "Выберите язык, на котором Rizz AI будет общаться с вами",
    stepOf: (curr: number, total: number) => `Шаг ${curr} из ${total}`,
    btnChooseLang: "Выбрать язык →",
    namePlaceholder: "Введите ваше имя...",
    btnLetsGo: "Погнали! 🚀",
    luckyTitle: "Счастливый победитель!",
    luckyDesc: "✨ Вам повезло! Получите доступ ко всем премиум функциям бесплатно✨",
    btnActionPlan: "Посмотреть Ваш ИИ-План Действий →",
    luckyBanner: "✨ Вам повезло! Безлимитный бесплатный премиум доступ ✨",
    whatWeLearned: "Что Мы Узнали О Вас",
    yourSuperpower: "ВАША СУПЕРСИЛА",
    yourGrowthEdge: "ТОЧКА РОСТА",
    btnUnlockGrowth: "🔓 Разблокировать персональный план",
    planIncludesTitle: "Ваш Персональный План Включает",
    unlockFreeBtn: "РАЗБЛОКИРОВАТЬ БЕСПЛАТНО",
    savedBanner: "🔒 Ваши результаты успешно сохранены",
    moreInsights: "+2 дополнительных факта",
    tapToUnlock: "Нажмите, чтобы разблокировать бесплатно",
    rapidGrowthTitle: "Быстрый Рост Уверенности",
    rapidGrowthDesc: "Вы очень адаптивны. Прогнозируемый рост вашей уверенности входит в топ 5%.",
    contextOptTitle: "Оптимизация Переписки",
    contextOptDesc: "Вы отлично справляетесь с текстовыми чатами. Давайте развивать эту силу.",
    toastInsightsUnlocked: "Анализ успешно разблокирован! 🔓",
    toastGrowthUnlocked: "План развития разблокирован! 🚀",
  },
  zh: {
    chooseLangTitle: "选择您的首选语言",
    chooseLangDesc: "选择您希望 Rizz AI 与您沟通的语言",
    stepOf: (curr: number, total: number) => `第 ${curr} 步，共 ${total} 步`,
    btnChooseLang: "选择语言 →",
    namePlaceholder: "输入您的名字...",
    btnLetsGo: "开始体验！ 🚀",
    luckyTitle: "幸运幸运儿！",
    luckyDesc: "✨ 恭喜您！免费解锁价值 $100 的全部高级功能✨",
    btnActionPlan: "查看您的 AI 提升计划 →",
    luckyBanner: "✨ 恭喜您！无限免费享受高级会员功能 ✨",
    whatWeLearned: "我们对您的了解分析",
    yourSuperpower: "您的核心优势",
    yourGrowthEdge: "您的成长突破点",
    btnUnlockGrowth: "🔓 解锁专属个人提升计划",
    planIncludesTitle: "您的专属计划包含",
    btnUnlockFree: "免费解锁",
    savedBanner: "🔒 您的专属测评结果已保存",
    moreInsights: "+2 条深度分析",
    tapToUnlock: "点击免费解锁",
    rapidGrowthTitle: "快速成长曲线",
    rapidGrowthDesc: "您具有极强的适应力。预计您的自信提升速度将位列前 5%。",
    contextOptTitle: "对话情景优化",
    contextOptDesc: "您在文字交流中表现出色。让我们充分发挥这一优势。",
    toastInsightsUnlocked: "成功解锁深度分析！ 🔓",
    toastGrowthUnlocked: "成功解锁提升计划！ 🚀",
  },
  ja: {
    chooseLangTitle: "希望の言語を選択してください",
    chooseLangDesc: "Rizz AIが使用する言語を選択してください",
    stepOf: (curr: number, total: number) => `ステップ ${curr} / ${total}`,
    btnChooseLang: "言語を選択 →",
    namePlaceholder: "名前を入力...",
    btnLetsGo: "スタート！ 🚀",
    luckyTitle: "ラッキー当選者！",
    luckyDesc: "✨ おめでとうございます！$100相当の全プレミアム機能が無料✨",
    btnActionPlan: "AIアクションプランを見る →",
    luckyBanner: "✨ おめでとうございます！無制限でプレミアム機能が無料 ✨",
    whatWeLearned: "あなたに関する分析結果",
    yourSuperpower: "あなたの強み",
    yourGrowthEdge: "さらなる成長ポイント",
    btnUnlockGrowth: "🔓 個別成長プランを解除する",
    planIncludesTitle: "あなた専用プランの内容",
    btnUnlockFree: "無料で解除",
    savedBanner: "🔒 あなたの診断結果は保存されました",
    moreInsights: "+2つのインサイト",
    tapToUnlock: "タップして無料で解除",
    rapidGrowthTitle: "急成長カーブ",
    rapidGrowthDesc: "あなたは順応性が高く、自信の成長速度は上位5%に入ると予測されます。",
    contextOptTitle: "文脈最適化",
    contextOptDesc: "あなたはテキスト上のやり取りで非常に強みを発揮します。",
    toastInsightsUnlocked: "インサイトが解除されました！ 🔓",
    toastGrowthUnlocked: "成長プランが解除されました！ 🚀",
  },
  hi: {
    chooseLangTitle: "Apni Preferred Language Chuno",
    chooseLangDesc: "Aap Rizz AI se kis bhasha mein baat karna chahte hain",
    stepOf: (curr: number, total: number) => `Step ${curr} of ${total}`,
    btnChooseLang: "Language Chuno →",
    namePlaceholder: "Apna naam likho...",
    btnLetsGo: "Chalo Shuru Karein! 🚀",
    luckyTitle: "Lucky Winner!",
    luckyDesc: "✨ Aap lucky ho! Aapko saare premium features bilkul FREE milenge✨",
    btnActionPlan: "Apna AI-Powered Action Plan Dekho →",
    luckyBanner: "✨ Aap lucky ho! Unlimited free premium features milenge ✨",
    whatWeLearned: "Humne Aapke Baare Mein Kya Jaana",
    yourSuperpower: "AAPKI SUPERPOWER",
    yourGrowthEdge: "AAPKA GROWTH POINT",
    btnUnlockGrowth: "🔓 Personalized growth plan unlock karo",
    planIncludesTitle: "Aapke Personalized Plan Mein Shamil Hai",
    btnUnlockFree: "FREE UNLOCK KARO",
    savedBanner: "🔒 Aapke results safe aur save ho gaye hain",
    moreInsights: "+2 aur insights",
    tapToUnlock: "Free mein unlock karne ke liye tap karo",
    rapidGrowthTitle: "Rapid Growth Curve",
    rapidGrowthDesc: "Aap jaldi adapt karte ho. Aapka confidence growth top 5% users mein hoga.",
    contextOptTitle: "Context Optimization",
    contextOptDesc: "Aap texting aur chat mein bahut acche ho. Is strength ko aage badhaayein.",
    toastInsightsUnlocked: "Dynamic insights unlock ho gaye! 🔓",
    toastGrowthUnlocked: "Growth plan unlock ho gaya! 🚀",
  },
};

const quizQuestions = [
  {
    emoji: "😰",
    title: "How confident do you feel in social situations?",
    desc: "Be honest — this helps us personalize your experience",
    options: [
      { icon: "😰", text: "Not confident at all" },
      { icon: "😅", text: "Somewhat shy" },
      { icon: "🤔", text: "Depends on the situation" },
      { icon: "😎", text: "Pretty confident" },
      { icon: "🔥", text: "Extremely confident" },
    ],
  },
  {
    emoji: "🔋",
    title: "How do you feel after spending time with people?",
    desc: "There's no wrong answer — we're all wired differently",
    options: [
      { icon: "🔋", text: "Usually drained — I need alone time to recharge" },
      { icon: "⚖️", text: "It depends on who I'm with" },
      { icon: "😌", text: "Pretty neutral either way" },
      { icon: "⚡", text: "Usually energized — I love being around people" },
    ],
  },
  {
    emoji: "📱",
    title: "What brings you here today?",
    desc: "Select the option that resonates most",
    options: [
      { icon: "📱", text: "Get better at texting" },
      { icon: "👋", text: "Talk to people I just met" },
      { icon: "💋", text: "Get better at flirting" },
      { icon: "💕", text: "Improve my dating life" },
      { icon: "💑", text: "Deepen my current relationship" },
    ],
  },
  {
    emoji: "💬",
    title: "How do you typically start conversations?",
    desc: "There's no wrong answer — choose what feels natural",
    options: [
      { icon: "🕐", text: "I wait for others to approach me" },
      { icon: "👋", text: "A simple hello or hi" },
      { icon: "💬", text: "I ask a question about something around us" },
      { icon: "🌟", text: "I give a genuine compliment" },
      { icon: "😂", text: "I lead with humor" },
    ],
  },
  {
    emoji: "👂",
    title: "What's your social superpower?",
    desc: "Everyone has something — what comes naturally to you?",
    options: [
      { icon: "👂", text: "I'm a great listener" },
      { icon: "💗", text: "I understand how others feel" },
      { icon: "😄", text: "I can make people laugh" },
      { icon: "📖", text: "I tell great stories" },
      { icon: "🤔", text: "I ask thoughtful questions" },
      { icon: "🔍", text: "I'm not sure yet" },
    ],
  },
  {
    emoji: "😓",
    title: "What's your biggest social challenge?",
    desc: "We'll focus on helping you overcome this",
    options: [
      { icon: "😓", text: "Social anxiety" },
      { icon: "💔", text: "Fear of rejection" },
      { icon: "🤐", text: "Running out of things to say" },
      { icon: "🔍", text: "Reading social cues" },
      { icon: "🎭", text: "Being my authentic self" },
      { icon: "📱", text: "Following up and maintaining connections" },
    ],
  },
  {
    emoji: "🚶",
    title: "When does social anxiety hit you hardest?",
    desc: "Understanding your triggers helps us help you",
    options: [
      { icon: "🚶", text: "Walking up to someone new" },
      { icon: "👀", text: "When all eyes are on me" },
      { icon: "😶", text: "Awkward silences in conversation" },
      { icon: "💔", text: "Fear of being rejected" },
      { icon: "💬", text: "Making small talk" },
      { icon: "😎", text: "I rarely feel anxious" },
    ],
  },
  {
    emoji: "🌊",
    title: "Imagine your ideal social self — what would change?",
    desc: "Paint a picture of where you want to be",
    options: [
      { icon: "🌊", text: "Conversations would feel effortless" },
      { icon: "✨", text: "I'd leave lasting impressions" },
      { icon: "🔗", text: "I'd have deeper connections" },
      { icon: "🚪", text: "I'd walk into any room with confidence" },
      { icon: "💯", text: "I'd be unapologetically myself" },
    ],
  },
  {
    emoji: "⚡",
    title: "How much time can you dedicate to improving?",
    desc: "Choose a daily commitment that fits your lifestyle",
    options: [
      { icon: "⚡", text: "5 minutes a day" },
      { icon: "📖", text: "15 minutes a day" },
      { icon: "💪", text: "30 minutes a day" },
      { icon: "🎯", text: "Flexible — whenever I can" },
    ],
  },
  {
    emoji: "🚀",
    title: "What's your name?",
    desc: "Last step — we'll personalize everything for you",
    isNameInput: true,
  },
];

const personalities = [
  {
    title: "The Thoughtful Observer",
    desc: "You process deeply before speaking, which is actually a superpower. You notice details others completely miss. Your growth edge is translating those sharp observations into confident action.",
    superpowerTitle: "Emotional Intelligence",
    superpowerDesc: "You sense what others feel. Use this to validate emotions before offering solutions or changing topics.",
    growthTitle: "Building Resilience",
    growthDesc: "Collect 'No's as badges of courage. Each rejection is proof you're putting yourself out there and mastering social confidence.",
    insight1: { emoji: "🔋", title: "Energy-Conscious Socializer", desc: "You recharge alone. We will teach you high-impact conversation techniques that don't drain your social battery." },
    insight2: { emoji: "👥", title: "Deep Diver", desc: "You excel in intimate one-on-one settings. We will help you bring that same depth into group environments." }
  },
  {
    title: "The Charismatic Connector",
    desc: "You bring positive energy to every group you enter. You excel at keeping conversations alive and engaging. Your growth edge is learning to listen with depth rather than just responding with wit.",
    superpowerTitle: "Social Alignment",
    superpowerDesc: "You match the vibe of the room effortlessly. Use this to make people feel safe, respected, and heard.",
    growthTitle: "Active Listening",
    growthDesc: "Slow down the pace. Letting silences hang briefly creates a comfortable space for deeper connection.",
    insight1: { emoji: "⚡", title: "High-Energy Initiator", desc: "You thrive on group interactions. We will help you optimize your energy for meaningful interactions." },
    insight2: { emoji: "🌟", title: "Magnet Personality", desc: "People naturally gravitate to you. Learn how to convert simple magnetism into lasting relationships." }
  },
  {
    title: "The Witty Conversationalist",
    desc: "Your mind works at lightning speed, allowing you to break the ice with sharp humor and creative banter. Your growth edge is showing vulnerability to build trust.",
    superpowerTitle: "Creative Spark",
    superpowerDesc: "You see humorous connections instantly. Use this to defuse awkwardness and put others at ease.",
    growthTitle: "Expressing Authenticity",
    growthDesc: "Vulnerability is charisma. Sharing real, unpolished parts of yourself makes you immediately relatable.",
    insight1: { emoji: "🧠", title: "Mental Agility", desc: "You think fast on your feet. Learn to align your verbal responses with emotional depth." },
    insight2: { emoji: "😂", title: "Icebreaker Master", desc: "You lead with humor. Discover when to switch from comedy to sincere conversation." }
  },
  {
    title: "The Bold Initiator",
    desc: "You are not afraid of making the first move. You lead with confidence and direction. Your growth edge is ensuring your directness doesn't overshadow the quiet voices in the room.",
    superpowerTitle: "Unshakable Direction",
    superpowerDesc: "You guide the path of interactions clearly. Use this to step in and support shy peers in groups.",
    growthTitle: "Conversational Balance",
    growthDesc: "Ask open questions and pass the mic. True confidence lies in building up those around you.",
    insight1: { emoji: "🔥", title: "Action-Oriented Leader", desc: "You create opportunities instead of waiting. Let's direct that drive to target your perfect matches." },
    insight2: { emoji: "🛡️", title: "Confidence Engine", desc: "You face social challenges head-on. Let's structure your approach to yield optimal results." }
  }
];

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [userName, setUserName] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { language, setLanguage } = useLanguage();
  const txt = ONBOARDING_TEXTS[language] || ONBOARDING_TEXTS.en;

  const [showCelebration, setShowCelebration] = useState(false);
  const [insightsUnlocked, setInsightsUnlocked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    if (currentStep === 11) {
      setShowCelebration(true);

      const canvas = document.createElement("canvas");
      canvas.style.position = "fixed";
      canvas.style.inset = "0";
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "9999";
      document.body.appendChild(canvas);
      canvasRef.current = canvas;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      const onResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      window.addEventListener("resize", onResize);

      const colors = ["#c4b5fd", "#e8b4f8", "#ddd6fe", "#a78bfa", "#ffb3ba", "#baffc9", "#bae1ff"];
      const confettiCount = 130;
      const pieces: Array<{
        x: number;
        y: number;
        size: number;
        color: string;
        speed: number;
        rotation: number;
        rotationSpeed: number;
        oscillationSpeed: number;
        oscillationOffset: number;
      }> = [];

      for (let i = 0; i < confettiCount; i++) {
        pieces.push({
          x: Math.random() * width,
          y: Math.random() * -height - 20,
          size: Math.random() * 8 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 3 + 4,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 4 - 2,
          oscillationSpeed: Math.random() * 0.03 + 0.01,
          oscillationOffset: Math.random() * 100,
        });
      }

      let animationId: number;
      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        pieces.forEach((p) => {
          p.y += p.speed;
          p.rotation += p.rotationSpeed;
          p.x += Math.sin(p.oscillationOffset) * 0.5;
          p.oscillationOffset += p.oscillationSpeed;

          if (p.y > height) {
            p.y = -20;
            p.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        });
        animationId = requestAnimationFrame(animate);
      };

      animate();

      const timer = setTimeout(() => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", onResize);
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      }, 5000);

      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", onResize);
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      };
    }
  }, [currentStep]);

  const selectOption = (optIdx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setQuizAnswers((prev) => ({ ...prev, [currentStep]: optIdx }));

    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      setIsTransitioning(false);
    }, 250);
  };

  const handleNameSubmit = () => {
    if (!userName.trim()) return;
    setCurrentStep(10);
  };

  const handleLanguageSelect = (code: LanguageCode) => {
    setLanguage(code);
    setTimeout(() => {
      setCurrentStep(11);
    }, 250);
  };

  const handleFinishOnboarding = () => {
    try {
      localStorage.setItem("rizz_onboarded", "true");
      if (userName) {
        localStorage.setItem("rizz_user_name", userName);
      }
    } catch {
      // Ignore storage errors
    }
    onComplete();
  };

  const getPersonalityProfile = () => {
    let index = 0;
    if (quizAnswers[2] === 0) index = 1;
    else if (quizAnswers[2] === 3) index = 2;
    else if (quizAnswers[0] === 4) index = 3;
    return personalities[index] || personalities[0];
  };

  const renderToast = () => (
    toastMessage ? (
      <div
        style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#1F1A3A",
          color: "#FFFFFF",
          padding: "12px 24px",
          borderRadius: 999,
          fontSize: 14,
          fontWeight: 600,
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          zIndex: 10000,
          animation: "fadeInUp 0.3s ease",
          maxWidth: "90vw",
          textAlign: "center",
        }}
      >
        {toastMessage}
      </div>
    ) : null
  );

  // ─────────────────────────────────────────
  // STEP 11: RESULTS PAGE (result.html)
  // ─────────────────────────────────────────
  if (currentStep === 11) {
    const profile = getPersonalityProfile();

    return (
      <div className="result-page-wrapper" style={{ minHeight: "100vh", background: "#0a0a0a", color: "#ffffff", paddingBottom: 40 }}>
        {renderToast()}

        {/* Celebration Modal */}
        {showCelebration && (
          <div
            className="modal-overlay"
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              padding: 20,
              animation: "fadeIn 0.3s ease",
            }}
          >
            <div
              className="modal-box"
              style={{
                background: "#141414",
                border: "1px solid rgba(196, 181, 253, 0.3)",
                borderRadius: 24,
                padding: "32px 24px",
                maxWidth: 400,
                width: "100%",
                textAlign: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: 56, marginBottom: 16, animation: "float 3s ease-in-out infinite" }}>🎉</div>
              <h3
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  marginBottom: 12,
                  background: "linear-gradient(135deg, #c4b5fd 0%, #e8b4f8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {txt.luckyTitle}
              </h3>
              <p style={{ fontSize: 15, color: "#e8e8e8", lineHeight: 1.6, marginBottom: 24 }}>
                {txt.luckyDesc}
              </p>
              <button
                onClick={() => setShowCelebration(false)}
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  background: "linear-gradient(135deg, #e8d5f5 0%, #c4b5fd 40%, #ddd6fe 100%)",
                  color: "#1a1a1a",
                  border: "none",
                  borderRadius: 999,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {txt.btnLetsGo}
              </button>
            </div>
          </div>
        )}

        <div className="result-container animate-fade-in-up" style={{ maxWidth: 760, margin: "0 auto", padding: "48px 20px", textAlign: "center" }}>
          {/* Header Crystal Ball */}
          <div className="crystal-ball-wrapper" style={{ position: "relative", display: "inline-block", marginBottom: 24 }}>
            <div className="crystal-ball-glow" style={{ position: "absolute", inset: -20, background: "radial-gradient(circle, rgba(196, 181, 253, 0.25) 0%, transparent 70%)", borderRadius: "50%" }} />
            <div className="crystal-ball" style={{ width: 90, height: 90, background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, position: "relative", zIndex: 1 }}>
              🔮
            </div>
          </div>

          <h1 className="result-title" style={{ fontFamily: "DM Serif Display, serif", fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 400, marginBottom: 20, lineHeight: 1.2 }}>
            {userName ? `${userName}, ` : ""}
            <span className="accent-text" style={{ background: "linear-gradient(135deg, #c4b5fd 0%, #e8b4f8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {profile.title}
            </span>
          </h1>

          <p className="result-desc" style={{ fontSize: 15, color: "#999999", lineHeight: 1.7, maxWidth: 580, margin: "0 auto 32px" }}>
            {profile.desc}
          </p>

          {/* Primary Action Button */}
          <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: 16 }}>
            <button
              className="action-plan-btn"
              onClick={handleFinishOnboarding}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "18px 40px",
                background: "linear-gradient(135deg, #e8d5f5 0%, #c4b5fd 40%, #ddd6fe 100%)",
                color: "#1a1a1a",
                border: "none",
                borderRadius: 9999,
                fontSize: 17,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 6px 28px rgba(196, 181, 253, 0.4)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                maxWidth: "100%",
              }}
            >
              {txt.btnActionPlan}
            </button>
          </div>

          <div className="lucky-banner" style={{ fontSize: 13, fontWeight: 600, color: "#e8b4f8", marginTop: 12, marginBottom: 40, letterSpacing: 0.5 }}>
            {txt.luckyBanner}
          </div>

          {/* What We Learned Section */}
          <h2 className="section-header" style={{ fontFamily: "DM Serif Display, serif", fontSize: 26, margin: "48px 0 24px", textAlign: "center" }}>
            {txt.whatWeLearned}
          </h2>

          <div className="insights-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 16, textAlign: "left" }}>
            <div className="insight-card" style={{ background: "#141414", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: 16, padding: 24 }}>
              <span className="insight-emoji" style={{ fontSize: 28, marginBottom: 12, display: "block" }}>{profile.insight1.emoji}</span>
              <h3 className="insight-title" style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "#ffffff" }}>{profile.insight1.title}</h3>
              <p className="insight-desc" style={{ fontSize: 13, color: "#999999", lineHeight: 1.5 }}>{profile.insight1.desc}</p>
            </div>

            <div className="insight-card" style={{ background: "#141414", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: 16, padding: 24 }}>
              <span className="insight-emoji" style={{ fontSize: 28, marginBottom: 12, display: "block" }}>{profile.insight2.emoji}</span>
              <h3 className="insight-title" style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "#ffffff" }}>{profile.insight2.title}</h3>
              <p className="insight-desc" style={{ fontSize: 13, color: "#999999", lineHeight: 1.5 }}>{profile.insight2.desc}</p>
            </div>

            {!insightsUnlocked ? (
              <div
                className="lock-card insight-card"
                onClick={() => {
                  setInsightsUnlocked(true);
                  showToast(txt.toastInsightsUnlocked);
                }}
                style={{
                  background: "rgba(255, 255, 255, 0.01)",
                  border: "1.5px dashed rgba(255, 255, 255, 0.1)",
                  borderRadius: 16,
                  padding: "32px 24px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: 24, color: "#c4b5fd", marginBottom: 10 }}>🔒</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#c4b5fd" }}>{txt.moreInsights}</div>
                <div style={{ fontSize: 11, color: "#666666", marginTop: 4 }}>{txt.tapToUnlock}</div>
              </div>
            ) : (
              <>
                <div className="insight-card animate-fade-in-up" style={{ background: "#141414", border: "1px solid rgba(196, 181, 253, 0.3)", borderRadius: 16, padding: 24, textAlign: "left" }}>
                  <span className="insight-emoji" style={{ fontSize: 28, marginBottom: 12, display: "block" }}>📈</span>
                  <h3 className="insight-title" style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "#ffffff" }}>{txt.rapidGrowthTitle}</h3>
                  <p className="insight-desc" style={{ fontSize: 13, color: "#999999", lineHeight: 1.5 }}>{txt.rapidGrowthDesc}</p>
                </div>
                <div className="insight-card animate-fade-in-up" style={{ background: "#141414", border: "1px solid rgba(196, 181, 253, 0.3)", borderRadius: 16, padding: 24, textAlign: "left" }}>
                  <span className="insight-emoji" style={{ fontSize: 28, marginBottom: 12, display: "block" }}>🎯</span>
                  <h3 className="insight-title" style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "#ffffff" }}>{txt.contextOptTitle}</h3>
                  <p className="insight-desc" style={{ fontSize: 13, color: "#999999", lineHeight: 1.5 }}>{txt.contextOptDesc}</p>
                </div>
              </>
            )}
          </div>

          {/* Superpower Card */}
          <div className="superpower-card" style={{ background: "#141414", border: "1.5px solid rgba(16, 185, 129, 0.2)", borderRadius: 16, padding: 24, display: "flex", alignItems: "flex-start", gap: 18, textAlign: "left", marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>💖</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#10b981", letterSpacing: 1, marginBottom: 4 }}>{txt.yourSuperpower}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, color: "#ffffff" }}>{profile.superpowerTitle}</h3>
              <p style={{ fontSize: 13.5, color: "#999999", lineHeight: 1.5 }}>{profile.superpowerDesc}</p>
            </div>
          </div>

          {/* Growth Edge Card */}
          <div className="growth-card" style={{ background: "#141414", border: "1.5px solid rgba(239, 68, 68, 0.15)", borderRadius: 16, padding: 24, display: "flex", alignItems: "flex-start", gap: 18, textAlign: "left", marginBottom: 40 }}>
            <span style={{ fontSize: 36, filter: "grayscale(1) sepia(1) hue-rotate(15deg) saturate(3)" }}>💪</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#ef4444", letterSpacing: 1, marginBottom: 4 }}>{txt.yourGrowthEdge}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, color: "#ffffff" }}>{profile.growthTitle}</h3>
              <p style={{ fontSize: 13.5, color: "#999999", lineHeight: 1.5 }}>{profile.growthDesc}</p>
              <button
                onClick={() => showToast(txt.toastGrowthUnlocked)}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 999,
                  padding: "10px 20px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#c4b5fd",
                  cursor: "pointer",
                  marginTop: 12,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {txt.btnUnlockGrowth}
              </button>
            </div>
          </div>

          {/* Plan Includes Section */}
          <h2 className="section-header" style={{ fontFamily: "DM Serif Display, serif", fontSize: 26, margin: "48px 0 24px", textAlign: "center" }}>
            {txt.planIncludesTitle}
          </h2>

          <div className="plan-includes-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 40, textAlign: "left" }}>
            <div className="plan-include-card" style={{ background: "#141414", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: 16, padding: 20, textAlign: "center" }}>
              <span className="plan-include-emoji" style={{ fontSize: 32, marginBottom: 12, display: "block" }}>📱</span>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: "#ffffff" }}>{txt.aiReplyTitle}</h3>
              <p style={{ fontSize: 12, color: "#999999", lineHeight: 1.5, marginBottom: 16 }}>{txt.aiReplyDesc}</p>
              <button className="unlock-mini-btn" onClick={handleFinishOnboarding}>{txt.btnUnlockFree}</button>
            </div>

            <div className="plan-include-card" style={{ background: "#141414", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: 16, padding: 20, textAlign: "center" }}>
              <span className="plan-include-emoji" style={{ fontSize: 32, marginBottom: 12, display: "block" }}>🎯</span>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: "#ffffff" }}>{txt.dailyExercisesTitle}</h3>
              <p style={{ fontSize: 12, color: "#999999", lineHeight: 1.5, marginBottom: 16 }}>{txt.dailyExercisesDesc}</p>
              <button className="unlock-mini-btn" onClick={handleFinishOnboarding}>{txt.btnUnlockFree}</button>
            </div>

            <div className="plan-include-card" style={{ background: "#141414", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: 16, padding: 20, textAlign: "center" }}>
              <span className="plan-include-emoji" style={{ fontSize: 32, marginBottom: 12, display: "block" }}>💬</span>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: "#ffffff" }}>{txt.convoStartersTitle}</h3>
              <p style={{ fontSize: 12, color: "#999999", lineHeight: 1.5, marginBottom: 16 }}>{txt.convoStartersDesc}</p>
              <button className="unlock-mini-btn" onClick={handleFinishOnboarding}>{txt.btnUnlockFree}</button>
            </div>

            <div className="plan-include-card" style={{ background: "#141414", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: 16, padding: 20, textAlign: "center" }}>
              <span className="plan-include-emoji" style={{ fontSize: 32, marginBottom: 12, display: "block" }}>📊</span>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: "#ffffff" }}>{txt.progressTrackingTitle}</h3>
              <p style={{ fontSize: 12, color: "#999999", lineHeight: 1.5, marginBottom: 16 }}>{txt.progressTrackingDesc}</p>
              <button className="unlock-mini-btn" onClick={handleFinishOnboarding}>{txt.btnUnlockFree}</button>
            </div>
          </div>

          {/* Primary Action Button Bottom */}
          <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: 16 }}>
            <button
              className="action-plan-btn"
              onClick={handleFinishOnboarding}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "18px 40px",
                background: "linear-gradient(135deg, #e8d5f5 0%, #c4b5fd 40%, #ddd6fe 100%)",
                color: "#1a1a1a",
                border: "none",
                borderRadius: 9999,
                fontSize: 17,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 6px 28px rgba(196, 181, 253, 0.4)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                maxWidth: "100%",
              }}
            >
              {txt.btnActionPlan}
            </button>
          </div>

          <div className="lucky-banner" style={{ fontSize: 13, fontWeight: 600, color: "#e8b4f8", marginTop: 12, marginBottom: 20 }}>
            {txt.luckyBanner}
          </div>

          <div className="saved-banner" style={{ border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: 12, padding: 12, fontSize: 12, fontWeight: 600, color: "#999999", maxWidth: 320, margin: "32px auto 0", background: "rgba(255, 255, 255, 0.01)" }}>
            {txt.savedBanner}
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // STEP 10: CHOOSE LANGUAGE QUESTION STEP
  // ─────────────────────────────────────────
  if (currentStep === 10) {
    return (
      <div className="quiz-page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#08080c", color: "#ffffff" }}>
        {renderToast()}
        {/* Header */}
        <div className="quiz-header" style={{ display: "flex", alignItems: "center", padding: "16px 20px", maxWidth: 600, margin: "0 auto", width: "100%" }}>
          <button
            className="quiz-back-btn"
            onClick={() => setCurrentStep(9)}
            title="Back"
            style={{ background: "none", border: "none", color: "#ffffff", fontSize: 20, cursor: "pointer", marginRight: 16 }}
          >
            ←
          </button>
          <div className="quiz-progress-container" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className="quiz-progress-bar" style={{ flex: 1, height: 6, background: "rgba(255, 255, 255, 0.06)", borderRadius: 3, overflow: "hidden", marginRight: 16 }}>
              <div className="quiz-progress-fill" style={{ height: "100%", width: "100%", background: "#c4b5fd", borderRadius: 3 }} />
            </div>
            <div className="quiz-step-count" style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.4)" }}>
              {txt.stepOf(10, 10)}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="quiz-body" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px 20px", maxWidth: 540, margin: "0 auto", width: "100%" }}>
          <div className="quiz-question" style={{ textAlign: "center", marginBottom: 24 }}>
            <span className="quiz-question-emoji" style={{ fontSize: 44, marginBottom: 12, display: "block" }}>🌐</span>
            <h2 className="quiz-question-title" style={{ fontFamily: "DM Serif Display, serif", fontSize: "clamp(24px, 5vw, 32px)", fontWeight: 400, marginBottom: 8, color: "#ffffff" }}>
              {txt.chooseLangTitle}
            </h2>
            <p className="quiz-question-desc" style={{ fontSize: 14, color: "#999999" }}>
              {txt.chooseLangDesc}
            </p>
          </div>

          <div className="quiz-options" style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxHeight: "60vh", overflowY: "auto", paddingRight: 4 }}>
            {LANGUAGES_LIST.map((langItem) => {
              const isSelected = language === langItem.code;
              return (
                <button
                  key={langItem.code}
                  className={`quiz-option ${isSelected ? "selected" : ""}`}
                  onClick={() => handleLanguageSelect(langItem.code)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 18px",
                    background: isSelected ? "rgba(196, 181, 253, 0.12)" : "#121217",
                    border: isSelected ? "1.5px solid #c4b5fd" : "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 14,
                    color: "#ffffff",
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                  }}
                >
                  <CountryFlag
                    countryCode={langItem.countryCode}
                    flagEmoji={langItem.flagEmoji}
                    size={24}
                  />

                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#ffffff", fontSize: 15, fontWeight: 700 }}>{langItem.nativeName}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>{langItem.name}</div>
                  </div>
                  
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: isSelected ? "6px solid #c4b5fd" : "2px solid rgba(255, 255, 255, 0.3)",
                      background: isSelected ? "#ffffff" : "transparent",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // STEPS 0 - 9: QUIZ QUESTIONS
  // ─────────────────────────────────────────
  const q = quizQuestions[currentStep];
  const progressPercent = ((currentStep + 1) / (quizQuestions.length + 1)) * 100;

  return (
    <div className="quiz-page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#08080c", color: "#ffffff" }}>
      {/* Header */}
      <div className="quiz-header" style={{ display: "flex", alignItems: "center", padding: "16px 20px", maxWidth: 600, margin: "0 auto", width: "100%" }}>
        <button
          className="quiz-back-btn"
          onClick={() => currentStep > 0 && setCurrentStep((prev) => prev - 1)}
          style={{
            background: "none",
            border: "none",
            color: "#ffffff",
            fontSize: 20,
            cursor: currentStep > 0 ? "pointer" : "default",
            opacity: currentStep > 0 ? 1 : 0.3,
            marginRight: 16,
          }}
        >
          ←
        </button>
        <div className="quiz-progress-container" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="quiz-progress-bar" style={{ flex: 1, height: 6, background: "rgba(255, 255, 255, 0.06)", borderRadius: 3, overflow: "hidden", marginRight: 16 }}>
            <div className="quiz-progress-fill" style={{ height: "100%", width: `${progressPercent}%`, background: "#c4b5fd", borderRadius: 3, transition: "width 0.4s ease" }} />
          </div>
          <div className="quiz-step-count" style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.4)" }}>
            {txt.stepOf(currentStep + 1, 10)}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="quiz-body" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px 20px", maxWidth: 540, margin: "0 auto", width: "100%" }}>
        <div className="quiz-question" style={{ textAlign: "center", marginBottom: 28 }}>
          <span className="quiz-question-emoji" style={{ fontSize: 44, marginBottom: 16, display: "block" }}>{q.emoji}</span>
          <h2 className="quiz-question-title" style={{ fontFamily: "DM Serif Display, serif", fontSize: "clamp(24px, 5vw, 34px)", fontWeight: 400, marginBottom: 10, color: "#ffffff", lineHeight: 1.25 }}>
            {q.title}
          </h2>
          <p className="quiz-question-desc" style={{ fontSize: 15, color: "#999999", lineHeight: 1.5 }}>
            {q.desc}
          </p>
        </div>

        {q.isNameInput ? (
          <div style={{ width: "100%" }}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
              placeholder={txt.namePlaceholder}
              maxLength={30}
              autoFocus
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: 18,
                padding: "18px 24px",
                borderRadius: 16,
                background: "rgba(255, 255, 255, 0.05)",
                border: "1.5px solid rgba(196, 181, 253, 0.3)",
                color: "#ffffff",
                outline: "none",
                marginBottom: 24,
              }}
            />
            <button
              className="quiz-next-btn"
              onClick={handleNameSubmit}
              disabled={!userName.trim()}
              style={{
                width: "100%",
                padding: "16px 32px",
                background: "linear-gradient(135deg, #e8d5f5 0%, #c4b5fd 40%, #ddd6fe 100%)",
                color: "#1a1a1a",
                border: "none",
                borderRadius: 999,
                fontSize: 17,
                fontWeight: 700,
                cursor: userName.trim() ? "pointer" : "not-allowed",
                opacity: userName.trim() ? 1 : 0.4,
              }}
            >
              {txt.btnChooseLang}
            </button>
          </div>
        ) : (
          <div className="quiz-options" style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
            {q.options?.map((opt, i) => {
              const isSelected = quizAnswers[currentStep] === i;
              return (
                <button
                  key={i}
                  className={`quiz-option ${isSelected ? "selected" : ""}`}
                  onClick={() => selectOption(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "16px 20px",
                    background: isSelected ? "rgba(196, 181, 253, 0.12)" : "#121217",
                    border: isSelected ? "1.5px solid #c4b5fd" : "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 16,
                    color: "#ffffff",
                    fontSize: 15,
                    fontWeight: 500,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span style={{ fontSize: 22, display: "inline-block" }}>{opt.icon}</span>
                  <span style={{ flex: 1 }}>{opt.text}</span>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: isSelected ? "6px solid #c4b5fd" : "2px solid rgba(255, 255, 255, 0.3)",
                      background: isSelected ? "#ffffff" : "transparent",
                    }}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
