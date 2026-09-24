"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { evaluateCameraAtProgress } from "@/lib/storyTimeline";

interface StoryCameraControllerProps {
  progress: number;
  isMobile?: boolean;
}

export function StoryCameraController({
  progress,
  isMobile = false,
}: StoryCameraControllerProps) {
  const { camera } = useThree();
  const lookAtTarget = useRef(new THREE.Vector3(0, 0.6, 0));
  const currentPos = useRef(new THREE.Vector3(0, 1.4, 7.2));

  // Initialize camera position on mount
  useEffect(() => {
    const { position, target, fov } = evaluateCameraAtProgress(0);
    camera.position.set(...position);
    currentPos.current.set(...position);
    lookAtTarget.current.set(...target);
    camera.lookAt(lookAtTarget.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  useFrame(({ pointer }, delta) => {
    // 1. Evaluate camera parameters continuously as a function of scroll progress
    const { position, target, fov } = evaluateCameraAtProgress(progress);

    // 2. Secondary restrained mouse parallax (does not fight scroll journey)
    const parallaxScale = isMobile ? 0.03 : 0.14;
    const parallaxX = pointer.x * parallaxScale;
    const parallaxY = pointer.y * (parallaxScale * 0.5);

    const targetCamX = position[0] + parallaxX;
    const targetCamY = position[1] + parallaxY;
    const targetCamZ = position[2];

    // Smooth physical camera transition
    currentPos.current.x = THREE.MathUtils.damp(
      currentPos.current.x,
      targetCamX,
      3.2,
      delta
    );
    currentPos.current.y = THREE.MathUtils.damp(
      currentPos.current.y,
      targetCamY,
      3.2,
      delta
    );
    currentPos.current.z = THREE.MathUtils.damp(
      currentPos.current.z,
      targetCamZ,
      3.2,
      delta
    );
    camera.position.copy(currentPos.current);

    // Target focal lookAt point
    const targetLookX = target[0] + parallaxX * 0.35;
    const targetLookY = target[1] + parallaxY * 0.25;
    const targetLookZ = target[2];

    lookAtTarget.current.x = THREE.MathUtils.damp(
      lookAtTarget.current.x,
      targetLookX,
      3.6,
      delta
    );
    lookAtTarget.current.y = THREE.MathUtils.damp(
      lookAtTarget.current.y,
      targetLookY,
      3.6,
      delta
    );
    lookAtTarget.current.z = THREE.MathUtils.damp(
      lookAtTarget.current.z,
      targetLookZ,
      3.6,
      delta
    );
    camera.lookAt(lookAtTarget.current);

    // Dynamic FOV interpolation
    if (camera instanceof THREE.PerspectiveCamera) {
      const targetFov = isMobile ? fov + 6 : fov;
      camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, 3.0, delta);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
