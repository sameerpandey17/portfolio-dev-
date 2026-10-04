// ============================================================
// PORTFOLIO CONTENT: SINGLE SOURCE OF TRUTH
// All facts, dates, links & technical descriptions
// ============================================================

export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  timezone: string;
  timeZoneId: string;
  status: string;
  positioning: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  resumeUrl: string;
  avatarUrl: string;
}

export const PERSONAL: PersonalInfo = {
  name: "Sameer Pandey",
  role: "AI & Backend Developer · Student",
  location: "Pune, India",
  timezone: "IST (UTC+5:30)",
  timeZoneId: "Asia/Kolkata",
  status: "Open to internships",
  positioning:
    "2nd-year B.E. student in Artificial Intelligence & Data Science at DYPIT Pune. Building clean backend APIs, AI agent workflows, and web applications with Python, FastAPI, and React.",
  email: "sameerpandey17nov@gmail.com",
  github: "https://github.com/sameerpandey17",
  linkedin: "https://www.linkedin.com/in/sameer-pandey17/",
  twitter: "https://x.com/strangesam17",
  resumeUrl: "/resume.pdf",
  avatarUrl: "/sameer-hd.jpg",
};

export interface ProjectStory {
  problem: string;
  decision: string;
  result: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  outcome: string;
  roleSentence: string;
  tags: string[];
  story: ProjectStory;
  architectureSvgType: "visionlink" | "aivoa" | "calorupee" | "nutrisync";
  githubUrl: string;
  liveUrl: string | null;
  featured: boolean;
  benchmarkNote?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "visionlink",
    title: "VisionLink",
    year: "2026",
    outcome:
      "Real-time emotion detection over WebSockets: separates MediaPipe processing from the FastAPI server.",
    roleSentence:
      "Built the multiprocessing worker pipeline, Redis Pub/Sub message broker, and WebSocket stream.",
    tags: ["FastAPI", "Redis Pub/Sub", "MediaPipe", "WebSockets", "PostgreSQL", "Nginx"],
    story: {
      problem:
        "Running MediaPipe's landmark detection directly inside FastAPI's async event loop caused CPU starvation. Every frame stalled concurrent network connections, causing socket timeouts and jitter.",
      decision:
        "Offloaded model inference to dedicated worker processes. Redis Pub/Sub serves as the high-throughput message bus: inference workers publish landmark coordinates while FastAPI WebSocket subscribers broadcast frames to connected clients.",
      result:
        "Separated CPU-bound compute from I/O-bound networking. Concurrent WebSocket clients receive frame coordinates with non-blocking event loops, with session persistence in PostgreSQL and Nginx handling reverse proxying.",
    },
    architectureSvgType: "visionlink",
    githubUrl: "https://github.com/sameerpandey17/VisionLink",
    liveUrl: null,
    featured: true,
    benchmarkNote: "Decoupled pipeline keeps WebSocket connections responsive and free of event-loop stalls.",
  },
  {
    id: "aivoa",
    title: "AIVOA",
    year: "2026",
    outcome:
      "AI-powered deviation intake copilot using LangGraph with automated provider failover.",
    roleSentence:
      "Built the LangGraph workflow, document extraction pipeline, and React frontend.",
    tags: ["LangGraph", "Groq", "FastAPI", "React", "Docker Compose", "PostgreSQL"],
    story: {
      problem:
        "Single-LLM voice assistants stutter or disconnect entirely when API providers experience rate limits, latency spikes, or intermittent outages, breaking live conversation.",
      decision:
        "Built a stateful LangGraph supervisor graph that delegates to specialized sub-agents (memory, knowledge retrieval, and tool execution). Configured automated conditional failover routes: if primary inference drops, the graph transitions to the fallback model pool within the active turn.",
      result:
        "Zero-drop conversation resilience during provider failures. Graph-based state machine allows adding domain-specific agents as modular nodes without refactoring core routing.",
    },
    architectureSvgType: "aivoa",
    githubUrl: "https://github.com/sameerpandey17/deviation-bot",
    liveUrl: null,
    featured: true,
    benchmarkNote: "Automatic fallback to secondary LLM pool keeps sessions running if a provider drops.",
  },
  {
    id: "calorupee",
    title: "CaloRupee",
    year: "2026",
    outcome:
      "Budget meal planner generating Indian meal plans within tight daily rupee limits.",
    roleSentence:
      "Built the full-stack FastAPI & React app with dual-AI failover and nutrition tracking.",
    tags: ["Python", "FastAPI", "Dual-LLM Failover", "Nutrition API", "Pydantic"],
    story: {
      problem:
        "Commercial nutrition planners assume Western food datasets and high budgets (₹800+/day). Standard LLM generation hallucinated impossible caloric density and ignored local price realities for Indian students.",
      decision:
        "Created an optimization pipeline where dual LLMs propose Indian ingredient combinations under hard daily spending caps (e.g. ₹80–₹120/day). Every macro proposal is strictly parsed by Pydantic and verified against authentic food composition APIs before presentation.",
      result:
        "Eliminated macro hallucinations and delivered actionable, budget-constrained diet regimes. Automatic fallback between primary and secondary LLM APIs ensures request completion without client-side retries.",
    },
    architectureSvgType: "calorupee",
    githubUrl: "https://github.com/sameerpandey17/CaloRupee",
    liveUrl: null,
    featured: false,
    benchmarkNote: "Pydantic validation and food database verification prevent unrealistic calorie estimates.",
  },
  {
    id: "nutrisync",
    title: "NutriSync",
    year: "2026",
    outcome:
      "Reinforcement Learning environment in OpenAI Gym for sequential meal planning with shaped rewards. Deployed on Hugging Face with an interactive Gradio UI.",
    roleSentence:
      "Created the OpenAI Gym environment, 50-ingredient Indian food dataset, and deployed an interactive Gradio UI on Hugging Face.",
    tags: ["OpenAI Gym", "Reinforcement Learning", "Python", "Gradio", "Hugging Face", "OpenEnv"],
    story: {
      problem:
        "A naive reward function that only maximized caloric and protein totals triggered rapid reward hacking: the agent converged on consuming pure cooking oil and sugar at every step: mathematically optimal, practically useless.",
      decision:
        "Redesigned the objective function with multi-factor reward shaping: added a diversity penalty, micronutrient requirement floors, satiety decay, and a monotony penalty. Built an interactive Gradio visualizer to audit policy evolution over training episodes.",
      result:
        "The agent converged to healthy, culturally realistic meal sequences. Deployed on Hugging Face with an interactive Gradio UI so anyone can test and interact with policy trajectories in real time.",
    },
    architectureSvgType: "nutrisync",
    githubUrl: "https://github.com/sameerpandey17/nutrisync-openenv",
    liveUrl: null,
    featured: false,
    benchmarkNote: "Deployed on Hugging Face with an interactive Gradio UI and 50-ingredient Indian food dataset.",
  },
];

