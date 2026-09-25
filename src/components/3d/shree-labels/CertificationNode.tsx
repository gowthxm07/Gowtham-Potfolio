"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Text } from "@react-three/drei";
import * as THREE from "three";

interface CertificationNodeProps {
  subProgress: number;
}

export function CertificationNode({ subProgress }: CertificationNodeProps) {
  const certGroupRef = useRef<THREE.Group>(null);
  const seal1Ref = useRef<THREE.Group>(null);
  const seal2Ref = useRef<THREE.Group>(null);

  const oekoTexture = useTexture("/assets/shree-labels/cert-oekotex.png");
  const sedexTexture = useTexture("/assets/shree-labels/cert-sedex.png");
  oekoTexture.colorSpace = THREE.SRGBColorSpace;
  sedexTexture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (certGroupRef.current) {
      certGroupRef.current.position.y = 0.85 + Math.sin(t * 1.4) * 0.012;
    }
    if (seal1Ref.current) {
      seal1Ref.current.rotation.y = Math.sin(t * 0.8) * 0.06;
    }
    if (seal2Ref.current) {
      seal2Ref.current.rotation.y = -Math.sin(t * 0.8) * 0.06;
    }
  });

  return (
    <group ref={certGroupRef} position={[1.4, 0.85, 0.15]} rotation={[0.02, -0.28, 0]}>
      {/* Node Header */}
      <Text
        position={[0, 0.44, 0]}
        fontSize={0.038}
        color="#1e6fb9"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"VERIFIED COMPLIANCE & STANDARDS"}
      </Text>
      <Text
        position={[0, 0.38, 0]}
        fontSize={0.022}
        color="#5b7d9e"
        anchorX="center"
        anchorY="middle"
      >
        {"INTERNATIONAL SAFETY & ETHICAL AUDIT CERTIFICATES"}
      </Text>

      {/* Main Glass Chassis */}
      <mesh position={[0, 0.04, -0.01]}>
        <boxGeometry args={[0.92, 0.58, 0.02]} />
        <meshStandardMaterial color="#071426" roughness={0.6} metalness={0.7} />
      </mesh>
      <lineSegments position={[0, 0.04, -0.01]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.92, 0.58, 0.02)]} />
        <lineBasicMaterial color="#2f80ed" opacity={0.6} />
      </lineSegments>

      {/* 01. OEKO-TEX® STANDARD 100 Medallion Card */}
      <group ref={seal1Ref} position={[0, 0.16, 0.02]}>
        <mesh position={[0, 0, -0.002]}>
          <planeGeometry args={[0.84, 0.18]} />
          <meshStandardMaterial color="#0b1f3a" roughness={0.7} />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.84, 0.18, 0.002)]} />
          <lineBasicMaterial color="#1e6fb9" opacity={0.5} />
        </lineSegments>

        {/* OEKO-TEX Logo Emblem */}
        <mesh position={[-0.28, 0, 0.01]}>
          <planeGeometry args={[0.22, 0.13]} />
          <meshBasicMaterial map={oekoTexture} transparent side={THREE.DoubleSide} />
        </mesh>

        {/* Textual Metadata */}
        <group position={[0.1, 0, 0.01]}>
          <Text
            position={[0, 0.05, 0]}
            fontSize={0.022}
            color="#ffffff"
            anchorX="left"
            anchorY="middle"
            letterSpacing={0.04}
          >
            {"OEKO-TEX® STANDARD 100"}
          </Text>
          <Text
            position={[0, 0.01, 0]}
            fontSize={0.016}
            color="#2f80ed"
            anchorX="left"
            anchorY="middle"
          >
            {"CERT: 19.HIN.97140 Hohenstein HTTI"}
          </Text>
          <Text
            position={[0, -0.03, 0]}
            fontSize={0.015}
            color="#d3e6fa"
            anchorX="left"
            anchorY="middle"
          >
            {"SCOPE: SATIN, TAFFETA, TWILL TAPE"}
          </Text>
          <Text
            position={[0, -0.06, 0]}
            fontSize={0.014}
            color="#94b8df"
            anchorX="left"
            anchorY="middle"
          >
            {"TESTED FOR HARMFUL SUBSTANCES"}
          </Text>
        </group>
      </group>

      {/* 02. SEDEX ETHICAL SUPPLY CHAIN Medallion Card */}
      <group ref={seal2Ref} position={[0, -0.08, 0.02]}>
        <mesh position={[0, 0, -0.002]}>
          <planeGeometry args={[0.84, 0.18]} />
          <meshStandardMaterial color="#0b1f3a" roughness={0.7} />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.84, 0.18, 0.002)]} />
          <lineBasicMaterial color="#1e6fb9" opacity={0.5} />
        </lineSegments>

        {/* Sedex Logo Emblem */}
        <mesh position={[-0.28, 0, 0.01]}>
          <planeGeometry args={[0.22, 0.13]} />
          <meshBasicMaterial map={sedexTexture} transparent side={THREE.DoubleSide} />
        </mesh>

        {/* Textual Metadata */}
        <group position={[0.1, 0, 0.01]}>
          <Text
            position={[0, 0.05, 0]}
            fontSize={0.022}
            color="#ffffff"
            anchorX="left"
            anchorY="middle"
            letterSpacing={0.04}
          >
            {"SEDEX (ETHICAL TRADE)"}
          </Text>
          <Text
            position={[0, 0.01, 0]}
            fontSize={0.016}
            color="#2f80ed"
            anchorX="left"
            anchorY="middle"
          >
            {"SUPPLIER ETHICAL DATA EXCHANGE"}
          </Text>
          <Text
            position={[0, -0.03, 0]}
            fontSize={0.015}
            color="#d3e6fa"
            anchorX="left"
            anchorY="middle"
          >
            {"STANDARDS: WORKER WELFARE & SAFETY"}
          </Text>
          <Text
            position={[0, -0.06, 0]}
            fontSize={0.014}
            color="#94b8df"
            anchorX="left"
            anchorY="middle"
          >
            {"RESPONSIBLE SUPPLY CHAIN AUDIT"}
          </Text>
        </group>
      </group>
    </group>
  );
}
