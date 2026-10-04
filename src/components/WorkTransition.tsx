"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * WorkTransition — breathing space between Hero and Work sections.
 * Expands a horizontal rule, fades in chapter label.
 * Replaces the IntroStrip card grid.
 */
export default function WorkTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const ruleRef    = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!sectionRef.current) return;

    if (prefersReduced) {
      if (ruleRef.current)  ruleRef.current.style.transform  = "scaleX(1)";
      if (labelRef.current) labelRef.current.style.opacity   = "1";
      if (subRef.current)   subRef.current.style.opacity     = "1";
      return;
    }

    const ctx = gsap.context(() => {
      /* rule expands from left */
      gsap.fromTo(ruleRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      /* labels fade up */
      gsap.fromTo([labelRef.current, subRef.current],
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Chapter transition: Selected Work"
      style={{
        background: "transparent",
        padding: "clamp(60px,10vh,120px) clamp(24px,5vw,80px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        {/* Expanding rule */}
        <div
          ref={ruleRef}
          aria-hidden="true"
          style={{
            width: "100%",
            height: 1,
            background: "rgba(255,255,255,0.1)",
            marginBottom: "clamp(32px,5vh,56px)",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />

        {/* Heading */}
        <div ref={labelRef} style={{ opacity: 0 }}>
          <h2
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(32px,4.5vw,60px)",
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              color: "#E8E5DD",
              margin: 0,
            }}
          >
            Featured Projects
          </h2>
        </div>

        {/* Sub label */}
        <p
          ref={subRef}
          style={{
            marginTop: 20,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 14,
            letterSpacing: "0.01em",
            color: "#A1A1AA",
            opacity: 0,
          }}
        >
          Selected projects in <span className="recruiter-highlight">backend APIs</span>, <span className="recruiter-highlight">AI agents</span>, and <span className="recruiter-highlight">reinforcement learning</span>.
        </p>
      </div>
    </section>
  );
}
