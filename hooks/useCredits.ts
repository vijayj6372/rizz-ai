"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCallback } from "react";

const CREDITS_KEY = "rizz_credits";
const INITIAL_CREDITS = 10;

export function useCredits() {
  const [credits, setCredits] = useLocalStorage<number>(
    CREDITS_KEY,
    INITIAL_CREDITS
  );

  const useCredit = useCallback((): boolean => {
    if (credits <= 0) return false;
    setCredits((prev) => Math.max(0, prev - 1));
    return true;
  }, [credits, setCredits]);

  const addCredits = useCallback(
    (amount = 5) => {
      setCredits((prev) => prev + amount);
    },
    [setCredits]
  );

  const resetCredits = useCallback(() => {
    setCredits(INITIAL_CREDITS);
  }, [setCredits]);

  return { credits, useCredit, addCredits, resetCredits };
}
