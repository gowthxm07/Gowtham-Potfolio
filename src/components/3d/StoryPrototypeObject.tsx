"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";

interface StoryPrototypeObjectProps {
  progress: number;
  type: "receptionist" | "traffic";
  range: [number, number];
  anchorX: number;
}

export function StoryPrototypeObject({
  progress,
  type,
  range,
  anchorX,
}: StoryPrototypeObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const [startP, endP] = range;
  const midP = startP + (endP - startP) * 0.45;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    let targetZ = -14.0;
    let targetX = anchorX;
    let targetY = 0.85;
    let targetScale = 0.3;
    let opacity = 0.0;

    if (progress >= startP && progress < midP) {
      // Approach phase: Object enters from deep background towards camera
      const t = smoothStep((progress - startP) / (midP - startP));
      targetZ = -14.0 + (0.6 - -14.0) * t;
      targetX = anchorX;
      targetY = 0.85;
      targetScale = 0.4 + 0.7 * t;
      opacity = t;
    } else if (progress >= midP && progress <= midP + 0.12) {
      // Primary focus phase: Closest to camera and fully legible
      const t = smoothStep((progress - midP) / 0.12);
      targetZ = 0.6 + 0.3 * t;
      targetX = anchorX;
      targetY = 0.85;
      targetScale = 1.1;
      opacity = 1.0;
    } else if (progress > midP + 0.12 && progress <= endP) {
      // Exit phase: Object passes forward past the viewer
      const t = smoothStep((progress - (midP + 0.12)) / (endP - (midP + 0.12)));
      targetZ = 0.9 + (5.0 - 0.9) * t;
      targetX = anchorX + (anchorX > 0 ? 0.8 : -0.8) * t;
      targetY = 0.85 + 0.3 * t;
      targetScale = 1.1 + 0.4 * t;
      opacity = Math.max(0, 1.0 - t * 1.3);
    } else {
      opacity = 0;
      targetZ = progress < startP ? -16 : 8;
    }

    // Physical smooth damping
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

    const currentScale = groupRef.current.scale.x;
    const nextScale = THREE.MathUtils.damp(currentScale, targetScale, 3.8, delta);
    groupRef.current.scale.set(nextScale, nextScale, nextScale);

    // Continuous architectural rotation
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.6;
      ringRef.current.rotation.x += delta * 0.3;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.9;
      coreRef.current.rotation.x += delta * 0.4;
    }

    groupRef.current.visible = opacity > 0.01;
  });

  return (
    <group ref={groupRef} position={[anchorX, 0.85, -14]}>
      {type === "receptionist" ? (
        /* AI Conversational Audio Core (Multi-ring acoustic gimbal) */
        <group>
          {/* Outer Technical Gimbal Ring */}
          <mesh ref={ringRef}>
            <torusGeometry args={[1.2, 0.04, 16, 64]} />
            <meshStandardMaterial
              color="#132a1c"
              emissive="#22c55e"
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.85}
            />
          </mesh>

          {/* Secondary Gyroscopic Ring */}
          <mesh rotation={[Math.PI / 3, 0, Math.PI / 4]}>
            <torusGeometry args={[0.95, 0.03, 16, 48]} />
            <meshStandardMaterial
              color="#0d1f14"
              emissive="#4ade80"
              emissiveIntensity={0.3}
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>

          {/* Central Faceted Acoustic Processing Core */}
          <mesh ref={coreRef}>
            <octahedronGeometry args={[0.55, 1]} />
            <meshStandardMaterial
              color="#06120a"
              emissive="#10b981"
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.9}
              wireframe
            />
          </mesh>

          {/* Inner Glowing Audio Signal Center */}
          <mesh>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshBasicMaterial color="#86efac" />
          </mesh>
        </group>
      ) : (
        /* Computer Vision & Real-Time Traffic Telemetry Spatial Node */
        <group>
          {/* Spatial Bounding Radar Frame */}
          <mesh ref={ringRef}>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial
              color="#0f2619"
              emissive="#22c55e"
              emissiveIntensity={0.35}
              wireframe
            />
          </mesh>

          {/* Central Vision Detection Prismatic Sensor */}
          <mesh ref={coreRef}>
            <dodecahedronGeometry args={[0.65, 0]} />
            <meshStandardMaterial
              color="#05120a"
              emissive="#4ade80"
              emissiveIntensity={0.45}
              roughness={0.15}
              metalness={0.85}
            />
          </mesh>

          {/* Corner Sensor Bracket Accents */}
          {[-0.75, 0.75].map((x) =>
            [-0.75, 0.75].map((y) =>
              [-0.75, 0.75].map((z, idx) => (
                <mesh key={idx} position={[x, y, z]}>
                  <boxGeometry args={[0.08, 0.08, 0.08]} />
                  <meshBasicMaterial color="#86efac" />
                </mesh>
              ))
            )
          )}
        </group>
      )}
    </group>
  );
}
