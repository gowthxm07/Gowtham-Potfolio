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
  range = [0.25, 0.30],
  anchorX = -0.85,
}: StoryTrafficObjectProps) {
  const groupRef = useRef<THREE.Group>(null);

  const [startP, endP] = range;
  const dur = endP - startP;
  const approachEnd = startP + dur * 0.14;
  const dwellEnd = startP + dur * 0.86;

  // Normalized internal sub-progress [0..1] across the traffic monitoring experience
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

    // Subtle mouse parallax (only when active)
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
