"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TrafficBoundingBox } from "./TrafficBoundingBox";
import { TrafficTrackingTrails } from "./TrafficTrackingTrails";

interface TrafficVehiclesProps {
  subProgress?: number;
}

export function TrafficVehicles({ subProgress = 0 }: TrafficVehiclesProps) {
  const v1Ref = useRef<THREE.Group>(null);
  const v2Ref = useRef<THREE.Group>(null);
  const v3Ref = useRef<THREE.Group>(null);
  const v4Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Vehicle 1: Sedan / Car on Lane 1 (x = -0.8)
    if (v1Ref.current) {
      const zPos = 2.6 - ((time * 1.8) % 6.4);
      v1Ref.current.position.z = zPos;
    }

    // Vehicle 2: Transit Bus on Lane 2 (x = 0.0)
    if (v2Ref.current) {
      const zPos = 2.0 - ((time * 1.25 + 1.8) % 6.4);
      v2Ref.current.position.z = zPos;
    }

    // Vehicle 3: Freight Truck on Lane 3 (x = 0.8)
    if (v3Ref.current) {
      const zPos = 3.0 - ((time * 1.4 + 3.6) % 6.4);
      v3Ref.current.position.z = zPos;
    }

    // Vehicle 4: Motorcycle on Lane 1 (x = -0.65, fast transit)
    if (v4Ref.current) {
      const zPos = 3.2 - ((time * 2.2 + 4.8) % 6.4);
      v4Ref.current.position.z = zPos;
    }
  });

  return (
    <group position={[0, -0.32, 0]}>
      {/* ============================================================ */}
      {/* VEHICLE 01: SEDAN (COCO: car [Class 2], Lane 1, x = -0.8)    */}
      {/* ============================================================ */}
      <group ref={v1Ref} position={[-0.8, 0, 1.2]}>
        {/* Chassis */}
        <mesh position={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[0.34, 0.12, 0.65]} />
          <meshStandardMaterial color="#081e10" roughness={0.25} metalness={0.88} />
        </mesh>
        {/* Cabin */}
        <mesh position={[0, 0.18, -0.04]}>
          <boxGeometry args={[0.28, 0.1, 0.36]} />
          <meshStandardMaterial color="#040e07" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Headlights */}
        <mesh position={[-0.12, 0.08, -0.33]}>
          <boxGeometry args={[0.06, 0.03, 0.01]} />
          <meshBasicMaterial color="#86efac" />
        </mesh>
        <mesh position={[0.12, 0.08, -0.33]}>
          <boxGeometry args={[0.06, 0.03, 0.01]} />
          <meshBasicMaterial color="#86efac" />
        </mesh>
        {/* Wheels */}
        {[-0.18, 0.18].map((wx, i) =>
          [-0.2, 0.2].map((wz, j) => (
            <mesh key={`${i}-${j}`} position={[wx, 0.04, wz]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
              <meshStandardMaterial color="#020804" roughness={0.6} />
            </mesh>
          ))
        )}

        {/* 3D YOLO Bounding Box & Class Label */}
        <TrafficBoundingBox
          dimensions={[0.42, 0.28, 0.72]}
          trackId="04"
          classNameLabel="car"
          confidence={0.94}
          color="#22c55e"
        />
        {/* Tracking Trajectory Trail */}
        <TrafficTrackingTrails offsetZ={0.36} length={1.3} color="#22c55e" />
      </group>

      {/* ============================================================ */}
      {/* VEHICLE 02: TRANSIT BUS (COCO: bus [Class 5], Lane 2, x = 0) */}
      {/* ============================================================ */}
      <group ref={v2Ref} position={[0, 0, -0.5]}>
        {/* Bus Body */}
        <mesh position={[0, 0.16, 0]} castShadow>
          <boxGeometry args={[0.42, 0.28, 1.15]} />
          <meshStandardMaterial color="#0a2414" roughness={0.25} metalness={0.85} />
        </mesh>
        {/* Windows Strip */}
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.43, 0.08, 1.05]} />
          <meshPhysicalMaterial
            color="#041208"
            roughness={0.1}
            metalness={0.3}
            transmission={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* Headlights */}
        <mesh position={[-0.15, 0.1, -0.58]}>
          <boxGeometry args={[0.08, 0.04, 0.01]} />
          <meshBasicMaterial color="#4ade80" />
        </mesh>
        <mesh position={[0.15, 0.1, -0.58]}>
          <boxGeometry args={[0.08, 0.04, 0.01]} />
          <meshBasicMaterial color="#4ade80" />
        </mesh>
        {/* Wheels */}
        {[-0.22, 0.22].map((wx, i) =>
          [-0.42, 0, 0.42].map((wz, j) => (
            <mesh key={`${i}-${j}`} position={[wx, 0.05, wz]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.055, 0.055, 0.05, 16]} />
              <meshStandardMaterial color="#020804" roughness={0.6} />
            </mesh>
          ))
        )}

        {/* 3D YOLO Bounding Box & Class Label */}
        <TrafficBoundingBox
          dimensions={[0.48, 0.38, 1.26]}
          trackId="01"
          classNameLabel="bus"
          confidence={0.91}
          color="#38bdf8"
        />
        {/* Tracking Trajectory Trail */}
        <TrafficTrackingTrails offsetZ={0.6} length={1.6} color="#38bdf8" />
      </group>

      {/* ============================================================ */}
      {/* VEHICLE 03: TRUCK (COCO: truck [Class 7], Lane 3, x = 0.8)   */}
      {/* ============================================================ */}
      <group ref={v3Ref} position={[0.8, 0, 0.4]}>
        {/* Driver Cabin */}
        <mesh position={[0, 0.18, -0.32]} castShadow>
          <boxGeometry args={[0.38, 0.26, 0.36]} />
          <meshStandardMaterial color="#092012" roughness={0.25} metalness={0.88} />
        </mesh>
        {/* Cargo Container */}
        <mesh position={[0, 0.22, 0.16]} castShadow>
          <boxGeometry args={[0.42, 0.34, 0.72]} />
          <meshStandardMaterial color="#05150b" roughness={0.35} metalness={0.75} />
        </mesh>
        {/* Container Rib Lines */}
        <mesh position={[0, 0.22, 0.16]}>
          <boxGeometry args={[0.425, 0.345, 0.725]} />
          <meshBasicMaterial color="#22c55e" opacity={0.25} wireframe transparent />
        </mesh>
        {/* Headlights */}
        <mesh position={[-0.14, 0.1, -0.51]}>
          <boxGeometry args={[0.06, 0.03, 0.01]} />
          <meshBasicMaterial color="#86efac" />
        </mesh>
        <mesh position={[0.14, 0.1, -0.51]}>
          <boxGeometry args={[0.06, 0.03, 0.01]} />
          <meshBasicMaterial color="#86efac" />
        </mesh>
        {/* Wheels */}
        {[-0.2, 0.2].map((wx, i) =>
          [-0.32, 0.15, 0.38].map((wz, j) => (
            <mesh key={`${i}-${j}`} position={[wx, 0.05, wz]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.055, 0.055, 0.05, 16]} />
              <meshStandardMaterial color="#020804" roughness={0.6} />
            </mesh>
          ))
        )}

        {/* 3D YOLO Bounding Box & Class Label */}
        <TrafficBoundingBox
          dimensions={[0.48, 0.44, 1.15]}
          trackId="02"
          classNameLabel="truck"
          confidence={0.96}
          color="#f59e0b"
        />
        {/* Tracking Trajectory Trail */}
        <TrafficTrackingTrails offsetZ={0.58} length={1.5} color="#f59e0b" />
      </group>

      {/* ============================================================ */}
      {/* VEHICLE 04: MOTORCYCLE (COCO: motorcycle [Class 3], Lane 1)  */}
      {/* ============================================================ */}
      <group ref={v4Ref} position={[-0.65, 0, 2.2]}>
        {/* Motorcycle Frame */}
        <mesh position={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[0.1, 0.14, 0.4]} />
          <meshStandardMaterial color="#0f2e1a" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Rider Helmet Silhouette */}
        <mesh position={[0, 0.22, 0.02]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial color="#040f07" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Headlight */}
        <mesh position={[0, 0.12, -0.21]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#86efac" />
        </mesh>
        {/* Front & Rear Wheels */}
        {[-0.15, 0.15].map((wz, idx) => (
          <mesh key={idx} position={[0, 0.04, wz]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
            <meshStandardMaterial color="#020804" roughness={0.7} />
          </mesh>
        ))}

        {/* 3D YOLO Bounding Box & Class Label */}
        <TrafficBoundingBox
          dimensions={[0.22, 0.28, 0.48]}
          trackId="05"
          classNameLabel="moto"
          confidence={0.88}
          color="#a855f7"
        />
        {/* Tracking Trajectory Trail */}
        <TrafficTrackingTrails offsetZ={0.25} length={1.1} color="#a855f7" />
      </group>
    </group>
  );
}
