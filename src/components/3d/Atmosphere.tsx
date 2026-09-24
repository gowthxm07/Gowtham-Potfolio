"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Atmosphere() {
  const motesRef = useRef<THREE.Points>(null);

  // Sparse, subtle atmospheric motes (35 particles only — strictly non-galaxy)
  const particleCount = 35;
  const positions = useMemo(() => {
    const coords = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 14;
      coords[i * 3 + 1] = Math.random() * 4.5 + 0.2;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return coords;
  }, []);

  useFrame((_, delta) => {
    if (motesRef.current) {
      // Extremely slow vertical drift
      const pos = motesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += delta * 0.04;
        if (pos[i * 3 + 1] > 4.5) {
          pos[i * 3 + 1] = 0.2;
        }
      }
      motesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group name="AtmosphericEnvironment">
      {/* Three.js Atmospheric Fog: Fades distant horizon seamlessly */}
      <fog attach="fog" args={["#040711", 6, 22]} />

      {/* Main Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#040711"
          roughness={0.65}
          metalness={0.4}
        />
      </mesh>

      {/* Central Architectural Dais / Raised Platform */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <cylinderGeometry args={[3.8, 4.0, 0.08, 64]} />
        <meshStandardMaterial
          color="#070c17"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Inner Stepped Ring */}
      <mesh position={[0, 0.085, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.6, 0.03, 64]} />
        <meshStandardMaterial
          color="#0a1224"
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>

      {/* Thin Technical Floor Seams (Concentric Spatial Guide) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.09, 0]}>
        <ringGeometry args={[2.48, 2.5, 64]} />
        <meshBasicMaterial color="#00f0ff" opacity={0.35} transparent />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[3.78, 3.8, 64]} />
        <meshBasicMaterial color="#38bdf8" opacity={0.25} transparent />
      </mesh>

      {/* Subtle Radial Axis Markers */}
      {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((angle, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, angle]}
          position={[0, 0.051, 0]}
        >
          <planeGeometry args={[0.02, 7.2]} />
          <meshBasicMaterial color="#1e293b" opacity={0.4} transparent />
        </mesh>
      ))}

      {/* Distant Monolithic Columns: Establish Scale & Horizon in Negative Space */}
      <group position={[0, 0, -6]}>
        <mesh position={[-5, 3.5, 0]}>
          <boxGeometry args={[0.3, 7, 0.3]} />
          <meshStandardMaterial color="#060a14" roughness={0.5} metalness={0.7} />
        </mesh>
        <mesh position={[5, 3.5, 0]}>
          <boxGeometry args={[0.3, 7, 0.3]} />
          <meshStandardMaterial color="#060a14" roughness={0.5} metalness={0.7} />
        </mesh>
        <mesh position={[-7.5, 4, -2]}>
          <boxGeometry args={[0.4, 8, 0.4]} />
          <meshStandardMaterial color="#050810" roughness={0.6} metalness={0.6} />
        </mesh>
        <mesh position={[7.5, 4, -2]}>
          <boxGeometry args={[0.4, 8, 0.4]} />
          <meshStandardMaterial color="#050810" roughness={0.6} metalness={0.6} />
        </mesh>
      </group>

      {/* Sparse Atmospheric Motes */}
      <points ref={motesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#38bdf8"
          transparent
          opacity={0.35}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
