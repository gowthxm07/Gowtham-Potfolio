"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface FairnessFilterProps {
  subProgress: number;
}

export function FairnessFilter({ subProgress }: FairnessFilterProps) {
  const gateRef = useRef<THREE.Group>(null);
  const laserRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (laserRef.current) {
      const mat = laserRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.5 + Math.sin(t * 3.0) * 0.25;
      }
    }
  });

  // Protected attributes strictly stripped by sanitizeWorkerProfile (scoringEngine.js)
  const blockedAttributes = [
    "AGE [STRIPPED]",
    "GENDER [STRIPPED]",
    "RELIGION [STRIPPED]",
    "CASTE [STRIPPED]",
    "ETHNICITY [STRIPPED]",
    "MARITAL STATUS [STRIPPED]",
    "PHOTO [STRIPPED]",
  ];

  // Technical attributes that pass through the sanitization barrier
  const allowedAttributes = [
    "✓ TRADE SKILLS",
    "✓ REGIONAL LOCATION",
    "✓ VERIFIED EXPERIENCE",
    "✓ REPUTATION METRICS",
    "✓ RELIABILITY RECORD",
    "✓ VACANCY CRITERIA",
  ];

  return (
    <group ref={gateRef} position={[0, 1.48, -0.15]}>
      {/* Barrier Header Title */}
      <Text
        position={[0, 0.42, 0]}
        fontSize={0.044}
        color="#f87171"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"FAIRNESS GATE // PROTECTED ATTRIBUTES REMOVED"}
      </Text>
      <Text
        position={[0, 0.35, 0]}
        fontSize={0.026}
        color="#cbd5e1"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"PROTECTED ATTRIBUTE SANITIZATION (NOT 'BIAS-FREE AI')"}
      </Text>

      {/* Physical Security Grid / Laser Barrier Frame */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.5, 0.48, 0.03]} />
        <meshStandardMaterial color="#08080a" roughness={0.8} metalness={0.6} />
      </mesh>
      <lineSegments position={[0, 0.05, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.5, 0.48, 0.03)]} />
        <lineBasicMaterial color="#ef4444" opacity={0.6} />
      </lineSegments>

      {/* Laser Mesh Barrier Surface */}
      <mesh ref={laserRef} position={[0, 0.05, 0.018]}>
        <planeGeometry args={[1.46, 0.44]} />
        <meshBasicMaterial color="#ef4444" opacity={0.4} transparent wireframe />
      </mesh>

      {/* BLOCKED / MUTED DEMOGRAPHIC FRAGMENTS (Visibly stopped at the barrier) */}
      <group position={[-0.42, 0.05, 0.03]}>
        <Text
          position={[0, 0.16, 0]}
          fontSize={0.022}
          color="#fca5a5"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"[FILTERED & STRIPPED AT INGEST]"}
        </Text>
        {blockedAttributes.map((attr, idx) => {
          const col = idx % 2;
          const row = Math.floor(idx / 2);
          const x = -0.15 + col * 0.3;
          const y = 0.08 - row * 0.065;
          return (
            <group key={attr} position={[x, y, 0]}>
              <mesh position={[0, 0, -0.002]}>
                <planeGeometry args={[0.26, 0.045]} />
                <meshBasicMaterial color="#450a0a" opacity={0.8} transparent />
              </mesh>
              <lineSegments position={[0, 0, 0]}>
                <edgesGeometry args={[new THREE.BoxGeometry(0.26, 0.045, 0.001)]} />
                <lineBasicMaterial color="#ef4444" opacity={0.4} />
              </lineSegments>
              <Text
                fontSize={0.016}
                color="#fca5a5"
                anchorX="center"
                anchorY="middle"
              >
                {attr}
              </Text>
            </group>
          );
        })}
      </group>

      {/* Central Barrier Divider Line */}
      <lineSegments position={[0, 0.05, 0.025]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.01, 0.44, 0.01)]} />
        <lineBasicMaterial color="#94a3b8" opacity={0.5} />
      </lineSegments>

      {/* ALLOWED TECHNICAL ATTRIBUTES (Passing through into scoring & reasoning) */}
      <group position={[0.42, 0.05, 0.03]}>
        <Text
          position={[0, 0.16, 0]}
          fontSize={0.022}
          color="#86efac"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"[ALLOWED MERIT CRITERIA ONLY]"}
        </Text>
        {allowedAttributes.map((attr, idx) => {
          const col = idx % 2;
          const row = Math.floor(idx / 2);
          const x = -0.15 + col * 0.3;
          const y = 0.08 - row * 0.065;
          return (
            <group key={attr} position={[x, y, 0]}>
              <mesh position={[0, 0, -0.002]}>
                <planeGeometry args={[0.26, 0.045]} />
                <meshBasicMaterial color="#052e16" opacity={0.8} transparent />
              </mesh>
              <lineSegments position={[0, 0, 0]}>
                <edgesGeometry args={[new THREE.BoxGeometry(0.26, 0.045, 0.001)]} />
                <lineBasicMaterial color="#22c55e" opacity={0.6} />
              </lineSegments>
              <Text
                fontSize={0.016}
                color="#86efac"
                anchorX="center"
                anchorY="middle"
              >
                {attr}
              </Text>
            </group>
          );
        })}
      </group>
    </group>
  );
}
