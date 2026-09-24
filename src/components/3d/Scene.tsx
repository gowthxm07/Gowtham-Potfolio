"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Lighting } from "./Lighting";
import { Atmosphere } from "./Atmosphere";
import { IdentityObject } from "./IdentityObject";
import { CameraController } from "./CameraController";
import { CAMERA_ZONES, ZoneId } from "@/lib/cameraConfig";

interface SceneProps {
  activeZone: ZoneId;
  onSelectZone: (zone: ZoneId) => void;
  isMobile?: boolean;
  dpr?: number;
}

export function Scene({
  activeZone,
  onSelectZone,
  isMobile = false,
  dpr = 1.5,
}: SceneProps) {
  const initialCam = CAMERA_ZONES.overview;

  return (
    <div className="absolute inset-0 w-full h-full bg-[#040711] overflow-hidden">
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
          position: initialCam.position,
          fov: initialCam.fov,
          near: 0.1,
          far: 60,
        }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <Atmosphere />
          <IdentityObject
            isFocused={activeZone === "identity"}
            onSelect={() => onSelectZone("identity")}
          />
          <CameraController activeZone={activeZone} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
