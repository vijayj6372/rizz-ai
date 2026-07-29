"use client";

import React, { useState, useRef, useEffect } from "react";
import { AlertCircle, X, RefreshCw } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { AppColors } from "@/constants/theme";

export type ErrorFallbackProps = {
  error: Error;
  resetErrorAction: () => void;
};

export function ErrorFallback({ error, resetErrorAction }: ErrorFallbackProps) {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isModalOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isModalOpen]);

  const handleRestart = () => {
    try {
      window.location.reload();
    } catch {
      resetErrorAction();
    }
  };

  const formatErrorDetails = (): string => {
    let details = `Error: ${error.message}\n\n`;
    if (error.stack) {
      details += `Stack Trace:\n${error.stack}`;
    }
    return details;
  };

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: theme.backgroundRoot,
        position: "relative",
      }}
    >
      {/* Dev-only: open error details button */}
      {isDev && (
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            position: "absolute",
            top: 40,
            right: 16,
            width: 44,
            height: 44,
            borderRadius: 18,
            backgroundColor: theme.backgroundDefault,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
          aria-label="View error details"
        >
          <AlertCircle size={20} color={theme.text} />
        </button>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          width: "100%",
          maxWidth: 600,
        }}
      >
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: theme.text,
            textAlign: "center",
            margin: 0,
          }}
        >
          Oops! Rizz AI hit a snag
        </h1>

        <p
          style={{
            fontSize: 16,
            color: theme.text,
            textAlign: "center",
            opacity: 0.7,
            margin: 0,
          }}
        >
          Something went wrong. Click below to get back to finding those perfect
          pickup lines.
        </p>

        <button
          onClick={handleRestart}
          style={{
            paddingTop: 16,
            paddingBottom: 16,
            paddingLeft: 24,
            paddingRight: 24,
            borderRadius: 18,
            backgroundColor: AppColors.primary,
            border: "none",
            cursor: "pointer",
            minWidth: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            transition: "opacity 0.15s, transform 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          <RefreshCw size={16} color="#FFFFFF" />
          <span style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>
            Restart Rizz AI
          </span>
        </button>
      </div>

      {/* Dev-only error detail modal */}
      {isDev && (
        <dialog
          ref={dialogRef}
          onClose={() => setIsModalOpen(false)}
          style={{
            width: "min(90vw, 700px)",
            maxHeight: "85vh",
            borderRadius: 24,
            border: "none",
            padding: 0,
            backgroundColor: theme.backgroundDefault,
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 16px 12px",
              borderBottom: "1px solid rgba(128,128,128,0.2)",
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: theme.text,
                margin: 0,
              }}
            >
              Error Details
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                borderRadius: 8,
              }}
              aria-label="Close"
            >
              <X size={24} color={theme.text} />
            </button>
          </div>

          <div
            style={{
              overflowY: "auto",
              padding: 16,
              maxHeight: "calc(85vh - 60px)",
            }}
          >
            <pre
              style={{
                fontSize: 12,
                lineHeight: 1.5,
                color: theme.text,
                fontFamily:
                  "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
                backgroundColor: theme.backgroundRoot,
                borderRadius: 12,
                padding: 16,
                margin: 0,
                userSelect: "text",
              }}
            >
              {formatErrorDetails()}
            </pre>
          </div>
        </dialog>
      )}
    </div>
  );
}
