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
        <boxGeometry args={[0.72, 0.32, 0.015]} />
        <meshStandardMaterial
          color="#06130a"
          roughness={0.3}
          metalness={0.85}
        />
      </mesh>

      {/* Frame Border Seam */}
      <mesh position={[0, 0, -0.012]}>
        <boxGeometry args={[0.74, 0.34, 0.004]} />
        <meshBasicMaterial color="#22c55e" opacity={0.4} transparent />
      </mesh>

      {/* Header */}
      <Text
        position={[-0.32, 0.11, 0.01]}
        fontSize={0.022}
        color="#86efac"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"SYSTEM TELEMETRY"}
      </Text>

      {/* Metric 1: Acoustic Turnaround */}
      <Text
        position={[-0.32, 0.05, 0.01]}
        fontSize={0.019}
        color="#9ca3af"
        anchorX="left"
        anchorY="middle"
      >
        {"ACOUSTIC TURNAROUND:"}
      </Text>
      <Text
        position={[0.32, 0.05, 0.01]}
        fontSize={0.02}
        color="#4ade80"
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"SUB-SECOND"}
      </Text>

      {/* Metric 2: Runtime */}
      <Text
        position={[-0.32, -0.01, 0.01]}
        fontSize={0.019}
        color="#9ca3af"
        anchorX="left"
        anchorY="middle"
      >
        {"INFERENCE RUNTIME:"}
      </Text>
      <Text
        position={[0.32, -0.01, 0.01]}
        fontSize={0.02}
        color="#ffffff"
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"LOCAL OLLAMA"}
      </Text>

      {/* Metric 3: Logging */}
      <Text
        position={[-0.32, -0.07, 0.01]}
        fontSize={0.019}
        color="#9ca3af"
        anchorX="left"
        anchorY="middle"
      >
        {"SECURITY / LOGGING:"}
      </Text>
      <Text
        position={[0.32, -0.07, 0.01]}
        fontSize={0.02}
        color="#22c55e"
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"PRIVACY CONSCIOUS"}
      </Text>
    </group>
  );
}
