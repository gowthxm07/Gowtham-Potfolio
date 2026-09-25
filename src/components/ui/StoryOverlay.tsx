"use client";

import { useState, useEffect } from "react";
import { projectsData } from "@/data/projects";
import { profileData } from "@/data/profile";
import { achievementsData } from "@/data/achievements";
import { skillsData, coreStrengths } from "@/data/skills";
import { smoothStep } from "@/lib/storyTimeline";
import { ContactForm } from "./ContactForm";
import {
  ExternalLink,
  FileText,
  Award,
  Terminal,
  Code2,
  GraduationCap,
  Cpu,
  Download,
  ArrowDown,
  Layers,
  CheckCircle2,
  Sparkles,
  Flame,
  Globe,
} from "lucide-react";

interface StoryOverlayProps {
  progress: number;
}

export function StoryOverlay({ progress }: StoryOverlayProps) {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeSkillCategory, setActiveSkillCategory] = useState("Programming Languages");

  // Automatically sync active project tab with scroll progress using handoff midpoints
  useEffect(() => {
    if (progress < 0.2487) {
      setActiveProjectIdx(0);
    } else if (progress < 0.2987) {
      setActiveProjectIdx(1);
    } else if (progress < 0.3487) {
      setActiveProjectIdx(2);
    } else if (progress < 0.3987) {
      setActiveProjectIdx(3);
    } else if (progress < 0.4487) {
      setActiveProjectIdx(4);
    } else {
      setActiveProjectIdx(5);
    }
  }, [progress]);

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

  // Helper to calculate individual project content style with sequential eased dissolve
  const getProjectContentStyle = (idx: number) => {
    // 6 projects across [0.20, 0.50] with calm, cinematic sequential dissolve:
    // Old content fades out (1 -> 0) over a 2x longer distance, brief 3D transit breathing space, new content fades in (0 -> 1)
    const ranges = [
      { start: 0.1850, peakStart: 0.2150, peakEnd: 0.2410, end: 0.2480 },
      { start: 0.2495, peakStart: 0.2570, peakEnd: 0.2910, end: 0.2980 },
      { start: 0.2995, peakStart: 0.3070, peakEnd: 0.3410, end: 0.3480 },
      { start: 0.3495, peakStart: 0.3570, peakEnd: 0.3910, end: 0.3980 },
      { start: 0.3995, peakStart: 0.4070, peakEnd: 0.4410, end: 0.4480 },
      { start: 0.4495, peakStart: 0.4570, peakEnd: 0.4850, end: 0.5150 },
    ];
    const r = ranges[idx];
    let opacity = 0;
    let translateY = 12;

    if (progress >= r.start && progress < r.peakStart) {
      const t = smoothStep((progress - r.start) / (r.peakStart - r.start));
      opacity = t;
      translateY = (1 - t) * 12;
    } else if (progress >= r.peakStart && progress <= r.peakEnd) {
      opacity = 1;
      translateY = 0;
    } else if (progress > r.peakEnd && progress <= r.end) {
      const t = smoothStep((progress - r.peakEnd) / (r.end - r.peakEnd));
      opacity = 1 - t;
      translateY = -t * 12;
    }

    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      pointerEvents: opacity > 0.4 ? ("auto" as const) : ("none" as const),
      visibility: opacity > 0.01 ? ("visible" as const) : ("hidden" as const),
    };
  };

  const scrollToProject = (idx: number) => {
    setActiveProjectIdx(idx);
    const centers = [0.228, 0.274, 0.324, 0.374, 0.424, 0.471];
    const targetProgress = centers[idx];
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: targetProgress * maxScroll,
      behavior: "smooth",
    });
  };

  // 8 Continuous Section Interpolation Ranges (expanded to 0.040 transition windows for cinematic pacing)
  const introStyle = getSectionStyle(-0.05, 0.0, 0.065, 0.105);
  const identityStyle = getSectionStyle(0.085, 0.125, 0.170, 0.210);
  const projectsStyle = getSectionStyle(0.185, 0.225, 0.475, 0.515);
  const academicsStyle = getSectionStyle(0.485, 0.525, 0.575, 0.615);
  const skillsStyle = getSectionStyle(0.585, 0.625, 0.695, 0.735);
  const achievementsStyle = getSectionStyle(0.705, 0.745, 0.795, 0.835);
  const resumeStyle = getSectionStyle(0.805, 0.845, 0.885, 0.925);
  const contactStyle = getSectionStyle(0.895, 0.935, 1.0, 1.05);
  const competitiveAch = achievementsData.find((a) => a.category === "Competitive Programming");
  const leadershipAch = achievementsData.find((a) => a.category === "Leadership");
  const hackathonsAch = achievementsData.find((a) => a.category === "Hackathons");

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden select-none">
      {/* ============================================================ */}
      {/* 01. INTRO HERO SECTION                                       */}
      {/* ============================================================ */}
      <section
        style={introStyle}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
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
        className="absolute inset-y-0 left-0 flex items-center w-full md:w-1/2 lg:w-5/12 p-6 md:pl-16"
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
      {/* 03. FEATURED PROJECTS SECTION (Right Side Alignment)         */}
      {/* ============================================================ */}
      <section
        style={projectsStyle}
        className="absolute inset-y-0 right-0 flex items-center w-full md:w-1/2 lg:w-5/12 p-6 md:pr-16 ml-auto pointer-events-auto"
      >
        <div className="bg-surface/85 border border-surface-border backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-lg shadow-2xl w-full max-h-[88vh] overflow-y-auto">
          {/* Unified Stable Header with Switcher Tabs */}
          <div className="flex items-center justify-between mb-2">
            <div
              className={`text-[11px] font-mono tracking-widest uppercase flex items-center gap-2 transition-colors duration-200 ${
                activeProjectIdx === 5
                  ? "text-purple-400"
                  : activeProjectIdx === 4
                  ? "text-blue-400"
                  : "text-emerald-400"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              {activeProjectIdx === 0
                ? "01 // AI & REAL-TIME SYSTEMS"
                : activeProjectIdx === 1
                ? "02 // COMPUTER VISION & EDGE"
                : activeProjectIdx === 2
                ? "03 // PRIVACY-PRESERVING EDGE VIDEO CARTOONIFIER"
                : activeProjectIdx === 3
                ? "04 // TWO-SIDED INDUSTRIAL LABOR MARKETPLACE"
                : activeProjectIdx === 4
                ? "05 // CORPORATE MANUFACTURING & PRINTING"
                : "06 // SIMULATED SMART HOME DECISION ENGINE"}
            </div>
            {/* Project Switcher Tabs */}
            <div className="flex gap-1.5 bg-surface-card p-1 rounded-lg border border-surface-border">
              {projectsData.slice(0, 6).map((p, pIdx) => (
                <button
                  key={p.id}
                  onClick={() => scrollToProject(pIdx)}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                    activeProjectIdx === pIdx
                      ? pIdx === 5
                        ? "bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40"
                        : pIdx === 4
                        ? "bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40"
                        : "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  0{pIdx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Project Content Area with Eased Sequential Dissolve in CSS Grid */}
          <div data-project-grid className="grid grid-cols-1 grid-rows-1">
            {projectsData.slice(0, 6).map((project, idx) => {
              const contentStyle = getProjectContentStyle(idx);
              const isJev = project.id === "smart-home-automation-jev";
              const isShree = project.id === "shree-labels-corporate";
              const accentTextColor = isJev
                ? "text-purple-400"
                : isShree
                ? "text-blue-400"
                : "text-emerald-400";
              const anchorTextColor = isJev
                ? "text-purple-300"
                : isShree
                ? "text-blue-300"
                : "text-emerald-300";
              const repoBtnColor = isJev
                ? "bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/40 text-purple-300"
                : isShree
                ? "bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/40 text-blue-300"
                : "bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300";

              return (
                <div
                  key={project.id}
                  data-project-index={idx}
                  style={{
                    gridArea: "1 / 1 / 2 / 2",
                    opacity: contentStyle.opacity,
                    transform: contentStyle.transform,
                    pointerEvents: contentStyle.pointerEvents,
                    visibility: contentStyle.visibility,
                  }}
                >
                  <h2 className="text-xl md:text-2xl font-bold font-mono text-white mb-2">
                    {project.title}
                  </h2>

                  <p className="text-xs md:text-sm text-slate-300 mb-3.5 leading-relaxed font-sans">
                    {project.id === "ai-smart-receptionist"
                      ? "Autonomous multi-tenant conversational receptionist platform automating appointment bookings with local Whisper.cpp and Piper speech runtimes, deterministic dialogue state management (< 2ms), and PostgreSQL persistence."
                      : project.shortDescription}
                  </p>

                  {/* Architecture Pipeline Indicator for AI Receptionist */}
                  {project.id === "ai-smart-receptionist" && (
                    <div className="mb-3.5 p-2 rounded-lg bg-emerald-950/20 border border-emerald-800/40">
                      <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        SYSTEM ARCHITECTURE PIPELINE
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-slate-300 flex-wrap">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">PHONE</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">VOICE</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">AI CORE</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">DATABASE</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">APPOINTMENT</span>
                      </div>
                    </div>
                  )}

                  {/* Architecture Pipeline Indicator for Traffic CV Monitoring */}
                  {project.id === "real-time-traffic-monitoring" && (
                    <div className="mb-3.5 p-2 rounded-lg bg-emerald-950/20 border border-emerald-800/40">
                      <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        EDGE COMPUTER VISION PIPELINE
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-slate-300 flex-wrap">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">640x480 VIDEO</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">OPENCV</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">YOLOV8 NANO</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">YOLOV8 TRACKING</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">FIRESTORE SYNC</span>
                      </div>
                    </div>
                  )}

                  {/* Architecture Pipeline Indicator for Edge Video Cartoonifier */}
                  {project.id === "edge-video-cartoonifier" && (
                    <div className="mb-3.5 p-2 rounded-lg bg-emerald-950/20 border border-emerald-800/40">
                      <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        DETERMINISTIC COMPUTER VISION PIPELINE
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-slate-300 flex-wrap">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">WEBCAM / MP4</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">OPENCV</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">FACE PRIVACY + MOG2</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">DUAL-PATH CARTOON</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">BITWISE FUSION</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">MJPEG STREAM</span>
                      </div>
                    </div>
                  )}

                  {/* Architecture Pipeline Indicator for LaborLink */}
                  {project.id === "laborlink" && (
                    <div className="mb-3.5 p-2 rounded-lg bg-emerald-950/20 border border-emerald-800/40">
                      <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        INDUSTRIAL MATCHING & HIRING PIPELINE
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-slate-300 flex-wrap">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">WORKER / FACTORY</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">FIREBASE AUTH</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">FIRESTORE</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">MATCH ENGINE</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">FAIRNESS FILTER</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">GEMINI REASONING</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">MUTUAL ACCEPTANCE</span>
                        <span className="text-emerald-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">CONTACT UNLOCK</span>
                      </div>
                    </div>
                  )}

                  {/* Architecture Pipeline Indicator for Shree Labels */}
                  {project.id === "shree-labels-corporate" && (
                    <div className="mb-3.5 p-2 rounded-lg bg-blue-950/20 border border-blue-800/40">
                      <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                        MANUFACTURING & SPECIMEN PIPELINE
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-slate-300 flex-wrap">
                        <span className="px-1.5 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/60 font-semibold">BRAND</span>
                        <span className="text-blue-400">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/60 font-semibold">MATERIAL</span>
                        <span className="text-blue-400">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/60 font-semibold">PRINT</span>
                        <span className="text-blue-400">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/60 font-semibold">FINISH</span>
                        <span className="text-blue-400">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/60 font-semibold">SUSTAINABILITY</span>
                        <span className="text-blue-400">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/60 font-semibold">CERTIFICATION</span>
                        <span className="text-blue-400">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/60 font-semibold">TRUST</span>
                        <span className="text-blue-400">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/60 font-semibold">QUOTE</span>
                      </div>
                    </div>
                  )}

                  {/* Architecture Pipeline Indicator for HomeMind / Jev */}
                  {project.id === "smart-home-automation-jev" && (
                    <div className="mb-3.5 p-2 rounded-lg bg-purple-950/20 border border-purple-800/40">
                      <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                        STRUCTURED DECISION ENGINE PIPELINE
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-slate-300 flex-wrap">
                        <span className="px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60 font-semibold">HOME STATE</span>
                        <span className="text-purple-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60 font-semibold">USER INTENT</span>
                        <span className="text-purple-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60 font-semibold">CONTEXT</span>
                        <span className="text-purple-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60 font-semibold">JEV SYSTEM ONE</span>
                        <span className="text-purple-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60 font-semibold">POLICY DISPATCH</span>
                        <span className="text-purple-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60 font-semibold">REDUNDANCY FILTER</span>
                        <span className="text-purple-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60 font-semibold">SIM VALIDATION</span>
                        <span className="text-purple-500">→</span>
                        <span className="px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60 font-semibold">UPDATED STATE</span>
                      </div>
                    </div>
                  )}

                  {/* Spatial Concept Tag */}
                  <div
                    className={`p-2.5 rounded-lg bg-surface-card border border-surface-border text-[11px] font-mono mb-3.5 ${anchorTextColor}`}
                  >
                    <span className="text-slate-400 block text-[9px] uppercase tracking-wider mb-0.5">
                      3D Spatial Anchor:
                    </span>
                    {project.visualConcept}
                  </div>

                  {/* Key Metrics / Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3.5">
                    {project.metrics.slice(0, 4).map((m: string, i: number) => (
                      <div key={i} className="p-2 rounded bg-surface-card border border-surface-border text-[11px] text-slate-300 font-sans">
                        <span
                          className={`font-mono block text-[9px] uppercase ${accentTextColor}`}
                        >
                          Telemetry 0{i + 1}
                        </span>
                        {m}
                      </div>
                    ))}
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-card text-slate-300 border border-surface-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-colors ${repoBtnColor}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Inspect Repository
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/40 text-blue-300 transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        Live Production
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 04. ACADEMIC DETAILS SECTION (Left Side Alignment)           */}
      {/* ============================================================ */}
      <section
        style={academicsStyle}
        className="absolute inset-y-0 left-0 flex items-center w-full md:w-1/2 lg:w-5/12 p-6 md:pl-16"
      >
        <div className="bg-surface/85 border border-surface-border backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-lg shadow-2xl">
          <div className="text-[11px] font-mono text-emerald-400 tracking-widest uppercase mb-2 flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5" />
            04 // ACADEMIC DETAILS
          </div>

          <h2 className="text-xl md:text-2xl font-bold font-mono text-white mb-1">
            {profileData.institution}
          </h2>

          <div className="text-xs font-mono text-emerald-400 mb-3">
            {profileData.degree} • {profileData.period}
          </div>

          <p className="text-xs md:text-sm text-slate-300 mb-4 leading-relaxed font-sans">
            Undergraduate engineering curriculum emphasizing core computer science fundamentals, algorithm efficiency,
            system architecture, and modern artificial intelligence pipelines.
          </p>

          {/* Academic Highlights Grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            <div className="p-3 rounded-lg bg-surface-card border border-surface-border">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Cumulative GPA</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">{profileData.gpa}</div>
              <div className="text-[10px] text-slate-400 font-mono">First Class Standing</div>
            </div>
            <div className="p-3 rounded-lg bg-surface-card border border-surface-border">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Campus Role</div>
              <div className="text-xs font-bold text-white font-mono mt-1">GFG Placement Lead</div>
              <div className="text-[10px] text-slate-400 font-mono">DSA Peer Mentorship</div>
            </div>
          </div>

          {/* Coursework Focus */}
          <div className="border-t border-surface-border pt-4">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
              Key Coursework & Domains:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Data Structures & Algorithms",
                "Operating Systems",
                "DBMS & SQL",
                "Computer Networks",
                "Machine Learning",
                "Software Testing",
              ].map((c) => (
                <span
                  key={c}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-card text-slate-300 border border-surface-border"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 05. SKILLS & TECHNOLOGIES SECTION (Right Side Alignment)     */}
      {/* ============================================================ */}
      <section
        style={skillsStyle}
        className="absolute inset-y-0 right-0 flex items-center w-full md:w-1/2 lg:w-5/12 p-6 md:pr-16 ml-auto"
      >
        <div className="bg-surface/85 border border-surface-border backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-lg shadow-2xl">
          <div className="text-[11px] font-mono text-emerald-400 tracking-widest uppercase mb-2 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5" />
            05 // SKILLS MATRIX & TECH STACK
          </div>

          <h2 className="text-xl md:text-2xl font-bold font-mono text-white mb-2">
            Technical Capabilities & Stack
          </h2>

          <p className="text-xs md:text-sm text-slate-300 mb-3.5 leading-relaxed font-sans">
            Recruiter-ready technical repertoire grounded in verified project systems, competitive algorithms, and full-stack software development.
          </p>

          {/* Core Strengths Bar */}
          <div className="flex flex-wrap gap-1.5 mb-3.5 pb-2.5 border-b border-surface-border">
            {coreStrengths.map((strength) => (
              <span
                key={strength}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-800/50"
              >
                ★ {strength}
              </span>
            ))}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 mb-3.5 bg-surface-card/60 p-1 rounded-lg border border-surface-border">
            {skillsData.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveSkillCategory(cat.category)}
                className={`text-[10px] font-mono px-2 py-1 rounded transition-colors ${
                  activeSkillCategory === cat.category
                    ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* Selected Category Skill Pills */}
          {(() => {
            const currentCat =
              skillsData.find((c) => c.category === activeSkillCategory) || skillsData[0];
            return (
              <div className="space-y-2.5 mb-3.5">
                <div className="text-xs text-slate-300 font-sans italic">
                  {currentCat.description}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentCat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-surface-card text-emerald-300 border border-emerald-800/40 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Dedicated Tools Subsection */}
          <div className="border-t border-surface-border pt-3">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-emerald-400" />
              Verified Engineering Tools:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Git", "GitHub", "Docker", "Vitest", "Jest", "Vercel", "Cloudinary", "Whisper.cpp", "Piper TTS"].map(
                (tool) => (
                  <span
                    key={tool}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-card text-slate-300 border border-surface-border"
                  >
                    {tool}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 06. ACHIEVEMENTS & LEADERSHIP SECTION (Left Side Alignment)  */}
      {/* ============================================================ */}
      <section
        style={achievementsStyle}
        className="absolute inset-y-0 left-0 flex items-center w-full md:w-1/2 lg:w-5/12 p-6 md:pl-16"
      >
        <div className="bg-surface/85 border border-surface-border backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-lg shadow-2xl">
          <div className="text-[11px] font-mono text-emerald-400 tracking-widest uppercase mb-2 flex items-center gap-2">
            <Award className="w-3.5 h-3.5" />
            06 // ACHIEVEMENTS & LEADERSHIP
          </div>

          <h2 className="text-xl md:text-2xl font-bold font-mono text-white mb-2">
            Competitive Standing
          </h2>

          {/* LeetCode Knight Card */}
          <div className="p-3.5 rounded-xl bg-surface-card border border-surface-border mb-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-white uppercase">
                  {competitiveAch?.title}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                KNIGHT
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center my-2.5">
              <div className="bg-surface/60 p-1.5 rounded border border-surface-border">
                <div className="text-[9px] font-mono text-slate-400">RATING</div>
                <div className="text-sm font-bold text-emerald-400 font-mono">1868</div>
              </div>
              <div className="bg-surface/60 p-1.5 rounded border border-surface-border">
                <div className="text-[9px] font-mono text-slate-400">SOLVED</div>
                <div className="text-sm font-bold text-white font-mono">900+</div>
              </div>
              <div className="bg-surface/60 p-1.5 rounded border border-surface-border">
                <div className="text-[9px] font-mono text-slate-400">GLOBAL</div>
                <div className="text-sm font-bold text-emerald-400 font-mono">Top 4.96%</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 font-sans">
              Algorithmic mastery in Dynamic Programming, Graph Algorithms, and Data Structure design.
            </p>
          </div>

          {/* Leadership & Hackathons */}
          <div className="space-y-2.5">
            <div className="p-3 rounded-lg bg-surface-card border border-surface-border">
              <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold mb-0.5">
                {leadershipAch?.title}
              </div>
              <div className="text-[10px] font-mono text-slate-400 mb-1">
                {leadershipAch?.subtitle} ({leadershipAch?.period})
              </div>
              <p className="text-[11px] text-slate-300 font-sans">
                Mentored university peers in technical interview preparation, conducted mock evaluations, and coordinated campus-wide coding contests.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-surface-card border border-surface-border">
              <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold mb-1">
                Hackathon Accolades
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                <span className="text-emerald-300 font-bold">• DeltaBuild 2026 Winner</span>
                <span>• CodeRoyale Runner-Up</span>
                <span>• SRM HackRush 1.0 Finalist</span>
                <span>• Hacktide Finalist</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 07. OFFICIAL RESUME SECTION (Right Side Alignment)           */}
      {/* ============================================================ */}
      <section
        style={resumeStyle}
        className="absolute inset-y-0 right-0 flex items-center w-full md:w-1/2 lg:w-5/12 p-6 md:pr-16 ml-auto"
      >
        <div className="bg-surface/85 border border-surface-border backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-lg shadow-2xl">
          <div className="text-[11px] font-mono text-emerald-400 tracking-widest uppercase mb-2 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            07 // OFFICIAL RESUME
          </div>

          <h2 className="text-xl md:text-2xl font-bold font-mono text-white mb-1">
            Curriculum Vitae
          </h2>
          <div className="text-xs font-mono text-emerald-400 mb-3">
            {profileData.name} • Verified Technical Credentials
          </div>

          <p className="text-xs md:text-sm text-slate-300 mb-4 leading-relaxed font-sans">
            Single-page ATS documentation detailing academic standing at Amrita Vishwa Vidhyapeetham (GPA 8.12), competitive programming achievements (LeetCode Knight, 1868 peak), hackathon accolades, and production software engineering projects.
          </p>

          <div className="p-3.5 rounded-xl bg-surface-card border border-surface-border space-y-2 mb-5 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Candidate:</span>
              <span className="text-white font-bold">{profileData.name}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Education:</span>
              <span className="text-emerald-400">{profileData.degree} • GPA {profileData.gpa}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Competitive:</span>
              <span className="text-emerald-300">LeetCode Knight [1868] (Top 4.96%)</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Source:</span>
              <span className="text-slate-200">Single-Page ATS Document (PDF)</span>
            </div>
          </div>

          {/* Primary View & Download CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="/assets/Gowtham_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View official resume PDF in a new tab"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 font-bold transition-colors"
            >
              <FileText className="w-4 h-4" />
              VIEW RESUME (PDF)
            </a>
            <a
              href="/assets/Gowtham_resume.pdf"
              download="Gowtham_resume.pdf"
              aria-label="Download official resume PDF"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono bg-surface hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors"
            >
              <Download className="w-4 h-4" />
              DOWNLOAD RESUME
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 08. CONNECT WITH ME / CONTACT (Right Side Alignment)         */}
      {/* ============================================================ */}
      <section
        style={contactStyle}
        className="absolute inset-y-0 right-0 flex items-center w-full md:w-1/2 lg:w-6/12 p-6 md:pr-16 ml-auto"
      >
        <div className="bg-surface/85 border border-surface-border backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-xl w-full shadow-2xl">
          <div className="text-[11px] font-mono text-emerald-400 tracking-widest uppercase mb-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            08 // CONNECT WITH ME
          </div>

          <h2 className="text-xl md:text-2xl font-bold font-mono text-white mb-1">
            Connect With Me
          </h2>

          <p className="text-xs text-slate-300 mb-4 font-sans leading-relaxed">
            Have a project, opportunity, or idea? Let's build something meaningful. Direct inquiries route to{" "}
            <span className="text-emerald-400 font-mono">{profileData.email}</span>.
          </p>

          {/* Interactive Contact Form */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
