"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";

interface StoryAchievementsObjectProps {
  progress: number;
  isMobile?: boolean;
}

export function StoryAchievementsObject({ progress, isMobile = false }: StoryAchievementsObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const gemRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Section 06: Range [0.72, 0.82] (expanded to 0.040 transition windows)
  const startP = 0.705;
  const peakStart = 0.745;
  const peakEnd = 0.795;
  const endP = 0.835;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const scaleBase = isMobile ? 0.65 : 1.0;
    const targetAnchorX = isMobile ? 0.0 : 0.85;

    let targetZ = -14.0;
    let targetX = targetAnchorX;
    let targetY = isMobile ? 0.90 : 0.85;
    let targetScale = 0.35 * scaleBase;
    let opacity = 0.0;

    if (progress >= startP && progress < peakStart) {
      const t = smoothStep((progress - startP) / (peakStart - startP));
      targetZ = -14.0 + (0.5 - -14.0) * t;
      targetX = targetAnchorX;
      targetScale = (0.5 + 0.5 * t) * scaleBase;
      opacity = t;
    } else if (progress >= peakStart && progress <= peakEnd) {
      const t = smoothStep((progress - peakStart) / (peakEnd - peakStart));
      targetZ = 0.5 + 0.25 * t;
      targetX = targetAnchorX;
      targetScale = 1.0 * scaleBase;
      opacity = 1.0;
    } else if (progress > peakEnd && progress <= endP) {
      const t = smoothStep((progress - peakEnd) / (endP - peakEnd));
      targetZ = 0.75 + (5.0 - 0.75) * t;
      targetX = targetAnchorX + (isMobile ? 0.2 : 0.7) * t;
      targetScale = (1.0 + 0.35 * t) * scaleBase;
      opacity = Math.max(0, 1.0 - t);
    } else {
      opacity = 0;
      targetZ = progress < startP ? -16 : 8;
    }

    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      targetZ,
      3.8,
      delta
    );
    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      targetX,
      3.8,
      delta
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY,
      3.8,
      delta
    );

    const curScale = groupRef.current.scale.x;
    const nextScale = THREE.MathUtils.damp(curScale, targetScale, 3.8, delta);
    groupRef.current.scale.set(nextScale, nextScale, nextScale);

    // Dynamic rotation of trophy gem and orbit
    if (gemRef.current) {
      gemRef.current.rotation.y += delta * 0.75;
      gemRef.current.rotation.z += delta * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.4;
      ringRef.current.rotation.x += delta * 0.2;
    }

    groupRef.current.visible = opacity > 0.01;
  });

  return (
    <group ref={groupRef} position={[0.85, 0.85, -14]}>
      {/* 01. TITANIUM TROPHY PEDESTAL / BASE */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.7, 0.85, 0.15, 32]} />
        <meshStandardMaterial color="#08140c" roughness={0.25} metalness={0.9} />
      </mesh>

      <mesh position={[0, -0.82, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.02, 32]} />
        <meshBasicMaterial color="#22c55e" opacity={0.6} transparent />
      </mesh>

      {/* 02. CENTRAL LEETCODE KNIGHT ICONIC DIAMOND GEM */}
      <mesh ref={gemRef} position={[0, 0.1, 0]}>
        <octahedronGeometry args={[0.65, 0]} />
        <meshStandardMaterial
          color="#0d2414"
          emissive="#22c55e"
          emissiveIntensity={0.65}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Outer Wireframe Shield */}
      <mesh position={[0, 0.1, 0]}>
        <octahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color="#4ade80"
          emissive="#4ade80"
          emissiveIntensity={0.4}
          wireframe
        />
      </mesh>

      {/* 03. ORBITAL COMPETITIVE RING */}
      <mesh ref={ringRef} position={[0, 0.1, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.1, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#15361e"
          emissive="#86efac"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* 04. FLOATING METRIC LABELS */}
      <Text
        position={[0, 0.95, 0]}
        fontSize={0.075}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {"LEETCODE KNIGHT"}
      </Text>

      <Text
        position={[0, 0.82, 0]}
        fontSize={0.048}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"PEAK RATING 1868 // TOP 4.96%"}
      </Text>

      <Text
        position={[0, -0.65, 0]}
        fontSize={0.038}
        color="#86efac"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {"DELTABUILD 2026 WINNER"}
      </Text>

      <Text
        position={[0, -0.73, 0]}
        fontSize={0.032}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"GFG CAMPUS PLACEMENT & DSA LEAD"}
      </Text>
    </group>
  );
}
