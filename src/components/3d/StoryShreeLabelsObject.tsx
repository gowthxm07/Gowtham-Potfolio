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
  const approachEnd = startP + dur * 0.24;
  const dwellEnd = startP + dur * 0.78;

  // Normalized internal sub-progress [0..1] across the Shree Labels narrative
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
