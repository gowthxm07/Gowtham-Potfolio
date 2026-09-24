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
    position: [0, 1.85, 5.4],
    target: [0, 1.45, 0],
    fov: 40,
    description: "Atmospheric perspective framing the central architectural chamber and identity monolith.",
  },
  identity: {
    id: "identity",
    label: "01 // Identity",
    position: [0, 1.5, 3.1],
    target: [0, 1.45, 0],
    fov: 34,
    description: "Close inspection dock highlighting verified credentials and authentic portrait.",
  },
  projects: {
    id: "projects",
    label: "02 // Projects",
    position: [-3.8, 1.8, 3.2],
    target: [-3.0, 1.2, -0.5],
    fov: 42,
    description: "Spatial foundation for featured engineering systems (Phase 4).",
  },
  skills: {
    id: "skills",
    label: "03 // Skills Matrix",
    position: [3.8, 1.8, 3.2],
    target: [3.0, 1.2, -0.5],
    fov: 42,
    description: "Spatial foundation for categorized technical stack (Phase 5).",
  },
  achievements: {
    id: "achievements",
    label: "04 // Achievements",
    position: [2.5, 1.6, -3.2],
    target: [1.8, 1.1, -2.5],
    fov: 42,
    description: "Spatial foundation for LeetCode Knight standing and hackathons (Phase 5).",
  },
  contact: {
    id: "contact",
    label: "05 // Connect",
    position: [-2.5, 1.6, -3.2],
    target: [-1.8, 1.1, -2.5],
    fov: 42,
    description: "Spatial foundation for contact transmission console (Phase 6).",
  },
};
