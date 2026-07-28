"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Clock, Star, Layers, Filter, Compass } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useTheme } from "@/hooks/useTheme";

type Impact = "🔥 High" | "⚡ Medium" | "✨ Quick Win";
type Category =
  | "HAIR" | "SKIN" | "FITNESS" | "DENTAL" | "STYLE" | "GROOMING"
  | "HEALTH" | "POSTURE" | "EYES" | "DIET" | "MINDSET" | "SOCIAL"
  | "DATING" | "FLIRT" | "MAKEOUT" | "VOICE" | "BODY" | "FRAGRANCE"
  | "CONFIDENCE" | "SLEEP" | "HUMOR";

interface Tip {
  icon: string; category: Category; title: string;
  desc: string; impact: Impact; timeframe: string; color: string;
}

const CATEGORY_COLORS: Record<Category, string> = {
  HAIR:       "#FF6B35", SKIN:       "#00CFA8", FITNESS:    "#FF1744",
  DENTAL:     "#29B6F6", STYLE:      "#9C27B0", GROOMING:   "#E040A0",
  HEALTH:     "#4CAF50", POSTURE:    "#FF9800", EYES:       "#00BCD4",
  DIET:       "#8BC34A", MINDSET:    "#7C4DFF", SOCIAL:     "#F06292",
  DATING:     "#E91E8C", FLIRT:      "#FF4081", MAKEOUT:    "#D32F2F",
  VOICE:      "#1976D2", BODY:       "#00897B", FRAGRANCE:  "#7B1FA2",
  CONFIDENCE: "#F57C00", SLEEP:      "#283593", HUMOR:      "#F9A825",
};

const H = CATEGORY_COLORS;

