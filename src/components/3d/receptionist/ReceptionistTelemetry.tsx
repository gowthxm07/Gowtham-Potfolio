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
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    let targetZ = -8.0;
    let targetX = -1.2;
    let targetY = 0.24;
    let targetScale = 0.35;
    let opacity = 0.0;

    if (subProgress >= 0.25 && subProgress < 0.42) {
      const t = smoothStep((subProgress - 0.25) / (0.42 - 0.25));
      targetZ = -8.0 + (0.3 - -8.0) * t;
      targetScale = 0.5 + 0.5 * t;
      opacity = t;
    } else if (subProgress >= 0.42 && subProgress <= 0.78) {
      const t = smoothStep((subProgress - 0.42) / (0.78 - 0.42));
      targetZ = 0.3 + 0.15 * t;
      targetScale = 1.0;
      opacity = 1.0;
    } else if (subProgress > 0.78 && subProgress <= 0.95) {
      const t = smoothStep((subProgress - 0.78) / (0.95 - 0.78));
      targetZ = 0.45 + (3.8 - 0.45) * t;
      targetScale = 1.0 + 0.3 * t;
      opacity = Math.max(0, 1.0 - t * 1.3);
    } else {
      opacity = 0;
      targetZ = subProgress < 0.25 ? -10 : 5;
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

    groupRef.current.visible = opacity > 0.01;
  });

  return (
    <group ref={groupRef} position={[-1.2, 0.24, -8]}>
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
