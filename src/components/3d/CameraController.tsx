"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CAMERA_ZONES, ZoneId } from "@/lib/cameraConfig";

interface CameraControllerProps {
  activeZone: ZoneId;
  isMobile?: boolean;
}

export function CameraController({
  activeZone,
  isMobile = false,
}: CameraControllerProps) {
  const { camera } = useThree();
  const lookAtTarget = useRef(new THREE.Vector3(0, 1.2, 0));
  const currentPos = useRef(new THREE.Vector3(0, 2.6, 7.8));

  // Initialize camera position on mount
  useEffect(() => {
    const config = CAMERA_ZONES[activeZone] || CAMERA_ZONES.overview;
    camera.position.set(...config.position);
    currentPos.current.set(...config.position);
    lookAtTarget.current.set(...config.target);
    camera.lookAt(lookAtTarget.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = config.fov;
      camera.updateProjectionMatrix();
    }
  }, [camera, activeZone]);

  useFrame(({ pointer }, delta) => {
    const config = CAMERA_ZONES[activeZone] || CAMERA_ZONES.overview;

    // Extremely restrained mouse parallax (damped and scaled down on mobile)
    const parallaxScale = isMobile ? 0.04 : 0.22;
    const parallaxX = pointer.x * parallaxScale;
    const parallaxY = pointer.y * (parallaxScale * 0.5);

    // Target camera coordinates
    const targetX = config.position[0] + parallaxX;
    const targetY = config.position[1] + parallaxY;
    const targetZ = config.position[2];

    // Smooth physical camera transition
    currentPos.current.x = THREE.MathUtils.damp(
      currentPos.current.x,
      targetX,
      2.8,
      delta
    );
    currentPos.current.y = THREE.MathUtils.damp(
      currentPos.current.y,
      targetY,
      2.8,
      delta
    );
    currentPos.current.z = THREE.MathUtils.damp(
      currentPos.current.z,
      targetZ,
      2.8,
      delta
    );
    camera.position.copy(currentPos.current);

    // Target focal lookAt point
    const targetLookX = config.target[0] + parallaxX * 0.35;
    const targetLookY = config.target[1] + parallaxY * 0.25;
    const targetLookZ = config.target[2];

    lookAtTarget.current.x = THREE.MathUtils.damp(
      lookAtTarget.current.x,
      targetLookX,
      3.2,
      delta
    );
    lookAtTarget.current.y = THREE.MathUtils.damp(
      lookAtTarget.current.y,
      targetLookY,
      3.2,
      delta
    );
    lookAtTarget.current.z = THREE.MathUtils.damp(
      lookAtTarget.current.z,
      targetLookZ,
      3.2,
      delta
    );
    camera.lookAt(lookAtTarget.current);

    // Smooth FOV interpolation
    if (camera instanceof THREE.PerspectiveCamera) {
      const targetFov = isMobile ? config.fov + 8 : config.fov;
      camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, 2.8, delta);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
