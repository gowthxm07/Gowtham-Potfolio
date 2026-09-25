"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface FirestoreNodeProps {
  subProgress: number;
}

export function FirestoreNode({ subProgress }: FirestoreNodeProps) {
  const platesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (platesRef.current) {
      platesRef.current.position.y = -1.15 + Math.sin(state.clock.elapsedTime * 1.2) * 0.015;
    }
  });

  const verifiedCollections = [
    { name: "users", desc: "auth / roles" },
    { name: "workers", desc: "skills & profile" },
    { name: "owners", desc: "industry details" },
    { name: "vacancies", desc: "30d lifecycle jobs" },
    { name: "interests", desc: "applications" },
    { name: "savedJobs", desc: "bookmarks" },
    { name: "reviews", desc: "1-5★ reputation" },
    { name: "reports", desc: "moderation audit" },
    { name: "notifications", desc: "alerts & updates" },
  ];

  return (
    <group ref={platesRef} position={[0, -1.15, -0.1]}>
      {/* Node Header */}
      <Text
        position={[0, 0.22, 0]}
        fontSize={0.036}
        color="#34d399"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"DATABASE CORE // CLOUD FIRESTORE"}
      </Text>
      <Text
        position={[0, 0.17, 0]}
        fontSize={0.022}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        {"ROLE-AWARE NOSQL DOCUMENT STORE (9 VERIFIED COLLECTIONS)"}
      </Text>

      {/* Layered Document Storage Trays (3x3 grid) */}
      <group position={[0, 0, 0]}>
        {verifiedCollections.map((col, idx) => {
          const colIdx = idx % 3;
          const rowIdx = Math.floor(idx / 3);
          const x = -0.58 + colIdx * 0.58;
          const y = 0.08 - rowIdx * 0.085;

          return (
            <group key={col.name} position={[x, y, 0]}>
              <mesh position={[0, 0, -0.002]}>
                <planeGeometry args={[0.52, 0.068]} />
                <meshStandardMaterial color="#031208" opacity={0.85} transparent />
              </mesh>
              <lineSegments position={[0, 0, 0]}>
                <edgesGeometry args={[new THREE.BoxGeometry(0.52, 0.068, 0.005)]} />
                <lineBasicMaterial color="#10b981" opacity={0.5} />
              </lineSegments>

              <Text
                position={[-0.22, 0.012, 0.005]}
                fontSize={0.022}
                color="#6ee7b7"
                anchorX="left"
                anchorY="middle"
                letterSpacing={0.03}
              >
                {`/${col.name}`}
              </Text>
              <Text
                position={[-0.22, -0.014, 0.005]}
                fontSize={0.016}
                color="#94a3b8"
                anchorX="left"
                anchorY="middle"
              >
                {col.desc}
              </Text>
            </group>
          );
        })}
      </group>
    </group>
  );
}
