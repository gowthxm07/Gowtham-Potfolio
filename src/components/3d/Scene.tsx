"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { StoryEnvironment } from "./StoryEnvironment";
import { StoryIdentityObject } from "./StoryIdentityObject";
import { StoryPrototypeObject } from "./StoryPrototypeObject";
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
          <StoryIdentityObject progress={progress} />
          {/* Section 03 Prototype 3D Object: AI Receptionist Conversational Core */}
          <StoryPrototypeObject
            progress={progress}
            type="receptionist"
            range={[0.42, 0.72]}
            anchorX={-0.85}
          />
          {/* Section 04 Prototype 3D Object: Traffic Computer Vision Spatial Node */}
          <StoryPrototypeObject
            progress={progress}
            type="traffic"
            range={[0.68, 0.96]}
            anchorX={0.85}
          />
          <StoryCameraController progress={progress} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
