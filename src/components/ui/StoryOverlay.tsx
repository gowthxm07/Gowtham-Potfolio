"use client";

import { projectsData } from "@/data/projects";
import { profileData } from "@/data/profile";
import { achievementsData } from "@/data/achievements";
import { smoothStep } from "@/lib/storyTimeline";
import { ExternalLink, FileText, Award, Terminal, Code2, ArrowDown } from "lucide-react";

interface StoryOverlayProps {
  progress: number;
}

export function StoryOverlay({ progress }: StoryOverlayProps) {
  // Helper to calculate opacity and subtle Y offset for each story section
  const getSectionStyle = (start: number, peakStart: number, peakEnd: number, end: number) => {
    let opacity = 0;
    let translateY = 20;

    if (progress >= start && progress < peakStart) {
      const t = smoothStep((progress - start) / (peakStart - start));
      opacity = t;
      translateY = (1 - t) * 24;
    } else if (progress >= peakStart && progress <= peakEnd) {
      opacity = 1;
      translateY = 0;
    } else if (progress > peakEnd && progress <= end) {
      const t = smoothStep((progress - peakEnd) / (end - peakEnd));
      opacity = 1 - t;
      translateY = -t * 24;
    }

    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      pointerEvents: opacity > 0.4 ? ("auto" as const) : ("none" as const),
      visibility: opacity > 0.01 ? ("visible" as const) : ("hidden" as const),
    };
  };

  const introStyle = getSectionStyle(-0.05, 0.0, 0.14, 0.22);
  const identityStyle = getSectionStyle(0.18, 0.26, 0.38, 0.48);
  const receptionistStyle = getSectionStyle(0.44, 0.52, 0.64, 0.72);
  const trafficStyle = getSectionStyle(0.68, 0.76, 0.88, 0.96);
  const horizonStyle = getSectionStyle(0.92, 0.96, 1.0, 1.05);

  const receptionistProject = projectsData.find((p) => p.id === "ai-smart-receptionist");
  const trafficProject = projectsData.find((p) => p.id === "real-time-traffic-monitoring");
  const leetcodeAch = achievementsData.find((a) => a.category === "Competitive Programming");

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden select-none">
      {/* ============================================================ */}
      {/* 01. INTRO HERO SECTION                                       */}
      {/* ============================================================ */}
      <section
        style={introStyle}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-all duration-300"
      >
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ENGINEERING PORTFOLIO // 2026
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase font-mono mb-4">
            {profileData.name}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-sans font-light max-w-2xl mx-auto mb-6">
            Computer Science Engineer focused on{" "}
            <span className="text-emerald-400 font-normal">AI / ML</span>,{" "}
            <span className="text-emerald-400 font-normal">Computer Vision</span>, and{" "}
            <span className="text-emerald-400 font-normal">High-Performance Systems</span>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 mb-10">
            <span className="px-2.5 py-1 rounded bg-surface border border-surface-border text-slate-300">
              Amrita Vishwa Vidhyapeetham
            </span>
            <span className="px-2.5 py-1 rounded bg-surface border border-surface-border text-emerald-400">
              LeetCode Knight [1868]
            </span>
            <span className="px-2.5 py-1 rounded bg-surface border border-surface-border text-slate-300">
              GPA 8.12
            </span>
          </div>

          {/* Scroll Cue */}
          <div className="flex flex-col items-center gap-2 text-xs font-mono text-emerald-400/80 animate-bounce">
            <span>SCROLL TO COMMENCE JOURNEY</span>
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 02. IDENTITY & CREDENTIALS SECTION (Left Side Alignment)     */}
      {/* ============================================================ */}
      <section
        style={identityStyle}
        className="absolute inset-y-0 left-0 flex items-center w-full md:w-1/2 lg:w-5/12 p-6 md:pl-16 transition-all duration-300"
      >
        <div className="bg-surface/85 border border-surface-border backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-lg shadow-2xl">
          <div className="text-[11px] font-mono text-emerald-400 tracking-widest uppercase mb-2 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            02 // IDENTITY & STANDING
          </div>

          <h2 className="text-2xl md:text-3xl font-bold font-mono text-white mb-2">
            {profileData.name}
          </h2>

          <p className="text-sm text-slate-300 mb-4 leading-relaxed font-sans">
            {profileData.degree} at {profileData.institution}. Team lead for competitive
            programming initiatives with proven record in algorithm design and full-stack software.
          </p>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            <div className="p-3 rounded-lg bg-surface-card border border-surface-border">
              <div className="text-[10px] font-mono text-slate-400">LeetCode Contest</div>
              <div className="text-base font-bold text-emerald-400 font-mono">1868 Peak</div>
              <div className="text-[10px] text-slate-400 font-mono">Knight Level (Top 4.96%)</div>
            </div>
            <div className="p-3 rounded-lg bg-surface-card border border-surface-border">
              <div className="text-[10px] font-mono text-slate-400">Problems Solved</div>
              <div className="text-base font-bold text-white font-mono">900+ Problems</div>
              <div className="text-[10px] text-slate-400 font-mono">C++ / Algorithms</div>
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono text-slate-300 border-t border-surface-border pt-4 mb-6">
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>DeltaBuild 2026 Winner • CodeRoyale Runner-Up</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 text-center text-emerald-400 font-bold">•</span>
              <span>DSA & Placement Team Lead (GeeksforGeeks Campus Body)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/assets/Gowtham_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              View Resume (PDF)
            </a>
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono bg-surface hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 03. PROJECT 01: AI RECEPTIONIST (Right Side Alignment)       */}
      {/* ============================================================ */}
      <section
        style={receptionistStyle}
        className="absolute inset-y-0 right-0 flex items-center w-full md:w-1/2 lg:w-5/12 p-6 md:pr-16 ml-auto transition-all duration-300"
      >
        <div className="bg-surface/85 border border-surface-border backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-lg shadow-2xl">
          <div className="text-[11px] font-mono text-emerald-400 tracking-widest uppercase mb-2 flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5" />
            03 // FEATURED WORK
          </div>

          <h2 className="text-xl md:text-2xl font-bold font-mono text-white mb-2">
            {receptionistProject?.title}
          </h2>

          <p className="text-sm text-slate-300 mb-4 leading-relaxed font-sans">
            {receptionistProject?.shortDescription}
          </p>

          {/* Spatial Concept Tag */}
          <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-[11px] font-mono text-emerald-300 mb-4">
            <span className="text-slate-400 block text-[9px] uppercase tracking-wider mb-0.5">
              3D Spatial Anchor:
            </span>
            {receptionistProject?.visualConcept}
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {receptionistProject?.technologies.map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-card text-slate-300 border border-surface-border"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={receptionistProject?.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Inspect Repository
          </a>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 04. PROJECT 02: TRAFFIC MONITORING (Left Side Alignment)     */}
      {/* ============================================================ */}
      <section
        style={trafficStyle}
        className="absolute inset-y-0 left-0 flex items-center w-full md:w-1/2 lg:w-5/12 p-6 md:pl-16 transition-all duration-300"
      >
        <div className="bg-surface/85 border border-surface-border backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-lg shadow-2xl">
          <div className="text-[11px] font-mono text-emerald-400 tracking-widest uppercase mb-2 flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5" />
            04 // COMPUTER VISION & EDGE
          </div>

          <h2 className="text-xl md:text-2xl font-bold font-mono text-white mb-2">
            {trafficProject?.title}
          </h2>

          <p className="text-sm text-slate-300 mb-4 leading-relaxed font-sans">
            {trafficProject?.shortDescription}
          </p>

          {/* Spatial Concept Tag */}
          <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-[11px] font-mono text-emerald-300 mb-4">
            <span className="text-slate-400 block text-[9px] uppercase tracking-wider mb-0.5">
              3D Spatial Anchor:
            </span>
            {trafficProject?.visualConcept}
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {trafficProject?.technologies.map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-card text-slate-300 border border-surface-border"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={trafficProject?.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Inspect Repository
          </a>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 05. HORIZON PREVIEW / CONTINUUM                              */}
      {/* ============================================================ */}
      <section
        style={horizonStyle}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-all duration-300"
      >
        <div className="max-w-xl bg-surface/80 border border-surface-border backdrop-blur-md rounded-2xl p-6 md:p-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            EXPERIENCE ENGINE // PROTOTYPE VERIFIED
          </div>

          <h3 className="text-xl md:text-2xl font-bold font-mono text-white mb-2">
            The Spatial Journey Continuum
          </h3>

          <p className="text-xs md:text-sm text-slate-300 mb-6 font-sans">
            Scroll-driven camera interpolation, true 3D spatial approach transitions, and editorial typography
            are verified. Ready for Phase 4 to introduce the remaining custom project environments.
          </p>

          <div className="text-[11px] font-mono text-slate-400">
            Scroll up to navigate in reverse • Mouse parallax active
          </div>
        </div>
      </section>
    </div>
  );
}
