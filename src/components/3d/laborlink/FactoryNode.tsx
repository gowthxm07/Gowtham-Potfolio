"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface FactoryNodeProps {
  subProgress: number;
}

export function FactoryNode({ subProgress }: FactoryNodeProps) {
  const loomGearRef = useRef<THREE.Group>(null);
  const rollerRef = useRef<THREE.Mesh>(null);
  const beaconRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (loomGearRef.current) {
      loomGearRef.current.rotation.z = -t * 0.8;
    }
    if (rollerRef.current) {
      rollerRef.current.rotation.x = t * 1.2;
    }
    if (beaconRef.current) {
      const mat = beaconRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = 0.6 + Math.sin(t * 4.0) * 0.4;
      }
    }
  });

  return (
    <group position={[1.5, 0.45, -0.1]} rotation={[0.04, -0.28, 0]}>
      {/* Node Header */}
      <Text
        position={[0, 1.25, 0]}
        fontSize={0.048}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"NODE 02 // FACTORY / SMALL INDUSTRY"}
      </Text>
      <Text
        position={[0, 1.18, 0]}
        fontSize={0.032}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        {"TEXTILE MILL & POWER LOOM INFRASTRUCTURE"}
      </Text>

      {/* Industrial Base Platform */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.9, 0.08, 0.65]} />
        <meshStandardMaterial color="#09140e" roughness={0.7} metalness={0.8} />
      </mesh>
      <lineSegments position={[0, -0.15, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.9, 0.08, 0.65)]} />
        <lineBasicMaterial color="#22c55e" opacity={0.5} />
      </lineSegments>

      {/* Factory Gantry / Structural Workshop Columns */}
      {[-0.38, 0.38].map((x, idx) => (
        <group key={idx} position={[x, 0.35, -0.15]}>
          <mesh>
            <cylinderGeometry args={[0.025, 0.035, 0.9, 8]} />
            <meshStandardMaterial color="#1a2e22" metalness={0.8} roughness={0.4} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.CylinderGeometry(0.026, 0.036, 0.9, 8)]} />
            <lineBasicMaterial color="#4ade80" opacity={0.4} />
          </lineSegments>
        </group>
      ))}

      {/* Workshop Sawtooth Roof Girder */}
      <mesh position={[0, 0.82, -0.15]}>
        <boxGeometry args={[0.82, 0.04, 0.06]} />
        <meshStandardMaterial color="#163824" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Industrial Status Beacon Light */}
      <mesh ref={beaconRef} position={[0.35, 0.88, -0.15]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={1.0}
          roughness={0.2}
        />
      </mesh>

      {/* Textile Machinery Motif: Rotating Loom Roller & Gear Mechanism */}
      <group position={[0, 0.32, -0.05]}>
        {/* Machine Main Body Block */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.55, 0.28, 0.28]} />
          <meshStandardMaterial color="#0b1e14" metalness={0.85} roughness={0.3} />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.55, 0.28, 0.28)]} />
          <lineBasicMaterial color="#22c55e" opacity={0.6} />
        </lineSegments>

        {/* Weaving Cylindrical Yarn Roller */}
        <mesh ref={rollerRef} position={[0, 0.08, 0.16]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.48, 16]} />
          <meshStandardMaterial color="#1f442c" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Rotating Power Loom Gear */}
        <group ref={loomGearRef} position={[0.31, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.11, 0.11, 0.03, 12]} />
            <meshStandardMaterial color="#15803d" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.11, 0.11, 0.032, 12]} />
            <meshStandardMaterial color="#166534" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* Verified Open Vacancy Specification Module */}
      <group position={[0, 0.02, 0.28]}>
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[0.78, 0.32]} />
          <meshStandardMaterial color="#040d08" roughness={0.9} />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.78, 0.32, 0.01)]} />
          <lineBasicMaterial color="#22c55e" opacity={0.8} />
        </lineSegments>

        <Text
          position={[-0.35, 0.11, 0.01]}
          fontSize={0.028}
          color="#86efac"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.05}
        >
          {"OPEN VACANCY // REF: #VAC-2026-TX"}
        </Text>
        <Text
          position={[-0.35, 0.055, 0.01]}
          fontSize={0.024}
          color="#e2e8f0"
          anchorX="left"
          anchorY="middle"
        >
          {"TRADE: POWER LOOM OPERATOR (4 ROLES)"}
        </Text>
        <Text
          position={[-0.35, 0.005, 0.01]}
          fontSize={0.022}
          color="#a3e635"
          anchorX="left"
          anchorY="middle"
        >
          {"WAGE: ₹16,000 / MO • AMENITIES: FREE ROOM + WATER"}
        </Text>
        <Text
          position={[-0.35, -0.045, 0.01]}
          fontSize={0.022}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
        >
          {"LOCATION: TIRUPPUR TEXTILE CLUSTER"}
        </Text>
        <Text
          position={[-0.35, -0.09, 0.01]}
          fontSize={0.02}
          color="#64748b"
          anchorX="left"
          anchorY="middle"
        >
          {"LIFECYCLE: 30-DAY EXPIRATION AUDITED"}
        </Text>
      </group>
    </group>
  );
}
