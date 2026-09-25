"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface TrafficBoundingBoxProps {
  dimensions: [number, number, number]; // [width, height, depth]
  trackId: string;
  classNameLabel: string;
  confidence: number;
  color?: string;
  iouAlert?: boolean;
}

export function TrafficBoundingBox({
  dimensions,
  trackId,
  classNameLabel,
  confidence,
  color = "#22c55e",
  iouAlert = false,
}: TrafficBoundingBoxProps) {
  const [w, h, d] = dimensions;
  const halfW = w / 2;
  const halfH = h / 2;
  const halfD = d / 2;

  const boxColor = iouAlert ? "#ef4444" : color;
  const tagBg = iouAlert ? "#7f1d1d" : "#062812";

  // Pulse animation for detection box
  const boxMeshRef = useRef<THREE.LineSegments>(null);
  useFrame((state) => {
    if (boxMeshRef.current) {
      const mat = boxMeshRef.current.material as THREE.LineBasicMaterial;
      if (mat) {
        mat.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 6) * 0.2;
      }
    }
  });

  // Corner bracket lengths
  const bracketL = Math.min(w, h, d) * 0.35;

  return (
    <group position={[0, halfH, 0]}>
      {/* 01. 3D WIREFRAME BOUNDING BOX */}
      <lineSegments ref={boxMeshRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(w, h, d)]} />
        <lineBasicMaterial color={boxColor} transparent opacity={0.65} />
      </lineSegments>

      {/* 02. CORNER BRACKET EMPHASIS ACCENTS */}
      {[
        [-1, -1, -1],
        [-1, -1, 1],
        [-1, 1, -1],
        [-1, 1, 1],
        [1, -1, -1],
        [1, -1, 1],
        [1, 1, -1],
        [1, 1, 1],
      ].map(([cx, cy, cz], idx) => (
        <group key={idx} position={[cx * halfW, cy * halfH, cz * halfD]}>
          {/* X arm */}
          <mesh position={[-cx * (bracketL / 2), 0, 0]}>
            <boxGeometry args={[bracketL, 0.015, 0.015]} />
            <meshBasicMaterial color={boxColor} />
          </mesh>
          {/* Y arm */}
          <mesh position={[0, -cy * (bracketL / 2), 0]}>
            <boxGeometry args={[0.015, bracketL, 0.015]} />
            <meshBasicMaterial color={boxColor} />
          </mesh>
          {/* Z arm */}
          <mesh position={[0, 0, -cz * (bracketL / 2)]}>
            <boxGeometry args={[0.015, 0.015, bracketL]} />
            <meshBasicMaterial color={boxColor} />
          </mesh>
        </group>
      ))}

      {/* 03. CENTROID TRACKING RETICLE */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshBasicMaterial color={boxColor} />
      </mesh>

      {/* 04. FORWARD VELOCITY VECTOR ARROW */}
      <mesh position={[0, 0, -halfD - 0.15]}>
        <coneGeometry args={[0.035, 0.12, 12]} />
        <meshBasicMaterial color={boxColor} />
      </mesh>
      <mesh position={[0, 0, -halfD - 0.05]}>
        <cylinderGeometry args={[0.008, 0.008, 0.1, 8]} />
        <meshBasicMaterial color={boxColor} />
      </mesh>

      {/* 05. GROUND FOOTPRINT PROJECTION */}
      <mesh position={[0, -halfH + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w * 1.05, d * 1.05]} />
        <meshBasicMaterial color={boxColor} transparent opacity={0.12} />
      </mesh>

      {/* 06. HUD CLASSIFICATION & TRACK ID LABEL BADGE */}
      <group position={[0, halfH + 0.12, 0]} rotation={[-0.15, 0, 0]}>
        {/* Background plate */}
        <mesh position={[0, 0, -0.005]}>
          <planeGeometry args={[0.58, 0.14]} />
          <meshBasicMaterial color={tagBg} transparent opacity={0.92} />
        </mesh>
        {/* Outer border */}
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(0.58, 0.14)]} />
          <lineBasicMaterial color={boxColor} />
        </lineSegments>
        {/* Text */}
        <Text
          position={[0, 0.01, 0.01]}
          fontSize={0.058}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {`${classNameLabel.toUpperCase()} #${trackId} ${(confidence * 100).toFixed(0)}%`}
        </Text>
      </group>
    </group>
  );
}
