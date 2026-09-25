"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";
import { SmartHomeFloorPlan } from "./jev/SmartHomeFloorPlan";
import { DeviceNodes } from "./jev/DeviceNodes";
import { IntentNode } from "./jev/IntentNode";
import { ContextConditioningNode } from "./jev/ContextConditioningNode";
import { JevDecisionCore } from "./jev/JevDecisionCore";
import { ProbabilityNode } from "./jev/ProbabilityNode";
import { PolicyAndRedundancyGate } from "./jev/PolicyAndRedundancyGate";
import { SimulationEngineNode } from "./jev/SimulationEngineNode";
import { ProviderNeutralNode } from "./jev/ProviderNeutralNode";
import { EvaluationLabNode } from "./jev/EvaluationLabNode";
import { JevTelemetry } from "./jev/JevTelemetry";

interface StoryJevObjectProps {
  progress: number;
  range?: [number, number];
  anchorX?: number;
}

export function StoryJevObject({
  progress,
  range = [0.4067, 0.44],
  anchorX = -0.85,
}: StoryJevObjectProps) {
  const groupRef = useRef<THREE.Group>(null);

  const [startP, endP] = range;
  const dur = endP - startP;
  const approachEnd = startP + dur * 0.24;
  const dwellEnd = startP + dur * 0.78;

  // Normalized internal sub-progress [0..1] across the HomeMind / Jev narrative
  const rawSubP = (progress - startP) / dur;
  const subProgress = Math.max(0, Math.min(1, rawSubP));

  useFrame(({ pointer }, delta) => {
    if (!groupRef.current) return;

    let targetZ = -14.0;
    let targetX = anchorX;
    let targetY = 0.85;
    let targetScale = 0.35;
    let opacity = 0.0;

    if (progress >= startP && progress < approachEnd) {
      // 01. Approach from deep Z space
      const t = smoothStep((progress - startP) / (approachEnd - startP));
      targetZ = -12.0 + (0.5 - -12.0) * t;
      targetX = anchorX;
      targetY = 0.85;
      targetScale = 0.4 + 0.65 * t;
      opacity = t;
    } else if (progress >= approachEnd && progress <= dwellEnd) {
      // 02. Dominant focal dwell phase
      const t = smoothStep((progress - approachEnd) / (dwellEnd - approachEnd));
      targetZ = 0.5 + 0.25 * t;
      targetX = anchorX;
      targetY = 0.85;
      targetScale = 1.05;
      opacity = 1.0;
    } else if (progress > dwellEnd && progress <= endP) {
      // 03. Graceful exit forward past camera
      const t = smoothStep((progress - dwellEnd) / (endP - dwellEnd));
      targetZ = 0.75 + (5.5 - 0.75) * t;
      targetX = anchorX - 0.7 * t;
      targetY = 0.85 + 0.25 * t;
      targetScale = 1.05 + 0.35 * t;
      opacity = Math.max(0, 1.0 - t * 1.3);
    } else {
      opacity = 0;
      targetZ = progress < startP ? -16 : 8;
    }

    // Subtle restrained mouse parallax
    const parallaxX = pointer.x * 0.08;
    const parallaxY = -pointer.y * 0.05;

    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      targetZ,
      3.8,
      delta
    );
    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      targetX + parallaxX,
      3.8,
      delta
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY + parallaxY,
      3.8,
      delta
    );

    const curScale = groupRef.current.scale.x;
    const nextScale = THREE.MathUtils.damp(curScale, targetScale, 3.8, delta);
    groupRef.current.scale.set(nextScale, nextScale, nextScale);

    // Visibility toggle to avoid wasting GPU cycles when offscreen
    groupRef.current.visible = progress >= startP - 0.02 && progress <= endP + 0.02;
  });

  return (
    <group ref={groupRef} position={[anchorX, 0.85, -14]} visible={false}>
      {/* Studio Lighting in Cyan & Violet Aesthetic */}
      <spotLight
        position={[0, 4.2, 2.5]}
        intensity={2.8}
        color="#ffffff"
        angle={0.8}
        penumbra={0.6}
        castShadow
      />
      <pointLight position={[-1.8, 1.2, 0.8]} intensity={1.8} color="#06b6d4" distance={5.2} />
      <pointLight position={[1.8, 1.2, 0.8]} intensity={1.8} color="#a855f7" distance={5.2} />
      <pointLight position={[0, -0.2, 1.2]} intensity={1.2} color="#10b981" distance={3.8} />

      {/* 01. Telemetry HUD Ribbon */}
      <JevTelemetry subProgress={subProgress} />

      {/* 02. Virtual Smart Home Floor Plan (5 Simulated Rooms) */}
      <SmartHomeFloorPlan subProgress={subProgress} />

      {/* 03. 18 Virtual Smart Device Nodes & Status Glyphs */}
      <DeviceNodes subProgress={subProgress} />

      {/* 04. Natural Language User Intent ("I'm going to sleep") */}
      <IntentNode subProgress={subProgress} />

      {/* 05. Context Conditioning & State Ingest Packet */}
      <ContextConditioningNode subProgress={subProgress} />

      {/* 06. Central Jev Decision Core (System One API POST /v1/systemone) */}
      <JevDecisionCore subProgress={subProgress} />

      {/* 07. Structured Probabilities (Noul & Choice Primitives) */}
      <ProbabilityNode subProgress={subProgress} />

      {/* 08. Deterministic Policy Dispatch & Redundancy Filter Gate */}
      <PolicyAndRedundancyGate subProgress={subProgress} />

      {/* 09. In-Memory Virtual Simulation Engine & Boundary Validation */}
      <SimulationEngineNode subProgress={subProgress} />

      {/* 10. Provider-Neutral Architecture Contract */}
      <ProviderNeutralNode subProgress={subProgress} />

      {/* 11. Controlled Evaluation Lab (36 Scenarios / 7 Categories, Vitest 181 Tests) */}
      <EvaluationLabNode subProgress={subProgress} />
    </group>
  );
}
