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
  const approachEnd = startP + dur * 0.24;
  const dwellEnd = startP + dur * 0.78;

  // Normalized internal sub-progress [0..1] across the LaborLink narrative
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
      // 03. Passes camera forward and gracefully exits
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
