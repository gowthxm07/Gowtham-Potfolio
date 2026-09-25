"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface MotionMaskNodeProps {
  subProgress: number;
}

export function MotionMaskNode({ subProgress }: MotionMaskNodeProps) {
  const sweepRef = useRef<THREE.Mesh>(null);
  const fgPlaneRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sweepRef.current) {
      sweepRef.current.position.x = Math.sin(state.clock.elapsedTime * 2.2) * 0.45;
    }
    if (fgPlaneRef.current) {
      const mat = fgPlaneRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.55 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
      }
    }
  });

  return (
    <group position={[0.55, 0.45, -1.1]} rotation={[0.05, -0.22, 0]}>
      {/* Branch Title Ribbon */}
      <Text
        position={[0, 0.62, 0]}
        fontSize={0.046}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"MOTION PATH // MOG2 TEMPORAL ANALYSIS"}
      </Text>

      {/* 01. LAYERED TRANSPARENT PLANES (BACKGROUND, MASK, FOREGROUND) */}
      {/* Layer 1: Darkened Static Background (Back Plane, z = -0.1) */}
      <mesh position={[0, 0.08, -0.1]}>
        <planeGeometry args={[1.2, 0.85]} />
        <meshStandardMaterial
          color="#020804"
          roughness={0.9}
          metalness={0.1}
          transparent
          opacity={0.65}
        />
      </mesh>
      <Text
        position={[-0.48, 0.44, -0.09]}
        fontSize={0.03}
        color="#475569"
        anchorX="left"
        anchorY="middle"
      >
        {"STATIC BG (α=0.4)"}
      </Text>

      {/* Layer 2: MOG2 Binary Motion Mask (Middle Plane, z = 0.0) */}
      <mesh position={[0, 0.08, 0]}>
        <planeGeometry args={[1.16, 0.82]} />
        <meshPhysicalMaterial
          color="#064e3b"
          roughness={0.3}
          metalness={0.6}
          transmission={0.4}
          transparent
          opacity={0.7}
        />
      </mesh>
      <lineSegments position={[0, 0.08, 0.005]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.16, 0.82)]} />
        <lineBasicMaterial color="#38bdf8" opacity={0.6} />
      </lineSegments>

      {/* Animated Motion Mask Pulse Line */}
      <mesh ref={sweepRef} position={[0, 0.08, 0.015]}>
        <boxGeometry args={[0.015, 0.8, 0.002]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.8} />
      </mesh>

      {/* Layer 3: Dynamic Foreground Subject Highlight (Front Plane, z = 0.1) */}
      <mesh ref={fgPlaneRef} position={[0.05, 0.08, 0.1]}>
        <planeGeometry args={[0.5, 0.65]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.5} />
      </mesh>
      <Text
        position={[0.05, 0.44, 0.11]}
        fontSize={0.032}
        color="#86efac"
        anchorX="center"
        anchorY="middle"
      >
        {"FOREGROUND MOTION"}
      </Text>

      {/* 02. TECHNICAL ANNOTATION LABEL */}
      <group position={[0, -0.44, 0]}>
        <Text
          position={[0, 0.08, 0]}
          fontSize={0.038}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
        >
          {"MOG2 BACKGROUND SUBTRACTION"}
        </Text>
        <Text
          position={[0, 0.01, 0]}
          fontSize={0.034}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {"500-FRAME TEMPORAL HISTORY"}
        </Text>
        <Text
          position={[0, -0.06, 0]}
          fontSize={0.032}
          color="#86efac"
          anchorX="center"
          anchorY="middle"
        >
          {"MORPHOLOGY: 5×5 ELLIPSE OPEN/DILATE"}
        </Text>
      </group>
    </group>
  );
}
