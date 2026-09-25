"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface LaborLinkTelemetryProps {
  subProgress: number;
}

export function LaborLinkTelemetry({ subProgress }: LaborLinkTelemetryProps) {
  const panelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (panelRef.current) {
      panelRef.current.position.y = 0.95 + Math.sin(state.clock.elapsedTime * 1.4) * 0.015;
    }
  });

  return (
    <group ref={panelRef} position={[-2.1, 0.95, 0.15]} rotation={[0.04, 0.35, 0]}>
      {/* Telemetry Header */}
      <Text
        position={[0, 0.44, 0]}
        fontSize={0.038}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"SYSTEM TELEMETRY // VERIFIED METRICS"}
      </Text>
      <Text
        position={[0, 0.38, 0]}
        fontSize={0.022}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        {"AUDITED REPOSITORY BENCHMARKS & JEST QA"}
      </Text>

      {/* Main Glass Chassis */}
      <mesh position={[0, 0.04, -0.01]}>
        <boxGeometry args={[0.76, 0.58, 0.02]} />
        <meshStandardMaterial color="#030d07" roughness={0.7} metalness={0.7} />
      </mesh>
      <lineSegments position={[0, 0.04, -0.01]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.76, 0.58, 0.02)]} />
        <lineBasicMaterial color="#22c55e" opacity={0.7} />
      </lineSegments>

      {/* Metric 01: Client-Side Scoring Latency */}
      <group position={[0, 0.22, 0.01]}>
        <Text
          position={[-0.34, 0.03, 0]}
          fontSize={0.018}
          color="#86efac"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"DETERMINISTIC MATCH ENGINE"}
        </Text>
        <Text
          position={[-0.34, -0.015, 0]}
          fontSize={0.032}
          color="#e2e8f0"
          anchorX="left"
          anchorY="middle"
        >
          {"< 5 ms CLIENT TIME"}
        </Text>
        <Text
          position={[0.34, -0.015, 0]}
          fontSize={0.016}
          color="#94a3b8"
          anchorX="right"
          anchorY="middle"
        >
          {"STANDARD BATCH"}
        </Text>
      </group>

      {/* Metric 02: API Abort Timeout Guard */}
      <group position={[0, 0.09, 0.01]}>
        <Text
          position={[-0.34, 0.03, 0]}
          fontSize={0.018}
          color="#38bdf8"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"GEMINI TIMEOUT GUARD"}
        </Text>
        <Text
          position={[-0.34, -0.015, 0]}
          fontSize={0.03}
          color="#e2e8f0"
          anchorX="left"
          anchorY="middle"
        >
          {"15 s ABORT TIMEOUT"}
        </Text>
        <Text
          position={[0.34, -0.015, 0]}
          fontSize={0.016}
          color="#94a3b8"
          anchorX="right"
          anchorY="middle"
        >
          {"SAFETY CUTOFF"}
        </Text>
      </group>

      {/* Metric 03: Automated Jest Quality Assurance */}
      <group position={[0, -0.04, 0.01]}>
        <Text
          position={[-0.34, 0.03, 0]}
          fontSize={0.018}
          color="#fbbf24"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {"JEST TEST SUITE"}
        </Text>
        <Text
          position={[-0.34, -0.015, 0]}
          fontSize={0.03}
          color="#e2e8f0"
          anchorX="left"
          anchorY="middle"
        >
          {"15 AUTOMATED TESTS"}
        </Text>
        <Text
          position={[0.34, -0.015, 0]}
          fontSize={0.016}
          color="#94a3b8"
          anchorX="right"
          anchorY="middle"
        >
          {"100% SUITE PASS"}
        </Text>
      </group>

      {/* Coverage Areas List */}
      <group position={[0, -0.16, 0.01]}>
        <Text
          position={[0, 0.02, 0]}
          fontSize={0.016}
          color="#86efac"
          anchorX="center"
          anchorY="middle"
        >
          {"• MATCHING • RANKING • AUTH • FALLBACK • FAIRNESS"}
        </Text>
        <Text
          position={[0, -0.02, 0]}
          fontSize={0.015}
          color="#64748b"
          anchorX="center"
          anchorY="middle"
        >
          {"PROTECTED ATTRIBUTES EXCLUDED FROM ALL SCORES"}
        </Text>
      </group>
    </group>
  );
}
