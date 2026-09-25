"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface DeviceNodesProps {
  subProgress: number;
}

interface VirtualDevice {
  id: string;
  name: string;
  room: string;
  category: "light" | "climate" | "security" | "curtain" | "entertainment" | "power";
  position: [number, number, number];
  statusText: string;
  statusCode: "executed" | "skipped" | "active" | "standby";
}

// 18 Virtual Smart Devices verified in Step 1 audit
const VIRTUAL_DEVICES: VirtualDevice[] = [
  // 1. Entrance (3 devices)
  {
    id: "ent_lock",
    name: "SMART LOCK",
    room: "ENTRANCE",
    category: "security",
    position: [-1.45, -0.22, 0.6],
    statusText: "LOCKED (EXEC)",
    statusCode: "executed",
  },
  {
    id: "ent_porch",
    name: "PORCH LIGHT",
    room: "ENTRANCE",
    category: "light",
    position: [-1.15, -0.22, 0.6],
    statusText: "ON (80%)",
    statusCode: "active",
  },
  {
    id: "ent_sec",
    name: "SECURITY SYSTEM",
    room: "ENTRANCE",
    category: "security",
    position: [-1.3, -0.22, 0.3],
    statusText: "ARMED // STAY",
    statusCode: "active",
  },

  // 2. Living Room (6 devices)
  {
    id: "lr_light_main",
    name: "MAIN LIGHT",
    room: "LIVING ROOM",
    category: "light",
    position: [-0.45, -0.22, 0.45],
    statusText: "OFF (EXEC)",
    statusCode: "executed",
  },
  {
    id: "lr_light_amb",
    name: "AMBIENT LIGHT",
    room: "LIVING ROOM",
    category: "light",
    position: [0.15, -0.22, 0.45],
    statusText: "OFF (EXEC)",
    statusCode: "executed",
  },
  {
    id: "lr_ac",
    name: "LIVING AC",
    room: "LIVING ROOM",
    category: "climate",
    position: [-0.55, -0.22, 0.1],
    statusText: "STANDBY",
    statusCode: "standby",
  },
  {
    id: "lr_tv",
    name: "SMART TV",
    room: "LIVING ROOM",
    category: "entertainment",
    position: [-0.15, -0.22, 0.1],
    statusText: "OFF (SKIPPED)",
    statusCode: "skipped",
  },
  {
    id: "lr_plug",
    name: "SMART PLUG",
    room: "LIVING ROOM",
    category: "power",
    position: [0.25, -0.22, 0.1],
    statusText: "OFF (SKIPPED)",
    statusCode: "skipped",
  },
  {
    id: "lr_curtain",
    name: "CURTAINS",
    room: "LIVING ROOM",
    category: "curtain",
    position: [-0.15, -0.22, -0.35],
    statusText: "CLOSED (EXEC)",
    statusCode: "executed",
  },

  // 3. Bedroom (5 devices)
  {
    id: "br_light_main",
    name: "MAIN LIGHT",
    room: "BEDROOM",
    category: "light",
    position: [-1.45, -0.22, -0.4],
    statusText: "OFF (EXEC)",
    statusCode: "executed",
  },
  {
    id: "br_light_night",
    name: "NIGHT LIGHT",
    room: "BEDROOM",
    category: "light",
    position: [-1.05, -0.22, -0.4],
    statusText: "DIM (10%)",
    statusCode: "active",
  },
  {
    id: "br_ac",
    name: "BEDROOM AC",
    room: "BEDROOM",
    category: "climate",
    position: [-1.45, -0.22, -0.75],
    statusText: "22°C COOL (EXEC)",
    statusCode: "executed",
  },
  {
    id: "br_curtain",
    name: "CURTAINS",
    room: "BEDROOM",
    category: "curtain",
    position: [-1.05, -0.22, -0.75],
    statusText: "CLOSED (EXEC)",
    statusCode: "executed",
  },
  {
    id: "br_purifier",
    name: "AIR PURIFIER",
    room: "BEDROOM",
    category: "climate",
    position: [-1.25, -0.22, -0.58],
    statusText: "SILENT MODE",
    statusCode: "active",
  },

  // 4. Kitchen (3 devices)
  {
    id: "kt_light_main",
    name: "MAIN LIGHT",
    room: "KITCHEN",
    category: "light",
    position: [0.8, -0.22, 0.6],
    statusText: "OFF (EXEC)",
    statusCode: "executed",
  },
  {
    id: "kt_light_cab",
    name: "CABINET LIGHT",
    room: "KITCHEN",
    category: "light",
    position: [1.1, -0.22, 0.6],
    statusText: "STANDBY",
    statusCode: "standby",
  },
  {
    id: "kt_fridge",
    name: "REFRIGERATOR",
    room: "KITCHEN",
    category: "climate",
    position: [0.95, -0.22, 0.3],
    statusText: "ECO (3°C)",
    statusCode: "active",
  },

  // 5. Study (1 device)
  {
    id: "st_light_desk",
    name: "DESK LIGHT",
    room: "STUDY",
    category: "light",
    position: [0.95, -0.22, -0.55],
    statusText: "OFF (EXEC)",
    statusCode: "executed",
  },
];

