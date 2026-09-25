"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface IntentNodeProps {
  subProgress: number;
}

export function IntentNode({ subProgress }: IntentNodeProps) {
  const cardRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (cardRef.current) {
      cardRef.current.position.y = 1.05 + Math.sin(t * 1.5) * 0.015;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.8;
    }
  });

  return (
    <group ref={cardRef} position={[-1.25, 1.05, 0.1]}>
      {/* Holographic Panel Backdrop */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.1, 0.58]} />
        <meshStandardMaterial
          color="#030712"
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Cyan Border Frame */}
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.1, 0.58, 0.01)]} />
        <lineBasicMaterial color="#06b6d4" transparent opacity={0.6} />
      </lineSegments>

      {/* Header Badge */}
      <Text
        position={[-0.45, 0.22, 0.01]}
        fontSize={0.026}
        color="#06b6d4"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"INPUT // USER INTENT"}
      </Text>

      {/* Pulsing Status Dot */}
      <mesh position={[-0.49, 0.22, 0.01]}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshBasicMaterial color="#06b6d4" />
      </mesh>

      {/* Active Natural Language Command */}
      <group position={[0, 0.11, 0.01]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[1.0, 0.12]} />
          <meshBasicMaterial color="#0e1726" />
        </mesh>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.042}
          color="#f8fafc"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {`"I'M GOING TO SLEEP."`}
        </Text>
      </group>

      {/* Context Tags */}
      <Text
        position={[-0.45, -0.01, 0.01]}
        fontSize={0.024}
        color="#94a3b8"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"EVALUATION WORKFLOW: NIGHT SLEEP ROUTINE"}
      </Text>

      {/* Secondary Verified Routines */}
      <group position={[0, -0.14, 0.01]}>
        <Text
          position={[-0.45, 0.04, 0]}
          fontSize={0.018}
          color="#64748b"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"SUPPORTED ROUTINES:"}
        </Text>
        <Text
          position={[-0.45, -0.02, 0]}
          fontSize={0.018}
          color="#38bdf8"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"LEAVING • MOVIE NIGHT • WORKING"}
        </Text>
        <Text
          position={[-0.45, -0.06, 0]}
          fontSize={0.018}
          color="#38bdf8"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"COMING HOME • RELAXING • WAKING UP"}
        </Text>
      </group>

      {/* Intent Token Ingest Animation Ring */}
      <mesh ref={ringRef} position={[0.42, 0.22, 0.01]}>
        <ringGeometry args={[0.018, 0.025, 16]} />
        <meshBasicMaterial color="#06b6d4" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
