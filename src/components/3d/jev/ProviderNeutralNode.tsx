"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface ProviderNeutralNodeProps {
  subProgress: number;
}

export function ProviderNeutralNode({ subProgress }: ProviderNeutralNodeProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = -0.7 + Math.sin(t * 1.6 + 1) * 0.01;
    }
  });

  return (
    <group ref={groupRef} position={[0.25, -0.7, 0.08]}>
      {/* Node Backing Panel */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.15, 0.42]} />
        <meshStandardMaterial
          color="#030712"
          roughness={0.25}
          metalness={0.8}
          transparent
          opacity={0.92}
        />
      </mesh>

      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.15, 0.42, 0.01)]} />
        <lineBasicMaterial color="#a855f7" transparent opacity={0.6} />
      </lineSegments>

      {/* Header */}
      <Text
        position={[0, 0.15, 0.01]}
        fontSize={0.024}
        color="#c084fc"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"PROVIDER-NEUTRAL ARCHITECTURE"}
      </Text>
      <Text
        position={[0, 0.11, 0.01]}
        fontSize={0.018}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.02}
      >
        {"TypeScript Interface: DecisionEngine"}
      </Text>

      {/* Two Provider Branches */}
      {/* 1. Jev System One Provider */}
      <group position={[-0.28, -0.02, 0.01]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[0.5, 0.14]} />
          <meshBasicMaterial color="#1e1035" />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.5, 0.14, 0.005)]} />
          <lineBasicMaterial color="#a855f7" />
        </lineSegments>
        <Text
          position={[0, 0.035, 0.01]}
          fontSize={0.02}
          color="#e9d5ff"
          anchorX="center"
          anchorY="middle"
        >
          {"TYPE SAFE JEV"}
        </Text>
        <Text
          position={[0, 0.005, 0.01]}
          fontSize={0.016}
          color="#c084fc"
          anchorX="center"
          anchorY="middle"
        >
          {"System One API"}
        </Text>
        <Text
          position={[0, -0.035, 0.01]}
          fontSize={0.014}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
        >
          {"Noul & Choice Primitives"}
        </Text>
      </group>

      {/* 2. Local Ollama Provider */}
      <group position={[0.28, -0.02, 0.01]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[0.5, 0.14]} />
          <meshBasicMaterial color="#0c1e28" />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.5, 0.14, 0.005)]} />
          <lineBasicMaterial color="#06b6d4" />
        </lineSegments>
        <Text
          position={[0, 0.035, 0.01]}
          fontSize={0.02}
          color="#cffafe"
          anchorX="center"
          anchorY="middle"
        >
          {"LOCAL OLLAMA"}
        </Text>
        <Text
          position={[0, 0.005, 0.01]}
          fontSize={0.016}
          color="#06b6d4"
          anchorX="center"
          anchorY="middle"
        >
          {"Llama 3.2 Evaluation"}
        </Text>
        <Text
          position={[0, -0.035, 0.01]}
          fontSize={0.014}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
        >
          {"Provider Comparison Baseline"}
        </Text>
      </group>

      {/* Neutral Contract Footnote */}
      <Text
        position={[0, -0.14, 0.01]}
        fontSize={0.016}
        color="#e2e8f0"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.03}
      >
        {"EQUAL TEST SCENARIOS • OBJECTIVE COMPARISON ONLY"}
      </Text>
    </group>
  );
}
