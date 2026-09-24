export interface StorySectionDef {
  id: string;
  index: string;
  badge: string;
  title: string;
  subtitle: string;
  range: [number, number];
  camera: {
    startPos: [number, number, number];
    endPos: [number, number, number];
    startTarget: [number, number, number];
    endTarget: [number, number, number];
    fov: number;
  };
}

export const STORY_SECTIONS: StorySectionDef[] = [
  {
    id: "intro",
    index: "01",
    badge: "INITIALIZE // CORE",
    title: "Gowtham Hari S",
    subtitle: "AI, Systems & Software Engineering Portfolio",
    range: [0.0, 0.2],
    camera: {
      startPos: [0, 1.4, 7.2],
      endPos: [0, 1.1, 5.6],
      startTarget: [0, 0.6, 0],
      endTarget: [0, 0.6, 0],
      fov: 42,
    },
  },
  {
    id: "identity",
    index: "02",
    badge: "02 // IDENTITY",
    title: "Identity & Core Credentials",
    subtitle: "B.Tech Computer Science • Amrita Vishwa Vidhyapeetham",
    range: [0.2, 0.45],
    camera: {
      startPos: [-0.6, 1.0, 5.4],
      endPos: [-0.85, 0.9, 3.6],
      startTarget: [0.75, 0.85, 0],
      endTarget: [0.75, 0.85, 0],
      fov: 38,
    },
  },
  {
    id: "receptionist",
    index: "03",
    badge: "03 // FEATURED WORK",
    title: "AI-Powered Smart Receptionist",
    subtitle: "Autonomous Speech & Intent Voice Middleware",
    range: [0.45, 0.7],
    camera: {
      startPos: [0.7, 0.95, 4.8],
      endPos: [0.85, 0.9, 3.2],
      startTarget: [-0.7, 0.85, 0],
      endTarget: [-0.7, 0.85, 0],
      fov: 38,
    },
  },
  {
    id: "traffic",
    index: "04",
    badge: "04 // COMPUTER VISION",
    title: "Real-Time Traffic Monitoring",
    subtitle: "YOLO Vehicle Detection & Streaming Telemetry",
    range: [0.7, 0.95],
    camera: {
      startPos: [-0.65, 0.95, 4.8],
      endPos: [-0.85, 0.9, 3.2],
      startTarget: [0.7, 0.85, 0],
      endTarget: [0.7, 0.85, 0],
      fov: 38,
    },
  },
  {
    id: "horizon",
    index: "05",
    badge: "05 // SPATIAL HORIZON",
    title: "The Engineering Continuum",
    subtitle: "Ready for Phase 4 Project Environments",
    range: [0.95, 1.0],
    camera: {
      startPos: [0, 1.2, 5.2],
      endPos: [0, 1.1, 4.2],
      startTarget: [0, 0.7, 0],
      endTarget: [0, 0.7, -3],
      fov: 40,
    },
  },
];

/**
 * Smooth Hermite cubic interpolation for transitions
 */
export function smoothStep(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
}

/**
 * Calculates current camera position, lookAt target, and FOV based on global scroll progress (0..1)
 */
export function evaluateCameraAtProgress(progress: number): {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
} {
  // Find matching section or extrapolate
  let currentSection = STORY_SECTIONS[0];
  for (let i = 0; i < STORY_SECTIONS.length; i++) {
    const sec = STORY_SECTIONS[i];
    if (progress >= sec.range[0] && progress <= sec.range[1]) {
      currentSection = sec;
      break;
    }
  }

  // Calculate local progress inside the section
  const [start, end] = currentSection.range;
  const localRaw = (progress - start) / (end - start);
  const localT = smoothStep(localRaw);

  const { startPos, endPos, startTarget, endTarget, fov } = currentSection.camera;

  const posX = startPos[0] + (endPos[0] - startPos[0]) * localT;
  const posY = startPos[1] + (endPos[1] - startPos[1]) * localT;
  const posZ = startPos[2] + (endPos[2] - startPos[2]) * localT;

  const targetX = startTarget[0] + (endTarget[0] - startTarget[0]) * localT;
  const targetY = startTarget[1] + (endTarget[1] - startTarget[1]) * localT;
  const targetZ = startTarget[2] + (endTarget[2] - startTarget[2]) * localT;

  return {
    position: [posX, posY, posZ],
    target: [targetX, targetY, targetZ],
    fov,
  };
}
