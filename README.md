# Gowtham Hari S — Engineering Portfolio

A cinematic, scroll-driven engineering portfolio combining interactive 3D visualizations, verified technical project narratives, responsive HUD interfaces, and production software architecture.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r174-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---

## ✨ Highlights

- **Scroll-Driven Storytelling**: Continuous normalized narrative timeline mapping mouse-wheel and touch gestures directly to 3D spatial coordinates and overlay dissolves.
- **Cinematic 3D Visualizations**: Custom procedural Three.js / React Three Fiber scene components representing each system's architectural topology.
- **Smooth Section Transitions**: Measured transit envelopes across all major sections preventing visual clipping or sudden jumps.
- **Continuous Project Transitions**: Five-phase spatial narrative lifecycle (**Far Emergence → Approach → Hero Dwell → Exit Past Camera → Clear Stage**) ensuring fluid project-to-project continuity.
- **Responsive Desktop & Mobile Composition**: Tailored layouts delivering prominent left/right split staging on desktop (1920×1080) and centered, safe-area-padded glass cards on mobile devices (390×844, 430×932, 360×800) with **zero horizontal overflow**.
- **Interactive Project Navigation**: Direct switcher tabs and right-hand telemetry timeline indicators enabling seamless jumping between chapters.
- **Technical Annotations & Telemetry**: Engineering-grounded telemetry tags, architecture pipeline indicators, and verified metrics for every project.
- **Direct Resume Access & Contact**: Embedded ATS resume viewer and client-side contact dispatch with EmailJS and automatic direct mail client fallback.

---

## 👤 About

