"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function Atmosphere() {
  const motesRef = useRef<THREE.Points>(null);

  // Sparse, subtle atmospheric motes (30 particles only — strictly non-galaxy)
  const particleCount = 30;
  const positions = useMemo(() => {
    const coords = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 12;
      coords[i * 3 + 1] = Math.random() * 4.2 + 0.3;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return coords;
  }, []);

  useFrame((_, delta) => {
    if (motesRef.current) {
      // Extremely slow vertical drift
      const pos = motesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += delta * 0.035;
        if (pos[i * 3 + 1] > 4.5) {
          pos[i * 3 + 1] = 0.3;
        }
      }
      motesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group name="ArchitecturalAtmosphere">
      {/* Fog: Seamlessly blends horizon into rich obsidian void */}
      <fog attach="fog" args={["#040711", 5.5, 22]} />

      {/* ========================================================== */}
      {/* 01. FOREGROUND LAYER: Visual Anchors & Guiding Pathway    */}
      {/* ========================================================== */}

      {/* Central Illuminated Floor Runway / Pathway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 2.7]}>
        <planeGeometry args={[1.2, 4.4]} />
        <meshStandardMaterial
          color="#060b17"
          roughness={0.35}
          metalness={0.8}
        />
      </mesh>

      {/* Parallel Guide Track Lines on Pathway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.58, 0.02, 2.7]}>
        <planeGeometry args={[0.012, 4.4]} />
        <meshBasicMaterial color="#00f0ff" opacity={0.35} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.58, 0.02, 2.7]}>
        <planeGeometry args={[0.012, 4.4]} />
        <meshBasicMaterial color="#00f0ff" opacity={0.35} transparent />
      </mesh>

      {/* Foreground Low Guide Curb Pylons (Left & Right framing) */}
      <group position={[-2.7, 0.06, 3.2]}>
        <mesh receiveShadow>
          <boxGeometry args={[0.4, 0.12, 1.2]} />
          <meshStandardMaterial color="#080e1b" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.065, 0]}>
          <boxGeometry args={[0.36, 0.01, 1.1]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.2} />
        </mesh>
      </group>

      <group position={[2.7, 0.06, 3.2]}>
        <mesh receiveShadow>
          <boxGeometry args={[0.4, 0.12, 1.2]} />
          <meshStandardMaterial color="#080e1b" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.065, 0]}>
          <boxGeometry args={[0.36, 0.01, 1.1]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* ========================================================== */}
      {/* 02. MIDGROUND LAYER: Central Platform & Architectural Wings */}
      {/* ========================================================== */}

      {/* Main Ground Expanse */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial
          color="#040711"
          roughness={0.7}
          metalness={0.4}
        />
      </mesh>

      {/* Central Architectural Dais / Outer Ring */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <cylinderGeometry args={[4.4, 4.6, 0.08, 64]} />
        <meshStandardMaterial
          color="#070c18"
          roughness={0.28}
          metalness={0.85}
        />
      </mesh>

      {/* Stepped Inner Platform Tier */}
      <mesh position={[0, 0.09, 0]} receiveShadow>
        <cylinderGeometry args={[3.1, 3.2, 0.04, 64]} />
        <meshStandardMaterial
          color="#0a1224"
          roughness={0.22}
          metalness={0.9}
        />
      </mesh>

      {/* Concentric Spatial Seam Rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.095, 0]}>
        <ringGeometry args={[3.08, 3.1, 64]} />
        <meshBasicMaterial color="#00f0ff" opacity={0.45} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[4.38, 4.4, 64]} />
        <meshBasicMaterial color="#38bdf8" opacity={0.3} transparent />
      </mesh>

      {/* Dual Flanking Architectural Portal Fins (Frames the Identity Monolith) */}
      <group position={[-2.5, 2.1, 0.1]}>
        {/* Main Vertical Fin Column */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.22, 4.2, 0.65]} />
          <meshStandardMaterial
            color="#080e1b"
            roughness={0.25}
            metalness={0.88}
          />
        </mesh>
        {/* Inner Vertical Cyan Seam */}
        <mesh position={[0.111, 0, 0]}>
          <boxGeometry args={[0.01, 4.2, 0.65]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.35}
            roughness={0.2}
          />
        </mesh>
      </group>

      <group position={[2.5, 2.1, 0.1]}>
        {/* Main Vertical Fin Column */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.22, 4.2, 0.65]} />
          <meshStandardMaterial
            color="#080e1b"
            roughness={0.25}
            metalness={0.88}
          />
        </mesh>
        {/* Inner Vertical Cyan Seam */}
        <mesh position={[-0.111, 0, 0]}>
          <boxGeometry args={[0.01, 4.2, 0.65]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.35}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Cardinal Spatial Plinths (Anchors where future zones emerge) */}
      {/* West: Future Projects Pod Foundation */}
      <group position={[-3.8, 0.06, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[0.8, 0.06, 0.8]} />
          <meshStandardMaterial color="#080e1b" roughness={0.35} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.035, 0]}>
          <planeGeometry args={[0.7, 0.7]} />
          <meshBasicMaterial color="#00f0ff" opacity={0.15} transparent wireframe />
        </mesh>
        <Text
          position={[0, 0.04, 0.3]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.05}
          color="#64748b"
          letterSpacing={0.06}
        >
          {"02 // PROJECTS"}
        </Text>
      </group>

      {/* East: Future Skills Matrix Foundation */}
      <group position={[3.8, 0.06, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[0.8, 0.06, 0.8]} />
          <meshStandardMaterial color="#080e1b" roughness={0.35} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.035, 0]}>
          <planeGeometry args={[0.7, 0.7]} />
          <meshBasicMaterial color="#00f0ff" opacity={0.15} transparent wireframe />
        </mesh>
        <Text
          position={[0, 0.04, 0.3]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.05}
          color="#64748b"
          letterSpacing={0.06}
        >
          {"03 // SKILLS"}
        </Text>
      </group>

      {/* ========================================================== */}
      {/* 03. BACKGROUND LAYER: Distant Colonnade & Architectural Horizon */}
      {/* ========================================================== */}

      {/* Semicircular Distant Colonnade (Provides scale and structure in the fog) */}
      <group position={[0, 0, -4.8]}>
        {/* Horizontal Architectural Datum Spanner */}
        <mesh position={[0, 5.8, 0]}>
          <boxGeometry args={[14, 0.3, 0.4]} />
          <meshStandardMaterial color="#060a15" roughness={0.5} metalness={0.7} />
        </mesh>
        <mesh position={[0, 5.64, 0]}>
          <boxGeometry args={[13.8, 0.015, 0.35]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.25} />
        </mesh>

        {/* 6 Structural Monolithic Piers */}
        {[-5.5, -3.3, -1.1, 1.1, 3.3, 5.5].map((xOffset, i) => (
          <group key={i} position={[xOffset, 2.8, (Math.abs(xOffset) - 3) * -0.4]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.38, 5.6, 0.38]} />
              <meshStandardMaterial
                color="#060914"
                roughness={0.4}
                metalness={0.75}
              />
            </mesh>
          </group>
        ))}
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
          opacity={0.3}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
