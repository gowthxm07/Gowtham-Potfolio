"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface LabelRibbonProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  title: string;
  subtitle: string;
  specDetails: string;
  color: string;
  roughness: number;
  metalness: number;
  speed?: number;
  amplitude?: number;
  subProgress: number;
}

export function LabelRibbon({
  position,
  rotation = [0, 0, 0],
  title,
  subtitle,
  specDetails,
  color,
  roughness,
  metalness,
  speed = 1.2,
  amplitude = 0.04,
  subProgress,
}: LabelRibbonProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Generate ribbon plane geometry with enough segments for smooth undulation
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(1.4, 0.28, 24, 6);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.02;
    }

    if (meshRef.current) {
      const pos = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const zWave = Math.sin(u * 3.5 + t) * amplitude;
        pos.setZ(i, zWave);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* 01. Physical Woven Ribbon Mesh */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ribbon Wireframe Edge Accents */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.4, 0.28, 0.005)]} />
        <lineBasicMaterial color="#1e6fb9" opacity={0.4} />
      </lineSegments>

      {/* 02. Precision Printed Markings Plaque */}
      <group position={[0, 0, 0.025]}>
        <Text
          position={[-0.6, 0.06, 0]}
          fontSize={0.028}
          color="#0b1f3a"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.05}
        >
          {title}
        </Text>
        <Text
          position={[-0.6, 0.005, 0]}
          fontSize={0.02}
          color="#1e6fb9"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {subtitle}
        </Text>
        <Text
          position={[-0.6, -0.055, 0]}
          fontSize={0.016}
          color="#5b7d9e"
          anchorX="left"
          anchorY="middle"
        >
          {specDetails}
        </Text>

        {/* Barcode / Registration Hashmarks Simulation */}
        <group position={[0.42, 0, 0]}>
          {[-0.14, -0.1, -0.07, -0.03, 0.01, 0.04, 0.08, 0.12].map((x, idx) => (
            <mesh key={idx} position={[x, 0, 0]}>
              <boxGeometry args={[idx % 2 === 0 ? 0.015 : 0.008, 0.16, 0.001]} />
              <meshBasicMaterial color="#0b1f3a" opacity={0.7} />
            </mesh>
          ))}
          <Text
            position={[0, -0.1, 0]}
            fontSize={0.014}
            color="#1e6fb9"
            anchorX="center"
            anchorY="middle"
          >
            {"#SL-TEX-2026"}
          </Text>
        </group>
      </group>
    </group>
  );
}
