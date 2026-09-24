"use client";

import { useState, useCallback } from "react";

export type ExperienceMode = "immersive" | "recruiter";

export function useExperienceMode(defaultMode: ExperienceMode = "immersive") {
  const [mode, setMode] = useState<ExperienceMode>(defaultMode);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "immersive" ? "recruiter" : "immersive"));
  }, []);

  return { mode, setMode, toggleMode };
}
