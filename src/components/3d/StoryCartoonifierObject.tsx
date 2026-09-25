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
  range = [0.36, 0.42],
  anchorX = -0.85,
}: StoryCartoonifierObjectProps) {
  const groupRef = useRef<THREE.Group>(null);

  const [startP, endP] = range;
  const dur = endP - startP;
  const approachEnd = startP + dur * 0.24;
  const dwellEnd = startP + dur * 0.78;

  // Normalized internal sub-progress [0..1] across the cartoonifier narrative
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
