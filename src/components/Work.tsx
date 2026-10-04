"use client";

/**
 * Work — Persistent scroll-driven project sections.
 *
 * Architecture:
 * - ALL 4 project sections live in the DOM at all times (no mount/unmount)
 * - GSAP ScrollTrigger drives opacity + translateY per section
 * - Left tracker updates via IntersectionObserver (no React state churn)
 * - Project transitions: outgoing fades to 0.35 + moves -20px, incoming 0.35→1 + 20px→0
 * - Zero flicker: transform/opacity only, no width/height/top/left animation
 */

import { useEffect, useRef, useCallback, useState } from "react";
import { PROJECTS } from "@/data/content";
import { ArrowUpRight, ExternalLink, ChevronDown } from "lucide-react";
import {
  VisionLinkArchitecture,
  AivoaArchitecture,
  CaloRupeeArchitecture,
  NutriSyncArchitecture,
} from "./ProjectArchitectures";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Only 4 primary projects ──────────────────────────────────── */
const FEATURED = PROJECTS.slice(0, 4);

/* ─── Corrected AIVOA content (resume source of truth) ───────── */
const AIVOA_OVERRIDE = {
  outcome: "AI-powered deviation intake and QMS assistant: built with FastAPI, LangGraph, React, and document parsing.",
  roleSentence: "Built the LangGraph workflow, document ingestion pipeline for PDF/DOCX/scanned images, and React interface.",
  tags: ["FastAPI", "LangGraph", "Groq", "React", "Redux Toolkit", "PostgreSQL", "Docker Compose"],
  story: {
    problem: "Manufacturing deviation capture in pharma QMS relied on slow, manual form entry with zero support for multi-format document uploads.",
    decision: "Built a structured processing pipeline with intent routing, LLM extraction via Groq, Pydantic validation, and automatic SQLite/PostgreSQL fallback.",
    result: "Structured deviation records from text, chat, or uploaded documents (PDF, DOCX, XLSX, TXT, scanned images) with merge/diff logic.",
  },
  benchmarkNote: "Processes PDF, DOCX, XLSX, TXT, and OCR uploads with 10 acceptance scenarios tested.",
};

/* ─── NutriSync corrected content ──────────────────────────────── */
const NUTRISYNC_OVERRIDE = {
  outcome: "Custom Reinforcement Learning environment in OpenAI Gym for sequential meal planning under budget constraints. Deployed on Hugging Face with an interactive Gradio UI.",
  roleSentence: "Designed the OpenAI Gym environment, 50-ingredient Indian food dataset, and deployed an interactive Gradio UI on Hugging Face.",
  story: {
    problem: "Standard RL reward functions optimizing solely for calories triggered reward hacking: consuming pure oil and sugar at every step.",
    decision: "Redesigned the reward function with penalties for allergen usage, budget violations, and dietary variety floors across 50 Indian ingredients.",
    result: "Agent converged on balanced, realistic meal sequences with three difficulty tiers. Deployed to Hugging Face with a live Gradio UI so users and evaluators can interact with the environment.",
  },
  benchmarkNote: "Deployed on Hugging Face with an interactive Gradio UI and 50-ingredient Indian food dataset.",
};

/* ─── Architecture dispatcher ─────────────────────────────────── */
function ArchDiagram({ id }: { id: string }) {
  switch (id) {
    case "visionlink": return <VisionLinkArchitecture />;
    case "aivoa":      return <AivoaArchitecture />;
    case "calorupee":  return <CaloRupeeArchitecture />;
    case "nutrisync":  return <NutriSyncArchitecture />;
    default:           return null;
  }
}

/* ─── High-value recruiter keyword highlighting ────────────────────────── */
const HIGHLIGHT_TERMS: Record<string, string[]> = {
  visionlink: [
    "Real-time emotion detection over WebSockets",
    "FastAPI",
    "MediaPipe",
  ],
  aivoa: [
    "AI-powered deviation intake",
    "LangGraph",
    "automated provider failover",
    "document parsing",
  ],
  calorupee: [
    "Budget meal planner",
    "tight daily rupee limits",
    "dual-AI failover",
    "Pydantic",
  ],
  nutrisync: [
    "OpenAI Gym",
    "Reinforcement Learning environment",
    "shaped rewards",
    "sequential meal planning",
    "Deployed on Hugging Face",
    "interactive Gradio UI",
    "Gradio UI",
  ],
};

