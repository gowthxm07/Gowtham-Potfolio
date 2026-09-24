"use client";

import { useState, useEffect } from "react";

export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isTouch: boolean;
  prefersReducedMotion: boolean;
  dpr: number;
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    isTablet: false,
    isTouch: false,
    prefersReducedMotion: false,
    dpr: 1,
  });

  useEffect(() => {
    const checkCapabilities = () => {
      const width = window.innerWidth;
      const isTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-expect-error - msMaxTouchPoints is vendor-specific
        navigator.msMaxTouchPoints > 0;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const rawDpr = window.devicePixelRatio || 1;
      // Cap DPR to 1.5 for performance to ensure smooth 60fps on retina screens
      const dpr = Math.min(rawDpr, 1.75);

      setCapabilities({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isTouch,
        prefersReducedMotion,
        dpr,
      });
    };

    checkCapabilities();
    window.addEventListener("resize", checkCapabilities);
    return () => window.removeEventListener("resize", checkCapabilities);
  }, []);

  return capabilities;
}
