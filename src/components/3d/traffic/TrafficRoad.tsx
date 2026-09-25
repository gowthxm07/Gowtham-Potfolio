"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface TrafficRoadProps {
  subProgress: number;
}

export function TrafficRoad({ subProgress }: TrafficRoadProps) {
  const roadRef = useRef<THREE.Group>(null);
  const laneMarkersRef = useRef<THREE.Group>(null);

  // Subtle streaming motion of dashed lane markings
  useFrame((state, delta) => {
    if (!laneMarkersRef.current) return;
    laneMarkersRef.current.position.z = (state.clock.elapsedTime * 1.5) % 1.2;
  });

  return (
    <group ref={roadRef} position={[0, -0.45, 0]} rotation={[0.08, 0, 0]}>
      {/* 01. MAIN HIGHWAY ROADWAY SLAB */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 0.04, 7.0]} />
        <meshStandardMaterial
          color="#040e08"
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Road Boundary Curb Beams */}
      {[-1.2, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 0.025, 0]}>
          <boxGeometry args={[0.03, 0.04, 7.0]} />
          <meshStandardMaterial
            color="#22c55e"
            emissive="#22c55e"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}

      {/* 02. DASHED LANE DIVIDERS (3 LANES) */}
      <group ref={laneMarkersRef}>
        {[-0.4, 0.4].map((laneX, laneIdx) => (
          <group key={laneIdx}>
            {Array.from({ length: 8 }).map((_, i) => (
              <mesh key={i} position={[laneX, 0.025, (i - 3.5) * 1.2]}>
                <boxGeometry args={[0.025, 0.005, 0.5]} />
                <meshBasicMaterial color="#86efac" opacity={0.65} transparent />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* 03. TECHNICAL ROAD MARKINGS & COORDINATE TICKS */}
      <Text
        position={[-0.8, 0.03, 2.2]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.07}
        color="#22c55e"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {"LANE 01"}
      </Text>

      <Text
        position={[0, 0.03, 2.2]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.07}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {"LANE 02"}
      </Text>

      <Text
        position={[0.8, 0.03, 2.2]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.07}
        color="#22c55e"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {"LANE 03"}
      </Text>

      {/* Spatial Ground Crosshair Ticks */}
      {[-2, 0, 2].map((zPos, idx) => (
        <group key={idx} position={[0, 0.022, zPos]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.2, 0.002, 0.006]} />
            <meshBasicMaterial color="#1a3d24" opacity={0.4} transparent />
          </mesh>
        </group>
      ))}
    </group>
  );
}
