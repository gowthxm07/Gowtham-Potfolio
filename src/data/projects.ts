import { Project } from "@/types";

export const projectsData: Project[] = [
  {
    id: "ai-smart-receptionist",
    title: "AI-Powered Smart Receptionist Platform",
    shortDescription:
      "Autonomous conversational receptionist platform automating appointment bookings with local STT/TTS runtimes and deterministic dialogue routing.",
    fullDescription:
      "A multi-tenant receptionist platform designed to handle inbound visitor and call interactions autonomously. Features modular local speech processing (Whisper.cpp and Piper TTS), deterministic fast intent routing (< 2ms), local Ollama LLM fallback, session isolation, and transactional PostgreSQL appointment booking.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Express",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Ollama (llama3.2)",
      "Whisper.cpp",
      "Piper TTS",
      "REST APIs",
    ],
    githubUrl: "https://github.com/gowthxm07/AI-powered-receptionist-platform",
    category: "AI / Machine Learning",
    resumeRelevant: true,
    featured: true,
    visualConcept: "Phone Ingest → Voice Waveform → Ollama Core → PostgreSQL → Appointment Machine",
    metrics: [
      "Deterministic engine latency: < 2ms (< 80ms DB tools)",
      "Speech runtimes: Whisper STT ~1.4s | Piper TTS ~1.6s",
      "Total deterministic voice roundtrip: ~2.4s – 4.5s",
      "Session isolation & multi-tenant architecture",
    ],
    role: "Full-Stack AI Developer",
  },
  {
    id: "real-time-traffic-monitoring",
    title: "Real-Time Traffic Monitoring & Density Analytics",
    shortDescription:
      "High-speed computer vision pipeline utilizing YOLOv8 and OpenCV to detect, track multi-class vehicular traffic, and stream real-time telemetry to Firebase Firestore.",
    fullDescription:
      "Engineered an end-to-end computer vision and traffic intelligence system. Ingests 640x480 video streams with OpenCV, executes real-time vehicle detection via YOLOv8 Nano, tracks multi-class trajectories (cars, buses, trucks, motorcycles, bicycles), calculates 10-frame rolling density metrics and dynamic signal clearance intervals (1s/3s/7s), detects potential collisions via bounding box IOU analysis (> 0.5), and streams live logs to Cloud Firestore for web dashboard telemetry.",
    technologies: [
      "Python",
      "OpenCV",
      "YOLOv8 Nano (yolov8n.pt)",
      "YOLOv8 Tracking (ByteTrack)",
      "Firebase Admin SDK",
      "Cloud Firestore",
      "React.js",
      "Chart.js",
    ],
    githubUrl: "https://github.com/gowthxm07/Real-Time-Traffic-Monitoring-and-Analysis",
    category: "Computer Vision & Edge",
    resumeRelevant: true,
    featured: true,
    visualConcept: "Highway Corridor → Video Ingest (640x480) → YOLOv8 Detection → 3D Bounding Boxes → Cloud Firestore",
    metrics: [
      "Inference & pipeline: 640x480 @ 30 FPS with YOLOv8 Nano",
      "Multi-class MOT tracking: Car, Bus, Truck, Motorcycle, Bicycle",
      "Dynamic clearance: 1s (Low < 5) | 3s (Med 5-8) | 7s (High >= 9)",
      "Safety telemetry: Bounding box IOU collision detection (> 0.5)",
    ],
    role: "Computer Vision & Full-Stack Developer",
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
