import { SkillCategory } from "@/types";

export const coreStrengths: string[] = [
  "Data Structures & Algorithms",
  "Competitive Programming (LeetCode 1868)",
  "Full-Stack & Systems Architecture",
];

export const skillsData: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: ["C++", "Python", "TypeScript", "JavaScript", "C", "SQL"],
    description: "Core systems, competitive problem-solving, and application development languages.",
  },
  {
    category: "Web & App Development",
    skills: ["React", "Next.js", "Node.js", "Express", "HTML5", "CSS3", "Tailwind CSS"],
    description: "Production full-stack web engineering, SSR/SSG workflows, and responsive interfaces.",
  },
  {
    category: "Database & Backend",
    skills: ["PostgreSQL", "Prisma ORM", "Firebase / Firestore", "MySQL", "REST APIs"],
    description: "Relational schema modeling, NoSQL document stores, transactional integrity, and API middleware.",
  },
  {
    category: "AI & Machine Learning",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Ollama / LLMs",
      "BERT",
      "Transformers",
      "NLP",
      "Model Training",
    ],
    description: "Neural architectures, fine-tuning, local LLM orchestration, and probabilistic inference.",
  },
  {
    category: "Computer Vision",
    skills: [
      "OpenCV",
      "YOLOv8",
      "Object Tracking",
      "Haar Cascade",
      "MOG2 Subtraction",
      "Bilateral Filtering",
    ],
    description: "Real-time edge video processing, object detection, background masking, and privacy filters.",
  },
  {
    category: "Tools & Engineering",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Vitest",
      "Jest",
      "Vercel",
      "Cloudinary",
      "Whisper.cpp",
      "Piper TTS",
    ],
    description: "Automated testing, containerization, local speech runtimes, CI/CD, and deployment infrastructure.",
  },
];
