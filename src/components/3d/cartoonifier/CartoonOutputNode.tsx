"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface CartoonOutputNodeProps {
  subProgress: number;
}

export function CartoonOutputNode({ subProgress }: CartoonOutputNodeProps) {
  const frameRef = useRef<THREE.Group>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (scanLineRef.current) {
      scanLineRef.current.position.y = Math.sin(state.clock.elapsedTime * 2.2) * 0.44;
    }
    if (frameRef.current) {
      frameRef.current.position.y = 0.45 + Math.sin(state.clock.elapsedTime * 1.2) * 0.015;
    }
  });

  return (
    <group ref={frameRef} position={[0.2, 0.45, 2.6]} rotation={[-0.06, -0.15, 0]}>
      {/* 01. VIEWPORT GLASS & FRAME */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.56, 1.12]} />
        <meshPhysicalMaterial
          color="#020d06"
          roughness={0.15}
          metalness={0.85}
          transmission={0.4}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Outer Border Bezel */}
      <mesh position={[0, 0, -0.005]}>
        <boxGeometry args={[1.6, 1.16, 0.015]} />
        <meshStandardMaterial color="#082815" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Four Viewfinder Corner Brackets */}
      {[
        [-0.75, 0.53],
        [0.75, 0.53],
        [-0.75, -0.53],
        [0.75, -0.53],
      ].map(([cx, cy], idx) => (
        <group key={idx} position={[cx, cy, 0.01]}>
          <mesh position={[cx > 0 ? -0.05 : 0.05, 0, 0]}>
            <boxGeometry args={[0.1, 0.015, 0.002]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>
          <mesh position={[0, cy > 0 ? -0.05 : 0.05, 0]}>
            <boxGeometry args={[0.015, 0.1, 0.002]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>
        </group>
      ))}

      {/* 02. PROCEDURAL STYLIZED CARTOON OUTPUT ARTWORK */}
      {/* Darkened Suppressed Background */}
      <mesh position={[0, 0, 0.003]}>
        <planeGeometry args={[1.48, 1.04]} />
        <meshBasicMaterial color="#02140a" />
      </mesh>

      {/* Quantized Flat Color Silhouette Blocks (Human Subject) */}
      <group position={[0, -0.05, 0.008]}>
        {/* Torso Block */}
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[0.48, 0.42, 0.002]} />
          <meshBasicMaterial color="#15803d" />
        </mesh>
        {/* Head Block with Frosted Privacy Blur */}
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.26, 0.28, 0.002]} />
          <meshBasicMaterial color="#166534" />
        </mesh>
        {/* Localized Frosted Gaussian Blur Patch over Face */}
        <mesh position={[0, 0.18, 0.005]}>
          <planeGeometry args={[0.22, 0.24]} />
          <meshPhysicalMaterial
            color="#22c55e"
            roughness={0.9}
            transmission={0.8}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>

      {/* Bold Cartoon Ink Outlines (Adaptive Threshold Representation) */}
      <group position={[0, -0.05, 0.012]}>
        <lineSegments position={[0, -0.15, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.48, 0.42, 0.002)]} />
          <lineBasicMaterial color="#000000" />
        </lineSegments>
        <lineSegments position={[0, 0.18, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.26, 0.28, 0.002)]} />
          <lineBasicMaterial color="#000000" />
        </lineSegments>
        {/* Accent Edge Highlights */}
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(1.48, 1.04)]} />
          <lineBasicMaterial color="#22c55e" opacity={0.4} />
        </lineSegments>
      </group>

      {/* Moving Output Scanline */}
      <mesh ref={scanLineRef} position={[0, 0, 0.018]}>
        <boxGeometry args={[1.52, 0.012, 0.002]} />
        <meshBasicMaterial color="#4ade80" transparent opacity={0.85} />
      </mesh>

      {/* 03. VIEWPORT HEADERS & LABELS */}
      <Text
        position={[-0.72, 0.48, 0.02]}
        fontSize={0.044}
        color="#86efac"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"ANONYMIZED CARTOON STREAM"}
      </Text>
      <Text
        position={[0.72, 0.48, 0.02]}
        fontSize={0.034}
        color="#22c55e"
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"● MJPEG HTTP OUTPUT"}
      </Text>

      <Text
        position={[-0.72, -0.48, 0.02]}
        fontSize={0.032}
        color="#9ca3af"
        anchorX="left"
        anchorY="middle"
      >
        {"ENDPOINT: /video_feed/cartoon"}
      </Text>
      <Text
        position={[0.72, -0.48, 0.02]}
        fontSize={0.032}
        color="#4ade80"
        anchorX="right"
        anchorY="middle"
      >
        {"FLASK PORT 5000"}
      </Text>
    </group>
  );
}
