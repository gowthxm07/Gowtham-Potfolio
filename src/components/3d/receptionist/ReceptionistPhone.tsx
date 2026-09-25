"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";

interface ReceptionistPhoneProps {
  subProgress: number; // 0.0 to 1.0 across Receptionist story
}

export function ReceptionistPhone({ subProgress }: ReceptionistPhoneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Phone enters early in the narrative:
  // Enters: 0.0 -> 0.25 (depth -10 -> 0.2)
  // Active/Focus: 0.25 -> 0.70
  // Exit: 0.70 -> 0.95 (moves forward and passes camera)
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    let targetZ = -10.0;
    let targetX = -1.45;
    let targetY = 0.85;
    let targetScale = 0.4;
    let opacity = 0.0;

    if (subProgress < 0.28) {
      // Approach phase from depth
      const t = smoothStep(subProgress / 0.28);
      targetZ = -10.0 + (0.3 - -10.0) * t;
      targetScale = 0.4 + 0.6 * t;
      opacity = t;
    } else if (subProgress >= 0.28 && subProgress <= 0.68) {
      // Active conversation inspection phase
      const t = smoothStep((subProgress - 0.28) / (0.68 - 0.28));
      targetZ = 0.3 + 0.25 * t;
      targetScale = 1.0;
      opacity = 1.0;
    } else if (subProgress > 0.68 && subProgress <= 0.96) {
      // Exit phase: passes camera forward
      const t = smoothStep((subProgress - 0.68) / (0.96 - 0.68));
      targetZ = 0.55 + (4.0 - 0.55) * t;
      targetX = -1.45 - 0.6 * t;
      targetScale = 1.0 + 0.3 * t;
      opacity = Math.max(0, 1.0 - t * 1.3);
    } else {
      opacity = 0;
      targetZ = subProgress <= 0.0 ? -12 : 6;
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

    // Subtle floating rotation with slight inward angle facing the AI Core
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      0.28 + Math.sin(state.clock.elapsedTime * 1.2) * 0.03,
      3.5,
      delta
    );
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      -0.05,
      3.5,
      delta
    );

    // Pulse incoming call ring
    if (ringRef.current) {
      const ringScale = 0.8 + ((state.clock.elapsedTime * 1.5) % 1.0) * 0.7;
      ringRef.current.scale.set(ringScale, ringScale, ringScale);
      const ringMat = ringRef.current.material as THREE.MeshBasicMaterial;
      if (ringMat) {
        ringMat.opacity = Math.max(0, 0.8 - ((state.clock.elapsedTime * 1.5) % 1.0) * 0.8);
      }
    }

    groupRef.current.visible = opacity > 0.01;
  });

  const isCallConnected = subProgress >= 0.22;

  return (
    <group ref={groupRef} position={[-1.45, 0.85, -10]}>
      {/* 01. PHONE CHASSIS (Rounded Titanium Edge) */}
      <mesh receiveShadow castShadow position={[0, 0, -0.015]}>
        <boxGeometry args={[0.62, 1.22, 0.03]} />
        <meshStandardMaterial
          color="#06140b"
          roughness={0.25}
          metalness={0.88}
        />
      </mesh>

      {/* Frame Border Seam Accent */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[0.64, 1.24, 0.01]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* 02. PHONE DISPLAY GLASS */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[0.56, 1.14]} />
        <meshPhysicalMaterial
          color="#030c06"
          roughness={0.12}
          metalness={0.2}
          transmission={0.2}
          opacity={0.92}
          transparent
          reflectivity={0.6}
        />
      </mesh>

      {/* Speaker Ear Notch */}
      <mesh position={[0, 0.52, 0.01]}>
        <boxGeometry args={[0.14, 0.012, 0.004]} />
        <meshBasicMaterial color="#1a3822" />
      </mesh>

      {/* Top Status Header */}
      <Text
        position={[-0.23, 0.47, 0.012]}
        fontSize={0.024}
        color="#86efac"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {"VoIP // 16kHz"}
      </Text>

      <Text
        position={[0.23, 0.47, 0.012]}
        fontSize={0.022}
        color="#22c55e"
        anchorX="right"
        anchorY="middle"
      >
        {"● 5G"}
      </Text>

      {/* Caller Avatar / Pulsing Node */}
      <group position={[0, 0.18, 0.012]}>
        {/* Pulsing Ring */}
        <mesh ref={ringRef} position={[0, 0, -0.001]}>
          <ringGeometry args={[0.12, 0.13, 32]} />
          <meshBasicMaterial color="#4ade80" transparent opacity={0.6} />
        </mesh>

        {/* Center Node Circle */}
        <mesh>
          <circleGeometry args={[0.09, 32]} />
          <meshStandardMaterial
            color="#0b2413"
            emissive="#22c55e"
            emissiveIntensity={0.5}
            roughness={0.2}
          />
        </mesh>

        <Text
          position={[0, 0, 0.005]}
          fontSize={0.034}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"AI"}
        </Text>
      </group>

      {/* Call State Title */}
      <Text
        position={[0, -0.02, 0.012]}
        fontSize={0.038}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"SMART RECEPTIONIST"}
      </Text>

      {/* Call Status Subtitle */}
      <Text
        position={[0, -0.09, 0.012]}
        fontSize={0.026}
        color={isCallConnected ? "#4ade80" : "#86efac"}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {isCallConnected ? "● ACTIVE CONVERSATION" : "CONNECTING CALL..."}
      </Text>

      {/* Real-time Audio Input Badge */}
      <group position={[0, -0.22, 0.012]}>
        <mesh>
          <planeGeometry args={[0.46, 0.12]} />
          <meshBasicMaterial color="#08180e" />
        </mesh>
        <mesh position={[0, 0, 0.001]}>
          <boxGeometry args={[0.46, 0.12, 0.002]} />
          <meshBasicMaterial color="#22c55e" wireframe />
        </mesh>
        <Text
          position={[-0.2, 0.02, 0.005]}
          fontSize={0.022}
          color="#9ca3af"
          anchorX="left"
          anchorY="middle"
        >
          {"VOICE STREAM:"}
        </Text>
        <Text
          position={[-0.2, -0.025, 0.005]}
          fontSize={0.022}
          color="#86efac"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"PCM AUDIO → WHISPER"}
        </Text>
      </group>

      {/* Bottom Home Indicator Bar */}
      <mesh position={[0, -0.48, 0.01]}>
        <boxGeometry args={[0.18, 0.008, 0.002]} />
        <meshBasicMaterial color="#86efac" opacity={0.6} transparent />
      </mesh>
    </group>
  );
}
