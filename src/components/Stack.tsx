"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    number: "01",
    title: "Backend",
    technologies: ["Python", "FastAPI", "REST APIs", "SQL / SQLite", "Git"],
  },
  {
    number: "02",
    title: "AI & Machine Learning",
    technologies: ["AI Integration", "LangChain", "LLM APIs", "RL Environments"],
  },
  {
    number: "03",
    title: "Frontend",
    technologies: ["JavaScript", "TypeScript", "React"],
  },
] as const;


/* ─── Main Component ────────────────────────────────────────── */
export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      if (headerRef.current) headerRef.current.style.opacity = "1";
      rowRefs.current.forEach((r) => { if (r) r.style.opacity = "1"; });
      return;
    }

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Header entrance */
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 12,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      /* Row stagger entrance */
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        gsap.from(row, {
          opacity: 0,
          y: 18,
          duration: 0.7,
          delay: i * 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stack"
      ref={sectionRef}
      aria-label="Technical skills and stack"
      className="relative border-t border-white/[0.06] scroll-mt-24 md:scroll-mt-28"
      style={{ padding: "clamp(52px, 6.5vw, 88px) 0" }}
    >
      <div
        className="relative z-10 w-full"
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px)",
        }}
      >
        {/* ── Section Header ── */}
        <div
          ref={headerRef}
          style={{ marginBottom: "clamp(36px, 4.5vw, 56px)" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(36px, 4.4vw, 62px)",
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "#E8E5DD",
              margin: "0 0 12px",
            }}
          >
            Technical Stack
          </h2>
          <p
            style={{
              fontFamily: "var(--font-ui), -apple-system, sans-serif",
              fontSize: "clamp(13.5px, 1vw, 15px)",
              color: "#777774",
              fontWeight: 300,
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            Python backend developer · AI applications · React interfaces
          </p>
        </div>

        {/* ── Category Rows ── */}
        <div>
          {CATEGORIES.map((cat, i) => (
            <div key={cat.number}>
              {/* Hairline divider between rows */}
              {i > 0 && (
                <div
                  aria-hidden="true"
                  style={{
                    height: "1px",
                    background: "rgba(255,255,255,0.06)",
                    margin: "clamp(24px, 3.2vw, 38px) 0",
                  }}
                />
              )}

              {/* Row: left meta block | right tech string */}
              <div
                ref={(el) => { rowRefs.current[i] = el; }}
                className="stack-category-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.25fr",
                  gap: "clamp(24px, 4vw, 80px)",
                  alignItems: "start",
                }}
              >
                {/* Left: Number + Title */}
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 11,
                      letterSpacing: "0.2em",
                      color: "var(--accent, #C9A84C)",
                      display: "block",
                      marginBottom: 8,
                      fontWeight: 400,
                    }}
                    aria-hidden="true"
                  >
                    {cat.number}
                  </span>

                  <h3
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      fontSize: "clamp(24px, 2.4vw, 36px)",
                      fontWeight: 400,
                      fontStyle: "italic",
                      letterSpacing: "-0.015em",
                      lineHeight: 1.1,
                      color: "#E8E5DD",
                      margin: 0,
                    }}
                  >
                    {cat.title}
                  </h3>
                </div>

                {/* Right: Technologies as horizontal flowing string */}
                <div
                  style={{
                    paddingTop: "clamp(18px, 1.8vw, 26px)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-ui), -apple-system, sans-serif",
                      fontSize: "clamp(15px, 1.3vw, 20px)",
                      fontWeight: 400,
                      letterSpacing: "-0.005em",
                      lineHeight: 1.6,
                      color: "#A3A3A0",
                      margin: 0,
                    }}
                  >
                    {cat.technologies.map((tech, ti) => (
                      <React.Fragment key={tech}>
                        <span
                          style={{ color: "#E8E5DD" }}
                        >
                          {tech}
                        </span>
                        {ti < cat.technologies.length - 1 && (
                          <span
                            aria-hidden="true"
                            style={{
                              color: "rgba(255,255,255,0.2)",
                              margin: "0 0.55em",
                              fontWeight: 300,
                            }}
                          >
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Terminal hairline */}
          <div
            aria-hidden="true"
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.06)",
              marginTop: "clamp(24px, 3.2vw, 38px)",
            }}
          />
        </div>
      </div>

      {/* Mobile responsive: stack to single column */}
      <style>{`
        @media (max-width: 767px) {
          .stack-category-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .stack-category-row > div:last-child {
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
