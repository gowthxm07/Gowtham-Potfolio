"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { StoryEnvironment } from "./StoryEnvironment";
import { StoryIdentityObject } from "./StoryIdentityObject";
import { StoryReceptionistObject } from "./StoryReceptionistObject";
import { StoryTrafficObject } from "./StoryTrafficObject";
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
        <Suspense fallback={null}>
          <StoryEnvironment />

          {/* 02. Identity & Verified Portrait Monolith */}
          <StoryIdentityObject progress={progress} />

          {/* 03. Featured Engineering Systems: AI Smart Receptionist Experience */}
          <StoryReceptionistObject
            progress={progress}
            range={[0.24, 0.34]}
            anchorX={-0.85}
          />
          {/* Section 03 Second Featured System: Real-Time Traffic Computer Vision Experience */}
          <StoryTrafficObject
            progress={progress}
            range={[0.33, 0.42]}
            anchorX={-0.85}
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

          {/* Continuous Camera Controller along Spline */}
          <StoryCameraController progress={progress} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
