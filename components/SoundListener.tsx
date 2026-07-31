"use client";

import { useEffect } from "react";
import { playClickSound, preloadClickSound } from "@/lib/sound";

export function SoundListener() {
  useEffect(() => {
    // Preload click sound buffer
    preloadClickSound();

    const handlePointerDown = (e: PointerEvent | MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if target or any ancestor is a button, link, or interactive element
      const interactiveEl = target.closest(
        'button, a, [role="button"], input[type="submit"], input[type="button"], .home-feature-btn, [data-sound]'
      );

      if (interactiveEl) {
        playClickSound();
      }
    };

    // Preload on first user interaction to satisfy browser autoplay requirements
    const handleFirstUserInteraction = () => {
      preloadClickSound();
      window.removeEventListener("pointerdown", handleFirstUserInteraction);
      window.removeEventListener("touchstart", handleFirstUserInteraction);
    };

    window.addEventListener("pointerdown", handleFirstUserInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstUserInteraction, { once: true });

    // Global listener for clicks/pointerdown
    document.addEventListener("pointerdown", handlePointerDown, { capture: true, passive: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstUserInteraction);
      window.removeEventListener("touchstart", handleFirstUserInteraction);
      document.removeEventListener("pointerdown", handlePointerDown, { capture: true });
    };
  }, []);

  return null;
}
