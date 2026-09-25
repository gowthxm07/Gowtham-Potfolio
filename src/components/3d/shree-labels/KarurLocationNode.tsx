"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface KarurLocationNodeProps {
  subProgress: number;
}

export function KarurLocationNode({ subProgress }: KarurLocationNodeProps) {
  const beaconRef = useRef<THREE.Group>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (beaconRef.current) {
      beaconRef.current.position.y = -0.92 + Math.sin(t * 1.2) * 0.01;
    }
    if (pulseRingRef.current) {
      const scale = 1.0 + Math.sin(t * 2.5) * 0.15;
      pulseRingRef.current.scale.set(scale, scale, 1);
      const mat = pulseRingRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.5 + Math.sin(t * 2.5) * 0.3;
      }
    }
  });

  return (
    <group ref={beaconRef} position={[0, -0.92, 0.2]}>
      {/* Location Plaque */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[1.5, 0.14, 0.02]} />
        <meshStandardMaterial color="#071426" roughness={0.6} metalness={0.7} />
      </mesh>
      <lineSegments position={[0, 0, -0.01]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.5, 0.14, 0.02)]} />
        <lineBasicMaterial color="#1e6fb9" opacity={0.6} />
      </lineSegments>

      {/* Geolocation Marker Ring */}
      <group position={[-0.6, 0, 0.015]}>
        <mesh>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial color="#2f80ed" emissive="#1e6fb9" emissiveIntensity={0.8} />
        </mesh>
        <mesh ref={pulseRingRef}>
          <ringGeometry args={[0.035, 0.045, 16]} />
          <meshBasicMaterial color="#2f80ed" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Location Metadata */}
      <group position={[0.08, 0, 0.015]}>
        <Text
          position={[0, 0.024, 0]}
          fontSize={0.024}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
        >
          {"KARUR • TAMIL NADU"}
        </Text>
        <Text
          position={[0, -0.022, 0]}
          fontSize={0.018}
          color="#d3e6fa"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"GOOGLE MAPS FACILITY LOCATION"}
        </Text>
      </group>
    </group>
  );
}
