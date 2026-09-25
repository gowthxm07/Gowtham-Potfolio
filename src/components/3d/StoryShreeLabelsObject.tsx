"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";
import { BrandNode } from "./shree-labels/BrandNode";
import { MaterialShowcase } from "./shree-labels/MaterialShowcase";
import { PrintingPressNode } from "./shree-labels/PrintingPressNode";
import { ProductSpecimenNode } from "./shree-labels/ProductSpecimenNode";
import { SustainabilityNode } from "./shree-labels/SustainabilityNode";
import { CertificationNode } from "./shree-labels/CertificationNode";
import { ReviewTrustNode } from "./shree-labels/ReviewTrustNode";
import { QuoteNode } from "./shree-labels/QuoteNode";
import { KarurLocationNode } from "./shree-labels/KarurLocationNode";
import { ShreeLabelsTelemetry } from "./shree-labels/ShreeLabelsTelemetry";

interface StoryShreeLabelsObjectProps {
  progress: number;
  range?: [number, number];
  anchorX?: number;
}

export function StoryShreeLabelsObject({
  progress,
  range = [0.40, 0.44],
  anchorX = -0.85,
}: StoryShreeLabelsObjectProps) {
  const groupRef = useRef<THREE.Group>(null);

  const [startP, endP] = range;
  const dur = endP - startP;
  const approachEnd = startP + dur * 0.14;
  const dwellEnd = startP + dur * 0.86;

  // Normalized internal sub-progress [0..1] across the Shree Labels narrative
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
      {/* Studio Lighting in Shree Labels Clean Blue/White Aesthetic */}
      <spotLight
        position={[0, 4.2, 2.5]}
        intensity={2.8}
        color="#ffffff"
        angle={0.8}
        penumbra={0.6}
        castShadow
      />
      <pointLight position={[-1.8, 1.2, 0.8]} intensity={1.8} color="#2f80ed" distance={5.2} />
      <pointLight position={[1.8, 1.2, 0.8]} intensity={1.6} color="#1e6fb9" distance={5.2} />

      {/* 01. Brand Entrance: Logo Emblem & Corporate Typography */}
      <BrandNode subProgress={subProgress} />

      {/* 02. Physical Label Ribbon System: Cotton, Taffeta, Satin, Offset Specimens */}
      <MaterialShowcase subProgress={subProgress} />

      {/* 03. Precision Printing Press & Finishing Matrix: Hot/Cold Cut, Ultrasonic, Folds */}
      <PrintingPressNode subProgress={subProgress} />

      {/* 04. Orbiting Product Specimen Cards: Real Label Photographs (label1..label6) */}
      <ProductSpecimenNode subProgress={subProgress} />

      {/* 05. Sustainability Structure: 4 Verified Pillars */}
      <SustainabilityNode subProgress={subProgress} />

      {/* 06. Verified Certification Seals: OEKO-TEX Standard 100 & Sedex */}
      <CertificationNode subProgress={subProgress} />

      {/* 07. Customer Trust: Live Firestore Reviews & 5-Star Signal */}
      <ReviewTrustNode subProgress={subProgress} />

      {/* 08. Commercial Quotation Conduit: EmailJS Direct Dispatch */}
      <QuoteNode subProgress={subProgress} />

      {/* 09. Geolocation Beacon: Karur, Tamil Nadu Hub */}
      <KarurLocationNode subProgress={subProgress} />

      {/* 10. Minimal Technical Stack Telemetry */}
      <ShreeLabelsTelemetry subProgress={subProgress} />
    </group>
  );
}
