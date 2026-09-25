"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";

interface SessionContextNodeProps {
  subProgress: number;
}

export function SessionContextNode({ subProgress }: SessionContextNodeProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Activates during mid-story: subProgress 0.35 -> 0.88
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    let targetZ = -8.0;
    let targetX = 0.55;
    let targetY = 1.38;
    let targetScale = 0.35;
    let opacity = 0.0;

    if (subProgress >= 0.32 && subProgress < 0.48) {
      const t = smoothStep((subProgress - 0.32) / (0.48 - 0.32));
      targetZ = -8.0 + (0.35 - -8.0) * t;
      targetScale = 0.5 + 0.5 * t;
      opacity = t;
    } else if (subProgress >= 0.48 && subProgress <= 0.78) {
      const t = smoothStep((subProgress - 0.48) / (0.78 - 0.48));
      targetZ = 0.35 + 0.15 * t;
      targetScale = 1.0;
      opacity = 1.0;
    } else if (subProgress > 0.78 && subProgress <= 0.95) {
      const t = smoothStep((subProgress - 0.78) / (0.95 - 0.78));
      targetZ = 0.5 + (3.8 - 0.5) * t;
      targetScale = 1.0 + 0.3 * t;
      opacity = Math.max(0, 1.0 - t * 1.3);
    } else {
      opacity = 0;
      targetZ = subProgress < 0.32 ? -10 : 5;
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

    // Subtle gentle float
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      -0.15 + Math.sin(state.clock.elapsedTime * 1.0) * 0.03,
      3.5,
      delta
    );

    groupRef.current.visible = opacity > 0.01;
  });

  return (
    <group ref={groupRef} position={[0.55, 1.38, -8]}>
      {/* 01. ACRYLIC HOUSING FRAME */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[0.92, 0.48, 0.02]} />
        <meshStandardMaterial
          color="#06140b"
          roughness={0.25}
          metalness={0.88}
        />
      </mesh>

      {/* Frame Border Seam */}
      <mesh position={[0, 0, -0.015]}>
        <boxGeometry args={[0.94, 0.5, 0.005]} />
        <meshBasicMaterial color="#22c55e" opacity={0.5} transparent />
      </mesh>

      {/* Header Label */}
      <Text
        position={[-0.42, 0.19, 0.01]}
        fontSize={0.026}
        color="#86efac"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"SESSION ISOLATION // MULTI-TENANT"}
      </Text>

      {/* Dividing Partition Wall between Tenants */}
      <mesh position={[0, -0.04, 0.01]}>
        <boxGeometry args={[0.008, 0.32, 0.008]} />
        <meshBasicMaterial color="#22c55e" opacity={0.6} transparent />
      </mesh>

      {/* Tenant A Compartment */}
      <group position={[-0.22, -0.04, 0.01]}>
        <Text
          position={[0, 0.1, 0]}
          fontSize={0.024}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"BUSINESS ORG 01"}
        </Text>
        <Text
          position={[0, 0.04, 0]}
          fontSize={0.02}
          color="#4ade80"
          anchorX="center"
          anchorY="middle"
        >
          {"● SESSION ACTIVE"}
        </Text>
        <Text
          position={[0, -0.02, 0]}
          fontSize={0.018}
          color="#9ca3af"
          anchorX="center"
          anchorY="middle"
        >
          {"CONTEXT: ISOLATED"}
        </Text>
        <Text
          position={[0, -0.08, 0]}
          fontSize={0.016}
          color="#22c55e"
          anchorX="center"
          anchorY="middle"
        >
          {"TOKEN BUFFER: IN-MEMORY"}
        </Text>
      </group>

      {/* Tenant B Compartment */}
      <group position={[0.22, -0.04, 0.01]}>
        <Text
          position={[0, 0.1, 0]}
          fontSize={0.024}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"BUSINESS ORG 02"}
        </Text>
        <Text
          position={[0, 0.04, 0]}
          fontSize={0.02}
          color="#86efac"
          anchorX="center"
          anchorY="middle"
        >
          {"○ SESSION STANDBY"}
        </Text>
        <Text
          position={[0, -0.02, 0]}
          fontSize={0.018}
          color="#9ca3af"
          anchorX="center"
          anchorY="middle"
        >
          {"CONTEXT: ISOLATED"}
        </Text>
        <Text
          position={[0, -0.08, 0]}
          fontSize={0.016}
          color="#22c55e"
          anchorX="center"
          anchorY="middle"
        >
          {"ZERO CROSS-TALK"}
        </Text>
      </group>

      {/* Bottom Partition Footnote */}
      <mesh position={[0, -0.21, 0.01]}>
        <boxGeometry args={[0.84, 0.004, 0.002]} />
        <meshBasicMaterial color="#22c55e" opacity={0.4} transparent />
      </mesh>
    </group>
  );
}
