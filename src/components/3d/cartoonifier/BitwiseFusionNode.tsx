"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface BitwiseFusionNodeProps {
  subProgress: number;
}

export function BitwiseFusionNode({ subProgress }: BitwiseFusionNodeProps) {
  const corePrismRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (corePrismRef.current) {
      corePrismRef.current.rotation.y = state.clock.elapsedTime * 0.8;
      corePrismRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -state.clock.elapsedTime * 1.2;
    }
  });

  return (
    <group position={[0, 0.45, 0.85]}>
      {/* 01. FUSION CONVERGENCE GUIDE ARMS FROM PATH A & PATH B */}
      {/* Left arm from Path A */}
      <mesh position={[-0.45, 0, -0.35]} rotation={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.9, 12]} />
        <meshBasicMaterial color="#22c55e" opacity={0.65} transparent />
      </mesh>
      {/* Right arm from Path B */}
      <mesh position={[0.45, 0, -0.35]} rotation={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.9, 12]} />
        <meshBasicMaterial color="#86efac" opacity={0.65} transparent />
      </mesh>

      {/* 02. CENTRAL FUSION CHAMBER HOUSING */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.52, 24]} />
        <meshPhysicalMaterial
          color="#031008"
          roughness={0.15}
          metalness={0.85}
          transmission={0.5}
          transparent
          opacity={0.8}
          reflectivity={0.6}
        />
      </mesh>

      {/* Chamber Outer Rib Rings */}
      {[-0.24, 0, 0.24].map((ry, idx) => (
        <mesh key={idx} position={[0, ry, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.46, 0.012, 16, 32]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
      ))}

      {/* 03. REFRACTIVE OPTICAL PRISM CORE */}
      <mesh ref={corePrismRef} position={[0, 0, 0]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshPhysicalMaterial
          color="#4ade80"
          emissive="#22c55e"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.3}
          transmission={0.85}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Rotating Convergence Reticle */}
      <group ref={ringRef} position={[0, 0, 0.26]}>
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[0.18, 0.21, 32]} />
          <meshBasicMaterial color="#86efac" opacity={0.7} transparent />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.46, 0.01, 0.001]} />
          <meshBasicMaterial color="#86efac" opacity={0.5} transparent />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.01, 0.46, 0.001]} />
          <meshBasicMaterial color="#86efac" opacity={0.5} transparent />
        </mesh>
      </group>

      {/* 04. TECHNICAL ANNOTATION LABELS */}
      <Text
        position={[0, 0.42, 0]}
        fontSize={0.052}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"BITWISE FUSION CHAMBER"}
      </Text>

      <Text
        position={[0, 0.35, 0]}
        fontSize={0.038}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {"cv2.bitwise_and(color, edges)"}
      </Text>

      <Text
        position={[0, -0.38, 0]}
        fontSize={0.034}
        color="#86efac"
        anchorX="center"
        anchorY="middle"
      >
        {"QUANTIZED COLOR + STRUCTURAL EDGES"}
      </Text>
    </group>
  );
}
