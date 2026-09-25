"use client";

import { STORY_SECTIONS, StorySectionDef } from "@/lib/storyTimeline";
import { profileData } from "@/data/profile";
import { FileText, ExternalLink } from "lucide-react";

interface MinimalHUDProps {
  progress: number;
  activeSection: StorySectionDef;
  activeSectionIndex: number;
  onScrollToSection: (index: number) => void;
}

export function MinimalHUD({
  progress,
  activeSection,
  activeSectionIndex,
  onScrollToSection,
}: MinimalHUDProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between p-6 md:p-8 select-none">
      {/* TOP STATUS BAR */}
      <div className="flex items-start justify-between">
        {/* Top-Left: Brand & Title */}
        <div className="pointer-events-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
              PORTFOLIO // SCROLL STORY
            </span>
          </div>
          <h1 className="text-base md:text-lg font-bold tracking-tight text-white font-mono uppercase">
            {profileData.name}
          </h1>
          <p className="text-[11px] font-mono text-slate-400">
            AI • SYSTEMS • COMPUTER SCIENCE • AMRITA
          </p>
        </div>

        {/* Top-Right: Active Section Telemetry & Actions */}
        <div className="pointer-events-auto flex items-center gap-2 md:gap-3">
          {/* Recruiter Quick-Jump Section Navigation */}
          <nav className="hidden xl:flex items-center gap-1 bg-surface/80 border border-surface-border/70 rounded-md p-0.5 backdrop-blur-md text-[11px] font-mono">
            {[
              { label: "Projects", idx: 2 },
              { label: "Academics", idx: 3 },
              { label: "Skills", idx: 4 },
              { label: "Achievements", idx: 5 },
              { label: "Resume", idx: 6 },
              { label: "Contact", idx: 7 },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => onScrollToSection(item.idx)}
                className={`px-2 py-1 rounded transition-colors ${
                  activeSectionIndex === item.idx
                    ? "bg-emerald-500/20 text-emerald-300 font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface/80 border border-surface-border text-[11px] font-mono text-slate-300 backdrop-blur-md">
            <span className="text-emerald-400">{activeSection.index}</span>
            <span className="text-slate-500">//</span>
            <span className="uppercase text-slate-200">{activeSection.id}</span>
          </div>

          <a
            href="/assets/Gowtham_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface/80 hover:bg-slate-800 border border-surface-border text-[11px] font-mono text-emerald-400 transition-colors backdrop-blur-md"
            title="Download Official Resume PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface/80 hover:bg-slate-800 border border-surface-border text-[11px] font-mono text-slate-300 transition-colors backdrop-blur-md"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* RIGHT SIDE VERTICAL STORY TRACKER */}
      <div className="pointer-events-auto absolute right-6 md:right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3">
        {/* Track Line with Progress Fill */}
        <div className="w-[2px] h-36 bg-surface-border relative rounded-full overflow-hidden">
          <div
            className="w-full bg-emerald-400 transition-all duration-150 ease-out"
            style={{ height: `${Math.min(100, Math.max(0, progress * 100))}%` }}
          />
        </div>

        {/* Section Quick Dots */}
        <div className="flex flex-col gap-2 pt-2">
          {STORY_SECTIONS.map((sec, idx) => {
            const isActive = activeSectionIndex === idx;
            return (
              <button
                key={sec.id}
                onClick={() => onScrollToSection(idx)}
                title={`${sec.index} // ${sec.title}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  isActive
                    ? "bg-emerald-400 scale-125 ring-2 ring-emerald-500/40"
                    : "bg-slate-700 hover:bg-slate-500"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* BOTTOM STATUS FOOTER */}
      <div className="flex items-end justify-between">
        <div className="text-[10px] font-mono text-slate-500">
          SPATIAL TIMELINE • SCROLL WHEEL DRIVEN
        </div>
        <div className="text-[10px] font-mono text-emerald-400/80">
          PROGRESS: {Math.round(progress * 100)}%
        </div>
      </div>
    </div>
  );
}
