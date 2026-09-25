"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface EvaluationLabNodeProps {
  subProgress: number;
}

export function EvaluationLabNode({ subProgress }: EvaluationLabNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const badgeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = -0.7 + Math.sin(t * 1.5 + 2) * 0.01;
    }
    if (badgeRef.current) {
      const mat = (badgeRef.current.children[0] as THREE.Mesh).material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.85 + Math.sin(t * 2.5) * 0.15;
      }
    }
  });

  return (
    <group ref={groupRef} position={[1.45, -0.7, 0.1]}>
      {/* Node Backing Panel */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.05, 0.42]} />
        <meshStandardMaterial
          color="#060c18"
          roughness={0.25}
          metalness={0.8}
          transparent
          opacity={0.92}
        />
      </mesh>

      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.05, 0.42, 0.01)]} />
        <lineBasicMaterial color="#10b981" transparent opacity={0.6} />
      </lineSegments>

      {/* Header */}
      <Text
        position={[-0.45, 0.15, 0.01]}
        fontSize={0.024}
        color="#10b981"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"EVALUATION LAB // DATASET AUDIT"}
      </Text>

      {/* 36 Scenarios / 7 Categories */}
      <Text
        position={[-0.45, 0.1, 0.01]}
        fontSize={0.018}
        color="#f8fafc"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.03}
      >
        {"36 CONTROLLED SCENARIOS ACROSS 7 CATEGORIES:"}
      </Text>

      {/* Category Breakdown Chips */}
      <group position={[-0.45, 0.04, 0.01]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.015}
          color="#38bdf8"
          anchorX="left"
          anchorY="middle"
        >
          {"• NORMAL (6) • PARTIAL STATE (6) • NO-OP (5)"}
        </Text>
        <Text
          position={[0, -0.032, 0]}
          fontSize={0.015}
          color="#38bdf8"
          anchorX="left"
          anchorY="middle"
        >
          {"• MULTI-DEVICE (6) • CONTEXT (5) • SECURITY (4) • AMBIGUOUS (4)"}
        </Text>
      </group>

      {/* SHA-256 Fingerprint */}
      <group position={[-0.45, -0.06, 0.01]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.015}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
        >
          {"STATE REPRODUCIBILITY:"}
        </Text>
        <Text
          position={[0.26, 0, 0]}
          fontSize={0.015}
          color="#c084fc"
          anchorX="left"
          anchorY="middle"
        >
          {"SHA-256 State Fingerprinting"}
        </Text>
      </group>

      {/* Vitest Test Suite Badge */}
      <group ref={badgeRef} position={[0, -0.13, 0.01]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[0.95, 0.05]} />
          <meshBasicMaterial color="#064e3b" transparent opacity={0.9} />
        </mesh>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.018}
          color="#34d399"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"VITEST // 19 TEST FILES • 181 TESTS PASSED (100%)"}
        </Text>
      </group>
    </group>
  );
}
