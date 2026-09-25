"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface JevTelemetryProps {
  subProgress: number;
}

export function JevTelemetry({ subProgress }: JevTelemetryProps) {
  const groupRef = useRef<THREE.Group>(null);
  const statusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = 1.62 + Math.sin(t * 1.2) * 0.008;
    }
    if (statusRef.current) {
      const mat = statusRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.5 + Math.sin(t * 3.0) * 0.5;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0.1, 1.62, 0]}>
      {/* HUD Telemetry Ribbon Background */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.7, 0.28]} />
        <meshStandardMaterial
          color="#030712"
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Border Framing */}
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(2.7, 0.28, 0.01)]} />
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </lineSegments>

      {/* Status Blip */}
      <mesh ref={statusRef} position={[-1.22, 0.07, 0.01]}>
        <sphereGeometry args={[0.014, 8, 8]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.8} />
      </mesh>

      {/* Main Title */}
      <Text
        position={[-1.16, 0.07, 0.01]}
        fontSize={0.034}
        color="#f8fafc"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"HOMEMIND // VIRTUAL SMART HOME DECISION ENGINE"}
      </Text>

      {/* Subtitle */}
      <Text
        position={[-1.16, 0.01, 0.01]}
        fontSize={0.02}
        color="#a855f7"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"TYPESAFE JEV SYSTEM ONE (/v1/systemone) • NOUL & CHOICE PRIMITIVES"}
      </Text>

      {/* Tech Stack and Guardrail Verification */}
      <Text
        position={[-1.16, -0.05, 0.01]}
        fontSize={0.017}
        color="#94a3b8"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.03}
      >
        {"STACK: Next.js • TypeScript • Tailwind • TypeSafe Jev • Ollama • Vitest (181 tests)"}
      </Text>

      <Text
        position={[1.22, -0.05, 0.01]}
        fontSize={0.017}
        color="#10b981"
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.03}
      >
        {"100% IN-MEMORY SIMULATION (ZERO PHYSICAL HARDWARE)"}
      </Text>
    </group>
  );
}
