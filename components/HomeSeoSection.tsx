"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  MessageSquare,
  Flame,
  Zap,
  ChevronDown,
  ShieldCheck,
  Smartphone,
  Star,
  Compass,
  Heart,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "What is Rizz AI and how does this AI Dating App work?",
    a: "Rizz AI (rizzai.space) is the #1 free AI dating app and AI wingman designed to level up your dating game. Powered by advanced Rizz GPT intelligence, it crafts witty chat responses, generates clever pickup lines for Tinder, Hinge, and Bumble, provides instant PSL looksmaxing face ratings, and offers interactive couple games.",
  },
  {
    q: "Is the Rizz App 100% free online without download?",
    a: "Yes! Rizz AI is a 100% free rizz app online that works directly in any web browser on your phone or desktop. There are no subscriptions, paywalls, or app store downloads required to start generating irresistible rizz lines or analyzing conversations.",
  },
  {
    q: "How does the AI Dating Chatbot help with Tinder, Hinge, and Bumble?",
    a: "Our AI dating chatbot and screenshot analyzer analyzes your match's bio, photos, and conversation history. In seconds, it suggests flirty openers, hilarious comebacks, or romantic responses tailored to your chosen tone (smooth, bold, witty, or spicy).",
  },
  {
    q: "What is Looksmaxing AI and PSL Scale Face Rating?",
    a: "Looksmaxing AI uses facial geometry analysis to calculate facial symmetry, canthal tilt, jawline definition, and overall aesthetic harmony on the PSL scale. It provides personalized, actionable grooming and style tips to help you maximize your attractiveness.",
  },
  {
    q: "Can I use Rizz AI from my Instagram bio link?",
    a: "Absolutely! Rizz AI is optimized for all mobile browsers and social media in-app browsers like Instagram, TikTok, and Facebook. You can easily click links, generate lines, take selfies, and upload screenshots on the go.",
  },
  {
    q: "What is RIZZ AI and how does it revolutionize AI dating?",
    a: "RIZZ AI is a cutting-edge artificial intelligence platform specifically designed for enhancing dating experiences. By leveraging advanced language models similar to ChatGPT, RIZZ AI revolutionizes AI dating by providing personalized conversation starters, flirting tips, and relationship advice. This innovative tool helps users navigate the complex world of modern dating with confidence and charm.",
  },
  {
    q: "How does RIZZ AI differ from other AI chatbots in the realm of AI dating?",
    a: "RIZZ AI sets itself apart in the AI dating landscape by offering a unique blend of natural language processing and emotional intelligence. Unlike generic chatbots, RIZZ AI is specifically trained on dating scenarios, allowing it to understand nuanced social cues and provide context-appropriate responses. This specialized focus makes RIZZ AI powered by advanced AI an invaluable asset for those looking to improve their dating skills and build meaningful connections.",
  },
  {
    q: "Can RIZZ AI help improve my dating profile and online presence?",
    a: "Absolutely! RIZZ AI is equipped with advanced algorithms that analyze successful dating profiles and online interactions. By utilizing RIZZ AI, you can receive tailored suggestions to optimize your dating profile, select the most appealing photos, and craft engaging bios. The AI dating assistant can also provide real-time feedback on your online conversations, helping you maintain interesting and flirtatious exchanges that are more likely to lead to successful matches.",
  },
  {
    q: "How does RIZZ AI ensure privacy and security in the context of AI dating?",
    a: "Privacy and security are paramount in RIZZ AI's design. The platform employs end-to-end encryption for all communications and does not store personal conversation data permanently. RIZZ AI operates on a privacy-first principle, ensuring that your dating conversations and personal information remain confidential. The AI dating assistant processes information locally when possible and adheres to strict data protection protocols, giving users peace of mind while improving their dating skills.",
  },
];