**Gowtham Hari S**  
Computer Science & Engineering Undergraduate  
**Amrita Vishwa Vidyapeetham** (Aug 2023 – May 2027)  
- **Cumulative GPA**: 8.12 / 10  
- **Location**: Karur, Tamil Nadu, India  
- **Email**: [gowthamsengodan7@gmail.com](mailto:gowthamsengodan7@gmail.com)  
- **GitHub**: [github.com/gowthxm07](https://github.com/gowthxm07)  
- **LinkedIn**: [linkedin.com/in/gowtham1310](https://www.linkedin.com/in/gowtham1310/)

---

## 🏛️ Portfolio Structure

The portfolio is structured into eight progressive chapters:

| Index | Section | Focus & Description |
| :---: | :--- | :--- |
| **01** | **Intro** | Atmospheric hero terminal introducing focal domains (AI/ML, Computer Vision, High-Performance Systems), academic credentials, and interactive scroll cue. |
| **02** | **Identity** | Verified credentials, competitive programming rank (LeetCode Knight, 1868 peak), leadership responsibilities, and verified portrait hologram. |
| **03** | **Projects** | Six verified engineering systems presented with real-time 3D spatial anchors, system pipeline flows, telemetry data, and repository links. |
| **04** | **Academics** | Academic progression at Amrita Vishwa Vidyapeetham, GPA 8.12, core coursework (DSA, OS, DBMS, Networks, ML), and campus placement mentorship. |
| **05** | **Skills** | Recruiter-ready technical matrix categorized across Languages, Systems, Frameworks, AI/ML, Cloud/DB, and Developer Tooling. |
| **06** | **Achievements** | Competitive coding milestones (900+ solved, top 4.96% globally), GFG campus leadership, and competitive hackathon placements. |
| **07** | **Official Resume** | Single-page ATS documentation preview with one-click PDF viewing and direct download actions. |
| **08** | **Connect With Me** | Communication console featuring an interactive contact form, direct mail routing, and verified social links. |

---

## 🚀 Featured Engineering Projects

### 1. AI-Powered Smart Receptionist Platform
*Full-stack conversational receptionist platform automating multi-tenant appointment scheduling with local runtime models and deterministic state management.*

- **Technologies**: Next.js, React, TypeScript, Express, PostgreSQL, Prisma, Ollama, Whisper.cpp, Piper TTS, Docker
- **Pipeline Architecture**:
  $$\text{Voice Input} \longrightarrow \text{Speech Recognition (Whisper.cpp)} \longrightarrow \text{Dialogue Engine } (< 2\text{ms}) \longrightarrow \text{Database/Session (Prisma + Postgres)} \longrightarrow \text{LLM Reasoning (Ollama)} \longrightarrow \text{Speech Synthesis (Piper TTS)}$$
- **Key Capabilities**: Session isolation across multiple business tenants, local offline speech transcription and synthesis, structured appointment state machine, and atomic PostgreSQL persistence.

### 2. Real-Time Traffic Monitoring & Analysis
*Edge computer vision pipeline detecting vehicles, estimating congestion density, and identifying anomalous traffic incidents in real time.*

- **Technologies**: Python, OpenCV, Ultralytics YOLOv8 Nano, Firebase Firestore
- **Pipeline Architecture**:
  $$\text{Video Ingest (640}\times\text{480)} \longrightarrow \text{Frame Preprocessing} \longrightarrow \text{YOLOv8 Nano Inference} \longrightarrow \text{Object Tracking} \longrightarrow \text{Density \& Incident Heuristics} \longrightarrow \text{Firestore Sync}$$
- **Key Capabilities**: Multi-class vehicle detection, zone-based speed/trajectory tracking, heuristic collision detection, and cloud-synced traffic telemetry.

### 3. Privacy-Preserving Edge Video Cartoonifier
*Classical deterministic computer-vision pipeline providing local video stylization and identity privacy at edge frame rates.*

- **Technologies**: Python, OpenCV, Haar Cascade, MOG2 Background Subtraction, Bilateral Filtering, Color Quantization, Adaptive Thresholding, MJPEG Streaming
- **Pipeline Architecture**:
  $$\text{Webcam/MP4} \longrightarrow \text{Face Detection / Anonymization} \longrightarrow \text{Dual-Path (Structure + Color)} \longrightarrow \text{Bitwise Fusion} \longrightarrow \text{Low-Latency MJPEG Stream}$$
- **Key Capabilities**: Zero-cloud edge processing, face obfuscation for privacy compliance, adaptive edge-preserving bilateral smoothing, and deterministic rendering without deep-learning inference overhead.

### 4. LaborLink — Industrial Labor Marketplace
*Two-sided marketplace connecting daily-wage and skilled industrial workers with small-scale manufacturing facilities.*

- **Technologies**: React, React Router, Firebase Authentication, Firestore, Firebase Storage, Cloudinary, Google Gemini 2.5 Flash, Leaflet / React-Leaflet, Vercel, Jest
- **Pipeline Architecture**:
  $$\text{User/Factory Role Ingest} \longrightarrow \text{Firebase Auth} \longrightarrow \text{Firestore Profile} \longrightarrow \text{Deterministic Match Engine} \longrightarrow \text{Fairness Filter} \longrightarrow \text{Gemini Reasoning Assistant} \longrightarrow \text{Mutual Unlock}$$
- **Key Capabilities**: Role-based access control (Worker vs. Factory), privacy-preserving protected-attribute sanitization, geo-spatial discovery via Leaflet, deterministic skill scoring with Gemini assistant fallback, and 15 automated Jest unit tests.

### 5. Shree Labels Corporate Website
*High-performance, responsive corporate showcase and quotation pipeline for an industrial printing manufacturer based in Karur, Tamil Nadu.*

- **Technologies**: HTML5, CSS3, JavaScript ES6 Modules, Firebase Firestore, EmailJS, Google Maps API, Vercel
- **Live Production**: [shree-labels-website.vercel.app](https://shree-labels-website.vercel.app/)
- **Key Capabilities**: Native zero-bundle web architecture, five-substrate product specimen catalogue (Cotton Tape, Taffeta, Satin, Custom, Offset Printed), international compliance showcase (OEKO-TEX® Standard 100, Sedex), real-time customer review board powered by Firestore `onSnapshot` with anonymous authentication, and direct commercial quotation dispatch via EmailJS.

### 6. HomeMind — Context-Aware Multi-Device Smart Home Automation
*Software simulation platform and decision engine evaluating context-aware home automation policies and multi-device dispatch.*

- **Technologies**: Next.js, React, TypeScript, Tailwind CSS, Vitest, TypeSafe Jev API, local Ollama
- **Key Capabilities**: Complete software simulation model managing 18 simulated smart devices across 5 rooms and 6 categories (Lighting, Climate, Media, Appliances, Security, Sensors). Features a provider-neutral decision engine with structured execution traces, deterministic policy dispatch, a 36-scenario test evaluation dataset, and full Vitest regression testing.
- *Notice: HomeMind is an algorithmic software simulation and decision architecture; it does not connect to physical IoT hardware (e.g., Zigbee, MQTT, ESP32).*

---

## 🛠️ Technical Stack

```
Frontend:           React 19, Next.js 15, TypeScript 5.7, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
3D & Graphics:      Three.js (r174), React Three Fiber, React Three Drei, Framer Motion
Backend & APIs:     Node.js, Express, PostgreSQL, Prisma ORM, Firebase Authentication, Firestore, REST APIs
AI & ML:            Ollama, Local LLM Integration, Whisper.cpp, Piper TTS, Transformers, PyTorch, Scikit-learn
Computer Vision:    OpenCV, Ultralytics YOLOv8, Object Tracking, Haar Cascade, MOG2, Bilateral Filtering
Tooling & Testing:  Git, GitHub, Docker, Vitest, Jest, Vercel, Cloudinary, Postman
```

---

## 🏆 Key Achievements

- **LeetCode Knight [1868 Peak Rating]**: Ranked in the **top 4.96% globally** with **900+ problems solved** across Dynamic Programming, Graph Theory, and Advanced Data Structures.
- **DSA & Placement Preparation Team Lead**: Led student technical development at GeeksforGeeks Campus Body (Apr 2025 – Jun 2026), orchestrating algorithm workshops and technical mock interviews.
- **DeltaBuild 2026**: Winner (1st Place).
- **CodeRoyale**: Runner-Up (2nd Place).
- **SRM HackRush 1.0**: Finalist.
- **Hacktide**: Finalist.

---

## 🎨 Design Philosophy & UX Architecture

The portfolio implements an aerospace/terminal-inspired dark aesthetic (`#030705`) accented by emerald and cyan phosphor tones:
- **Cinematic 3D Depth**: 3D scene elements physically enter from deep fog (`Z = -10.0`), approach the hero focal station (`Z = 0.15`), and glide forward past the camera (`Z = 5.2`) on exit.
- **Subtle Restrained Parallax**: Pointer tracking is bounded to prevent disorientation, pausing automatically during high-velocity transitions.
- **Deterministic Overlay Timing**: Custom cubic easing curves (`smoothStep`) govern content visibility, providing smooth readability without overlapping text.
- **Mobile First-Class Citizen**: Dedicated mobile compositions ensure that 3D geometries scale to `0.65` and anchor centered as subtle backdrops, while UI cards have full safe-area clearance and vertical scrollability.

---

## 💻 Running Locally

### Prerequisites
- **Node.js**: `v18.18.0` or higher (Node 20+ recommended)
- **npm**: `v9.0.0` or higher

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/gowthxm07/Gowtham-Potfolio.git

# 2. Navigate to project root
cd Gowtham-Potfolio

# 3. Install dependencies
npm install

# 4. Launch development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts
- `npm run dev`: Starts Next.js development server with hot reloading.
- `npm run type-check`: Performs strict TypeScript type checking (`tsc --noEmit`).
- `npm run build`: Compiles production build.
- `npm run start`: Runs compiled production application locally.
- `npm run lint`: Executes Next.js linting checks.

---

## ⚙️ Environment Variables

The portfolio includes an automatic fallback to native mail clients if external services are unconfigured. To enable direct in-browser EmailJS dispatch:

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Populate the required keys from your [EmailJS Dashboard](https://www.emailjs.com/):
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   NEXT_PUBLIC_CONTACT_EMAIL=gowthamsengodan7@gmail.com
   ```
*Note: Real secrets must never be committed to Git. Provide actual values through `.env.local` locally and through project environment settings on Vercel.*

---

## 🧪 Quality & Verification

Every release is validated against strict verification criteria:

- **TypeScript Compilation**: Passed with 0 errors (`npm run type-check`).
- **Production Build**: Passed with 0 errors (`npm run build`).
- **Viewport Layout Integrity**:
  - `1920 × 1080` (Desktop): Verified left/right split staging and camera composition.
  - `430 × 932` (Mobile Pro Max): Verified centered cards, zero collisions, zero overflow.
  - `390 × 844` (Mobile Standard): Verified header clearance, tab bar visibility, zero overflow.
  - `360 × 800` (Mobile Compact): Verified safe padding and card scrolling bounds.
- **Horizontal Overflow**: `document.documentElement.scrollWidth === window.innerWidth` across all test viewports.
- **Runtime Integrity**: 0 console errors, 0 WebGL warnings, and clean hydration.

---

## 🚀 Deployment

The portfolio is architected for deployment on [Vercel](https://vercel.com/):

1. Push repository to GitHub.
2. Import project into Vercel dashboard.
3. Configure environment variables (`NEXT_PUBLIC_EMAILJS_*`).
4. Trigger production deployment.

---

## 📬 Contact & Channels

- **Gowtham Hari S**
- **Email**: [gowthamsengodan7@gmail.com](mailto:gowthamsengodan7@gmail.com)
- **GitHub**: [github.com/gowthxm07](https://github.com/gowthxm07)
- **LinkedIn**: [linkedin.com/in/gowtham1310](https://www.linkedin.com/in/gowtham1310/)
