import { Achievement } from "@/types";

export const achievementsData: Achievement[] = [
  {
    category: "Competitive Programming",
    title: "LeetCode Knight & Competitive Problem Solver",
    subtitle: "Algorithmic problem solving across complex data structures and dynamic programming.",
    details: [
      "Solved 900+ algorithmic problems across LeetCode.",
      "Achieved a peak contest rating of 1868.",
      "Awarded Knight Level credential (top 4.96% globally).",
    ],
    stats: [
      { label: "Problems Solved", value: "900+" },
      { label: "Peak Rating", value: "1868" },
      { label: "Global Standing", value: "Top 4.96%" },
      { label: "Rank Badge", value: "Knight" },
    ],
  },
  {
    category: "Leadership",
    title: "DSA and Placement Preparation Team Lead",
    subtitle: "GeeksforGeeks Campus Body, Amrita Vishwa Vidhyapeetham",
    period: "April 2025 – June 2026",
    details: [
      "Led technical placement readiness and DSA initiatives across campus.",
      "Conducted mock technical interviews, algorithmic training sessions, and campus-wide coding contests.",
      "Mentored peers in pattern recognition, time-complexity analysis, and structured problem solving.",
    ],
  },
  {
    category: "Hackathons",
    title: "Hackathon Accolades & Competitive Builds",
    subtitle: "National and regional hackathon recognitions.",
    details: [
      "Winner — DeltaBuild 2026",
      "Runner-Up — CodeRoyale",
      "Finalist — SRM HackRush 1.0",
      "Finalist — Hacktide",
    ],
  },
];
