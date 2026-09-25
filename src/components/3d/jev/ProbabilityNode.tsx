"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface ProbabilityNodeProps {
  subProgress: number;
}

export function ProbabilityNode({ subProgress }: ProbabilityNodeProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = 1.05 + Math.sin(t * 1.5 + 2) * 0.014;
    }
  });

  return (
    <group ref={groupRef} position={[0.95, 1.05, 0.05]}>
      {/* Panel Chassis */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.05, 0.62]} />
        <meshStandardMaterial
          color="#030712"
          roughness={0.25}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.05, 0.62, 0.01)]} />
        <lineBasicMaterial color="#a855f7" transparent opacity={0.6} />
      </lineSegments>

      {/* Header */}
      <Text
        position={[-0.45, 0.25, 0.01]}
        fontSize={0.026}
        color="#c084fc"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"STRUCTURED PROBABILITY OUTPUT"}
      </Text>

      {/* 1. NOUL Primitive (Binary Distribution) */}
      <group position={[-0.45, 0.15, 0.01]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.02}
          color="#e9d5ff"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"NOUL PRIMITIVE (BINARY PROBABILITY):"}
        </Text>

        {/* TV State */}
        <group position={[0, -0.05, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.018}
            color="#94a3b8"
            anchorX="left"
            anchorY="middle"
          >
            {"LR_TV.power:"}
          </Text>
          {/* Bar: 97.4% OFF */}
          <mesh position={[0.3, 0, 0]}>
            <planeGeometry args={[0.28, 0.02]} />
            <meshBasicMaterial color="#a855f7" />
          </mesh>
          <Text
            position={[0.55, 0, 0]}
            fontSize={0.017}
            color="#f8fafc"
            anchorX="left"
            anchorY="middle"
          >
            {"OFF 97.4%"}
          </Text>
        </group>

        {/* Bedroom Light */}
        <group position={[0, -0.09, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.018}
            color="#94a3b8"
            anchorX="left"
            anchorY="middle"
          >
            {"BR_Light.power:"}
          </Text>
          <mesh position={[0.3, 0, 0]}>
            <planeGeometry args={[0.3, 0.02]} />
            <meshBasicMaterial color="#a855f7" />
          </mesh>
          <Text
            position={[0.55, 0, 0]}
            fontSize={0.017}
            color="#f8fafc"
            anchorX="left"
            anchorY="middle"
          >
            {"OFF 99.1%"}
          </Text>
        </group>

        {/* Entrance Lock */}
        <group position={[0, -0.13, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.018}
            color="#94a3b8"
            anchorX="left"
            anchorY="middle"
          >
            {"Ent_Lock.state:"}
          </Text>
          <mesh position={[0.3, 0, 0]}>
            <planeGeometry args={[0.29, 0.02]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
          <Text
            position={[0.55, 0, 0]}
            fontSize={0.017}
            color="#f8fafc"
            anchorX="left"
            anchorY="middle"
          >
            {"LOCKED 98.8%"}
          </Text>
        </group>
      </group>

      {/* 2. CHOICE Primitive (Categorical Distribution) */}
      <group position={[-0.45, -0.1, 0.01]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.02}
          color="#38bdf8"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"CHOICE PRIMITIVE (CATEGORICAL DISTRIBUTION):"}
        </Text>

        <group position={[0, -0.05, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.018}
            color="#94a3b8"
            anchorX="left"
            anchorY="middle"
          >
            {"BR_AC.mode:"}
          </Text>
          <Text
            position={[0.2, 0, 0]}
            fontSize={0.018}
            color="#38bdf8"
            anchorX="left"
            anchorY="middle"
          >
            {"[COOL: 88% • AUTO: 9% • FAN: 2% • HEAT: 1%]"}
          </Text>
        </group>

        <group position={[0, -0.09, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.018}
            color="#94a3b8"
            anchorX="left"
            anchorY="middle"
          >
            {"BR_AC.targetTemp:"}
          </Text>
          <Text
            position={[0.2, 0, 0]}
            fontSize={0.018}
            color="#10b981"
            anchorX="left"
            anchorY="middle"
          >
            {"22°C (VERIFIED RANGE: [16°C – 30°C])"}
          </Text>
        </group>
      </group>

      {/* Execution Flag */}
      <Text
        position={[0, -0.25, 0.01]}
        fontSize={0.018}
        color="#a855f7"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"PASSED TO DETERMINISTIC POLICY ENGINE →"}
      </Text>
    </group>
  );
}