export interface TimelineEntry {
  period: string;
  title: string;
  roleOrOrg: string;
  description: string;
  badge?: string;
}

export const TIMELINE: TimelineEntry[] = [
  {
    period: "2025 – Present",
    title: "B.E. in Artificial Intelligence & Data Science",
    roleOrOrg: "Dr. D. Y. Patil Institute of Technology (DYPIT), Pune",
    description:
      "Second Year student | CGPA: 8.71 / 10.0. Core coursework: Data Structures & Algorithms, Database Systems, Computer Networks, Operating Systems, Artificial Intelligence.",
    badge: "Academic",
  },
  {
    period: "March 2026",
    title: "1st Place Winner: 3-Hour Impromptu Hackathon",
    roleOrOrg: "Campus Hackathon",
    description:
      "Won first place by independently building a full-stack college canteen pre-ordering system with real-time menu updates, admin workflows, and payment gateway integration.",
    badge: "1st Place",
  },
  {
    period: "2026",
    title: "Built VisionLink & AIVOA",
    roleOrOrg: "Real-Time Systems & AI Workflows",
    description:
      "Built VisionLink for real-time webcam emotion detection over WebSockets using FastAPI and MediaPipe. Developed AIVOA, an AI-powered deviation intake assistant using LangGraph, Groq, and React.",
    badge: "Projects",
  },
  {
    period: "2026",
    title: "Created NutriSync RL & CaloRupee",
    roleOrOrg: "Reinforcement Learning & Full-Stack",
    description:
      "Created NutriSync, an OpenAI Gym environment with shaped rewards for sequential meal planning, and CaloRupee, an AI budget meal planner with dual-provider failover.",
    badge: "Projects",
  },
  {
    period: "Ongoing",
    title: "Seeking Backend & AI Engineering Internships",
    roleOrOrg: "Pune, India · Open to Remote & Onsite",
    description:
      "Actively practicing core DSA, building with FastAPI and PostgreSQL, and exploring practical agent workflows.",
    badge: "Available Now",
  },
];

export type SkillLevel = "daily" | "project" | "learning";
export type SkillCategoryType = "backend" | "ai" | "tooling";

export interface SkillItemData {
  name: string;
  descriptor: string;
  icon: string;
  level: SkillLevel;
  projects: string[];
  category: SkillCategoryType;
}

export interface CapabilityCategoryInfo {
  number: string;
  key: SkillCategoryType;
  title: string;
  tagline: string;
  shortDesc: string;
}

export const CORE_STACK_ITEMS = [
  "Python",
  "TypeScript",
  "JavaScript",
  "React / Next.js",
  "FastAPI",
  "PostgreSQL",
  "LangGraph",
  "Git",
];

