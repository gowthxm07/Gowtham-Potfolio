"use client";

import dynamic from "next/dynamic";
import { useScrollStory } from "@/hooks/useScrollStory";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";
import { StoryOverlay } from "@/components/ui/StoryOverlay";
import { MinimalHUD } from "@/components/ui/MinimalHUD";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";

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
      {/* 02. TALL SCROLL STORY CONTAINER (Drives virtual 0..1 timeline)*/}
      {/* ============================================================ */}
      <div className="relative z-0 h-[500vh] w-full pointer-events-none" />

      {/* ============================================================ */}
      {/* 03. SEMANTIC ACCESSIBILITY & SEO DOM LAYER                   */}
      {/* ============================================================ */}
      <div className="sr-only" aria-label="Portfolio Summary and Content">
        <h2>{profileData.name} - Professional Overview</h2>
        <p>
          {profileData.degree} at {profileData.institution}. GPA: {profileData.gpa}.
        </p>
        <h3>Featured Engineering Work:</h3>
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
      </div>
    </div>
  );
}
