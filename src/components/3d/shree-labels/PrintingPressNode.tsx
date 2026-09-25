"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface PrintingPressNodeProps {
  subProgress: number;
}

export function PrintingPressNode({ subProgress }: PrintingPressNodeProps) {
  const roller1Ref = useRef<THREE.Mesh>(null);
  const roller2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (roller1Ref.current) {
      roller1Ref.current.rotation.x = t * 1.5;
    }
    if (roller2Ref.current) {
      roller2Ref.current.rotation.x = -t * 1.5;
    }
  });

  const verifiedFinishing = [
    "HOT CUT",
    "COLD CUT",
    "ULTRASONIC",
    "CENTER FOLD",
    "END FOLD",
    "MITER FOLD",
    "MANHATTAN FOLD",
    "LOOP FOLD",
  ];

  return (
    <group position={[0, -0.65, 0.1]}>
      {/* Node Header */}
      <Text
        position={[0, 0.46, 0]}
        fontSize={0.038}
        color="#145593"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"PRECISION PRINTING & CUSTOM FINISHING"}
      </Text>
      <Text
        position={[0, 0.41, 0]}
        fontSize={0.022}
        color="#5b7d9e"
        anchorX="center"
        anchorY="middle"
      >
        {"OFFSET PRESS CAPACITY & APPAREL FOLDING TECHNIQUES"}
      </Text>

      {/* Abstract Dual Mechanical Rollers (Precision Nip Assembly) */}
      <group position={[0, 0.22, 0]}>
        {/* Upper Roller (Polished Steel) */}
        <mesh ref={roller1Ref} position={[0, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 1.35, 24]} />
          <meshStandardMaterial color="#bdd8f4" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Lower Roller (Polished Steel) */}
        <mesh ref={roller2Ref} position={[0, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 1.35, 24]} />
          <meshStandardMaterial color="#94b8df" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Material Feed Guide Rail */}
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[1.4, 0.008, 0.14]} />
          <meshStandardMaterial color="#f0f6fd" roughness={0.4} />
        </mesh>
      </group>

      {/* Verified Finishing Techniques Matrix */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0, -0.005]}>
          <planeGeometry args={[1.65, 0.18]} />
          <meshStandardMaterial color="#f6fafe" roughness={0.8} />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(1.65, 0.18, 0.005)]} />
          <lineBasicMaterial color="#bdd8f4" />
        </lineSegments>

        <Text
          position={[0, 0.06, 0.01]}
          fontSize={0.02}
          color="#0b1f3a"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
        >
          {"VERIFIED CUTTING & FOLD FINISH CAPABILITIES"}
        </Text>

        {/* 8 Chips (4x2 grid) */}
        {verifiedFinishing.map((finish, idx) => {
          const col = idx % 4;
          const row = Math.floor(idx / 4);
          const x = -0.58 + col * 0.38;
          const y = 0.015 - row * 0.045;

          return (
            <group key={finish} position={[x, y, 0.01]}>
              <mesh position={[0, 0, 0]}>
                <planeGeometry args={[0.34, 0.035]} />
                <meshStandardMaterial color="#eaf4ff" />
              </mesh>
              <lineSegments position={[0, 0, 0]}>
                <edgesGeometry args={[new THREE.BoxGeometry(0.34, 0.035, 0.001)]} />
                <lineBasicMaterial color="#1e6fb9" opacity={0.6} />
              </lineSegments>
              <Text
                fontSize={0.017}
                color="#0f4c81"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.03}
              >
                {finish}
              </Text>
            </group>
          );
        })}
      </group>
    </group>
  );
}
