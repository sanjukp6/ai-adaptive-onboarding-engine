# 🌉 SkillBridge — AI Adaptive Onboarding Engine

> **Resume in. Role-ready out. Zero guesswork.**

SkillBridge analyses a candidate's resume against a job description, identifies precise skill gaps, maps prerequisite dependencies, and generates a prioritised learning roadmap — with full reasoning transparency at every step.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **Gap Scoring Algorithm** | Weighted gap × importance scoring with automatic priority ranking |
| **Prerequisite Graph** | DAG-based skill dependency resolution — no skill is recommended out of order |
| **Reasoning Trace** | Every recommendation includes a human-readable "why" explanation |
| **Three Demo Personas** | Priya (Healthcare), Arjun (Tech), Rahul (Business) — instant results, zero API calls |
| **Cross-Domain** | Works for tech, ops, healthcare, business — any role transition |
| **Time Saved Metric** | Estimates onboarding hours saved based on existing skill coverage |
| **Live Upload** | Paste or drag-drop real resumes and JDs for instant analysis |

---

## 🏗️ Architecture

```
┌─────────────┐    ┌──────────────┐    ┌────────────────┐
│  Resume      │───▶│  Skill       │───▶│  Gap Scoring   │
│  Parser      │    │  Extractor   │    │  Algorithm     │
└─────────────┘    └──────────────┘    └───────┬────────┘
                                               │
┌─────────────┐    ┌──────────────┐    ┌───────▼────────┐
│  Learning    │◀───│  DAG-based   │◀───│  Prerequisite  │
│  Roadmap     │    │  Ordering    │    │  Graph Builder │
│  + Reasoning │    │              │    │                │
└─────────────┘    └──────────────┘    └────────────────┘
```

### Core Modules

| Module | File | Purpose |
|---|---|---|
| Gap Analyser | `src/lib/gapAnalyzer.ts` | Calculates skill gaps, match %, time saved |
| Skill Graph | `src/lib/skillGraph.ts` | Builds prerequisite DAG and orders learning path |
| Course Mapper | `src/lib/courseMapper.ts` | Maps skills to recommended courses |
| Demo Data | `src/lib/demoData.ts` | Pre-computed personas for instant demos |
| Types | `src/lib/types.ts` | All TypeScript interfaces |

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Install & Run
```bash
git clone https://github.com/sharathtgowda11-bit/AI-Adaptive-Onboarding-Engine.git
cd AI-Adaptive-Onboarding-Engine
npm install
npm run dev
```
Open **http://localhost:5173** in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🐳 Docker

```bash
# Build and run
docker compose up --build

# Access at http://localhost:3000
```

Or manually:
```bash
docker build -t skillbridge .
docker run -p 3000:80 skillbridge
```

---

## 📁 Project Structure

```
├── src/
│   ├── App.tsx                 # Main application (landing + dashboard)
│   ├── components/
│   │   ├── UploadZone.tsx      # Resume/JD drag-drop upload
│   │   ├── SkillGraph.tsx      # Interactive skill dependency graph
│   │   ├── RadarChart.tsx      # Skills radar visualisation
│   │   ├── LearningTimeline.tsx# Ordered learning pathway
│   │   └── ReasoningTrace.tsx  # "Why" explanation for each skill
│   └── lib/
│       ├── gapAnalyzer.ts      # Core gap scoring algorithm
│       ├── skillGraph.ts       # DAG builder + topological sort
│       ├── courseMapper.ts     # Skill → course mapping
│       ├── demoData.ts         # Pre-computed demo personas
│       └── types.ts            # TypeScript interfaces
├── Dockerfile                  # Multi-stage build (Node → Nginx)
├── docker-compose.yml          # One-command deployment
├── nginx.conf                  # SPA-ready Nginx config
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🧪 Demo Personas

| Persona | Transition | Match % |
|---|---|---|
| 🏥 **Priya Sharma** | Staff Nurse → Hospital Administrator | 18% |
| 💻 **Arjun Kumar** | Software Engineer → DevOps Engineer | 34% |
| 📊 **Rahul Mehta** | Marketing Executive → Product Manager | 28% |

Each persona includes pre-computed gaps, learning paths, and reasoning traces — loads instantly with zero API calls.

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS with custom design system
- **Animations:** Framer Motion
- **Charts:** Recharts + Victory
- **Graph:** React Force Graph 2D
- **Deployment:** Docker + Nginx

---

## 📊 IBM Case Study Reference

> IBM reduced employee ramp-up time by **50%** using AI-personalized onboarding.
> SkillBridge makes this approach open-source and accessible to everyone.

---

## 📄 License

MIT License — free for personal and commercial use.

---

Built with ❤️ by [Sharath T Gowda](https://github.com/sharathtgowda11-bit)
