"use client";

import dynamic from "next/dynamic";
import { useScrollStory } from "@/hooks/useScrollStory";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";
import { StoryOverlay } from "@/components/ui/StoryOverlay";
import { MinimalHUD } from "@/components/ui/MinimalHUD";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { achievementsData } from "@/data/achievements";

// Dynamically import the 3D Scene with SSR disabled for optimal WebGL lifecycle
const Scene = dynamic(
  () => import("@/components/3d/Scene").then((mod) => mod.Scene),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function Home() {
  const { progress, activeSection, activeSectionIndex, scrollSection } =
    useScrollStory();
  const { isMobile, dpr } = useDeviceCapabilities();

  return (
    <div className="relative bg-[#030705] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* ============================================================ */}
      {/* 01. PINNED FULLSCREEN 3D & EDITORIAL STORY STAGE             */}
      {/* ============================================================ */}
      <div className="fixed inset-0 w-screen h-screen overflow-hidden z-10">
        {/* Loading Transition Screen */}
        <LoadingScreen />

        {/* Continuous 3D Story Canvas */}
        <Scene progress={progress} isMobile={isMobile} dpr={dpr} />

        {/* 2D Editorial Story Overlay Synchronized to 3D Space */}
        <StoryOverlay progress={progress} />

        {/* Minimal Persistent Technical HUD & Story Tracker */}
        <MinimalHUD
          progress={progress}
          activeSection={activeSection}
          activeSectionIndex={activeSectionIndex}
          onScrollToSection={scrollSection}
        />
      </div>

      {/* ============================================================ */}
      {/* 02. TALL SCROLL STORY CONTAINER (Drives 8-section 0..1 story) */}
      {/* ============================================================ */}
      <div className="relative z-0 h-[800vh] w-full pointer-events-none" />

      {/* ============================================================ */}
      {/* 03. SEMANTIC ACCESSIBILITY & SEO DOM LAYER                   */}
      {/* ============================================================ */}
      <div className="sr-only" aria-label="Portfolio Summary and Content">
        <h2>{profileData.name} - Professional Overview</h2>
        <p>
          {profileData.degree} at {profileData.institution}. Cumulative GPA: {profileData.gpa}.
        </p>
        <p>Contact: {profileData.email} | {profileData.phone} | {profileData.location}</p>

        <h3>Featured Engineering Projects</h3>
        <ul>
          {projectsData.map((p) => (
            <li key={p.id}>
              <h4>{p.title}</h4>
              <p>{p.fullDescription}</p>
              <p>Tech: {p.technologies.join(", ")}</p>
              <a href={p.githubUrl}>Repository</a>
            </li>
          ))}
        </ul>

        <h3>Academic Background</h3>
        <p>{profileData.institution} - {profileData.degree} ({profileData.period}) - GPA {profileData.gpa}</p>

        <h3>Technical Skills</h3>
        {skillsData.map((cat) => (
          <div key={cat.category}>
            <h4>{cat.category}</h4>
            <p>{cat.skills.join(", ")}</p>
          </div>
        ))}

        <h3>Competitive Achievements & Leadership</h3>
        <ul>
          {achievementsData.map((ach, idx) => (
            <li key={idx}>
              <h4>{ach.title}</h4>
              <p>{ach.subtitle}</p>
              <ul>
                {ach.details.map((d, dIdx) => (
                  <li key={dIdx}>{d}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <h3>Official Resume</h3>
        <a href="/assets/Gowtham_resume.pdf">Download Resume (PDF)</a>
      </div>
    </div>
  );
}
