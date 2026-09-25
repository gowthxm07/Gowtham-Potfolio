"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";
import { VideoInputNode } from "./cartoonifier/VideoInputNode";
import { PrivacyFaceNode } from "./cartoonifier/PrivacyFaceNode";
import { MotionMaskNode } from "./cartoonifier/MotionMaskNode";
import { CartoonColorPath } from "./cartoonifier/CartoonColorPath";
import { CartoonStructurePath } from "./cartoonifier/CartoonStructurePath";
import { BitwiseFusionNode } from "./cartoonifier/BitwiseFusionNode";
import { MotionCompositeNode } from "./cartoonifier/MotionCompositeNode";
import { CartoonOutputNode } from "./cartoonifier/CartoonOutputNode";
import { CartoonifierTelemetry } from "./cartoonifier/CartoonifierTelemetry";

interface StoryCartoonifierObjectProps {
  progress: number;
  range?: [number, number];
  anchorX?: number;
}

export function StoryCartoonifierObject({
  progress,
  range = [0.30, 0.35],
  anchorX = -0.85,
}: StoryCartoonifierObjectProps) {
  const groupRef = useRef<THREE.Group>(null);

  const [startP, endP] = range;
  const dur = endP - startP;
  const approachEnd = startP + dur * 0.14;
  const dwellEnd = startP + dur * 0.86;

  // Normalized internal sub-progress [0..1] across the cartoonifier narrative
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

    groupRef.current.visible = opacity > 0.005;
  });

  return (
    <group ref={groupRef} position={[anchorX, 0.85, -10.0]} visible={false}>
      {/* Dedicated spotlight for the optical computing rig */}
      <spotLight
        position={[0, 4.0, 2.0]}
        intensity={2.4}
        color="#86efac"
        angle={0.75}
        penumbra={0.6}
        castShadow
      />
      <pointLight position={[-1.2, 1.2, 0.8]} intensity={1.5} color="#38bdf8" distance={4.8} />

      {/* 01. Raw Video Viewport (Webcam / MP4 Ingest & Downsample Annotation) */}
      <VideoInputNode subProgress={subProgress} />

      {/* 02. Privacy Path: Haar Cascade Face Reticle & Localized 51x51 Gaussian Blur Shield */}
      <PrivacyFaceNode subProgress={subProgress} />

      {/* 03. Motion Path: MOG2 Temporal Background Subtraction & Morphological Cleanup */}
      <MotionMaskNode subProgress={subProgress} />

      {/* 04. Path A: Color Quantization & Bilateral Filtering (64 Colors) */}
      <CartoonColorPath subProgress={subProgress} />

      {/* 05. Path B: Structural Edge Extraction & Adaptive Thresholding */}
      <CartoonStructurePath subProgress={subProgress} />

      {/* 06. Central Fusion Chamber: cv2.bitwise_and(color, edges) */}
      <BitwiseFusionNode subProgress={subProgress} />

      {/* 07. Motion-Aware Compositing: Fused Foreground + Darkened Blurred Background (alpha=0.4) */}
      <MotionCompositeNode subProgress={subProgress} />

      {/* 08. Exit Viewport: Anonymized Cartoon Stream (MJPEG HTTP Output) */}
      <CartoonOutputNode subProgress={subProgress} />

      {/* 09. 3D Telemetry HUD: Verified Benchmarks (-65.1% JPEG, +78.3% Canny, 98.3% CNN) */}
      <CartoonifierTelemetry subProgress={subProgress} />
    </group>
  );
}
