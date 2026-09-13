"use client";

import React, { useState, useMemo } from "react";
import { useLanguage, LANGUAGES, LanguageCode } from "@/context/LanguageContext";
import { TRANSLATIONS } from "@/data/translations";
import { Globe, ChevronRight, Check, X, Search } from "lucide-react";
import { CountryFlag } from "./CountryFlag";

export interface SettingsSheetProps {
  isOpen: boolean;
  onCloseAction?: () => void;
  onClose?: () => void;
}

export function SettingsSheet({
  isOpen,
  onCloseAction,
  onClose,
}: SettingsSheetProps) {
  const handleClose = onCloseAction || onClose || (() => {});
  const { language, setLanguage, currentLanguageOption } = useLanguage();
  const [langPickerOpen, setLangPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleSelectLanguage = (code: LanguageCode) => {
    setLanguage(code);
    setLangPickerOpen(false);
    setSearchQuery("");
  };

  const filteredLanguages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return LANGUAGES;
    return LANGUAGES.filter(
      (lang) =>
        lang.name.toLowerCase().includes(q) ||
        lang.nativeName.toLowerCase().includes(q) ||
        lang.code.toLowerCase().includes(q) ||
        lang.countryCode.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => {
          setLangPickerOpen(false);
          handleClose();
        }}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.55)",
          zIndex: 998,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transition: "opacity 0.3s ease",
          backdropFilter: isOpen ? "blur(4px)" : "none",
        }}
      />

      {/* Main Settings Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.settings}
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: `translateX(-50%) translateY(${isOpen ? "0%" : "105%"})`,
          width: "100%",
          maxWidth: 480,
          zIndex: 999,
          transition: "transform 0.38s cubic-bezier(0.34, 1.26, 0.64, 1)",
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          overflow: "hidden",
          background: "linear-gradient(180deg, #FF6C6D 0%, #FF865A 50%, #F69C50 100%)",
          padding: "12px 24px 44px",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.2)",
        }}
      >
        {/* Drag handle */}
        <div
          style={{
            width: 44,
            height: 4,
            borderRadius: 2,
            backgroundColor: "rgba(255,255,255,0.45)",
            margin: "0 auto 24px",
          }}
        />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h2
            style={{
              color: "#FFFFFF",
              fontSize: 22,
              fontWeight: 800,
              margin: 0,
              letterSpacing: 0.5,
              textShadow: "0 2px 4px rgba(0,0,0,0.15)",
            }}
          >
            {t.settings}
          </h2>
        </div>

        {/* Buttons List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Choose Language Button */}
          <button
            onClick={() => setLangPickerOpen(true)}
            id="settings-choose-language"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#FFFFFF",
              borderRadius: 999,
              padding: "14px 22px",
              fontSize: 16,
              fontWeight: 700,
              color: "#1a1a1a",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.92")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Globe size={20} color="#FF6C6D" />
              <span>{t.chooseLanguage}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0.9 }}>
              <CountryFlag
                countryCode={currentLanguageOption.countryCode}
                flagEmoji={currentLanguageOption.flag}
                size={20}
              />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>
                {currentLanguageOption.nativeName}
              </span>
              <ChevronRight size={18} color="#666" />
            </div>
          </button>

          {/* Retake Assessment Quiz */}
          <button
            onClick={() => {
              try {
                localStorage.removeItem("rizz_onboarded");
              } catch {}
              window.location.reload();
            }}
            id="settings-retake-quiz"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              backgroundColor: "#FFFFFF",
              borderRadius: 999,
              padding: "16px 24px",
              fontSize: 16,
              fontWeight: 700,
              color: "#1a1a1a",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.92")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
          >
            <span>{t.retakeQuizBtn}</span>
          </button>

          {/* Send us an Email */}
          <a
            href="mailto:vijayj6372@gmail.com"
            id="settings-email"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: 999,
              padding: "16px 24px",
              fontSize: 16,
              fontWeight: 700,
              color: "#1a1a1a",
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.92")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            {t.sendEmail}
          </a>

          {/* About me */}
          <a
            href="https://x.com/Vijay_Jadav_7"
            target="_blank"
            rel="noopener noreferrer"
            id="settings-about"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: 999,
              padding: "16px 24px",
              fontSize: 16,
              fontWeight: 700,
              color: "#1a1a1a",
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.92")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            {t.aboutMe}
          </a>
        </div>

        {/* Privacy Policy */}
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <a
            href="https://sites.google.com/view/rizz-ai-privacy-policy-com/home"
            target="_blank"
            rel="noopener noreferrer"
            id="settings-privacy"
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.95)",
              textDecoration: "underline",
              fontWeight: 600,
              letterSpacing: 0.2,
            }}
          >
            {t.privacyPolicy}
          </a>
        </div>
      </div>

      {/* Modern Language Picker Sub-Modal */}
      {langPickerOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            backgroundColor: "rgba(10, 10, 15, 0.68)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            backdropFilter: "blur(8px)",
          }}
          onClick={() => {
            setLangPickerOpen(false);
            setSearchQuery("");
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 420,
              maxHeight: "85vh",
              backgroundColor: "#FFFFFF",
              borderRadius: 28,
              padding: 22,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.8)",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 14,
                borderBottom: "1px solid #F0F0F3",
                marginBottom: 14,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #FFF0F2 0%, #FFE4E6 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Globe size={20} color="#FF5263" />
                </div>
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#111827",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {t.selectLanguageTitle}
                  </h3>
                  <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>
                    Select your preferred language
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setLangPickerOpen(false);
                  setSearchQuery("");
                }}
                aria-label="Close language selector"
                style={{
                  background: "#F3F4F6",
                  border: "none",
                  borderRadius: 14,
                  width: 34,
                  height: 34,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#E5E7EB")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#F3F4F6")}
              >
                <X size={18} color="#4B5563" />
              </button>
            </div>

            {/* Search Input Bar */}
            <div style={{ marginBottom: 14, position: "relative" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#F9FAFB",
                  borderRadius: 16,
                  border: "1.5px solid #E5E7EB",
                  padding: "10px 14px",
                  gap: 10,
                  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                }}
              >
                <Search size={18} color="#9CA3AF" />
                <input
                  type="text"
                  placeholder="Search language..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: "none",
                    background: "transparent",
                    outline: "none",
                    width: "100%",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#111827",
                  }}
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    style={{
                      border: "none",
                      background: "transparent",
                      padding: 0,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      color: "#9CA3AF",
                    }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Languages List */}
            <div
              style={{
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                paddingRight: 4,
                maxHeight: "360px",
              }}
            >
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((lang) => {
                  const isSelected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleSelectLanguage(lang.code)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 14px",
                        borderRadius: 16,
                        border: isSelected
                          ? "2px solid #FF5263"
                          : "1.5px solid #F3F4F6",
                        backgroundColor: isSelected ? "#FFF5F6" : "#FAFAFC",
                        cursor: "pointer",
                        transition: "all 0.15s ease-in-out",
                        boxShadow: isSelected
                          ? "0 4px 12px rgba(255, 82, 99, 0.12)"
                          : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F3F4F6";
                          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FAFAFC";
                          (e.currentTarget as HTMLButtonElement).style.transform = "none";
                        }
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <CountryFlag
                          countryCode={lang.countryCode}
                          flagEmoji={lang.flag}
                          size={26}
                        />
                        <div style={{ textAlign: "left" }}>
                          <div
                            style={{
                              fontSize: 15,
                              fontWeight: isSelected ? 800 : 700,
                              color: isSelected ? "#FF2A42" : "#1F2937",
                            }}
                          >
                            {lang.nativeName}
                          </div>
                          {lang.name !== lang.nativeName && (
                            <div
                              style={{
                                fontSize: 12,
                                color: "#6B7280",
                                fontWeight: 500,
                              }}
                            >
                              {lang.name}
                            </div>
                          )}
                        </div>
                      </div>

                      {isSelected && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            backgroundColor: "#FF5263",
                            color: "#FFFFFF",
                            padding: "4px 10px",
                            borderRadius: 20,
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          <Check size={14} strokeWidth={3} />
                          <span>Active</span>
                        </div>
                      )}
                    </button>
                  );
                })
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "32px 16px",
                    color: "#6B7280",
                  }}
                >
                  <p style={{ margin: "0 0 8px 0", fontSize: 14, fontWeight: 600 }}>
                    No languages match &quot;{searchQuery}&quot;
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    style={{
                      backgroundColor: "#F3F4F6",
                      border: "none",
                      padding: "6px 14px",
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#374151",
                      cursor: "pointer",
                    }}
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
