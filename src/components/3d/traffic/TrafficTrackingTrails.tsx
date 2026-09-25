"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface TrafficTrackingTrailsProps {
  offsetZ?: number;
  length?: number;
  color?: string;
  pointsCount?: number;
}

export function TrafficTrackingTrails({
  offsetZ = 0.4,
  length = 1.4,
  color = "#22c55e",
  pointsCount = 6,
}: TrafficTrackingTrailsProps) {
  // Trajectory points extending behind the vehicle (positive Z)
  const trailNodes = useMemo(() => {
    const nodes = [];
    const step = length / pointsCount;
    for (let i = 1; i <= pointsCount; i++) {
      const zPos = offsetZ + i * step;
      const opacity = Math.max(0.08, 0.75 - (i / pointsCount) * 0.7);
      const scale = Math.max(0.4, 1.0 - (i / pointsCount) * 0.6);
      nodes.push({ zPos, opacity, scale });
    }
    return nodes;
  }, [offsetZ, length, pointsCount]);

  return (
    <group position={[0, 0.04, 0]}>
      {/* 01. TRAJECTORY PATH LINE */}
      <mesh position={[0, 0, offsetZ + length / 2]}>
        <boxGeometry args={[0.015, 0.005, length]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>

      {/* 02. DISCRETE HISTORICAL COORDINATE NODES */}
      {trailNodes.map((node, idx) => (
        <group key={idx} position={[0, 0, node.zPos]}>
          <mesh scale={[node.scale, 1, node.scale]}>
            <cylinderGeometry args={[0.035, 0.035, 0.008, 12]} />
            <meshBasicMaterial color={color} transparent opacity={node.opacity} />
          </mesh>
          <mesh scale={[node.scale * 1.6, 1, node.scale * 1.6]}>
            <ringGeometry args={[0.04, 0.048, 16]} />
            <meshBasicMaterial color={color} transparent opacity={node.opacity * 0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
