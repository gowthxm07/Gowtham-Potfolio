export type ZoneId =
  | "overview"
  | "identity"
  | "projects"
  | "skills"
  | "achievements"
  | "contact";

export interface CameraZoneConfig {
  id: ZoneId;
  label: string;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  description: string;
}

export const CAMERA_ZONES: Record<ZoneId, CameraZoneConfig> = {
  overview: {
    id: "overview",
    label: "Central World",
    position: [0, 2.6, 7.8],
    target: [0, 1.2, 0],
    fov: 46,
    description: "Atmospheric perspective of the technical core and architectural space.",
  },
  identity: {
    id: "identity",
    label: "01 // Identity",
    position: [0, 1.55, 3.8],
    target: [0, 1.45, 0],
    fov: 38,
    description: "Architectural monolith presenting verified identity and credentials.",
  },
  projects: {
    id: "projects",
    label: "02 // Projects",
    position: [-3.8, 1.8, 3.2],
    target: [-3.0, 1.2, -0.5],
    fov: 42,
    description: "Interactive project pods and live software systems (Phase 4).",
  },
  skills: {
    id: "skills",
    label: "03 // Skills Matrix",
    position: [3.8, 1.8, 3.2],
    target: [3.0, 1.2, -0.5],
    fov: 42,
    description: "Categorized technical proficiencies and testing matrix (Phase 5).",
  },
  achievements: {
    id: "achievements",
    label: "04 // Achievements",
    position: [2.5, 1.6, -3.2],
    target: [1.8, 1.1, -2.5],
    fov: 42,
    description: "Competitive programming standing, Knight rank, and awards (Phase 5).",
  },
  contact: {
    id: "contact",
    label: "05 // Connect",
    position: [-2.5, 1.6, -3.2],
    target: [-1.8, 1.1, -2.5],
    fov: 42,
    description: "Communication terminal and transmission console (Phase 6).",
  },
};
