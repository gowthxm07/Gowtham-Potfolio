"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";
import { TrafficRoad } from "./traffic/TrafficRoad";
import { TrafficVehicles } from "./traffic/TrafficVehicles";
import { TrafficCameraSensor } from "./traffic/TrafficCameraSensor";
import { TrafficTelemetry } from "./traffic/TrafficTelemetry";

interface StoryTrafficObjectProps {
  progress: number;
  range?: [number, number];
  anchorX?: number;
}

export function StoryTrafficObject({
  progress,
  range = [0.33, 0.42],
  anchorX = -0.85,
}: StoryTrafficObjectProps) {
  const groupRef = useRef<THREE.Group>(null);

  const [startP, endP] = range;
  const dur = endP - startP;
  const approachEnd = startP + dur * 0.24;
  const dwellEnd = startP + dur * 0.78;

  // Normalized internal sub-progress [0..1] across the traffic monitoring experience
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
      // 01. Approach from depth
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

    // Subtle mouse parallax
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
      {/* Dedicated spotlight for the traffic telemetry and roadway */}
      <spotLight
        position={[0, 4.0, 2.0]}
        intensity={2.2}
        color="#86efac"
        angle={0.7}
        penumbra={0.6}
        castShadow
      />
      <pointLight position={[-1.2, 1.2, 0.8]} intensity={1.4} color="#38bdf8" distance={4.5} />

      {/* 01. Three-Lane Highway Corridor Slab */}
      <TrafficRoad subProgress={subProgress} />

      {/* 02. Multi-Class Tracked Vehicle Flow (Sedan, Bus, Truck, Moto) with 3D Bounding Boxes & Trails */}
      <TrafficVehicles subProgress={subProgress} />

      {/* 03. Optical Sensor Rig & 640x480 Viewfinder Scanning Plane */}
      <TrafficCameraSensor subProgress={subProgress} />

      {/* 04. 3D Floating Telemetry HUD (YOLOv8 Nano, YOLOv8 Object Tracking, 10-Frame Density, Clearance, Firestore) */}
      <TrafficTelemetry subProgress={subProgress} />
    </group>
  );
}
