"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface PrivacyFaceNodeProps {
  subProgress: number;
}

export function PrivacyFaceNode({ subProgress }: PrivacyFaceNodeProps) {
  const reticleRef = useRef<THREE.Group>(null);
  const blurBoxRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reticleRef.current) {
      reticleRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 1.8) * 0.02;
    }
    if (blurBoxRef.current) {
      const mat = blurBoxRef.current.material as THREE.MeshPhysicalMaterial;
      if (mat) {
        mat.opacity = 0.75 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
      }
    }
  });

  return (
    <group position={[-0.85, 0.45, -1.1]} rotation={[0.05, 0.32, 0]}>
      {/* Branch Title Ribbon */}
      <Text
        position={[0, 0.62, 0]}
        fontSize={0.046}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"PRIVACY PATH // FACE ANONYMIZATION"}
      </Text>

      {/* 01. HAAR CASCADE DETECTION RETICLE */}
      <group ref={reticleRef} position={[0, 0.1, 0]}>
        {/* Detection Wireframe Bounding Box */}
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.72, 0.82, 0.12)]} />
          <lineBasicMaterial color="#22c55e" opacity={0.8} />
        </lineSegments>

        {/* 8 Corner Brackets */}
        {[
          [-0.36, 0.41],
          [0.36, 0.41],
          [-0.36, -0.41],
          [0.36, -0.41],
        ].map(([cx, cy], idx) => (
          <group key={idx} position={[cx, cy, 0.06]}>
            <mesh position={[cx > 0 ? -0.04 : 0.04, 0, 0]}>
              <boxGeometry args={[0.08, 0.015, 0.002]} />
              <meshBasicMaterial color="#86efac" />
            </mesh>
            <mesh position={[0, cy > 0 ? -0.04 : 0.04, 0]}>
              <boxGeometry args={[0.015, 0.08, 0.002]} />
              <meshBasicMaterial color="#86efac" />
            </mesh>
          </group>
        ))}

        {/* 02. ABSTRACT GEOMETRIC HUMAN FACE SILHOUETTE */}
        <group position={[0, 0.02, -0.02]}>
          {/* Head Oval Contour */}
          <mesh position={[0, 0, 0]}>
            <ringGeometry args={[0.24, 0.255, 32]} />
            <meshBasicMaterial color="#166534" opacity={0.65} transparent />
          </mesh>
          {/* Geometric Eye Lines */}
          <mesh position={[-0.09, 0.06, 0]}>
            <boxGeometry args={[0.07, 0.01, 0.001]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>
          <mesh position={[0.09, 0.06, 0]}>
            <boxGeometry args={[0.07, 0.01, 0.001]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>
          {/* Nose Center Bridge */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.01, 0.06, 0.001]} />
            <meshBasicMaterial color="#166534" />
          </mesh>
          {/* Mouth Line */}
          <mesh position={[0, -0.08, 0]}>
            <boxGeometry args={[0.1, 0.01, 0.001]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>
        </group>

        {/* 03. LOCALIZED FROSTED GAUSSIAN BLUR SHIELD (51x51 MOSAIC) */}
        <mesh ref={blurBoxRef} position={[0, 0.02, 0.02]}>
          <planeGeometry args={[0.54, 0.62]} />
          <meshPhysicalMaterial
            color="#064e3b"
            roughness={0.8}
            metalness={0.1}
            transmission={0.85}
            transparent
            opacity={0.85}
            reflectivity={0.3}
          />
        </mesh>

        {/* Micro Frosted Pixelation Grid overlaying the blur region */}
        {[-0.18, -0.06, 0.06, 0.18].map((px, i) =>
          [-0.2, -0.07, 0.07, 0.2].map((py, j) => (
            <mesh key={`${i}-${j}`} position={[px, py + 0.02, 0.025]}>
              <planeGeometry args={[0.1, 0.11]} />
              <meshBasicMaterial
                color="#22c55e"
                transparent
                opacity={0.12 + ((i + j) % 2) * 0.1}
              />
            </mesh>
          ))
        )}

        {/* Centroid Reticle Crosshair */}
        <group position={[0, 0.02, 0.03]}>
          <mesh position={[0, 0, 0]}>
            <ringGeometry args={[0.03, 0.036, 16]} />
            <meshBasicMaterial color="#86efac" />
          </mesh>
        </group>
      </group>

      {/* 04. TECHNICAL ANNOTATION LABEL */}
      <group position={[0, -0.44, 0]}>
        <Text
          position={[0, 0.08, 0]}
          fontSize={0.038}
          color="#86efac"
          anchorX="center"
          anchorY="middle"
        >
          {"HAAR CASCADE + GAUSSIAN BLUR"}
        </Text>
        <Text
          position={[0, 0.01, 0]}
          fontSize={0.034}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {"51×51 KERNEL (σ=30)"}
        </Text>
        <Text
          position={[0, -0.06, 0]}
          fontSize={0.032}
          color="#4ade80"
          anchorX="center"
          anchorY="middle"
        >
          {"IDENTITY RISK: LOW / ANONYMIZED"}
        </Text>
      </group>
    </group>
  );
}
