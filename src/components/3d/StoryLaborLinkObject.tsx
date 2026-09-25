"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";
import { WorkerNode } from "./laborlink/WorkerNode";
import { WorkerProfileStream } from "./laborlink/WorkerProfileStream";
import { FactoryNode } from "./laborlink/FactoryNode";
import { VacancyStream } from "./laborlink/VacancyStream";
import { MatchingCore } from "./laborlink/MatchingCore";
import { FairnessFilter } from "./laborlink/FairnessFilter";
import { GeminiReasoningNode } from "./laborlink/GeminiReasoningNode";
import { MatchResultNode } from "./laborlink/MatchResultNode";
import { AcceptanceNode } from "./laborlink/AcceptanceNode";
import { ContactUnlockNode } from "./laborlink/ContactUnlockNode";
import { FirestoreNode } from "./laborlink/FirestoreNode";
import { AuthNode } from "./laborlink/AuthNode";
import { ReputationLoop } from "./laborlink/ReputationLoop";
import { FinalCommunicationBridge } from "./laborlink/FinalCommunicationBridge";
import { LaborLinkTelemetry } from "./laborlink/LaborLinkTelemetry";

interface StoryLaborLinkObjectProps {
  progress: number;
  range?: [number, number];
  anchorX?: number;
}

export function StoryLaborLinkObject({
  progress,
  range = [0.39, 0.44],
  anchorX = -0.85,
}: StoryLaborLinkObjectProps) {
  const groupRef = useRef<THREE.Group>(null);

  const [startP, endP] = range;
  const dur = endP - startP;
  const approachEnd = startP + dur * 0.14;
  const dwellEnd = startP + dur * 0.86;

  // Normalized internal sub-progress [0..1] across the LaborLink narrative
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
      {/* Lighting for Industrial Marketplace Scene */}
      <spotLight
        position={[0, 4.2, 2.5]}
        intensity={2.6}
        color="#86efac"
        angle={0.8}
        penumbra={0.6}
        castShadow
      />
      <pointLight position={[-1.8, 1.2, 0.8]} intensity={1.6} color="#4ade80" distance={5.2} />
      <pointLight position={[1.8, 1.2, 0.8]} intensity={1.6} color="#38bdf8" distance={5.2} />

      {/* 01. Left Region: Industrial Worker Avatar & Verified Trade Skills */}
      <WorkerNode subProgress={subProgress} />

      {/* 02. Worker Data Stream: Moving packets toward center */}
      <WorkerProfileStream subProgress={subProgress} />

      {/* 03. Right Region: Factory / Textile Mill Infrastructure & Open Vacancy */}
      <FactoryNode subProgress={subProgress} />

      {/* 04. Vacancy Data Stream: Moving packets toward center */}
      <VacancyStream subProgress={subProgress} />

      {/* 05. Primary Center Focal Point: LaborLink Matching Core & Rotating Weighted Rings */}
      <MatchingCore subProgress={subProgress} />

      {/* 06. Fairness Gate: Protected Attribute Sanitization Barrier */}
      <FairnessFilter subProgress={subProgress} />

      {/* 07. Secondary Intelligence Module: Gemini 2.5 Flash Reasoning & Fallback Guard */}
      <GeminiReasoningNode subProgress={subProgress} />

      {/* 08. Central Compatibility Match Score (Deterministic calculation & bounds) */}
      <MatchResultNode subProgress={subProgress} />

      {/* 09. Mutual Acceptance Mechanism (Express Interest ↔ Accept Application) */}
      <AcceptanceNode subProgress={subProgress} />

      {/* 10. Privacy-Preserving Locked Contact Bridge (Unlocks upon acceptance) */}
      <ContactUnlockNode subProgress={subProgress} />

      {/* 11. Base Storage Layer: Cloud Firestore Role-Aware Document Store */}
      <FirestoreNode subProgress={subProgress} />

      {/* 12. Identity Entry: Firebase Auth (Phone OTP + Google OAuth) & Role Router */}
      <AuthNode subProgress={subProgress} />

      {/* 13. Reputation Loop: Completed Engagement → Mutual 1-5★ Review → Ranking Feedback */}
      <ReputationLoop subProgress={subProgress} />

      {/* 14. Culmination Span: Worker ════ LaborLink ════ Factory */}
      <FinalCommunicationBridge subProgress={subProgress} />

      {/* 15. Real-Time Telemetry HUD: Latency (<5ms), Timeout Guard (15s), Jest QA */}
      <LaborLinkTelemetry subProgress={subProgress} />
    </group>
  );
}
