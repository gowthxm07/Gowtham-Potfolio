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

    // Subtle pointer parallax tilt (damped for physical weight)
    const targetRotY = pointer.x * (hovered ? 0.09 : 0.05);
    const targetRotX = -pointer.y * (hovered ? 0.06 : 0.03);
    const targetPosY = 1.45 + (hovered ? 0.03 : 0);

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      3.5,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      3.5,
      delta
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetPosY,
      3.5,
      delta
    );
  });

  return (
    <group
      ref={groupRef}
      position={[0, 1.45, 0]}
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
      {/* 01. REAR ARCHITECTURAL BACKPLATE (Provides depth separation against dark horizon) */}
      <mesh position={[0, 0.04, -0.06]} receiveShadow>
        <boxGeometry args={[1.92, 2.68, 0.04]} />
        <meshStandardMaterial
          color="#050914"
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>

      {/* Rear Backplate Edge Silhouette Glow */}
      <mesh position={[0, 0.04, -0.07]}>
        <boxGeometry args={[1.96, 2.72, 0.01]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={hovered || isFocused ? 0.5 : 0.2}
          roughness={0.2}
        />
      </mesh>

      {/* 02. PRIMARY MONOLITH FRAME (Dark Brushed Obsidian / Titanium) */}
      <mesh castShadow receiveShadow position={[0, 0.04, 0]}>
        <boxGeometry args={[1.72, 2.52, 0.14]} />
        <meshStandardMaterial
          color="#080e1b"
          roughness={0.25}
          metalness={0.88}
        />
      </mesh>

      {/* Recessed Matte Backing under photograph */}
      <mesh position={[0, 0.22, 0.071]}>
        <planeGeometry args={[1.44, 1.7]} />
        <meshStandardMaterial
          color="#020409"
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* 03. AUTHENTIC PORTRAIT PHOTOGRAPH PANEL */}
      <mesh position={[0, 0.22, 0.076]}>
        <planeGeometry args={[1.38, 1.62]} />
        <meshBasicMaterial
          map={portraitTexture}
          toneMapped={true}
        />
      </mesh>

      {/* 04. PROTECTIVE ACRYLIC / GLASS SURFACE (Subtle depth reflection) */}
      <mesh position={[0, 0.22, 0.086]}>
        <planeGeometry args={[1.4, 1.64]} />
        <meshPhysicalMaterial
          color="#081426"
          transmission={0.25}
          opacity={0.3}
          transparent
          roughness={0.08}
          metalness={0.15}
          reflectivity={0.7}
        />
      </mesh>

      {/* 05. PRECISION TECHNICAL EDGES & CYAN SEAMS */}
      {/* Left Edge Accent Rail */}
      <mesh position={[-0.861, 0.04, 0]}>
        <boxGeometry args={[0.015, 2.52, 0.142]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={hovered || isFocused ? 0.8 : 0.3}
          roughness={0.15}
        />
      </mesh>

      {/* Right Edge Accent Rail */}
      <mesh position={[0.861, 0.04, 0]}>
        <boxGeometry args={[0.015, 2.52, 0.142]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={hovered || isFocused ? 0.8 : 0.3}
          roughness={0.15}
        />
      </mesh>

      {/* Bottom Horizontal Underglow Line */}
      <mesh position={[0, -1.22, 0.072]}>
        <boxGeometry args={[1.68, 0.012, 0.02]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={hovered ? 0.9 : 0.4}
        />
      </mesh>

      {/* 06. ARCHITECTURAL MONOSPACE TYPOGRAPHY */}
      {/* Top Header Badge */}
      <Text
        position={[-0.7, 1.18, 0.082]}
        fontSize={0.044}
        color="#94a3b8"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {"SYSTEM ID // 07"}
      </Text>

      <Text
        position={[0.7, 1.18, 0.082]}
        fontSize={0.04}
        color={hovered || isFocused ? "#00f0ff" : "#38bdf8"}
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"● VERIFIED CORE"}
      </Text>

      {/* Primary Identity Nameplate */}
      <Text
        position={[0, -0.72, 0.082]}
        fontSize={0.092}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"GOWTHAM HARI S"}
      </Text>

      {/* Academic & Domain Subtitle */}
      <Text
        position={[0, -0.84, 0.082]}
        fontSize={0.042}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"B.TECH COMPUTER SCIENCE • AMRITA VISHWA VIDHYAPEETHAM"}
      </Text>

      {/* Competitive & Engineering Standing */}
      <Text
        position={[0, -0.95, 0.082]}
        fontSize={0.035}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {"LEETCODE KNIGHT [1868] • 900+ PROBLEMS • GPA 8.12"}
      </Text>

      {/* 07. STEPPED ARCHITECTURAL PEDESTAL (Ground Anchor) */}
      <group position={[0, -1.34, 0]}>
        {/* Upper Plinth */}
        <mesh position={[0, 0.06, 0]} receiveShadow>
          <boxGeometry args={[2.0, 0.12, 0.8]} />
          <meshStandardMaterial
            color="#0b1324"
            roughness={0.25}
            metalness={0.85}
          />
        </mesh>

        {/* Recessed Cyan Lighting Channel */}
        <mesh position={[0, -0.01, 0]}>
          <boxGeometry args={[1.85, 0.02, 0.65]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={hovered ? 0.7 : 0.3}
          />
        </mesh>

        {/* Lower Stepped Plinth */}
        <mesh position={[0, -0.07, 0]} receiveShadow>
          <boxGeometry args={[2.25, 0.1, 1.05]} />
          <meshStandardMaterial
            color="#080e1b"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      </group>
    </group>
  );
}
