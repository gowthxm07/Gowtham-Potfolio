"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface MotionCompositeNodeProps {
  subProgress: number;
}

export function MotionCompositeNode({ subProgress }: MotionCompositeNodeProps) {
  const compositeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (compositeRef.current) {
      compositeRef.current.position.y = 0.45 + Math.sin(state.clock.elapsedTime * 1.5) * 0.015;
    }
  });

  return (
    <group ref={compositeRef} position={[0, 0.45, 1.7]} rotation={[-0.04, 0, 0]}>
      {/* 01. DEPTH-SEPARATED COMPOSITING STAGES */}
      {/* Back Layer: Dimmed Blurred Background Plane (z = -0.15) */}
      <mesh position={[0, 0, -0.15]}>
        <planeGeometry args={[1.2, 0.85]} />
        <meshStandardMaterial
          color="#020804"
          roughness={0.9}
          metalness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>
      <Text
        position={[-0.45, 0.46, -0.14]}
        fontSize={0.03}
        color="#64748b"
        anchorX="left"
        anchorY="middle"
      >
        {"DARK GAUSSIAN BG (α=0.4)"}
      </Text>

      {/* Middle Layer: MOG2 Alpha Mask Aperture (z = 0.0) */}
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(0.8, 0.65)]} />
        <lineBasicMaterial color="#38bdf8" opacity={0.65} />
      </lineSegments>
      <Text
        position={[0, 0.36, 0.01]}
        fontSize={0.028}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
      >
        {"MOG2 ALPHA CUTOUT"}
      </Text>

      {/* Front Layer: High-Contrast Cartoon Foreground (z = 0.15) */}
      <mesh position={[0, 0, 0.15]}>
        <planeGeometry args={[0.72, 0.58]} />
        <meshPhysicalMaterial
          color="#0d3d1f"
          roughness={0.2}
          metalness={0.6}
          transmission={0.3}
          transparent
          opacity={0.88}
        />
      </mesh>
      <lineSegments position={[0, 0, 0.155]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(0.72, 0.58)]} />
        <lineBasicMaterial color="#4ade80" />
      </lineSegments>

      {/* 02. TECHNICAL ANNOTATION */}
      <group position={[0, -0.42, 0]}>
        <Text
          position={[0, 0.06, 0]}
          fontSize={0.038}
          color="#4ade80"
          anchorX="center"
          anchorY="middle"
        >
          {"MOTION-AWARE COMPOSITING"}
        </Text>
        <Text
          position={[0, -0.01, 0]}
          fontSize={0.032}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {"cartoon * mask + bg * (1 - mask)"}
        </Text>
        <Text
          position={[0, -0.07, 0]}
          fontSize={0.03}
          color="#86efac"
          anchorX="center"
          anchorY="middle"
        >
          {"STATIC SURROUNDINGS SUPPRESSED"}
        </Text>
      </group>
    </group>
  );
}
