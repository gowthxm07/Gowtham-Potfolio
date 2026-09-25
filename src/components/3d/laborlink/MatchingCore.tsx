"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { WeightedScoreRings } from "./WeightedScoreRings";

interface MatchingCoreProps {
  subProgress: number;
}

export function MatchingCore({ subProgress }: MatchingCoreProps) {
  const chamberRef = useRef<THREE.Group>(null);
  const coreSphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreSphereRef.current) {
      const mat = coreSphereRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = 0.9 + Math.sin(t * 3.5) * 0.4;
      }
      const scale = 1.0 + Math.sin(t * 2.5) * 0.05;
      coreSphereRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={chamberRef} position={[0, 0.45, 0.1]}>
      {/* Chamber Header */}
      <Text
        position={[0, 1.35, 0]}
        fontSize={0.056}
        color="#86efac"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {"LABORLINK MATCHING CORE"}
      </Text>
      <Text
        position={[0, 1.27, 0]}
        fontSize={0.03}
        color="#22c55e"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"DETERMINISTIC MULTI-FACTOR WEIGHTED SCORING ENGINE"}
      </Text>

      {/* Main Octagonal Outer Chassis */}
      <mesh position={[0, 0, -0.05]}>
        <cylinderGeometry args={[0.82, 0.85, 0.1, 8]} />
        <meshStandardMaterial color="#06120b" roughness={0.7} metalness={0.8} />
      </mesh>
      <lineSegments position={[0, 0, -0.05]}>
        <edgesGeometry args={[new THREE.CylinderGeometry(0.822, 0.852, 0.102, 8)]} />
        <lineBasicMaterial color="#22c55e" opacity={0.7} />
      </lineSegments>

      {/* Central Rotating Weighted Scoring Rings */}
      <WeightedScoreRings subProgress={subProgress} />

      {/* Central Computation Energy Nexus */}
      <mesh ref={coreSphereRef} position={[0, 0, 0.02]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={1.0}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>
      <lineSegments position={[0, 0, 0.02]}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(0.16, 1)]} />
        <lineBasicMaterial color="#86efac" />
      </lineSegments>

      {/* Technical Annotation Badge */}
      <group position={[0, -0.92, 0.05]}>
        <mesh position={[0, 0, -0.005]}>
          <planeGeometry args={[0.88, 0.08]} />
          <meshStandardMaterial color="#030c07" roughness={0.9} />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.88, 0.08, 0.002)]} />
          <lineBasicMaterial color="#22c55e" opacity={0.6} />
        </lineSegments>
        <Text
          position={[0, 0.015, 0.005]}
          fontSize={0.024}
          color="#e2e8f0"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"ALGORITHM: DETERMINISTIC WEIGHTED FORMULA (NO BLACK-BOX ML)"}
        </Text>
        <Text
          position={[0, -0.02, 0.005]}
          fontSize={0.019}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
        >
          {"STRICT JEST VERIFIED: MATH BOUNDS [0..100] • CLIENT EXECUTION < 5 ms"}
        </Text>
      </group>
    </group>
  );
}