function HighlightedText({ text, projectId }: { text: string; projectId: string }) {
  const terms = HIGHLIGHT_TERMS[projectId] ?? [];
  if (!terms.length) return <>{text}</>;

  const regex = new RegExp(`(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        terms.some(t => t.toLowerCase() === part.toLowerCase()) ? (
          <span
            key={i}
            className="text-[#E8E5DD] underline decoration-[var(--accent,#C9A84C)]/50 decoration-1 underline-offset-4 hover:decoration-[var(--accent,#C9A84C)] transition-colors font-normal"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ─── Project section — always in DOM ────────────────────────── */
function ProjectSection({
  project, index, sectionId, onIntersect,
}: {
  project: typeof PROJECTS[0];
  index: number;
  sectionId: string;
  onIntersect: (i: number) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const elRef   = useRef<HTMLDivElement>(null);
  const revRefs = useRef<(HTMLElement | null)[]>([]);

  /* Override content where needed */
  const overridden = {
    ...project,
    year: "2026",
    ...(project.id === "aivoa" ? AIVOA_OVERRIDE : {}),
    ...(project.id === "nutrisync"
      ? { ...NUTRISYNC_OVERRIDE, tags: project.tags, githubUrl: project.githubUrl, liveUrl: project.liveUrl }
      : {}),
  };

  const setRevRef = useCallback((el: HTMLElement | null, i: number) => {
    revRefs.current[i] = el;
  }, []);

  useEffect(() => {
    if (!elRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* IntersectionObserver — track active project */
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onIntersect(index); },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    io.observe(elRef.current);

    if (prefersReduced) {
      revRefs.current.forEach(el => {
        if (el) { el.style.opacity = "1"; el.style.transform = "none"; }
      });
      return () => io.disconnect();
    }

    /* Per-element stagger reveals */
    const ctx = gsap.context(() => {
      revRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0,
            duration: 0.85,
            ease: "power3.out",
            delay: i * 0.09,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, elRef);

    return () => { io.disconnect(); ctx.revert(); };
  }, [index, onIntersect]);

  return (
    <div
      ref={elRef}
      id={sectionId}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "clamp(60px,10vh,120px) 0",
      }}
    >
      {/* Project Meta */}
      <div
        ref={el => setRevRef(el, 0)}
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 12.5,
          letterSpacing: "0.04em",
          color: "var(--accent, #C9A84C)",
          marginBottom: 16,
          opacity: 0,
        }}
      >
        {overridden.year} · Project
      </div>

      {/* Project title */}
      <div ref={el => setRevRef(el, 1)} style={{ marginBottom: "clamp(16px,2.5vh,28px)", opacity: 0 }}>
        <h2
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(48px,8vw,120px)",
            fontWeight: 400,
            fontStyle: "italic",
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
            color: "#E8E5DD",
            margin: 0,
          }}
        >
          {overridden.title}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 14,
            letterSpacing: "0.12em",
            color: "#A1A1AA",
            marginTop: 12,
          }}
        >
          ↳ {overridden.roleSentence}
        </p>
      </div>

      {/* One-line outcome (What it does) */}
      <p
        ref={el => setRevRef(el as HTMLElement, 2)}
        style={{
          fontFamily: "var(--font-ui), sans-serif",
          fontSize: "clamp(18px,1.4vw+0.2rem,22px)",
          fontWeight: 300,
          lineHeight: 1.65,
          color: "rgba(232,229,221,0.85)",
          maxWidth: "56ch",
          marginBottom: "clamp(24px,4vh,36px)",
          opacity: 0,
        }}
      >
        <HighlightedText text={overridden.outcome} projectId={project.id} />
      </p>

      {/* Control Bar: Know More button, tags, and CTAs */}
      <div
        ref={el => setRevRef(el, 3)}
        style={{
          display: "flex",
          flexWrap: "wrap" as const,
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px 24px",
          opacity: 0,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: 16 }}>
          {/* "Know more!" Button */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            className="group inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: isExpanded ? "#E8E5DD" : "var(--accent, #C9A84C)",
              background: isExpanded ? "rgba(255,255,255,0.08)" : "rgba(201,168,76,0.09)",
              border: `1px solid ${isExpanded ? "rgba(255,255,255,0.2)" : "rgba(201,168,76,0.35)"}`,
              padding: "9px 18px",
              borderRadius: 6,
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isExpanded ? "rgba(255,255,255,0.12)" : "rgba(201,168,76,0.18)";
              e.currentTarget.style.borderColor = "var(--accent, #C9A84C)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isExpanded ? "rgba(255,255,255,0.08)" : "rgba(201,168,76,0.09)";
              e.currentTarget.style.borderColor = isExpanded ? "rgba(255,255,255,0.2)" : "rgba(201,168,76,0.35)";
            }}
          >
            <span>{isExpanded ? "Show less" : "Know more!"}</span>
            <ChevronDown
              size={15}
              style={{
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </button>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px 14px" }}>
            {overridden.tags.map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: "#A1A1AA",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} source on GitHub`}
            className="cta-source"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              fontFamily: "var(--font-mono), monospace",
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.85)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "#E8E5DD";
              const arrow = e.currentTarget.querySelector<SVGElement>(".arrow-icon");
              if (arrow) (arrow.style as CSSStyleDeclaration).transform = "translate(2px,-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "rgba(255,255,255,0.85)";
              const arrow = e.currentTarget.querySelector<SVGElement>(".arrow-icon");
              if (arrow) (arrow.style as CSSStyleDeclaration).transform = "translate(0,0)";
            }}
          >
            GitHub
            <ArrowUpRight size={14} aria-hidden="true" className="arrow-icon" style={{ transition: "transform 0.2s ease" }} />
          </a>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-mono), monospace",
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: "var(--accent, #C9A84C)",
                textDecoration: "none",
              }}
            >
              Demo <ExternalLink size={12} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>

      {/* Smoothly Collapsible Details Section (Diagram + Problem / Decision / Result) */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isExpanded ? "1fr" : "0fr",
          transition: "grid-template-rows 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div style={{ paddingTop: "clamp(24px, 4vh, 36px)" }}>
            {/* Project diagram */}
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                marginBottom: "clamp(24px, 4vh, 40px)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <ArchDiagram id={project.id} />
            </div>

            {/* Problem → Decision → Result */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
                gap: 0,
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 4,
                overflow: "hidden",
                marginBottom: 16,
              }}
            >
              {[
                { label: "01 / The Problem",  text: overridden.story?.problem,  accent: false },
                { label: "02 / The Decision", text: overridden.story?.decision, accent: true  },
                { label: "03 / The Result",   text: overridden.story?.result,   accent: false },
              ].map((col, i) => (
                <div
                  key={i}
                  style={{
                    padding: "clamp(20px,3vh,32px) clamp(20px,2.5vw,36px)",
                    borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                    background: col.accent ? "rgba(201,168,76,0.06)" : "transparent",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 11.5,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase" as const,
                      color: col.accent ? "var(--accent, #C9A84C)" : "#A1A1AA",
                      display: "block",
                      marginBottom: 12,
                    }}
                  >
                    {col.label}
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-ui), sans-serif",
                      fontSize: "clamp(15px,0.95vw+0.2rem,17.5px)",
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.8)",
                      margin: 0,
                    }}
                  >
                    <HighlightedText text={col.text ?? ""} projectId={project.id} />
                  </p>
                </div>
              ))}
            </div>

            {overridden.benchmarkNote && (
              <p
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  color: "rgba(255,255,255,0.5)",
                  marginTop: 12,
                  marginBottom: 4,
                }}
              >
                ↳ {overridden.benchmarkNote}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Work section ───────────────────────────────────────── */
