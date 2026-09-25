"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface MatchResultNodeProps {
  subProgress: number;
}

export function MatchResultNode({ subProgress }: MatchResultNodeProps) {
  const badgeRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.5 + Math.sin(t * 3.0) * 0.25;
      }
    }
  });

  // Calculate dynamic match score stabilization based on subProgress
  // (Starts calculating during data convergence, stabilizes around 92%)
  const scoreDisplay = subProgress < 0.35 ? "CALC..." : subProgress < 0.55 ? "87%" : "92%";
  const matchLevel = subProgress < 0.55 ? "PROCESSING" : "EXCELLENT FIT";

  return (
    <group ref={badgeRef} position={[0, -0.22, 0.2]}>
      {/* Central Match Score Plate */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[0.92, 0.28, 0.03]} />
        <meshStandardMaterial color="#05140b" roughness={0.7} metalness={0.7} />
      </mesh>
      <lineSegments position={[0, 0, -0.01]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.92, 0.28, 0.03)]} />
        <lineBasicMaterial color="#22c55e" opacity={0.8} />
      </lineSegments>

      {/* Pulsing Score Highlight */}
      <mesh ref={glowRef} position={[0, 0, 0.008]}>
        <planeGeometry args={[0.9, 0.26]} />
        <meshBasicMaterial color="#22c55e" opacity={0.15} transparent />
      </mesh>

      {/* Numeric Score */}
      <Text
        position={[-0.24, 0.02, 0.02]}
        fontSize={0.11}
        color="#86efac"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.02}
      >
        {scoreDisplay}
      </Text>

      {/* Score Telemetry Metadata */}
      <group position={[0.14, 0, 0.02]}>
        <Text
          position={[0, 0.07, 0]}
          fontSize={0.025}
          color="#4ade80"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
        >
          {`MATCH FOUND // ${matchLevel}`}
        </Text>
        <Text
          position={[0, 0.015, 0]}
          fontSize={0.021}
          color="#e2e8f0"
          anchorX="center"
          anchorY="middle"
        >
          {"SKILLS: MATCHED • LOCATION: VERIFIED • AMENITY: FIT"}
        </Text>
        <Text
          position={[0, -0.04, 0]}
          fontSize={0.018}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
        >
          {"VERIFIED BY DETERMINISTIC SCORING ENGINE"}
        </Text>
        <Text
          position={[0, -0.08, 0]}
          fontSize={0.015}
          color="#64748b"
          anchorX="center"
          anchorY="middle"
        >
          {"(HUMAN APPROVAL REQUIRED • NOT AUTONOMOUS HIRING)"}
        </Text>
      </group>
    </group>
  );
}
