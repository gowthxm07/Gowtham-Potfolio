"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Graceful initialization timer ensuring smooth initial WebGL asset upload
    const timer = setTimeout(() => {
      setFading(true);
      const hideTimer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 700);
      return () => clearTimeout(hideTimer);
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#040711] transition-opacity duration-700 pointer-events-none select-none ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center text-center px-6">
        {/* Monospace Badge */}
        <div className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          SYSTEM // 07
        </div>

        {/* Primary Name */}
        <h1 className="text-xl md:text-2xl font-extrabold tracking-widest text-white uppercase mb-1 font-mono">
          GOWTHAM HARI S
        </h1>

        {/* Status text */}
        <p className="text-xs font-mono text-slate-400 tracking-wider uppercase mb-6">
          INITIALIZING DIGITAL ENVIRONMENT...
        </p>

        {/* Restrained technical progress line */}
        <div className="w-48 h-[1px] bg-slate-800 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-full animate-[pulse_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
