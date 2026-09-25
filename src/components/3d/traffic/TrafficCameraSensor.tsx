"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface TrafficCameraSensorProps {
  subProgress: number;
}

export function TrafficCameraSensor({ subProgress }: TrafficCameraSensorProps) {
  const groupRef = useRef<THREE.Group>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    // Animate subtle vertical scanline across video capture viewfinder
    if (scanLineRef.current) {
      scanLineRef.current.position.y = Math.sin(state.clock.elapsedTime * 2.5) * 0.52;
    }
  });

  return (
    <group ref={groupRef} position={[0, 1.15, -0.6]} rotation={[-0.12, 0, 0]}>
      {/* 01. TECHNICAL CAMERA MOUNTING PYLON & SENSOR HOUSING */}
      <mesh position={[0, 0.78, -0.2]}>
        <cylinderGeometry args={[0.04, 0.06, 0.35, 16]} />
        <meshStandardMaterial color="#08180e" roughness={0.25} metalness={0.9} />
      </mesh>

      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[0.28, 0.16, 0.32]} />
        <meshStandardMaterial color="#06140b" roughness={0.25} metalness={0.88} />
      </mesh>

      {/* Optical Sensor Lens */}
      <mesh position={[0, 0.65, 0.17]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.08, 0.04, 24]} />
        <meshStandardMaterial
          color="#040e07"
          emissive="#22c55e"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* 02. FLOATING 640x480 VIDEO FRAME VIEWFINDER */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.68, 1.26]} />
        <meshPhysicalMaterial
          color="#030c06"
          roughness={0.15}
          metalness={0.2}
          transmission={0.4}
          opacity={0.85}
          transparent
          reflectivity={0.5}
        />
      </mesh>

      {/* Outer Border Frame */}
      <mesh position={[0, 0, -0.005]}>
        <boxGeometry args={[1.72, 1.3, 0.01]} />
        <meshStandardMaterial color="#0b2413" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Four Optical Viewfinder Corner Brackets */}
      {[
        [-0.8, 0.6],
        [0.8, 0.6],
        [-0.8, -0.6],
        [0.8, -0.6],
      ].map(([cx, cy], idx) => (
        <group key={idx} position={[cx, cy, 0.01]}>
          <mesh position={[cx > 0 ? -0.06 : 0.06, 0, 0]}>
            <boxGeometry args={[0.12, 0.015, 0.002]} />
            <meshBasicMaterial color="#4ade80" />
          </mesh>
          <mesh position={[0, cy > 0 ? -0.06 : 0.06, 0]}>
            <boxGeometry args={[0.015, 0.12, 0.002]} />
            <meshBasicMaterial color="#4ade80" />
          </mesh>
        </group>
      ))}

      {/* Center Reticle / Optical Crosshair */}
      <group position={[0, 0, 0.01]}>
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[0.045, 0.052, 32]} />
          <meshBasicMaterial color="#86efac" opacity={0.6} transparent />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.16, 0.004, 0.001]} />
          <meshBasicMaterial color="#86efac" opacity={0.4} transparent />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.004, 0.16, 0.001]} />
          <meshBasicMaterial color="#86efac" opacity={0.4} transparent />
        </mesh>
      </group>

      {/* Moving Video Scanline */}
      <mesh ref={scanLineRef} position={[0, 0, 0.015]}>
        <boxGeometry args={[1.64, 0.01, 0.002]} />
        <meshBasicMaterial color="#4ade80" opacity={0.7} transparent />
      </mesh>

      {/* Viewfinder Top Telemetry Typography */}
      <Text
        position={[-0.76, 0.56, 0.02]}
        fontSize={0.038}
        color="#86efac"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {"VIDEO INGEST // 640x480 [OPENCV]"}
      </Text>

      <Text
        position={[0.76, 0.56, 0.02]}
        fontSize={0.034}
        color="#22c55e"
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {"● 30 FPS FEED"}
      </Text>

      {/* Viewfinder Bottom Telemetry */}
      <Text
        position={[-0.76, -0.56, 0.02]}
        fontSize={0.032}
        color="#9ca3af"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"SOURCE: HIGHWAY TELEMETRY MP4"}
      </Text>

      <Text
        position={[0.76, -0.56, 0.02]}
        fontSize={0.032}
        color="#4ade80"
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"YOLOv8 NANO INFERENCE"}
      </Text>
    </group>
  );
}
