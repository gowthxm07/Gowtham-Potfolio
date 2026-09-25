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
  range = [0.35, 0.40],
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

    // Normalized chapter sub-progress [0..1]
    const s = Math.max(0, Math.min(1, (progress - startP) / dur));

    let targetZ = -10.0;
    let targetX = anchorX;
    let targetY = 0.85;
    let targetScale = 0.30;
    let opacity = 0.0;

    if (progress >= startP && s < 0.16) {
      // 01. ENTRY / FAR EMERGENCE: Stays deep in background fog (-10.0 -> -6.0)
      const t = smoothStep(s / 0.16);
      targetZ = -10.0 + (-6.0 - -10.0) * t;
      targetX = anchorX;
      targetY = 0.85;
      targetScale = 0.30 + (0.50 - 0.30) * t;
      opacity = t * 0.45;
    } else if (s >= 0.16 && s < 0.38) {
      // 02. CINEMATIC APPROACH: Glides forward from mid-depth into hero plane (-6.0 -> 0.15)
      const t = smoothStep((s - 0.16) / (0.38 - 0.16));
      targetZ = -6.0 + (0.15 - -6.0) * t;
      targetX = anchorX;
      targetY = 0.85;
      targetScale = 0.50 + (1.0 - 0.50) * t;
      opacity = 0.45 + (1.0 - 0.45) * t;
    } else if (s >= 0.38 && s <= 0.68) {
      // 03. HERO / PROMINENT DWELL: Rock-solid focal station at Z=0.15 (30% of chapter)
      targetZ = 0.15;
      targetX = anchorX;
      targetY = 0.85;
      targetScale = 1.0;
      opacity = 1.0;
    } else if (s > 0.68 && s <= 1.00) {
      // 04. EXIT / PASS CAMERA: Moves forward past camera (0.15 -> 5.2), sweeping out of viewport
      const t = smoothStep((s - 0.68) / (1.00 - 0.68));
      targetZ = 0.15 + (5.2 - 0.15) * t;
      targetX = anchorX - 0.45 * t;
      targetY = 0.85 + 0.10 * t;
      targetScale = 1.0 + 0.35 * t;
      opacity = 1.0 - t;
    } else {
      // 05. OUT OF RANGE: Stage clear
      opacity = 0.0;
      targetZ = s < 0.0 ? -12.0 : 7.0;
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
    <group ref={groupRef} position={[anchorX, 0.85, -10.0]} visible={false}>
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
