<div align="center">

# ⚡ SkillBridge

### AI-Adaptive Onboarding Engine

**Resume in. Role-ready out. Zero guesswork.**

<br/>

> 📊 IBM reduced employee ramp-up time by **50%** using AI-personalized onboarding.
> SkillBridge makes this open-source and available to everyone — starting from **day zero**, before any HR system has data on you.

</div>

---

## 🔗 Live Demo

🌐 **https://ai-adaptive-onboarding-engine-omega.vercel.app/**

Try these demo personas instantly — no upload needed:

| # | Persona | Transition | Gaps Found | Time Saved |
|---|---------|-----------|-----------|-----------|
| 🏥 | **Priya Sharma** ⭐ | Staff Nurse → Hospital Administrator | 6 critical | 1.8 weeks |
| 💻 | **Arjun Kumar** | Software Engineer → DevOps Engineer | 5 critical | 2.4 weeks |
| 📊 | **Rahul Mehta** | Marketing Executive → Product Manager | 4 critical | 1.6 weeks |

> ⭐ **Start with Priya** — a nurse getting a completely different correct learning path proves true cross-domain scalability

---

## 🎯 The Problem

Corporate onboarding today uses **static, one-size-fits-all** curricula.

- A 10-year expert and a fresh graduate sit through the **same 8-week program**
- Experienced hires **waste time** on skills they already have
- Beginners are **overwhelmed** by advanced modules they are not ready for
- **No existing open-source tool** solves this from day zero — before any HR system has employee data

**SkillBridge solves this.** Upload a resume and a job description. Get a personalized, prerequisite-ordered learning roadmap with full reasoning transparency in seconds.

---

## 🧠 How It Works

```
  Resume Text                    Job Description
      │                                │
      ▼                                ▼
┌─────────────────────────────────────────────────┐
│           STEP 1 — SKILL EXTRACTION             │
│   Extracts skills with proficiency scores 1-5   │
│   Detects both explicit and implicit skills     │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│         STEP 2 — SEMANTIC SKILL MATCHING        │
│   Maps skills to O*NET taxonomy                 │
│   Handles "Python" matching "Django" correctly  │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│           STEP 3 — GAP SCORING ENGINE           │
│   priority_score = gap × importance             │
│   Tags: COVERED / PARTIAL / CRITICAL / MISSING  │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│        STEP 4 — DAG PREREQUISITE GRAPH          │
│   50+ skills as directed acyclic graph          │
│   Kahn's topological sort — correct order       │
│   Cannot recommend Kubernetes before Docker     │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│       STEP 5 — ADAPTIVE PATH GENERATION         │
│   Shortest prerequisite-respecting path         │
│   Skips skills candidate already has            │
│   Maps each node to real course from catalog    │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│          STEP 6 — REASONING TRACE               │
│   Every module gets a "Why?" explanation        │
│   Cites resume evidence + JD evidence           │
│   Shows what each module unlocks next           │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│          STEP 7 — VISUAL DASHBOARD              │
│   ReactFlow interactive DAG graph               │
│   Recharts radar: your profile vs required      │
│   Learning timeline with platform badges        │
│   Expandable reasoning accordion per module     │
└─────────────────────────────────────────────────┘
```

---

## 🔬 The Core Algorithm — Original Implementation

### Gap Scoring Formula

```typescript
// Original scoring formula — gap × importance
priority_score = (jd_required_level - candidate_level) * importance;

// Example:
// Docker: candidate=0, required=4, importance=0.95
// priority_score = 4 * 0.95 = 3.80 → CRITICAL, ranked #1
```

### Prerequisite Graph (DAG)

```typescript
// Real-world skill dependencies — 50+ skills
const SKILL_PREREQUISITES = {
  "Kubernetes": ["Docker", "Linux", "Networking Basics"],
  "Docker":     ["Linux"],
  "CI/CD":      ["Git", "Docker"],
  "Airflow":    ["Python", "Docker"],
  "MLOps":      ["Docker", "Python", "Machine Learning"],
  // 50+ more skills across tech, ops, healthcare, business
}

// Kahn's Algorithm guarantees correct learning order
// Candidate cannot receive Kubernetes before completing Docker — ever
```

### Zero Hallucination Design

```typescript
// Every recommendation comes from a FIXED catalog
// The algorithm NEVER invents course names
// 60+ real courses with verified URLs on Udemy / Coursera / Educative

// If skill not in catalog → falls back to LinkedIn Learning search URL
// Never a fabricated course name — grounding guaranteed
```

---

## 🏗️ Architecture

```
ai-adaptive-onboarding-engine/
│
├── src/
│   ├── lib/
│   │   ├── skillGraph.ts        ← DAG + Kahn's topological sort (ORIGINAL)
│   │   ├── gapAnalyzer.ts       ← Gap scoring: priority = gap × importance
│   │   ├── reasoningEngine.ts   ← Per-module reasoning trace generator
│   │   ├── courseCatalog.ts     ← 60+ real courses, zero hallucination
│   │   ├── domainDetector.ts    ← Cross-domain transition detection
│   │   ├── demoData.ts          ← 3 pre-computed demo personas
│   │   └── types.ts             ← TypeScript interfaces
│   │
│   ├── components/
│   │   ├── SkillGraph.tsx        ← ReactFlow interactive DAG visualization
│   │   ├── RadarChart.tsx        ← Recharts: your skills vs required
│   │   ├── LearningTimeline.tsx  ← Ordered course list with platform badges
│   │   ├── ReasoningTrace.tsx    ← Expandable "Why?" accordion
│   │   └── UploadZone.tsx        ← Drag-and-drop resume/JD input
│   │
│   ├── App.tsx                  ← 3-page flow: Landing → Processing → Dashboard
│   ├── index.css                ← Design system + Tailwind CSS 4
│   └── main.tsx                 ← Entry point
│
├── Dockerfile                   ← Production build with Nginx
├── docker-compose.yml           ← One-command local deployment
├── nginx.conf                   ← SPA routing configuration
├── .env.example                 ← Environment variable template
└── package.json                 ← All dependencies
```

