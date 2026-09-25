"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface FinalCommunicationBridgeProps {
  subProgress: number;
}

export function FinalCommunicationBridge({ subProgress }: FinalCommunicationBridgeProps) {
  const isFinalActive = subProgress >= 0.75;
  const bridgeLineRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (bridgeLineRef.current) {
      const mat = bridgeLineRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = isFinalActive
          ? 1.0 + Math.sin(state.clock.elapsedTime * 4.0) * 0.4
          : 0.15;
      }
    }
  });

  return (
    <group position={[0, -0.98, 0.35]}>
      {/* Span Bridge Connecting Worker (x=-1.5) to Center (x=0) to Factory (x=1.5) */}
      <mesh ref={bridgeLineRef} position={[0, 0, 0]}>
        <boxGeometry args={[3.1, 0.04, 0.02]} />
        <meshStandardMaterial
          color={isFinalActive ? "#064e3b" : "#1e293b"}
          emissive={isFinalActive ? "#22c55e" : "#0f172a"}
          emissiveIntensity={isFinalActive ? 0.9 : 0.1}
          roughness={0.3}
        />
      </mesh>
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(3.1, 0.04, 0.02)]} />
        <lineBasicMaterial color={isFinalActive ? "#86efac" : "#475569"} />
      </lineSegments>

      {/* Culmination Central Banner */}
      <group position={[0, 0.09, 0]}>
        <mesh position={[0, 0, -0.002]}>
          <planeGeometry args={[1.5, 0.07]} />
          <meshBasicMaterial color="#02140a" opacity={0.92} transparent />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(1.5, 0.07, 0.002)]} />
          <lineBasicMaterial color={isFinalActive ? "#22c55e" : "#334155"} />
        </lineSegments>
        <Text
          position={[0, 0.012, 0.005]}
          fontSize={0.024}
          color={isFinalActive ? "#4ade80" : "#94a3b8"}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
        >
          {isFinalActive
            ? "WORKER ══════════ LABORLINK ══════════ FACTORY"
            : "WORKER . . . . . . . LABORLINK . . . . . . . FACTORY"}
        </Text>
        <Text
          position={[0, -0.016, 0.005]}
          fontSize={0.018}
          color={isFinalActive ? "#86efac" : "#64748b"}
          anchorX="center"
          anchorY="middle"
        >
          {isFinalActive
            ? "DIRECT CONTACT UNLOCKED // ZERO-BROKERAGE MARKETPLACE"
            : "PENDING MUTUAL HIRING APPROVAL"}
        </Text>
      </group>
    </group>
  );
}
