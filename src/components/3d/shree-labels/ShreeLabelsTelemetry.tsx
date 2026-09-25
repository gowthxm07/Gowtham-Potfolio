"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface ShreeLabelsTelemetryProps {
  subProgress: number;
}

export function ShreeLabelsTelemetry({ subProgress }: ShreeLabelsTelemetryProps) {
  const panelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (panelRef.current) {
      panelRef.current.position.y = 1.05 + Math.sin(state.clock.elapsedTime * 1.3) * 0.015;
    }
  });

  return (
    <group ref={panelRef} position={[-2.1, 1.05, 0.15]} rotation={[0.04, 0.35, 0]}>
      {/* Telemetry Header */}
      <Text
        position={[0, 0.44, 0]}
        fontSize={0.038}
        color="#2f80ed"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"VERIFIED TECHNICAL STACK"}
      </Text>
      <Text
        position={[0, 0.38, 0]}
        fontSize={0.022}
        color="#94b8df"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"VANILLA WEB & CLOUD SERVICES"}
      </Text>

      {/* Main Glass Chassis */}
      <mesh position={[0, 0.04, -0.01]}>
        <boxGeometry args={[0.76, 0.58, 0.02]} />
        <meshStandardMaterial color="#071426" roughness={0.7} metalness={0.7} />
      </mesh>
      <lineSegments position={[0, 0.04, -0.01]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.76, 0.58, 0.02)]} />
        <lineBasicMaterial color="#1e6fb9" opacity={0.7} />
      </lineSegments>

      {/* Spec 01: Core Web Stack */}
      <group position={[0, 0.22, 0.01]}>
        <Text
          position={[-0.34, 0.03, 0]}
          fontSize={0.018}
          color="#2f80ed"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"CORE FRONTEND"}
        </Text>
        <Text
          position={[-0.34, -0.015, 0]}
          fontSize={0.024}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
        >
          {"HTML5 • CSS3 • ES6 JAVASCRIPT"}
        </Text>
      </group>

      {/* Spec 02: Real-Time Database */}
      <group position={[0, 0.08, 0.01]}>
        <Text
          position={[-0.34, 0.03, 0]}
          fontSize={0.018}
          color="#2f80ed"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"CLOUD DATABASE & AUTH"}
        </Text>
        <Text
          position={[-0.34, -0.015, 0]}
          fontSize={0.022}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
        >
          {"FIREBASE FIRESTORE • ANONYMOUS AUTH"}
        </Text>
        <Text
          position={[-0.34, -0.05, 0]}
          fontSize={0.018}
          color="#94b8df"
          anchorX="left"
          anchorY="middle"
        >
          {"REAL-TIME onSnapshot"}
        </Text>
      </group>

      {/* Spec 03: Communication & Map */}
      <group position={[0, -0.07, 0.01]}>
        <Text
          position={[-0.34, 0.03, 0]}
          fontSize={0.018}
          color="#2f80ed"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"SERVICES & HOSTING"}
        </Text>
        <Text
          position={[-0.34, -0.015, 0]}
          fontSize={0.022}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
        >
          {"EMAILJS • GOOGLE MAPS • VERCEL"}
        </Text>
      </group>

      {/* Verified Notice */}
      <group position={[0, -0.17, 0.01]}>
        <Text
          position={[0, 0.01, 0]}
          fontSize={0.015}
          color="#d3e6fa"
          anchorX="center"
          anchorY="middle"
        >
          {"ZERO-BUILD ARCHITECTURE • ZERO CUSTOM BACKEND"}
        </Text>
      </group>
    </group>
  );
}
