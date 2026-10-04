"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: string;
  badge?: string;
  title: string;
  org: string;
  copy: string;
  highlights: string[];
}

const MILESTONES: Milestone[] = [
  {
    year: "2025 - PRESENT",
    badge: "DEGREE",
    title: "B.E. in Artificial Intelligence & Data Science",
    org: "Dr. D. Y. Patil Institute of Technology, Pune",
    copy: "Second Year student with an 8.71 / 10.0 CGPA. Core coursework in Data Structures & Algorithms, Database Systems, Computer Networks, Operating Systems, and Artificial Intelligence.",
    highlights: ["Second Year student", "8.71 / 10.0 CGPA", "Data Structures & Algorithms"],
  },
  {
    year: "MAR 2026",
    badge: "1ST PLACE",
    title: "1st Place: 3-Hour Impromptu Hackathon",
    org: "Campus Hackathon",
    copy: "Won first place by independently building a full-stack college canteen pre-ordering system with real-time menu updates, admin workflows, and payment gateway integration.",
    highlights: [
      "Won first place",
      "independently building a full-stack college canteen pre-ordering system",
      "real-time menu updates",
    ],
  },
  {
    year: "2026",
    badge: "PROJECTS",
    title: "VisionLink & AIVOA",
    org: "Real-Time Systems & AI Workflows",
    copy: "Built VisionLink for real-time webcam emotion detection over WebSockets using FastAPI and MediaPipe. Developed AIVOA, an AI deviation intake assistant using LangGraph, Groq, and React.",
    highlights: [
      "real-time webcam emotion detection",
      "WebSockets using FastAPI and MediaPipe",
      "AI deviation intake assistant",
      "LangGraph",
    ],
  },
  {
    year: "2026",
    badge: "PROJECTS",
    title: "NutriSync RL & CaloRupee",
    org: "Reinforcement Learning & Web Apps",
    copy: "Created NutriSync, an OpenAI Gym environment deployed on Hugging Face with an interactive Gradio UI for sequential meal planning, and CaloRupee, an AI budget meal planner with dual-provider failover.",
    highlights: [
      "OpenAI Gym environment",
      "deployed on Hugging Face with an interactive Gradio UI",
      "shaped rewards for sequential meal planning",
      "AI budget meal planner",
      "dual-provider failover",
    ],
  },
];

