"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface SustainabilityNodeProps {
  subProgress: number;
}

export function SustainabilityNode({ subProgress }: SustainabilityNodeProps) {
  const nodeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (nodeRef.current) {
      nodeRef.current.position.y = 0.85 + Math.sin(state.clock.elapsedTime * 1.3) * 0.012;
    }
  });

  const verifiedPillars = [
    {
      title: "ORGANIC COTTON OPTIONS",
      desc: "Dedicated organic tape varieties crafted for natural apparel lines.",
    },
    {
      title: "NATURAL MATERIAL CHOICES",
      desc: "Pure fiber options reducing reliance on synthetic polymers.",
    },
    {
      title: "RESPONSIBLE MANUFACTURING",
      desc: "Structured cutting workflows engineered to minimize production waste.",
    },
    {
      title: "BUILT FOR LONG-TERM USE",
      desc: "Wash-durability & color-fastness outlasting garment lifecycle.",
    },
  ];

  return (
    <group ref={nodeRef} position={[-1.4, 0.85, 0.15]} rotation={[0.02, 0.28, 0]}>
      {/* Node Header */}
      <Text
        position={[0, 0.44, 0]}
        fontSize={0.038}
        color="#1e6fb9"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"CONSCIOUS PRODUCTION // SUSTAINABILITY"}
      </Text>
      <Text
        position={[0, 0.38, 0]}
        fontSize={0.022}
        color="#5b7d9e"
        anchorX="center"
        anchorY="middle"
      >
        {"RESPONSIBLE TEXTILE LABELING PRACTICES IN KARUR"}
      </Text>

      {/* Main Glass Chassis */}
      <mesh position={[0, 0.04, -0.01]}>
        <boxGeometry args={[0.88, 0.58, 0.02]} />
        <meshStandardMaterial color="#071426" roughness={0.6} metalness={0.7} />
      </mesh>
      <lineSegments position={[0, 0.04, -0.01]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.88, 0.58, 0.02)]} />
        <lineBasicMaterial color="#2f80ed" opacity={0.6} />
      </lineSegments>

      {/* 4 Verified Pillars Grid */}
      <group position={[0, 0.05, 0.01]}>
        {verifiedPillars.map((p, idx) => {
          const y = 0.16 - idx * 0.095;
          return (
            <group key={p.title} position={[0, y, 0]}>
              <mesh position={[0, 0, -0.002]}>
                <planeGeometry args={[0.82, 0.075]} />
                <meshStandardMaterial color="#0b1f3a" roughness={0.8} />
              </mesh>
              <lineSegments position={[0, 0, 0]}>
                <edgesGeometry args={[new THREE.BoxGeometry(0.82, 0.075, 0.002)]} />
                <lineBasicMaterial color="#1e6fb9" opacity={0.4} />
              </lineSegments>

              <Text
                position={[-0.38, 0.016, 0.005]}
                fontSize={0.019}
                color="#ffffff"
                anchorX="left"
                anchorY="middle"
                letterSpacing={0.03}
              >
                {`• ${p.title}`}
              </Text>
              <Text
                position={[-0.38, -0.016, 0.005]}
                fontSize={0.015}
                color="#d3e6fa"
                anchorX="left"
                anchorY="middle"
              >
                {p.desc}
              </Text>
            </group>
          );
        })}
      </group>
    </group>
  );
}
