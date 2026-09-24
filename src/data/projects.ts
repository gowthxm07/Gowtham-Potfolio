import { Project } from "@/types";

export const projectsData: Project[] = [
  {
    id: "ai-smart-receptionist",
    title: "AI-Powered Smart Receptionist Platform",
    shortDescription:
      "Intelligent conversational front-desk platform automating reception workflows with low-latency voice synthesis and comprehension.",
    fullDescription:
      "A next-generation receptionist system designed to handle inbound visitor and call interactions autonomously. Features modular integration with real-time speech processing, AI intent routing, and dynamic response generation for seamless front-desk operations.",
    technologies: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "Whisper.cpp",
      "Piper TTS",
      "REST APIs",
    ],
    githubUrl: "https://github.com/gowthxm07/AI-powered-receptionist-platform",
    category: "AI / Machine Learning",
    resumeRelevant: true,
    featured: true,
    visualConcept: "voice / phone / conversational AI / communication",
    metrics: [
      "Autonomous conversational intake flow",
      "Engineered for sub-second acoustic-to-text turnaround",
    ],
    role: "Full-Stack AI Developer",
  },
  {
    id: "laborlink",
    title: "LaborLink – Small-Scale Industry Job Marketplace",
    shortDescription:
      "Full-stack digital marketplace connecting small-scale manufacturers and local industrial enterprises with laborers.",
    fullDescription:
      "Architected an end-to-end marketplace tailored for small-scale manufacturing units to post immediate labor requirements and for workers to discover matching shifts. Built with real-time status updates, rating/reporting moderation, profile management, and image storage.",
    technologies: ["React.js", "Firebase", "Cloudinary", "Python", "JavaScript"],
    githubUrl: "https://github.com/gowthxm07/Labour-Hiring-Platform-for-Small-Scale-Industries",
    liveUrl: "https://labour-hiring-platform-for-small-sc.vercel.app",
    category: "Full-Stack Web",
    resumeRelevant: true,
    featured: true,
    visualConcept: "industrial workforce / marketplace / job matching",
    metrics: [
      "Production deployment serving active applicant flows",
      "Cloudinary-backed media pipeline with Firestore real-time sync",
    ],
    role: "Full-Stack Architect & Developer",
  },
  {
    id: "real-time-traffic-monitoring",
    title: "Real-Time Traffic Monitoring and Analysis",
    shortDescription:
      "Computer vision traffic intelligence platform tracking vehicular flow and streaming telemetry to a live web console.",
    fullDescription:
      "Developed a real-time vehicle detection and density analytics engine utilizing YOLO architectures and OpenCV. Telemetry data streams to a reactive web dashboard via Firebase, enabling rapid congestion evaluation and traffic pattern visualization.",
    technologies: ["Python", "YOLO", "OpenCV", "Firebase", "React.js", "JavaScript"],
    githubUrl: "https://github.com/gowthxm07/Real-Time-Traffic-Monitoring-and-Analysis",
    category: "Computer Vision & Edge",
    resumeRelevant: true,
    featured: true,
    visualConcept: "road / vehicles / computer vision / live monitoring",
    metrics: [
      "Reduced telemetry transmission latency to under 0.5s",
      "Real-time object classification and count tracking",
    ],
    role: "Computer Vision & Frontend Developer",
  },
  {
    id: "edge-video-cartoonifier",
    title: "Privacy-Preserving Edge Video Cartoonifier",
    shortDescription:
      "High-speed edge middleware utilizing YOLOv8 and OpenCV to dynamically stylize and anonymize sensitive background video streams.",
    fullDescription:
      "Engineered edge-compatible computer vision middleware that isolates human subjects and dynamically applies anonymizing cartoonification filters to background video feeds in real time. Designed for high privacy environments without compromising stream frame rates.",
    technologies: ["Python", "YOLOv8", "OpenCV", "React.js", "JavaScript"],
    githubUrl: "https://github.com/gowthxm07/Privacy-Preserving-Edge-Video-Cartoonifier",
    category: "Computer Vision & Edge",
    resumeRelevant: true,
    featured: true,
    visualConcept: "camera / video processing / privacy / edge computing",
    metrics: [
      "78% faster execution speeds achieved via masked bilateral filtering",
      "Zero-latency edge processing integrated with React analytics",
    ],
    role: "Computer Vision Engineer",
  },
  {
    id: "shree-labels-corporate",
    title: "Shree Labels Corporate Commercial Platform",
    shortDescription:
      "Production commercial web application for an industrial label manufacturing company deployed on Vercel.",
    fullDescription:
      "Engineered and deployed a production web presence for Shree Labels to showcase product catalogs, industrial specifications, and client inquiry pipelines. Built for speed, high-contrast readability, and responsive client accessibility.",
    technologies: ["React.js", "Firebase", "Vercel", "HTML5", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/gowthxm07/Shree-Labels-Website",
    liveUrl: "https://shree-labels-website.vercel.app",
    category: "Full-Stack Web",
    resumeRelevant: true,
    featured: true,
    visualConcept: "commercial manufacturing / labels / business website",
    metrics: [
      "Production commercial deployment on Vercel",
      "Interactive industrial catalog with Firebase data integration",
    ],
    role: "Full-Stack Web Developer",
  },
  {
    id: "smart-home-automation-jev",
    title: "Smart Home Automation Using Jev",
    shortDescription:
      "IoT system orchestrating connected home peripherals with rule-based automated decision making.",
    fullDescription:
      "Created an automation framework to interconnect domestic sensor feeds, appliance states, and programmatic triggers. Focuses on minimal power consumption, resilient local-network communication, and fast state propagation.",
    technologies: ["TypeScript", "Node.js", "IoT Protocols", "REST APIs"],
    githubUrl: "https://github.com/gowthxm07/Smart-Home-Automation-Using-Jev",
    category: "IoT & Automation",
    resumeRelevant: false,
    featured: false,
    visualConcept: "smart home / connected devices / AI decision making",
    metrics: [
      "Low-overhead device orchestration daemon",
      "Responsive sensor-to-action event loop",
    ],
    role: "Systems & IoT Developer",
  },
];
