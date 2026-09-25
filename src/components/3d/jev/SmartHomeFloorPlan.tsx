"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface SmartHomeFloorPlanProps {
  subProgress: number;
}

interface RoomConfig {
  id: string;
  name: string;
  categoryTag: string;
  position: [number, number, number];
  size: [number, number, number];
  accentColor: string;
  deviceCount: number;
}

const ROOMS: RoomConfig[] = [
  {
    id: "entrance",
    name: "01 // ENTRANCE",
    categoryTag: "SECURITY & ACCESS",
    position: [-1.25, -0.35, 0.45],
    size: [0.85, 0.04, 0.75],
    accentColor: "#06b6d4",
    deviceCount: 3,
  },
  {
    id: "living-room",
    name: "02 // LIVING ROOM",
    categoryTag: "MEDIA & AMBIENCE",
    position: [-0.15, -0.35, 0.1],
    size: [1.35, 0.04, 1.25],
    accentColor: "#06b6d4",
    deviceCount: 6,
  },
  {
    id: "bedroom",
    name: "03 // BEDROOM",
    categoryTag: "CLIMATE & SLEEP",
    position: [-1.25, -0.35, -0.55],
    size: [0.95, 0.04, 0.95],
    accentColor: "#a855f7",
    deviceCount: 5,
  },
  {
    id: "kitchen",
    name: "04 // KITCHEN",
    categoryTag: "APPLIANCES & REFRIG",
    position: [0.95, -0.35, 0.45],
    size: [0.85, 0.04, 0.75],
    accentColor: "#06b6d4",
    deviceCount: 3,
  },
  {
    id: "study",
    name: "05 // STUDY",
    categoryTag: "WORKSPACE & TASK",
    position: [0.95, -0.35, -0.55],
    size: [0.85, 0.04, 0.75],
    accentColor: "#06b6d4",
    deviceCount: 1,
  },
];

export function SmartHomeFloorPlan({ subProgress }: SmartHomeFloorPlanProps) {
  const gridGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (gridGroupRef.current) {
      gridGroupRef.current.position.y = -0.38 + Math.sin(t * 1.2) * 0.005;
    }
  });

  return (
    <group ref={gridGroupRef}>
      {/* Schematic Floor Base Grid */}
      <gridHelper
        args={[3.8, 18, 0x06b6d4, 0x1e293b]}
        position={[-0.1, -0.37, 0]}
      />

      {/* Virtual 5-Room Architecture */}
      {ROOMS.map((room) => {
        const [w, h, d] = room.size;
        const [px, py, pz] = room.position;

        return (
          <group key={room.id} position={[px, py, pz]}>
            {/* Translucent Floor Plate */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[w, h, d]} />
              <meshStandardMaterial
                color="#0a1120"
                roughness={0.2}
                metalness={0.8}
                transparent
                opacity={0.85}
              />
            </mesh>

            {/* Glowing Room Perimeter Wireframe */}
            <lineSegments position={[0, 0.025, 0]}>
              <edgesGeometry args={[new THREE.BoxGeometry(w, 0.01, d)]} />
              <lineBasicMaterial
                color={room.accentColor}
                transparent
                opacity={0.7}
                linewidth={1}
              />
            </lineSegments>

            {/* Corner Architectural Anchor Posts */}
            {[
              [-w / 2, 0.08, -d / 2],
              [w / 2, 0.08, -d / 2],
              [-w / 2, 0.08, d / 2],
              [w / 2, 0.08, d / 2],
            ].map(([cx, cy, cz], i) => (
              <mesh key={i} position={[cx, cy, cz]}>
                <cylinderGeometry args={[0.012, 0.012, 0.16, 8]} />
                <meshStandardMaterial
                  color={room.accentColor}
                  emissive={room.accentColor}
                  emissiveIntensity={0.6}
                  metalness={0.9}
                  roughness={0.2}
                />
              </mesh>
            ))}

            {/* Room Identifier Label Badge */}
            <group position={[0, 0.06, d / 2 - 0.08]}>
              <mesh position={[0, 0, 0]}>
                <planeGeometry args={[w * 0.85, 0.08]} />
                <meshBasicMaterial color="#030712" transparent opacity={0.85} />
              </mesh>
              <Text
                position={[0, 0.015, 0.005]}
                fontSize={0.034}
                color="#f8fafc"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.04}
              >
                {room.name}
              </Text>
              <Text
                position={[0, -0.018, 0.005]}
                fontSize={0.022}
                color={room.accentColor}
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.03}
              >
                {`${room.categoryTag} • ${room.deviceCount} DEV`}
              </Text>
            </group>
          </group>
        );
      })}

      {/* Digital Twin Blueprint Annotation */}
      <Text
        position={[-0.1, -0.34, 1.05]}
        fontSize={0.036}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {"DIGITAL TWIN SCHEMATIC // 5 ROOMS • 18 VIRTUAL SMART DEVICES"}
      </Text>
    </group>
  );
}
