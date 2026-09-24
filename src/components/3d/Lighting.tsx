"use client";

import { useRef } from "react";
import * as THREE from "three";

export function Lighting() {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);

  return (
    <group name="LightingSystem">
      {/* Soft dark-navy ambient baseline */}
      <ambientLight color="#0c162d" intensity={0.6} />

      {/* Main Key Light: Illuminates front-right quadrant of the Identity Monolith */}
      <directionalLight
        ref={keyLightRef}
        position={[3.5, 4.5, 4.5]}
        intensity={1.4}
        color="#f1f5f9"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Cool Deep Blue Fill Light: Softens left-hand shadows */}
      <directionalLight
        ref={fillLightRef}
        position={[-4.5, 2.5, 2]}
        intensity={0.7}
        color="#1e3a8a"
      />

      {/* Cyan Rim Accent: Placed behind to define physical silhouette edges */}
      <pointLight
        ref={rimLightRef}
        position={[-1.2, 2.4, -2.2]}
        intensity={1.1}
        color="#00f0ff"
        distance={7}
        decay={2}
      />

      {/* Floor / Pedestal Soft Accent: Highlights step bevels */}
      <pointLight
        position={[0, 0.35, 1.4]}
        intensity={0.5}
        color="#38bdf8"
        distance={5}
        decay={2}
      />
    </group>
  );
}
