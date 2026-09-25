"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface JevDecisionCoreProps {
  subProgress: number;
}

export function JevDecisionCore({ subProgress }: JevDecisionCoreProps) {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const innerHexRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.position.y = 1.05 + Math.sin(t * 1.8) * 0.015;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.6;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.9;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.4;
      ring3Ref.current.rotation.y = t * 0.5;
    }
    if (innerHexRef.current) {
      const mat = innerHexRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = 0.8 + Math.sin(t * 3.5) * 0.4;
      }
    }
  });

  return (
    <group ref={coreRef} position={[0.2, 1.05, 0]}>
      {/* Concentric Holographic Violet Rings */}
      <mesh ref={ring1Ref} position={[0, 0, 0]}>
        <ringGeometry args={[0.32, 0.35, 32]} />
        <meshBasicMaterial color="#a855f7" side={THREE.DoubleSide} transparent opacity={0.7} />
      </mesh>

      <mesh ref={ring2Ref} position={[0, 0, 0.01]}>
        <ringGeometry args={[0.24, 0.27, 24]} />
        <meshBasicMaterial color="#c084fc" side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>

      <mesh ref={ring3Ref} position={[0, 0, 0.02]}>
        <torusGeometry args={[0.18, 0.012, 16, 32]} />
        <meshStandardMaterial
          color="#e9d5ff"
          emissive="#a855f7"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Central Hexagonal Decision Core */}
      <mesh ref={innerHexRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.06, 6]} />
        <meshStandardMaterial
          color="#7e22ce"
          emissive="#a855f7"
          emissiveIntensity={1.0}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Glowing Inner Core Dot */}
      <mesh position={[0, 0, 0.04]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Point Light Radiating from Core */}
      <pointLight color="#c084fc" intensity={2.5} distance={2.5} />

      {/* Core Labels */}
      <group position={[0, 0.44, 0.02]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.038}
          color="#f8fafc"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
        >
          {"TYPE SAFE JEV // SYSTEM ONE"}
        </Text>
        <Text
          position={[0, -0.045, 0]}
          fontSize={0.024}
          color="#c084fc"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"API: POST /v1/systemone"}
        </Text>
      </group>

      <group position={[0, -0.42, 0.02]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.022}
          color="#e9d5ff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"PRIMITIVES: NOUL & CHOICE DISTRIBUTIONS"}
        </Text>
        <Text
          position={[0, -0.035, 0]}
          fontSize={0.018}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"PROBABILISTIC REASONING • PROVIDER-NEUTRAL DECISION ENGINE"}
        </Text>
      </group>
    </group>
  );
}
