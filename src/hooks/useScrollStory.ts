"use client";

import { useState, useEffect, useRef } from "react";
import { STORY_SECTIONS, StorySectionDef } from "@/lib/storyTimeline";

export interface ScrollStoryState {
  progress: number;
  activeSection: StorySectionDef;
  activeSectionIndex: number;
  scrollSection: (index: number) => void;
}

export function useScrollStory(): ScrollStoryState {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setProgress(currentProgress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Determine active section
  let activeSectionIndex = 0;
  for (let i = 0; i < STORY_SECTIONS.length; i++) {
    if (
      progress >= STORY_SECTIONS[i].range[0] &&
      progress <= STORY_SECTIONS[i].range[1]
    ) {
      activeSectionIndex = i;
      break;
    }
  }

  const scrollSection = (index: number) => {
    const targetSection = STORY_SECTIONS[index];
    if (!targetSection) return;
    const targetProgress = (targetSection.range[0] + targetSection.range[1]) / 2;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: targetProgress * maxScroll,
      behavior: "smooth",
    });
  };

  return {
    progress,
    activeSection: STORY_SECTIONS[activeSectionIndex],
    activeSectionIndex,
    scrollSection,
  };
}
