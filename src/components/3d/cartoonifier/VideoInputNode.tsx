"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface VideoInputNodeProps {
  subProgress: number;
}

export function VideoInputNode({ subProgress }: VideoInputNodeProps) {
  const scanLineRef = useRef<THREE.Mesh>(null);
  const feedMeshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (scanLineRef.current) {
      scanLineRef.current.position.y = Math.sin(state.clock.elapsedTime * 2.8) * 0.42;
    }
    if (feedMeshRef.current) {
      feedMeshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
    }
  });

  return (
    <group position={[-0.45, 0.45, -2.2]} rotation={[0.08, 0.22, 0]}>
      {/* 01. VIEWPORT GLASS & FRAME */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.5, 1.05]} />
        <meshPhysicalMaterial
          color="#04120a"
          roughness={0.2}
          metalness={0.8}
          transmission={0.4}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Outer Border Bezel */}
      <mesh position={[0, 0, -0.005]}>
        <boxGeometry args={[1.54, 1.09, 0.015]} />
        <meshStandardMaterial color="#082012" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Four Viewfinder Corner Brackets */}
      {[
        [-0.72, 0.5],
        [0.72, 0.5],
        [-0.72, -0.5],
        [0.72, -0.5],
      ].map(([cx, cy], idx) => (
        <group key={idx} position={[cx, cy, 0.01]}>
          <mesh position={[cx > 0 ? -0.05 : 0.05, 0, 0]}>
            <boxGeometry args={[0.1, 0.015, 0.002]} />
            <meshBasicMaterial color="#4ade80" />
          </mesh>
          <mesh position={[0, cy > 0 ? -0.05 : 0.05, 0]}>
            <boxGeometry args={[0.015, 0.1, 0.002]} />
            <meshBasicMaterial color="#4ade80" />
          </mesh>
        </group>
      ))}

      {/* 02. PROCEDURAL ABSTRACT VIDEO FEED TEXTURE BLOCKS */}
      <group ref={feedMeshRef} position={[0, 0, 0.005]}>
        {[-0.4, -0.15, 0.1, 0.35].map((xPos, i) =>
          [-0.25, 0, 0.25].map((yPos, j) => (
            <mesh key={`${i}-${j}`} position={[xPos, yPos, 0]}>
              <planeGeometry args={[0.2, 0.18]} />
              <meshBasicMaterial
                color={i % 2 === 0 ? "#14532d" : "#064e3b"}
                transparent
                opacity={0.35 + ((i + j) % 3) * 0.15}
              />
            </mesh>
          ))
        )}
      </group>

      {/* Moving Vertical Scanline */}
      <mesh ref={scanLineRef} position={[0, 0, 0.015]}>
        <boxGeometry args={[1.46, 0.012, 0.002]} />
        <meshBasicMaterial color="#86efac" transparent opacity={0.75} />
      </mesh>

      {/* 03. VIEWPORT HEADERS & LABELS */}
      <Text
        position={[-0.68, 0.44, 0.02]}
        fontSize={0.042}
        color="#86efac"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"RAW VIDEO INPUT"}
      </Text>
      <Text
        position={[0.68, 0.44, 0.02]}
        fontSize={0.034}
        color="#22c55e"
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"● WEBCAM / MP4"}
      </Text>

      {/* 04. INPUT RESOLUTION NODE ANNOTATION */}
      <group position={[0.88, -0.15, 0.05]} rotation={[0, -0.2, 0]}>
        {/* Subtle technical backing card */}
        <mesh position={[0, 0, -0.002]}>
          <planeGeometry args={[0.65, 0.52]} />
          <meshBasicMaterial color="#021008" transparent opacity={0.88} />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(0.65, 0.52)]} />
          <lineBasicMaterial color="#22c55e" opacity={0.5} />
        </lineSegments>

        <Text
          position={[-0.28, 0.2, 0.01]}
          fontSize={0.034}
          color="#86efac"
          anchorX="left"
          anchorY="middle"
        >
          {"RESIZE / DOWNSAMPLE"}
        </Text>
        <Text
          position={[-0.28, 0.08, 0.01]}
          fontSize={0.036}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
        >
          {"STANDARD  480p"}
        </Text>
        <Text
          position={[-0.28, -0.02, 0.01]}
          fontSize={0.036}
          color="#4ade80"
          anchorX="left"
          anchorY="middle"
        >
          {"EDGE      240p"}
        </Text>
        <Text
          position={[-0.28, -0.12, 0.01]}
          fontSize={0.036}
          color="#a7f3d0"
          anchorX="left"
          anchorY="middle"
        >
          {"IoT       120p"}
        </Text>
      </group>

      {/* Forward Light Particle Beam Rail toward Processor */}
      <mesh position={[0, 0, 0.45]}>
        <cylinderGeometry args={[0.008, 0.008, 0.85, 8]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}