const SEO_HIGHLIGHTS = [
  {
    icon: <Sparkles size={20} color="#F86B6D" />,
    title: "AI Rizz & Rizz GPT",
    desc: "Generate irresistible pickup lines & smooth replies powered by cutting-edge dating AI models.",
    href: "/pickup-line",
  },
  {
    icon: <MessageSquare size={20} color="#F86B6D" />,
    title: "AI Dating Chatbot",
    desc: "Upload chat screenshots from Tinder, Bumble, or Hinge for witty context-aware responses.",
    href: "/upload-screenshot",
  },
  {
    icon: <Flame size={20} color="#F86B6D" />,
    title: "Looksmaxing AI Rating",
    desc: "Instant PSL scale face rating, eye shape analysis & personalized glow-up roadmaps.",
    href: "/looksmaxing",
  },
  {
    icon: <Compass size={20} color="#F86B6D" />,
    title: "Fun Dating & Couple Games",
    desc: "Deep couple questions, Roast My Selfie, Rate My Crush & compatibility tests.",
    href: "/fun-features",
  },
];

export function HomeSeoSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section
      aria-label="Rizz AI Features and Overview"
      className="w-full text-slate-800"
      style={{
        marginTop: 24,
        marginBottom: 36,
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* ── SEO Hero Summary Card ── */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(12px)",
          borderRadius: 28,
          padding: "24px 20px",
          border: "1.5px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span
            style={{
              background: "#F86B6D",
              color: "#FFFFFF",
              fontSize: 11,
              fontWeight: 800,
              padding: "3px 10px",
              borderRadius: 999,
              textTransform: "uppercase",
              letterSpacing: 0.8,
            }}
          >
            #1 Dating AI
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} fill="#FFA726" color="#FFA726" />
            ))}
            <span style={{ fontSize: 12, fontWeight: 700, color: "#555", marginLeft: 4 }}>
              4.9 (14k+ reviews)
            </span>
          </div>
        </div>

        <h1
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: "#1F1A3A",
            lineHeight: 1.3,
            margin: "0 0 10px 0",
          }}
        >
          Rizz AI — The #1 Free AI Dating App & Dating AI Wingman
        </h1>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: "#3F3D56",
            margin: 0,
          }}
        >
          Welcome to <strong>Rizz AI</strong> (<em>rizzai.space</em>), the ultimate free{" "}
          <strong>rizz app online</strong> designed to elevate your dating life. Whether you need an{" "}
          <strong>AI dating chatbot</strong> to reply to matches on Tinder, Hinge, or Bumble, instant{" "}
          <strong>AI rizz</strong> pickup lines from our <strong>Rizz GPT</strong> engine, or an in-depth{" "}
          <strong>looksmaxing face rating</strong>, Rizz AI gives you every tool to spark chemistry and leave an unforgettable impression.
        </p>

        {/* Feature Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          style={{ marginTop: 18 }}
        >
          {SEO_HIGHLIGHTS.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "14px 14px",
                borderRadius: 18,
                background: "rgba(255, 255, 255, 0.9)",
                border: "1px solid rgba(248, 107, 109, 0.15)",
                textDecoration: "none",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              className="hover:scale-[1.02] active:scale-[0.98]"
            >
              <div
                style={{
                  background: "#FFF0F0",
                  padding: 8,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: "#1F1A3A",
                    margin: "0 0 2px 0",
                  }}
                >
                  {item.title}
                </h2>
                <p
                  style={{
                    fontSize: 12,
                    lineHeight: 1.4,
                    color: "#5C5A6F",
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Why Choose Rizz AI Card ── */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(12px)",
          borderRadius: 28,
          padding: "24px 20px",
          border: "1.5px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h2
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#1F1A3A",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Zap size={20} color="#F86B6D" />
          Why Rizz AI is the Best Free Rizz App Online
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <ShieldCheck size={18} color="#F86B6D" style={{ marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: "#3F3D56", margin: 0, lineHeight: 1.5 }}>
              <strong>100% Free & No Sign-Up</strong>: Enjoy unlimited access to all AI rizz generators, pickup lines, and dating tools without paywalls.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <Smartphone size={18} color="#F86B6D" style={{ marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: "#3F3D56", margin: 0, lineHeight: 1.5 }}>
              <strong>Mobile & Instagram Ready</strong>: Fast, responsive web app optimized for mobile users, TikTok, and Instagram bio links.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <Flame size={18} color="#F86B6D" style={{ marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: "#3F3D56", margin: 0, lineHeight: 1.5 }}>
              <strong>High Conversion Rizz GPT</strong>: Proven conversation starters and charismatic responses tailored to make you stand out on dating apps.
            </p>
          </div>
        </div>
      </div>

      {/* ── Interactive FAQ Accordion ── */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(12px)",
          borderRadius: 28,
          padding: "24px 20px",
          border: "1.5px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h2
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#1F1A3A",
            marginBottom: 16,
          }}
        >
          Frequently Asked Questions
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                style={{
                  borderRadius: 16,
                  background: isOpen ? "#FFFFFF" : "rgba(255, 255, 255, 0.85)",
                  border: "1px solid rgba(248, 107, 109, 0.15)",
                  overflow: "hidden",
                  transition: "background 0.2s ease, box-shadow 0.2s ease",
                  boxShadow: isOpen ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  aria-expanded={isOpen}
                  id={`faq-btn-${index}`}
                >
                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1F1A3A",
                      margin: 0,
                      paddingRight: 10,
                    }}
                  >
                    {faq.q}
                  </h3>
                  <ChevronDown
                    size={18}
                    color="#F86B6D"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                      flexShrink: 0,
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 16px 14px 16px",
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "#4A485F",
                      animation: "fadeIn 0.2s ease",
                    }}
                  >
                    <p style={{ margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── How RIZZ AI Works Card ── */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(12px)",
          borderRadius: 28,
          padding: "32px 24px",
          border: "1.5px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#1F1A3A",
              textAlign: "center",
              margin: "0 0 6px 0",
              letterSpacing: "-0.3px",
            }}
          >
            How RIZZ AI Works
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "#5C5A6F",
              textAlign: "center",
              margin: "0 0 32px 0",
            }}
          >
            Get perfect replies with <strong>RIZZ AI</strong> in three simple steps
          </p>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
            style={{ marginTop: 8 }}
          >
            {/* Step 1 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div style={{ position: "relative", marginBottom: 16 }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 18,
                    background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 16px rgba(236, 72, 153, 0.25)",
                  }}
                >
                  <MessageSquare size={28} color="#FFFFFF" />
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -26,
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "#FCE7F3",
                    color: "#D946EF",
                    fontSize: 12,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #FFFFFF",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  01
                </div>
              </div>
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#1F1A3A",
                  margin: "0 0 6px 0",
                }}
              >
                Upload Screenshot or Enter Text
              </h3>
              <p
                style={{
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  color: "#5C5A6F",
                  margin: 0,
                  maxWidth: 240,
                }}
              >
                Upload your chat screenshot or directly input conversation content
              </p>
            </div>

            {/* Step 2 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div style={{ position: "relative", marginBottom: 16 }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 18,
                    background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 16px rgba(236, 72, 153, 0.25)",
                  }}
                >
                  <Sparkles size={28} color="#FFFFFF" />
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -26,
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "#FCE7F3",
                    color: "#D946EF",
                    fontSize: 12,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #FFFFFF",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  02
                </div>
              </div>
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#1F1A3A",
                  margin: "0 0 6px 0",
                }}
              >
                AI Smart Analysis
              </h3>
              <p
                style={{
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  color: "#5C5A6F",
                  margin: 0,
                  maxWidth: 240,
                }}
              >
                Our RIZZ AI analyzes conversation context and emotional tone
              </p>
            </div>

            {/* Step 3 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div style={{ position: "relative", marginBottom: 16 }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 18,
                    background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 16px rgba(236, 72, 153, 0.25)",
                  }}
                >
                  <Heart size={28} color="#FFFFFF" />
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -26,
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "#FCE7F3",
                    color: "#D946EF",
                    fontSize: 12,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #FFFFFF",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  03
                </div>
              </div>
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#1F1A3A",
                  margin: "0 0 6px 0",
                }}
              >
                Get Perfect Replies
              </h3>
              <p
                style={{
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  color: "#5C5A6F",
                  margin: 0,
                  maxWidth: 240,
                }}
              >
                Receive multiple style reply options and choose the best fit
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Why We Need RIZZ AI Dating Assistant Card ── */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(12px)",
          borderRadius: 28,
          padding: "32px 24px",
          border: "1.5px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#1F1A3A",
              textAlign: "center",
              margin: "0 0 6px 0",
              letterSpacing: "-0.3px",
            }}
          >
            Why We Need RIZZ AI Dating Assistant?
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "#5C5A6F",
              textAlign: "center",
              margin: "0 0 32px 0",
            }}
          >
            Transform your dating conversations with <strong>RIZZ AI</strong> powered confidence
          </p>

          <div
            className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-center"
            style={{ marginTop: 8 }}
          >
            {/* Left Column: Image Container */}
            <div
              className="md:col-span-5"
              style={{
                background: "rgba(248, 107, 109, 0.05)",
                padding: 16,
                borderRadius: 24,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src="/images/Couple1.png"
                alt="Happy couple using RIZZ AI dating assistant for romantic conversations"
                width={400}
                height={300}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 16,
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            {/* Right Column: Features */}
            <div
              className="md:col-span-7"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              {/* Feature 1 */}
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 10px rgba(236, 72, 153, 0.2)",
                  }}
                >
                  <Sparkles size={20} color="#FFFFFF" />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 800,
                      color: "#1F1A3A",
                      margin: "0 0 6px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    ✨ Effortless Impression
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "#5C5A6F",
                      margin: 0,
                    }}
                  >
                    Want to impress your crush effortlessly? Our RIZZ AI dating assistant, trained on countless successful dating cases, offers proven chat techniques tailored to your unique personality. Whether you&apos;re shy or outgoing, you&apos;ll quickly master the art of flirting with RIZZ AI and make incredible strides in your dating life! 💕
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 10px rgba(236, 72, 153, 0.25)",
                  }}
                >
                  <ShieldCheck size={20} color="#FFFFFF" />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 800,
                      color: "#1F1A3A",
                      margin: "0 0 6px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    🔒 Privacy Guaranteed
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "#5C5A6F",
                      margin: 0,
                    }}
                  >
                    Worried about privacy? Don&apos;t be! RIZZ AI never saves your chat records or screenshots. Share your dating stories freely with our AI coach and receive honest advice without compromising your privacy. With this trustworthy dating assistant, you can fully enjoy the exciting journey of love! 💖
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Dating Game Wingman Description Card ── */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(12px)",
          borderRadius: 28,
          padding: "32px 24px",
          border: "1.5px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#1F1A3A",
              marginBottom: 4,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Smartphone size={20} color="#F86B6D" />
            About this app
          </h2>

          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.6,
              color: "#4A485F",
              margin: 0,
            }}
          >
            Looking for a little help with your dating game? RIZZ has you covered! Our AI-powered app uses cutting edge LLMs to generate personalized responses that are sure to impress your crush.
          </p>

          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.6,
              color: "#4A485F",
              margin: 0,
            }}
          >
            RIZZ gives you the edge you need to stand out from the crowd. With our intuitive interface and personalized algorithms, you&apos;ll never be at a loss for words again.
          </p>

          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.6,
              color: "#4A485F",
              margin: 0,
            }}
          >
            With RIZZ, you can upload screenshots of your conversations with your matches, and even your matches&apos; bio, and receive instant and witty replies tailored to your unique situation. Our app is designed to help you keep the conversation going, whether you&apos;re trying to make a great first impression, impress your date, or simply want to spice up a chat.
          </p>

          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.6,
              color: "#4A485F",
              margin: 0,
            }}
          >
            But RIZZ isn&apos;t just a tool for online dating – it&apos;s also great for conversations with friends or family. There&apos;s even a formal option to use for networking and professional communications. RIZZ is your AI wingman eager to provide you with the perfect response to keep things flowing smoothly or spice life up.
          </p>

          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.6,
              color: "#4A485F",
              margin: 0,
            }}
          >
            One of the best things about RIZZ is that it adapts to your unique communication style. Our AI algorithms analyze your style to understand your tone, humor, and vocabulary, and then generate responses that reflect your personality. The more you use RIZZ the better your rizzponses get. This means that you&apos;ll always sound like yourself, but with a splash of extra charm!
          </p>

          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.6,
              color: "#4A485F",
              margin: 0,
            }}
          >
            So why wait? Download RIZZ now and experience the power of AI. Whether you&apos;re looking for love, trying to make a great impression, or simply want to keep the conversation going, we&apos;ve got you covered. With RIZZ as your wingman, you&apos;re sure to make a lasting connection.
          </p>
        </div>
      </div>
    </section>
  );
}
