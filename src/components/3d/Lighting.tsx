"use client";

import { useRef } from "react";
import * as THREE from "three";

export function Lighting() {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);

  return (
    <group name="LightingHierarchy">
      {/* Baseline Ambient: Rich deep-navy to preserve velvety shadow gradients */}
      <ambientLight color="#091226" intensity={0.52} />

      {/* ======================================================== */}
      {/* TIER 1 (PRIMARY FOCAL FOCUS): The Identity Monolith      */}
      {/* ======================================================== */}

      {/* Main Key Light: Angled from upper-right front to model portrait & chamfers */}
      <directionalLight
        ref={keyLightRef}
        position={[2.8, 4.2, 4.2]}
        intensity={1.7}
        color="#f8fafc"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Cyan Rim Accent Light: Rakes the left-hand silhouette and outer frame */}
      <pointLight
        ref={rimLightRef}
        position={[-1.6, 2.8, -1.8]}
        intensity={1.3}
        color="#00f0ff"
        distance={7.5}
        decay={2}
      />

      {/* ======================================================== */}
      {/* TIER 2 (SECONDARY FOCUS): Midground Architectural Space   */}
      {/* ======================================================== */}

      {/* Cool Deep-Blue Lateral Fill Light (Left wing) */}
      <directionalLight
        ref={fillLightRef}
        position={[-4.2, 2.8, 2.2]}
        intensity={0.65}
        color="#1e3a8a"
      />

      {/* Soft Pedestal & Floor Runway Pool Light */}
      <pointLight
        position={[0, 0.35, 1.8]}
        intensity={0.55}
        color="#38bdf8"
        distance={6}
        decay={2}
      />

      {/* ======================================================== */}
      {/* TIER 3 (TERTIARY DEPTH): Background Colonnade Illumination*/}
      {/* ======================================================== */}

      {/* Distant Low-Level Horizon Wash */}
      <pointLight
        position={[0, 1.2, -4.5]}
        intensity={0.35}
        color="#0f224a"
        distance={10}
        decay={2}
      />
    </group>
  );
}
