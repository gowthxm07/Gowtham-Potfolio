"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Text } from "@react-three/drei";
import * as THREE from "three";

interface BrandNodeProps {
  subProgress: number;
}

export function BrandNode({ subProgress }: BrandNodeProps) {
  const markerRef = useRef<THREE.Group>(null);
  const logoTexture = useTexture("/assets/shree-labels/logo.png");
  logoTexture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (markerRef.current) {
      markerRef.current.position.y = 1.35 + Math.sin(t * 1.5) * 0.015;
    }
  });

  return (
    <group ref={markerRef} position={[0, 1.35, 0.1]}>
      {/* Plaque Chassis in Shree Labels Dark Navy */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[1.65, 0.45, 0.02]} />
        <meshStandardMaterial color="#0b1f3a" roughness={0.3} metalness={0.7} />
      </mesh>
      <lineSegments position={[0, 0, -0.01]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.65, 0.45, 0.02)]} />
        <lineBasicMaterial color="#2f80ed" />
      </lineSegments>

      {/* Official Shree Labels Logo Emblem */}
      <mesh position={[-0.56, 0.02, 0.015]}>
        <planeGeometry args={[0.34, 0.34]} />
        <meshBasicMaterial map={logoTexture} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Corporate Identity Typography */}
      <group position={[0.16, 0.02, 0.02]}>
        <Text
          position={[0, 0.09, 0]}
          fontSize={0.065}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
          font="/fonts/Inter-Bold.woff"
        >
          {"SHREE LABELS"}
        </Text>
        <Text
          position={[0, 0.015, 0]}
          fontSize={0.028}
          color="#2f80ed"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
        >
          {"PREMIUM PRINTING SOLUTIONS"}
        </Text>
        <Text
          position={[0, -0.06, 0]}
          fontSize={0.022}
          color="#d3e6fa"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"KARUR • TAMIL NADU"}
        </Text>
      </group>
    </group>
  );
}
