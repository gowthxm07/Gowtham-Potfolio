"use client";

import { useState } from "react";
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
  const [activeSkillCategory, setActiveSkillCategory] = useState("AI / ML / GenAI");

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

  // 8 Continuous Section Interpolation Ranges
  const introStyle = getSectionStyle(-0.05, 0.0, 0.09, 0.13);
  const identityStyle = getSectionStyle(0.11, 0.15, 0.22, 0.26);
  const projectsStyle = getSectionStyle(0.24, 0.28, 0.38, 0.42);
  const academicsStyle = getSectionStyle(0.39, 0.43, 0.51, 0.55);
  const skillsStyle = getSectionStyle(0.53, 0.57, 0.65, 0.69);
  const achievementsStyle = getSectionStyle(0.67, 0.71, 0.78, 0.82);
  const resumeStyle = getSectionStyle(0.79, 0.83, 0.88, 0.92);
  const contactStyle = getSectionStyle(0.89, 0.93, 1.0, 1.05);

  const selectedProject = projectsData[activeProjectIdx] || projectsData[0];
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
      {/* 03. FEATURED PROJECTS SECTION (Right Side Alignment)         */}
      {/* ============================================================ */}
      <section
        style={projectsStyle}
        className="absolute inset-y-0 right-0 flex items-center w-full md:w-1/2 lg:w-5/12 p-6 md:pr-16 ml-auto transition-all duration-300"
      >
        <div className="bg-surface/85 border border-surface-border backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-lg shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[11px] font-mono text-emerald-400 tracking-widest uppercase flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5" />
              03 // FEATURED WORK
            </div>
            {/* Project Switcher Tabs */}
            <div className="flex gap-1.5 bg-surface-card p-1 rounded-lg border border-surface-border">
              {projectsData.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProjectIdx(idx)}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                    activeProjectIdx === idx
                      ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-bold font-mono text-white mb-2">
            {selectedProject.title}
          </h2>

          <p className="text-xs md:text-sm text-slate-300 mb-4 leading-relaxed font-sans">
            {selectedProject.shortDescription}
          </p>

          {/* Spatial Concept Tag */}
          <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-[11px] font-mono text-emerald-300 mb-4">
            <span className="text-slate-400 block text-[9px] uppercase tracking-wider mb-0.5">
              3D Spatial Anchor:
            </span>
            {selectedProject.visualConcept}
          </div>

          {/* Key Metrics / Highlights */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {selectedProject.metrics.slice(0, 2).map((m: string, i: number) => (
              <div key={i} className="p-2 rounded bg-surface-card border border-surface-border text-[11px] text-slate-300 font-sans">
                <span className="text-emerald-400 font-mono block text-[9px] uppercase">
                  Telemetry 0{i + 1}
                </span>
                {m}
              </div>
            ))}
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {selectedProject.technologies.map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-card text-slate-300 border border-surface-border"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={selectedProject.githubUrl}
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
      {/* 04. ACADEMIC DETAILS SECTION (Left Side Alignment)           */}
      {/* ============================================================ */}
      <section
        style={academicsStyle}
        className="absolute inset-y-0 left-0 flex items-center w-full md:w-1/2 lg:w-5/12 p-6 md:pl-16 transition-all duration-300"
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
        className="absolute inset-y-0 right-0 flex items-center w-full md:w-1/2 lg:w-5/12 p-6 md:pr-16 ml-auto transition-all duration-300"
      >
        <div className="bg-surface/85 border border-surface-border backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-lg shadow-2xl">
          <div className="text-[11px] font-mono text-emerald-400 tracking-widest uppercase mb-2 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5" />
            05 // SKILLS MATRIX & TECH STACK
          </div>

          <h2 className="text-xl md:text-2xl font-bold font-mono text-white mb-2">
            Engineering Constellation
          </h2>

          <p className="text-xs md:text-sm text-slate-300 mb-4 leading-relaxed font-sans">
            Comprehensive technical repertoire spanning systems programming, deep learning models, full-stack web, and rigorous software verification.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 mb-4 bg-surface-card/60 p-1 rounded-lg border border-surface-border">
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
              <div className="space-y-3 mb-4">
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
              Platforms & Infrastructure:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Docker", "Git", "GitHub", "Vercel", "Firebase", "Whisper.cpp", "Piper TTS"].map(
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
        className="absolute inset-y-0 left-0 flex items-center w-full md:w-1/2 lg:w-5/12 p-6 md:pl-16 transition-all duration-300"
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
        className="absolute inset-y-0 right-0 flex items-center w-full md:w-1/2 lg:w-5/12 p-6 md:pr-16 ml-auto transition-all duration-300"
      >
        <div className="bg-surface/85 border border-surface-border backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-lg shadow-2xl">
          <div className="text-[11px] font-mono text-emerald-400 tracking-widest uppercase mb-2 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            07 // OFFICIAL RESUME
          </div>

          <h2 className="text-xl md:text-2xl font-bold font-mono text-white mb-2">
            Verified Curriculum Vitae
          </h2>

          <p className="text-xs md:text-sm text-slate-300 mb-5 leading-relaxed font-sans">
            Complete technical credential documentation detailing academic standing at Amrita, competitive programming accomplishments, production-grade AI projects, and systems engineering experience.
          </p>

          <div className="p-3.5 rounded-xl bg-surface-card border border-surface-border space-y-2 mb-6 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Candidate:</span>
              <span className="text-white font-bold">{profileData.name}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Education:</span>
              <span className="text-emerald-400">B.Tech CS • GPA 8.12</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Format:</span>
              <span>Single-Page ATS Document (PDF)</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Verification:</span>
              <span className="text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Authenticated
              </span>
            </div>
          </div>

          {/* Primary View & Download CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="/assets/Gowtham_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 font-bold transition-colors"
            >
              <FileText className="w-4 h-4" />
              VIEW RESUME (PDF)
            </a>
            <a
              href="/assets/Gowtham_resume.pdf"
              download="Gowtham_resume.pdf"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono bg-surface hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors"
            >
              <Download className="w-4 h-4" />
              DOWNLOAD PDF
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 08. DIRECT CONTACT & TRANSMISSION (Right Side Alignment)     */}
      {/* ============================================================ */}
      <section
        style={contactStyle}
        className="absolute inset-y-0 right-0 flex items-center w-full md:w-1/2 lg:w-6/12 p-6 md:pr-16 ml-auto transition-all duration-300"
      >
        <div className="bg-surface/85 border border-surface-border backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-xl w-full shadow-2xl">
          <div className="text-[11px] font-mono text-emerald-400 tracking-widest uppercase mb-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            08 // DIRECT TRANSMISSION
          </div>

          <h2 className="text-xl md:text-2xl font-bold font-mono text-white mb-1">
            Initiate Connection
          </h2>

          <p className="text-xs text-slate-300 mb-4 font-sans">
            Reach out regarding software engineering roles, AI/ML inquiries, or technical opportunities. Direct transmissions route to{" "}
            <span className="text-emerald-400 font-mono">{profileData.email}</span>.
          </p>

          {/* Interactive Contact Form */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