export const CAPABILITY_CATEGORIES: CapabilityCategoryInfo[] = [
  {
    number: "01",
    key: "backend",
    title: "Backend Systems",
    tagline: "APIS / DATABASES / INFRASTRUCTURE",
    shortDesc: "APIs, relational databases, and server pipelines.",
  },
  {
    number: "02",
    key: "ai",
    title: "AI & Agent Systems",
    tagline: "LLMS / AGENTS / REINFORCEMENT LEARNING",
    shortDesc: "Agent workflows, LLM integrations, and simulation environments.",
  },
  {
    number: "03",
    key: "tooling",
    title: "Product & Tooling",
    tagline: "FRONTEND / DEVOPS / WORKFLOW",
    shortDesc: "Frontend interfaces, container setups, and developer workflow.",
  },
];

export const SKILLS_DATA: SkillItemData[] = [
  // ── 01: Backend Systems (6 items) ──
  {
    name: "Python",
    descriptor: "Core language & scripting",
    icon: "python",
    level: "daily",
    projects: ["Everywhere"],
    category: "backend",
  },
  {
    name: "FastAPI",
    descriptor: "Async APIs & WebSockets",
    icon: "fastapi",
    level: "daily",
    projects: ["VisionLink", "AIVOA"],
    category: "backend",
  },
  {
    name: "PostgreSQL",
    descriptor: "Relational schema & indexes",
    icon: "postgresql",
    level: "project",
    projects: ["VisionLink", "AIVOA"],
    category: "backend",
  },
  {
    name: "SQLAlchemy",
    descriptor: "Async ORM & sessions",
    icon: "sqlalchemy",
    level: "project",
    projects: ["AIVOA", "NutriSync"],
    category: "backend",
  },
  {
    name: "Redis",
    descriptor: "Caching & basic pub/sub",
    icon: "redis",
    level: "learning",
    projects: ["VisionLink"],
    category: "backend",
  },
  {
    name: "Nginx",
    descriptor: "Reverse proxy & routing",
    icon: "nginx",
    level: "learning",
    projects: ["VisionLink"],
    category: "backend",
  },

  // ── 02: AI & Agent Systems (6 items) ──
  {
    name: "LangGraph",
    descriptor: "Stateful agent workflows",
    icon: "langgraph",
    level: "project",
    projects: ["AIVOA"],
    category: "ai",
  },
  {
    name: "LLM APIs",
    descriptor: "Groq & OpenAI structured outputs",
    icon: "llm apis",
    level: "project",
    projects: ["AIVOA", "CaloRupee"],
    category: "ai",
  },
  {
    name: "MediaPipe",
    descriptor: "Real-time pose & landmark inference",
    icon: "mediapipe",
    level: "project",
    projects: ["VisionLink"],
    category: "ai",
  },
  {
    name: "Reinforcement Learning",
    descriptor: "Gym step loops & policy concepts",
    icon: "reinforcement learning",
    level: "learning",
    projects: ["NutriSync"],
    category: "ai",
  },
  {
    name: "Reward Shaping",
    descriptor: "Custom rewards & penalty constraints",
    icon: "reward shaping",
    level: "learning",
    projects: ["NutriSync"],
    category: "ai",
  },
  {
    name: "OpenEnv",
    descriptor: "Standardized observation/action spaces",
    icon: "openenv",
    level: "learning",
    projects: ["NutriSync"],
    category: "ai",
  },

  // ── 03: Product & Tooling (6 items) ──
  {
    name: "TypeScript",
    descriptor: "Type contracts & client logic",
    icon: "typescript",
    level: "daily",
    projects: ["AIVOA", "NutriSync"],
    category: "tooling",
  },
  {
    name: "JavaScript (ES6+)",
    descriptor: "Modern DOM, async & promises",
    icon: "javascript",
    level: "daily",
    projects: ["AIVOA", "CaloRupee"],
    category: "tooling",
  },
  {
    name: "React / Next.js",
    descriptor: "Component architecture & state",
    icon: "react",
    level: "project",
    projects: ["AIVOA"],
    category: "tooling",
  },
  {
    name: "Tailwind CSS",
    descriptor: "Responsive utility design tokens",
    icon: "tailwind css",
    level: "project",
    projects: ["AIVOA", "CaloRupee"],
    category: "tooling",
  },
  {
    name: "Docker",
    descriptor: "Multi-service container setups",
    icon: "docker",
    level: "project",
    projects: ["Everywhere"],
    category: "tooling",
  },
  {
    name: "Git, GitHub, Linux",
    descriptor: "Version control & bash workflow",
    icon: "git",
    level: "daily",
    projects: ["Everywhere"],
    category: "tooling",
  },
];
