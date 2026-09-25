"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface CartoonifierTelemetryProps {
  subProgress: number;
}

export function CartoonifierTelemetry({ subProgress }: CartoonifierTelemetryProps) {
  const panelRef = useRef<THREE.Group>(null);
  const blinkRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (blinkRef.current) {
      const mat = blinkRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 4) * 0.5;
      }
    }
    if (panelRef.current) {
      panelRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 1.3) * 0.015;
    }
  });

  return (
    <group ref={panelRef} position={[-0.98, 0.5, 0.4]} rotation={[-0.05, 0.38, 0]}>
      {/* 01. PANEL GLASS BACKDROP */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.36, 1.22]} />
        <meshPhysicalMaterial
          color="#020804"
          roughness={0.15}
          metalness={0.8}
          transmission={0.4}
          opacity={0.88}
          transparent
          reflectivity={0.6}
        />
      </mesh>

      {/* Outer Border Wireframe */}
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.36, 1.22)]} />
        <lineBasicMaterial color="#22c55e" opacity={0.6} transparent />
      </lineSegments>

      {/* Corner Bracket Accents */}
      {[
        [-0.68, 0.61],
        [0.68, 0.61],
        [-0.68, -0.61],
        [0.68, -0.61],
      ].map(([cx, cy], idx) => (
        <group key={idx} position={[cx, cy, 0.005]}>
          <mesh position={[cx > 0 ? -0.04 : 0.04, 0, 0]}>
            <boxGeometry args={[0.08, 0.012, 0.002]} />
            <meshBasicMaterial color="#4ade80" />
          </mesh>
          <mesh position={[0, cy > 0 ? -0.04 : 0.04, 0]}>
            <boxGeometry args={[0.012, 0.08, 0.002]} />
            <meshBasicMaterial color="#4ade80" />
          </mesh>
        </group>
      ))}

      {/* 02. HEADER BAR */}
      <group position={[0, 0.48, 0.01]}>
        {/* Blinking Live Indicator Dot */}
        <mesh ref={blinkRef} position={[-0.56, 0.02, 0]}>
          <circleGeometry args={[0.022, 16]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.9} />
        </mesh>

        <Text
          position={[-0.5, 0.02, 0]}
          fontSize={0.048}
          color="#4ade80"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.06}
        >
          {"EDGE CV // PRIVACY ENGINE"}
        </Text>

        <Text
          position={[0.58, 0.02, 0]}
          fontSize={0.038}
          color="#86efac"
          anchorX="right"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"LOCAL CPU EXECUTION"}
        </Text>

        {/* Separator Line */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[1.2, 0.003, 0.001]} />
          <meshBasicMaterial color="#166534" />
        </mesh>
      </group>

      {/* 03. CORE PIPELINE SPECS */}
      <group position={[0, 0.23, 0.01]}>
        <Text
          position={[-0.58, 0.1, 0]}
          fontSize={0.036}
          color="#86efac"
          anchorX="left"
          anchorY="middle"
        >
          {"PIPELINE ARCHITECTURE"}
        </Text>
        <Text
          position={[-0.58, 0.04, 0]}
          fontSize={0.046}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
        >
          {"Deterministic OpenCV 4.x"}
        </Text>

        <Text
          position={[-0.58, -0.06, 0]}
          fontSize={0.036}
          color="#86efac"
          anchorX="left"
          anchorY="middle"
        >
          {"FACE PRIVACY ANONYMIZATION"}
        </Text>
        <Text
          position={[-0.58, -0.12, 0]}
          fontSize={0.046}
          color="#4ade80"
          anchorX="left"
          anchorY="middle"
        >
          {"Haar Cascade + 51×51 Gaussian Blur"}
        </Text>

        {/* Identity Risk Status Badge */}
        <Text
          position={[0.58, 0.1, 0]}
          fontSize={0.036}
          color="#86efac"
          anchorX="right"
          anchorY="middle"
        >
          {"IDENTITY RISK STATUS"}
        </Text>
        <Text
          position={[0.58, 0.04, 0]}
          fontSize={0.046}
          color="#22c55e"
          anchorX="right"
          anchorY="middle"
        >
          {"LOW / ANONYMIZED"}
        </Text>

        {/* Temporal Motion Analysis */}
        <Text
          position={[0.58, -0.06, 0]}
          fontSize={0.036}
          color="#86efac"
          anchorX="right"
          anchorY="middle"
        >
          {"TEMPORAL MOTION MODEL"}
        </Text>
        <Text
          position={[0.58, -0.12, 0]}
          fontSize={0.046}
          color="#38bdf8"
          anchorX="right"
          anchorY="middle"
        >
          {"MOG2 (500 Frame History)"}
        </Text>
      </group>

      {/* 04. VERIFIED BENCHMARK METRICS CONTAINER */}
      <group position={[0, -0.16, 0.01]}>
        <mesh position={[0, 0, -0.002]}>
          <planeGeometry args={[1.22, 0.28]} />
          <meshBasicMaterial color="#062110" transparent opacity={0.82} />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(1.22, 0.28)]} />
          <lineBasicMaterial color="#22c55e" opacity={0.4} />
        </lineSegments>

        {/* JPEG Payload reduction */}
        <Text
          position={[-0.55, 0.07, 0]}
          fontSize={0.034}
          color="#86efac"
          anchorX="left"
          anchorY="middle"
        >
          {"JPEG PAYLOAD"}
        </Text>
        <Text
          position={[-0.55, -0.02, 0]}
          fontSize={0.062}
          color="#22c55e"
          anchorX="left"
          anchorY="middle"
        >
          {"-65.1%"}
        </Text>
        <Text
          position={[-0.55, -0.09, 0]}
          fontSize={0.028}
          color="#a7f3d0"
          anchorX="left"
          anchorY="middle"
        >
          {"BANDWIDTH SAVED"}
        </Text>

        {/* Canny complexity speedup */}
        <Text
          position={[0, 0.07, 0]}
          fontSize={0.034}
          color="#86efac"
          anchorX="center"
          anchorY="middle"
        >
          {"CANNY COMPLEXITY"}
        </Text>
        <Text
          position={[0, -0.02, 0]}
          fontSize={0.062}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
        >
          {"+78.3%"}
        </Text>
        <Text
          position={[0, -0.09, 0]}
          fontSize={0.028}
          color="#bae6fd"
          anchorX="center"
          anchorY="middle"
        >
          {"EXECUTION SPEEDUP"}
        </Text>

        {/* Downstream CNN Accuracy */}
        <Text
          position={[0.55, 0.07, 0]}
          fontSize={0.034}
          color="#86efac"
          anchorX="right"
          anchorY="middle"
        >
          {"DOWNSTREAM CNN"}
        </Text>
        <Text
          position={[0.55, -0.02, 0]}
          fontSize={0.062}
          color="#facc15"
          anchorX="right"
          anchorY="middle"
        >
          {"98.3%"}
        </Text>
        <Text
          position={[0.55, -0.09, 0]}
          fontSize={0.028}
          color="#fef08a"
          anchorX="right"
          anchorY="middle"
        >
          {"ACCURACY RETAINED"}
        </Text>
      </group>

      {/* 05. OPERATIONAL PROFILES FOOTER */}
      <group position={[0, -0.44, 0.01]}>
        <Text
          position={[-0.58, 0.02, 0]}
          fontSize={0.034}
          color="#86efac"
          anchorX="left"
          anchorY="middle"
        >
          {"HARDWARE PROFILES"}
        </Text>
        <Text
          position={[-0.58, -0.04, 0]}
          fontSize={0.042}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
        >
          {"STANDARD (480p) • EDGE (240p) • IoT (120p)"}
        </Text>

        <Text
          position={[0.58, 0.02, 0]}
          fontSize={0.034}
          color="#86efac"
          anchorX="right"
          anchorY="middle"
        >
          {"OUTPUT PROTOCOL"}
        </Text>
        <Text
          position={[0.58, -0.04, 0]}
          fontSize={0.042}
          color="#4ade80"
          anchorX="right"
          anchorY="middle"
        >
          {"MJPEG STREAM // HTTP 5000"}
        </Text>
      </group>
    </group>
  );
}
