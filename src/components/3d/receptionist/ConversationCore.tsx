"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";

interface ConversationCoreProps {
  subProgress: number;
}

export function ConversationCore({ subProgress }: ConversationCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Core is the primary visual anchor: enters at 0.15, dominant 0.28 -> 0.75, exits 0.75 -> 0.98
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Subtle rotational dynamics
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.4;
      outerRingRef.current.rotation.x += delta * 0.2;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y -= delta * 0.5;
      innerRingRef.current.rotation.z += delta * 0.25;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.7;
      coreRef.current.rotation.x += delta * 0.35;
    }
  });

  const nodes = [
    { title: "INTENT ROUTING", subtitle: "Dialogue Manager", pos: [-0.68, 0.45, 0] as [number, number, number], color: "#4ade80" },
    { title: "LOCAL RUNTIME", subtitle: "Ollama llama3.2:3b", pos: [0.68, 0.45, 0] as [number, number, number], color: "#22c55e" },
    { title: "SESSION CONTEXT", subtitle: "Isolated Buffer", pos: [-0.62, -0.45, 0] as [number, number, number], color: "#86efac" },
    { title: "VOICE SYNTHESIS", subtitle: "Piper TTS Output", pos: [0.62, -0.45, 0] as [number, number, number], color: "#10b981" },
  ];

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 01. OUTER TECHNICAL GIMBAL RING */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[0.92, 0.024, 16, 64]} />
        <meshStandardMaterial
          color="#0a1a0f"
          emissive="#22c55e"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.88}
        />
      </mesh>

      {/* 02. SECONDARY GYROSCOPIC RING */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 3, 0, Math.PI / 4]}>
        <torusGeometry args={[0.74, 0.018, 16, 48]} />
        <meshStandardMaterial
          color="#08140c"
          emissive="#4ade80"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>

      {/* 03. CENTRAL GEOMETRIC PROCESSING CORE */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial
          color="#040e07"
          emissive="#22c55e"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.9}
          wireframe
        />
      </mesh>

      {/* Internal Crystalline Core */}
      <mesh>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          color="#0d2915"
          emissive="#86efac"
          emissiveIntensity={0.65}
          roughness={0.15}
          metalness={0.8}
        />
      </mesh>

      {/* Core Center Typography */}
      <Text
        position={[0, 0.03, 0.28]}
        fontSize={0.052}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"AI CORE"}
      </Text>
      <Text
        position={[0, -0.05, 0.28]}
        fontSize={0.026}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {"OLLAMA // llama3.2:3b"}
      </Text>

      {/* 04. PERIPHERAL CONVERSATION NODES */}
      {nodes.map((node, i) => (
        <group key={i} position={node.pos}>
          {/* Connector Beam into Core */}
          <line>
            <bufferGeometry
              attach="geometry"
              onUpdate={(geo) => {
                const points = [
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(-node.pos[0] * 0.7, -node.pos[1] * 0.7, 0),
                ];
                geo.setFromPoints(points);
              }}
            />
            <lineBasicMaterial attach="material" color={node.color} opacity={0.35} transparent />
          </line>

          {/* Node Orbit Sphere */}
          <mesh>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.7}
              roughness={0.2}
            />
          </mesh>

          {/* Node Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.1, 0.006, 8, 24]} />
            <meshBasicMaterial color="#86efac" opacity={0.4} transparent />
          </mesh>

          {/* Node Label */}
          <Text
            position={[0, 0.14, 0]}
            fontSize={0.034}
            color="#ffffff"
            anchorX="center"
            anchorY="bottom"
            letterSpacing={0.04}
          >
            {node.title}
          </Text>
          <Text
            position={[0, 0.1, 0]}
            fontSize={0.024}
            color={node.color}
            anchorX="center"
            anchorY="top"
          >
            {node.subtitle}
          </Text>
        </group>
      ))}
    </group>
  );
}
