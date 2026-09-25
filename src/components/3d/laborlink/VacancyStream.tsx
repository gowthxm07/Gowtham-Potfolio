"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface VacancyStreamProps {
  subProgress: number;
}

export function VacancyStream({ subProgress }: VacancyStreamProps) {
  const packetGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!packetGroupRef.current) return;
    const t = state.clock.elapsedTime;
    packetGroupRef.current.children.forEach((child, i) => {
      // Move packets from 1.15 to 0.35 along X
      const speed = 0.6 + i * 0.15;
      const xSpan = 0.8;
      const progress = ((t * speed + i * 0.25) % 1.0);
      child.position.x = 1.15 - progress * xSpan;
      child.position.y = 0.4 + Math.sin(progress * Math.PI) * 0.05 + (i - 1.5) * 0.08;
    });
  });

  const streamLabels = [
    { label: "REQ SKILLS: POWER LOOM • WEAVING", y: 0.58 },
    { label: "JOB LOCATION: TIRUPPUR TEXTILE", y: 0.46 },
    { label: "SALARY: ₹16,000 / MONTH (FIXED)", y: 0.34 },
    { label: "AMENITIES: FREE ROOM + WATER", y: 0.22 },
  ];

  return (
    <group position={[0, 0, 0]}>
      {/* 3D Conduit Rails connecting Factory to Matching Core */}
      <lineSegments position={[0.75, 0.4, -0.05]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.85, 0.38, 0.02)]} />
        <lineBasicMaterial color="#15803d" opacity={0.35} />
      </lineSegments>

      {/* Guide Rails */}
      {[-0.15, -0.05, 0.05, 0.15].map((yOffset, idx) => (
        <mesh key={idx} position={[0.75, 0.4 + yOffset, -0.05]}>
          <boxGeometry args={[0.85, 0.005, 0.005]} />
          <meshBasicMaterial color="#22c55e" opacity={0.4} />
        </mesh>
      ))}

      {/* Animated Flow Packets */}
      <group ref={packetGroupRef}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[1.15 - i * 0.2, 0.4, 0]}>
            <boxGeometry args={[0.04, 0.02, 0.02]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={1.2}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* Structured Stream Label Badges */}
      {streamLabels.map((s, idx) => (
        <group key={idx} position={[0.75, s.y, 0.05]}>
          <mesh position={[0, 0, -0.005]}>
            <planeGeometry args={[0.62, 0.055]} />
            <meshStandardMaterial color="#05150d" opacity={0.9} transparent />
          </mesh>
          <lineSegments position={[0, 0, 0]}>
            <edgesGeometry args={[new THREE.BoxGeometry(0.62, 0.055, 0.002)]} />
            <lineBasicMaterial color="#38bdf8" opacity={0.5} />
          </lineSegments>
          <Text
            position={[0.28, 0, 0.005]}
            fontSize={0.022}
            color="#7dd3fc"
            anchorX="right"
            anchorY="middle"
            letterSpacing={0.04}
          >
            {s.label}
          </Text>
        </group>
      ))}

      {/* Flow Vector Header */}
      <Text
        position={[0.75, 0.68, 0]}
        fontSize={0.03}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {"<<<  VACANCY REQUIREMENTS STREAM"}
      </Text>
    </group>
  );
}
