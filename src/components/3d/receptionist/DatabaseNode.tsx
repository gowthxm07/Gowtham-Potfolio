"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";

interface DatabaseNodeProps {
  subProgress: number;
}

export function DatabaseNode({ subProgress }: DatabaseNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const discGroupRef = useRef<THREE.Group>(null);

  // Database enters during mid-to-late story: subProgress 0.42 -> 0.90
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    let targetZ = -8.0;
    let targetX = -0.2;
    let targetY = 0.26;
    let targetScale = 0.35;
    let opacity = 0.0;

    if (subProgress >= 0.40 && subProgress < 0.55) {
      const t = smoothStep((subProgress - 0.40) / (0.55 - 0.40));
      targetZ = -8.0 + (0.35 - -8.0) * t;
      targetScale = 0.5 + 0.5 * t;
      opacity = t;
    } else if (subProgress >= 0.55 && subProgress <= 0.82) {
      const t = smoothStep((subProgress - 0.55) / (0.82 - 0.55));
      targetZ = 0.35 + 0.15 * t;
      targetScale = 1.0;
      opacity = 1.0;
    } else if (subProgress > 0.82 && subProgress <= 0.96) {
      const t = smoothStep((subProgress - 0.82) / (0.96 - 0.82));
      targetZ = 0.5 + (3.8 - 0.5) * t;
      targetScale = 1.0 + 0.3 * t;
      opacity = Math.max(0, 1.0 - t * 1.3);
    } else {
      opacity = 0;
      targetZ = subProgress < 0.40 ? -10 : 5;
    }

    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      targetZ,
      3.8,
      delta
    );
    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      targetX,
      3.8,
      delta
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY,
      3.8,
      delta
    );

    const curScale = groupRef.current.scale.x;
    const nextScale = THREE.MathUtils.damp(curScale, targetScale, 3.8, delta);
    groupRef.current.scale.set(nextScale, nextScale, nextScale);

    // Subtle rotational drift of the disc cylinder
    if (discGroupRef.current) {
      discGroupRef.current.rotation.y += delta * 0.35;
    }

    groupRef.current.visible = opacity > 0.01;
  });

  return (
    <group ref={groupRef} position={[-0.2, 0.26, -8]}>
      {/* 01. VERTICAL BUS CONDUIT FROM AI CORE */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.22, 16]} />
        <meshBasicMaterial color="#22c55e" opacity={0.6} transparent />
      </mesh>

      {/* 02. RELATIONAL DATABASE CYLINDRICAL DISCS (PostgreSQL) */}
      <group ref={discGroupRef} position={[0, 0, 0]}>
        {/* Tier 1 (Top) */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.045, 32]} />
          <meshStandardMaterial color="#08160e" roughness={0.25} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.01, 32]} />
          <meshBasicMaterial color="#4ade80" opacity={0.5} transparent />
        </mesh>

        {/* Tier 2 (Middle) */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.045, 32]} />
          <meshStandardMaterial color="#06120b" roughness={0.25} metalness={0.9} />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.01, 32]} />
          <meshBasicMaterial color="#22c55e" opacity={0.5} transparent />
        </mesh>

        {/* Tier 3 (Base) */}
        <mesh position={[0, -0.06, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.045, 32]} />
          <meshStandardMaterial color="#051009" roughness={0.25} metalness={0.9} />
        </mesh>
      </group>

      {/* 03. CONCEPTUAL TABLE LABELS */}
      <group position={[0.42, 0.03, 0]}>
        <Text
          position={[0, 0.06, 0]}
          fontSize={0.024}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"POSTGRESQL // PRISMA ORM"}
        </Text>
        <Text
          position={[0, 0, 0]}
          fontSize={0.019}
          color="#4ade80"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"[USERS] • [BUSINESS] • [SESSIONS]"}
        </Text>
        <Text
          position={[0, -0.055, 0]}
          fontSize={0.018}
          color="#86efac"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {"[APPOINTMENTS // RELATIONAL WRITE]"}
        </Text>
      </group>
    </group>
  );
}
