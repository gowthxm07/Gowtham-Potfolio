"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface ReviewTrustNodeProps {
  subProgress: number;
}

export function ReviewTrustNode({ subProgress }: ReviewTrustNodeProps) {
  const nodeRef = useRef<THREE.Group>(null);
  const packetRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (nodeRef.current) {
      nodeRef.current.position.y = -0.35 + Math.sin(t * 1.5) * 0.012;
    }
    if (packetRef.current) {
      packetRef.current.children.forEach((child, i) => {
        const speed = 0.5 + i * 0.12;
        const progress = ((t * speed + i * 0.3) % 1.0);
        child.position.x = -0.4 + progress * 0.8;
        child.position.y = Math.sin(progress * Math.PI) * 0.03;
      });
    }
  });

  return (
    <group ref={nodeRef} position={[-0.85, -0.35, 0.25]} rotation={[0.02, 0.2, 0]}>
      {/* Node Header */}
      <Text
        position={[0, 0.28, 0]}
        fontSize={0.036}
        color="#1e6fb9"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"CLIENT FEEDBACK // LIVE REVIEWS"}
      </Text>
      <Text
        position={[0, 0.23, 0]}
        fontSize={0.02}
        color="#5b7d9e"
        anchorX="center"
        anchorY="middle"
      >
        {"REAL-TIME FIRESTORE onSnapshot STREAM"}
      </Text>

      {/* Main Chassis */}
      <mesh position={[0, 0.04, -0.01]}>
        <boxGeometry args={[0.92, 0.34, 0.02]} />
        <meshStandardMaterial color="#071426" roughness={0.6} metalness={0.7} />
      </mesh>
      <lineSegments position={[0, 0.04, -0.01]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.92, 0.34, 0.02)]} />
        <lineBasicMaterial color="#2f80ed" opacity={0.6} />
      </lineSegments>

      {/* 5-Star Rating Display */}
      <group position={[0, 0.11, 0.015]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.045}
          color="#1e6fb9"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
        >
          {"★★★★★"}
        </Text>
      </group>

      {/* Animated Firestore Document Packets */}
      <group ref={packetRef} position={[0, 0.02, 0.015]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[-0.4 + i * 0.3, 0, 0]}>
            <boxGeometry args={[0.06, 0.025, 0.005]} />
            <meshStandardMaterial
              color="#2f80ed"
              emissive="#1e6fb9"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Authentication Gateway & Live Query Badge */}
      <group position={[0, -0.065, 0.015]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[0.84, 0.06]} />
          <meshStandardMaterial color="#0b1f3a" roughness={0.8} />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.84, 0.06, 0.002)]} />
          <lineBasicMaterial color="#1e6fb9" opacity={0.4} />
        </lineSegments>

        <Text
          position={[0, 0.01, 0.005]}
          fontSize={0.017}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"AUTH: ANONYMOUS SESSION → FIRESTORE onSnapshot"}
        </Text>
        <Text
          position={[0, -0.014, 0.005]}
          fontSize={0.014}
          color="#d3e6fa"
          anchorX="center"
          anchorY="middle"
        >
          {"LIVE UPDATES ORDERED BY TIMESTAMP • CAPPED LIMIT(6)"}
        </Text>
      </group>
    </group>
  );
}
