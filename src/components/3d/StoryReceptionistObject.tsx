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
  range = [0.24, 0.34],
  anchorX = -0.85,
}: StoryReceptionistObjectProps) {
  const groupRef = useRef<THREE.Group>(null);

  const [startP, endP] = range;
  const dur = endP - startP;
  const approachEnd = startP + dur * 0.25;
  const dwellEnd = startP + dur * 0.78;

  // Normalized internal sub-progress [0..1] across the receptionist narrative
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
      targetZ = -14.0 + (0.5 - -14.0) * t;
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
      // 03. Passes camera forward and exits
      const t = smoothStep((progress - dwellEnd) / (endP - dwellEnd));
      targetZ = 0.75 + (5.0 - 0.75) * t;
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

    // Subtle collective orientation
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      0.08 + parallaxX * 0.5,
      3.5,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      parallaxY * 0.3,
      3.5,
      delta
    );

    groupRef.current.visible = opacity > 0.01;
  });

  return (
    <group ref={groupRef} position={[anchorX, 0.85, -14]}>
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
