"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface SimulationEngineNodeProps {
  subProgress: number;
}

export function SimulationEngineNode({ subProgress }: SimulationEngineNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = -0.7 + Math.sin(t * 1.4) * 0.01;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[-1.0, -0.7, 0.1]}>
      {/* Node Backing Panel */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.05, 0.42]} />
        <meshStandardMaterial
          color="#060f1e"
          roughness={0.25}
          metalness={0.8}
          transparent
          opacity={0.92}
        />
      </mesh>

      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.05, 0.42, 0.01)]} />
        <lineBasicMaterial color="#06b6d4" transparent opacity={0.6} />
      </lineSegments>

      {/* Header */}
      <group position={[-0.45, 0.15, 0.01]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.024}
          color="#06b6d4"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.06}
        >
          {"SIMULATION ENGINE // IN-MEMORY TWIN"}
        </Text>
      </group>

      {/* Validation Checklist */}
      <group position={[-0.45, 0.07, 0.01]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.019}
          color="#10b981"
          anchorX="left"
          anchorY="middle"
        >
          {"✓ CAPABILITY CHECK:"}
        </Text>
        <Text
          position={[0.26, 0, 0]}
          fontSize={0.019}
          color="#f8fafc"
          anchorX="left"
          anchorY="middle"
        >
          {"Action Valid for Device Category"}
        </Text>
      </group>

      <group position={[-0.45, 0.01, 0.01]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.019}
          color="#10b981"
          anchorX="left"
          anchorY="middle"
        >
          {"✓ BOUNDARY VERIFIED:"}
        </Text>
        <Text
          position={[0.26, 0, 0]}
          fontSize={0.019}
          color="#f8fafc"
          anchorX="left"
          anchorY="middle"
        >
          {"Temp 16–30°C • Dimmer Level 0–100"}
        </Text>
      </group>

      <group position={[-0.45, -0.05, 0.01]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.019}
          color="#10b981"
          anchorX="left"
          anchorY="middle"
        >
          {"✓ 18-DEVICE STATE VALIDATION:"}
        </Text>
        <Text
          position={[0.34, 0, 0]}
          fontSize={0.019}
          color="#f8fafc"
          anchorX="left"
          anchorY="middle"
        >
          {"18 Virtual Devices In-Memory Synchronized"}
        </Text>
      </group>

      {/* Hardware Warning Callout */}
      <group position={[0, -0.13, 0.01]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[0.95, 0.05]} />
          <meshBasicMaterial color="#0b172a" />
        </mesh>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.017}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"SOFTWARE SIMULATION • ZERO PHYSICAL HARDWARE / RELAYS"}
        </Text>
      </group>

      {/* Decorative Gear/Ring */}
      <mesh ref={ringRef} position={[0.42, 0.15, 0.01]}>
        <ringGeometry args={[0.018, 0.025, 12]} />
        <meshBasicMaterial color="#06b6d4" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
