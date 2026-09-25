"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface ReputationLoopProps {
  subProgress: number;
}

export function ReputationLoop({ subProgress }: ReputationLoopProps) {
  const loopRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (loopRef.current) {
      loopRef.current.position.y = -0.55 + Math.sin(state.clock.elapsedTime * 1.6) * 0.012;
    }
  });

  return (
    <group ref={loopRef} position={[1.48, -0.55, 0.05]} rotation={[0.02, -0.25, 0]}>
      {/* Node Header */}
      <Text
        position={[0, 0.28, 0]}
        fontSize={0.034}
        color="#fbbf24"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"REPUTATION // MUTUAL REVIEW LOOP"}
      </Text>
      <Text
        position={[0, 0.23, 0]}
        fontSize={0.02}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        {"FEEDBACK LOOP FEEDS CANDIDATE RANKING (20% WEIGHT)"}
      </Text>

      {/* Main Plate */}
      <mesh position={[0, 0.04, -0.01]}>
        <boxGeometry args={[0.72, 0.32, 0.02]} />
        <meshStandardMaterial color="#1a1405" roughness={0.7} metalness={0.8} />
      </mesh>
      <lineSegments position={[0, 0.04, -0.01]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.72, 0.32, 0.02)]} />
        <lineBasicMaterial color="#eab308" opacity={0.6} />
      </lineSegments>

      {/* 4-Stage Feedback Step Pipeline */}
      <group position={[0, 0.08, 0.01]}>
        <Text
          position={[0, 0.06, 0]}
          fontSize={0.018}
          color="#fef08a"
          anchorX="center"
          anchorY="middle"
        >
          {"1. COMPLETED WORK ENGAGEMENT"}
        </Text>
        <Text
          position={[0, 0.025, 0]}
          fontSize={0.018}
          color="#fde047"
          anchorX="center"
          anchorY="middle"
        >
          {"↓ 2. MUTUAL REVIEW & 1-5★ RATING"}
        </Text>
        <Text
          position={[0, -0.01, 0]}
          fontSize={0.018}
          color="#facc15"
          anchorX="center"
          anchorY="middle"
        >
          {"↓ 3. THEMATIC FEEDBACK EXTRACTION"}
        </Text>
        <Text
          position={[0, -0.045, 0]}
          fontSize={0.018}
          color="#86efac"
          anchorX="center"
          anchorY="middle"
        >
          {"↓ 4. FEEDS CANDIDATE RANKING (20%)"}
        </Text>
      </group>

      {/* Star Rating Badge */}
      <group ref={starsRef} position={[0, -0.065, 0.01]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[0.66, 0.045]} />
          <meshBasicMaterial color="#0b2413" opacity={0.9} transparent />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.66, 0.045, 0.002)]} />
          <lineBasicMaterial color="#22c55e" opacity={0.5} />
        </lineSegments>
        <Text
          position={[0, 0, 0.005]}
          fontSize={0.018}
          color="#86efac"
          anchorX="center"
          anchorY="middle"
        >
          {"VERIFIED WORKER SCORE: ★ 4.8 / 5.0 (2 REVIEWS)"}
        </Text>
      </group>
    </group>
  );
}
