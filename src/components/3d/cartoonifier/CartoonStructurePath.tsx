"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface CartoonStructurePathProps {
  subProgress: number;
}

export function CartoonStructurePath({ subProgress }: CartoonStructurePathProps) {
  const wireframesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (wireframesRef.current) {
      wireframesRef.current.position.z = (state.clock.elapsedTime * 0.4) % 0.6;
    }
  });

  return (
    <group position={[0.65, 0.42, 0.0]} rotation={[0.06, -0.18, 0]}>
      {/* Path Title */}
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.044}
        color="#86efac"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"PATH B // STRUCTURAL OUTLINES"}
      </Text>

      {/* 01. FLOWING STRUCTURAL CONTOUR FRAMES CONVEYOR */}
      <group ref={wireframesRef}>
        {[
          { z: -0.6, label: "MEDIAN BLUR 5×5", edges: 8 },
          { z: -0.2, label: "ADAPTIVE THRESH", edges: 16 },
          { z: 0.2, label: "STRUCTURAL MASK", edges: 24 },
        ].map((frame, idx) => (
          <group key={idx} position={[0, 0.05, frame.z]}>
            {/* Dark glass backdrop */}
            <mesh position={[0, 0, 0]}>
              <planeGeometry args={[0.58, 0.38]} />
              <meshPhysicalMaterial
                color="#010603"
                roughness={0.1}
                metalness={0.9}
                transparent
                opacity={0.88}
              />
            </mesh>

            {/* Glowing High-Contrast Contour Lines */}
            <lineSegments position={[0, 0, 0.005]}>
              <edgesGeometry args={[new THREE.PlaneGeometry(0.58, 0.38)]} />
              <lineBasicMaterial color="#4ade80" />
            </lineSegments>

            {/* Internal Structural Wireframe Contours (Abstracted Object Sketch Lines) */}
            <group position={[0, 0, 0.01]}>
              {/* Inner Silhouette Rings */}
              <mesh position={[0, 0, 0]}>
                <ringGeometry args={[0.08, 0.088, 16]} />
                <meshBasicMaterial color="#86efac" />
              </mesh>
              <mesh position={[-0.14, -0.04, 0]}>
                <boxGeometry args={[0.16, 0.012, 0.001]} />
                <meshBasicMaterial color="#86efac" />
              </mesh>
              <mesh position={[0.14, -0.04, 0]}>
                <boxGeometry args={[0.16, 0.012, 0.001]} />
                <meshBasicMaterial color="#86efac" />
              </mesh>
              <mesh position={[0, -0.1, 0]}>
                <boxGeometry args={[0.34, 0.012, 0.001]} />
                <meshBasicMaterial color="#4ade80" />
              </mesh>
            </group>

            {/* Stage Tag on Contour Frame */}
            <Text
              position={[0, 0.14, 0.02]}
              fontSize={0.028}
              color="#a7f3d0"
              anchorX="center"
              anchorY="middle"
            >
              {frame.label}
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
          {"LOCAL STRUCTURAL OUTLINES"}
        </Text>
        <Text
          position={[0, 0.01, 0]}
          fontSize={0.032}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {"ADAPTIVE THRESHOLD (MEAN_C)"}
        </Text>
        <Text
          position={[0, -0.06, 0]}
          fontSize={0.032}
          color="#4ade80"
          anchorX="center"
          anchorY="middle"
        >
          {"MEDIAN NOISE SUPPRESSION"}
        </Text>
      </group>
    </group>
  );
}
