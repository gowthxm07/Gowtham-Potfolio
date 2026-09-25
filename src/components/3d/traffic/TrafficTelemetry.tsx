"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface TrafficTelemetryProps {
  subProgress?: number;
}

export function TrafficTelemetry({ subProgress = 0 }: TrafficTelemetryProps) {
  const panelRef = useRef<THREE.Group>(null);
  const pulseDotRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (pulseDotRef.current) {
      const mat = pulseDotRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 4) * 0.5;
      }
    }
    if (panelRef.current) {
      panelRef.current.position.y = 0.72 + Math.sin(state.clock.elapsedTime * 1.2) * 0.02;
    }
  });

  return (
    <group ref={panelRef} position={[-0.95, 0.72, 0.4]} rotation={[-0.05, 0.35, 0]}>
      {/* 01. PANEL GLASS BACKDROP */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.35, 1.2]} />
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
        <edgesGeometry args={[new THREE.PlaneGeometry(1.35, 1.2)]} />
        <lineBasicMaterial color="#22c55e" opacity={0.6} transparent />
      </lineSegments>

      {/* Corner Bracket Accents */}
      {[
        [-0.675, 0.6],
        [0.675, 0.6],
        [-0.675, -0.6],
        [0.675, -0.6],
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
        <mesh ref={pulseDotRef} position={[-0.56, 0.02, 0]}>
          <circleGeometry args={[0.022, 16]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.9} />
        </mesh>

        <Text
          position={[-0.5, 0.02, 0]}
          fontSize={0.052}
          color="#4ade80"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.06}
        >
          {"EDGE CV // OPENCV + YOLOV8"}
        </Text>

        <Text
          position={[0.58, 0.02, 0]}
          fontSize={0.042}
          color="#86efac"
          anchorX="right"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"640x480 @ 30FPS FEED"}
        </Text>

        {/* Separator Line */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[1.18, 0.003, 0.001]} />
          <meshBasicMaterial color="#166534" />
        </mesh>
      </group>

      {/* 03. INFERENCE METRICS GRID */}
      <group position={[0, 0.22, 0.01]}>
        {/* Model Spec */}
        <Text
          position={[-0.58, 0.1, 0]}
          fontSize={0.038}
          color="#86efac"
          anchorX="left"
          anchorY="middle"
        >
          {"DETECTION ENGINE"}
        </Text>
        <Text
          position={[-0.58, 0.04, 0]}
          fontSize={0.048}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
        >
          {"YOLOv8 Nano (yolov8n.pt)"}
        </Text>

        {/* Tracking Spec */}
        <Text
          position={[-0.58, -0.06, 0]}
          fontSize={0.038}
          color="#86efac"
          anchorX="left"
          anchorY="middle"
        >
          {"MULTI-OBJECT TRACKING"}
        </Text>
        <Text
          position={[-0.58, -0.12, 0]}
          fontSize={0.048}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
        >
          {"YOLOv8 Object Tracking (persist=True)"}
        </Text>

        {/* Active Track IDs */}
        <Text
          position={[0.58, 0.1, 0]}
          fontSize={0.038}
          color="#86efac"
          anchorX="right"
          anchorY="middle"
        >
          {"ACTIVE TRACK IDS"}
        </Text>
        <Text
          position={[0.58, 0.04, 0]}
          fontSize={0.048}
          color="#4ade80"
          anchorX="right"
          anchorY="middle"
        >
          {"#01 #02 #04 #05"}
        </Text>

        {/* Cloud Destination */}
        <Text
          position={[0.58, -0.06, 0]}
          fontSize={0.038}
          color="#86efac"
          anchorX="right"
          anchorY="middle"
        >
          {"CLOUD TELEMETRY"}
        </Text>
        <Text
          position={[0.58, -0.12, 0]}
          fontSize={0.048}
          color="#38bdf8"
          anchorX="right"
          anchorY="middle"
        >
          {"Firestore: traffic_logs"}
        </Text>
      </group>

      {/* 04. DENSITY & CLEARANCE STATUS BLOCK */}
      <group position={[0, -0.16, 0.01]}>
        {/* Background container for status */}
        <mesh position={[0, 0, -0.002]}>
          <planeGeometry args={[1.2, 0.28]} />
          <meshBasicMaterial color="#062110" transparent opacity={0.8} />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(1.2, 0.28)]} />
          <lineBasicMaterial color="#22c55e" opacity={0.4} />
        </lineSegments>

        <Text
          position={[-0.54, 0.07, 0]}
          fontSize={0.036}
          color="#86efac"
          anchorX="left"
          anchorY="middle"
        >
          {"10-FRAME ROLLING DENSITY"}
        </Text>
        <Text
          position={[-0.54, -0.02, 0]}
          fontSize={0.062}
          color="#22c55e"
          anchorX="left"
          anchorY="middle"
        >
          {"MEDIUM (5–8/14 VEHICLES)"}
        </Text>

        <Text
          position={[0.54, 0.07, 0]}
          fontSize={0.036}
          color="#86efac"
          anchorX="right"
          anchorY="middle"
        >
          {"DYNAMIC CLEARANCE"}
        </Text>
        <Text
          position={[0.54, -0.02, 0]}
          fontSize={0.062}
          color="#facc15"
          anchorX="right"
          anchorY="middle"
        >
          {"~3.0 SEC"}
        </Text>
      </group>

      {/* 05. SAFETY & COLLISION THRESHOLD MONITOR */}
      <group position={[0, -0.42, 0.01]}>
        <Text
          position={[-0.56, 0.02, 0]}
          fontSize={0.038}
          color="#86efac"
          anchorX="left"
          anchorY="middle"
        >
          {"IOU COLLISION CHECK"}
        </Text>
        <Text
          position={[-0.56, -0.04, 0]}
          fontSize={0.044}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
        >
          {"IOU < 0.50 (NOMINAL / ZERO HAZARD)"}
        </Text>

        <Text
          position={[0.56, 0.02, 0]}
          fontSize={0.038}
          color="#86efac"
          anchorX="right"
          anchorY="middle"
        >
          {"COCO CLASSES"}
        </Text>
        <Text
          position={[0.56, -0.04, 0]}
          fontSize={0.044}
          color="#4ade80"
          anchorX="right"
          anchorY="middle"
        >
          {"CAR • BUS • TRUCK • MOTO"}
        </Text>
      </group>
    </group>
  );
}
