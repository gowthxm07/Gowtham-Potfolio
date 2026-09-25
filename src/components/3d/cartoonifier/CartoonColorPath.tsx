"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface CartoonColorPathProps {
  subProgress: number;
}

export function CartoonColorPath({ subProgress }: CartoonColorPathProps) {
  const blocksRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (blocksRef.current) {
      // Subtle conveyor stream movement toward fusion chamber
      blocksRef.current.position.z = (state.clock.elapsedTime * 0.4) % 0.6;
    }
  });

  return (
    <group position={[-0.65, 0.42, 0.0]} rotation={[0.06, 0.18, 0]}>
      {/* Path Title */}
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.044}
        color="#22c55e"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"PATH A // COLOR QUANTIZATION"}
      </Text>

      {/* 01. FLOWING QUANTIZED COLOR BLOCKS CONVEYOR */}
      <group ref={blocksRef}>
        {[
          { z: -0.6, col: "#14532d", label: "RAW COLOR", op: 0.65 },
          { z: -0.2, col: "#16a34a", label: "BILATERAL FILTER", op: 0.75 },
          { z: 0.2, col: "#4ade80", label: "64-COLOR CRUSH", op: 0.85 },
        ].map((block, idx) => (
          <group key={idx} position={[0, 0.05, block.z]}>
            {/* Smooth Quantized Slab */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.58, 0.38, 0.14]} />
              <meshStandardMaterial
                color={block.col}
                roughness={0.25}
                metalness={0.7}
                transparent
                opacity={block.op}
              />
            </mesh>

            {/* Slab Outline Rim */}
            <lineSegments position={[0, 0, 0]}>
              <edgesGeometry args={[new THREE.BoxGeometry(0.58, 0.38, 0.14)]} />
              <lineBasicMaterial color="#86efac" opacity={0.6} />
            </lineSegments>

            {/* Subtle Stage Tag on Block */}
            <Text
              position={[0, 0, 0.075]}
              fontSize={0.03}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {block.label}
            </Text>
          </group>
        ))}
      </group>

      {/* Guide Rail Beams */}
      {[-0.32, 0.32].map((gx, idx) => (
        <mesh key={idx} position={[gx, 0.05, 0]}>
          <boxGeometry args={[0.015, 0.015, 1.4]} />
          <meshBasicMaterial color="#166534" opacity={0.5} transparent />
        </mesh>
      ))}

      {/* 02. TECHNICAL ANNOTATION */}
      <group position={[0, -0.42, 0]}>
        <Text
          position={[0, 0.08, 0]}
          fontSize={0.036}
          color="#86efac"
          anchorX="center"
          anchorY="middle"
        >
          {"EDGE-PRESERVING SMOOTHING"}
        </Text>
        <Text
          position={[0, 0.01, 0]}
          fontSize={0.032}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {"BILATERAL FILTER (d=7, σ=80)"}
        </Text>
        <Text
          position={[0, -0.06, 0]}
          fontSize={0.032}
          color="#4ade80"
          anchorX="center"
          anchorY="middle"
        >
          {"COLOR PALETTE: 64 LEVELS"}
        </Text>
      </group>
    </group>
  );
}
