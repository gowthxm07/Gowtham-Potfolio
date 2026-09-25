"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface QuoteNodeProps {
  subProgress: number;
}

export function QuoteNode({ subProgress }: QuoteNodeProps) {
  const nodeRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (nodeRef.current) {
      nodeRef.current.position.y = -0.35 + Math.sin(t * 1.5) * 0.012;
    }
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = 0.8 + Math.sin(t * 3.0) * 0.3;
      }
    }
  });

  return (
    <group ref={nodeRef} position={[0.85, -0.35, 0.25]} rotation={[0.02, -0.2, 0]}>
      {/* Node Header */}
      <Text
        position={[0, 0.28, 0]}
        fontSize={0.036}
        color="#1e6fb9"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"COMMERCIAL QUOTATION CONDUIT"}
      </Text>
      <Text
        position={[0, 0.23, 0]}
        fontSize={0.02}
        color="#5b7d9e"
        anchorX="center"
        anchorY="middle"
      >
        {"DIRECT SPECIFICATION INQUIRY DISPATCH"}
      </Text>

      {/* Main Quotation Specimen Card */}
      <mesh position={[0, 0.04, -0.01]}>
        <boxGeometry args={[0.92, 0.34, 0.02]} />
        <meshStandardMaterial color="#071426" roughness={0.6} metalness={0.7} />
      </mesh>
      <lineSegments position={[0, 0.04, -0.01]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.92, 0.34, 0.02)]} />
        <lineBasicMaterial color="#2f80ed" opacity={0.6} />
      </lineSegments>

      {/* Verified Form Fields Summary */}
      <group position={[0, 0.08, 0.015]}>
        <Text
          position={[-0.38, 0.03, 0]}
          fontSize={0.017}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"FIELDS: NAME • EMAIL • SUBSTRATE • DIMENSIONS • QTY"}
        </Text>
        <Text
          position={[-0.38, -0.005, 0]}
          fontSize={0.015}
          color="#d3e6fa"
          anchorX="left"
          anchorY="middle"
        >
          {"TECHNICAL CONSULTATION & BULK ORDER PRICING"}
        </Text>
      </group>

      {/* Communication Beam to EmailJS */}
      <group position={[0, -0.05, 0.015]}>
        <mesh ref={beamRef} position={[0, 0, 0]}>
          <boxGeometry args={[0.84, 0.06, 0.005]} />
          <meshStandardMaterial
            color="#0b1f3a"
            emissive="#1e6fb9"
            emissiveIntensity={0.6}
            roughness={0.4}
          />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.84, 0.06, 0.005)]} />
          <lineBasicMaterial color="#2f80ed" />
        </lineSegments>

        <Text
          position={[0, 0.01, 0.005]}
          fontSize={0.017}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"QUOTE REQUEST → EMAILJS → SHREE LABELS INBOX"}
        </Text>
        <Text
          position={[0, -0.014, 0.005]}
          fontSize={0.014}
          color="#94b8df"
          anchorX="center"
          anchorY="middle"
        >
          {"ZERO BACKEND OVERHEAD • DIRECT BROWSER DISPATCH"}
        </Text>
      </group>
    </group>
  );
}