function HighlightedMilestoneCopy({ copy, highlights }: { copy: string; highlights: string[] }) {
  if (!highlights.length) return <>{copy}</>;
  const pattern = new RegExp(`(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  const parts = copy.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        highlights.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
          <span
            key={i}
            className="text-[#E8E5DD] font-normal underline decoration-[var(--accent,#C9A84C)]/50 decoration-1 underline-offset-4 hover:decoration-[var(--accent,#C9A84C)] transition-colors"
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

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const spineFillRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!sectionRef.current) return;

    if (prefersReduced) {
      if (spineFillRef.current) spineFillRef.current.style.transform = "scaleY(1)";
      itemsRef.current.forEach((el) => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      /* Vertical spine fill scrub */
      if (spineFillRef.current && sectionRef.current) {
        gsap.fromTo(
          spineFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 0.6,
            },
          }
        );
      }

      /* Milestone entries fade up */
      itemsRef.current.forEach((el) => {
        if (!el) return;
        const dot = el.querySelector("[data-milestone-dot]");
        const content = el.querySelector("[data-milestone-content]");

        gsap.fromTo(
          content,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );

        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0.6, opacity: 0.3 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      aria-label="Education and Engineering Milestones"
      className="scroll-mt-20"
      style={{
        background: "transparent",
        padding: "clamp(80px,12vh,140px) clamp(24px,5vw,80px)",
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ marginBottom: "clamp(64px,9vh,104px)" }}>
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.18em",
              color: "var(--accent, #C9A84C)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 14,
            }}
          >
            Experience &amp; Milestones
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(36px, 5.5vw, 76px)",
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "-0.015em",
              lineHeight: 1.06,
              color: "#E8E5DD",
              margin: "0 0 16px",
            }}
          >
            Education &amp; Engineering
          </h2>
          <p
            style={{
              fontFamily: "var(--font-ui), -apple-system, sans-serif",
              fontSize: "clamp(15px, 1.1vw, 17px)",
              lineHeight: 1.6,
              color: "#A1A1AA",
              margin: 0,
              maxWidth: "54ch",
              fontWeight: 300,
            }}
          >
            Academic progression and verified production milestones.
          </p>
        </div>

        {/* Editorial Spine Container */}
        <div className="relative" style={{ maxWidth: 1040 }}>
          {/* Continuous vertical spine (Desktop) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute"
            style={{
              left: 184,
              top: 10,
              bottom: 24,
              width: 2,
              background: "rgba(255,255,255,0.08)",
              transform: "translateX(-50%)",
            }}
          >
            <div
              ref={spineFillRef}
              style={{
                width: "100%",
                height: "100%",
                background: "var(--accent, #C9A84C)",
                transformOrigin: "top center",
                transform: "scaleY(0)",
              }}
            />
          </div>

          {/* Continuous vertical line (Mobile) */}
          <div
            aria-hidden="true"
            className="md:hidden absolute"
            style={{
              left: 12,
              top: 10,
              bottom: 24,
              width: 2,
              background: "rgba(255,255,255,0.08)",
              transform: "translateX(-50%)",
            }}
          />

          {/* Milestones list with generous editorial gap */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(64px, 8.5vh, 100px)",
            }}
          >
            {MILESTONES.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  itemsRef.current[idx] = el;
                }}
                className="relative md:grid items-start"
                style={{
                  gridTemplateColumns: "160px 48px 1fr",
                }}
              >
                {/* Mobile-only Spine Dot */}
                <div
                  aria-hidden="true"
                  className="md:hidden absolute"
                  style={{
                    left: 12,
                    top: 6,
                    transform: "translateX(-50%)",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: idx === 0 ? "var(--accent, #C9A84C)" : "rgba(255,255,255,0.25)",
                    border: "2px solid #0B0C0B",
                    zIndex: 2,
                  }}
                />

                {/* Left Column: Date / Year */}
                <div className="hidden md:block md:text-right md:pr-8" style={{ paddingTop: 2 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 13,
                      letterSpacing: "0.14em",
                      color: idx === 0 ? "var(--accent, #C9A84C)" : "#A1A1AA",
                      display: "inline-block",
                      fontWeight: 500,
                    }}
                  >
                    {item.year}
                  </span>
                </div>

                {/* Center: Spine dot anchor (Desktop) */}
                <div
                  className="hidden md:flex items-center justify-center relative"
                  style={{ width: "100%", height: 22, paddingTop: 3 }}
                >
                  <div
                    data-milestone-dot
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      background: idx === 0 ? "var(--accent, #C9A84C)" : "rgba(255,255,255,0.25)",
                      border: "2px solid #0B0C0B",
                      boxShadow: idx === 0 ? "0 0 10px rgba(120,168,139,0.45)" : "none",
                      zIndex: 2,
                    }}
                  />
                </div>

                {/* Right Column: Milestone content */}
                <div
                  data-milestone-content
                  className="pl-8 md:pl-6"
                  style={{ maxWidth: 740 }}
                >
                  {/* Mobile-only Year */}
                  <div className="md:hidden mb-2">
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 12,
                        letterSpacing: "0.14em",
                        color: idx === 0 ? "var(--accent, #C9A84C)" : "#A1A1AA",
                        fontWeight: 500,
                      }}
                    >
                      {item.year}
                    </span>
                  </div>

                  {/* Organization / Context */}
                  <div style={{ marginBottom: 8 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 12,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#8E8E93",
                        display: "inline-block",
                      }}
                    >
                      {item.org}
                    </span>
                  </div>

                  {/* Milestone Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      fontSize: "clamp(22px, 2.2vw, 30px)",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                      color: "#E8E5DD",
                      margin: "0 0 14px",
                      lineHeight: 1.25,
                    }}
                  >
                    {item.title.startsWith("1st Place") ? (
                      <>
                        <span className="underline decoration-[var(--accent,#C9A84C)]/80 decoration-2 underline-offset-4 font-normal">
                          1st Place
                        </span>
                        {item.title.slice(9)}
                      </>
                    ) : (
                      item.title
                    )}
                  </h3>

                  {/* Milestone Copy */}
                  <p
                    style={{
                      fontFamily: "var(--font-ui), -apple-system, sans-serif",
                      fontSize: "clamp(15.5px, 1.05vw, 17.5px)",
                      lineHeight: 1.7,
                      color: "rgba(232,229,221,0.85)",
                      margin: 0,
                      maxWidth: "60ch",
                      fontWeight: 300,
                    }}
                  >
                    <HighlightedMilestoneCopy copy={item.copy} highlights={item.highlights} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
