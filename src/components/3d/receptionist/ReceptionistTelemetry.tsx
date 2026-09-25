"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";

interface ReceptionistTelemetryProps {
  subProgress: number;
}

export function ReceptionistTelemetry({ subProgress }: ReceptionistTelemetryProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Appears during active conversational phase: 0.28 -> 0.88
  return (
    <group ref={groupRef} position={[0.72, -0.48, 0]}>
      {/* 01. TELEMETRY BADGE BACKPLATE */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[0.84, 0.46, 0.015]} />
        <meshStandardMaterial
          color="#06130a"
          roughness={0.3}
          metalness={0.85}
        />
      </mesh>

      {/* Frame Border Seam */}
      <mesh position={[0, 0, -0.012]}>
        <boxGeometry args={[0.86, 0.48, 0.004]} />
        <meshBasicMaterial color="#22c55e" opacity={0.4} transparent />
      </mesh>

      {/* Header */}
      <Text
        position={[-0.38, 0.18, 0.01]}
        fontSize={0.022}
        color="#86efac"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"SYSTEM LATENCY TELEMETRY"}
      </Text>

      {/* Metric 1: Deterministic Engine Latency */}
      <Text
        position={[-0.38, 0.11, 0.01]}
        fontSize={0.018}
        color="#9ca3af"
        anchorX="left"
        anchorY="middle"
      >
        {"FAST INTENT ROUTER:"}
      </Text>
      <Text
        position={[0.38, 0.11, 0.01]}
        fontSize={0.019}
        color="#4ade80"
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"< 2ms"}
      </Text>

      {/* Metric 2: DB & Tool Latency */}
      <Text
        position={[-0.38, 0.05, 0.01]}
        fontSize={0.018}
        color="#9ca3af"
        anchorX="left"
        anchorY="middle"
      >
        {"PRISMA DB TOOLS:"}
      </Text>
      <Text
        position={[0.38, 0.05, 0.01]}
        fontSize={0.019}
        color="#86efac"
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"< 80ms"}
      </Text>

      {/* Metric 3: STT Latency */}
      <Text
        position={[-0.38, -0.01, 0.01]}
        fontSize={0.018}
        color="#9ca3af"
        anchorX="left"
        anchorY="middle"
      >
        {"WHISPER.CPP STT:"}
      </Text>
      <Text
        position={[0.38, -0.01, 0.01]}
        fontSize={0.019}
        color="#ffffff"
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"~1.4s CPU"}
      </Text>

      {/* Metric 4: TTS Latency */}
      <Text
        position={[-0.38, -0.07, 0.01]}
        fontSize={0.018}
        color="#9ca3af"
        anchorX="left"
        anchorY="middle"
      >
        {"PIPER NEURAL TTS:"}
      </Text>
      <Text
        position={[0.38, -0.07, 0.01]}
        fontSize={0.019}
        color="#ffffff"
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"~1.6s CPU"}
      </Text>

      {/* Metric 5: Total Voice Roundtrip */}
      <Text
        position={[-0.38, -0.15, 0.01]}
        fontSize={0.017}
        color="#22c55e"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.03}
      >
        {"DETERMINISTIC VOICE ROUNDTRIP:"}
      </Text>
      <Text
        position={[0.38, -0.15, 0.01]}
        fontSize={0.018}
        color="#4ade80"
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.03}
      >
        {"~2.4s – 4.5s"}
      </Text>
    </group>
  );
}