export default function Work() {
  const sectionRef    = useRef<HTMLElement>(null);
  const trackerRef    = useRef<HTMLDivElement>(null);
  const activeIdxRef  = useRef(0);

  /* Update tracker dots without React re-render (no flicker) */
  const setTrackerActive = useCallback((idx: number) => {
    if (activeIdxRef.current === idx) return;
    activeIdxRef.current = idx;

    if (!trackerRef.current) return;
    const items = trackerRef.current.querySelectorAll<HTMLElement>("[data-tracker-item]");
    items.forEach((item, i) => {
      const dot = item.querySelector<HTMLElement>("[data-tracker-dot]");
      const num = item.querySelector<HTMLElement>("[data-tracker-num]");
      const isActive = i === idx;

      if (dot) {
        dot.style.background = isActive ? "var(--accent, #C9A84C)" : "rgba(255,255,255,0.2)";
        dot.style.transform  = isActive ? "scale(1.4)" : "scale(1)";
      }
      if (num) num.style.color = isActive ? "var(--accent, #C9A84C)" : "rgba(255,255,255,0.4)";
    });
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-label="Selected engineering projects"
      style={{ background: "transparent", position: "relative" }}
    >
      <div
        className="relative z-10"
        style={{ maxWidth: 1440, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}
      >
        <div className="lg:grid" style={{ gridTemplateColumns: "72px 1fr", gap: 0 }}>

          {/* ── LEFT: Sticky project tracker ── */}
          <div
            ref={trackerRef}
            aria-label="Project navigation"
            className="hidden lg:flex flex-col items-center"
            style={{
              position: "sticky",
              top: 80,
              height: "fit-content",
              paddingTop: "clamp(60px,10vh,120px)",
              paddingBottom: 40,
              gap: 32,
              alignSelf: "start",
            }}
          >
            {/* 1px vertical rail */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "50%",
                top: "clamp(60px,10vh,120px)",
                bottom: 0,
                width: 1,
                background: "rgba(255,255,255,0.06)",
                transform: "translateX(-50%)",
              }}
            />

            {FEATURED.map((p, i) => (
              <button
                key={p.id}
                data-tracker-item
                onClick={() => {
                  document.getElementById(`project-${p.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="flex flex-col items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 relative z-10"
                title={p.title}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "6px 0" }}
              >
                <span
                  data-tracker-num
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    color: i === 0 ? "var(--accent, #C9A84C)" : "rgba(255,255,255,0.4)",
                    transition: "color 0.3s ease",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  data-tracker-dot
                  style={{
                    display: "block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: i === 0 ? "var(--accent, #C9A84C)" : "rgba(255,255,255,0.2)",
                    transition: "background 0.3s ease, transform 0.3s ease",
                    transform: i === 0 ? "scale(1.4)" : "scale(1)",
                  }}
                />
              </button>
            ))}
          </div>

          {/* ── RIGHT: Project sections — persistent DOM ── */}
          <div style={{ paddingLeft: "clamp(0px,2vw,40px)" }}>
            {FEATURED.map((project, i) => (
              <ProjectSection
                key={project.id}               /* stable key — never changes */
                project={project}
                index={i}
                sectionId={`project-${project.id}`}
                onIntersect={setTrackerActive}
              />
            ))}

            {/* ── Hackathon: achievement note, not a numbered project ── */}
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                padding: "clamp(48px,8vh,96px) 0",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  color: "var(--accent, #C9A84C)",
                  display: "block",
                  marginBottom: 16,
                }}
              >
                HACKATHON SPOTLIGHT · MARCH 2026
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: "clamp(30px,3.8vw,56px)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  letterSpacing: "-0.01em",
                  color: "#E8E5DD",
                  margin: "0 0 16px",
                }}
              >
                1st Place: 3-Hour Impromptu Hackathon
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-ui), sans-serif",
                  fontSize: "clamp(15.5px,1.15vw+0.2rem,18.5px)",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.78)",
                  maxWidth: "52ch",
                  margin: "0 0 20px",
                }}
              >
                <span className="recruiter-highlight">Won first place</span> by independently building a{" "}
                <span className="recruiter-highlight">full-stack college canteen pre-ordering system</span> with real-time menu updates, admin workflows, and payment gateway integration.
              </p>
              <a
                href="https://github.com/sameerpandey17"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 13,
                  letterSpacing: "0.04em",
                  color: "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                }}
              >
                Github <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile project counter */}
      <div
        className="lg:hidden"
        style={{
          position: "sticky",
          bottom: 0,
          background: "rgba(11,12,11,0.95)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "10px clamp(24px,5vw,80px)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          zIndex: 10,
        }}
      >
        {FEATURED.map((_, i) => (
          <span
            key={i}
            style={{
              display: "block",
              height: 2,
              width: 24,
              transformOrigin: "left",
              transform: i === 0 ? "scaleX(1)" : "scaleX(0.25)",
              background: i === 0 ? "var(--accent, #C9A84C)" : "rgba(255,255,255,0.15)",
              borderRadius: 1,
              transition: "transform 0.3s ease, background 0.3s ease",
            }}
          />
        ))}
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.14em",
            color: "#A1A1AA",
            marginLeft: "auto",
          }}
        >
          01 / 04
        </span>
      </div>
    </section>
  );
}
