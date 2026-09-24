import { NavigationItem } from "@/types";

export const navigationItems: NavigationItem[] = [
  {
    id: "identity",
    label: "Identity",
    zone: "IdentityZone",
    description: "Personal credentials, education, and foundational profile.",
  },
  {
    id: "projects",
    label: "Projects",
    zone: "ProjectsZone",
    description: "Featured full-stack, AI, and computer vision systems.",
  },
  {
    id: "skills",
    label: "Skills Matrix",
    zone: "SkillsZone",
    description: "Categorized technical stack, testing proficiencies, and tools.",
  },
  {
    id: "achievements",
    label: "Achievements",
    zone: "AchievementsZone",
    description: "LeetCode Knight standing, leadership initiatives, and hackathon awards.",
  },
  {
    id: "contact",
    label: "Connect",
    zone: "ContactZone",
    description: "Direct contact transmission and verified professional links.",
  },
];
