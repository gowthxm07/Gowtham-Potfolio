"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { LabelRibbon } from "./LabelRibbon";

interface MaterialShowcaseProps {
  subProgress: number;
}

export function MaterialShowcase({ subProgress }: MaterialShowcaseProps) {
  const containerRef = useRef<THREE.Group>(null);

  useFrame(({ pointer }, delta) => {
    if (!containerRef.current) return;
    // Gentle mouse parallax
    containerRef.current.rotation.y = THREE.MathUtils.damp(
      containerRef.current.rotation.y,
      pointer.x * 0.08,
      3.0,
      delta
    );
  });

  return (
    <group ref={containerRef} position={[0, 0.45, 0]}>
      {/* Showcase Section Title */}
      <Text
        position={[0, 0.65, 0]}
        fontSize={0.045}
        color="#1e6fb9"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {"VERIFIED LABEL SUBSTRATE SPECIMENS"}
      </Text>
      <Text
        position={[0, 0.58, 0]}
        fontSize={0.026}
        color="#5b7d9e"
        anchorX="center"
        anchorY="middle"
      >
        {"PHYSICAL WOVEN & PRINTED APPAREL FINISHES"}
      </Text>

      {/* 01. SPECIMEN A: COTTON TAPE (Matte, Natural, Soft Woven) */}
      <LabelRibbon
        position={[-0.85, 0.28, 0.2]}
        rotation={[0.05, 0.15, -0.04]}
        title="COTTON TAPE"
        subtitle="100% NATURAL COTTON"
        specDetails="SOFT TEXTURE • SKIN-FRIENDLY • WASH-RESISTANT INKS"
        color="#f8f7f2"
        roughness={0.88}
        metalness={0.04}
        speed={1.0}
        amplitude={0.035}
        subProgress={subProgress}
      />

      {/* 02. SPECIMEN B: TAFFETA (Crisp, Tightly Woven, Technical Care Tags) */}
      <LabelRibbon
        position={[0.85, 0.28, 0.1]}
        rotation={[0.04, -0.15, 0.04]}
        title="TAFFETA"
        subtitle="HIGH-DENSITY WEAVE"
        specDetails="CRISP FINISH • MICRO-TEXT CARE TAGS • BARCODES"
        color="#f0f6fd"
        roughness={0.45}
        metalness={0.18}
        speed={1.2}
        amplitude={0.03}
        subProgress={subProgress}
      />

      {/* 03. SPECIMEN C: SATIN (Smooth, Lustrous, Reflective Sheen) */}
      <LabelRibbon
        position={[-0.85, -0.15, 0.35]}
        rotation={[-0.04, 0.18, 0.03]}
        title="SATIN"
        subtitle="HIGH-SHEEN FINISH"
        specDetails="SILKY LUSTROUS TEXTURE • ULTRA-SOFT NON-IRRITATING"
        color="#ffffff"
        roughness={0.16}
        metalness={0.32}
        speed={1.4}
        amplitude={0.04}
        subProgress={subProgress}
      />

      {/* 04. SPECIMEN D: OFFSET PRINTED STOCK (Rigid Card Specimen) */}
      <group position={[0.85, -0.15, 0.25]} rotation={[-0.03, -0.16, -0.03]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.4, 0.28, 0.015]} />
          <meshStandardMaterial color="#ffffff" roughness={0.25} metalness={0.1} />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(1.4, 0.28, 0.015)]} />
          <lineBasicMaterial color="#2f80ed" />
        </lineSegments>

        <group position={[0, 0, 0.015]}>
          <Text
            position={[-0.6, 0.06, 0]}
            fontSize={0.026}
            color="#0b1f3a"
            anchorX="left"
            anchorY="middle"
            letterSpacing={0.05}
          >
            {"OFFSET PRINTED LABELS"}
          </Text>
          <Text
            position={[-0.6, 0.005, 0]}
            fontSize={0.02}
            color="#1e6fb9"
            anchorX="left"
            anchorY="middle"
            letterSpacing={0.04}
          >
            {"CUSTOM LABELS & APPAREL TAGS"}
          </Text>
          <Text
            position={[-0.6, -0.055, 0]}
            fontSize={0.016}
            color="#5b7d9e"
            anchorX="left"
            anchorY="middle"
          >
            {"BATCH CONSISTENCY • SHARP MICRO-TYPOGRAPHY"}
          </Text>

          {/* Registration Crosshair Marks */}
          <group position={[0.52, 0, 0]}>
            <mesh>
              <ringGeometry args={[0.04, 0.045, 16]} />
              <meshBasicMaterial color="#2f80ed" />
            </mesh>
            <mesh>
              <boxGeometry args={[0.11, 0.005, 0.001]} />
              <meshBasicMaterial color="#2f80ed" />
            </mesh>
            <mesh>
              <boxGeometry args={[0.005, 0.11, 0.001]} />
              <meshBasicMaterial color="#2f80ed" />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
