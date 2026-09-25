"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Text } from "@react-three/drei";
import * as THREE from "three";

interface ProductSpecimenNodeProps {
  subProgress: number;
}

export function ProductSpecimenNode({ subProgress }: ProductSpecimenNodeProps) {
  const carouselRef = useRef<THREE.Group>(null);

  // Load verified gallery label sample photographs
  const t1 = useTexture("/assets/shree-labels/label1.jpeg");
  const t2 = useTexture("/assets/shree-labels/label2.jpeg");
  const t3 = useTexture("/assets/shree-labels/label3.jpeg");
  const t4 = useTexture("/assets/shree-labels/label4.jpeg");
  const t5 = useTexture("/assets/shree-labels/label5.jpeg");
  const t6 = useTexture("/assets/shree-labels/label6.jpeg");

  const textures = [t1, t2, t3, t4, t5, t6];
  textures.forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace;
  });

  const sampleTitles = [
    "Garment Label Sample 01",
    "Custom Print Specimen 02",
    "Apparel Tag Solution 03",
    "Smooth Finish Care Tag 04",
    "Vibrant Ink Micro-Print 05",
    "Industrial Adhesive Tag 06",
  ];

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.2;
    if (carouselRef.current) {
      carouselRef.current.position.y = 0.05 + Math.sin(t * 2) * 0.015;
    }
  });

  return (
    <group ref={carouselRef} position={[0, -0.05, 0.4]}>
      {/* Specimen Arc Array */}
      {textures.map((tex, idx) => {
        // Arrange 6 cards in an arc along X from -1.5 to 1.5, slightly recessed in Z
        const arcT = (idx - 2.5) / 2.5; // -1 to 1
        const x = arcT * 1.55;
        const z = -Math.abs(arcT) * 0.35 + 0.1;
        const rotY = -arcT * 0.22;

        return (
          <group key={idx} position={[x, 0, z]} rotation={[0.02, rotY, 0]}>
            {/* Clean White Card Frame */}
            <mesh position={[0, 0, -0.005]}>
              <boxGeometry args={[0.48, 0.38, 0.01]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
            </mesh>
            <lineSegments position={[0, 0, -0.005]}>
              <edgesGeometry args={[new THREE.BoxGeometry(0.48, 0.38, 0.01)]} />
              <lineBasicMaterial color="#bdd8f4" />
            </lineSegments>

            {/* Authentic Photographic Thumbnail (Natural Colors Unfiltered) */}
            <mesh position={[0, 0.035, 0.006]}>
              <planeGeometry args={[0.44, 0.25]} />
              <meshBasicMaterial map={tex} side={THREE.DoubleSide} />
            </mesh>

            {/* Specimen Caption */}
            <Text
              position={[0, -0.13, 0.006]}
              fontSize={0.019}
              color="#0b1f3a"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.03}
            >
              {sampleTitles[idx]}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
