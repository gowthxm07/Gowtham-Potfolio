"use client";

import { ZoneId } from "@/lib/cameraConfig";
import { profileData } from "@/data/profile";
import { FileText, Compass, UserCheck } from "lucide-react";

interface MinimalHUDProps {
  activeZone: ZoneId;
  onSelectZone: (zone: ZoneId) => void;
}

export function MinimalHUD({ activeZone, onSelectZone }: MinimalHUDProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex flex-col justify-between p-6 md:p-8 select-none">
      {/* TOP BAR */}
      <div className="flex items-start justify-between">
        {/* Top-Left: Brand & Title */}
        <div className="pointer-events-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
              PORTFOLIO // PHASE 3
            </span>
          </div>
          <h1 className="text-lg md:text-xl font-bold tracking-tight text-white font-mono uppercase">
            {profileData.name}
          </h1>
          <p className="text-xs font-mono text-slate-400">
            AI / SOFTWARE SYSTEMS • AMRITA VISHWA VIDHYAPEETHAM
          </p>
        </div>

        {/* Top-Right: Telemetry & Quick Action */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface/80 border border-slate-800 text-[11px] font-mono text-slate-300 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>CORE ONLINE</span>
          </div>
          <a
            href="/assets/Gowtham_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface/80 hover:bg-slate-800 border border-slate-700 text-[11px] font-mono text-cyan-300 transition-colors backdrop-blur-md"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>
      </div>

      {/* BOTTOM CONTROLS & CAMERA DOCK */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Bottom-Left: Active Zone Indicator */}
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface/80 border border-slate-800 text-xs font-mono text-slate-400 backdrop-blur-md">
          <span className="text-slate-500">ZONE:</span>
          <span className="text-cyan-400 uppercase font-semibold">
            {activeZone === "identity" ? "01 // IDENTITY MONOLITH" : "CENTRAL WORLD"}
          </span>
        </div>

        {/* Bottom-Center: Minimal Camera Switcher */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-lg bg-surface/90 border border-slate-800 backdrop-blur-md">
          <button
            onClick={() => onSelectZone("overview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
              activeZone === "overview"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Central World</span>
          </button>

          <button
            onClick={() => onSelectZone("identity")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
              activeZone === "identity"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>01 // Identity Focus</span>
          </button>
        </div>

        {/* Bottom-Right: Interaction Tip */}
        <div className="hidden md:block text-[11px] font-mono text-slate-500">
          Click monolith or buttons to inspect • Move mouse for parallax
        </div>
      </div>
    </div>
  );
}
