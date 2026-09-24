"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Text } from "@react-three/drei";
import * as THREE from "three";

interface IdentityObjectProps {
  onSelect?: () => void;
  isFocused?: boolean;
}

export function IdentityObject({ onSelect, isFocused = false }: IdentityObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Load the authentic portrait photograph
  const portraitTexture = useTexture("/assets/gowtham.png");
  portraitTexture.colorSpace = THREE.SRGBColorSpace;
  portraitTexture.minFilter = THREE.LinearMipmapLinearFilter;

  // Damped physical rotation based on mouse / pointer
  useFrame(({ pointer }, delta) => {
    if (!groupRef.current) return;

    // Subtle pointer parallax tilt
    const targetRotY = pointer.x * (hovered ? 0.12 : 0.06);
    const targetRotX = -pointer.y * (hovered ? 0.08 : 0.04);
    const targetPosY = 1.35 + (hovered ? 0.04 : 0);

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      4,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      4,
      delta
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetPosY,
      4,
      delta
    );
  });

  return (
    <group
      ref={groupRef}
      position={[0, 1.35, 0]}
      onClick={onSelect}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* 01. ARCHITECTURAL MONOLITH FRAME (Dark Slate / Titanium) */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2.3, 0.12]} />
        <meshStandardMaterial
          color="#080e1b"
          roughness={0.28}
          metalness={0.88}
        />
      </mesh>

      {/* Recessed Backplate */}
      <mesh position={[0, 0.06, 0.05]}>
        <planeGeometry args={[1.32, 1.78]} />
        <meshStandardMaterial
          color="#03060f"
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>

      {/* 02. AUTHENTIC PORTRAIT PHOTOGRAPH PANEL */}
      <mesh position={[0, 0.18, 0.062]}>
        <planeGeometry args={[1.22, 1.48]} />
        <meshBasicMaterial
          map={portraitTexture}
          toneMapped={true}
        />
      </mesh>

      {/* 03. PROTECTIVE ACRYLIC / GLASS SURFACE (Subtle depth reflection) */}
      <mesh position={[0, 0.18, 0.072]}>
        <planeGeometry args={[1.24, 1.5]} />
        <meshPhysicalMaterial
          color="#0c192c"
          transmission={0.3}
          opacity={0.25}
          transparent
          roughness={0.1}
          metalness={0.1}
          reflectivity={0.6}
        />
      </mesh>

      {/* 04. THIN TECHNICAL EDGES & CYAN SEAMS */}
      {/* Left Edge Accent */}
      <mesh position={[-0.751, 0, 0]}>
        <boxGeometry args={[0.012, 2.3, 0.122]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={hovered || isFocused ? 0.7 : 0.25}
          roughness={0.2}
        />
      </mesh>

      {/* Right Edge Accent */}
      <mesh position={[0.751, 0, 0]}>
        <boxGeometry args={[0.012, 2.3, 0.122]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={hovered || isFocused ? 0.7 : 0.25}
          roughness={0.2}
        />
      </mesh>

      {/* Bottom Horizontal Underglow Seam */}
      <mesh position={[0, -1.151, 0.05]}>
        <boxGeometry args={[1.48, 0.012, 0.04]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={hovered ? 0.8 : 0.3}
        />
      </mesh>

      {/* 05. INTEGRATED ARCHITECTURAL TYPOGRAPHY */}
      {/* Top Header Badge */}
      <Text
        position={[-0.6, 1.02, 0.075]}
        fontSize={0.042}
        color="#94a3b8"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {"SYSTEM ID // 07"}
      </Text>

      <Text
        position={[0.6, 1.02, 0.075]}
        fontSize={0.038}
        color={hovered ? "#00f0ff" : "#38bdf8"}
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"● VERIFIED CORE"}
      </Text>

      {/* Primary Identity Nameplate */}
      <Text
        position={[0, -0.68, 0.075]}
        fontSize={0.082}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"GOWTHAM HARI S"}
      </Text>

      {/* Academic & Domain Subtitle */}
      <Text
        position={[0, -0.79, 0.075]}
        fontSize={0.038}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"AI & SOFTWARE SYSTEMS • AMRITA VISHWA VIDHYAPEETHAM"}
      </Text>

      {/* Competitive Standing Credential */}
      <Text
        position={[0, -0.89, 0.075]}
        fontSize={0.033}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {"LEETCODE KNIGHT [1868] • 900+ PROBLEMS • B.TECH CS (8.12 GPA)"}
      </Text>

      {/* Pedestal Stand (Base footing) */}
      <group position={[0, -1.25, 0]}>
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[1.8, 0.12, 0.7]} />
          <meshStandardMaterial
            color="#0b1222"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[0, 0.065, 0]}>
          <boxGeometry args={[1.6, 0.02, 0.5]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}
