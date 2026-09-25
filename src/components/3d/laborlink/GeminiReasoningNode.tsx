"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface GeminiReasoningNodeProps {
  subProgress: number;
}

export function GeminiReasoningNode({ subProgress }: GeminiReasoningNodeProps) {
  const geminiBoxRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (geminiBoxRef.current) {
      geminiBoxRef.current.position.y = 1.05 + Math.sin(t * 1.8) * 0.015;
    }
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.4 + Math.sin(t * 2.5) * 0.2;
      }
    }
  });

  return (
    <group ref={geminiBoxRef} position={[1.15, 1.05, 0.15]}>
      {/* Secondary Node Header */}
      <Text
        position={[0, 0.45, 0]}
        fontSize={0.038}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"SECONDARY LAYER // GEMINI 2.5 FLASH"}
      </Text>
      <Text
        position={[0, 0.39, 0]}
        fontSize={0.024}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        {"QUALITATIVE REASONING & SEMANTIC EXPLANATIONS"}
      </Text>

      {/* Hexagonal Chassis */}
      <mesh position={[0, 0.08, -0.01]}>
        <cylinderGeometry args={[0.42, 0.44, 0.08, 6]} />
        <meshStandardMaterial color="#05141e" roughness={0.6} metalness={0.8} />
      </mesh>
      <lineSegments position={[0, 0.08, -0.01]}>
        <edgesGeometry args={[new THREE.CylinderGeometry(0.422, 0.442, 0.082, 6)]} />
        <lineBasicMaterial color="#38bdf8" opacity={0.7} />
      </lineSegments>

      {/* Glowing Outer Hex Ring */}
      <mesh ref={glowRef} position={[0, 0.08, 0.035]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.38, 0.41, 6]} />
        <meshBasicMaterial color="#0284c7" opacity={0.5} transparent wireframe />
      </mesh>

      {/* Tiered Architectural Hierarchy Box */}
      <group position={[0, 0.08, 0.05]}>
        {/* Tier 1: Deterministic Engine (Primary) */}
        <mesh position={[0, 0.1, 0]}>
          <planeGeometry args={[0.62, 0.05]} />
          <meshBasicMaterial color="#064e3b" opacity={0.85} transparent />
        </mesh>
        <Text
          position={[0, 0.1, 0.01]}
          fontSize={0.019}
          color="#86efac"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"[TIER 1 PRIMARY]: DETERMINISTIC SCORING CORE"}
        </Text>

        {/* Tier 2: Gemini Reasoning (Secondary) */}
        <mesh position={[0, 0.03, 0]}>
          <planeGeometry args={[0.62, 0.05]} />
          <meshBasicMaterial color="#0c4a6e" opacity={0.85} transparent />
        </mesh>
        <Text
          position={[0, 0.03, 0.01]}
          fontSize={0.019}
          color="#7dd3fc"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"[TIER 2 SECONDARY]: NATURAL LANGUAGE RATIONALE"}
        </Text>

        {/* Fallback Path Indicator */}
        <mesh position={[0, -0.045, 0]}>
          <planeGeometry args={[0.62, 0.06]} />
          <meshBasicMaterial color="#081820" opacity={0.9} transparent />
        </mesh>
        <Text
          position={[0, -0.032, 0.01]}
          fontSize={0.017}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
        >
          {"RESILIENT FALLBACK: 15s ABORT TIMEOUT"}
        </Text>
        <Text
          position={[0, -0.055, 0.01]}
          fontSize={0.016}
          color="#cbd5e1"
          anchorX="center"
          anchorY="middle"
        >
          {"GEMINI TIMEOUT → CLIENT BASELINE UNINTERRUPTED"}
        </Text>
      </group>

      {/* Rationale Sample Preview */}
      <group position={[0, -0.22, 0.05]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.018}
          color="#67e8f9"
          anchorX="center"
          anchorY="middle"
        >
          {'"Candidate matches 2/2 required loom skills. Regional proximity high."'}
        </Text>
      </group>
    </group>
  );
}
