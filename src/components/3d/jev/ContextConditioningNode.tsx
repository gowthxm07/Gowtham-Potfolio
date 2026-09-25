"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface ContextConditioningNodeProps {
  subProgress: number;
}

export function ContextConditioningNode({ subProgress }: ContextConditioningNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const flowMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = 1.05 + Math.sin(t * 1.6 + 1) * 0.012;
    }
    if (flowMeshRef.current) {
      const mat = flowMeshRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.4 + Math.sin(t * 4.0) * 0.3;
      }
    }
  });

  return (
    <group ref={groupRef} position={[-0.45, 1.05, 0.05]}>
      {/* Context Packet Chassis */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[0.7, 0.54]} />
        <meshStandardMaterial
          color="#060c18"
          roughness={0.25}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.7, 0.54, 0.01)]} />
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.5} />
      </lineSegments>

      {/* Header */}
      <Text
        position={[-0.3, 0.21, 0.01]}
        fontSize={0.024}
        color="#38bdf8"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"CONTEXT CONDITIONING"}
      </Text>

      {/* Packet Fields */}
      <group position={[-0.3, 0.12, 0.01]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.02}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"SIMULATION TIME:"}
        </Text>
        <Text
          position={[0.26, 0, 0]}
          fontSize={0.022}
          color="#f8fafc"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"23:15:00 (NIGHT)"}
        </Text>
      </group>

      <group position={[-0.3, 0.05, 0.01]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.02}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"INVENTORY INGEST:"}
        </Text>
        <Text
          position={[0.26, 0, 0]}
          fontSize={0.022}
          color="#06b6d4"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"18 LIVE STATES"}
        </Text>
      </group>

      <group position={[-0.3, -0.02, 0.01]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.02}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"DATASET CATEGORY:"}
        </Text>
        <Text
          position={[0.26, 0, 0]}
          fontSize={0.022}
          color="#a855f7"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"NORMAL // SLEEP"}
        </Text>
      </group>

      <group position={[-0.3, -0.09, 0.01]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.02}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"PRE-VALIDATION:"}
        </Text>
        <Text
          position={[0.26, 0, 0]}
          fontSize={0.022}
          color="#10b981"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"CAPABILITY OK"}
        </Text>
      </group>

      {/* Data Flow Arrow Indicator to Jev Core */}
      <mesh ref={flowMeshRef} position={[0.24, -0.19, 0.01]}>
        <planeGeometry args={[0.15, 0.03]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.7} />
      </mesh>
      <Text
        position={[0.24, -0.19, 0.02]}
        fontSize={0.018}
        color="#f8fafc"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"DISPATCH →"}
      </Text>
    </group>
  );
}
