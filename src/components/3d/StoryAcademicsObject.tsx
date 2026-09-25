"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";

interface StoryAcademicsObjectProps {
  progress: number;
}

export function StoryAcademicsObject({ progress }: StoryAcademicsObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const spineRef = useRef<THREE.Mesh>(null);

  const startP = 0.485;
  const peakStart = 0.525;
  const peakEnd = 0.575;
  const endP = 0.615;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    let targetZ = -14.0;
    let targetX = 0.85;
    let targetY = 0.85;
    let targetScale = 0.4;
    let opacity = 0.0;

    if (progress >= startP && progress < peakStart) {
      const t = smoothStep((progress - startP) / (peakStart - startP));
      targetZ = -14.0 + (0.5 - -14.0) * t;
      targetScale = 0.5 + 0.5 * t;
      opacity = t;
    } else if (progress >= peakStart && progress <= peakEnd) {
      const t = smoothStep((progress - peakStart) / (peakEnd - peakStart));
      targetZ = 0.5 + 0.3 * t;
      targetScale = 1.0;
      opacity = 1.0;
    } else if (progress > peakEnd && progress <= endP) {
      const t = smoothStep((progress - peakEnd) / (endP - peakEnd));
      targetZ = 0.8 + (5.0 - 0.8) * t;
      targetX = 0.85 + 0.7 * t;
      targetScale = 1.0 + 0.3 * t;
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

    // Subtle axial rotation showing depth of timeline
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      -0.25 + (progress - startP) * 0.8,
      3.5,
      delta
    );

    groupRef.current.visible = opacity > 0.01;
  });

  const milestones = [
    { year: "2023", label: "ADMISSION // AMRITA CS", y: -0.85, active: true },
    { year: "2024", label: "FOUNDATIONS // ALGORITHMS", y: -0.42, active: true },
    { year: "2025", label: "LEAD // GFG PLACEMENT & DELTABUILD", y: 0.0, active: true, hero: true },
    { year: "2026", label: "EDGE AI // SYSTEMS & CV", y: 0.42, active: true },
    { year: "2027", label: "GRADUATION // B.TECH TARGET", y: 0.85, active: false },
  ];

  return (
    <group ref={groupRef} position={[0.85, 0.85, -14]}>
      {/* Central Chronological Titanium Spine */}
      <mesh ref={spineRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.035, 2.2, 0.035]} />
        <meshStandardMaterial color="#08140c" roughness={0.25} metalness={0.9} />
      </mesh>

      {/* Illuminated Central Timeline Guideline */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.008, 2.15, 0.005]} />
        <meshBasicMaterial color="#22c55e" opacity={0.6} transparent />
      </mesh>

      {/* Milestone Nodes */}
      {milestones.map((m) => (
        <group key={m.year} position={[0, m.y, 0]}>
          {/* Milestone Node Sphere */}
          <mesh>
            <sphereGeometry args={[m.hero ? 0.07 : 0.045, 16, 16]} />
            <meshStandardMaterial
              color={m.hero ? "#4ade80" : "#22c55e"}
              emissive={m.hero ? "#4ade80" : "#22c55e"}
              emissiveIntensity={m.hero ? 0.8 : 0.4}
              roughness={0.2}
            />
          </mesh>

          {/* Node Orbit Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[m.hero ? 0.14 : 0.1, 0.008, 8, 32]} />
            <meshBasicMaterial color="#86efac" opacity={0.5} transparent />
          </mesh>

          {/* Year Typography Label */}
          <Text
            position={[-0.18, 0, 0.02]}
            fontSize={0.065}
            color={m.hero ? "#ffffff" : "#86efac"}
            anchorX="right"
            anchorY="middle"
            letterSpacing={0.06}
          >
            {m.year}
          </Text>

          {/* Milestone Technical Caption */}
          <Text
            position={[0.18, 0, 0.02]}
            fontSize={0.034}
            color={m.hero ? "#4ade80" : "#9ca3af"}
            anchorX="left"
            anchorY="middle"
            letterSpacing={0.04}
          >
            {m.label}
          </Text>
        </group>
      ))}
    </group>
  );
}
