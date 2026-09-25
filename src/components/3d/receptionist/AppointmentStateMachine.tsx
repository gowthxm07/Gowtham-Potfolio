"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";

interface AppointmentStateMachineProps {
  subProgress: number;
}

export function AppointmentStateMachine({ subProgress }: AppointmentStateMachineProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Activates mid-to-late story: subProgress 0.35 -> 0.95
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Slight inward rotation facing core
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      -0.18,
      3.5,
      delta
    );
  });

  const states = [
    { label: "REQUEST", threshold: 0.35, y: 0.42, desc: "Intent Extracted" },
    { label: "DETAILS", threshold: 0.50, y: 0.14, desc: "Time & Service" },
    { label: "CONFIRM", threshold: 0.65, y: -0.14, desc: "Schedule Validated" },
    { label: "BOOKED", threshold: 0.78, y: -0.42, desc: "Database Committed", final: true },
  ];

  return (
    <group ref={groupRef} position={[0.72, 0.12, 0]}>
      {/* 01. TITANIUM RAIL SPINE */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[0.024, 1.15, 0.02]} />
        <meshStandardMaterial color="#08140c" roughness={0.25} metalness={0.9} />
      </mesh>

      <mesh position={[0, 0, 0.005]}>
        <boxGeometry args={[0.006, 1.1, 0.005]} />
        <meshBasicMaterial color="#22c55e" opacity={0.5} transparent />
      </mesh>

      {/* Header Label */}
      <Text
        position={[0, 0.64, 0.02]}
        fontSize={0.032}
        color="#86efac"
        anchorX="center"
        anchorY="bottom"
        letterSpacing={0.06}
      >
        {"APPOINTMENT STATE MACHINE"}
      </Text>

      {/* 02. STATE PROGRESSION NODES */}
      {states.map((s, idx) => {
        const isActive = subProgress >= s.threshold;
        const color = isActive ? (s.final ? "#4ade80" : "#22c55e") : "#1b3323";
        const emissiveIntensity = isActive ? (s.final ? 0.9 : 0.65) : 0.1;

        return (
          <group key={s.label} position={[0, s.y, 0]}>
            {/* Center Node Orb */}
            <mesh>
              <sphereGeometry args={[s.final ? 0.048 : 0.038, 16, 16]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={emissiveIntensity}
                roughness={0.2}
              />
            </mesh>

            {/* Orbital Ring if Active */}
            {isActive && (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[s.final ? 0.08 : 0.065, 0.006, 8, 24]} />
                <meshBasicMaterial color="#86efac" opacity={0.6} transparent />
              </mesh>
            )}

            {/* State Number */}
            <Text
              position={[-0.12, 0, 0.02]}
              fontSize={0.032}
              color={isActive ? "#ffffff" : "#4b6354"}
              anchorX="right"
              anchorY="middle"
              letterSpacing={0.04}
            >
              {`0${idx + 1}`}
            </Text>

            {/* State Title */}
            <Text
              position={[0.12, 0.02, 0.02]}
              fontSize={0.034}
              color={isActive ? (s.final ? "#4ade80" : "#86efac") : "#4b6354"}
              anchorX="left"
              anchorY="middle"
              letterSpacing={0.05}
            >
              {s.label}
            </Text>

            {/* State Description */}
            <Text
              position={[0.12, -0.03, 0.02]}
              fontSize={0.022}
              color={isActive ? "#9ca3af" : "#2f4838"}
              anchorX="left"
              anchorY="middle"
            >
              {isActive ? `✓ ${s.desc}` : `○ ${s.desc}`}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
