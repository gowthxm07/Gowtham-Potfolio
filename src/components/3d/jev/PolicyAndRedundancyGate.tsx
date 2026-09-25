"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface PolicyAndRedundancyGateProps {
  subProgress: number;
}

export function PolicyAndRedundancyGate({ subProgress }: PolicyAndRedundancyGateProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pulseGreenRef = useRef<THREE.Mesh>(null);
  const pulseAmberRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (pulseGreenRef.current) {
      pulseGreenRef.current.position.y = -0.15 + (Math.sin(t * 3.0) * 0.5 + 0.5) * -0.2;
    }
    if (pulseAmberRef.current) {
      pulseAmberRef.current.position.y = -0.15 + (Math.sin(t * 2.5 + 1) * 0.5 + 0.5) * -0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0.2, 0.45, 0.05]}>
      {/* Central Gate Body */}
      <mesh position={[0, 0.15, -0.01]}>
        <planeGeometry args={[1.5, 0.28]} />
        <meshStandardMaterial
          color="#060c18"
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.92}
        />
      </mesh>

      <lineSegments position={[0, 0.15, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.5, 0.28, 0.01)]} />
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </lineSegments>

      {/* Stage 1: Deterministic Policy Label */}
      <Text
        position={[-0.45, 0.23, 0.01]}
        fontSize={0.024}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {"STAGE 01 // DETERMINISTIC POLICY"}
      </Text>
      <Text
        position={[-0.45, 0.18, 0.01]}
        fontSize={0.018}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.02}
      >
        {"Maps Probabilities to Concrete Device Action"}
      </Text>

      {/* Stage 2: Redundancy Filter Label */}
      <Text
        position={[0.45, 0.23, 0.01]}
        fontSize={0.024}
        color="#f59e0b"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {"STAGE 02 // REDUNDANCY FILTER"}
      </Text>
      <Text
        position={[0.45, 0.18, 0.01]}
        fontSize={0.018}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.02}
      >
        {"If targetState == currentState → Skip Write"}
      </Text>

      {/* Dual Physical Output Conduits */}
      {/* 1. Green Conduit: Executed Actions */}
      <group position={[-0.45, -0.05, 0]}>
        {/* Pipe Bar */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.014, 0.014, 0.32, 12]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={0.6}
            metalness={0.9}
          />
        </mesh>
        {/* Moving Pulse Bead */}
        <mesh ref={pulseGreenRef} position={[0, -0.15, 0]}>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshBasicMaterial color="#34d399" />
        </mesh>
        {/* Badge */}
        <group position={[0, -0.34, 0.01]}>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[0.55, 0.08]} />
            <meshBasicMaterial color="#064e3b" />
          </mesh>
          <Text
            position={[0, 0.01, 0.01]}
            fontSize={0.022}
            color="#34d399"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.04}
          >
            {"EXECUTED ACTIONS (8)"}
          </Text>
          <Text
            position={[0, -0.02, 0.01]}
            fontSize={0.016}
            color="#a7f3d0"
            anchorX="center"
            anchorY="middle"
          >
            {"Lights OFF • Lock ON • AC 22°C • Curtains CLOSED"}
          </Text>
        </group>
      </group>

      {/* 2. Amber Conduit: Skipped Redundant Actions */}
      <group position={[0.45, -0.05, 0]}>
        {/* Pipe Bar */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.014, 0.014, 0.32, 12]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={0.6}
            metalness={0.9}
          />
        </mesh>
        {/* Moving Pulse Bead */}
        <mesh ref={pulseAmberRef} position={[0, -0.15, 0]}>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
        {/* Badge */}
        <group position={[0, -0.34, 0.01]}>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[0.55, 0.08]} />
            <meshBasicMaterial color="#78350f" />
          </mesh>
          <Text
            position={[0, 0.01, 0.01]}
            fontSize={0.022}
            color="#fbbf24"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.04}
          >
            {"SKIPPED REDUNDANT (2)"}
          </Text>
          <Text
            position={[0, -0.02, 0.01]}
            fontSize={0.016}
            color="#fde68a"
            anchorX="center"
            anchorY="middle"
          >
            {"TV Already OFF • Plug Already OFF"}
          </Text>
        </group>
      </group>
    </group>
  );
}
