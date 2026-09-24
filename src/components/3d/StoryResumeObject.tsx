"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";

interface StoryResumeObjectProps {
  progress: number;
}

export function StoryResumeObject({ progress }: StoryResumeObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);

  // Section 07: Range [0.80, 0.90]
  const startP = 0.78;
  const peakStart = 0.83;
  const peakEnd = 0.88;
  const endP = 0.92;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    let targetZ = -14.0;
    let targetX = -0.75;
    let targetY = 0.85;
    let targetScale = 0.35;
    let opacity = 0.0;

    if (progress >= startP && progress < peakStart) {
      const t = smoothStep((progress - startP) / (peakStart - startP));
      targetZ = -14.0 + (0.4 - -14.0) * t;
      targetScale = 0.5 + 0.5 * t;
      opacity = t;
    } else if (progress >= peakStart && progress <= peakEnd) {
      const t = smoothStep((progress - peakStart) / (peakEnd - peakStart));
      targetZ = 0.4 + 0.25 * t;
      targetScale = 1.0;
      opacity = 1.0;
    } else if (progress > peakEnd && progress <= endP) {
      const t = smoothStep((progress - peakEnd) / (endP - peakEnd));
      targetZ = 0.65 + (5.0 - 0.65) * t;
      targetX = -0.75 - 0.7 * t;
      targetScale = 1.0 + 0.35 * t;
      opacity = Math.max(0, 1.0 - t * 1.3);
    } else {
      opacity = 0;
      targetZ = progress < startP ? -16 : 8;
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

    // Subtle gentle floating tilt
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      0.15 + Math.sin(state.clock.elapsedTime * 0.8) * 0.04,
      3.5,
      delta
    );

    // Animated scanner line moving up and down the document
    if (scanLineRef.current) {
      scanLineRef.current.position.y = Math.sin(state.clock.elapsedTime * 2.0) * 0.85;
    }

    groupRef.current.visible = opacity > 0.01;
  });

  return (
    <group ref={groupRef} position={[-0.75, 0.85, -14]}>
      {/* 01. TITANIUM BACKING FRAME */}
      <mesh position={[0, 0, -0.02]} receiveShadow>
        <boxGeometry args={[1.5, 2.1, 0.03]} />
        <meshStandardMaterial color="#06130a" roughness={0.3} metalness={0.88} />
      </mesh>

      {/* Frame Border Seam */}
      <mesh position={[0, 0, -0.025]}>
        <boxGeometry args={[1.54, 2.14, 0.01]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* 02. HOLOGRAPHIC DOCUMENT SLAB */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1.36, 1.96]} />
        <meshPhysicalMaterial
          color="#041209"
          roughness={0.15}
          metalness={0.2}
          transmission={0.4}
          opacity={0.85}
          transparent
          reflectivity={0.5}
        />
      </mesh>

      {/* 03. SCANNER LINE */}
      <mesh ref={scanLineRef} position={[0, 0, 0.025]}>
        <boxGeometry args={[1.32, 0.015, 0.005]} />
        <meshBasicMaterial color="#4ade80" opacity={0.85} transparent />
      </mesh>

      {/* 04. DOCUMENT HEADER & METADATA */}
      <Text
        position={[-0.56, 0.85, 0.03]}
        fontSize={0.036}
        color="#86efac"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {"DOC // CURRICULUM VITAE"}
      </Text>

      <Text
        position={[0.56, 0.85, 0.03]}
        fontSize={0.032}
        color="#22c55e"
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {"OFFICIAL PDF"}
      </Text>

      <mesh position={[0, 0.77, 0.03]}>
        <boxGeometry args={[1.15, 0.006, 0.002]} />
        <meshBasicMaterial color="#22c55e" opacity={0.5} transparent />
      </mesh>

      {/* 05. PRINCIPAL SUBJECT TEXT */}
      <Text
        position={[-0.56, 0.62, 0.03]}
        fontSize={0.062}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {"GOWTHAM HARI S"}
      </Text>

      <Text
        position={[-0.56, 0.52, 0.03]}
        fontSize={0.034}
        color="#4ade80"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"B.TECH COMPUTER SCIENCE • AMRITA"}
      </Text>

      {/* Structured Document Body Blocks */}
      <group position={[-0.56, 0.28, 0.03]}>
        <Text fontSize={0.034} color="#86efac" anchorX="left" anchorY="middle">
          {"01 // EDUCATION & GPA"}
        </Text>
        <Text position={[0, -0.07, 0]} fontSize={0.028} color="#9ca3af" anchorX="left" anchorY="middle">
          {"Amrita Vishwa Vidhyapeetham • GPA 8.12"}
        </Text>
      </group>

      <group position={[-0.56, 0.02, 0.03]}>
        <Text fontSize={0.034} color="#86efac" anchorX="left" anchorY="middle">
          {"02 // KEY SPECIALIZATIONS"}
        </Text>
        <Text position={[0, -0.07, 0]} fontSize={0.028} color="#9ca3af" anchorX="left" anchorY="middle">
          {"AI / ML • Computer Vision • Full-Stack Systems"}
        </Text>
      </group>

      <group position={[-0.56, -0.24, 0.03]}>
        <Text fontSize={0.034} color="#86efac" anchorX="left" anchorY="middle">
          {"03 // COMPETITIVE STANDING"}
        </Text>
        <Text position={[0, -0.07, 0]} fontSize={0.028} color="#9ca3af" anchorX="left" anchorY="middle">
          {"LeetCode Knight [1868] • 900+ Problems"}
        </Text>
      </group>

      <group position={[-0.56, -0.50, 0.03]}>
        <Text fontSize={0.034} color="#86efac" anchorX="left" anchorY="middle">
          {"04 // LEADERSHIP & AWARDS"}
        </Text>
        <Text position={[0, -0.07, 0]} fontSize={0.028} color="#9ca3af" anchorX="left" anchorY="middle">
          {"GFG Placement Lead • DeltaBuild 2026 Winner"}
        </Text>
      </group>

      {/* Footer Security Badge */}
      <mesh position={[0, -0.76, 0.03]}>
        <boxGeometry args={[1.15, 0.006, 0.002]} />
        <meshBasicMaterial color="#22c55e" opacity={0.5} transparent />
      </mesh>

      <Text
        position={[0, -0.84, 0.03]}
        fontSize={0.028}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"DIGITALLY VERIFIED CREDENTIAL • READY FOR DISPATCH"}
      </Text>
    </group>
  );
}
