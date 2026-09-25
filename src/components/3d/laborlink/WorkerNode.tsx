"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface WorkerNodeProps {
  subProgress: number;
}

export function WorkerNode({ subProgress }: WorkerNodeProps) {
  const avatarRef = useRef<THREE.Group>(null);
  const visorRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (avatarRef.current) {
      avatarRef.current.position.y = 0.5 + Math.sin(t * 1.5) * 0.02;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
    }
    if (visorRef.current) {
      const mat = visorRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = 0.8 + Math.sin(t * 3.0) * 0.3;
      }
    }
  });

  // Verified skills from repository inspection
  const verifiedSkills = [
    "MACHINE OPERATION",
    "TEXTILE",
    "WELDING",
    "GARMENTS",
    "POWER LOOM",
  ];

  return (
    <group position={[-1.5, 0.45, -0.1]} rotation={[0.04, 0.28, 0]}>
      {/* Node Header */}
      <Text
        position={[0, 1.25, 0]}
        fontSize={0.048}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"NODE 01 // INDUSTRIAL WORKER"}
      </Text>
      <Text
        position={[0, 1.18, 0]}
        fontSize={0.032}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        {"ABSTRACT TECHNICAL SILHOUETTE & VERIFIED TRADES"}
      </Text>

      {/* Hexagonal Base Pedestal */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.48, 0.52, 0.08, 6]} />
        <meshStandardMaterial color="#09140e" roughness={0.7} metalness={0.8} />
      </mesh>
      <mesh ref={ringRef} position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.46, 0.49, 6]} />
        <meshBasicMaterial color="#22c55e" wireframe />
      </mesh>

      {/* Abstract Technical Worker Silhouette */}
      <group ref={avatarRef}>
        {/* Lower Torso / Pelvis Block */}
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.26, 0.18, 0.16]} />
          <meshStandardMaterial color="#0f2619" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Industrial Chest Plate with Wireframe Ribs */}
        <mesh position={[0, 0.42, 0]}>
          <boxGeometry args={[0.34, 0.28, 0.2]} />
          <meshStandardMaterial color="#163824" metalness={0.8} roughness={0.3} />
        </mesh>
        <lineSegments position={[0, 0.42, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.342, 0.282, 0.202)]} />
          <lineBasicMaterial color="#4ade80" opacity={0.6} />
        </lineSegments>

        {/* Safety Harness Cross-Straps (Industrial Motif) */}
        <mesh position={[0, 0.42, 0.106]} rotation={[0, 0, 0.45]}>
          <planeGeometry args={[0.38, 0.025]} />
          <meshBasicMaterial color="#86efac" />
        </mesh>
        <mesh position={[0, 0.42, 0.106]} rotation={[0, 0, -0.45]}>
          <planeGeometry args={[0.38, 0.025]} />
          <meshBasicMaterial color="#86efac" />
        </mesh>

        {/* Technical Visor / Helmet Head */}
        <mesh position={[0, 0.68, 0]}>
          <boxGeometry args={[0.2, 0.18, 0.18]} />
          <meshStandardMaterial color="#0b1e14" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Glowing Optical Sensor Visor */}
        <mesh ref={visorRef} position={[0, 0.68, 0.095]}>
          <boxGeometry args={[0.16, 0.04, 0.02]} />
          <meshStandardMaterial
            color="#22c55e"
            emissive="#22c55e"
            emissiveIntensity={1.0}
            roughness={0.1}
          />
        </mesh>
        {/* Protective Crown Ring */}
        <lineSegments position={[0, 0.78, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.22, 0.03, 0.2)]} />
          <lineBasicMaterial color="#86efac" />
        </lineSegments>
      </group>

      {/* Profile Data Layer Badge */}
      <group position={[0, 0.02, 0.28]}>
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[0.72, 0.24]} />
          <meshStandardMaterial color="#040d08" roughness={0.9} />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.72, 0.24, 0.01)]} />
          <lineBasicMaterial color="#22c55e" opacity={0.7} />
        </lineSegments>

        <Text
          position={[-0.32, 0.07, 0.01]}
          fontSize={0.03}
          color="#86efac"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.05}
        >
          {"WORKER PROFILE // VERIFIED CANDIDATE"}
        </Text>
        <Text
          position={[-0.32, 0.01, 0.01]}
          fontSize={0.024}
          color="#e2e8f0"
          anchorX="left"
          anchorY="middle"
        >
          {"LOCATION: TIRUPPUR, TAMIL NADU"}
        </Text>
        <Text
          position={[-0.32, -0.05, 0.01]}
          fontSize={0.024}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
        >
          {"EXP: 4+ YRS • AVAILABILITY: IMMEDIATE"}
        </Text>
      </group>

      {/* Floating Skill Modules (Surrounding Worker Node) */}
      {verifiedSkills.map((skill, idx) => {
        const angle = (idx / verifiedSkills.length) * Math.PI * 1.5 - 0.75;
        const radius = 0.58;
        const posX = Math.sin(angle) * radius;
        const posY = 0.35 + (idx % 2 === 0 ? 0.15 : -0.1);
        const posZ = Math.cos(angle) * radius * 0.4;

        return (
          <group key={skill} position={[posX, posY, posZ]}>
            <mesh position={[0, 0, -0.005]}>
              <boxGeometry args={[0.38, 0.07, 0.02]} />
              <meshStandardMaterial color="#081810" metalness={0.7} roughness={0.4} />
            </mesh>
            <lineSegments position={[0, 0, 0]}>
              <edgesGeometry args={[new THREE.BoxGeometry(0.38, 0.07, 0.02)]} />
              <lineBasicMaterial color="#22c55e" opacity={0.6} />
            </lineSegments>
            <Text
              position={[0, 0, 0.015]}
              fontSize={0.025}
              color="#a3e635"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.04}
            >
              {`• ${skill}`}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
