"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface AcceptanceNodeProps {
  subProgress: number;
}

export function AcceptanceNode({ subProgress }: AcceptanceNodeProps) {
  const isAccepted = subProgress >= 0.68;
  const statusColor = isAccepted ? "#22c55e" : "#eab308";
  const statusText = isAccepted ? "MUTUAL ACCEPTANCE CONFIRMED" : "APPLICATION STATUS: PENDING";

  const linkBarRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (linkBarRef.current) {
      const mat = linkBarRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = isAccepted ? 0.8 + Math.sin(state.clock.elapsedTime * 3) * 0.3 : 0.2;
      }
    }
  });

  return (
    <group position={[0, -0.48, 0.25]}>
      {/* Mutual Acceptance Synchronized Indicator Bar */}
      <mesh ref={linkBarRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.08, 0.03]} />
        <meshStandardMaterial
          color={isAccepted ? "#064e3b" : "#422006"}
          emissive={isAccepted ? "#10b981" : "#ca8a04"}
          emissiveIntensity={0.5}
          roughness={0.4}
        />
      </mesh>
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.2, 0.08, 0.03)]} />
        <lineBasicMaterial color={statusColor} />
      </lineSegments>

      {/* Worker Action Indicator (Left) */}
      <group position={[-0.4, 0, 0.02]}>
        <Text
          position={[0, 0.015, 0]}
          fontSize={0.02}
          color="#86efac"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"WORKER: EXPRESS INTEREST"}
        </Text>
        <Text
          position={[0, -0.018, 0]}
          fontSize={0.016}
          color="#a3e635"
          anchorX="center"
          anchorY="middle"
        >
          {"[APPLICATION FILED ✓]"}
        </Text>
      </group>

      {/* Central Link Status Pill */}
      <group position={[0, 0.08, 0]}>
        <mesh position={[0, 0, -0.002]}>
          <planeGeometry args={[0.58, 0.05]} />
          <meshBasicMaterial color="#030c07" opacity={0.9} transparent />
        </mesh>
        <Text
          position={[0, 0, 0.005]}
          fontSize={0.02}
          color={statusColor}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
        >
          {statusText}
        </Text>
      </group>

      {/* Owner Action Indicator (Right) */}
      <group position={[0.4, 0, 0.02]}>
        <Text
          position={[0, 0.015, 0]}
          fontSize={0.02}
          color={isAccepted ? "#86efac" : "#fef08a"}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"FACTORY OWNER: CANDIDATE"}
        </Text>
        <Text
          position={[0, -0.018, 0]}
          fontSize={0.016}
          color={isAccepted ? "#22c55e" : "#ca8a04"}
          anchorX="center"
          anchorY="middle"
        >
          {isAccepted ? "[ACCEPTED APPLICATION ✓]" : "[PENDING OWNER REVIEW]"}
        </Text>
      </group>
    </group>
  );
}
