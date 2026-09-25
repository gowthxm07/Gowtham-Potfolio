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
        fontSize={0.024}
        color="#c084fc"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"STRUCTURED PROBABILITY TRACE"}
      </Text>
      <Text
        position={[-0.45, 0.205, 0.01]}
        fontSize={0.015}
        color="#94a3b8"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.03}
      >
        {"ILLUSTRATIVE TRACE // NOT EMPIRICAL BENCHMARK"}
      </Text>

      {/* 1. NOUL Primitive (Binary Distribution) */}
      <group position={[-0.45, 0.12, 0.01]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.019}
          color="#e9d5ff"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"NOUL PRIMITIVE (BINARY PROBABILITY):"}
        </Text>

        {/* TV State */}
        <group position={[0, -0.045, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.017}
            color="#94a3b8"
            anchorX="left"
            anchorY="middle"
          >
            {"LR_TV.power:"}
          </Text>
          {/* Neutral Probability Bar */}
          <mesh position={[0.3, 0, 0]}>
            <planeGeometry args={[0.26, 0.018]} />
            <meshBasicMaterial color="#a855f7" />
          </mesh>
          <Text
            position={[0.52, 0, 0]}
            fontSize={0.016}
            color="#f8fafc"
            anchorX="left"
            anchorY="middle"
          >
            {"OFF (DISTRIBUTION)"}
          </Text>
        </group>

        {/* Bedroom Light */}
        <group position={[0, -0.085, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.017}
            color="#94a3b8"
            anchorX="left"
            anchorY="middle"
          >
            {"BR_Light.power:"}
          </Text>
          <mesh position={[0.3, 0, 0]}>
            <planeGeometry args={[0.28, 0.018]} />
            <meshBasicMaterial color="#a855f7" />
          </mesh>
          <Text
            position={[0.52, 0, 0]}
            fontSize={0.016}
            color="#f8fafc"
            anchorX="left"
            anchorY="middle"
          >
            {"OFF (DISTRIBUTION)"}
          </Text>
        </group>

        {/* Entrance Lock */}
        <group position={[0, -0.125, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.017}
            color="#94a3b8"
            anchorX="left"
            anchorY="middle"
          >
            {"Ent_Lock.state:"}
          </Text>
          <mesh position={[0.3, 0, 0]}>
            <planeGeometry args={[0.27, 0.018]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
          <Text
            position={[0.52, 0, 0]}
            fontSize={0.016}
            color="#f8fafc"
            anchorX="left"
            anchorY="middle"
          >
            {"LOCKED (DISTRIBUTION)"}
          </Text>
        </group>
      </group>

      {/* 2. CHOICE Primitive (Categorical Distribution) */}
      <group position={[-0.45, -0.08, 0.01]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.019}
          color="#38bdf8"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"CHOICE PRIMITIVE (CATEGORICAL DISTRIBUTION):"}
        </Text>

        <group position={[0, -0.045, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.017}
            color="#94a3b8"
            anchorX="left"
            anchorY="middle"
          >
            {"BR_AC.mode:"}
          </Text>
          <Text
            position={[0.2, 0, 0]}
            fontSize={0.017}
            color="#38bdf8"
            anchorX="left"
            anchorY="middle"
          >
            {"[COOL • AUTO • FAN • HEAT]"}
          </Text>
        </group>

        <group position={[0, -0.085, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.017}
            color="#94a3b8"
            anchorX="left"
            anchorY="middle"
          >
            {"BR_AC.targetTemp:"}
          </Text>
          <Text
            position={[0.2, 0, 0]}
            fontSize={0.017}
            color="#10b981"
            anchorX="left"
            anchorY="middle"
          >
            {"22°C (VALIDATED BOUNDARY: 16°C – 30°C)"}
          </Text>
        </group>
      </group>

      {/* Execution Flag */}
      <Text
        position={[0, -0.24, 0.01]}
        fontSize={0.016}
        color="#a855f7"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"PASSED TO POLICY-LEVEL REDUNDANCY CHECK →"}
      </Text>
    </group>
  );
}
