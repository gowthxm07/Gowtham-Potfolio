"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface WeightedScoreRingsProps {
  subProgress: number;
}

export function WeightedScoreRings({ subProgress }: WeightedScoreRingsProps) {
  const outerRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.35;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -t * 0.45;
    }
  });

  // Verified deterministic weights from src/services/ai/scoringConfig.js
  const workerWeights = [
    { label: "SKILLS 50%", angle: 0 },
    { label: "LOCATION 20%", angle: Math.PI * 0.5 },
    { label: "AMENITIES 15%", angle: Math.PI },
    { label: "SALARY 15%", angle: Math.PI * 1.5 },
  ];

  const candidateWeights = [
    { label: "SKILLS 45%", angle: Math.PI * 0.25 },
    { label: "LOCATION 20%", angle: Math.PI * 0.75 },
    { label: "REPUTATION 20%", angle: Math.PI * 1.25 },
    { label: "RELIABILITY 15%", angle: Math.PI * 1.75 },
  ];

  return (
    <group position={[0, 0, 0]}>
      {/* ============================================================== */}
      {/* 01. OUTER ROTATING RING: WORKER JOB SCORING WEIGHTS (50/20/15/15) */}
      {/* ============================================================== */}
      <group ref={outerRingRef}>
        <mesh>
          <ringGeometry args={[0.54, 0.57, 32]} />
          <meshStandardMaterial
            color="#22c55e"
            emissive="#15803d"
            emissiveIntensity={0.6}
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.RingGeometry(0.538, 0.572, 32)]} />
          <lineBasicMaterial color="#86efac" />
        </lineSegments>

        {/* Outer Ring Labels */}
        {workerWeights.map((w, idx) => {
          const x = Math.cos(w.angle) * 0.65;
          const y = Math.sin(w.angle) * 0.65;
          return (
            <group key={idx} position={[x, y, 0.01]}>
              <Text
                fontSize={0.024}
                color="#86efac"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.04}
              >
                {w.label}
              </Text>
            </group>
          );
        })}
      </group>

      {/* ============================================================== */}
      {/* 02. INNER ROTATING RING: CANDIDATE RANKING WEIGHTS (45/20/20/15) */}
      {/* ============================================================== */}
      <group ref={innerRingRef}>
        <mesh>
          <ringGeometry args={[0.38, 0.41, 32]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.6}
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.RingGeometry(0.378, 0.412, 32)]} />
          <lineBasicMaterial color="#7dd3fc" />
        </lineSegments>

        {/* Inner Ring Labels */}
        {candidateWeights.map((w, idx) => {
          const x = Math.cos(w.angle) * 0.47;
          const y = Math.sin(w.angle) * 0.47;
          return (
            <group key={idx} position={[x, y, 0.01]}>
              <Text
                fontSize={0.021}
                color="#7dd3fc"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.04}
              >
                {w.label}
              </Text>
            </group>
          );
        })}
      </group>

      {/* Static Legend Indicators */}
      <group position={[0, -0.74, 0]}>
        <Text
          position={[0, 0.03, 0.01]}
          fontSize={0.022}
          color="#86efac"
          anchorX="center"
          anchorY="middle"
        >
          {"OUTER: WORKER JOB FIT (50% SKILL • 20% LOC • 15% AMENITY • 15% SALARY)"}
        </Text>
        <Text
          position={[0, -0.015, 0.01]}
          fontSize={0.02}
          color="#7dd3fc"
          anchorX="center"
          anchorY="middle"
        >
          {"INNER: CANDIDATE RANK (45% SKILL • 20% LOC • 20% REPUTATION • 15% RELIABILITY)"}
        </Text>
      </group>
    </group>
  );
}
