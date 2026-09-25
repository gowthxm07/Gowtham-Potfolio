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
  const approachEnd = startP + dur * 0.14;
  const dwellEnd = startP + dur * 0.86;

  // Normalized internal sub-progress [0..1] across the HomeMind / Jev narrative
  const rawSubP = (progress - startP) / dur;
  const subProgress = Math.max(0, Math.min(1, rawSubP));

  useFrame(({ pointer }, delta) => {
    if (!groupRef.current) return;

    // Visibility skip when far out of range
    if ((progress < startP - 0.02 || progress > endP + 0.02) && !groupRef.current.visible) {
      return;
    }

    let targetZ = -2.5;
    let targetX = anchorX;
    let targetY = 0.85;
    let targetScale = 0.88;
    let opacity = 0.0;

    if (progress >= startP && progress < approachEnd) {
      // 01. Calm approach from restrained depth (-2.0 -> 0.15)
      const t = smoothStep((progress - startP) / (approachEnd - startP));
      targetZ = -2.0 + (0.15 - -2.0) * t;
      targetX = anchorX;
      targetY = 0.85;
      targetScale = 0.88 + 0.12 * t;
      opacity = t;
    } else if (progress >= approachEnd && progress <= dwellEnd) {
      // 02. Dominant, rock-solid focal dwell phase (72% of chapter duration)
      targetZ = 0.15;
      targetX = anchorX;
      targetY = 0.85;
      targetScale = 1.0;
      opacity = 1.0;
    } else if (progress > dwellEnd && progress <= endP) {
      // 03. Gentle forward dissolve (0.15 -> 0.55) - no shooting past camera
      const t = smoothStep((progress - dwellEnd) / (endP - dwellEnd));
      targetZ = 0.15 + (0.55 - 0.15) * t;
      targetX = anchorX - 0.15 * t;
      targetY = 0.85 + 0.05 * t;
      targetScale = 1.0 - 0.08 * t;
      opacity = Math.max(0, 1.0 - t);
    } else {
      opacity = 0;
      targetZ = progress < startP ? -3.0 : 1.2;
    }

    // Subtle restrained mouse parallax (only when active)
    const parallaxX = opacity > 0.01 ? pointer.x * 0.05 : 0;
    const parallaxY = opacity > 0.01 ? -pointer.y * 0.03 : 0;

    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      targetZ,
      5.0,
      delta
    );
    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      targetX + parallaxX,
      5.0,
      delta
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY + parallaxY,
      5.0,
      delta
    );

    const curScale = groupRef.current.scale.x;
    const nextScale = THREE.MathUtils.damp(curScale, targetScale, 5.0, delta);
    groupRef.current.scale.set(nextScale, nextScale, nextScale);

    groupRef.current.visible = opacity > 0.005;
  });

  return (
    <group ref={groupRef} position={[anchorX, 0.85, -2.5]} visible={false}>
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
