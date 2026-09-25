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
    range: [0.0, 0.12],
    camera: {
      startPos: [0, 1.4, 7.2],
      endPos: [0, 1.1, 5.8],
      startTarget: [0, 0.6, 0],
      endTarget: [0, 0.6, 0],
      fov: 42,
    },
  },
  {
    id: "identity",
    index: "02",
    badge: "02 // IDENTITY",
    title: "Identity & Profile",
    subtitle: "B.Tech Computer Science • Systems & AI Engineer",
    range: [0.12, 0.25],
    camera: {
      startPos: [-0.6, 1.0, 5.4],
      endPos: [-0.85, 0.9, 3.6],
      startTarget: [0.75, 0.85, 0],
      endTarget: [0.75, 0.85, 0],
      fov: 38,
    },
  },
  {
    id: "projects",
    index: "03",
    badge: "03 // FEATURED WORK",
    title: "Engineering Systems",
    subtitle: "AI Voice Middleware & Computer Vision Telemetry",
    range: [0.25, 0.4],
    camera: {
      startPos: [0.7, 0.95, 4.8],
      endPos: [0.85, 0.9, 3.2],
      startTarget: [-0.7, 0.85, 0],
      endTarget: [-0.7, 0.85, 0],
      fov: 38,
    },
  },
  {
    id: "academics",
    index: "04",
    badge: "04 // ACADEMIC JOURNEY",
    title: "Education & Progression",
    subtitle: "Amrita Vishwa Vidhyapeetham • GPA 8.12",
    range: [0.4, 0.54],
    camera: {
      startPos: [-0.65, 1.0, 4.8],
      endPos: [-0.8, 0.9, 3.4],
      startTarget: [0.7, 0.85, 0],
      endTarget: [0.7, 0.85, 0],
      fov: 38,
    },
  },
  {
    id: "skills",
    index: "05",
    badge: "05 // SKILLS MATRIX",
    title: "Technology & Tools",
    subtitle: "Full-Stack, AI/ML, Testing & Engineering Constellation",
    range: [0.54, 0.68],
    camera: {
      startPos: [0.75, 1.0, 4.8],
      endPos: [0.85, 0.9, 3.4],
      startTarget: [-0.7, 0.85, 0],
      endTarget: [-0.7, 0.85, 0],
      fov: 38,
    },
  },
  {
    id: "achievements",
    index: "06",
    badge: "06 // ACHIEVEMENTS",
    title: "Competitive Standing",
    subtitle: "LeetCode Knight [1868] & Hackathon Accolades",
    range: [0.68, 0.8],
    camera: {
      startPos: [-0.6, 1.0, 4.6],
      endPos: [-0.8, 0.9, 3.2],
      startTarget: [0.7, 0.85, 0],
      endTarget: [0.7, 0.85, 0],
      fov: 38,
    },
  },
  {
    id: "resume",
    index: "07",
    badge: "07 // DOCUMENT ARTIFACT",
    title: "Official Resume",
    subtitle: "Verified Technical Credentials & Direct PDF Access",
    range: [0.8, 0.9],
    camera: {
      startPos: [0.65, 0.95, 4.4],
      endPos: [0.75, 0.9, 3.2],
      startTarget: [-0.65, 0.85, 0],
      endTarget: [-0.65, 0.85, 0],
      fov: 38,
    },
  },
  {
    id: "contact",
    index: "08",
    badge: "08 // CONNECT",
    title: "Direct Transmission",
    subtitle: "Initiate Communication & Inquiries",
    range: [0.9, 1.0],
    camera: {
      startPos: [0, 1.2, 5.0],
      endPos: [0, 1.0, 4.2],
      startTarget: [0, 0.75, 0],
      endTarget: [0, 0.75, 0],
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
  let currentSection = STORY_SECTIONS[0];
  for (let i = 0; i < STORY_SECTIONS.length; i++) {
    const sec = STORY_SECTIONS[i];
    if (progress >= sec.range[0] && progress <= sec.range[1]) {
      currentSection = sec;
      break;
    }
  }

  const [start, end] = currentSection.range;
  const localRaw = Math.max(0, Math.min(1, (progress - start) / (end - start)));
  const localT = smoothStep(localRaw);

  const { startPos, endPos, startTarget, endTarget, fov } = currentSection.camera;

  let posX = startPos[0] + (endPos[0] - startPos[0]) * localT;
  let posY = startPos[1] + (endPos[1] - startPos[1]) * localT;
  let posZ = startPos[2] + (endPos[2] - startPos[2]) * localT;

  let targetX = startTarget[0] + (endTarget[0] - startTarget[0]) * localT;
  let targetY = startTarget[1] + (endTarget[1] - startTarget[1]) * localT;
  let targetZ = startTarget[2] + (endTarget[2] - startTarget[2]) * localT;

  // Project-specific subtle camera trajectory for Section 03 (AI Receptionist & Traffic CV Systems)
  if (currentSection.id === "projects") {
    // 0.0 -> 0.52: AI Receptionist Pipeline (Phone -> Voice -> AI Core -> Database -> Appointment)
    if (localRaw < 0.52) {
      const tSub = localRaw / 0.52;
      if (tSub < 0.45) {
        // Stage A: Phone enters from depth -> Camera favors right framing phone on left
        const tA = smoothStep(tSub / 0.45);
        posX = 0.84 - 0.1 * tA;
        posY = 0.96 - 0.04 * tA;
        posZ = 4.7 - 0.8 * tA;
        targetX = -0.78 + 0.1 * tA;
      } else {
        // Stage B: AI Core & State Machine active -> Camera centers and advances forward
        const tB = smoothStep((tSub - 0.45) / 0.55);
        posX = 0.74 + 0.1 * tB;
        posY = 0.92 - 0.02 * tB;
        posZ = 3.9 - 0.6 * tB;
        targetX = -0.68 - 0.02 * tB;
      }
    } else {
      // 0.52 -> 1.0: Real-Time Traffic Computer Vision Experience
      const tSub = (localRaw - 0.52) / 0.48;
      if (tSub < 0.45) {
        // Stage C: Highway & optical sensor approach from depth
        const tC = smoothStep(tSub / 0.45);
        posX = 0.84 - 0.06 * tC;
        posY = 1.02 - 0.06 * tC;
        posZ = 4.8 - 0.8 * tC;
        targetX = -0.82 + 0.06 * tC;
        targetY = 0.72 + 0.02 * tC;
      } else {
        // Stage D: Live multi-class tracking dwell & telemetry focus
        const tD = smoothStep((tSub - 0.45) / 0.55);
        posX = 0.78 - 0.04 * tD;
        posY = 0.96 - 0.04 * tD;
        posZ = 4.0 - 0.6 * tD;
        targetX = -0.76 - 0.04 * tD;
        targetY = 0.74 - 0.02 * tD;
      }
    }
  }

  return {
    position: [posX, posY, posZ],
    target: [targetX, targetY, targetZ],
    fov,
  };
}
