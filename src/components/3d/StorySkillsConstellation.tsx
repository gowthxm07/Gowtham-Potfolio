"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";

interface StorySkillsConstellationProps {
  progress: number;
}

export function StorySkillsConstellation({ progress }: StorySkillsConstellationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringGroupRef = useRef<THREE.Group>(null);

  // Section 05: Range [0.54, 0.68]
  const startP = 0.52;
  const peakStart = 0.57;
  const peakEnd = 0.65;
  const endP = 0.70;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    let targetZ = -14.0;
    let targetX = -0.85;
    let targetY = 0.85;
    let targetScale = 0.35;
    let opacity = 0.0;

    if (progress >= startP && progress < peakStart) {
      const t = smoothStep((progress - startP) / (peakStart - startP));
      targetZ = -14.0 + (0.5 - -14.0) * t;
      targetScale = 0.5 + 0.5 * t;
      opacity = t;
    } else if (progress >= peakStart && progress <= peakEnd) {
      const t = smoothStep((progress - peakStart) / (peakEnd - peakStart));
      targetZ = 0.5 + 0.25 * t;
      targetScale = 1.0;
      opacity = 1.0;
    } else if (progress > peakEnd && progress <= endP) {
      const t = smoothStep((progress - peakEnd) / (endP - peakEnd));
      targetZ = 0.75 + (5.0 - 0.75) * t;
      targetX = -0.85 - 0.7 * t;
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

    // Continuous orbital dynamics
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.5;
      coreRef.current.rotation.x += delta * 0.25;
    }
    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.z += delta * 0.2;
      ringGroupRef.current.rotation.y += delta * 0.15;
    }

    groupRef.current.visible = opacity > 0.01;
  });

  const domainNodes = [
    { title: "AI / ML & CV", subtitle: "PyTorch • YOLOv8", pos: [0.95, 0.65, 0] as [number, number, number], color: "#4ade80" },
    { title: "LANGUAGES", subtitle: "C++ • Python • TS", pos: [-0.95, 0.55, 0] as [number, number, number], color: "#22c55e" },
    { title: "FULL-STACK", subtitle: "React • Next • Node", pos: [-0.85, -0.65, 0] as [number, number, number], color: "#86efac" },
    { title: "ENGINEERING", subtitle: "Docker • Vitest", pos: [0.9, -0.6, 0] as [number, number, number], color: "#10b981" },
  ];

  return (
    <group ref={groupRef} position={[-0.85, 0.85, -14]}>
      {/* 01. CENTRAL ALGORITHMIC PROBLEM-SOLVING CORE */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.45, 1]} />
        <meshStandardMaterial
          color="#06120a"
          emissive="#22c55e"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
          wireframe
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.2, 20, 20]} />
        <meshBasicMaterial color="#4ade80" />
      </mesh>

      {/* Center Label */}
      <Text
        position={[0, -0.02, 0.25]}
        fontSize={0.065}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {"DSA // CORE"}
      </Text>

      {/* 02. ORBITING RINGS & CONSTELLATION NODES */}
      <group ref={ringGroupRef}>
        {/* Orbital Track 1 */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.3, 0.012, 12, 64]} />
          <meshBasicMaterial color="#22c55e" opacity={0.35} transparent />
        </mesh>

        {/* Orbital Track 2 */}
        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[1.1, 0.01, 12, 64]} />
          <meshBasicMaterial color="#86efac" opacity={0.25} transparent />
        </mesh>
      </group>

      {/* 03. DOMAIN SATELLITE NODES & LASER LINKS */}
      {domainNodes.map((node, i) => (
        <group key={i} position={node.pos}>
          {/* Connector Beam to Origin */}
          <line>
            <bufferGeometry
              attach="geometry"
              onUpdate={(geo) => {
                const points = [
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(-node.pos[0], -node.pos[1], -node.pos[2]),
                ];
                geo.setFromPoints(points);
              }}
            />
            <lineBasicMaterial attach="material" color={node.color} opacity={0.4} transparent />
          </line>

          {/* Node Core */}
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Orbit Pulse Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.14, 0.008, 8, 24]} />
            <meshBasicMaterial color="#86efac" opacity={0.5} transparent />
          </mesh>

          {/* Node Typography Badges */}
          <Text
            position={[0, 0.18, 0]}
            fontSize={0.05}
            color="#ffffff"
            anchorX="center"
            anchorY="bottom"
            letterSpacing={0.06}
          >
            {node.title}
          </Text>

          <Text
            position={[0, 0.13, 0]}
            fontSize={0.034}
            color={node.color}
            anchorX="center"
            anchorY="top"
            letterSpacing={0.04}
          >
            {node.subtitle}
          </Text>
        </group>
      ))}
    </group>
  );
}
