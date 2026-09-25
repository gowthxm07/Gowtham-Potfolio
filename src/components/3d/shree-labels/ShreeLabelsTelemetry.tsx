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
        {"ARCHITECTURE // TECH SPECIFICATION"}
      </Text>
      <Text
        position={[0, 0.38, 0]}
        fontSize={0.022}
        color="#94b8df"
        anchorX="center"
        anchorY="middle"
      >
        {"ZERO-BUILD RUNTIME & CLOUD INTEGRATIONS"}
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
          {"CORE PLATFORM STACK"}
        </Text>
        <Text
          position={[-0.34, -0.015, 0]}
          fontSize={0.028}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
        >
          {"HTML5 / CSS3 / ES6"}
        </Text>
        <Text
          position={[0.34, -0.015, 0]}
          fontSize={0.016}
          color="#94b8df"
          anchorX="right"
          anchorY="middle"
        >
          {"ZERO-BUILD"}
        </Text>
      </group>

      {/* Spec 02: Real-Time Database */}
      <group position={[0, 0.09, 0.01]}>
        <Text
          position={[-0.34, 0.03, 0]}
          fontSize={0.018}
          color="#2f80ed"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"DATABASE & FEEDBACK"}
        </Text>
        <Text
          position={[-0.34, -0.015, 0]}
          fontSize={0.026}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
        >
          {"FIRESTORE onSnapshot"}
        </Text>
        <Text
          position={[0.34, -0.015, 0]}
          fontSize={0.016}
          color="#94b8df"
          anchorX="right"
          anchorY="middle"
        >
          {"ANON AUTH"}
        </Text>
      </group>

      {/* Spec 03: Communication & Map */}
      <group position={[0, -0.04, 0.01]}>
        <Text
          position={[-0.34, 0.03, 0]}
          fontSize={0.018}
          color="#2f80ed"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"DISPATCH & LOCATION"}
        </Text>
        <Text
          position={[-0.34, -0.015, 0]}
          fontSize={0.026}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
        >
          {"EMAILJS + MAPS"}
        </Text>
        <Text
          position={[0.34, -0.015, 0]}
          fontSize={0.016}
          color="#94b8df"
          anchorX="right"
          anchorY="middle"
        >
          {"VERCEL HOST"}
        </Text>
      </group>

      {/* Performance Audit Notice */}
      <group position={[0, -0.16, 0.01]}>
        <Text
          position={[0, 0.02, 0]}
          fontSize={0.016}
          color="#d3e6fa"
          anchorX="center"
          anchorY="middle"
        >
          {"• OEKO-TEX 100 • SEDEX ETHICAL AUDIT"}
        </Text>
        <Text
          position={[0, -0.02, 0]}
          fontSize={0.014}
          color="#64748b"
          anchorX="center"
          anchorY="middle"
        >
          {"NO VERIFIED SYNTHETIC BENCHMARK IN REPO"}
        </Text>
      </group>
    </group>
  );
}
