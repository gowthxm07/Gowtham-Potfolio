"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { StoryEnvironment } from "./StoryEnvironment";
import { StoryIdentityObject } from "./StoryIdentityObject";
import { StoryReceptionistObject } from "./StoryReceptionistObject";
import { StoryTrafficObject } from "./StoryTrafficObject";
import { StoryCartoonifierObject } from "./StoryCartoonifierObject";
import { StoryLaborLinkObject } from "./StoryLaborLinkObject";
import { StoryShreeLabelsObject } from "./StoryShreeLabelsObject";
import { StoryJevObject } from "./StoryJevObject";
import { StoryAcademicsObject } from "./StoryAcademicsObject";
import { StorySkillsConstellation } from "./StorySkillsConstellation";
import { StoryAchievementsObject } from "./StoryAchievementsObject";
import { StoryResumeObject } from "./StoryResumeObject";
import { StoryContactObject } from "./StoryContactObject";
import { StoryCameraController } from "./StoryCameraController";

interface SceneProps {
  progress: number;
  isMobile?: boolean;
  dpr?: number;
}

export function Scene({ progress, isMobile = false, dpr = 1.5 }: SceneProps) {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#030705] overflow-hidden">
      <Canvas
        shadows
        dpr={dpr}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        camera={{
          position: [0, 1.4, 7.2],
          fov: 42,
          near: 0.1,
          far: 60,
        }}
      >
        <color attach="background" args={["#030705"]} />
        <StoryEnvironment />
        <StoryCameraController progress={progress} isMobile={isMobile} />

        <Suspense fallback={null}>
          {/* 02. Identity & Verified Portrait Monolith */}
          <StoryIdentityObject progress={progress} />

          {/* 03. Featured Engineering Systems: Section 03 Project Sextet */}
          {/* Chapter 01: AI Smart Receptionist Platform */}
          <StoryReceptionistObject
            progress={progress}
            range={[0.20, 0.25]}
            anchorX={isMobile ? -0.15 : -0.85}
          />
          {/* Chapter 02: Real-Time Traffic Computer Vision Experience */}
          <StoryTrafficObject
            progress={progress}
            range={[0.25, 0.30]}
            anchorX={isMobile ? -0.15 : -0.85}
          />
          {/* Chapter 03: Privacy-Preserving Edge Video Cartoonifier */}
          <StoryCartoonifierObject
            progress={progress}
            range={[0.30, 0.35]}
            anchorX={isMobile ? -0.15 : -0.85}
          />
          {/* Chapter 04: LaborLink Two-Sided Industrial Labor Marketplace */}
          <StoryLaborLinkObject
            progress={progress}
            range={[0.35, 0.40]}
            anchorX={isMobile ? -0.15 : -0.85}
          />
          {/* Chapter 05: Shree Labels Corporate Manufacturing & Specimen Showcase */}
          <StoryShreeLabelsObject
            progress={progress}
            range={[0.40, 0.45]}
            anchorX={isMobile ? -0.15 : -0.85}
          />
          {/* Chapter 06: HomeMind Virtual Smart Home Decision Engine */}
          <StoryJevObject
            progress={progress}
            range={[0.45, 0.50]}
            anchorX={isMobile ? -0.15 : -0.85}
          />

          {/* 04. Academic Progression Timeline Spine */}
          <StoryAcademicsObject progress={progress} />

          {/* 05. Technology & Tools Constellation */}
          <StorySkillsConstellation progress={progress} />

          {/* 06. Competitive Problem Solving & Leadership Trophy */}
          <StoryAchievementsObject progress={progress} />

          {/* 07. Holographic Resume Document Artifact */}
          <StoryResumeObject progress={progress} />

          {/* 08. Direct Communication & Signal Array */}
          <StoryContactObject progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