export function DeviceNodes({ subProgress }: DeviceNodesProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // subtle pulsing for active/executed nodes
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Group && child.userData.statusDot) {
          const mat = (child.userData.statusDot as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (mat) {
            mat.opacity = 0.6 + Math.sin(t * 3.0 + i) * 0.4;
          }
        }
      });
    }
  });

  const getColorForStatus = (code: VirtualDevice["statusCode"]) => {
    switch (code) {
      case "executed":
        return "#10b981"; // emerald execution
      case "skipped":
        return "#f59e0b"; // amber skipped redundancy
      case "active":
        return "#06b6d4"; // cyan active state
      case "standby":
      default:
        return "#64748b"; // slate standby
    }
  };

  return (
    <group ref={groupRef}>
      {VIRTUAL_DEVICES.map((dev) => {
        const statusColor = getColorForStatus(dev.statusCode);

        return (
          <group key={dev.id} position={dev.position}>
            {/* Base Micro-Pedestal */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.045, 0.05, 0.02, 12]} />
              <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
            </mesh>

            {/* Device Glyph Geometry */}
            <mesh position={[0, 0.035, 0]}>
              {dev.category === "security" ? (
                <cylinderGeometry args={[0.022, 0.022, 0.04, 6]} />
              ) : dev.category === "climate" ? (
                <boxGeometry args={[0.055, 0.04, 0.04]} />
              ) : dev.category === "entertainment" ? (
                <boxGeometry args={[0.07, 0.045, 0.015]} />
              ) : dev.category === "curtain" ? (
                <boxGeometry args={[0.065, 0.05, 0.012]} />
              ) : dev.category === "power" ? (
                <cylinderGeometry args={[0.025, 0.025, 0.03, 8]} />
              ) : (
                <sphereGeometry args={[0.025, 12, 12]} />
              )}
              <meshStandardMaterial
                color={statusColor}
                emissive={statusColor}
                emissiveIntensity={0.65}
                roughness={0.2}
                metalness={0.7}
              />
            </mesh>

            {/* Pulsing Status LED */}
            <mesh position={[0, 0.075, 0]}>
              <sphereGeometry args={[0.009, 8, 8]} />
              <meshBasicMaterial color={statusColor} />
            </mesh>

            {/* Mini Text Labels */}
            <Text
              position={[0, 0.105, 0]}
              fontSize={0.02}
              color="#f8fafc"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.02}
            >
              {dev.name}
            </Text>

            <Text
              position={[0, 0.088, 0]}
              fontSize={0.016}
              color={statusColor}
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.02}
            >
              {dev.statusText}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
