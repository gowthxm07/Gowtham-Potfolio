"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";
import { ReceptionistPhone } from "./receptionist/ReceptionistPhone";
import { VoiceWaveform } from "./receptionist/VoiceWaveform";
import { ConversationCore } from "./receptionist/ConversationCore";
import { SessionContextNode } from "./receptionist/SessionContextNode";
import { DatabaseNode } from "./receptionist/DatabaseNode";
import { AppointmentStateMachine } from "./receptionist/AppointmentStateMachine";
import { ReceptionistTelemetry } from "./receptionist/ReceptionistTelemetry";

interface StoryReceptionistObjectProps {
  progress: number;
  range?: [number, number];
  anchorX?: number;
}

export function StoryReceptionistObject({
  progress,
  range = [0.20, 0.25],
  anchorX = -0.85,
}: StoryReceptionistObjectProps) {
  const groupRef = useRef<THREE.Group>(null);

  const [startP, endP] = range;
  const dur = endP - startP;
  const approachEnd = startP + dur * 0.14;
  const dwellEnd = startP + dur * 0.86;

  // Normalized internal sub-progress [0..1] across the receptionist narrative
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
    let targetScale = 0.35;
    let opacity = 0.0;

    if (progress >= startP && s < 0.20) {
      // 01. ENTRY / FAR EMERGENCE: Materializes deep in background (-10.0 -> -4.5)
      const t = smoothStep(s / 0.20);
      targetZ = -10.0 + (-4.5 - -10.0) * t;
      targetX = anchorX;
      targetY = 0.85;
      targetScale = 0.35 + (0.65 - 0.35) * t;
      opacity = t * 0.70;
    } else if (s >= 0.20 && s < 0.40) {
      // 02. CINEMATIC APPROACH: Glides forward from mid-depth into hero plane (-4.5 -> 0.15)
      const t = smoothStep((s - 0.20) / (0.40 - 0.20));
      targetZ = -4.5 + (0.15 - -4.5) * t;
      targetX = anchorX;
      targetY = 0.85;
      targetScale = 0.65 + (1.0 - 0.65) * t;
      opacity = 0.70 + (1.0 - 0.70) * t;
    } else if (s >= 0.40 && s <= 0.70) {
      // 03. HERO / PROMINENT DWELL: Rock-solid focal station at Z=0.15 (30% of chapter)
      targetZ = 0.15;
      targetX = anchorX;
      targetY = 0.85;
      targetScale = 1.0;
      opacity = 1.0;
    } else if (s > 0.70 && s <= 0.92) {
      // 04. EXIT / PASS CAMERA: Moves forward past camera (0.15 -> 5.2), sweeping out of viewport
      const t = smoothStep((s - 0.70) / (0.92 - 0.70));
      targetZ = 0.15 + (5.2 - 0.15) * t;
      targetX = anchorX - 0.45 * t;
      targetY = 0.85 + 0.10 * t;
      targetScale = 1.0 + 0.35 * t;
      opacity = Math.max(0, 1.0 - t * 1.3);
    } else {
      // 05. GAP / OUT OF RANGE: Stage clear, invisible before next project begins
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

    // Subtle collective orientation
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      0.06 + parallaxX * 0.4,
      4.5,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      parallaxY * 0.3,
      4.5,
      delta
    );

    groupRef.current.visible = opacity > 0.005;
  });

  return (
    <group ref={groupRef} position={[anchorX, 0.85, -10.0]} visible={false}>
      {/* 01. MOBILE PHONE INCOMING CALLER SILHOUETTE */}
      <ReceptionistPhone subProgress={subProgress} />

      {/* 02. VOICE & SPEECH WAVEFORM SIGNAL PIPELINE */}
      <VoiceWaveform subProgress={subProgress} />

      {/* 03. CENTRAL CONVERSATION CORE & LOCAL LLM RUNTIME */}
      <ConversationCore subProgress={subProgress} />

      {/* 04. MULTI-TENANT CONTEXT & SESSION ISOLATION */}
      <SessionContextNode subProgress={subProgress} />

      {/* 05. PERSISTENCE STORAGE LAYER (PostgreSQL + Prisma) */}
      <DatabaseNode subProgress={subProgress} />

      {/* 06. APPOINTMENT STATE MACHINE PROGRESSION */}
      <AppointmentStateMachine subProgress={subProgress} />

      {/* 07. LOW-LATENCY SYSTEM TELEMETRY */}
      <ReceptionistTelemetry subProgress={subProgress} />
    </group>
  );
}