---

## 🛠️ Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Language | TypeScript | 5.9 | Type-safe development |
| Framework | React | 19.2 | Component architecture |
| Build Tool | Vite + viteSingleFile | 7.2 | Single-file deployable build |
| Styling | Tailwind CSS | 4.1 | Utility-first design system |
| Animations | Framer Motion | 12.3 | Page transitions + micro-animations |
| Graph Visual | @xyflow/react | 12.10 | Interactive DAG rendering |
| Charts | Recharts | 3.8 | Skills radar visualization |
| Icons | Lucide React | 0.577 | Consistent icon system |
| Container | Docker + Nginx | latest | Production deployment |
| Hosting | Vercel | — | Live demo |

> **No external LLM API required.** All intelligence runs client-side in the browser — zero API costs, zero latency, zero hallucination risk from generative models.

---

## 📊 Judging Criteria — Full Coverage

| Criterion | Weight | Our Implementation |
|----------|--------|-------------------|
| Technical Sophistication | 20% | Original DAG algorithm, Kahn's topological sort, cosine similarity matching, gap × importance priority formula |
| Communication & Documentation | 20% | This README, architecture diagram, inline code comments, 5-slide deck, demo video |
| Grounding & No Hallucinations | 15% | Fixed 60-course catalog, zero LLM-generated names, all URLs verified manually |
| User Experience | 15% | ReactFlow interactive graph, animated 5-step processing, glassmorphism design, mobile responsive |
| Reasoning Trace | 10% | Every module has a visible "Why?" panel — cites exact gap, resume evidence, JD evidence |
| Product Impact | 10% | Time Saved metric: 1.6–2.4 weeks saved per persona vs standard onboarding |
| Cross-Domain Scalability | 10% | Tech + Healthcare + Business roles — same engine, completely different correct paths |

---

## 🗂️ Datasets & Models Used

### Datasets

| Dataset | Source | Usage in Project |
|---------|--------|-----------------|
| O*NET 28.0 Database | onetcenter.org | Skill taxonomy and occupational data — basis for prerequisite graph design |
| Kaggle Resume Datasets | nehaanbhawal/resume-dataset | Resume structure validation and extraction testing |
| Kaggle Jobs Dataset | kshitizregmi/jobs-and-job-description | JD structure validation and required skill testing |

### Algorithms & Libraries

| Algorithm / Library | Usage |
|--------------------|-------|
| Kahn's Topological Sort | Prerequisite ordering — original TypeScript implementation in `skillGraph.ts` |
| Directed Acyclic Graph (DAG) | Skill dependency modelling — 50+ skills, custom adjacency list structure |
| Cosine Similarity | Semantic skill matching — resume skill vs JD skill family detection |
| ReactFlow Layout Engine | Visual prerequisite graph with layer-based automatic positioning |
| Recharts Radar | Skill gap comparison — candidate profile vs role requirement overlay |

---

## 📈 Results & Metrics

| Metric | Value | Measurement Method |
|--------|-------|-------------------|
| Redundant modules eliminated | ~42% average | Covered skills excluded from generated path |
| Time saved vs standard onboarding | 1.6 – 2.4 weeks | Covered skills × 8h ÷ 40h per week |
| Skill extraction coverage | 50+ skills | Tech + Ops + Healthcare + Business domains |
| Course catalog size | 60+ courses | Real courses with verified URLs |
| Cross-domain roles tested | 3 domains | Tech / Healthcare / Business |
| Prerequisite relationships | 40+ edges | Manually validated DAG |

---

## 🚀 Run Locally

### With Docker — Recommended for judges

```bash
# Clone the repo
git clone https://github.com/sanjukp6/ai-adaptive-onboarding-engine.git
cd ai-adaptive-onboarding-engine

# One command — builds and runs everything
docker-compose up

# Open http://localhost:3000
```

### Without Docker

```bash
# Clone and install dependencies
git clone https://github.com/sanjukp6/ai-adaptive-onboarding-engine.git
cd ai-adaptive-onboarding-engine
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Build for production

```bash
npm run build
# Output in dist/ — single self-contained HTML file (viteSingleFile plugin)
```

### Environment Variables

```bash
# Copy the example file
cp .env.example .env

# No API keys required — project runs fully client-side
# See .env.example for reference
```

---

## 🌐 Deployment

The live demo is deployed on **Vercel** with automatic builds on every push to `main`.

🔗 **Live URL:** https://ai-adaptive-onboarding-engine-omega.vercel.app/

The Docker production build uses **Nginx** to serve the Vite single-file output with proper SPA routing configured in `nginx.conf`.

---

## 👥 Team

Built with 💜 for the **ARTPARK CodeForge Hackathon** — AI-Adaptive Onboarding Engine Challenge.

| Name | Role | Email |
|------|------|-------|
| Sanju K P | Team Lead | sanjukp2005@gmail.com |
| Sriganesh H S | Developer | sriganeshhs1014@gmail.com |
| Sharath T G | Developer | sharathtgowda11@gmail.com |
| Syed Shakib Ali | Developer | shakibsyed603@gmail.com |

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

<div align="center">

**SkillBridge — Resume in. Role-ready out. Zero guesswork.**

🚀 [Live Demo](https://ai-adaptive-onboarding-engine-omega.vercel.app/) • 📧 [Contact Team](mailto:sanjukp2005@gmail.com) • Built for ARTPARK CodeForge Hackathon

</div>
