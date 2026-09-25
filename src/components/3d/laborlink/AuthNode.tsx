"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface AuthNodeProps {
  subProgress: number;
}

export function AuthNode({ subProgress }: AuthNodeProps) {
  const lockRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (lockRef.current) {
      lockRef.current.position.y = -0.55 + Math.sin(state.clock.elapsedTime * 1.5) * 0.01;
    }
  });

  return (
    <group ref={lockRef} position={[-1.48, -0.55, 0.05]} rotation={[0.02, 0.25, 0]}>
      {/* Node Header */}
      <Text
        position={[0, 0.28, 0]}
        fontSize={0.034}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"IDENTITY GATE // FIREBASE AUTH"}
      </Text>
      <Text
        position={[0, 0.23, 0]}
        fontSize={0.02}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        {"DUAL-PROVIDER AUTHENTICATION & ROLE GATEWAY"}
      </Text>

      {/* Main Plate */}
      <mesh position={[0, 0.04, -0.01]}>
        <boxGeometry args={[0.72, 0.32, 0.02]} />
        <meshStandardMaterial color="#05101a" roughness={0.7} metalness={0.8} />
      </mesh>
      <lineSegments position={[0, 0.04, -0.01]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.72, 0.32, 0.02)]} />
        <lineBasicMaterial color="#38bdf8" opacity={0.6} />
      </lineSegments>

      {/* Auth Methods List */}
      <group position={[0, 0.06, 0.01]}>
        {/* Phone OTP */}
        <mesh position={[0, 0.055, 0]}>
          <planeGeometry args={[0.66, 0.045]} />
          <meshBasicMaterial color="#0c2d48" opacity={0.8} transparent />
        </mesh>
        <Text
          position={[0, 0.055, 0.005]}
          fontSize={0.018}
          color="#7dd3fc"
          anchorX="center"
          anchorY="middle"
        >
          {"• PHONE NUMBER OTP (+91) + RECAPTCHA"}
        </Text>

        {/* Google OAuth */}
        <mesh position={[0, 0.005, 0]}>
          <planeGeometry args={[0.66, 0.045]} />
          <meshBasicMaterial color="#0c2d48" opacity={0.8} transparent />
        </mesh>
        <Text
          position={[0, 0.005, 0.005]}
          fontSize={0.018}
          color="#7dd3fc"
          anchorX="center"
          anchorY="middle"
        >
          {"• GOOGLE OAUTH 2.0 (POPUP SIGN-IN)"}
        </Text>
      </group>

      {/* Role Selection Dispatcher */}
      <group position={[0, -0.055, 0.01]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[0.66, 0.055]} />
          <meshBasicMaterial color="#03180c" opacity={0.9} transparent />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.66, 0.055, 0.002)]} />
          <lineBasicMaterial color="#22c55e" opacity={0.5} />
        </lineSegments>
        <Text
          position={[0, 0.01, 0.005]}
          fontSize={0.017}
          color="#86efac"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"ROLE SELECTION ROUTER (/role-selection)"}
        </Text>
        <Text
          position={[0, -0.012, 0.005]}
          fontSize={0.015}
          color="#e2e8f0"
          anchorX="center"
          anchorY="middle"
        >
          {"[ WORKER DASHBOARD ] ↔ [ OWNER DASHBOARD ]"}
        </Text>
      </group>
    </group>
  );
}
