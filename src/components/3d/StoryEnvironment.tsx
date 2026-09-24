"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function StoryEnvironment() {
  const motesRef = useRef<THREE.Points>(null);

  // Sparse, subtle atmospheric motes (25 slow green/white particles)
  const particleCount = 25;
  const positions = useMemo(() => {
    const coords = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 16;
      coords[i * 3 + 1] = Math.random() * 5.0 - 1.0;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return coords;
  }, []);

  useFrame((_, delta) => {
    if (motesRef.current) {
      const pos = motesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += delta * 0.025;
        if (pos[i * 3 + 1] > 4.5) {
          pos[i * 3 + 1] = -1.0;
        }
      }
      motesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group name="StoryEnvironment">
      {/* Fog: Rich near-black with deep forest slate undertone */}
      <fog attach="fog" args={["#030705", 5, 26]} />

      {/* Baseline Ambient Light with subtle dark-emerald tint */}
      <ambientLight color="#05150a" intensity={0.65} />

      {/* Primary Key Light: Soft off-white directional lighting */}
      <directionalLight
        position={[4, 5, 5]}
        intensity={1.5}
        color="#f8fafc"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Subtle Lateral Fill Light (Deep forest-cyan) */}
      <directionalLight
        position={[-5, 3, 2]}
        intensity={0.6}
        color="#064e3b"
      />

      {/* Electric Lime Accent Rim Light */}
      <pointLight
        position={[-2, 3, -3]}
        intensity={1.2}
        color="#22c55e"
        distance={8}
        decay={2}
      />

      {/* Subtle floor-level atmospheric datum line running along depth */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, -5]}>
        <planeGeometry args={[0.015, 30]} />
        <meshBasicMaterial color="#22c55e" opacity={0.3} transparent />
      </mesh>

      {/* Distant technical horizon datum guides */}
      {[-8, -14, -20].map((zPos, i) => (
        <mesh key={i} position={[0, -1.19, zPos]}>
          <planeGeometry args={[14, 0.012]} />
          <meshBasicMaterial color="#14532d" opacity={0.35} transparent />
        </mesh>
      ))}

      {/* Atmospheric Motes */}
      <points ref={motesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#4ade80"
          transparent
          opacity={0.35}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
