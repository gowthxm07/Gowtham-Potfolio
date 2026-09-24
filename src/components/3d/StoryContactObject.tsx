"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";

interface StoryContactObjectProps {
  progress: number;
}

export function StoryContactObject({ progress }: StoryContactObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Section 08: Range [0.90, 1.00]
  const startP = 0.88;
  const peakStart = 0.93;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    let targetZ = -14.0;
    let targetX = -0.75;
    let targetY = 0.8;
    let targetScale = 0.35;
    let opacity = 0.0;

    if (progress >= startP && progress < peakStart) {
      const t = smoothStep((progress - startP) / (peakStart - startP));
      targetZ = -14.0 + (0.5 - -14.0) * t;
      targetScale = 0.5 + 0.5 * t;
      opacity = t;
    } else if (progress >= peakStart) {
      const t = smoothStep((progress - peakStart) / (1.0 - peakStart));
      targetZ = 0.5 + 0.2 * t;
      targetScale = 1.0;
      opacity = 1.0;
    } else {
      opacity = 0;
      targetZ = -16;
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

    // Pulse signal transmission rings outward
    const time = state.clock.elapsedTime * 2.5;
    if (ring1Ref.current) {
      const scale1 = 0.5 + ((time * 0.4) % 1.0) * 1.5;
      ring1Ref.current.scale.set(scale1, scale1, scale1);
    }
    if (ring2Ref.current) {
      const scale2 = 0.5 + (((time + 1.2) * 0.4) % 1.0) * 1.5;
      ring2Ref.current.scale.set(scale2, scale2, scale2);
    }
    if (ring3Ref.current) {
      const scale3 = 0.5 + (((time + 2.4) * 0.4) % 1.0) * 1.5;
      ring3Ref.current.scale.set(scale3, scale3, scale3);
    }

    // Core rotational spin
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 1.2;
      coreRef.current.rotation.x += delta * 0.5;
    }

    groupRef.current.visible = opacity > 0.01;
  });

  return (
    <group ref={groupRef} position={[-0.75, 0.8, -14]}>
      {/* 01. SATELLITE DISH / ARRAY MOUNT */}
      <mesh position={[0, -0.65, 0]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.09, 0.7, 16]} />
        <meshStandardMaterial color="#08150d" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Dish Mesh */}
      <mesh position={[0, 0, -0.1]} rotation={[Math.PI / 8, 0, 0]}>
        <sphereGeometry args={[0.85, 24, 16, 0, Math.PI * 2, 0, 0.9]} />
        <meshStandardMaterial
          color="#06120a"
          emissive="#22c55e"
          emissiveIntensity={0.25}
          roughness={0.2}
          metalness={0.85}
          wireframe
        />
      </mesh>

      {/* 02. CENTRAL TRANSMITTER CORE */}
      <mesh ref={coreRef} position={[0, 0, 0.15]}>
        <dodecahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial
          color="#081c10"
          emissive="#4ade80"
          emissiveIntensity={0.8}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* Emitter Point Light */}
      <pointLight position={[0, 0, 0.2]} color="#4ade80" intensity={1.8} distance={3} />

      {/* 03. RADIATING PULSE RINGS */}
      <mesh ref={ring1Ref} position={[0, 0, 0.2]}>
        <torusGeometry args={[0.45, 0.008, 8, 32]} />
        <meshBasicMaterial color="#86efac" opacity={0.4} transparent />
      </mesh>

      <mesh ref={ring2Ref} position={[0, 0, 0.2]}>
        <torusGeometry args={[0.45, 0.008, 8, 32]} />
        <meshBasicMaterial color="#4ade80" opacity={0.3} transparent />
      </mesh>

      <mesh ref={ring3Ref} position={[0, 0, 0.2]}>
        <torusGeometry args={[0.45, 0.008, 8, 32]} />
        <meshBasicMaterial color="#22c55e" opacity={0.2} transparent />
      </mesh>

      {/* 04. TRANSMISSION LABELS */}
      <Text
        position={[0, 0.82, 0.1]}
        fontSize={0.065}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {"TRANSMISSION STATION"}
      </Text>

      <Text
        position={[0, 0.71, 0.1]}
        fontSize={0.038}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"STATUS: ACTIVE // DISPATCH READY"}
      </Text>

      <Text
        position={[0, -0.92, 0.1]}
        fontSize={0.032}
        color="#86efac"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"gowthamsengodan7@gmail.com"}
      </Text>
    </group>
  );
}
