"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface ContactUnlockNodeProps {
  subProgress: number;
}

export function ContactUnlockNode({ subProgress }: ContactUnlockNodeProps) {
  const isUnlocked = subProgress >= 0.78;
  const gateLeftRef = useRef<THREE.Mesh>(null);
  const gateRightRef = useRef<THREE.Mesh>(null);
  const bridgeConduitRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    // Smooth gate swing open when unlocked
    const targetAngle = isUnlocked ? Math.PI * 0.45 : 0;
    if (gateLeftRef.current) {
      gateLeftRef.current.rotation.y = THREE.MathUtils.damp(
        gateLeftRef.current.rotation.y,
        -targetAngle,
        4.0,
        delta
      );
    }
    if (gateRightRef.current) {
      gateRightRef.current.rotation.y = THREE.MathUtils.damp(
        gateRightRef.current.rotation.y,
        targetAngle,
        4.0,
        delta
      );
    }
    if (bridgeConduitRef.current) {
      const mat = bridgeConduitRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = isUnlocked
          ? 1.0 + Math.sin(state.clock.elapsedTime * 4.0) * 0.3
          : 0.1;
      }
    }
  });

  return (
    <group position={[0, -0.76, 0.3]}>
      {/* Node Header */}
      <Text
        position={[0, 0.22, 0]}
        fontSize={0.038}
        color={isUnlocked ? "#4ade80" : "#f87171"}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {isUnlocked ? "CONTACT UNLOCKED // DIRECT BRIDGE ACTIVE" : "CONTACT LOCKED // PRIVACY SHIELD"}
      </Text>
      <Text
        position={[0, 0.17, 0]}
        fontSize={0.022}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        {"PHONE & WHATSAPP MASKED UNTIL interest.status === 'accepted'"}
      </Text>

      {/* Main Bridge Conduit (Behind Gates) */}
      <mesh ref={bridgeConduitRef} position={[0, 0.04, -0.02]}>
        <boxGeometry args={[1.3, 0.08, 0.04]} />
        <meshStandardMaterial
          color={isUnlocked ? "#064e3b" : "#18181b"}
          emissive={isUnlocked ? "#22c55e" : "#000000"}
          emissiveIntensity={isUnlocked ? 0.9 : 0}
          roughness={0.3}
        />
      </mesh>
      <lineSegments position={[0, 0.04, -0.02]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.3, 0.08, 0.04)]} />
        <lineBasicMaterial color={isUnlocked ? "#86efac" : "#ef4444"} />
      </lineSegments>

      {/* Left Privacy Barrier Gate (Pivots at x = -0.32) */}
      <group position={[-0.32, 0.04, 0.02]}>
        <mesh ref={gateLeftRef} position={[0.16, 0, 0]}>
          <boxGeometry args={[0.32, 0.14, 0.02]} />
          <meshStandardMaterial
            color={isUnlocked ? "#0f2e1e" : "#3f1414"}
            roughness={0.6}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* Right Privacy Barrier Gate (Pivots at x = 0.32) */}
      <group position={[0.32, 0.04, 0.02]}>
        <mesh ref={gateRightRef} position={[-0.16, 0, 0]}>
          <boxGeometry args={[0.32, 0.14, 0.02]} />
          <meshStandardMaterial
            color={isUnlocked ? "#0f2e1e" : "#3f1414"}
            roughness={0.6}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* Unlocked Contact Details Badges */}
      <group position={[0, -0.08, 0.02]}>
        {/* Phone Target */}
        <group position={[-0.34, 0, 0]}>
          <mesh position={[0, 0, -0.002]}>
            <planeGeometry args={[0.48, 0.05]} />
            <meshBasicMaterial color="#051a10" opacity={0.9} transparent />
          </mesh>
          <lineSegments position={[0, 0, 0]}>
            <edgesGeometry args={[new THREE.BoxGeometry(0.48, 0.05, 0.002)]} />
            <lineBasicMaterial color={isUnlocked ? "#22c55e" : "#64748b"} />
          </lineSegments>
          <Text
            fontSize={0.02}
            color={isUnlocked ? "#86efac" : "#64748b"}
            anchorX="center"
            anchorY="middle"
          >
            {isUnlocked ? "PHONE: +91 98428 14290" : "PHONE: +91 9842X-XXXXX"}
          </Text>
        </group>

        {/* WhatsApp Deep Link Target */}
        <group position={[0.34, 0, 0]}>
          <mesh position={[0, 0, -0.002]}>
            <planeGeometry args={[0.48, 0.05]} />
            <meshBasicMaterial color="#051a10" opacity={0.9} transparent />
          </mesh>
          <lineSegments position={[0, 0, 0]}>
            <edgesGeometry args={[new THREE.BoxGeometry(0.48, 0.05, 0.002)]} />
            <lineBasicMaterial color={isUnlocked ? "#22c55e" : "#64748b"} />
          </lineSegments>
          <Text
            fontSize={0.02}
            color={isUnlocked ? "#25d366" : "#64748b"}
            anchorX="center"
            anchorY="middle"
          >
            {isUnlocked ? "WHATSAPP: wa.me/+919842814290" : "WHATSAPP: LOCKED"}
          </Text>
        </group>
      </group>
    </group>
  );
}
