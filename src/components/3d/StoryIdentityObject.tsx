"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";

interface StoryIdentityObjectProps {
  progress: number;
}

export function StoryIdentityObject({ progress }: StoryIdentityObjectProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Load authentic portrait photograph
  const portraitTexture = useTexture("/assets/gowtham.png");
  portraitTexture.colorSpace = THREE.SRGBColorSpace;
  portraitTexture.minFilter = THREE.LinearMipmapLinearFilter;

  useFrame(({ pointer }, delta) => {
    if (!groupRef.current) return;

    // Section range for identity visibility: [0.08, 0.27]
    // Peak focus: [0.14, 0.22]
    let targetZ = -8.0;
    let targetX = 0.85;
    let targetY = 0.8;
    let targetScale = 0.5;
    let opacity = 0.0;

    if (progress >= 0.08 && progress < 0.14) {
      // Approach phase: Object enters from depth toward camera
      const t = smoothStep((progress - 0.08) / (0.14 - 0.08));
      targetZ = -8.0 + (0.1 - -8.0) * t;
      targetX = 0.85;
      targetY = 0.8;
      targetScale = 0.6 + 0.4 * t;
      opacity = t;
    } else if (progress >= 0.14 && progress <= 0.22) {
      // Focused inspection phase: Anchored prominently on right side
      targetZ = 0.1;
      targetX = 0.85;
      targetY = 0.8;
      targetScale = 1.0;
      opacity = 1.0;
    } else if (progress > 0.22 && progress <= 0.27) {
      // Exit phase: Object passes forward past the camera
      const t = smoothStep((progress - 0.22) / (0.27 - 0.22));
      targetZ = 0.1 + (4.2 - 0.1) * t;
      targetX = 0.85 + 0.6 * t;
      targetY = 0.8 + 0.2 * t;
      targetScale = 1.0 + 0.3 * t;
      opacity = Math.max(0, 1.0 - t * 1.2);
    } else {
      // Outside visibility range
      opacity = 0;
      targetZ = progress < 0.08 ? -10 : 8;
    }

    // Subtle pointer parallax tilt
    const parallaxRotY = pointer.x * 0.06;
    const parallaxRotX = -pointer.y * 0.04;

    // Smooth physical damping
    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      targetZ,
      3.5,
      delta
    );
    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      targetX,
      3.5,
      delta
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY,
      3.5,
      delta
    );

    const currentScale = groupRef.current.scale.x;
    const nextScale = THREE.MathUtils.damp(currentScale, targetScale, 3.5, delta);
    groupRef.current.scale.set(nextScale, nextScale, nextScale);

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      -0.12 + parallaxRotY,
      3.5,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      parallaxRotX,
      3.5,
      delta
    );

    // Apply visibility toggle to prevent drawing when far out of range
    groupRef.current.visible = opacity > 0.01;
  });

  return (
    <group ref={groupRef} position={[0.85, 0.8, -8]}>
      {/* 01. FLOATING REAR ACRYLIC BACKPLATE */}
      <mesh position={[0, 0, -0.04]} receiveShadow>
        <boxGeometry args={[1.5, 2.15, 0.04]} />
        <meshStandardMaterial
          color="#06120a"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Thin Lime Green Silhouette Edge Seam */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[1.53, 2.18, 0.01]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* 02. PRIMARY TITANIUM FRAME */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.42, 2.05, 0.06]} />
        <meshStandardMaterial
          color="#07140b"
          roughness={0.25}
          metalness={0.88}
        />
      </mesh>

      {/* 03. AUTHENTIC PORTRAIT PHOTOGRAPH PANEL */}
      <mesh position={[0, 0.12, 0.035]}>
        <planeGeometry args={[1.22, 1.44]} />
        <meshBasicMaterial map={portraitTexture} toneMapped={true} />
      </mesh>

      {/* 04. PROTECTIVE GLASS/ACRYLIC FRONT LAYER */}
      <mesh position={[0, 0.12, 0.045]}>
        <planeGeometry args={[1.24, 1.46]} />
        <meshPhysicalMaterial
          color="#051a0d"
          transmission={0.22}
          opacity={0.3}
          transparent
          roughness={0.08}
          metalness={0.15}
          reflectivity={0.65}
        />
      </mesh>

      {/* 05. INTEGRATED EDITORIAL TYPOGRAPHY */}
      <Text
        position={[-0.58, 0.95, 0.04]}
        fontSize={0.04}
        color="#86efac"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {"SYSTEM ID // 07"}
      </Text>

      <Text
        position={[0.58, 0.95, 0.04]}
        fontSize={0.036}
        color="#22c55e"
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {"● VERIFIED PROFILE"}
      </Text>

      <Text
        position={[0, -0.66, 0.04]}
        fontSize={0.078}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"GOWTHAM HARI S"}
      </Text>

      <Text
        position={[0, -0.76, 0.04]}
        fontSize={0.034}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"COMPUTER SCIENCE ENGINEER • SYSTEMS & AI"}
      </Text>

      <Text
        position={[0, -0.85, 0.04]}
        fontSize={0.029}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {"LEETCODE KNIGHT [1868] • AMRITA VISHWA VIDHYAPEETHAM"}
      </Text>
    </group>
  );
}