const TIPS: Tip[] = [
  // ══════════ HAIR (30 tips) ══════════
  { icon:"💈", category:"HAIR", title:"Fresh haircut every 3-4 weeks", desc:"A maintained cut signals you have your life together. Grow out your sides or try a modern fade. Consistency in cuts keeps you looking polished even on lazy days.", impact:"🔥 High", timeframe:"1 day", color:H.HAIR },
  { icon:"🧴", category:"HAIR", title:"Use hair serum or styling cream", desc:"Frizz and dryness age you. A small amount of product transforms your texture and shine instantly. Apply on damp hair for best results.", impact:"✨ Quick Win", timeframe:"5 mins", color:H.HAIR },
  { icon:"🚿", category:"HAIR", title:"Wash hair 2-3x per week max", desc:"Over-washing strips natural oils and causes your scalp to overproduce sebum. Dry shampoo between washes adds volume without stripping.", impact:"⚡ Medium", timeframe:"1 week", color:H.HAIR },
  { icon:"🌡️", category:"HAIR", title:"Cold water final rinse", desc:"Cold water seals the hair cuticle and adds shine. 30 seconds at the end of your shower makes your hair noticeably glossier.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.HAIR },
  { icon:"🛢️", category:"HAIR", title:"Deep condition once a week", desc:"A weekly hair mask or deep conditioner repairs damage and adds elasticity. 10 minutes while you shower, massive difference in texture.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.HAIR },
  { icon:"💇", category:"HAIR", title:"Hairstyle that suits your face shape", desc:"Round faces need height on top. Square faces need softer sides. Long faces need width. The wrong cut makes a good-looking person look average.", impact:"🔥 High", timeframe:"1 day", color:H.HAIR },
  { icon:"🌿", category:"HAIR", title:"Use a scalp massager daily", desc:"Boosts blood circulation to follicles, promotes hair growth, and reduces dandruff. 2 minutes while shampooing pays dividends over months.", impact:"⚡ Medium", timeframe:"3 months", color:H.HAIR },
  { icon:"🧪", category:"HAIR", title:"Switch to sulfate-free shampoo", desc:"Sulfates strip moisture aggressively. Sulfate-free shampoos clean gently and preserve color and natural oils for healthier, shinier hair.", impact:"⚡ Medium", timeframe:"3 weeks", color:H.HAIR },
  { icon:"🔥", category:"HAIR", title:"Limit heat styling tools", desc:"Blow dryers, flat irons, and curling irons damage hair when used daily. Use heat protectant spray and keep tools on medium-low settings.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.HAIR },
  { icon:"🪮", category:"HAIR", title:"Brush from ends to roots", desc:"Always detangle from the bottom up to avoid breakage. A wide-tooth comb on wet hair prevents snapping and split ends.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.HAIR },
  { icon:"🥚", category:"HAIR", title:"Castor oil scalp treatment", desc:"Castor oil stimulates hair growth and thickens hair over time. Apply to scalp, massage 5 minutes, leave an hour, then wash out.", impact:"🔥 High", timeframe:"2 months", color:H.HAIR },
  { icon:"🌙", category:"HAIR", title:"Sleep on a silk pillowcase", desc:"Cotton pillowcases cause friction and frizz while you sleep. Silk pillowcases keep your hair smooth, hydrated, and styled longer.", impact:"✨ Quick Win", timeframe:"1 night", color:H.HAIR },
  { icon:"💊", category:"HAIR", title:"Take biotin + collagen supplements", desc:"Biotin strengthens hair shafts, reduces shedding, and supports growth. Results take 3 months but the transformation is real.", impact:"🔥 High", timeframe:"3 months", color:H.HAIR },
  { icon:"🌊", category:"HAIR", title:"Sea salt spray for texture", desc:"Sea salt spray creates effortless beach-wave texture and adds volume without looking greasy. A game changer for fine or limp hair.", impact:"✨ Quick Win", timeframe:"5 mins", color:H.HAIR },
  { icon:"🎨", category:"HAIR", title:"Consider highlights or color", desc:"Subtle highlights add dimension and make your hair look fuller and more alive. Even one visit to a colorist can completely change your look.", impact:"🔥 High", timeframe:"1 day", color:H.HAIR },
  { icon:"🧼", category:"HAIR", title:"Clarify your hair monthly", desc:"Product buildup dulls hair and weighs it down. A clarifying shampoo once a month removes buildup and restores bounce and shine.", impact:"⚡ Medium", timeframe:"1 day", color:H.HAIR },
  { icon:"✂️", category:"HAIR", title:"Trim split ends every 6-8 weeks", desc:"Split ends travel up the hair shaft and cause breakage. Regular trims keep the hair looking healthy and prevent damage from spreading.", impact:"⚡ Medium", timeframe:"1 day", color:H.HAIR },
  { icon:"🪢", category:"HAIR", title:"Learn 2-3 hairstyle variations", desc:"Knowing how to wear your hair differently — slicked back, natural, textured — gives you versatility for different occasions and moods.", impact:"⚡ Medium", timeframe:"1 week", color:H.HAIR },
  { icon:"🌬️", category:"HAIR", title:"Blow dry with a round brush for volume", desc:"A round brush + blow dryer combination lifts hair at the roots and creates volume that styled hair has. 3 minutes of technique that changes your entire look.", impact:"✨ Quick Win", timeframe:"5 mins", color:H.HAIR },
  { icon:"🫚", category:"HAIR", title:"Try argan oil as a finishing serum", desc:"A few drops of argan oil on dry hair adds incredible shine, eliminates frizz, and makes hair look professionally styled with zero effort.", impact:"✨ Quick Win", timeframe:"5 mins", color:H.HAIR },
  { icon:"🧲", category:"HAIR", title:"Use a boar bristle brush", desc:"Boar bristle brushes distribute natural oils from root to tip, giving hair a natural shine and health that synthetic brushes can't replicate.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.HAIR },
  { icon:"🫁", category:"HAIR", title:"Try minoxidil for thinning areas", desc:"Minoxidil is the most clinically proven OTC treatment for hair loss. Early use stops recession; consistent use can regrow hair in thinning areas.", impact:"🔥 High", timeframe:"4 months", color:H.HAIR },
  { icon:"🥗", category:"HAIR", title:"Eat more iron-rich foods", desc:"Iron deficiency is a leading cause of hair loss in men and women. Spinach, red meat, and lentils restore iron levels that keep hair growing.", impact:"🔥 High", timeframe:"6 weeks", color:H.HAIR },
  { icon:"🌿", category:"HAIR", title:"Rosemary oil for hair growth", desc:"Clinical studies show rosemary oil rivals minoxidil for hair growth. Mix 5 drops with carrier oil and massage into scalp 3x per week.", impact:"🔥 High", timeframe:"3 months", color:H.HAIR },
  { icon:"💨", category:"HAIR", title:"Air dry 70% before using heat", desc:"Applying heat to soaking wet hair causes much more damage than hair that's mostly dry. Let it air dry first, then style — your hair will thank you.", impact:"⚡ Medium", timeframe:"Ongoing", color:H.HAIR },
  { icon:"🎽", category:"HAIR", title:"Protect hair in chlorine and saltwater", desc:"Wet your hair with fresh water before swimming, and rinse immediately after. Chlorine and salt strip color, protein, and moisture aggressively.", impact:"⚡ Medium", timeframe:"Ongoing", color:H.HAIR },
  { icon:"🧊", category:"HAIR", title:"Use a protein treatment monthly", desc:"Hair is 95% protein. A monthly keratin or protein treatment repairs damage, strengthens structure, and restores elasticity to over-processed hair.", impact:"🔥 High", timeframe:"1 day", color:H.HAIR },
  { icon:"🪴", category:"HAIR", title:"Try a scalp detox treatment", desc:"Scalp buildup from products, sweat, and pollution causes dullness and slows growth. A dedicated scalp detox every 2 weeks keeps follicles clear.", impact:"⚡ Medium", timeframe:"3 weeks", color:H.HAIR },
  { icon:"☀️", category:"HAIR", title:"Use UV protection for your hair", desc:"Sun exposure oxidizes hair color and breaks down proteins. A UV protecting spray or wearing a hat preserves color and shine outdoors.", impact:"⚡ Medium", timeframe:"Ongoing", color:H.HAIR },
  { icon:"🧬", category:"HAIR", title:"Know your hair porosity", desc:"High porosity hair absorbs products quickly but loses moisture fast. Low porosity requires more heat to absorb treatments. Knowing this optimizes everything.", impact:"🔥 High", timeframe:"Ongoing", color:H.HAIR },

  // ══════════ SKIN (30 tips) ══════════
  { icon:"💧", category:"SKIN", title:"Start a 3-step skincare routine", desc:"Cleanser → Moisturizer → SPF. Non-negotiable. SPF alone prevents aging better than any cream on the market. Start this week.", impact:"🔥 High", timeframe:"30 days", color:H.SKIN },
  { icon:"🫧", category:"SKIN", title:"Double cleanse at night", desc:"Oil cleanser first to remove sunscreen and sebum, then foam cleanser. Waking up with clear skin is elite. Try it for one week.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.SKIN },
  { icon:"✨", category:"SKIN", title:"Add Vitamin C serum in the morning", desc:"Brightens dark spots, evens out skin tone, and protects against pollution damage. The cheat code for glowing skin.", impact:"🔥 High", timeframe:"4 weeks", color:H.SKIN },
  { icon:"🧴", category:"SKIN", title:"Use retinol 2-3x per week at night", desc:"Retinol speeds up cell turnover, reduces wrinkles, and fades hyperpigmentation. Start low (0.25%) and build up. The gold standard of anti-aging.", impact:"🔥 High", timeframe:"8 weeks", color:H.SKIN },
  { icon:"🌞", category:"SKIN", title:"SPF 30+ every single morning", desc:"UV damage is the number one cause of premature aging. Apply SPF even on cloudy days, even indoors near windows. No excuses.", impact:"🔥 High", timeframe:"Ongoing", color:H.SKIN },
  { icon:"💦", category:"SKIN", title:"Use a hyaluronic acid serum", desc:"Hyaluronic acid holds 1000x its weight in water. Plumps skin, reduces fine lines temporarily, and preps skin perfectly for moisturizer.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.SKIN },
  { icon:"🧊", category:"SKIN", title:"Ice your face in the morning", desc:"Rubbing an ice cube on your face for 60 seconds reduces puffiness, tightens pores, and gives you an instant glow. Free and takes 1 minute.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.SKIN },
  { icon:"🌿", category:"SKIN", title:"Add niacinamide to your routine", desc:"Niacinamide reduces pores, evens skin tone, controls oil, and strengthens the skin barrier. One of the most versatile skincare ingredients.", impact:"🔥 High", timeframe:"4 weeks", color:H.SKIN },
  { icon:"🧽", category:"SKIN", title:"Exfoliate 1-2x per week", desc:"Chemical exfoliants (AHA/BHA) remove dead skin cells and unclog pores. More effective than physical scrubs. Reveals fresh, glowing skin.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.SKIN },
  { icon:"🛌", category:"SKIN", title:"Never sleep with makeup or sunscreen on", desc:"Sleeping with product on your face clogs pores, traps bacteria, and accelerates aging. Clean skin before bed is non-negotiable.", impact:"🔥 High", timeframe:"Immediate", color:H.SKIN },
  { icon:"🍃", category:"SKIN", title:"Use a toner with glycolic acid", desc:"Toners prep skin for serum absorption, reduce pores, and balance pH. A 30-second step that makes everything else work better.", impact:"⚡ Medium", timeframe:"3 weeks", color:H.SKIN },
  { icon:"🎭", category:"SKIN", title:"Use a clay mask 1x per week", desc:"Clay masks deep-clean pores, control excess oil, and reduce blackheads. Kaolin clay is gentler, bentonite is stronger. 15 minutes, big results.", impact:"⚡ Medium", timeframe:"1 week", color:H.SKIN },
  { icon:"💊", category:"SKIN", title:"Take collagen peptides daily", desc:"Collagen supplementation improves skin elasticity, reduces wrinkles, and strengthens nails. Takes 8 weeks to show but the results are measurable.", impact:"🔥 High", timeframe:"8 weeks", color:H.SKIN },
  { icon:"🚱", category:"SKIN", title:"Stop touching your face", desc:"Your hands carry bacteria that cause breakouts. The average person touches their face 23x per hour. Cutting this habit alone clears skin.", impact:"✨ Quick Win", timeframe:"1 week", color:H.SKIN },
  { icon:"🛏️", category:"SKIN", title:"Change pillowcase every 3-4 days", desc:"Pillowcases accumulate oil, sweat, and bacteria. This presses directly onto your face for 8 hours. Clean pillowcase = fewer breakouts.", impact:"✨ Quick Win", timeframe:"1 week", color:H.SKIN },
  { icon:"🥤", category:"SKIN", title:"Drink green tea daily", desc:"Green tea is packed with antioxidants that reduce inflammation, fight acne, and slow aging. One cup a day is a legitimate skin strategy.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.SKIN },
  { icon:"🌺", category:"SKIN", title:"Try snail mucin or centella serum", desc:"Korean skincare staples that repair the skin barrier, fade scars, and deeply hydrate. Sounds weird, works brilliantly for sensitive or acne-prone skin.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.SKIN },
  { icon:"🫙", category:"SKIN", title:"Use eye cream morning and night", desc:"The skin around your eyes is thinnest and shows age first. Caffeine reduces puffiness; retinol reduces fine lines.", impact:"⚡ Medium", timeframe:"6 weeks", color:H.SKIN },
  { icon:"🌡️", category:"SKIN", title:"Wash face with lukewarm water only", desc:"Hot water strips natural oils and triggers inflammation. Cold water doesn't rinse cleanser effectively. Lukewarm is always correct.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.SKIN },
  { icon:"🫁", category:"SKIN", title:"Get a facial or peel quarterly", desc:"Professional facials or chemical peels accelerate results you can't get from home care. Even once every 3 months makes a significant difference.", impact:"🔥 High", timeframe:"1 day", color:H.SKIN },
  { icon:"🧪", category:"SKIN", title:"Use azelaic acid for even skin tone", desc:"Azelaic acid reduces redness, fades hyperpigmentation, fights acne bacteria, and brightens. One of the most underrated skincare actives.", impact:"⚡ Medium", timeframe:"6 weeks", color:H.SKIN },
  { icon:"🌸", category:"SKIN", title:"Add bakuchiol — natural retinol", desc:"Bakuchiol delivers retinol-like results without irritation. Great for sensitive skin or as a daytime retinol alternative. Clean, effective, gentle.", impact:"⚡ Medium", timeframe:"8 weeks", color:H.SKIN },
  { icon:"💎", category:"SKIN", title:"Try gua sha or facial roller", desc:"Gua sha reduces puffiness, sculpts the jaw, and promotes lymphatic drainage. Daily use for 5 minutes creates visible facial slimming over time.", impact:"⚡ Medium", timeframe:"3 weeks", color:H.SKIN },
  { icon:"🌙", category:"SKIN", title:"Use a ceramide moisturizer at night", desc:"Ceramides repair and reinforce the skin barrier while you sleep. Wake up with plumper, smoother skin that retains moisture throughout the day.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.SKIN },
  { icon:"☀️", category:"SKIN", title:"Reapply SPF every 2 hours outdoors", desc:"SPF degrades with UV exposure. One morning application isn't enough for a day outdoors. SPF powder sticks make reapplication easy.", impact:"🔥 High", timeframe:"Ongoing", color:H.SKIN },
  { icon:"🧬", category:"SKIN", title:"Know your skin type", desc:"Oily, dry, combination, sensitive — every skin type needs a different routine. Using the wrong products for your type undoes everything else.", impact:"🔥 High", timeframe:"Immediate", color:H.SKIN },
  { icon:"🫐", category:"SKIN", title:"Apply antioxidant serum after cleansing", desc:"Antioxidants neutralize free radicals before they damage collagen. Vitamin C, E, and ferulic acid together are the gold standard combination.", impact:"🔥 High", timeframe:"6 weeks", color:H.SKIN },
  { icon:"🏊", category:"SKIN", title:"Shower immediately after sweating", desc:"Sweat left on skin creates the perfect environment for bacteria and breakouts. Shower within 30 minutes of any workout, every time.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.SKIN },
  { icon:"🥦", category:"SKIN", title:"Eat more zinc for clear skin", desc:"Zinc regulates oil production, kills acne bacteria, and heals skin faster. Pumpkin seeds, oysters, and beef are top sources. Better than most topicals.", impact:"🔥 High", timeframe:"4 weeks", color:H.SKIN },
  { icon:"🧯", category:"SKIN", title:"Use spot treatment for active breakouts", desc:"Benzoyl peroxide kills bacteria in active pimples. Salicylic acid unclogs pores. Sulfur dries out stubborn spots. Match the treatment to the type.", impact:"✨ Quick Win", timeframe:"3 days", color:H.SKIN },

  // ══════════ FITNESS (30 tips) ══════════
  { icon:"🏋️", category:"FITNESS", title:"Hit the gym 3-4x per week", desc:"Compound lifts only: squat, bench, deadlift, rows. Muscle transforms your face AND body. Jaw gets more defined, face thins out, posture improves.", impact:"🔥 High", timeframe:"3 months", color:H.FITNESS },
  { icon:"🏃", category:"FITNESS", title:"Add 20 mins of cardio daily", desc:"Better blood flow = skin glow + reduced puffiness. Your face literally changes within 2 weeks of consistent cardio. Walk, run, cycle — just move.", impact:"🔥 High", timeframe:"2 weeks", color:H.FITNESS },
  { icon:"🧊", category:"FITNESS", title:"Try cold showers daily", desc:"Cold showers trigger norepinephrine release, boost energy, tighten skin, and train mental toughness. Start with 30 seconds, build to 3 minutes.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.FITNESS },
  { icon:"🤸", category:"FITNESS", title:"Do 10-minute morning stretching", desc:"Improves posture, reduces stiffness, and signals to your body that it's time to perform. Flexibility is part of being attractive.", impact:"✨ Quick Win", timeframe:"1 week", color:H.FITNESS },
  { icon:"🏊", category:"FITNESS", title:"Add swimming to your routine", desc:"Full-body low-impact workout that builds a lean, V-shaped physique. Excellent for posture, core strength, and skin health.", impact:"🔥 High", timeframe:"3 months", color:H.FITNESS },
  { icon:"🚴", category:"FITNESS", title:"Cycle 3x per week", desc:"Builds legs and glutes without bulk, improves cardiovascular health dramatically, and burns calories efficiently. Great complement to weights.", impact:"🔥 High", timeframe:"6 weeks", color:H.FITNESS },
  { icon:"🧘", category:"FITNESS", title:"Do yoga 2x per week", desc:"Yoga improves flexibility, posture, and mind-body awareness. The way you carry your body is a huge part of attraction. Yoga transforms this.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.FITNESS },
  { icon:"💪", category:"FITNESS", title:"Focus on progressive overload", desc:"Add weight or reps every 1-2 weeks. Without progressive overload, your body has no reason to grow. Track your lifts and keep pushing.", impact:"🔥 High", timeframe:"2 months", color:H.FITNESS },
  { icon:"🥊", category:"FITNESS", title:"Try boxing or martial arts", desc:"Full-body conditioning, reflexes, coordination, and confidence. Men who train combat sports carry themselves differently. It's visible.", impact:"🔥 High", timeframe:"3 months", color:H.FITNESS },
  { icon:"🚶", category:"FITNESS", title:"Walk 10,000 steps daily", desc:"Simple, free, and genuinely effective. Daily walking reduces cortisol, improves metabolism, and helps maintain a lean physique long-term.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.FITNESS },
  { icon:"🌅", category:"FITNESS", title:"Work out in the morning", desc:"Morning workouts boost testosterone, improve mood for the entire day, and eliminate scheduling excuses. The hardest part is the first step.", impact:"⚡ Medium", timeframe:"3 weeks", color:H.FITNESS },
  { icon:"🏅", category:"FITNESS", title:"Train your neck and jaw muscles", desc:"A defined neck and sharper jaw are massively attractive. Neck curls, chewing harder foods, and mewing improve jaw definition over time.", impact:"🔥 High", timeframe:"3 months", color:H.FITNESS },
  { icon:"🔄", category:"FITNESS", title:"Do face yoga exercises daily", desc:"5 minutes of targeted face exercises tone facial muscles, reduce double chin, and lift cheekbones. Looks silly, works seriously.", impact:"⚡ Medium", timeframe:"6 weeks", color:H.FITNESS },
  { icon:"🎯", category:"FITNESS", title:"Train your core every session", desc:"Strong core = better posture = more attractive instantly. Planks, dead bugs, hollow body holds. A strong core shows even through clothes.", impact:"🔥 High", timeframe:"6 weeks", color:H.FITNESS },
  { icon:"🏋️", category:"FITNESS", title:"Prioritize pull-ups and rows", desc:"Back width creates the V-taper that's universally attractive. Weighted pull-ups and cable rows are the fastest route to a broader back.", impact:"🔥 High", timeframe:"3 months", color:H.FITNESS },
  { icon:"🦵", category:"FITNESS", title:"Never skip legs", desc:"Legs are 50% of your body. Skipping them creates imbalance, hurts your testosterone production, and looks ridiculous. Squat and deadlift.", impact:"🔥 High", timeframe:"3 months", color:H.FITNESS },
  { icon:"⏱️", category:"FITNESS", title:"Keep rest times under 90 seconds", desc:"Shorter rest periods keep heart rate elevated, increase growth hormone release, and make workouts more time-efficient without sacrificing gains.", impact:"⚡ Medium", timeframe:"1 month", color:H.FITNESS },
  { icon:"🏆", category:"FITNESS", title:"Sign up for a race or event", desc:"Having a goal (5K, obstacle race, tournament) gives your training purpose and accountability. People who train for events transform faster.", impact:"🔥 High", timeframe:"3 months", color:H.FITNESS },
  { icon:"🏅", category:"FITNESS", title:"Add jump rope to your cardio", desc:"Jump rope burns more calories than running, improves coordination, and builds calf definition. 10 minutes = 30 minutes of jogging.", impact:"🔥 High", timeframe:"6 weeks", color:H.FITNESS },
  { icon:"💪", category:"FITNESS", title:"Do 100 push-ups per day for 30 days", desc:"100 push-ups spread across the day (sets of 20-25) builds chest, shoulders, and triceps, improves posture, and creates the habit of daily movement.", impact:"🔥 High", timeframe:"1 month", color:H.FITNESS },
  { icon:"🫀", category:"FITNESS", title:"Add HIIT sessions 2x per week", desc:"High-intensity intervals burn fat 3x faster than steady cardio and create an afterburn effect that torches calories for 24+ hours post-workout.", impact:"🔥 High", timeframe:"4 weeks", color:H.FITNESS },
  { icon:"🏊", category:"FITNESS", title:"Learn to do a muscle-up", desc:"The muscle-up signals elite-level body control and upper body strength. Working towards it builds lat width, shoulder capping, and core control.", impact:"🔥 High", timeframe:"3 months", color:H.FITNESS },
  { icon:"🎽", category:"FITNESS", title:"Train in the morning fasted", desc:"Fasted morning training increases fat oxidation, boosts norepinephrine, and trains your body to mobilize stored energy. Powerful for leanness.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.FITNESS },
  { icon:"🥗", category:"FITNESS", title:"Eat within 30 minutes post-workout", desc:"The post-workout window is real. 30-40g protein within 30 minutes maximizes muscle protein synthesis and recovery speed.", impact:"⚡ Medium", timeframe:"Ongoing", color:H.FITNESS },
  { icon:"💊", category:"FITNESS", title:"Use creatine monohydrate daily", desc:"Creatine is the most studied supplement in existence. It increases strength, muscle fullness, and even improves cognitive function. 5g daily, no loading.", impact:"🔥 High", timeframe:"4 weeks", color:H.FITNESS },
  { icon:"🧘", category:"FITNESS", title:"Practice Wim Hof breathing", desc:"This breathing technique improves oxygen efficiency, reduces inflammation, and dramatically increases cold tolerance. Do 3 rounds every morning.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.FITNESS },
  { icon:"🌊", category:"FITNESS", title:"Try sauna 2-3x per week", desc:"Sauna mimics cardio stress response, raises growth hormone, clears skin, and provides profound recovery benefits. 20 minutes at 80°C is ideal.", impact:"🔥 High", timeframe:"6 weeks", color:H.FITNESS },
  { icon:"🏋️", category:"FITNESS", title:"Implement deload weeks", desc:"Every 4-6 weeks, reduce volume by 50%. Deloading prevents overtraining, allows full recovery, and you always come back stronger afterward.", impact:"⚡ Medium", timeframe:"Ongoing", color:H.FITNESS },
  { icon:"🦾", category:"FITNESS", title:"Focus on shoulder width", desc:"Lateral raises and overhead pressing build the shoulder width that creates a broader frame. Even at the same weight, bigger delts look dramatically different.", impact:"🔥 High", timeframe:"3 months", color:H.FITNESS },
  { icon:"🎯", category:"FITNESS", title:"Track your body measurements monthly", desc:"Scale weight is misleading. Measuring chest, waist, arms, and legs monthly shows real composition changes and keeps you motivated and informed.", impact:"⚡ Medium", timeframe:"Ongoing", color:H.FITNESS },

  // ══════════ DENTAL (15 tips) ══════════
  { icon:"😁", category:"DENTAL", title:"Whiten your teeth", desc:"Whitening strips used consistently give you a celebrity smile for $20. The ROI on this single purchase is insane. Do it before dates, photos, and events.", impact:"✨ Quick Win", timeframe:"1 week", color:H.DENTAL },
  { icon:"🦷", category:"DENTAL", title:"Floss and use mouthwash daily", desc:"Fresh breath is invisible but immediately sensed. It changes how close people stand to you and how long conversations last.", impact:"✨ Quick Win", timeframe:"1 day", color:H.DENTAL },
  { icon:"🪥", category:"DENTAL", title:"Electric toothbrush is a game changer", desc:"Electric toothbrushes remove 100% more plaque than manual brushes. Your dentist will notice. So will the people you smile at.", impact:"✨ Quick Win", timeframe:"1 week", color:H.DENTAL },
  { icon:"🍵", category:"DENTAL", title:"Reduce coffee and tea staining", desc:"Drink coffee through a straw, rinse your mouth after, and use whitening toothpaste. Stained teeth age you significantly.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.DENTAL },
  { icon:"🌊", category:"DENTAL", title:"Oil pull with coconut oil", desc:"Swishing coconut oil for 5-10 minutes kills bacteria, reduces plaque, and whitens teeth naturally over time. Ancient technique, real results.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.DENTAL },
  { icon:"🧪", category:"DENTAL", title:"Use charcoal toothpaste weekly", desc:"Activated charcoal absorbs surface stains effectively. Use 1-2x per week alongside your regular toothpaste for gradual whitening.", impact:"✨ Quick Win", timeframe:"2 weeks", color:H.DENTAL },
  { icon:"🏥", category:"DENTAL", title:"Get a dental clean every 6 months", desc:"Professional cleaning removes tartar that brushing can't reach, keeps gum disease away, and keeps your smile looking its best.", impact:"🔥 High", timeframe:"1 day", color:H.DENTAL },
  { icon:"💧", category:"DENTAL", title:"Drink more water, less soda", desc:"Soda erodes enamel and causes severe staining. Replacing soda with water is one change that improves your teeth, skin, and body simultaneously.", impact:"🔥 High", timeframe:"2 weeks", color:H.DENTAL },
  { icon:"😬", category:"DENTAL", title:"Consider Invisalign or retainers", desc:"Straight teeth transform your smile without the obvious look of braces. Invisible aligners are more affordable than ever. Worth the investment.", impact:"🔥 High", timeframe:"6 months", color:H.DENTAL },
  { icon:"🎯", category:"DENTAL", title:"Smile with your eyes, not just your mouth", desc:"A genuine smile engages your eyes (Duchenne smile). Practice in the mirror. People can't tell the difference consciously but they feel it.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.DENTAL },
  { icon:"🦷", category:"DENTAL", title:"Use a water flosser for deep cleaning", desc:"Water flossers remove 99.9% of plaque from treated areas. Far more effective than string floss for between-tooth cleaning and gum health.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.DENTAL },
  { icon:"😮", category:"DENTAL", title:"Use a tongue scraper every morning", desc:"Your tongue harbors more bacteria than anywhere else in your mouth. Scraping it eliminates bad breath at the source. Takes 10 seconds.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.DENTAL },
  { icon:"🌿", category:"DENTAL", title:"Chew sugar-free gum after meals", desc:"Xylitol in sugar-free gum neutralizes acid, stimulates saliva, and whitens teeth over time. Also freshens breath instantly in social situations.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.DENTAL },
  { icon:"🥛", category:"DENTAL", title:"Avoid acidic drinks — or rinse after", desc:"Lemon juice, sparkling water, and sports drinks erode enamel. If you drink them, rinse immediately with water. Don't brush for 30 minutes after.", impact:"⚡ Medium", timeframe:"Ongoing", color:H.DENTAL },
  { icon:"😄", category:"DENTAL", title:"Practice your perfect smile", desc:"Most people have a photo smile and a real smile. Practice in front of a mirror until your genuine, relaxed smile is your most photogenic one.", impact:"🔥 High", timeframe:"2 weeks", color:H.DENTAL },

  // ══════════ STYLE (28 tips) ══════════
  { icon:"👔", category:"STYLE", title:"Wear clothes that actually fit", desc:"Oversized is a trend. Poorly fitted is different. Tailor one outfit and see how differently people treat you in that same day.", impact:"⚡ Medium", timeframe:"1 day", color:H.STYLE },
  { icon:"👟", category:"STYLE", title:"Clean your shoes before every outing", desc:"People look at shoes more than you think. Dirty shoes read as 'doesn't care about details.' Clean them. It takes 2 minutes.", impact:"✨ Quick Win", timeframe:"3 mins", color:H.STYLE },
  { icon:"🎨", category:"STYLE", title:"Pick a consistent style identity", desc:"Streetwear, smart casual, or minimal – commit to one. Random outfits scream no identity. Pick yours and everything becomes easier.", impact:"🔥 High", timeframe:"1 week", color:H.STYLE },
  { icon:"🎽", category:"STYLE", title:"Invest in 5 quality basics", desc:"White tee, black tee, navy sweatshirt, dark jeans, chinos. Five quality pieces outperform 20 cheap ones every single time.", impact:"🔥 High", timeframe:"1 week", color:H.STYLE },
  { icon:"🧥", category:"STYLE", title:"Own one great jacket or coat", desc:"A leather jacket, tailored coat, or varsity jacket instantly elevates any outfit underneath it. One great outerwear piece = 5 new looks.", impact:"🔥 High", timeframe:"1 day", color:H.STYLE },
  { icon:"⌚", category:"STYLE", title:"Wear a watch daily", desc:"A watch signals maturity, style awareness, and attention to detail — all attractive qualities. You don't need an expensive one. Just wear one.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.STYLE },
  { icon:"🎒", category:"STYLE", title:"Upgrade your bag or backpack", desc:"A quality leather bag or structured backpack signals you value your possessions. It's the accessory people notice most after shoes.", impact:"⚡ Medium", timeframe:"1 day", color:H.STYLE },
  { icon:"🌈", category:"STYLE", title:"Understand color coordination", desc:"Learn which colors work together. Neutrals with one accent color is the safest formula. Clashing colors make even good clothes look bad.", impact:"🔥 High", timeframe:"1 week", color:H.STYLE },
  { icon:"🧦", category:"STYLE", title:"Match your socks to the occasion", desc:"Plain socks with formal wear. Fun socks with casual outfits. Visible ankle socks with suits look sloppy. This detail matters more than you'd think.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.STYLE },
  { icon:"🔗", category:"STYLE", title:"Add one statement accessory", desc:"A chain necklace, bracelet, or ring can transform a basic outfit into something with personality. Keep it to one. Less is more.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.STYLE },
  { icon:"🛍️", category:"STYLE", title:"Shop secondhand for unique pieces", desc:"Vintage and thrift stores are full of unique quality pieces you can't find everywhere. Being the only person with that jacket is immeasurably valuable.", impact:"⚡ Medium", timeframe:"1 week", color:H.STYLE },
  { icon:"📐", category:"STYLE", title:"Get one item tailored", desc:"A tailor can make a $40 shirt look like a $200 one. Shoulder seams, sleeve length, and chest fit are the three key measurements.", impact:"🔥 High", timeframe:"1 week", color:H.STYLE },
  { icon:"👖", category:"STYLE", title:"Own both slim and relaxed-fit pants", desc:"Slim or tapered jeans for smart-casual. Relaxed jeans for streetwear. Having both doubles your outfit versatility instantly.", impact:"⚡ Medium", timeframe:"1 day", color:H.STYLE },
  { icon:"🎯", category:"STYLE", title:"Dress for the person you want to be", desc:"If you dress like your best self today, you start thinking and acting like your best self. Clothes affect psychology — use this deliberately.", impact:"🔥 High", timeframe:"Immediate", color:H.STYLE },
  { icon:"💎", category:"STYLE", title:"Invest in one luxury piece", desc:"One quality leather belt, premium sunglasses, or designer sneaker elevates every outfit around it. People notice one thing done really well.", impact:"⚡ Medium", timeframe:"1 day", color:H.STYLE },
  { icon:"🕶️", category:"STYLE", title:"Find sunglasses that suit your face", desc:"The right sunglasses add instant mystery and cool. Square faces suit round frames. Round faces suit square frames. Oval faces suit anything.", impact:"✨ Quick Win", timeframe:"1 day", color:H.STYLE },
  { icon:"🧹", category:"STYLE", title:"Declutter your wardrobe quarterly", desc:"Keep only what you love and what fits. A small wardrobe of great pieces beats a large wardrobe of mediocre ones.", impact:"⚡ Medium", timeframe:"1 week", color:H.STYLE },
  { icon:"🏡", category:"STYLE", title:"Keep your living space styled", desc:"Your home reflects your standards. A clean, intentionally decorated space signals self-respect and taste. Scented candles, plants, minimal clutter.", impact:"🔥 High", timeframe:"1 week", color:H.STYLE },
  { icon:"🎨", category:"STYLE", title:"Learn the capsule wardrobe concept", desc:"30 items, 30 outfits. A capsule wardrobe of interchangeable pieces eliminates decision fatigue while always looking intentional.", impact:"🔥 High", timeframe:"1 week", color:H.STYLE },
  { icon:"🧩", category:"STYLE", title:"Master smart casual — the most useful style", desc:"Smart casual works for 80% of life situations. A clean Oxford shirt, dark jeans, and white sneakers is a formula that never fails.", impact:"🔥 High", timeframe:"1 day", color:H.STYLE },
  { icon:"🪡", category:"STYLE", title:"Iron or steam your clothes always", desc:"Wrinkled clothes halve the value of even expensive pieces. A clothes steamer takes 2 minutes and makes any outfit look intentional.", impact:"✨ Quick Win", timeframe:"3 mins", color:H.STYLE },
  { icon:"👞", category:"STYLE", title:"Own three types of footwear", desc:"Clean white sneakers for casual, leather Chelsea boots for smart, and athletic shoes for sport. Three pairs cover 95% of all situations.", impact:"🔥 High", timeframe:"1 week", color:H.STYLE },
  { icon:"🌙", category:"STYLE", title:"Have a signature date night look", desc:"Know exactly what you wear when it matters. Having a go-to outfit you feel amazing in removes anxiety and lets your confidence lead.", impact:"🔥 High", timeframe:"1 day", color:H.STYLE },
  { icon:"📸", category:"STYLE", title:"Review your photos and audit your style", desc:"Looking at photos of yourself from others' perspectives reveals blind spots in your style you'd never notice in the mirror. Adjust accordingly.", impact:"⚡ Medium", timeframe:"1 day", color:H.STYLE },
  { icon:"🎭", category:"STYLE", title:"Dress slightly better than the occasion", desc:"Showing up slightly overdressed versus underdressed always wins. It signals you take things seriously and sets you apart in any room.", impact:"⚡ Medium", timeframe:"Immediate", color:H.STYLE },
  { icon:"🪞", category:"STYLE", title:"Follow 3-5 style accounts for inspiration", desc:"Curating your feed with style inspiration rewires what you notice and aspire to. You absorb taste slowly just by scrolling intentionally.", impact:"⚡ Medium", timeframe:"Ongoing", color:H.STYLE },
  { icon:"🏷️", category:"STYLE", title:"Learn the difference between fit and size", desc:"Size is a number. Fit is how it sits on your body. A medium that fits perfectly beats a large that doesn't — always buy for fit.", impact:"🔥 High", timeframe:"Immediate", color:H.STYLE },
  { icon:"🌸", category:"STYLE", title:"Try a pop of color in one piece", desc:"One colorful item — a jacket, shoes, or bag — adds personality to neutral outfits without overwhelming. It's the piece people remember.", impact:"⚡ Medium", timeframe:"1 day", color:H.STYLE },

  // ══════════ GROOMING (25 tips) ══════════
  { icon:"🌹", category:"GROOMING", title:"Find a signature cologne", desc:"Scent is processed in the same brain region as memory and emotion. A good cologne makes you unforgettable. Wear it consistently.", impact:"✨ Quick Win", timeframe:"1 day", color:H.GROOMING },
  { icon:"🪒", category:"GROOMING", title:"Maintain your beard or shave clean", desc:"Patchy stubble is the enemy. Either grow it fully, maintain it precisely, or shave clean. No in-between. No undefined lines.", impact:"✨ Quick Win", timeframe:"10 mins", color:H.GROOMING },
  { icon:"🤨", category:"GROOMING", title:"Groom your eyebrows monthly", desc:"Unibrows and wild brows drop your attractiveness score significantly. Get them threaded or waxed. 20 minutes and lasts a month.", impact:"✨ Quick Win", timeframe:"30 mins", color:H.GROOMING },
  { icon:"✂️", category:"GROOMING", title:"Trim nose and ear hair", desc:"Visible nose hair is an immediate attractiveness destroyer. An inexpensive nose trimmer is the highest ROI grooming purchase available.", impact:"✨ Quick Win", timeframe:"3 mins", color:H.GROOMING },
  { icon:"💅", category:"GROOMING", title:"Keep your nails trimmed and clean", desc:"Dirty or long nails are noticed immediately. Clean, trimmed nails signal hygiene and self-respect. File the edges so they're not jagged.", impact:"✨ Quick Win", timeframe:"5 mins", color:H.GROOMING },
  { icon:"🛁", category:"GROOMING", title:"Shower every morning without fail", desc:"Daily shower is the minimum baseline. Add body wash with a scent that layered with your cologne creates a full fragrance experience.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.GROOMING },
  { icon:"💈", category:"GROOMING", title:"Use beard oil if you have facial hair", desc:"Beard oil moisturizes both the beard and the skin underneath, reduces itching and dandruff, and gives your beard a healthy sheen.", impact:"✨ Quick Win", timeframe:"1 week", color:H.GROOMING },
  { icon:"🌿", category:"GROOMING", title:"Try dermaplaning or face exfoliation", desc:"Removing dead skin and peach fuzz makes your skin look smoother, allows better skincare absorption, and gives you a natural glow.", impact:"⚡ Medium", timeframe:"1 day", color:H.GROOMING },
  { icon:"🧴", category:"GROOMING", title:"Apply deodorant and antiperspirant", desc:"Deodorant masks odor; antiperspirant blocks sweat. Use both. Apply to dry skin after showering. Reapply in gym bags for touch-ups.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.GROOMING },
  { icon:"💋", category:"GROOMING", title:"Use lip balm daily", desc:"Dry, cracked lips are very noticeable. A simple chapstick or tinted lip balm keeps lips soft, kissable, and healthy-looking year round.", impact:"✨ Quick Win", timeframe:"2 days", color:H.GROOMING },
  { icon:"🪥", category:"GROOMING", title:"Use a tongue scraper every morning", desc:"Your tongue harbors more bacteria than anywhere else in your mouth. Scraping it eliminates bad breath at the source, not just the surface.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.GROOMING },
  { icon:"🧖", category:"GROOMING", title:"Get a professional shave quarterly", desc:"A barber's hot towel shave is an experience and a grooming upgrade. It teaches you the standard to maintain at home.", impact:"⚡ Medium", timeframe:"1 day", color:H.GROOMING },
  { icon:"🌙", category:"GROOMING", title:"Use hand cream before bed", desc:"Dry, cracked hands undermine an otherwise polished look. Working hands need care too. Apply a thick hand cream before sleep.", impact:"✨ Quick Win", timeframe:"1 week", color:H.GROOMING },
  { icon:"🎭", category:"GROOMING", title:"Try a face mask weekly", desc:"Clay, charcoal, or sheet masks are a genuine grooming ritual that keeps your skin clear and gives you a confidence boost from the self-care.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.GROOMING },
  { icon:"🪞", category:"GROOMING", title:"Check your look before leaving home", desc:"A full mirror check front and back before you leave. Stains, hair, collar, shoes. This habit prevents 90% of grooming embarrassments.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.GROOMING },
  { icon:"🌊", category:"GROOMING", title:"Layer your fragrance correctly", desc:"Apply unscented lotion first, then cologne on pulse points (neck, wrists, chest). Fragrance lasts 3x longer on moisturized skin.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.GROOMING },
  { icon:"🧖", category:"GROOMING", title:"Get back and chest waxed or lasered", desc:"Excessive body hair on the back and chest reduces perceived attractiveness in most demographics. Waxing lasts 4-6 weeks, laser is permanent.", impact:"⚡ Medium", timeframe:"1 day", color:H.GROOMING },
  { icon:"🫁", category:"GROOMING", title:"Use a beard trimmer for body grooming", desc:"Trimming chest, stomach, and underarm hair creates a cleaner, more athletic look without full removal. Manage, don't eliminate, if you prefer hair.", impact:"✨ Quick Win", timeframe:"10 mins", color:H.GROOMING },
  { icon:"💧", category:"GROOMING", title:"Use an aftershave balm, not splash", desc:"Aftershave splash burns and dries skin. An aftershave balm hydrates, soothes irritation, and conditions the skin post-shave. Always balm.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.GROOMING },
  { icon:"🎯", category:"GROOMING", title:"Outline your beard with a razor", desc:"Even a full beard needs criped neck and cheek lines. Clean lines shaved with a razor make the difference between polished and unkempt.", impact:"✨ Quick Win", timeframe:"5 mins", color:H.GROOMING },
  { icon:"🌸", category:"GROOMING", title:"Try a charcoal pore strip monthly", desc:"Charcoal strips pull out sebum and debris from nose pores that daily cleansing misses. Instant visible results that improve skin texture.", impact:"✨ Quick Win", timeframe:"1 day", color:H.GROOMING },
  { icon:"🦵", category:"GROOMING", title:"Exfoliate body skin weekly", desc:"Body skin accumulates dead skin just like your face. A body scrub 1-2x per week keeps skin smooth and prevents keratosis pilaris (arm bumps).", impact:"⚡ Medium", timeframe:"2 weeks", color:H.GROOMING },
  { icon:"🧴", category:"GROOMING", title:"Use a body lotion after every shower", desc:"Dry, ashy skin is immediately visible. A fast-absorbing body lotion after every shower keeps skin healthy, smooth, and touchable.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.GROOMING },
  { icon:"🪥", category:"GROOMING", title:"Brush your teeth 2 minutes, twice daily", desc:"Most people rush brushing. 2 full minutes, twice daily, with proper technique prevents 95% of dental issues and keeps breath fresh all day.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.GROOMING },
  { icon:"🌿", category:"GROOMING", title:"Use a face roller for morning puffiness", desc:"A jade or metal face roller used for 3 minutes after moisturizer reduces morning puffiness, sculpts the face, and improves product absorption.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.GROOMING },

  // ══════════ HEALTH (25 tips) ══════════
  { icon:"😴", category:"HEALTH", title:"Sleep 7-9 hours every night", desc:"Sleep deprivation shows instantly in your skin, eyes, and energy. 8 hours of quality sleep is a better investment than any supplement stack.", impact:"🔥 High", timeframe:"1 week", color:H.HEALTH },
  { icon:"💊", category:"HEALTH", title:"Take Vitamin D + Omega-3 daily", desc:"Most people are deficient in Vitamin D. It improves mood, skin, and hormone function. Omega-3 reduces inflammation and improves skin glow.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.HEALTH },
  { icon:"🧘", category:"HEALTH", title:"Reduce cortisol through stress management", desc:"High cortisol causes hair loss, acne, weight gain around the face, and premature aging. Meditation, walks, and breathing exercises all work.", impact:"🔥 High", timeframe:"2 weeks", color:H.HEALTH },
  { icon:"🚭", category:"HEALTH", title:"Quit smoking", desc:"Smoking depletes collagen, causes wrinkles, yellows teeth, and gives skin a grey tone. Quitting reverses much of this damage within months.", impact:"🔥 High", timeframe:"4 weeks", color:H.HEALTH },
  { icon:"🍷", category:"HEALTH", title:"Reduce alcohol significantly", desc:"Alcohol causes facial bloating within 24 hours, disrupts sleep quality, depletes vitamins, and dramatically ages skin. Cut it by 80%.", impact:"🔥 High", timeframe:"2 weeks", color:H.HEALTH },
  { icon:"🩺", category:"HEALTH", title:"Get a full blood panel done", desc:"Deficiencies in iron, B12, Vitamin D, and testosterone all show on your face and in your energy. Know your numbers so you can fix them.", impact:"🔥 High", timeframe:"1 week", color:H.HEALTH },
  { icon:"🌬️", category:"HEALTH", title:"Practice box breathing daily", desc:"4 seconds in, 4 hold, 4 out, 4 hold. Reduces cortisol, improves focus, and lowers resting heart rate. Do it for 5 minutes every morning.", impact:"⚡ Medium", timeframe:"1 week", color:H.HEALTH },
  { icon:"🌅", category:"HEALTH", title:"Get morning sunlight within 30 mins of waking", desc:"Morning sunlight regulates your circadian rhythm, boosts serotonin, and improves sleep quality at night. 10 minutes outside without glasses.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.HEALTH },
  { icon:"🫁", category:"HEALTH", title:"Practice nasal breathing", desc:"Mouth breathing affects jaw development, causes snoring, and dries out your throat and skin. Nasal breathing improves oxygen efficiency and jaw definition.", impact:"🔥 High", timeframe:"1 month", color:H.HEALTH },
  { icon:"💧", category:"HEALTH", title:"Drink water first thing in the morning", desc:"After 7-9 hours of sleep, your body is dehydrated. 500ml of water immediately upon waking kick-starts metabolism and improves cognitive function.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.HEALTH },
  { icon:"🌡️", category:"HEALTH", title:"Finish every shower with 60 seconds cold", desc:"Cold exposure at the end of your shower increases norepinephrine by 300%, reduces inflammation, and wakes you up better than coffee.", impact:"⚡ Medium", timeframe:"1 week", color:H.HEALTH },
  { icon:"🧬", category:"HEALTH", title:"Optimize your testosterone naturally", desc:"Lift heavy, sleep 8 hours, reduce stress, cut alcohol, eat saturated fat and zinc. Natural testosterone is foundational to looking and feeling your best.", impact:"🔥 High", timeframe:"2 months", color:H.HEALTH },
  { icon:"🍵", category:"HEALTH", title:"Replace coffee with matcha occasionally", desc:"Matcha provides sustained energy without the crash or cortisol spike. L-theanine in matcha reduces anxiety while keeping you alert.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.HEALTH },
  { icon:"🫀", category:"HEALTH", title:"Track your heart rate variability", desc:"HRV is the best indicator of recovery, stress, and health. High HRV means you're adapting. Low HRV means you need rest. Use a wearable to track.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.HEALTH },
  { icon:"🌿", category:"HEALTH", title:"Add adaptogens like ashwagandha", desc:"Ashwagandha reduces cortisol, improves testosterone, lowers anxiety, and increases muscle recovery. One of the most evidence-backed supplements.", impact:"⚡ Medium", timeframe:"6 weeks", color:H.HEALTH },
  { icon:"🛀", category:"HEALTH", title:"Take an Epsom salt bath weekly", desc:"Magnesium from Epsom salts absorbs through skin, reducing muscle soreness, improving sleep, and reducing stress. 20 minutes once a week.", impact:"✨ Quick Win", timeframe:"1 night", color:H.HEALTH },
  { icon:"🔬", category:"HEALTH", title:"Take creatine monohydrate daily", desc:"Creatine is the most studied supplement in existence. It increases strength, muscle fullness, and even improves cognitive function. 5g daily.", impact:"🔥 High", timeframe:"4 weeks", color:H.HEALTH },
  { icon:"🧠", category:"HEALTH", title:"Take magnesium glycinate at night", desc:"Magnesium improves sleep quality, reduces muscle cramps, lowers cortisol, and supports testosterone. Most people are deficient.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.HEALTH },
  { icon:"🫂", category:"HEALTH", title:"Get more social touch and connection", desc:"Human touch reduces cortisol by 25% and increases oxytocin. Handshakes, hugs, and social closeness are genuinely healing. Prioritize them.", impact:"🔥 High", timeframe:"Ongoing", color:H.HEALTH },
  { icon:"🌊", category:"HEALTH", title:"Try sauna and ice bath contrast therapy", desc:"Alternating hot and cold (sauna → cold plunge) dramatically increases growth hormone, reduces inflammation, and improves recovery in 30 minutes.", impact:"🔥 High", timeframe:"4 weeks", color:H.HEALTH },
  { icon:"💉", category:"HEALTH", title:"Check and optimize your gut microbiome", desc:"The gut-skin and gut-brain axes are real. Poor gut health causes skin problems, mood issues, and low energy. Eat fiber, fermented foods, and probiotics.", impact:"🔥 High", timeframe:"6 weeks", color:H.HEALTH },
  { icon:"🥗", category:"HEALTH", title:"Reduce inflammatory foods", desc:"Vegetable oils, refined carbs, and processed meats cause systemic inflammation that ages you faster. Swap them for whole foods and healthy fats.", impact:"🔥 High", timeframe:"3 weeks", color:H.HEALTH },
  { icon:"🌙", category:"HEALTH", title:"Tape your mouth shut at night", desc:"Mouth tape ensures nasal breathing during sleep which deepens sleep quality, improves jaw definition, and prevents snoring. Buy mouth tape.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.HEALTH },
  { icon:"🦠", category:"HEALTH", title:"Take probiotics daily", desc:"Probiotics improve gut health which directly affects skin clarity, mood, and immune function. Take them 30 minutes before food for best absorption.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.HEALTH },
  { icon:"📱", category:"HEALTH", title:"Use blue light glasses in the evening", desc:"Blue light from screens suppresses melatonin and disrupts sleep. Blue light glasses after 8pm improve sleep quality noticeably within 3-4 days.", impact:"⚡ Medium", timeframe:"1 week", color:H.HEALTH },

  // ══════════ POSTURE (18 tips) ══════════
  { icon:"🧍", category:"POSTURE", title:"Fix your posture right now", desc:"Shoulders back, chest up, chin parallel to floor. Do this immediately. The confidence boost is instant, and so is the attractiveness increase.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.POSTURE },
  { icon:"💻", category:"POSTURE", title:"Raise your screen to eye level", desc:"Looking down at your screen for hours creates forward head posture (tech neck) which creates double chins and a rounded upper back. Fix this.", impact:"⚡ Medium", timeframe:"3 weeks", color:H.POSTURE },
  { icon:"🪑", category:"POSTURE", title:"Switch to a standing desk", desc:"Sitting for hours compresses your spine and trains your body to hunch. Even 20 minutes of standing per hour dramatically improves posture over time.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.POSTURE },
  { icon:"🔧", category:"POSTURE", title:"Strengthen your posterior chain", desc:"Weak glutes, hamstrings, and upper back muscles cause the hunching posture. Deadlifts, Romanian deadlifts, and face pulls fix this structurally.", impact:"🔥 High", timeframe:"2 months", color:H.POSTURE },
  { icon:"📐", category:"POSTURE", title:"Do chin tucks daily", desc:"Chin tucks counteract forward head posture. Pull your chin straight back (not down) and hold for 5 seconds. Do 10 reps, 3x a day.", impact:"⚡ Medium", timeframe:"3 weeks", color:H.POSTURE },
  { icon:"🤸", category:"POSTURE", title:"Stretch your hip flexors daily", desc:"Tight hip flexors from sitting tilt your pelvis forward and cause lower back arching. Couch stretches and hip flexor lunges fix this in weeks.", impact:"⚡ Medium", timeframe:"3 weeks", color:H.POSTURE },
  { icon:"🛌", category:"POSTURE", title:"Sleep in a posture-friendly position", desc:"Sleeping on your stomach strains your neck. Back or side sleeping with a supportive pillow maintains spinal alignment and prevents morning stiffness.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.POSTURE },
  { icon:"👁️", category:"POSTURE", title:"Lead with your chest when walking", desc:"Imagine a string pulling your sternum forward and up when you walk. This simple cue makes you look taller, more confident, and more dominant instantly.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.POSTURE },
  { icon:"📏", category:"POSTURE", title:"Do wall angels daily", desc:"Stand with your back flat against a wall, arms in goalpost position, and slide them overhead. 10 reps reveals and corrects your shoulder mobility issues.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.POSTURE },
  { icon:"🏋️", category:"POSTURE", title:"Train your rhomboids with face pulls", desc:"Face pulls directly target the rear deltoids and rhomboids responsible for keeping shoulders back. Add them to every upper body session.", impact:"🔥 High", timeframe:"6 weeks", color:H.POSTURE },
  { icon:"🦶", category:"POSTURE", title:"Strengthen your feet and ankles", desc:"Weak feet cause collapsed arches which chain-react into knee valgus, hip misalignment, and poor posture. Single-leg stands and calf raises fix this.", impact:"⚡ Medium", timeframe:"6 weeks", color:H.POSTURE },
  { icon:"🪷", category:"POSTURE", title:"Try mewing for jaw and posture", desc:"Mewing (resting tongue on palate, teeth together, nasal breathing) gradually reshapes the jaw and palate while improving airway and posture over months.", impact:"🔥 High", timeframe:"6 months", color:H.POSTURE },
  { icon:"💆", category:"POSTURE", title:"Get a deep tissue massage monthly", desc:"Chronic muscle tension from poor posture needs manual release. A monthly massage unlocks the chest, hip flexors, and upper back that stretch alone can't fix.", impact:"🔥 High", timeframe:"1 day", color:H.POSTURE },
  { icon:"🧘", category:"POSTURE", title:"Do thoracic spine extensions daily", desc:"Place a foam roller under your upper back and extend over it for 60 seconds. This opens the chest and reverses desk-slump posture rapidly.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.POSTURE },
  { icon:"👟", category:"POSTURE", title:"Wear shoes with proper arch support", desc:"Flat shoes without support collapse your arch and misalign everything up the chain. Proper insoles or supportive footwear fix posture from the ground up.", impact:"⚡ Medium", timeframe:"3 weeks", color:H.POSTURE },
  { icon:"🎯", category:"POSTURE", title:"Set posture reminders on your phone", desc:"Set an hourly alarm labeled 'POSTURE CHECK.' Each reminder builds the habit of posture awareness until it becomes automatic.", impact:"✨ Quick Win", timeframe:"2 weeks", color:H.POSTURE },
  { icon:"🚶", category:"POSTURE", title:"Walk with a slight forward lean", desc:"A 1-3 degree forward lean from the ankles (not the hips) is the natural athletic walking posture. It looks deliberate and powerful.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.POSTURE },
  { icon:"🏊", category:"POSTURE", title:"Swim to decompress the spine", desc:"Swimming is one of the few exercises that decompresses the spine while strengthening it. Regular swimming reverses compression from a sedentary lifestyle.", impact:"🔥 High", timeframe:"6 weeks", color:H.POSTURE },

  // ══════════ EYES (18 tips) ══════════
  { icon:"👁️", category:"EYES", title:"Cold compress to reduce eye bags", desc:"Refrigerated spoons or a jade roller under-eye for 5 mins every morning eliminates puffiness and brightens the under-eye area instantly.", impact:"✨ Quick Win", timeframe:"5 mins", color:H.EYES },
  { icon:"😤", category:"EYES", title:"Practice intense, relaxed eye contact", desc:"Darting eyes signal insecurity. Steady, soft eye contact signals dominance and confidence. Practice holding it for 3-5 seconds comfortably.", impact:"⚡ Medium", timeframe:"1 week", color:H.EYES },
  { icon:"💤", category:"EYES", title:"Treat dark circles with Vitamin K cream", desc:"Vitamin K reduces the appearance of dark circles by strengthening capillaries under the eyes. Use it nightly for 4-6 weeks.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.EYES },
  { icon:"🥕", category:"EYES", title:"Eat more carrots, spinach, and eggs", desc:"Beta-carotene, lutein, and zeaxanthin protect eye health and reduce puffiness from inflammation. Your eyes literally look healthier.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.EYES },
  { icon:"📱", category:"EYES", title:"Reduce screen time before bed", desc:"Blue light disrupts melatonin and reduces sleep quality, which directly causes puffy, dull eyes. Screens off 1 hour before sleep.", impact:"🔥 High", timeframe:"1 week", color:H.EYES },
  { icon:"🕶️", category:"EYES", title:"Wear sunglasses outdoors always", desc:"UV damage accelerates crow's feet and under-eye wrinkles. Sunglasses protect the delicate eye area skin and reduce squinting habits.", impact:"🔥 High", timeframe:"Ongoing", color:H.EYES },
  { icon:"💧", category:"EYES", title:"Use caffeine eye cream in the morning", desc:"Caffeine constricts blood vessels under the eyes and reduces puffiness and dark circles visibly within minutes of application.", impact:"✨ Quick Win", timeframe:"10 mins", color:H.EYES },
  { icon:"🧘", category:"EYES", title:"Practice the 20-20-20 rule", desc:"Every 20 minutes, look at something 20 feet away for 20 seconds. Reduces eye strain and prevents the tired, unfocused look from screen fatigue.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.EYES },
  { icon:"🌙", category:"EYES", title:"Get allergy treatment if eyes are often red", desc:"Red, watery, puffy eyes from untreated allergies tank your attractiveness daily. Antihistamine eye drops or allergy shots are worth it.", impact:"🔥 High", timeframe:"1 week", color:H.EYES },
  { icon:"😎", category:"EYES", title:"Practice the squinch for better photos", desc:"The squinch is a slight squinting of the lower eyelid. It makes eyes look more confident and photogenic in every single photo. Practice it.", impact:"✨ Quick Win", timeframe:"5 mins", color:H.EYES },
  { icon:"🌈", category:"EYES", title:"Try colored or clear lens contacts", desc:"Even clear lenses whiten the sclera and define the iris border. Colored lenses can subtly enhance eye color to make them more striking.", impact:"✨ Quick Win", timeframe:"1 day", color:H.EYES },
  { icon:"🎯", category:"EYES", title:"Use retinol cream around the eyes", desc:"The under-eye area benefits from retinol just like the rest of the face. Use a low-strength formula specifically formulated for the eye area.", impact:"⚡ Medium", timeframe:"8 weeks", color:H.EYES },
  { icon:"💧", category:"EYES", title:"Use lubricating eye drops for brightness", desc:"Dry, red eyes look tired and unhealthy. Lubricating eye drops brighten the whites and reduce redness instantly before important occasions.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.EYES },
  { icon:"🥗", category:"EYES", title:"Eat bilberries or blueberries for eye health", desc:"Anthocyanins in dark berries improve night vision, reduce eye fatigue, and protect against macular degeneration. A genuine eye-health food.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.EYES },
  { icon:"💤", category:"EYES", title:"Sleep with your head elevated slightly", desc:"Elevating your head by 15-20 degrees while sleeping reduces fluid pooling under the eyes, dramatically reducing morning puffiness.", impact:"⚡ Medium", timeframe:"1 week", color:H.EYES },
  { icon:"🧊", category:"EYES", title:"Try an under-eye ice roller tool", desc:"An under-eye ice roller used for 2-3 minutes each morning constricts blood vessels, reduces puffiness, and firms skin — a complete eye refresh.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.EYES },
  { icon:"🌙", category:"EYES", title:"Use a humidifier in your bedroom", desc:"Dry air from heating or AC dehydrates the skin including the eye area, causing dullness and irritation. A humidifier maintains hydration overnight.", impact:"⚡ Medium", timeframe:"1 week", color:H.EYES },
  { icon:"💪", category:"EYES", title:"Train your orbital muscles", desc:"Eye exercises — tracing shapes, near-far focus shifts — strengthen the muscles around your eyes and can improve the definition of your eye area.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.EYES },

  // ══════════ DIET (25 tips) ══════════
  { icon:"🥗", category:"DIET", title:"Cut sugar and processed food", desc:"Sugar glycates collagen, causing systemic inflammation visible in your skin. Cut processed food for 2 weeks and the difference will shock you.", impact:"🔥 High", timeframe:"2 weeks", color:H.DIET },
  { icon:"🥩", category:"DIET", title:"Eat 1g protein per lb of bodyweight", desc:"Muscle requires protein. So does hair, skin elasticity, and nail strength. Most people eat half of what they actually need.", impact:"🔥 High", timeframe:"1 month", color:H.DIET },
  { icon:"💧", category:"DIET", title:"Drink 3 liters of water daily", desc:"Dehydration causes dull skin, dark circles, poor metabolism, and brain fog. Water is the cheapest, most underused glow-up strategy.", impact:"✨ Quick Win", timeframe:"3 days", color:H.DIET },
  { icon:"🫚", category:"DIET", title:"Add olive oil and avocados to your diet", desc:"Monounsaturated fats nourish skin from inside out, improve hair shine, and support hormone production. These fats make you look better.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.DIET },
  { icon:"🐟", category:"DIET", title:"Eat fatty fish 3x per week", desc:"Salmon, mackerel, and sardines are packed with omega-3 that reduce skin inflammation, improve hair thickness, and support testosterone.", impact:"🔥 High", timeframe:"6 weeks", color:H.DIET },
  { icon:"🫐", category:"DIET", title:"Eat antioxidant-rich berries daily", desc:"Blueberries, strawberries, and pomegranate fight free radicals that age your skin. Add a handful to your morning meal daily.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.DIET },
  { icon:"🥚", category:"DIET", title:"Eat 3-4 eggs per day", desc:"Eggs contain biotin, choline, and complete protein — all essential for hair strength and skin health. Don't fear the yolk.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.DIET },
  { icon:"🥦", category:"DIET", title:"Eat cruciferous vegetables daily", desc:"Broccoli, spinach, and kale detoxify the liver, reduce inflammation, and contain zinc for clear skin. The boring truth about glowing skin.", impact:"🔥 High", timeframe:"3 weeks", color:H.DIET },
  { icon:"🍠", category:"DIET", title:"Reduce sodium intake", desc:"High sodium causes facial bloating and puffiness within hours. Restaurant food is loaded with it. Cook at home and your face will slim within days.", impact:"⚡ Medium", timeframe:"3 days", color:H.DIET },
  { icon:"🌾", category:"DIET", title:"Cut gluten and dairy for 3 weeks", desc:"Many people have low-grade sensitivities that cause chronic inflammation and acne. An elimination trial reveals if food is behind your skin issues.", impact:"🔥 High", timeframe:"3 weeks", color:H.DIET },
  { icon:"🫘", category:"DIET", title:"Add zinc-rich foods to your diet", desc:"Zinc is essential for testosterone production, wound healing, and acne prevention. Pumpkin seeds, beef, and shellfish are top sources.", impact:"⚡ Medium", timeframe:"3 weeks", color:H.DIET },
  { icon:"🍵", category:"DIET", title:"Drink bone broth regularly", desc:"Bone broth is naturally rich in collagen, gelatin, and minerals. Regular consumption improves skin elasticity, gut health, and joint recovery.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.DIET },
  { icon:"🌰", category:"DIET", title:"Eat Brazil nuts for selenium", desc:"Just 2-3 Brazil nuts daily provide your full selenium requirement. Selenium reduces inflammation, supports thyroid, and improves skin clarity.", impact:"✨ Quick Win", timeframe:"3 weeks", color:H.DIET },
  { icon:"⏰", category:"DIET", title:"Practice intermittent fasting", desc:"16:8 fasting lowers insulin, reduces inflammation, triggers autophagy (cellular cleanup), and helps maintain a lean face and body.", impact:"🔥 High", timeframe:"4 weeks", color:H.DIET },
  { icon:"🥤", category:"DIET", title:"Eliminate liquid calories", desc:"Sodas, juices, and alcohol are calorie-dense and nutrient-poor. Eliminating liquid calories is the easiest way to reduce face fat and bloating.", impact:"🔥 High", timeframe:"2 weeks", color:H.DIET },
  { icon:"🧂", category:"DIET", title:"Add turmeric to your meals", desc:"Curcumin in turmeric is a powerful anti-inflammatory that reduces skin redness, puffiness, and acne. Black pepper enhances absorption by 2000%.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.DIET },
  { icon:"🍎", category:"DIET", title:"Eat the rainbow (diverse vegetables)", desc:"Different colored vegetables contain different phytonutrients. Eating a wide variety ensures you get all the micronutrients your skin and body need.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.DIET },
  { icon:"🫙", category:"DIET", title:"Eat fermented foods for gut health", desc:"Yogurt, kimchi, sauerkraut, and kefir improve gut microbiome which directly impacts skin clarity, mood, and immune function.", impact:"🔥 High", timeframe:"4 weeks", color:H.DIET },
  { icon:"🫙", category:"DIET", title:"Add magnesium before bed", desc:"Magnesium improves sleep quality, reduces muscle cramps, lowers cortisol, and supports testosterone. Glycinate form is most bioavailable.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.DIET },
  { icon:"🥜", category:"DIET", title:"Eat a handful of mixed nuts daily", desc:"Nuts provide healthy fats, selenium, zinc, and vitamin E — a combination that directly improves hair shine, skin health, and testosterone levels.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.DIET },
  { icon:"🫛", category:"DIET", title:"Add collagen to your morning coffee", desc:"Collagen powder is tasteless, dissolves in hot drinks, and delivers the amino acids needed for skin, hair, and joint health with zero effort.", impact:"⚡ Medium", timeframe:"8 weeks", color:H.DIET },
  { icon:"🌿", category:"DIET", title:"Drink spearmint tea for hormone balance", desc:"Spearmint tea reduces excess androgens in women and reduces stress hormones in men. Anti-acne effects are clinically documented.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.DIET },
  { icon:"🍳", category:"DIET", title:"Cook at home 5 days a week", desc:"Home cooking cuts sodium, seed oils, and hidden sugars by 60-80% compared to eating out. Your face and body composition transform within weeks.", impact:"🔥 High", timeframe:"2 weeks", color:H.DIET },
  { icon:"🥑", category:"DIET", title:"Add healthy fats to every meal", desc:"Avocado, olive oil, nuts, and fatty fish provide the fat-soluble vitamins A, D, E, and K that skin, hair, and hormones all depend on.", impact:"🔥 High", timeframe:"4 weeks", color:H.DIET },
  { icon:"🧃", category:"DIET", title:"Juice celery and cucumber weekly", desc:"Celery is rich in silicon that strengthens skin, hair, and nails. Cucumber is deeply hydrating. A weekly juice gives your skin visible glow.", impact:"⚡ Medium", timeframe:"3 weeks", color:H.DIET },

  // ══════════ MINDSET (25 tips) ══════════
  { icon:"🧠", category:"MINDSET", title:"Develop a genuine passion or skill", desc:"People are attracted to people interested in life. Read, create, build, explore. Purpose and passion are visible in your face and energy.", impact:"🔥 High", timeframe:"Ongoing", color:H.MINDSET },
  { icon:"📚", category:"MINDSET", title:"Read one book per month", desc:"Reading makes you more interesting, more articulate, and more attractive. Intelligence and depth are noticed. The library is free.", impact:"🔥 High", timeframe:"Ongoing", color:H.MINDSET },
  { icon:"🎯", category:"MINDSET", title:"Set and pursue one big goal", desc:"Having a compelling goal gives you drive that's visible. People are drawn to those who are building something. Know what you're building.", impact:"🔥 High", timeframe:"Ongoing", color:H.MINDSET },
  { icon:"🔒", category:"MINDSET", title:"Stop seeking external validation", desc:"The moment you stop needing people's approval is the moment you become genuinely attractive. Neediness is a repellent. Self-sufficiency draws people in.", impact:"🔥 High", timeframe:"Ongoing", color:H.MINDSET },
  { icon:"🌅", category:"MINDSET", title:"Build a morning routine and commit to it", desc:"Waking up with a structured morning routine signals to yourself that you're intentional about your life. That confidence radiates outward.", impact:"🔥 High", timeframe:"3 weeks", color:H.MINDSET },
  { icon:"💬", category:"MINDSET", title:"Practice positive self-talk", desc:"The way you speak to yourself shapes your confidence and eventually your posture, smile, and energy. Speak to yourself like someone you love.", impact:"🔥 High", timeframe:"2 weeks", color:H.MINDSET },
  { icon:"🧘", category:"MINDSET", title:"Meditate 10 minutes daily", desc:"Meditation reduces cortisol, improves presence, and makes you a better listener. Being fully present in conversations is profoundly attractive.", impact:"⚡ Medium", timeframe:"3 weeks", color:H.MINDSET },
  { icon:"📓", category:"MINDSET", title:"Journal daily for 5 minutes", desc:"Journaling processes emotions, clarifies goals, and reduces anxiety. Emotional clarity makes you more grounded and less reactive. Both are attractive.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.MINDSET },
  { icon:"🔇", category:"MINDSET", title:"Reduce social media by 50%", desc:"Social media creates comparison loops that tank confidence. Less time scrolling = more time doing. Doers are always more attractive than watchers.", impact:"🔥 High", timeframe:"2 weeks", color:H.MINDSET },
  { icon:"🌊", category:"MINDSET", title:"Embrace discomfort deliberately", desc:"Doing hard things daily (cold showers, difficult conversations, new skills) builds a confidence that's visible in how you carry yourself.", impact:"🔥 High", timeframe:"1 month", color:H.MINDSET },
  { icon:"🤝", category:"MINDSET", title:"Stop comparing yourself to others", desc:"Comparison drains energy you could spend improving. Your competition is yesterday's version of you. Everyone else is irrelevant.", impact:"🔥 High", timeframe:"Ongoing", color:H.MINDSET },
  { icon:"🏆", category:"MINDSET", title:"Track your progress weekly", desc:"Reviewing your own progress builds momentum and confidence. Take monthly photos, track fitness metrics, and review your improvements.", impact:"⚡ Medium", timeframe:"Ongoing", color:H.MINDSET },
  { icon:"🌱", category:"MINDSET", title:"Adopt a growth mindset about your looks", desc:"Believing that your appearance can improve with effort is the first and most important step. Fixed mindset kills glow-ups before they start.", impact:"🔥 High", timeframe:"Immediate", color:H.MINDSET },
  { icon:"💪", category:"MINDSET", title:"Learn to be comfortable in silence", desc:"People who are comfortable with silence in conversations are perceived as more confident and intelligent. Stop filling every pause with noise.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.MINDSET },
  { icon:"🎭", category:"MINDSET", title:"Act confident before you feel confident", desc:"Confidence is a skill that comes from action, not a feeling that precedes it. Fake it structurally: posture, pace, eye contact, until it's real.", impact:"🔥 High", timeframe:"2 weeks", color:H.MINDSET },
  { icon:"🫂", category:"MINDSET", title:"Invest in therapy or coaching", desc:"Addressing limiting beliefs, trauma, and mental patterns unlocks a version of yourself that better grooming alone can never reach.", impact:"🔥 High", timeframe:"3 months", color:H.MINDSET },
  { icon:"💡", category:"MINDSET", title:"Reframe rejection as data, not defeat", desc:"Every rejection gives you information about what to improve or who wasn't right. People who can't be rejected can't be chosen. Embrace the process.", impact:"🔥 High", timeframe:"Ongoing", color:H.MINDSET },
  { icon:"🧩", category:"MINDSET", title:"Challenge yourself with one new skill monthly", desc:"Learning new skills activates neuroplasticity, builds confidence, and gives you stories and depth. Guitar, language, cooking — it doesn't matter. Learn.", impact:"🔥 High", timeframe:"Ongoing", color:H.MINDSET },
  { icon:"🗺️", category:"MINDSET", title:"Have interesting opinions, not just safe ones", desc:"People who have genuine opinions are more magnetic than people who agree with everything to avoid conflict. Stand for something.", impact:"🔥 High", timeframe:"2 weeks", color:H.MINDSET },
  { icon:"🌍", category:"MINDSET", title:"Travel somewhere new annually", desc:"Travel builds perspective, stories, confidence, and open-mindedness. People who've experienced the world are more interesting to talk to.", impact:"🔥 High", timeframe:"1 trip", color:H.MINDSET },
  { icon:"🎯", category:"MINDSET", title:"Define your non-negotiables", desc:"Knowing exactly what you will and won't accept from people creates the kind of self-respect that naturally attracts high-quality people to you.", impact:"🔥 High", timeframe:"1 week", color:H.MINDSET },
  { icon:"🔑", category:"MINDSET", title:"Develop a healthy relationship with money", desc:"Financial confidence reduces a major source of anxiety and shows in your demeanor. Have savings, a budget, and a financial goal. Security radiates.", impact:"🔥 High", timeframe:"3 months", color:H.MINDSET },
  { icon:"🏅", category:"MINDSET", title:"Compete only with yesterday's version of you", desc:"The most focused people on earth measure themselves against their past selves only. This eliminates jealousy, comparison, and wasted energy.", impact:"🔥 High", timeframe:"Immediate", color:H.MINDSET },
  { icon:"🎵", category:"MINDSET", title:"Use music to anchor your best emotional state", desc:"Create a playlist that makes you feel your best self. Listen before important social situations. Emotional state is visible and contagious.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.MINDSET },
  { icon:"🌙", category:"MINDSET", title:"Do a weekly review of your social performance", desc:"Review how you showed up socially each week. What worked? What didn't? Deliberate reflection accelerates social skill growth dramatically.", impact:"⚡ Medium", timeframe:"Ongoing", color:H.MINDSET },

  // ══════════ SOCIAL (25 tips) ══════════
  { icon:"💬", category:"SOCIAL", title:"Improve your conversational skills", desc:"Ask great questions. Listen actively. Forget about yourself. People leave conversations feeling seen, and that makes them like you.", impact:"🔥 High", timeframe:"2 weeks", color:H.SOCIAL },
  { icon:"😄", category:"SOCIAL", title:"Smile more with your eyes", desc:"A genuine smile engages the orbicularis oculi (the eye crinkle muscles). Fake smiles don't. Practice in the mirror. It changes everything.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.SOCIAL },
  { icon:"🗣️", category:"SOCIAL", title:"Lower your speaking voice slightly", desc:"A deeper, slower, more resonant speaking voice is consistently rated as more attractive and authoritative. Speak from your chest, not your throat.", impact:"🔥 High", timeframe:"3 weeks", color:H.SOCIAL },
  { icon:"🤌", category:"SOCIAL", title:"Use confident body language", desc:"Take up space. Don't cross your arms. Plant your feet shoulder-width apart. Open body language signals confidence and makes you more approachable.", impact:"🔥 High", timeframe:"Immediate", color:H.SOCIAL },
  { icon:"🎤", category:"SOCIAL", title:"Learn to tell a compelling story", desc:"People who can tell stories well are magnetic. Learn the setup-conflict-resolution structure. Practice stories from your own life until they're polished.", impact:"🔥 High", timeframe:"1 month", color:H.SOCIAL },
  { icon:"😂", category:"SOCIAL", title:"Develop your sense of humor", desc:"Humor is consistently ranked as one of the most attractive traits in both genders. Watch stand-up, read funny books, practice wit in low-stakes conversations.", impact:"🔥 High", timeframe:"3 months", color:H.SOCIAL },
  { icon:"🎯", category:"SOCIAL", title:"Be genuinely interested in others", desc:"Ask people what excites them. Remember what they told you and follow up. People are hungry to be truly heard. Giving that is magnetic.", impact:"🔥 High", timeframe:"Immediate", color:H.SOCIAL },
  { icon:"⏸️", category:"SOCIAL", title:"Slow down your speech", desc:"Fast talking reads as nervous. Slow, deliberate speech reads as confident and thoughtful. Pause before answering. Take up conversational time.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.SOCIAL },
  { icon:"📞", category:"SOCIAL", title:"Invest in your close friendships", desc:"Quality of your social circle shapes your confidence, opportunities, and worldview. Upgrade your friendships and you upgrade yourself.", impact:"🔥 High", timeframe:"Ongoing", color:H.SOCIAL },
  { icon:"🤝", category:"SOCIAL", title:"Give firm, confident handshakes", desc:"A weak handshake creates an immediate negative first impression. Firm, two-shake, eye contact. Practice with friends until it's automatic.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.SOCIAL },
  { icon:"🎭", category:"SOCIAL", title:"Take an improv or acting class", desc:"Improv builds quick thinking, comfort with attention, and social spontaneity. People who've done improv are universally more fun to be around.", impact:"🔥 High", timeframe:"2 months", color:H.SOCIAL },
  { icon:"🌐", category:"SOCIAL", title:"Put your phone away in social settings", desc:"Being fully present when you're with people is so rare that it stands out immediately. Your undivided attention is the most attractive gift you can give.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.SOCIAL },
  { icon:"🏋️", category:"SOCIAL", title:"Join a class, club, or team", desc:"Shared activities create natural social bonds. Joining a gym class, sports team, or hobby club expands your social world and your options.", impact:"🔥 High", timeframe:"1 month", color:H.SOCIAL },
  { icon:"✍️", category:"SOCIAL", title:"Improve your texting and messaging game", desc:"Be interesting, be brief, end conversations first occasionally, and avoid double-texting. Texting is a skill and most people are bad at it.", impact:"⚡ Medium", timeframe:"1 week", color:H.SOCIAL },
  { icon:"🧠", category:"SOCIAL", title:"Learn a person's name and use it", desc:"A person's name is their favorite word. Using it in conversation creates connection instantly. Remember it, use it once or twice, watch the effect.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.SOCIAL },
  { icon:"🗺️", category:"SOCIAL", title:"Have interesting opinions, not safe ones", desc:"People who have genuine opinions, even controversial ones, are more magnetic than people who agree with everything to avoid conflict.", impact:"🔥 High", timeframe:"2 weeks", color:H.SOCIAL },
  { icon:"🎵", category:"SOCIAL", title:"Develop a genuine music taste", desc:"Music taste is a window into personality. Having specific artists you love and can talk about passionately is far more attractive than 'I like everything.'", impact:"⚡ Medium", timeframe:"1 month", color:H.SOCIAL },
  { icon:"🎤", category:"SOCIAL", title:"Learn to disagree gracefully", desc:"People who can push back on ideas without losing warmth are magnetic. 'That's interesting, I see it differently...' is a powerful social tool.", impact:"🔥 High", timeframe:"2 weeks", color:H.SOCIAL },
  { icon:"🌟", category:"SOCIAL", title:"Celebrate others genuinely", desc:"People who celebrate others' wins without ego are rare and universally loved. Be the person in the room who lifts others up. It makes you unforgettable.", impact:"🔥 High", timeframe:"Immediate", color:H.SOCIAL },
  { icon:"📲", category:"SOCIAL", title:"Follow up after good conversations", desc:"Sending a genuine 'great talking with you, I loved what you said about X' the next day creates connection that most people never build.", impact:"✨ Quick Win", timeframe:"1 day", color:H.SOCIAL },
  { icon:"🎯", category:"SOCIAL", title:"Learn to give specific compliments", desc:"'You have great energy' hits differently than 'you're nice.' Specific, genuine compliments show you actually pay attention. They're remembered forever.", impact:"🔥 High", timeframe:"Immediate", color:H.SOCIAL },
  { icon:"🧩", category:"SOCIAL", title:"Ask two follow-up questions", desc:"The formula: ask a question → listen fully → ask a follow-up about what they said. This alone makes you appear brilliant at conversation.", impact:"🔥 High", timeframe:"1 week", color:H.SOCIAL },
  { icon:"🌊", category:"SOCIAL", title:"Don't over-explain yourself", desc:"Confident people don't justify every decision. Saying less creates intrigue and mystery. Over-explaining is a low-confidence behavior.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.SOCIAL },
  { icon:"🤗", category:"SOCIAL", title:"Initiate more, wait less", desc:"The most attractive people in any room are the ones who introduce themselves, suggest plans, and lead. Waiting to be approached is a losing strategy.", impact:"🔥 High", timeframe:"1 week", color:H.SOCIAL },
  { icon:"🎭", category:"SOCIAL", title:"Read 'How to Win Friends and Influence People'", desc:"The most impactful social skills book ever written. One read changes how you interact with every person for the rest of your life.", impact:"🔥 High", timeframe:"2 weeks", color:H.SOCIAL },

  // ══════════ DATING (120 tips) ══════════
  { icon:"💌", category:"DATING", title:"Open with something specific, not 'hey'", desc:"'Hey' gets ignored. Reference something real from their profile — a photo, a quote, a specific interest. Shows you actually paid attention.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"📸", category:"DATING", title:"Your first photo must be your best photo", desc:"People decide in 0.3 seconds. Your lead photo is everything. Use one where you're sharp, lit from the front, and clearly showing your face and smile.", impact:"🔥 High", timeframe:"1 day", color:H.DATING },
  { icon:"🎯", category:"DATING", title:"Send the first message within 24 hours of matching", desc:"Matches go cold fast. Message the same day. Your enthusiasm is contagious, and early messages get 3x more responses than messages sent after 48 hours.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"📱", category:"DATING", title:"Move from app to number within 5-7 messages", desc:"Don't pen-pal people on apps. After a few good exchanges, say 'Let's move this to text' or 'What's your number?' Momentum is everything.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"📅", category:"DATING", title:"Ask for the date within the first week of texting", desc:"Texting indefinitely without meeting is a friendship. Suggest a specific time and place within the first week. Concrete, not vague.", impact:"🔥 High", timeframe:"1 week", color:H.DATING },
  { icon:"☕", category:"DATING", title:"First dates should be low-key", desc:"Coffee, a walk, a casual drink. Not dinner. First dates are about chemistry, not entertainment. Keep it short (60-90 mins) and light. Dinner creates pressure.", impact:"🔥 High", timeframe:"1 date", color:H.DATING },
  { icon:"🎯", category:"DATING", title:"Plan the date specifically — don't ask 'what do you want'", desc:"'I know a great spot in [area] on Saturday at 7, are you free?' is infinitely better than 'Where do you want to go?' Leadership is attractive.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"🧠", category:"DATING", title:"Ask open-ended questions on dates", desc:"'What made you move to this city?' beats 'Do you like it here?' Open questions unlock stories. People who feel interesting around you like you more.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"😂", category:"DATING", title:"Make them laugh on the first date", desc:"Humor creates attraction faster than any other tool. A person who makes you laugh feels safe, comfortable, and exciting simultaneously. Lead with lightness.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"👁️", category:"DATING", title:"Look at their eyes when they talk", desc:"Sustained, interested eye contact communicates that this person matters to you. It's the most powerful form of compliment that exists.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"📵", category:"DATING", title:"Never look at your phone on a date", desc:"Checking your phone on a date communicates that your attention is worth half. Put it face-down or in your pocket the moment you sit down.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"🔑", category:"DATING", title:"Don't interview — have a conversation", desc:"Rapid-fire questions feel like a job interview. Share something personal, invite a response, let it breathe. Conversation is an exchange, not a form.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"⏰", category:"DATING", title:"End the date first when it's going well", desc:"Leaving when the energy is highest creates desire. 'I have to head out but I'm really glad we did this' is the perfect exit. Leave them wanting more.", impact:"🔥 High", timeframe:"1 date", color:H.DATING },
  { icon:"📱", category:"DATING", title:"Text after the date — but not immediately", desc:"Text an hour or two after the date ends, not before you reach home. Something short: 'That was fun — let's do it again.' Simple, confident, clear.", impact:"🔥 High", timeframe:"Same day", color:H.DATING },
  { icon:"🚀", category:"DATING", title:"Suggest the second date while on the first", desc:"The best time to lock in a second date is when the energy of the first is highest. 'We should check out that place you mentioned — Thursday work?'", impact:"🔥 High", timeframe:"1 date", color:H.DATING },
  { icon:"💬", category:"DATING", title:"Text in a ratio of 1:1", desc:"Match their energy. If they send a sentence, don't reply with a paragraph. Text mirroring creates comfort and prevents the 'too eager' signal.", impact:"⚡ Medium", timeframe:"Immediate", color:H.DATING },
  { icon:"🎭", category:"DATING", title:"Tease playfully — never insult", desc:"Light teasing about something they said shows you're engaged and confident. 'You're such a nerd for knowing that' creates more attraction than any compliment.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"🔄", category:"DATING", title:"Mirror their energy on dates", desc:"If they're relaxed, relax. If they're animated, meet that energy. Emotional mirroring creates subconscious connection and makes conversations flow.", impact:"⚡ Medium", timeframe:"Immediate", color:H.DATING },
  { icon:"🌟", category:"DATING", title:"Give one specific, genuine compliment early", desc:"'You have really interesting energy' or 'that dress is perfect on you' said once, with eye contact, creates more impact than three generic compliments.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"🏃", category:"DATING", title:"Bring activity into dates", desc:"Active dates (mini golf, cooking class, escape room) create shared experiences and memories. Experiences bonded to positive emotions create attraction.", impact:"🔥 High", timeframe:"1 date", color:H.DATING },
  { icon:"🎯", category:"DATING", title:"Maintain a life outside of dating", desc:"People who are busy, passionate, and hard to pin down are more attractive. Don't drop everything for someone. Your life should pull you, not theirs.", impact:"🔥 High", timeframe:"Ongoing", color:H.DATING },
  { icon:"💪", category:"DATING", title:"Don't over-pursue — let them come toward you", desc:"Chasing creates distance. When you stop over-pursuing and let them fill some of the gap, you immediately become more attractive and less predictable.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"🙅", category:"DATING", title:"Never put your worth on one person", desc:"When you're talking to multiple people at once, you feel less desperate about any one of them. That relaxed confidence is precisely what attracts them.", impact:"🔥 High", timeframe:"Ongoing", color:H.DATING },
  { icon:"📖", category:"DATING", title:"Know your own story", desc:"Be able to tell your life story compellingly. Where you grew up, what shaped you, where you're headed. Someone who knows where they're going is magnetic.", impact:"🔥 High", timeframe:"1 week", color:H.DATING },
  { icon:"🎵", category:"DATING", title:"Build a date playlist", desc:"Music is the fastest way to set mood and create atmosphere. A curated playlist playing during a date at your place says more about you than anything else.", impact:"⚡ Medium", timeframe:"1 day", color:H.DATING },
  { icon:"🍷", category:"DATING", title:"Learn basic wine and cocktail knowledge", desc:"Being able to confidently order and recommend drinks on a date signals worldliness and taste. 5 hours of study makes you look expert.", impact:"⚡ Medium", timeframe:"1 week", color:H.DATING },
  { icon:"🌙", category:"DATING", title:"Be genuinely curious about their inner world", desc:"What do they believe? What do they want from life? Deep questions said warmly create intimacy faster than any flirting technique ever will.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"📸", category:"DATING", title:"Use 4-6 photos on dating profiles", desc:"One lead photo, one body photo, one doing something interesting, one with friends, one candid laugh. This combination tells a complete story.", impact:"🔥 High", timeframe:"1 day", color:H.DATING },
  { icon:"✍️", category:"DATING", title:"Write a bio that shows personality, not a resume", desc:"Your height and job can be seen. Your bio should show your sense of humor, your weirdness, your spark. That's what makes people swipe right.", impact:"🔥 High", timeframe:"1 day", color:H.DATING },
  { icon:"🏙️", category:"DATING", title:"Know the best spots in your city", desc:"Knowing the best coffee shop, rooftop bar, or hidden gem makes every date better. Being the person who knows the cool spots is extremely attractive.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.DATING },
  { icon:"🎯", category:"DATING", title:"State your intentions clearly", desc:"Ambiguity is a turn-off. If you like someone, say so. If you want something casual, say so. Clarity shows self-knowledge and respect.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"💌", category:"DATING", title:"Send a good morning text occasionally", desc:"A rare but well-timed morning message ('saw this and thought of you' with a meme) shows you think about them without being clingy.", impact:"⚡ Medium", timeframe:"Ongoing", color:H.DATING },
  { icon:"🧠", category:"DATING", title:"Study attachment theory", desc:"Understanding secure, anxious, and avoidant attachment styles transforms how you date. Recognizing patterns prevents repeating them endlessly.", impact:"🔥 High", timeframe:"1 week", color:H.DATING },
  { icon:"🎁", category:"DATING", title:"Plan one creative, personal date", desc:"After a few dates, plan something tailored to them — a picnic in a park they mentioned, or a show by an artist they love. Thoughtfulness = attraction.", impact:"🔥 High", timeframe:"1 date", color:H.DATING },
  { icon:"💬", category:"DATING", title:"Don't double text — ever", desc:"If they haven't responded, one message is enough. Double texting signals anxiety and desperation. Give it 24-48 hours or move on.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"🌹", category:"DATING", title:"Don't bring up your ex — ever", desc:"Bringing up an ex on dates signals you're not over them. It poisons the current interaction immediately. Mention exes only if directly asked.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"🎯", category:"DATING", title:"Use voice notes occasionally for more intimacy", desc:"A voice note does what text can't — it conveys tone, warmth, humor. An unexpected voice note from someone you're dating is genuinely thrilling.", impact:"⚡ Medium", timeframe:"Immediate", color:H.DATING },
  { icon:"🚪", category:"DATING", title:"Know when to walk away", desc:"If someone is consistently inconsistent, you leave. Not with anger, but with clarity. The person who can walk away is always the more attractive one.", impact:"🔥 High", timeframe:"Ongoing", color:H.DATING },
  { icon:"🔥", category:"DATING", title:"Let your life be genuinely good", desc:"People are attracted to a good life. Travel, have friends, build things, have passions. When someone enters your world, it should be inviting.", impact:"🔥 High", timeframe:"Ongoing", color:H.DATING },
  { icon:"🕯️", category:"DATING", title:"Create atmosphere for home dates", desc:"Clean space, candles or low lighting, good music, a scent. The environment you create for a home date communicates your standard of living.", impact:"🔥 High", timeframe:"1 day", color:H.DATING },
  { icon:"🍽️", category:"DATING", title:"Learn to cook one impressive meal", desc:"Cooking for someone is intimate, thoughtful, and demonstrates competence. One consistently good meal is worth more than five mediocre restaurant dinners.", impact:"🔥 High", timeframe:"1 week", color:H.DATING },
  { icon:"🎯", category:"DATING", title:"Be the person who makes decisions", desc:"'Where do you want to eat?' is a trap. Say 'I know a great place' and lead. Decisiveness is one of the most consistently attractive traits.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"🌊", category:"DATING", title:"Let vulnerability be your superpower", desc:"Carefully placed, genuine vulnerability — sharing a real fear or an embarrassing story — creates more attraction than perfection ever will.", impact:"🔥 High", timeframe:"Ongoing", color:H.DATING },
  { icon:"📵", category:"DATING", title:"No Netflix on early dates — talk instead", desc:"Putting on a show on the first home date is an escape from connection. Sit across from each other. Talk, debate, laugh, be present. Screen later.", impact:"⚡ Medium", timeframe:"Immediate", color:H.DATING },
  { icon:"💡", category:"DATING", title:"Notice the small things they mention", desc:"If they mention a book, a show, or a place in passing — reference it later. People are stunned when someone actually remembers what they said.", impact:"🔥 High", timeframe:"Ongoing", color:H.DATING },
  { icon:"🌟", category:"DATING", title:"Show genuine enthusiasm — not desperation", desc:"There's a difference between 'I really enjoy spending time with you' (attractive) and 'I need you' (repellent). Enthusiasm from a full life is irresistible.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"🎭", category:"DATING", title:"Match their communication style", desc:"Some people text novels. Others send 5 words. Matching their natural style creates subconscious comfort and feels natural rather than jarring.", impact:"⚡ Medium", timeframe:"Immediate", color:H.DATING },
  { icon:"🔑", category:"DATING", title:"Know your worth and communicate it quietly", desc:"You don't say 'I'm valuable' — you demonstrate it through your standards, your energy, and what you won't tolerate. Quiet confidence is the most powerful.", impact:"🔥 High", timeframe:"Ongoing", color:H.DATING },
  { icon:"🌙", category:"DATING", title:"Don't make dating your entire personality", desc:"Someone who talks only about dating is exhausting. Your job, your passions, your goals, your friendships — those are what make you interesting.", impact:"🔥 High", timeframe:"Ongoing", color:H.DATING },
  { icon:"🏡", category:"DATING", title:"Have an interesting home environment", desc:"Books on the shelf, art on the wall, plants, a good smell. Your home tells your story before you say a word. Make it tell a good one.", impact:"🔥 High", timeframe:"1 week", color:H.DATING },
  { icon:"💫", category:"DATING", title:"Learn to read between the lines", desc:"What people say and what they mean are often different. Read body language, energy shifts, and response time. High emotional intelligence is deeply attractive.", impact:"🔥 High", timeframe:"Ongoing", color:H.DATING },
  { icon:"🎯", category:"DATING", title:"Set the pace — not too fast, not too slow", desc:"Moving too fast scares people away; too slow creates ambiguity. By the 3rd date you should be expressing genuine interest clearly and confidently.", impact:"🔥 High", timeframe:"3 dates", color:H.DATING },
  { icon:"🌹", category:"DATING", title:"Flowers are still impressive — use them right", desc:"One flower, not a bouquet, after a few dates signals confidence and old-fashioned charm. On date 1 it's too much. On date 4 it's perfect.", impact:"⚡ Medium", timeframe:"4th date", color:H.DATING },
  { icon:"📱", category:"DATING", title:"Don't tell them you're talking to others", desc:"It's normal to date multiple people early on. Announcing it is unnecessary and creates jealousy without purpose. Let your actions show your interest.", impact:"⚡ Medium", timeframe:"Immediate", color:H.DATING },
  { icon:"🎯", category:"DATING", title:"Qualify them — don't just try to impress them", desc:"Ask them questions that filter for what you actually want. 'What's your relationship with ambition?' shows you have standards and aren't just trying to please.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"🏃", category:"DATING", title:"Don't cancel plans — ever", desc:"Canceling plans sends a signal that you don't value someone's time. Show up, every time. If life demands a reschedule, do it immediately with a new plan.", impact:"🔥 High", timeframe:"Ongoing", color:H.DATING },
  { icon:"🧩", category:"DATING", title:"Understand love languages", desc:"Some people need acts of service. Others need words of affirmation. Knowing both your love language and theirs changes everything about connection.", impact:"🔥 High", timeframe:"1 week", color:H.DATING },
  { icon:"💪", category:"DATING", title:"Date from abundance, not scarcity", desc:"When you have a full life, great friendships, and personal goals, one person not working out is a minor event, not a catastrophe. That energy is magnetic.", impact:"🔥 High", timeframe:"Ongoing", color:H.DATING },
  { icon:"🌟", category:"DATING", title:"Be on time — always", desc:"Being late on a date communicates your time is worth more than theirs. Being on time or early signals respect, reliability, and attractiveness.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"🔥", category:"DATING", title:"Don't just be interested — be interesting", desc:"Ask questions, yes. But also share opinions, tell stories, make observations. Dates go both ways. Contribute as much as you consume.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"💌", category:"DATING", title:"Send a voice message instead of a long text", desc:"Long texts get misread. A 30-second voice message where they can hear your tone and humor communicates everything a text paragraph never could.", impact:"⚡ Medium", timeframe:"Immediate", color:H.DATING },
  { icon:"🌊", category:"DATING", title:"Don't talk about problems on early dates", desc:"Work stress, family drama, and health worries — all of these are inappropriate on first or second dates. Keep early dates positive and light.", impact:"⚡ Medium", timeframe:"Immediate", color:H.DATING },
  { icon:"🎯", category:"DATING", title:"Master the art of the almost-compliment", desc:"'You're dangerously charming, you know that' or 'I wasn't expecting to enjoy this as much as I am' lands harder than 'you're beautiful' every time.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"🔑", category:"DATING", title:"Follow your gut on chemistry", desc:"If the chemistry isn't there after 2-3 dates, it's rarely coming. Stop chasing potential and start recognizing reality. Move on without guilt.", impact:"🔥 High", timeframe:"Ongoing", color:H.DATING },
  { icon:"💡", category:"DATING", title:"Lead the physical escalation gradually", desc:"Touch is communication. A brief touch on the arm or shoulder during conversation tells someone you're interested without words. Calibrate to their response.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"🌹", category:"DATING", title:"Don't rush into relationships for comfort", desc:"Locking down a relationship quickly out of fear of being alone leads to wrong relationships. Take time to know someone before commitment.", impact:"🔥 High", timeframe:"Ongoing", color:H.DATING },
  { icon:"📖", category:"DATING", title:"Read 'The Dating Playbook for Men' or equivalent", desc:"Education on dating psychology accelerates growth faster than trial and error alone. The best daters are also the most studied in human attraction.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.DATING },
  { icon:"🎭", category:"DATING", title:"Don't seek closure — seek forward", desc:"Asking for closure after rejection keeps you stuck. The best response to any rejection is to focus on your own life and let the next opportunity come.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"✨", category:"DATING", title:"Have standards — and stick to them", desc:"People who know what they want and refuse to settle for less are universally more attractive than people who accept anyone who shows interest.", impact:"🔥 High", timeframe:"Ongoing", color:H.DATING },
  { icon:"💬", category:"DATING", title:"Tell stories, not facts", desc:"'I backpacked through Southeast Asia for 3 weeks' is a fact. Telling what happened, who you met, what changed you — that's a story. Stories create connection.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"🔥", category:"DATING", title:"Show interest in what they're building", desc:"Ask about their goals, their projects, their ambitions. Being genuinely fascinated by what someone is creating is one of the most powerful forms of attraction.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"🌟", category:"DATING", title:"Value chemistry over compatibility on paper", desc:"Perfect compatibility checklists don't create passion. Unexplainable chemistry — how you make each other feel — is worth ten ticked boxes.", impact:"🔥 High", timeframe:"Ongoing", color:H.DATING },
  { icon:"🎵", category:"DATING", title:"Share music as a form of intimacy", desc:"Sending a song that made you think of them, or playing music they'll love, creates emotional closeness that conversation alone rarely reaches.", impact:"⚡ Medium", timeframe:"Immediate", color:H.DATING },
  { icon:"🏙️", category:"DATING", title:"Have a go-to spot for dates", desc:"A local bar, restaurant, or café where the staff know you and you feel relaxed creates comfort and confidence. Home-field advantage on dates is real.", impact:"⚡ Medium", timeframe:"1 week", color:H.DATING },
  { icon:"🌊", category:"DATING", title:"Don't compete — appreciate", desc:"Comparing yourself to their exes or comparing them to past partners kills connection. Every person is a new experience. Appreciate it for what it is.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"🎯", category:"DATING", title:"Make them feel like the most interesting person in the room", desc:"The goal on every date: make them feel fascinating. When people feel fascinating around you, they associate that feeling with you. That's pure attraction.", impact:"🔥 High", timeframe:"Immediate", color:H.DATING },
  { icon:"💡", category:"DATING", title:"Know that consistency is the deepest attraction", desc:"Showing up consistently — texting back reliably, following through on plans, behaving the same way every time — builds trust which builds attraction.", impact:"🔥 High", timeframe:"Ongoing", color:H.DATING },

  // ══════════ FLIRT (120 tips) ══════════
  { icon:"👀", category:"FLIRT", title:"Hold eye contact 70% of the time", desc:"The 70% rule: hold eye contact 70% while they speak, less while you speak. Too much is intense; too little is disinterested. 70% is magnetic.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"😏", category:"FLIRT", title:"Smile slowly, not immediately", desc:"An immediate smile says 'I'm excited you exist.' A slow smile that builds says 'I've just decided you're interesting.' The slow one is far more powerful.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🎯", category:"FLIRT", title:"Use the 'I noticed...' opener", desc:"'I noticed you ordered the same thing I was going to get' opens a conversation that feels organic and personal. Better than any pickup line.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"💬", category:"FLIRT", title:"Tease, don't compliment immediately", desc:"Leading with a tease ('You're trouble, I can tell') creates mystery and pull. Leading with a compliment ('You're beautiful') creates obligation.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"👋", category:"FLIRT", title:"Touch the forearm briefly and intentionally", desc:"A single, brief touch on the forearm during a laugh or a point creates physical connection without pressure. It says 'I'm comfortable with you' without words.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌊", category:"FLIRT", title:"Create push-pull in conversation", desc:"Push: 'You're such a nerd for knowing that.' Pull: '...which I actually find really attractive.' This emotional oscillation creates intense chemistry.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"😤", category:"FLIRT", title:"Don't chase the conversation — let them come", desc:"When the conversation lags, resist the urge to fill it. Confident silence forces them to contribute. People who need to fill silence are easier to lead.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🎭", category:"FLIRT", title:"Be unpredictable in the best way", desc:"Say the unexpected thing. Agree when they expect you to push back. Disagree when they expect agreement. Unpredictability creates fascination.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌹", category:"FLIRT", title:"Compliment their mind, not just their looks", desc:"'The way you think about that is fascinating' lands deeper than 'you're pretty.' Most people compliment looks. Stand apart by complimenting substance.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🎵", category:"FLIRT", title:"Use their name deliberately — but not often", desc:"Using someone's name in conversation creates intimacy. 'What do you think, [name]?' said with eye contact is quietly electric. Use it 1-2 times maximum.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🔥", category:"FLIRT", title:"Laugh at yourself, not at others", desc:"Self-deprecating humor without self-pity is the most attractive comedy style. It shows security. Never make fun of others — it makes you look insecure.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"💫", category:"FLIRT", title:"The look away and look back technique", desc:"While they're talking, break eye contact for 2 seconds as if you're processing what they said, then look back directly. It signals deep thinking and presence.", impact:"⚡ Medium", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🎯", category:"FLIRT", title:"Show selective attention", desc:"Be warm with everyone but slightly more interested in them specifically. This creates a feeling of being chosen — the most powerful pull there is.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"💬", category:"FLIRT", title:"Create an inside joke in the first 10 minutes", desc:"A shared reference that only you two understand — even trivial — creates a 'us vs. the world' feeling instantly. Reference it later for maximum effect.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌊", category:"FLIRT", title:"Move closer as the conversation progresses", desc:"Start at normal distance. As comfort builds, close the distance slightly. This natural progression mirrors emotional closeness with physical closeness.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🎭", category:"FLIRT", title:"Mirror their body language subtly", desc:"Mirroring posture, speech pace, and gestures creates subconscious rapport within minutes. Do it subtly — exaggerate and it looks like mockery.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"📵", category:"FLIRT", title:"Never check your phone while talking to them", desc:"Your full, undivided attention is the most seductive thing you can give someone. It says: in this moment, nothing else exists but you.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌹", category:"FLIRT", title:"Find their hidden talent and compliment it", desc:"Ask 'what's something you're weirdly good at?' then genuinely appreciate the answer. People rarely get appreciated for their hidden qualities. Stand apart.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🔑", category:"FLIRT", title:"Speak to their future self, not their current self", desc:"'You seem like the type of person who...' positions them as they want to be seen, not just how they are. This is deeply validating and creates warmth.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"😏", category:"FLIRT", title:"Hold tension before you speak", desc:"When they say something interesting, pause for 1-2 seconds before responding. This brief delay creates weight and significance to everything you say.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌙", category:"FLIRT", title:"Whisper something at just the right moment", desc:"Leaning in slightly and speaking just above a whisper (forcing them to lean in too) creates instant physical closeness and electric tension.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🎯", category:"FLIRT", title:"Ask about their passions, not their job", desc:"Asking what they do for a living is forgettable. Asking 'what's something you could talk about for hours?' creates connection and shows you value depth.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🔥", category:"FLIRT", title:"End conversations before they want you to", desc:"Leaving a conversation when they're still engaged makes them want more. 'I have to go find my friend, but this was really good' exits at the peak.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"✨", category:"FLIRT", title:"Ask 'what does that feel like?' not just 'what happened?'", desc:"Questions about feelings create emotional connection immediately. Facts are forgettable. Feelings create bonds.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"💬", category:"FLIRT", title:"Use 'we' language early", desc:"'We should check that out,' 'people like us,' 'next time we...' — using 'we' implicitly creates a unit and a future. Very subtly powerful.", impact:"⚡ Medium", timeframe:"Immediate", color:H.FLIRT },
  { icon:"👀", category:"FLIRT", title:"The triangle gaze technique", desc:"Look at one eye, then the other, then briefly at the lips, then back up. This unconscious triangle creates intense attraction and signals interest.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌊", category:"FLIRT", title:"Be slightly hard to read", desc:"If someone can fully predict your reaction, they stop paying attention. Being warm but slightly enigmatic creates irresistible fascination.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🎵", category:"FLIRT", title:"Let your personality out slowly", desc:"Don't reveal everything immediately. Layers revealed over time keep someone engaged and returning. Mystery sustains attraction; transparency sometimes ends it.", impact:"🔥 High", timeframe:"Ongoing", color:H.FLIRT },
  { icon:"🌹", category:"FLIRT", title:"Appreciate something unique about them aloud", desc:"'Most people would never think to say something like that' said genuinely is worth more than ten 'you're amazings.' Unique appreciation is unforgettable.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"💫", category:"FLIRT", title:"Use future pacing in conversation", desc:"'Next time I'm in that neighborhood, you have to show me that place you mentioned' creates a shared future without pressure. Casual but intentional.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"😏", category:"FLIRT", title:"Recall something specific from earlier", desc:"Referencing something they said 20 minutes earlier in the conversation signals you truly listened. This is more seductive than any technique.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🎭", category:"FLIRT", title:"Don't react to everything — let things land", desc:"Not laughing at every joke, not responding immediately to every comment — creates a dynamic where your reactions become valued and sought.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"💬", category:"FLIRT", title:"Share something real — not surface level", desc:"Sharing a genuine opinion or a real experience — not the polished version — creates more intimacy than perfect answers ever will.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌙", category:"FLIRT", title:"Let chemistry build through restraint", desc:"The times you chose not to say the obvious thing, not to touch first, not to lean in first — restraint creates desire. Desire drives attraction.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🔑", category:"FLIRT", title:"Invite them into your world, don't enter theirs completely", desc:"Share your passions, your spaces, your friends. People want to enter a world they find fascinating, not someone who abandons theirs to join yours.", impact:"🔥 High", timeframe:"Ongoing", color:H.FLIRT },
  { icon:"🎯", category:"FLIRT", title:"Playfully challenge their opinions", desc:"'I'm not sure I agree with that' said with a smile is 10x more interesting than 'wow, totally.' Gentle disagreement shows you're thinking, not performing.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🔥", category:"FLIRT", title:"Touch increases comfort — use it progressively", desc:"Arm → shoulder → back. Each escalation should follow their comfort level. Never jump ahead. Progressive touch builds safety and desire simultaneously.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"😄", category:"FLIRT", title:"Laugh genuinely — don't force it", desc:"Forced laughs are immediately spotted and kill attraction. Real laughter is magnetic. If something's not funny, a polite smile is better than a fake laugh.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌊", category:"FLIRT", title:"Notice something others miss about them", desc:"'You do this thing where you light up when you talk about that' — noticing details others overlook creates a feeling of being truly seen.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"⚡", category:"FLIRT", title:"Be direct about your interest without desperation", desc:"'I'd like to see you again' said calmly and with eye contact is more attractive than 10 hints. Directness from confidence is profoundly attractive.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"💋", category:"FLIRT", title:"Lean in subtly when they speak", desc:"A barely perceptible lean forward communicates interest and makes your presence more intimate without breaking any social norms.", impact:"⚡ Medium", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🎵", category:"FLIRT", title:"Build verbal tension with pauses", desc:"Pausing mid-sentence before the key word — 'you're... honestly one of the more interesting people I've met here' — creates anticipation and impact.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌹", category:"FLIRT", title:"Ask questions that reveal their dreams", desc:"'If you could drop everything and do one thing for a year, what would it be?' creates intimacy and shows you're interested in who they really are.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🎯", category:"FLIRT", title:"Match and lead their emotional state", desc:"Start where they are emotionally, then gradually shift the energy. Moving someone from neutral to warm to attracted is a skill you can master.", impact:"🔥 High", timeframe:"Ongoing", color:H.FLIRT },
  { icon:"💫", category:"FLIRT", title:"Create a callback from a previous conversation", desc:"Referencing something they said in a previous interaction shows you think about them. It signals: 'you affected me even when you weren't there.'", impact:"🔥 High", timeframe:"Ongoing", color:H.FLIRT },
  { icon:"😏", category:"FLIRT", title:"Use the 'high-low-high' emotional arc", desc:"Start warm, introduce a moment of slight tension or teasing, then return to warmth + a genuine compliment. This arc creates the most intense chemistry.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌊", category:"FLIRT", title:"Be the still point in a busy room", desc:"While others scramble for attention, being calm, centered, and unhurried in a social setting draws people toward you like gravity.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🔥", category:"FLIRT", title:"Express appreciation without neediness", desc:"'That was genuinely a great conversation' vs. 'Please like me back.' The first comes from fullness. The second from lack. Fullness is magnetic.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"💬", category:"FLIRT", title:"Hold the frame — don't break first", desc:"When there's a moment of tension, who breaks it first has less power. Hold eye contact, hold the smile, hold the space. Let them fill the silence.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"✨", category:"FLIRT", title:"Give and withdraw attention in cycles", desc:"Full warm attention → slight distraction → return focus with even more warmth. This cycle creates an emotional pull that feels addictive to the recipient.", impact:"🔥 High", timeframe:"Ongoing", color:H.FLIRT },
  { icon:"🌙", category:"FLIRT", title:"Say 'interesting' when you disagree", desc:"'Interesting' said slowly is one of the most flirtatious responses to a provocative statement. It signals confidence and curiosity simultaneously.", impact:"⚡ Medium", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🎭", category:"FLIRT", title:"Use hypothetical scenarios for deeper flirting", desc:"'If we were both in [city] for the weekend, what would you drag me to see?' creates a shared imagined future and moves things forward playfully.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌹", category:"FLIRT", title:"Be fully present — not in your head", desc:"Thinking about what to say next while they're talking kills chemistry. Be in the conversation, not your evaluation of it. Presence is the most attractive state.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🔑", category:"FLIRT", title:"Have high standards and show them naturally", desc:"When you clearly have taste, preferences, and standards, your approval means something. And people want approval from those who don't give it easily.", impact:"🔥 High", timeframe:"Ongoing", color:H.FLIRT },
  { icon:"💫", category:"FLIRT", title:"Learn banter — the highest flirting art", desc:"Banter is rapid, playful back-and-forth that creates electricity. Study it in great films and conversations. It's trainable. It's the pinnacle of verbal attraction.", impact:"🔥 High", timeframe:"1 month", color:H.FLIRT },
  { icon:"⚡", category:"FLIRT", title:"Say their name softly right before a compliment", desc:"'[Name]...' [pause] 'you're really something.' The combination of their name, the pause, and the sincere delivery creates an unshakeably strong moment.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"😏", category:"FLIRT", title:"Use 'I have a feeling about you' with confidence", desc:"'I have a feeling you're exactly the kind of trouble I don't need but can't resist.' Bold, specific, unexpected. It creates fascination instantly.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🎯", category:"FLIRT", title:"Drop a compliment then walk away", desc:"Say something genuine and flattering, then naturally transition to another conversation or person. Not running — just confident. The memory lingers far longer.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🔥", category:"FLIRT", title:"Match their energy — but always be slightly cooler", desc:"If they're at a 7 excitement level, be at a 6. This slight restraint makes your moments of full engagement feel like a reward they had to earn.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"💬", category:"FLIRT", title:"Narrate what's happening authentically", desc:"'This is a really good conversation' said naturally mid-conversation is bold, real, and noticed. Most people never say the obvious true thing.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌊", category:"FLIRT", title:"Don't qualify yourself unnecessarily", desc:"Saying 'I know this might sound weird but...' undermines everything that follows. Say the thing. Trust that it's worth saying. Confidence is unedited.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌹", category:"FLIRT", title:"Smile at them from across the room first", desc:"A slow, genuine smile from a distance before you've even spoken sets the entire tone of an interaction before it begins. Use it strategically.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🎵", category:"FLIRT", title:"Lower your voice, not raise it, to get attention", desc:"Speaking slightly softer forces people to lean in and pay closer attention. It creates intimacy and draws people into your space.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌙", category:"FLIRT", title:"Know when to stop flirting and just connect", desc:"The best flirts know when to drop the game and be real. Transitioning from flirting to genuine connection is what takes someone from interested to captivated.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"😄", category:"FLIRT", title:"Be self-aware about your flirting", desc:"Playful meta-awareness — 'I just realized I'm completely flirting with you' said with a grin — is disarming, confident, and impossibly attractive.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🎯", category:"FLIRT", title:"React to what they actually said", desc:"Most people wait for their turn to speak. Actually reacting — in your expression, your posture, your words — to the specific thing they said is rare and irresistible.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"⚡", category:"FLIRT", title:"Invoke the imagination with half-sentences", desc:"'You know... never mind.' They will ask. 'What?' Now they're chasing you. Use selectively. Overuse kills it.", impact:"⚡ Medium", timeframe:"Immediate", color:H.FLIRT },
  { icon:"💫", category:"FLIRT", title:"Be the best version of yourself in that moment", desc:"Forget every technique. The most attractive thing you can be is your most relaxed, present, genuinely interested and interesting self. That's the foundation.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🔥", category:"FLIRT", title:"Avoid lines — use observations instead", desc:"'That book in your bag — have you finished it yet?' is infinitely better than any pick-up line. Observations feel organic; lines feel rehearsed.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌸", category:"FLIRT", title:"Appreciate the details others rush past", desc:"Noticing and mentioning a unique detail — a book, a subtle gesture, an interesting reaction — signals you're operating at a deeper level than most.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🎭", category:"FLIRT", title:"The 'you remind me of...' technique", desc:"'You remind me of someone I used to really admire' — but don't finish it. When they ask who, the answer (whether real or creative) can be powerfully flirtatious.", impact:"⚡ Medium", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌹", category:"FLIRT", title:"Test the water with light compliments first", desc:"Start with a safe, clear compliment. If they receive it well, escalate. If they seem uncomfortable, redirect. Reading responses is the key skill.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"😏", category:"FLIRT", title:"Use the word 'dangerous' strategically", desc:"'This conversation is getting dangerous' or 'you're dangerously good at this' frames the interaction as something with stakes — exciting and attractive.", impact:"⚡ Medium", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌊", category:"FLIRT", title:"Share your real opinion on polarizing things", desc:"Saying 'I actually don't like [popular thing]' when it's true — without apologizing — is more attractive than pretending to share every interest.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"💬", category:"FLIRT", title:"Appreciate uniqueness aloud and often", desc:"Pointing out what makes someone uniquely themselves, specifically, is the most flattering thing you can do. Generic praise is forgotten. Specific praise isn't.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🔑", category:"FLIRT", title:"Walk away at a high point at least once", desc:"Exiting a conversation or a space confidently, at a high emotional point, and returning later with warm familiarity creates powerful draw.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌙", category:"FLIRT", title:"Master the meaningful glance", desc:"The look that says 'I see you and I'm interested' — held just half a second longer than polite — communicates everything a paragraph of text never could.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🎵", category:"FLIRT", title:"Never flirt harder than you mean it", desc:"Flirting creates expectations. If you flirt intensely with no intention to follow through, you damage trust and reputation. Mean what you signal.", impact:"🔥 High", timeframe:"Ongoing", color:H.FLIRT },
  { icon:"💫", category:"FLIRT", title:"Be warm with everyone but special with them", desc:"Treating everyone with warmth but giving them one additional layer of your attention makes them feel uniquely chosen — without feeling entitled to it.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🔥", category:"FLIRT", title:"Create the story of 'us' early", desc:"Narrate the meeting as it unfolds: 'So this is how we met...' said with a grin while the conversation is still happening creates a shared mythology.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"😄", category:"FLIRT", title:"Never force chemistry — recognize when it's there", desc:"Chemistry is a mutual feeling, not a performance. If it's there, lean in. If it's not, no amount of technique creates it. Know the difference.", impact:"🔥 High", timeframe:"Ongoing", color:H.FLIRT },
  { icon:"🌹", category:"FLIRT", title:"Ask 'what made you smile today?' early", desc:"This question is warm, unusual, and requires them to access something real. Their answer tells you something true and creates immediate connection.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🎯", category:"FLIRT", title:"Know your opening line for every scenario", desc:"Prepared, natural-feeling lines for bars, cafes, bookstores, and gyms. Preparation doesn't feel rehearsed when it fits the moment perfectly.", impact:"⚡ Medium", timeframe:"1 week", color:H.FLIRT },
  { icon:"⚡", category:"FLIRT", title:"Use silence as a communication tool", desc:"After saying something flirtatious, let silence sit. Don't fill it. The silence amplifies the impact and forces them to respond from their own feeling.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"🌊", category:"FLIRT", title:"Be kind to everyone around you", desc:"How you treat waiters, friends, and strangers while flirting with someone tells them more about your character than anything you say to them directly.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"💬", category:"FLIRT", title:"Know when you've done enough", desc:"Knowing when to stop flirting and let things breathe is a skill. Over-flirting becomes exhausting. The right amount leaves them wanting more.", impact:"🔥 High", timeframe:"Immediate", color:H.FLIRT },
  { icon:"😏", category:"FLIRT", title:"Flirt with your eyes before anything else", desc:"Before you say a word, your eyes can communicate warmth, interest, and playfulness. Master your eye expression and you have flirted before speaking.", impact:"🔥 High", timeframe:"Ongoing", color:H.FLIRT },

  // ══════════ MAKEOUT (100 tips) ══════════
  { icon:"💋", category:"MAKEOUT", title:"Build anticipation before you kiss", desc:"The moment just before a kiss is as powerful as the kiss itself. Slow down. Make eye contact. Let the space between you charge. Don't rush it.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"😮", category:"MAKEOUT", title:"Start slow — always start slow", desc:"The biggest mistake is going too fast too soon. A slow, intentional first kiss communicates confidence and control. Speed comes with comfort.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"👐", category:"MAKEOUT", title:"Use your hands expressively", desc:"Hands on the face, neck, or waist transform a kiss from mechanical to intimate. The right touch at the right moment elevates everything.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"👁️", category:"MAKEOUT", title:"Make eye contact right before the kiss", desc:"Holding eye contact and moving slightly closer — without speaking — creates the most charged pre-kiss moment possible. Don't look at their lips yet.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"💬", category:"MAKEOUT", title:"Ask or signal clearly — never assume", desc:"'Can I kiss you?' said softly is confident and respectful. Or move slowly enough that they have every chance to lean in or pull back. Always read consent.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🌬️", category:"MAKEOUT", title:"Fresh breath is non-negotiable", desc:"Keep mints, gum, or a breath spray with you always. Nothing kills the moment faster than bad breath. It's the most basic preparation and the most important.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"💋", category:"MAKEOUT", title:"Vary the pressure — soft and firm", desc:"Alternating between very soft kisses and slightly firmer ones creates sensation and keeps the other person engaged. Monotone kissing becomes forgettable.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🖐️", category:"MAKEOUT", title:"Cup their face gently", desc:"One or both hands gently on the sides of the face during a kiss is one of the most intimate gestures that exists. It communicates care and desire together.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🌊", category:"MAKEOUT", title:"Kiss the neck — it's electric", desc:"The neck is one of the most sensitive areas. A slow kiss, or even a breath on the neck, creates intense physical response. Approach it gradually.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"💤", category:"MAKEOUT", title:"Don't just use your lips — use your breath too", desc:"A warm exhale near the ear or the neck before contact creates anticipation that the touch itself can't always match. Use breath intentionally.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🤫", category:"MAKEOUT", title:"Pull back slightly at the best moment", desc:"Pulling back slightly right when things are building — then returning — creates desire. Absence of touch makes the return of it more powerful.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🌹", category:"MAKEOUT", title:"Keep your lips soft — always", desc:"Use lip balm before any encounter where physical closeness is possible. Dry, chapped lips are a tactile turn-off. Soft lips are the baseline standard.", impact:"🔥 High", timeframe:"Daily", color:H.MAKEOUT },
  { icon:"👀", category:"MAKEOUT", title:"Open your eyes occasionally during a kiss", desc:"Briefly opening your eyes during a passionate moment to look at them — then closing again — communicates that you are fully present and aware of them.", impact:"⚡ Medium", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🎯", category:"MAKEOUT", title:"Pay attention to their cues and respond", desc:"If they pull back, slow down. If they lean in, match it. If they're passive, be slightly more present. Reading and responding to cues is the highest kissing skill.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"💫", category:"MAKEOUT", title:"Smile between kisses", desc:"A small, genuine smile between kisses communicates pleasure and makes the moment feel warm rather than just physical. This smile is deeply intimate.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🌙", category:"MAKEOUT", title:"Break the kiss briefly to say something", desc:"Pulling back, looking at them, and saying something quiet and warm — 'you have no idea...' — before returning to kissing creates an unforgettable peak moment.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🤲", category:"MAKEOUT", title:"Touch hair gently during kissing", desc:"Running fingers through hair or gently holding the back of the head communicates deep engagement and physical presence. Do it naturally and unhurriedly.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"💬", category:"MAKEOUT", title:"Breathe normally — don't hold your breath", desc:"Holding your breath creates tension. Natural, slightly slower breathing keeps you calm, present, and communicates that you're comfortable in the moment.", impact:"⚡ Medium", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🌸", category:"MAKEOUT", title:"Kiss the jawline and cheek first", desc:"Starting with the jawline or cheek — especially on a first kiss — creates anticipation for the lips without pressure. It's intimate but not demanding.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🔥", category:"MAKEOUT", title:"Vary your pace — build, then slow down", desc:"Kissing more intensely then deliberately slowing down creates a wave of sensation. The slow-down is as powerful as the build-up.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"💡", category:"MAKEOUT", title:"Create the right environment first", desc:"Low light, privacy, physical proximity on a couch or at a table creates context where a kiss feels natural rather than sudden or forced.", impact:"🔥 High", timeframe:"1 date", color:H.MAKEOUT },
  { icon:"🌊", category:"MAKEOUT", title:"Let them lead sometimes", desc:"Not always initiating — sometimes waiting and letting them close the gap — creates powerful moments where desire is proven without words.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"✨", category:"MAKEOUT", title:"Use touch to communicate between kisses", desc:"A hand gently on the waist, or fingertips on their arm between kisses maintains the physical connection and communicates continued interest.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🎵", category:"MAKEOUT", title:"Sound matters — music creates atmosphere", desc:"The right music playing in the background softens awareness and creates a bubble that the moment lives inside. Have a playlist ready.", impact:"⚡ Medium", timeframe:"1 day", color:H.MAKEOUT },
  { icon:"🧴", category:"MAKEOUT", title:"Skin should be soft and scented", desc:"Moisturized skin on hands, face, and neck makes physical closeness more pleasant. Combined with a light cologne, it creates a complete sensory experience.", impact:"🔥 High", timeframe:"Daily", color:H.MAKEOUT },
  { icon:"🤫", category:"MAKEOUT", title:"Whisper between kisses", desc:"Something said just above a whisper between kisses — even something simple — creates intimate space that makes the moment feel private and meaningful.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"💋", category:"MAKEOUT", title:"Light biting of the lower lip — if welcomed", desc:"A very light, gentle pull of the lower lip signals intensity without aggression. Always start more gently than you think you need to. Read their response.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🌹", category:"MAKEOUT", title:"The forehead kiss communicates safety", desc:"A gentle kiss on the forehead before, between, or after kissing on the lips communicates tenderness and respect. It's an incredibly powerful emotional gesture.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🎯", category:"MAKEOUT", title:"Don't over-tongue — less is far more", desc:"Tongue should enter slowly, briefly, and read their response before continuing. Aggressive tongue use is the most common kissing mistake men make.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🌙", category:"MAKEOUT", title:"After the first kiss, pause and look at them", desc:"After the first kiss, pull back slightly, keep your face close, and look at them for just a moment before smiling. This creates an unforgettable pause.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🔑", category:"MAKEOUT", title:"Smell incredible — always", desc:"Scent triggers memory and emotion more powerfully than any other sense. A cologne that lingers on skin creates an association between your presence and pleasure.", impact:"🔥 High", timeframe:"Daily", color:H.MAKEOUT },
  { icon:"🌸", category:"MAKEOUT", title:"Behind the ear is unforgettable", desc:"A slow kiss or gentle breath behind the ear creates a reaction most people have never expected. Approach it only when physical intimacy is clearly mutual.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"💬", category:"MAKEOUT", title:"Don't narrate — feel", desc:"Thinking about technique while kissing kills the experience. Let the planning happen beforehand; in the moment, be fully sensory and present.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"💫", category:"MAKEOUT", title:"Read their whole body, not just their words", desc:"Leaning in, parted lips, sustained eye contact, proximity — all communicate readiness before words do. Becoming fluent in body language changes everything.", impact:"🔥 High", timeframe:"Ongoing", color:H.MAKEOUT },
  { icon:"🎭", category:"MAKEOUT", title:"Don't apologize for kissing them", desc:"'Sorry, I just had to do that' undermines the moment. A confident first kiss needs no apology. Own it with a calm expression and hold their gaze.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🌊", category:"MAKEOUT", title:"Gentle pressure on the waist signals intent", desc:"A gentle, warm hand on the waist communicates physical interest clearly and respectfully. It creates closeness without presumption.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🔥", category:"MAKEOUT", title:"Transition between soft and passionate", desc:"The best makeouts have both: tender, soft moments AND more passionate ones. Alternating these creates an emotional range that's deeply impactful.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"😏", category:"MAKEOUT", title:"Tug gently on their collar or fabric briefly", desc:"A brief, light touch on a collar, lapel, or fabric is an extremely flirtatious physical gesture that creates closeness without being aggressive.", impact:"⚡ Medium", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"👁️", category:"MAKEOUT", title:"The 'almost kiss' creates maximum tension", desc:"Move close enough that you could kiss them — then don't. Let the moment hang. This tension, if they don't close the gap, tells you everything you need to know.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"💋", category:"MAKEOUT", title:"Groom for contact — always be ready", desc:"Moisturized lips, fresh breath, clean hands, good scent — these are the daily preparations that mean you're never caught off guard when the moment arrives.", impact:"🔥 High", timeframe:"Daily", color:H.MAKEOUT },
  { icon:"🌙", category:"MAKEOUT", title:"Create a moment of stillness first", desc:"Before initiating a kiss, creating a brief moment of stillness — pausing in conversation, looking at them, slowing down — sets the scene.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🌹", category:"MAKEOUT", title:"The back of the hand kiss is underrated", desc:"Lifting their hand and kissing the back of it is old-fashioned, elegant, and powerfully romantic when done with sincerity and eye contact.", impact:"⚡ Medium", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🎵", category:"MAKEOUT", title:"Touch their collarbone or shoulder area slowly", desc:"The collarbone is a deeply attractive area. A slow hand moving from their shoulder toward it creates intense physical awareness without crossing any line.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"⚡", category:"MAKEOUT", title:"Know the signs they want to be kissed", desc:"Parted lips, sustained eye contact, leaning in, playing with hair, or touching their own lips while listening — recognize these. They're unmistakable.", impact:"🔥 High", timeframe:"Ongoing", color:H.MAKEOUT },
  { icon:"🌸", category:"MAKEOUT", title:"Move at 90% — let them close the final 10%", desc:"Move 90% of the way toward a kiss, then stop. This gives them agency and guarantees mutual desire. If they don't close the gap, you haven't overstepped.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"💬", category:"MAKEOUT", title:"Express what you're feeling in the moment", desc:"Saying 'you make this really hard to focus' or 'I keep wanting to kiss you' mid-conversation is bold, honest, and creates instant electric tension.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🤲", category:"MAKEOUT", title:"Place your hand on their knee briefly", desc:"A gentle, brief touch on the knee during conversation communicates physical interest clearly while remaining fully appropriate. Watch their response — it tells you everything.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🌊", category:"MAKEOUT", title:"Initiate after a shared laugh", desc:"The moment of shared genuine laughter is one of the best times to initiate — the warmth and connection are already at their peak. Seize that moment.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"🔥", category:"MAKEOUT", title:"Always stop before they want you to", desc:"Ending an intimate moment first — especially when things are good — leaves them wanting to return to it. Leaving at the peak creates desire.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },
  { icon:"💫", category:"MAKEOUT", title:"A long hug builds as much as a kiss", desc:"A hug held 5-10 seconds longer than expected — with genuine warmth — creates a moment of physical closeness that can be even more affecting than a kiss.", impact:"🔥 High", timeframe:"Immediate", color:H.MAKEOUT },

  // ══════════ VOICE (60 tips) ══════════
  { icon:"🎙️", category:"VOICE", title:"Speak from your diaphragm, not your throat", desc:"A chest/diaphragm voice is naturally deeper, carries further, and sounds confident. Your throat voice sounds thin, tense, and often nasally. Train the diaphragm.", impact:"🔥 High", timeframe:"4 weeks", color:H.VOICE },
  { icon:"🐢", category:"VOICE", title:"Slow down your speech rate", desc:"Most people speak 10-30% too fast when nervous. Deliberately slow down. Slower speech = more confident, more authoritative, more attractive.", impact:"🔥 High", timeframe:"2 weeks", color:H.VOICE },
  { icon:"🎚️", category:"VOICE", title:"Record yourself and review weekly", desc:"You don't know how you actually sound until you record it. Most people are shocked. Listening back weekly reveals exactly what needs to improve.", impact:"🔥 High", timeframe:"1 week", color:H.VOICE },
  { icon:"🧘", category:"VOICE", title:"Relax your jaw and throat before speaking", desc:"A tense jaw and tight throat restrict resonance and make your voice higher. Jaw rolls and throat humming for 2 minutes warm up the voice instantly.", impact:"⚡ Medium", timeframe:"1 week", color:H.VOICE },
  { icon:"💬", category:"VOICE", title:"Pause before answering — always", desc:"A 1-2 second pause before responding makes every answer sound more considered and confident. Rushing answers signals reactivity; pausing signals control.", impact:"🔥 High", timeframe:"Immediate", color:H.VOICE },
  { icon:"🎵", category:"VOICE", title:"Develop your vocal range with humming", desc:"Humming at different pitches daily for 5 minutes stretches vocal range, warms the cords, and naturally deepens your speaking voice over weeks.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.VOICE },
  { icon:"🗣️", category:"VOICE", title:"Don't upspeak — end statements downward", desc:"Uptalk (ending statements as questions?) undermines confidence and sounds uncertain. Statements should end with a descending tone. Practice this daily.", impact:"🔥 High", timeframe:"2 weeks", color:H.VOICE },
  { icon:"💧", category:"VOICE", title:"Stay hydrated — drink water constantly", desc:"Dehydration dries the vocal cords and raises the pitch of your voice. Drinking 3L of water daily is one of the simplest voice improvements available.", impact:"⚡ Medium", timeframe:"3 days", color:H.VOICE },
  { icon:"🌬️", category:"VOICE", title:"Breathe deeply before speaking in important moments", desc:"A deep belly breath before speaking drops your pitch, calms nerves, and delivers oxygen that makes your voice resonant rather than tight.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.VOICE },
  { icon:"🎯", category:"VOICE", title:"Master the dramatic pause", desc:"The pause before a key word or after a punchline gives it weight. 'The reason I did it was...' [pause] '...exactly what you think.' is powerful.", impact:"🔥 High", timeframe:"2 weeks", color:H.VOICE },
  { icon:"📢", category:"VOICE", title:"Project your voice — don't shout", desc:"Projection uses breath support to carry your voice without straining. It's different from shouting. Practice in larger spaces until it becomes default.", impact:"🔥 High", timeframe:"3 weeks", color:H.VOICE },
  { icon:"🎙️", category:"VOICE", title:"Use vocal variety — avoid monotone", desc:"A monotone voice is the fastest way to lose an audience's attention. Vary your pitch, speed, and volume deliberately. Variation creates emotional impact.", impact:"🔥 High", timeframe:"3 weeks", color:H.VOICE },
  { icon:"🐝", category:"VOICE", title:"Reduce filler words (um, uh, like, so)", desc:"Replace filler words with silence. Record yourself in a conversation and count fillers. Awareness + deliberate pausing eliminates them within 2-3 weeks.", impact:"🔥 High", timeframe:"3 weeks", color:H.VOICE },
  { icon:"🎭", category:"VOICE", title:"Read aloud for 15 minutes daily", desc:"Reading aloud practices articulation, pacing, and expressiveness. It builds the neural pathways for fluid, confident spoken communication.", impact:"🔥 High", timeframe:"3 weeks", color:H.VOICE },
  { icon:"🎵", category:"VOICE", title:"Sing in the shower — it's free voice training", desc:"Singing trains your ear, expands vocal range, improves breathing, and warms the cords. Daily singing in any form makes your speaking voice noticeably better.", impact:"⚡ Medium", timeframe:"4 weeks", color:H.VOICE },
  { icon:"🌡️", category:"VOICE", title:"Avoid cold drinks before important conversations", desc:"Cold drinks tighten vocal cord muscles and raise your pitch temporarily. Have room-temperature or warm water before interviews, dates, or presentations.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.VOICE },
  { icon:"🧘", category:"VOICE", title:"Practice belly breathing exclusively", desc:"Place a hand on your belly and breathe so the belly moves, not your chest. This diaphragmatic breathing is what powers a resonant, deep, stable voice.", impact:"🔥 High", timeframe:"3 weeks", color:H.VOICE },
  { icon:"🎯", category:"VOICE", title:"Use the 'news anchor' cadence", desc:"News anchors speak slowly, clearly, and with confident downward inflections. Copy this pattern by watching and practicing specific anchors you admire.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.VOICE },
  { icon:"🗣️", category:"VOICE", title:"Enunciate clearly — don't mumble", desc:"Clear articulation signals intelligence and confidence. Practice tongue twisters daily. Over-enunciating in practice creates clear natural speech.", impact:"🔥 High", timeframe:"2 weeks", color:H.VOICE },
  { icon:"💬", category:"VOICE", title:"Lower your volume slightly in key moments", desc:"Counter-intuitively, speaking slightly softer at key moments forces listeners to pay closer attention and gives your words greater weight.", impact:"🔥 High", timeframe:"Immediate", color:H.VOICE },
  { icon:"🎙️", category:"VOICE", title:"Match your voice to the emotional content", desc:"A story about loss should sound different than a story about triumph. Let your voice reflect what you're communicating. Emotional authenticity is magnetic.", impact:"🔥 High", timeframe:"Ongoing", color:H.VOICE },
  { icon:"🌬️", category:"VOICE", title:"Don't clear your throat constantly", desc:"Habitual throat clearing irritates and dries vocal cords. Sip water instead. Throat clearing is also a nervous habit that projects anxiety.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.VOICE },
  { icon:"🎵", category:"VOICE", title:"Try voice training apps for 10 mins daily", desc:"Apps like Vocal Image, Voice Training Pro, or even YouTube tutorials provide structured daily training that compresses months of improvement into weeks.", impact:"🔥 High", timeframe:"4 weeks", color:H.VOICE },
  { icon:"🐢", category:"VOICE", title:"Speak 20% slower than feels natural", desc:"In normal conversation, speaking at 80% of your comfortable pace sounds confident and deliberate to others — while feeling strange to you. Trust the adjustment.", impact:"🔥 High", timeframe:"2 weeks", color:H.VOICE },
  { icon:"💬", category:"VOICE", title:"Learn to fill silence comfortably", desc:"The ability to sit in conversational silence without rushing to fill it is a marker of deep confidence. Train it by letting silences last 1-2 seconds longer.", impact:"🔥 High", timeframe:"2 weeks", color:H.VOICE },
  { icon:"🎯", category:"VOICE", title:"Articulate the last word of each sentence", desc:"People often trail off at sentence endings, making them sound unsure. Fully enunciate the last word of every sentence to communicate certainty.", impact:"⚡ Medium", timeframe:"1 week", color:H.VOICE },
  { icon:"🎭", category:"VOICE", title:"Take a public speaking class", desc:"The single fastest investment in your voice and communication. Toastmasters, public speaking courses, or improv theater compress years of social growth.", impact:"🔥 High", timeframe:"2 months", color:H.VOICE },
  { icon:"🗣️", category:"VOICE", title:"Avoid vocal fry — especially at sentence ends", desc:"Vocal fry (that creaky, guttural quality) at the end of sentences signals low energy. It became trendy but reads as unconfident in direct conversation.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.VOICE },
  { icon:"🌊", category:"VOICE", title:"Your voice conveys more than your words", desc:"55% of communication is body language, 38% is voice tone and pace, 7% is actual words. Master the 93% first, then worry about word choice.", impact:"🔥 High", timeframe:"Ongoing", color:H.VOICE },
  { icon:"💡", category:"VOICE", title:"Speak with intention — not to fill space", desc:"Every sentence should have a reason for being said. Confident communicators say less but each word has weight. Practice eliminating unnecessary sentences.", impact:"🔥 High", timeframe:"2 weeks", color:H.VOICE },

  // ══════════ BODY LANGUAGE (80 tips) ══════════
  { icon:"🧍", category:"BODY", title:"Take up space intentionally", desc:"Confident people don't shrink. Stand with feet shoulder-width apart. Don't cross your legs when sitting. Let your arms rest naturally wide. Own your space.", impact:"🔥 High", timeframe:"Immediate", color:H.BODY },
  { icon:"💪", category:"BODY", title:"Never cross your arms in social situations", desc:"Crossed arms signal defensiveness and discomfort. In flirting and dating situations, open arms are subconsciously read as openness and warmth.", impact:"🔥 High", timeframe:"Immediate", color:H.BODY },
  { icon:"🎯", category:"BODY", title:"Point your feet toward who you're interested in", desc:"Feet point toward what the body finds interesting. Pointing yours toward someone signals genuine interest before you've said a word.", impact:"⚡ Medium", timeframe:"Immediate", color:H.BODY },
  { icon:"🐢", category:"BODY", title:"Move slowly and deliberately", desc:"Fast movements signal nervousness and reactivity. Slow, deliberate movements signal calmness, control, and confidence. Practice slowing down all physical movement by 20%.", impact:"🔥 High", timeframe:"2 weeks", color:H.BODY },
  { icon:"🌊", category:"BODY", title:"Don't fidget — ground yourself", desc:"Fidgeting (touching your face, bouncing your leg, fixing your hair constantly) signals anxiety. Plant your feet. Let your hands rest. Be still.", impact:"🔥 High", timeframe:"2 weeks", color:H.BODY },
  { icon:"👑", category:"BODY", title:"Walk as if you own the room", desc:"Slow pace, eye level raised, chest open, slight smile. This walk, practiced daily, becomes your natural state. It changes how rooms respond to your entrance.", impact:"🔥 High", timeframe:"2 weeks", color:H.BODY },
  { icon:"🤝", category:"BODY", title:"Face people with your full body, not just your face", desc:"Turning your full body toward someone in conversation communicates full attention. Angling away signals partial engagement — always noticed, rarely said.", impact:"🔥 High", timeframe:"Immediate", color:H.BODY },
  { icon:"💋", category:"BODY", title:"Slow your blink rate during intense conversations", desc:"Frequent blinking signals nervousness. A slow, comfortable blink rate signals ease. Practice in front of a mirror until it becomes your natural setting.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.BODY },
  { icon:"🌹", category:"BODY", title:"Mirror their gestures with a 4-second delay", desc:"Mirroring body language with a slight delay creates subconscious rapport. Immediate mirroring looks like mockery. The delay makes it feel organic.", impact:"🔥 High", timeframe:"1 week", color:H.BODY },
  { icon:"🎵", category:"BODY", title:"Let your head tilt slightly when listening", desc:"A slight head tilt signals genuine listening and curiosity. It's one of the most universally readable signals of engagement and warmth.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.BODY },
  { icon:"🏆", category:"BODY", title:"Keep your chin parallel to the floor", desc:"Looking down drops your chin and creates a submissive impression. Head too high reads as arrogant. Chin level = confident. Practice this constantly.", impact:"🔥 High", timeframe:"1 week", color:H.BODY },
  { icon:"🔑", category:"BODY", title:"Gesture naturally — don't over-gesticulate", desc:"Natural hand gestures add color to speech. Wild, excessive gesturing is distracting. Contained, purposeful gestures near the torso are the goal.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.BODY },
  { icon:"🌊", category:"BODY", title:"Don't touch your face while speaking", desc:"Face-touching (nose, mouth, eyes) is associated with dishonesty and nervousness. Train yourself out of it by keeping hands on your lap or in front of you.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.BODY },
  { icon:"🏃", category:"BODY", title:"Enter rooms with intention, not apology", desc:"How you enter a room sets the tone for how you're perceived. Walk in fully, make brief eye contact with the room, find your position. Don't slide in.", impact:"🔥 High", timeframe:"Immediate", color:H.BODY },
  { icon:"💡", category:"BODY", title:"Sit with your back against the chair, not hunched", desc:"Slouching in a chair reads as disengaged or low energy. Back against the chair, sitting forward slightly for conversation, signals presence and engagement.", impact:"⚡ Medium", timeframe:"Immediate", color:H.BODY },
  { icon:"🎯", category:"BODY", title:"Maintain an open palm when gesturing", desc:"Open palms signal honesty and openness. Closed fists or pointing fingers create tension. Hand gestures with open palms are universally more trusted.", impact:"⚡ Medium", timeframe:"1 week", color:H.BODY },
  { icon:"😏", category:"BODY", title:"The confident lean-back", desc:"Leaning very slightly back while someone else is speaking — rather than leaning eagerly forward — signals ease and confidence without seeming disinterested.", impact:"🔥 High", timeframe:"Immediate", color:H.BODY },
  { icon:"🌙", category:"BODY", title:"Smile with your whole face", desc:"A smile that only moves the lips reads as forced. Engage your eyes, your cheeks, the slight crinkling at the corners. Full-face smiles communicate genuine warmth.", impact:"🔥 High", timeframe:"1 week", color:H.BODY },
  { icon:"🎭", category:"BODY", title:"Don't nod constantly while listening", desc:"Excessive nodding reads as anxious agreement-seeking. Nod once, meaningfully, to acknowledge key points. Let the rest of your attention be expressed through stillness.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.BODY },
  { icon:"🔥", category:"BODY", title:"Use the 'steeple' gesture when making a point", desc:"Fingers steepled (fingertips touching, hands apart) while speaking is associated with authority and expertise. CEOs and experts do this instinctively.", impact:"⚡ Medium", timeframe:"1 week", color:H.BODY },
  { icon:"🌊", category:"BODY", title:"Breathe visibly — don't hold your breath", desc:"Visible, relaxed breathing signals ease. Shallow, held breath creates visible tension. Breathe slowly and let it show — it communicates complete comfort.", impact:"⚡ Medium", timeframe:"Immediate", color:H.BODY },
  { icon:"👁️", category:"BODY", title:"Look where you're going, not at the ground", desc:"Walking while looking at the ground signals low confidence. Eyes forward, head level, taking in the environment. This simple change transforms presence.", impact:"🔥 High", timeframe:"Immediate", color:H.BODY },
  { icon:"🎯", category:"BODY", title:"Initiate touch naturally — arm before shoulder", desc:"A natural touch progression: forearm → shoulder → back → waist. Start at the safest point and move only when comfort is clear. Touch creates closeness.", impact:"🔥 High", timeframe:"Ongoing", color:H.BODY },
  { icon:"🌹", category:"BODY", title:"Don't over-smile or under-smile", desc:"Smiling at everything reads as nervous. Never smiling reads as cold. Calibrated smiling — genuine, earned, specific — is the most attractive expression.", impact:"🔥 High", timeframe:"2 weeks", color:H.BODY },
  { icon:"💬", category:"BODY", title:"Face the group when in social settings", desc:"Angling outward (away from the group) in social settings is an open signal to others that you're available for conversation. Close body orientations exclude others.", impact:"⚡ Medium", timeframe:"Immediate", color:H.BODY },
  { icon:"🏆", category:"BODY", title:"Control your reaction speed", desc:"People with high social status react to events slowly and calmly. Jumping at loud sounds or overreacting to small events signals low status. Train your reaction.", impact:"⚡ Medium", timeframe:"1 month", color:H.BODY },
  { icon:"🌙", category:"BODY", title:"Lead with your handshake — don't wait", desc:"Extending your hand first in a meeting communicates confidence and warmth. Waiting to be offered a handshake signals passive, reactive energy.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.BODY },
  { icon:"🎵", category:"BODY", title:"Use proximity to create intimacy", desc:"Gradually closing physical distance (within appropriate context) as a conversation progresses mirrors emotional closeness. Physical and emotional proximity track together.", impact:"🔥 High", timeframe:"Immediate", color:H.BODY },
  { icon:"💪", category:"BODY", title:"Practice your posture in every queue", desc:"Every time you wait in line, stand fully upright, shoulders back. This turns dead time into posture training. After 4 weeks, it becomes your baseline.", impact:"🔥 High", timeframe:"4 weeks", color:H.BODY },
  { icon:"🌊", category:"BODY", title:"Let your resting face be neutral, not tense", desc:"Resting tension in the face (furrowed brow, tight jaw, forced serious expression) reads as stress or unfriendliness. Practice a soft, neutral resting face.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.BODY },
  { icon:"🎯", category:"BODY", title:"Be the last to break a handshake", desc:"Holding a handshake for the same duration as the other person — or a fraction longer — signals equal or slightly higher status. Don't pull away first.", impact:"⚡ Medium", timeframe:"Immediate", color:H.BODY },
  { icon:"🔥", category:"BODY", title:"Master the subtraction of gestures", desc:"The most powerful body language often involves doing less, not more. Removing excess movement, reducing reactive gestures, being economical — this reads as power.", impact:"🔥 High", timeframe:"1 month", color:H.BODY },
  { icon:"💫", category:"BODY", title:"Your body language on your phone matters", desc:"Hunching over your phone looks bad wherever you are. Hold it higher, sit up while using it. You're being seen even when you think you're not.", impact:"⚡ Medium", timeframe:"Ongoing", color:H.BODY },

  // ══════════ FRAGRANCE (50 tips) ══════════
  { icon:"🌹", category:"FRAGRANCE", title:"Apply cologne to pulse points only", desc:"Neck, wrists, inner elbow, chest. These are where blood vessels are close to the skin, generating heat that amplifies and broadcasts the scent.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.FRAGRANCE },
  { icon:"🧴", category:"FRAGRANCE", title:"Moisturize before applying cologne", desc:"Unscented lotion applied 2-3 minutes before cologne creates a base that holds fragrance 3-4x longer than dry skin. This single step doubles longevity.", impact:"🔥 High", timeframe:"Immediate", color:H.FRAGRANCE },
  { icon:"🚿", category:"FRAGRANCE", title:"Apply cologne right after a shower", desc:"The warm, hydrated, open pores after a shower absorb fragrance much more effectively than dry skin. Apply within 2 minutes of drying off.", impact:"⚡ Medium", timeframe:"Immediate", color:H.FRAGRANCE },
  { icon:"🎯", category:"FRAGRANCE", title:"Never spray cologne on clothes", desc:"Fabric doesn't project scent the way skin does, and the fragrance can stain or degrade the fabric. Always spray on skin, never on clothing.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.FRAGRANCE },
  { icon:"💦", category:"FRAGRANCE", title:"Don't rub your wrists together after spraying", desc:"Rubbing breaks down the fragrance molecules and damages the top notes — the first impression of the scent. Spray and let it dry naturally.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.FRAGRANCE },
  { icon:"🌿", category:"FRAGRANCE", title:"Less is more — 2-3 sprays maximum", desc:"Over-applying cologne is far worse than under-applying. Others should detect your fragrance within arm's reach, not across the room. 2-3 sprays is always enough.", impact:"🔥 High", timeframe:"Immediate", color:H.FRAGRANCE },
  { icon:"🗓️", category:"FRAGRANCE", title:"Build a fragrance wardrobe by season", desc:"Fresh and aquatic for summer. Woody and spicy for autumn and winter. Floral and green for spring. Matching fragrance to season is a mark of sophistication.", impact:"⚡ Medium", timeframe:"Ongoing", color:H.FRAGRANCE },
  { icon:"🌙", category:"FRAGRANCE", title:"Have a date night signature scent", desc:"Wearing the same scent consistently on dates means they begin to associate that specific smell with you and with positive feelings. Scent anchoring is real.", impact:"🔥 High", timeframe:"Ongoing", color:H.FRAGRANCE },
  { icon:"☀️", category:"FRAGRANCE", title:"Use a lighter fragrance during the day", desc:"Heavy orientals and smoky scents are overpowering in daytime, especially indoors. Save them for evenings. Fresh, clean, or citrus scents work better for day.", impact:"⚡ Medium", timeframe:"Immediate", color:H.FRAGRANCE },
  { icon:"🎁", category:"FRAGRANCE", title:"Test fragrance on skin, not paper strips", desc:"Fragrance smells completely different on paper versus your skin chemistry. Always test on your wrist, wait 15 minutes, and judge it then.", impact:"🔥 High", timeframe:"1 day", color:H.FRAGRANCE },
  { icon:"🌹", category:"FRAGRANCE", title:"Know the fragrance notes: top, middle, base", desc:"Top notes last 30-60 mins. Middle (heart) notes emerge after 30 mins and last 2-3 hours. Base notes last all day. Choosing for base notes matters most.", impact:"🔥 High", timeframe:"1 day", color:H.FRAGRANCE },
  { icon:"🧪", category:"FRAGRANCE", title:"Try niche fragrances over designer ones", desc:"Niche fragrances from houses like Le Labo, Maison Margiela, or Byredo are unique, complex, and far less likely to be smelled on someone else. Memorable.", impact:"🔥 High", timeframe:"1 day", color:H.FRAGRANCE },
  { icon:"💡", category:"FRAGRANCE", title:"Ask for fragrance recommendations based on style", desc:"Tell a fragrance consultant your aesthetic and the occasion. They'll narrow to 3-4 options that fit you. Expertise + your input = perfect scent faster.", impact:"⚡ Medium", timeframe:"1 day", color:H.FRAGRANCE },
  { icon:"🌊", category:"FRAGRANCE", title:"Start with a few highly-rated accessible options", desc:"Dior Sauvage, Bleu de Chanel, and YSL La Nuit are popular for a reason. Learn what types of notes you like before exploring niche options.", impact:"⚡ Medium", timeframe:"1 week", color:H.FRAGRANCE },
  { icon:"🎯", category:"FRAGRANCE", title:"Avoid spraying on the chest if you sweat heavily", desc:"Chest sweat mixed with cologne creates an unpleasant compound smell. Focus on wrists and neck — areas that stay drier — if you sweat significantly.", impact:"⚡ Medium", timeframe:"Immediate", color:H.FRAGRANCE },
  { icon:"🌸", category:"FRAGRANCE", title:"Use a fragrance lotion from the same house", desc:"Many cologne brands offer a matching scented body lotion. Layering the lotion under the cologne creates a fuller, longer-lasting scent experience.", impact:"⚡ Medium", timeframe:"Immediate", color:H.FRAGRANCE },
  { icon:"📦", category:"FRAGRANCE", title:"Store cologne away from light and heat", desc:"UV light and heat break down fragrance molecules and change the scent over time. Store your cologne in a drawer or cabinet, away from the bathroom shower.", impact:"⚡ Medium", timeframe:"Ongoing", color:H.FRAGRANCE },
  { icon:"🔑", category:"FRAGRANCE", title:"Have a travel-size decant in your bag", desc:"A 10ml decant of your signature scent lets you reapply after the gym or before a date without carrying a full bottle. Preparation is the foundation of spontaneity.", impact:"✨ Quick Win", timeframe:"1 day", color:H.FRAGRANCE },
  { icon:"🌙", category:"FRAGRANCE", title:"Understand EDP vs EDT — it matters", desc:"Eau de Parfum (EDP) has 15-20% fragrance concentration and lasts all day. Eau de Toilette (EDT) has 8-12% and fades faster. For most people, EDP is the better investment.", impact:"🔥 High", timeframe:"Immediate", color:H.FRAGRANCE },
  { icon:"💬", category:"FRAGRANCE", title:"Let the fragrance create a memory", desc:"Wearing the same scent consistently in positive contexts means someone will think of you every time they smell something similar. This is deeply powerful.", impact:"🔥 High", timeframe:"Ongoing", color:H.FRAGRANCE },
  { icon:"🌹", category:"FRAGRANCE", title:"Spray on hair — it holds scent all day", desc:"Hair holds fragrance longer than skin. A light spray into hair (or on a brush, then run through hair) provides a subtle, all-day trace scent that's irresistible up close.", impact:"⚡ Medium", timeframe:"Immediate", color:H.FRAGRANCE },
  { icon:"🎭", category:"FRAGRANCE", title:"Reset your nose between testing fragrances", desc:"After smelling 2-3 fragrances, your nose fatigues. Smell coffee beans or your own skin (wrist or elbow) to neutralize and reset your olfactory sense.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.FRAGRANCE },
  { icon:"🏷️", category:"FRAGRANCE", title:"Budget doesn't determine quality of scent", desc:"Some $40 fragrances smell better and last longer than $200 ones. Price is partly marketing. Learn what you like and let your nose — not the price tag — decide.", impact:"⚡ Medium", timeframe:"Ongoing", color:H.FRAGRANCE },
  { icon:"🌊", category:"FRAGRANCE", title:"Layer a complementary body wash under cologne", desc:"A scented body wash from the same fragrance family as your cologne creates a multi-dimensional scent experience that lasts significantly longer.", impact:"⚡ Medium", timeframe:"Immediate", color:H.FRAGRANCE },
  { icon:"📸", category:"FRAGRANCE", title:"Choose a scent for each context of your life", desc:"Gym = fresh and clean. Office = light and professional. Date = warm and sensual. Having contextually appropriate scents signals sophistication and intention.", impact:"🔥 High", timeframe:"1 week", color:H.FRAGRANCE },

  // ══════════ CONFIDENCE (60 tips) ══════════
  { icon:"👑", category:"CONFIDENCE", title:"Act the part before you feel it", desc:"Confidence follows action, not the other way around. Do the confident thing — make the call, approach the person, speak first — and the feeling comes after.", impact:"🔥 High", timeframe:"Immediate", color:H.CONFIDENCE },
  { icon:"🎯", category:"CONFIDENCE", title:"Define your values and live by them", desc:"People with clear values make decisions faster, carry themselves better, and radiate a magnetic certainty. Spend 30 minutes writing your non-negotiables.", impact:"🔥 High", timeframe:"1 week", color:H.CONFIDENCE },
  { icon:"💪", category:"CONFIDENCE", title:"Do one scary thing every week", desc:"Discomfort is where confidence lives. A cold approach, a difficult conversation, a public speech — each one deposits into your confidence account.", impact:"🔥 High", timeframe:"Ongoing", color:H.CONFIDENCE },
  { icon:"🌟", category:"CONFIDENCE", title:"Eliminate 'sorry' from your daily language", desc:"Apologizing for existing — 'sorry, can I ask...' — signals low confidence. 'Excuse me' is neutral. 'Sorry' where no apology is needed undermines you.", impact:"🔥 High", timeframe:"2 weeks", color:H.CONFIDENCE },
  { icon:"🧠", category:"CONFIDENCE", title:"Keep your promises to yourself, always", desc:"Every broken self-promise (gym skipped, goal abandoned) chips away at your internal trust. Keeping every promise to yourself, even small ones, rebuilds it.", impact:"🔥 High", timeframe:"Ongoing", color:H.CONFIDENCE },
  { icon:"🏆", category:"CONFIDENCE", title:"Track your achievements — review them monthly", desc:"You've done more than you remember. Keep a running list of wins, big and small. Reading it on hard days restores the perspective your fears steal.", impact:"⚡ Medium", timeframe:"Ongoing", color:H.CONFIDENCE },
  { icon:"🌊", category:"CONFIDENCE", title:"Spend time alone comfortably", desc:"Being completely comfortable and at peace when alone is a sign of genuine confidence. People who need constant company to feel good are running from themselves.", impact:"🔥 High", timeframe:"Ongoing", color:H.CONFIDENCE },
  { icon:"💬", category:"CONFIDENCE", title:"Stop over-explaining your decisions", desc:"Confident people say 'I'd prefer not to' without lengthy justification. Every extra explanation reveals that you're seeking approval. Just decide. Just state.", impact:"🔥 High", timeframe:"2 weeks", color:H.CONFIDENCE },
  { icon:"🎭", category:"CONFIDENCE", title:"Embrace your quirks — don't hide them", desc:"The parts of you that don't fit the mold are often the most magnetic. Trying to suppress your authentic quirks makes you less interesting, not more.", impact:"🔥 High", timeframe:"Ongoing", color:H.CONFIDENCE },
  { icon:"🔥", category:"CONFIDENCE", title:"Speak first in group settings", desc:"Speaking early in group conversations (within the first 2-3 exchanges) reduces the anxiety of your first contribution and positions you as engaged and present.", impact:"🔥 High", timeframe:"Immediate", color:H.CONFIDENCE },
  { icon:"🌹", category:"CONFIDENCE", title:"Accept compliments gracefully — don't deflect", desc:"'You look great today.' 'Oh, this old thing?' = low confidence. 'Thank you, I feel great' = high confidence. Accept compliments without deflecting or explaining.", impact:"🔥 High", timeframe:"Immediate", color:H.CONFIDENCE },
  { icon:"🎵", category:"CONFIDENCE", title:"Create a confidence-priming playlist", desc:"5-10 songs that shift your state before challenging situations. Listen before important events. Music directly modulates emotion and can instantly shift your energy.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.CONFIDENCE },
  { icon:"🧘", category:"CONFIDENCE", title:"Use power poses for 2 minutes before challenges", desc:"Research shows that expansive postures (arms wide, chest open, chin up) for 2 minutes before stressful situations measurably boost confidence and reduce cortisol.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.CONFIDENCE },
  { icon:"📓", category:"CONFIDENCE", title:"Write down 3 things you did well each night", desc:"Confidence requires evidence. Writing 3 daily wins — however small — builds a legitimate body of self-evidence that replaces negative self-talk with truth.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.CONFIDENCE },
  { icon:"🚀", category:"CONFIDENCE", title:"Set and achieve one small goal daily", desc:"Small daily wins compound into the deep sense that you can trust yourself to do what you say. The confidence that comes from self-trust is the most durable kind.", impact:"🔥 High", timeframe:"3 weeks", color:H.CONFIDENCE },
  { icon:"👁️", category:"CONFIDENCE", title:"Look people in the eye when you greet them", desc:"Direct eye contact in a greeting is one of the most consistent signals of self-assurance. Practice it until it's the only way you know how to greet someone.", impact:"🔥 High", timeframe:"Immediate", color:H.CONFIDENCE },
  { icon:"🌙", category:"CONFIDENCE", title:"Know that most people aren't thinking about you", desc:"The spotlight effect makes us believe others are focused on our mistakes. They're not. Knowing this liberates you from performative anxiety and lets you be real.", impact:"🔥 High", timeframe:"Immediate", color:H.CONFIDENCE },
  { icon:"🎯", category:"CONFIDENCE", title:"Say no to things that don't serve you", desc:"Every time you say no to what you don't want, you reinforce that your time and energy have value. The ability to say no comfortably is a confidence foundation.", impact:"🔥 High", timeframe:"Ongoing", color:H.CONFIDENCE },
  { icon:"🔑", category:"CONFIDENCE", title:"Invest in yourself financially", desc:"Buying courses, coaching, gym memberships, and quality clothing is a form of self-belief. Investing money in your growth signals that you believe you're worth it.", impact:"🔥 High", timeframe:"Ongoing", color:H.CONFIDENCE },
  { icon:"🌊", category:"CONFIDENCE", title:"Build a relationship with your body through exercise", desc:"Regular physical training creates a body you feel good in — and the relationship you build with it through effort is one of the deepest sources of confidence.", impact:"🔥 High", timeframe:"3 months", color:H.CONFIDENCE },
  { icon:"💡", category:"CONFIDENCE", title:"Stop catastrophizing — question worst-case thinking", desc:"When anxiety says 'this will be terrible,' ask: 'Is that actually true?' Most feared outcomes don't materialize. Questioning them is the first step out of fear.", impact:"🔥 High", timeframe:"2 weeks", color:H.CONFIDENCE },
  { icon:"🎭", category:"CONFIDENCE", title:"Own your mistakes publicly and move on fast", desc:"Confident people acknowledge mistakes clearly and without excessive self-flagellation. 'I got that wrong, here's what I'll do differently' is incredibly powerful.", impact:"🔥 High", timeframe:"Immediate", color:H.CONFIDENCE },
  { icon:"🏃", category:"CONFIDENCE", title:"Build a morning practice that makes you proud", desc:"Starting every day with something that aligns with your best self — exercise, journaling, cold shower — means you enter every social situation having already won.", impact:"🔥 High", timeframe:"3 weeks", color:H.CONFIDENCE },
  { icon:"🌸", category:"CONFIDENCE", title:"Have answers to 'what are you passionate about?'", desc:"Knowing what lights you up and being able to share it with genuine energy is one of the most attractive things in any social situation.", impact:"🔥 High", timeframe:"1 week", color:H.CONFIDENCE },
  { icon:"🔥", category:"CONFIDENCE", title:"Stay grounded under social pressure", desc:"When people challenge, tease, or push your views, holding your position calmly without becoming defensive or aggressive signals deep-level confidence.", impact:"🔥 High", timeframe:"Ongoing", color:H.CONFIDENCE },

  // ══════════ SLEEP (30 tips) ══════════
  { icon:"🌙", category:"SLEEP", title:"Set a consistent sleep and wake time", desc:"Your circadian rhythm loves consistency. The same bedtime and wake time — even on weekends — produces dramatically better sleep quality within 2 weeks.", impact:"🔥 High", timeframe:"2 weeks", color:H.SLEEP },
  { icon:"📵", category:"SLEEP", title:"No screens 1 hour before bed", desc:"Blue light from screens suppresses melatonin production for up to 3 hours. Replace the last hour of screen time with reading, stretching, or journaling.", impact:"🔥 High", timeframe:"1 week", color:H.SLEEP },
  { icon:"🌡️", category:"SLEEP", title:"Keep your room at 18-20°C for optimal sleep", desc:"Core body temperature must drop 1-2°C to initiate deep sleep. A cool room facilitates this naturally. It's the single most powerful environmental sleep optimization.", impact:"🔥 High", timeframe:"1 night", color:H.SLEEP },
  { icon:"🔇", category:"SLEEP", title:"Make your bedroom completely dark", desc:"Even small amounts of light (LEDs, street lights through curtains) disrupt melatonin. Blackout curtains or a sleep mask produces measurably deeper sleep.", impact:"🔥 High", timeframe:"1 night", color:H.SLEEP },
  { icon:"☕", category:"SLEEP", title:"No caffeine after 2pm", desc:"Caffeine has a half-life of 5-7 hours. A 4pm coffee still has 50% of its stimulant effect at 10pm. Cut caffeine by 2pm for significantly better sleep.", impact:"🔥 High", timeframe:"3 days", color:H.SLEEP },
  { icon:"🛁", category:"SLEEP", title:"Take a warm bath 90 minutes before bed", desc:"Warm bath → vasodilation → rapid body cooling after → deep sleep trigger. This protocol is clinically validated to improve sleep onset by 36%.", impact:"🔥 High", timeframe:"1 week", color:H.SLEEP },
  { icon:"🌿", category:"SLEEP", title:"Take magnesium glycinate before bed", desc:"Magnesium activates the GABA system (the brain's off switch), relaxes muscles, and significantly improves deep sleep. 200-400mg glycinate is optimal.", impact:"🔥 High", timeframe:"1 week", color:H.SLEEP },
  { icon:"🧘", category:"SLEEP", title:"Do 4-7-8 breathing to fall asleep faster", desc:"Breathe in for 4 counts, hold for 7, exhale for 8. This activates the parasympathetic nervous system and dramatically reduces the time to sleep onset.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.SLEEP },
  { icon:"📚", category:"SLEEP", title:"Read fiction before sleep — not news", desc:"News activates the analytical brain; fiction activates the imagination. Reading fiction for 20 minutes drops heart rate and prepares the mind for sleep.", impact:"⚡ Medium", timeframe:"1 week", color:H.SLEEP },
  { icon:"🌅", category:"SLEEP", title:"Get sunlight in the morning within 30 minutes", desc:"Morning light anchors your circadian rhythm by stopping melatonin production precisely. Without it, the brain doesn't know when 'day' began. Get outside.", impact:"🔥 High", timeframe:"1 week", color:H.SLEEP },
  { icon:"🏋️", category:"SLEEP", title:"Exercise — but not within 3 hours of sleep", desc:"Exercise dramatically improves sleep quality — but late evening exercise raises core temperature and cortisol, delaying sleep onset. Finish by 7pm.", impact:"🔥 High", timeframe:"2 weeks", color:H.SLEEP },
  { icon:"🍷", category:"SLEEP", title:"No alcohol close to bedtime", desc:"Alcohol makes you fall asleep faster but suppresses REM sleep and causes waking at 3-4am. Net result: significantly worse recovery. Finish 3 hours before sleep.", impact:"🔥 High", timeframe:"3 days", color:H.SLEEP },
  { icon:"🧊", category:"SLEEP", title:"Try a cooling mattress pad", desc:"A mattress cooling pad maintains optimal sleep temperature through the night, preventing the temperature rise that causes midnight waking in most people.", impact:"🔥 High", timeframe:"1 week", color:H.SLEEP },
  { icon:"✍️", category:"SLEEP", title:"Write a tomorrow's to-do list before bed", desc:"Unfinished business keeps the brain alert. Writing tomorrow's list transfers the cognitive burden from your mind to paper, significantly reducing sleep-onset anxiety.", impact:"⚡ Medium", timeframe:"3 days", color:H.SLEEP },
  { icon:"🎵", category:"SLEEP", title:"Use white noise or pink noise for deeper sleep", desc:"Background noise at a consistent volume masks variable sounds (traffic, neighbors) that cause micro-arousals. Pink noise specifically improves deep sleep stages.", impact:"⚡ Medium", timeframe:"1 night", color:H.SLEEP },
  { icon:"💊", category:"SLEEP", title:"Try low-dose melatonin (0.5mg) for jet lag", desc:"Melatonin works best in small doses for resetting your rhythm after travel or schedule changes. Large doses (10mg) can create grogginess. Start at 0.5mg.", impact:"⚡ Medium", timeframe:"Immediate", color:H.SLEEP },
  { icon:"🌿", category:"SLEEP", title:"Try ashwagandha and L-theanine stack", desc:"Ashwagandha reduces cortisol; L-theanine promotes calm without sedation. Together, they create the relaxed-but-not-drowsy state that facilitates great sleep.", impact:"⚡ Medium", timeframe:"1 week", color:H.SLEEP },
  { icon:"📵", category:"SLEEP", title:"Use 'Do Not Disturb' mode every single night", desc:"Notification sounds cause micro-arousals even if you don't fully wake. Silencing your phone completely (or placing it outside the bedroom) improves sleep architecture.", impact:"🔥 High", timeframe:"1 night", color:H.SLEEP },
  { icon:"🛌", category:"SLEEP", title:"Only use your bed for sleep (and sex)", desc:"Using your bed for work, scrolling, or watching TV trains your brain to associate bed with wakefulness. Reserve it for sleep only and sleep onset improves.", impact:"🔥 High", timeframe:"2 weeks", color:H.SLEEP },
  { icon:"🌙", category:"SLEEP", title:"Try sleep tracking to understand your patterns", desc:"Wearables like Oura or Whoop give you objective data on deep sleep, REM, and sleep efficiency. Knowing your baseline is the first step to improving it.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.SLEEP },
  { icon:"💆", category:"SLEEP", title:"Progressive muscle relaxation before sleep", desc:"Tensing and releasing each muscle group from feet to head for 20 minutes triggers the relaxation response and prepares the body for deep sleep.", impact:"⚡ Medium", timeframe:"1 week", color:H.SLEEP },
  { icon:"🌬️", category:"SLEEP", title:"Ventilate your bedroom — fresh air aids sleep", desc:"Stuffy rooms with elevated CO2 reduce sleep quality and make you wake up groggy. Cracking a window creates airflow that keeps oxygen levels optimal.", impact:"⚡ Medium", timeframe:"1 night", color:H.SLEEP },
  { icon:"🌅", category:"SLEEP", title:"Try the military 'sleep in 2 minutes' technique", desc:"Relax your face muscles, drop your shoulders and hands, exhale and relax your chest, then your legs. Repeat 'don't think' for 10 seconds. Used by military to sleep anywhere.", impact:"✨ Quick Win", timeframe:"Immediate", color:H.SLEEP },
  { icon:"🎯", category:"SLEEP", title:"Prioritize sleep over everything else", desc:"No optimization — diet, exercise, supplements, skincare — outperforms 8 hours of quality sleep. When life is busy, sacrifice entertainment, not sleep.", impact:"🔥 High", timeframe:"Ongoing", color:H.SLEEP },
  { icon:"🌸", category:"SLEEP", title:"Create a 20-minute wind-down ritual", desc:"The same 20-minute pre-bed routine (stretch, journal, read) signals to the brain that sleep is coming. Conditioned rituals dramatically improve sleep onset.", impact:"🔥 High", timeframe:"2 weeks", color:H.SLEEP },

  // ══════════ HUMOR (50 tips) ══════════
  { icon:"😂", category:"HUMOR", title:"Study timing — comedy is 90% timing", desc:"The same joke told with a 1-second pause before the punchline is 3x funnier than without. Study great comedians for timing specifically, not just content.", impact:"🔥 High", timeframe:"1 month", color:H.HUMOR },
  { icon:"🎭", category:"HUMOR", title:"Self-deprecating humor is always safe", desc:"Making fun of yourself — without needing reassurance — is the most universally attractive comedy style. It signals security and makes others comfortable.", impact:"🔥 High", timeframe:"Immediate", color:H.HUMOR },
  { icon:"🌊", category:"HUMOR", title:"Watch one hour of stand-up per week", desc:"Stand-up comedy is the highest density training available for timing, structure, and delivery. Pick 5 comedians with styles you want to absorb and study them.", impact:"🔥 High", timeframe:"1 month", color:H.HUMOR },
  { icon:"🎯", category:"HUMOR", title:"Find the absurd in the ordinary", desc:"Pointing out the subtle absurdity of everyday situations — 'can we talk about the fact that...' — creates shared perspective and instant connection.", impact:"🔥 High", timeframe:"2 weeks", color:H.HUMOR },
  { icon:"💬", category:"HUMOR", title:"Never punch down — always punch up or sideways", desc:"Jokes about powerful people or yourself = safe. Jokes about vulnerable people = never funny. The direction of your humor reveals your character.", impact:"🔥 High", timeframe:"Immediate", color:H.HUMOR },
  { icon:"😏", category:"HUMOR", title:"Deadpan delivery makes things 10x funnier", desc:"Saying something ridiculous completely seriously, without cracking a smile, creates a comedic tension that the straight-faced delivery alone creates.", impact:"🔥 High", timeframe:"2 weeks", color:H.HUMOR },
  { icon:"🌟", category:"HUMOR", title:"Build a library of great stories and anecdotes", desc:"Real experiences, told well with humor, are better than any rehearsed joke. Mine your own life for 5-10 genuinely funny stories and polish them.", impact:"🔥 High", timeframe:"2 weeks", color:H.HUMOR },
  { icon:"🎵", category:"HUMOR", title:"Match humor to the moment — read the room", desc:"Dark humor at a funeral vs. a bar — context determines reception. The most important humor skill is knowing what type of humor fits the moment.", impact:"🔥 High", timeframe:"Ongoing", color:H.HUMOR },
  { icon:"🔥", category:"HUMOR", title:"Don't laugh at your own jokes before the punchline", desc:"Pre-laughing at your own joke tells the audience what's coming and deflates the surprise. Deliver the punchline with a straight face, then smile after.", impact:"🔥 High", timeframe:"2 weeks", color:H.HUMOR },
  { icon:"🎯", category:"HUMOR", title:"Subvert expectations — that's the core of comedy", desc:"Humor is a setup + a surprising subversion of what the audience expected. The bigger the gap between expectation and reality, the bigger the laugh.", impact:"🔥 High", timeframe:"1 month", color:H.HUMOR },
  { icon:"💡", category:"HUMOR", title:"Use specific details to make things funnier", desc:"'A dog' is fine. 'A very judgmental chihuahua' is funnier. Specificity is the secret ingredient in most humor. Specific > general, always.", impact:"🔥 High", timeframe:"2 weeks", color:H.HUMOR },
  { icon:"🌊", category:"HUMOR", title:"Learn to use callbacks — the advanced move", desc:"Referencing something from earlier in the conversation for a punchline later shows you've been listening AND creates layers of humor that feel sophisticated.", impact:"🔥 High", timeframe:"2 weeks", color:H.HUMOR },
  { icon:"😄", category:"HUMOR", title:"Laugh genuinely and often — it's contagious", desc:"Genuine laughter at others' humor makes you more likable, warm, and attractive. People who make you laugh are worth keeping. Be that for others.", impact:"🔥 High", timeframe:"Immediate", color:H.HUMOR },
  { icon:"🎭", category:"HUMOR", title:"Don't over-explain a joke", desc:"If you have to explain why something is funny, it isn't anymore. Let it land or not land. Over-explaining is worse than a flat delivery.", impact:"🔥 High", timeframe:"Immediate", color:H.HUMOR },
  { icon:"🌙", category:"HUMOR", title:"Read more — humor lives in language", desc:"Writers who read widely have a vastly richer vocabulary for describing the absurd. Nabokov, Douglas Adams, and P.G. Wodehouse will rewire how you think.", impact:"🔥 High", timeframe:"Ongoing", color:H.HUMOR },
  { icon:"🔑", category:"HUMOR", title:"Make humor about situations, not people", desc:"Situational humor unites everyone in the observation. Personal humor about someone — even light — can backfire if they don't feel the same way about themselves.", impact:"🔥 High", timeframe:"Immediate", color:H.HUMOR },
  { icon:"🎵", category:"HUMOR", title:"Use understatement for maximum effect", desc:"Describing something extreme as if it were completely ordinary ('yeah, a bit of a challenging morning' after something catastrophic) is sophisticated humor.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.HUMOR },
  { icon:"🌹", category:"HUMOR", title:"Physical comedy is underrated in conversation", desc:"A well-timed facial expression, exaggerated pause, or subtle gesture amplifies verbal humor enormously. Your body is part of the joke.", impact:"⚡ Medium", timeframe:"2 weeks", color:H.HUMOR },
  { icon:"💬", category:"HUMOR", title:"Take improv classes — the fastest humor training", desc:"Improv teaches you to think funny on the spot, accept all offers, and build jokes collaboratively. 8 weeks of improv transforms conversational humor.", impact:"🔥 High", timeframe:"2 months", color:H.HUMOR },
  { icon:"😂", category:"HUMOR", title:"Know your comedic style — lean into it", desc:"Are you dry? Self-deprecating? Absurdist? Sarcastic? Knowing your style and amplifying it beats trying to master every type. Authentic style > versatile mediocrity.", impact:"🔥 High", timeframe:"Ongoing", color:H.HUMOR },
  { icon:"🎯", category:"HUMOR", title:"Never use humor to escape difficult emotions", desc:"Humor used to deflect genuine feelings creates distance instead of connection. Know when to put down the joke and be real. That contrast makes the humor land harder later.", impact:"🔥 High", timeframe:"Ongoing", color:H.HUMOR },
];

const IMPACT_FILTERS: Impact[] = ["🔥 High", "⚡ Medium", "✨ Quick Win"];
const ALL_CATEGORIES = ["All", ...Array.from(new Set(TIPS.map((t) => t.category)))];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function triggerHaptic() {
  if (typeof window !== "undefined" && navigator.vibrate) {
    navigator.vibrate(10);
  }
}


const FEATURED_TIP = TIPS[Math.floor(Math.random() * TIPS.length)];

export default function LookmaxingTipsPage() {
  const { theme, isDark } = useTheme();
  const [impactFilter, setImpactFilter] = useState<Impact | "All">("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return TIPS.filter((t) => {
      const impactOk = impactFilter === "All" || t.impact === impactFilter;
      const catOk = categoryFilter === "All" || t.category === categoryFilter;
      return impactOk && catOk;
    });
  }, [impactFilter, categoryFilter]);

  // Reset expansion when filter changes
  useEffect(() => {
    setExpanded(null);
  }, [impactFilter, categoryFilter]);

  const highImpactCount = useMemo(() => TIPS.filter(t => t.impact === "🔥 High").length, []);
  const categoryCount = useMemo(() => ALL_CATEGORIES.length - 1, []);

  return (
    <PageLayout
      showBack
      backHref="/fun-features"
      variant="dark"
      header={<HeaderTitle title="Rizz AI" />}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .chip-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .chip-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .chip-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .interactive-chip {
          transition: transform 0.1s, opacity 0.1s;
        }
        .interactive-chip:active {
          transform: scale(0.95);
        }
        .tip-card {
          transition: transform 0.15s, background-color 0.15s;
        }
        .tip-card:active {
          transform: scale(0.98);
        }
      ` }} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", width: "100%", maxWidth: 450, margin: "0 auto", gap: 16, animation: "fadeIn 0.3s ease-out" }}>
        
        {/* Header Label Info */}
        <p
          style={{
            fontSize: 11,
            color: "rgba(255, 255, 255, 0.45)",
            fontWeight: 800,
            letterSpacing: 2,
            textAlign: "center",
            textTransform: "uppercase",
            margin: "-8px 0 0",
          }}
        >
          GLOW-UP GUIDE · LEVEL UP FAST
        </p>

        {/* Hero Stats Row */}
        <div style={{ display: "flex", flexDirection: "row", gap: 10, width: "100%" }}>
          {/* Stat 1 */}
          <div style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(0, 207, 168, 0.15)", borderRadius: 16, padding: "12px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: 20, fontWeight: 950, color: "#00CFA8" }}>{TIPS.length}+</span>
            <span style={{ fontSize: 10, color: "rgba(255, 255, 255, 0.4)", fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase" }}>Total Tips</span>
          </div>
          {/* Stat 2 */}
          <div style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 107, 53, 0.15)", borderRadius: 16, padding: "12px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: 20, fontWeight: 950, color: "#FF6B35" }}>{highImpactCount}</span>
            <span style={{ fontSize: 10, color: "rgba(255, 255, 255, 0.4)", fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase" }}>High Impact</span>
          </div>
          {/* Stat 3 */}
          <div style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(156, 39, 176, 0.15)", borderRadius: 16, padding: "12px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: 20, fontWeight: 950, color: "#9C27B0" }}>{categoryCount}</span>
            <span style={{ fontSize: 10, color: "rgba(255, 255, 255, 0.4)", fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase" }}>Categories</span>
          </div>
        </div>

        {/* Featured Tip of the Day */}
        <div
          style={{
            backgroundColor: "#161622",
            border: `1.5px solid ${FEATURED_TIP.color}45`,
            borderRadius: 22,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxShadow: `0 6px 14px ${FEATURED_TIP.color}15`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ backgroundColor: FEATURED_TIP.color, color: "#FFFFFF", borderRadius: 12, padding: "4px 10px", fontSize: 10, fontWeight: 900, letterSpacing: 0.5 }}>
              ⚡ TIP OF THE DAY
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: "rgba(255,255,255,0.4)" }}>
              <Clock size={12} color={FEATURED_TIP.color} />
              <span style={{ fontSize: 11, fontWeight: 700, color: FEATURED_TIP.color }}>{FEATURED_TIP.timeframe}</span>
            </div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "row", gap: 14, alignItems: "center" }}>
            <span style={{ fontSize: 32, flexShrink: 0 }}>{FEATURED_TIP.icon}</span>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: 15, fontWeight: 900, color: "#FFFFFF", margin: 0 }}>
                {FEATURED_TIP.title}
              </h4>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", margin: "4px 0 0", lineHeight: 1.45 }}>
                {FEATURED_TIP.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Impact Filter Row */}
        <div
          className="chip-scroll"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 4,
            whiteSpace: "nowrap",
          }}
        >
          {(["All", ...IMPACT_FILTERS] as const).map((f) => {
            const active = impactFilter === f;
            const color = f === "🔥 High" ? "#FF6B35" : f === "⚡ Medium" ? "#9C27B0" : f === "✨ Quick Win" ? "#E040A0" : "#00CFA8";
            return (
              <button
                key={f}
                className="interactive-chip"
                onClick={() => setImpactFilter(f)}
                style={{
                  flexShrink: 0,
                  padding: "8px 16px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                  border: active ? "none" : "1px solid rgba(255,255,255,0.08)",
                  backgroundColor: active ? color : "rgba(255,255,255,0.04)",
                  color: active ? "#FFFFFF" : "rgba(255,255,255,0.45)",
                  transition: "all 0.15s",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Category Filter Row */}
        <div
          className="chip-scroll"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 6,
            whiteSpace: "nowrap",
          }}
        >
          {ALL_CATEGORIES.map((cat) => {
            const active = categoryFilter === cat;
            const color = cat === "All" ? "#00CFA8" : CATEGORY_COLORS[cat as Category];
            return (
              <button
                key={cat}
                className="interactive-chip"
                onClick={() => setCategoryFilter(cat)}
                style={{
                  flexShrink: 0,
                  padding: "8px 16px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                  border: active ? `1px solid ${color}` : "1px solid rgba(255,255,255,0.08)",
                  backgroundColor: active ? `${color}25` : "rgba(255,255,255,0.04)",
                  color: active ? color : "rgba(255,255,255,0.45)",
                  transition: "all 0.15s",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results Info */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px" }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.45)" }}>
            {filtered.length} tip{filtered.length !== 1 ? "s" : ""} found
          </span>
          {(impactFilter !== "All" || categoryFilter !== "All") && (
            <button
              onClick={() => { setImpactFilter("All"); setCategoryFilter("All"); }}
              style={{
                background: "none",
                border: "none",
                color: "#00CFA8",
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer",
                padding: 0,
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Scrollable list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 60 }}>
          {filtered.map((tip, i) => {
            const isExpanded = expanded === i;
            return (
              <div
                key={`${tip.title}-${i}`}
                onClick={() => setExpanded(isExpanded ? null : i)}
                className="tip-card"
                style={{
                  cursor: "pointer",
                  backgroundColor: "#161622",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderLeft: `4px solid ${tip.color}`,
                  borderRadius: 18,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {/* Top View */}
                <div style={{ display: "flex", flexDirection: "row", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: `${tip.color}15`, display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 22 }}>{tip.icon}</span>
                  </div>
                  
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 10, fontWeight: 900, color: tip.color, letterSpacing: 0.5 }}>{tip.category}</span>
                      <div style={{ backgroundColor: `${tip.color}15`, borderRadius: 6, padding: "1px 6px" }}>
                        <span style={{ fontSize: 9, fontWeight: 900, color: tip.color }}>{tip.impact}</span>
                      </div>
                    </div>
                    <h4 style={{ fontSize: 14, fontWeight: 800, color: "#FFFFFF", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {tip.title}
                    </h4>
                    {!isExpanded && (
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {tip.desc}
                      </p>
                    )}
                  </div>

                  <ChevronRight
                    size={16}
                    color="rgba(255,255,255,0.25)"
                    style={{
                      transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
                    }}
                  />
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 10, display: "flex", flexDirection: "column", gap: 10, animation: "scaleUp 0.18s ease-out" }}>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.55, margin: 0 }}>
                      {tip.desc}
                    </p>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: `${tip.color}10`, border: `1px solid ${tip.color}20`, borderRadius: 8, padding: "6px 12px", width: "fit-content" }}>
                      <Clock size={12} color={tip.color} />
                      <span style={{ fontSize: 11, fontWeight: 800, color: tip.color }}>
                        Results in: {tip.timeframe}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px", gap: 12, textAlign: "center" }}>
              <Compass size={48} color="rgba(255, 255, 255, 0.15)" />
              <span style={{ fontSize: 15, fontWeight: 800, color: "rgba(255, 255, 255, 0.35)" }}>No tips match your filters</span>
              <button
                onClick={() => { setImpactFilter("All"); setCategoryFilter("All"); }}
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 14,
                  padding: "8px 16px",
                  color: "#FFFFFF",
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
