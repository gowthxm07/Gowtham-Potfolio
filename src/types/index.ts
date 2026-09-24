export interface ProfileData {
  name: string;
  degree: string;
  institution: string;
  period: string;
  gpa: string;
  location: string;
  email: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
  roles: string[];
}

export type ProjectCategory =
  | "AI / Machine Learning"
  | "Full-Stack Web"
  | "Computer Vision & Edge"
  | "IoT & Automation";

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  category: ProjectCategory;
  resumeRelevant: boolean;
  featured: boolean;
  visualConcept: string;
  metrics: string[];
  role: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
  description?: string;
}

export interface Achievement {
  category: "Competitive Programming" | "Leadership" | "Hackathons";
  title: string;
  subtitle: string;
  period?: string;
  details: string[];
  stats?: { label: string; value: string }[];
}

export interface NavigationItem {
  id: string;
  label: string;
  zone: string;
  description: string;
}
