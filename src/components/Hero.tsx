"use client";

import { MapPin } from "lucide-react";

/**
 * Hero — Sameer Pandey Portfolio
 *
 * Design tokens (tweak here):
 *   --h-bg          : #070707          — section background
 *   --h-name-size   : clamp(64px,11vw,190px) — name font size
 *   --h-gutter      : clamp(24px,5vw,80px)   — horizontal padding
 *   --h-left-inset  : clamp(24px,10vw,180px) — left text column start
 *   --h-name-color  : #EDEDEA          — both name lines colour
 *   --h-role-size   : clamp(16px,1.6vw,24px) — role line size
 *   --h-desc-size   : clamp(15px,1.15vw,18px)— description size
 *   --h-gap-name-role : 28px
 *   --h-gap-role-desc : 32px
 *   --h-gap-desc-stack: 36px
 *   --h-gap-stack-cta : 40px
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PERSONAL } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

/* ─── Debug flag — set true to show XY coords overlay ── */
const DEBUG_COORDS = false;

export default function Hero() {
  /* refs */
  const sectionRef   = useRef<HTMLElement>(null);
  const grainRef     = useRef<HTMLDivElement>(null);
  const circleRef    = useRef<HTMLDivElement>(null);
  const hiRef        = useRef<HTMLDivElement>(null);
  const name1Ref     = useRef<HTMLSpanElement>(null);
  const name2Ref     = useRef<HTMLSpanElement>(null);
  const socialRef    = useRef<HTMLDivElement>(null);
  const portraitRef  = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);
  const roleRef      = useRef<HTMLDivElement>(null);
  const descRef      = useRef<HTMLParagraphElement>(null);
  const stackRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const hairlineARef = useRef<HTMLDivElement>(null);
  const hairlineBRef = useRef<HTMLDivElement>(null);

  /* ── mouse parallax state ── */
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf: number;

    /* ── GSAP entrance timeline — always created ── */
    const ctx = gsap.context(() => {
      /* set initial states */
      gsap.set([grainRef.current, hairlineARef.current, hairlineBRef.current], { opacity: 0 });
      gsap.set([name1Ref.current, name2Ref.current],  { clipPath: "inset(100% 0 0 0)" });
      gsap.set(portraitRef.current,  { opacity: 0, scale: 1.04 });
      gsap.set(circleRef.current,    { opacity: 0, scale: 0.96 });
      gsap.set([
        hiRef.current, socialRef.current, roleRef.current, descRef.current,
        stackRef.current, ctaRef.current,
      ], { opacity: 0, y: 18 });

      if (prefersReduced) {
        /* instant reveal */
        [
          grainRef, hairlineARef, hairlineBRef, name1Ref, name2Ref,
          portraitRef, circleRef, hiRef, socialRef, roleRef, descRef, stackRef, ctaRef,
        ].forEach(r => {
          if (r.current) {
            r.current.style.opacity = "1";
            (r.current.style as CSSStyleDeclaration).clipPath = "none";
            r.current.style.transform = "none";
          }
        });
        return;
      }

      const ease = "cubic-bezier(.16,1,.3,1)";
      const tl = gsap.timeline({ defaults: { ease } });

      /* 1 — grain + hairlines */
      tl.to([grainRef.current, hairlineARef.current, hairlineBRef.current],
        { opacity: 1, duration: 0.6 }, 0);

      /* 2 — name slide-up from mask, stagger 0.12s */
      tl.to(name1Ref.current,
        { clipPath: "inset(0% 0 0 0)", duration: 0.95 }, 0.15);
      tl.to(name2Ref.current,
        { clipPath: "inset(0% 0 0 0)", duration: 0.95 }, 0.27);

      /* 3 — portrait + circle */
      tl.to(portraitRef.current,
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, 0.3);
      tl.to(circleRef.current,
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, 0.35);

      /* 4 — sub-content stagger 0.08s */
      tl.to([hiRef.current, socialRef.current, roleRef.current, descRef.current, stackRef.current, ctaRef.current],
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.55);

      /* scroll parallax on portrait */
      if (portraitImgRef.current && sectionRef.current) {
        gsap.to(portraitImgRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.8,
          },
        });
      }
    }, sectionRef);

    /* ── mouse parallax (full-motion only) ── */
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    if (!prefersReduced) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });

      const tick = () => {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        if (portraitRef.current)
          gsap.set(portraitRef.current, { x: mx * 10, y: my * 6, overwrite: "auto" });
        if (circleRef.current)
          gsap.set(circleRef.current,  { x: mx * -5, y: my * -3, overwrite: "auto" });
        if (name1Ref.current)
          gsap.set(name1Ref.current,   { x: mx * 2,  overwrite: "auto" });
        if (name2Ref.current)
          gsap.set(name2Ref.current,   { x: mx * 2,  overwrite: "auto" });
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction: Sameer Pandey"
      className="relative overflow-hidden"
      style={{
        height: "100svh",
        minHeight: 640,
        background: "var(--h-bg, #0B0C0B)",
      }}
    >
      {/* ─── CSS design token injection ─────────────────────────── */}
      <style>{`
        :root {
          --h-bg:           #0B0C0B;
          --h-name-size:    clamp(64px, 9vw, 160px);
          --h-gutter:       clamp(24px, 5vw, 80px);
          --h-left-inset:   clamp(24px, 5vw, 80px);
          --h-name-color:   #E8E5DD;
          --h-role-size:    clamp(17px, 1.7vw, 25px);
          --h-desc-size:    clamp(16.5px, 1.25vw, 20px);
          --h-gap-name-role:  28px;
          --h-gap-role-desc:  32px;
          --h-gap-desc-stack: 36px;
          --h-gap-stack-cta:  40px;
        }
      `}</style>

      {/* ─── Radial vignette ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 30%, rgba(7,7,7,0.55) 70%, rgba(7,7,7,0.95) 100%)",
        }}
      />

      {/* ─── Film grain ──────────────────────────────────────────── */}
      <div
        ref={grainRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          mixBlendMode: "overlay",
          filter: "contrast(1.2) brightness(0.9)",
        }}
      />

      {/* ─── Structural hairlines (2 faint vertical) ─────────────── */}
      <div
        ref={hairlineARef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 bottom-0 w-px z-0"
        style={{
          left: "33.33%",
          background: "rgba(255,255,255,0.07)",
          opacity: 0,
        }}
      />
      <div
        ref={hairlineBRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 bottom-0 w-px z-0"
        style={{
          left: "66.66%",
          background: "rgba(255,255,255,0.07)",
          opacity: 0,
        }}
      />

      {/* ─── Circle behind portrait ───────────────────────────────── */}
      <div
        ref={circleRef}
        aria-hidden="true"
        className="pointer-events-none absolute z-[1] hidden lg:block"
        style={{
          /* diameter 70vh, offset so it passes behind the last letters of SAMEER */
          width:  "70vh",
          height: "70vh",
          borderRadius: "50%",
          right:  "clamp(80px,12vw,160px)",
          bottom: "-12vh",
          border: "1px solid rgba(255,255,255,0.07)",
          opacity: 0,
        }}
      />

      {/* ─── Portrait ─────────────────────────────────────────────── */}
      <div
        ref={portraitRef}
        aria-hidden="true"
        className="absolute z-[3] hidden lg:block"
        style={{
          /* right 45%, bottom-aligned, bleeding off bottom */
          right:  "clamp(20px, 5vw, 80px)",
          bottom: "-2vh",
          width:  "clamp(300px, 42vw, 620px)",
          height: "94svh",
          opacity: 0,
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 85%, transparent 100%), " +
            "linear-gradient(to bottom, transparent 0%, black 5%, black 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 85%, transparent 100%), " +
            "linear-gradient(to bottom, transparent 0%, black 5%, black 75%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={portraitImgRef}
          src="/sameer-hd.jpg"
          alt="Sameer Pandey: portrait"
          width={896}
          height={1200}
          className="absolute inset-0 w-full h-[115%]"
          style={{
            objectFit: "cover",
            objectPosition: "center 5%",
            filter: "grayscale(100%) contrast(1.15) brightness(0.72)",
          }}
          loading="eager"
          decoding="async"
        />
        {/* edge bleed into bg */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(7,7,7,0.45) 0%, transparent 20%, transparent 72%, rgba(7,7,7,0.3) 100%)",
          }}
        />
      </div>

      {/* ─── MAIN COMPOSITION ────────────────────────────────────── */}
      <div
        className="relative z-10 flex h-full items-center"
        style={{
          paddingLeft: "var(--h-left-inset, clamp(24px,5vw,80px))",
          paddingRight: "var(--h-gutter)",
          paddingTop: "clamp(80px,12vh,120px)",
          paddingBottom: 80,
        }}
      >
        {/* Text block — wide enough that name never clips */}
        <div className="flex flex-col" style={{ maxWidth: "clamp(340px,56vw,860px)", marginBottom: "4vh" }}>

          {/* "HI, I'M" — 16px above name */}
          <div
            ref={hiRef}
            className="flex items-center gap-3"
            style={{ marginBottom: 16, opacity: 0 }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 13,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "rgba(232,229,221,0.55)",
              }}
            >
              HI, I&apos;M
            </span>
          </div>

          {/* ── NAME — dominant focal point ── */}
          <h1
            aria-label="Sameer Pandey"
            className="overflow-hidden select-none"
            style={{ margin: 0, padding: 0, lineHeight: 0.88 }}
          >
            <span
              ref={name1Ref}
              className="block"
              style={{
                fontFamily: "var(--font-display), 'Ysabeau Infant', Georgia, serif",
                fontSize: "var(--h-name-size)",
                fontWeight: 500,
                fontStyle: "normal",
                letterSpacing: "-0.01em",
                color: "var(--h-name-color, #E8E5DD)",
                clipPath: "inset(100% 0 0 0)",
                lineHeight: 0.88,
              }}
            >
              SAMEER
            </span>
            <span
              ref={name2Ref}
              className="block"
              style={{
                fontFamily: "var(--font-display), 'Ysabeau Infant', Georgia, serif",
                fontSize: "var(--h-name-size)",
                fontWeight: 500,
                fontStyle: "normal",
                letterSpacing: "-0.01em",
                color: "var(--h-name-color, #E8E5DD)", /* same bright white — NOT grey */
                clipPath: "inset(100% 0 0 0)",
                lineHeight: 0.88,
              }}
            >
              PANDEY
            </span>
          </h1>

          {/* ── SOCIAL HYPERLINK ICONS (directly below name) ── */}
          <div
            ref={socialRef}
            className="flex items-center gap-3"
            style={{
              marginTop: "clamp(20px, 3vh, 28px)",
              opacity: 0,
            }}
          >
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="group flex items-center justify-center transition-all duration-300"
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.09)",
                color: "#A1A1AA",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#E8E5DD";
                e.currentTarget.style.borderColor = "var(--accent, #78A88B)";
                e.currentTarget.style.background = "rgba(120, 168, 139, 0.08)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#A1A1AA";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.09)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>

            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="group flex items-center justify-center transition-all duration-300"
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.09)",
                color: "#A1A1AA",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#E8E5DD";
                e.currentTarget.style.borderColor = "var(--accent, #78A88B)";
                e.currentTarget.style.background = "rgba(120, 168, 139, 0.08)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#A1A1AA";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.09)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            <a
              href={PERSONAL.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter Profile"
              className="group flex items-center justify-center transition-all duration-300"
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.09)",
                color: "#A1A1AA",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#E8E5DD";
                e.currentTarget.style.borderColor = "var(--accent, #78A88B)";
                e.currentTarget.style.background = "rgba(120, 168, 139, 0.08)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#A1A1AA";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.09)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href={`mailto:${PERSONAL.email}`}
              aria-label="Send Email"
              className="group flex items-center justify-center transition-all duration-300"
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.09)",
                color: "#A1A1AA",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#E8E5DD";
                e.currentTarget.style.borderColor = "var(--accent, #78A88B)";
                e.currentTarget.style.background = "rgba(120, 168, 139, 0.08)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#A1A1AA";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.09)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>

          {/* ── ROLE + LOCATION inline ── */}
          <div
            ref={roleRef}
            style={{
              marginTop: "var(--h-gap-name-role, 24px)",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap" as const,
              gap: "0 16px",
              opacity: 0,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "var(--h-role-size)",
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                color: "rgba(232,229,221,0.85)",
                margin: 0,
              }}
            >
              AI &amp; BACKEND DEVELOPER
            </p>
            <span
              aria-hidden="true"
              style={{ color: "rgba(255,255,255,0.22)", fontSize: 11 }}
            >
              ·
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12.5,
                letterSpacing: "0.12em",
                color: "rgba(232,229,221,0.6)",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <MapPin size={12} aria-hidden="true" style={{ flexShrink: 0 }} />
              Pune, India
            </span>
          </div>

          {/* ── DESCRIPTION — 28px below role ── */}
          <p
            ref={descRef}
            style={{
              marginTop: "clamp(20px, 3vh, 28px)",
              fontFamily: "var(--font-ui), sans-serif",
              fontSize: "var(--h-desc-size)",
              fontWeight: 300,
              lineHeight: 1.65,
              maxWidth: "42ch",
              color: "rgba(232,229,221,0.82)",
              opacity: 0,
            }}
          >
            <span className="recruiter-highlight">2nd-year engineering student</span> at DYPIT Pune. I enjoy building{" "}
            <span className="recruiter-highlight">backend services</span>,{" "}
            <span className="recruiter-highlight">AI agent workflows</span>, and{" "}
            <span className="recruiter-highlight">full-stack applications</span> with Python, FastAPI, and React.
          </p>

          {/* ── STACK — 30px below description ── */}
          <p
            ref={stackRef}
            style={{
              marginTop: "clamp(24px, 3.5vh, 32px)",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 13.5,
              letterSpacing: "0.16em",
              textTransform: "uppercase" as const,
              color: "rgba(232,229,221,0.65)",
              opacity: 0,
            }}
          >
            {["PYTHON", "FASTAPI", "REACT", "SQL", "DOCKER"].map((item, i) => (
              <span
                key={item}
                style={{ display: "inline" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#E8E5DD")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(232,229,221,0.55)")}
              >
                {i > 0 && <span style={{ margin: "0 8px", opacity: 0.3 }}>/</span>}
                <span style={{ cursor: "default", transition: "color 0.2s ease" }}>{item}</span>
              </span>
            ))}
          </p>

          {/* ── CTAs — 36px below stack ── */}
          <div
            ref={ctaRef}
            className="flex items-center"
            style={{
              marginTop: "clamp(28px, 4vh, 36px)",
              gap: 40,
              opacity: 0,
            }}
          >
            <HeroCTA href={PERSONAL.resumeUrl} primary label="View resume">
              VIEW RESUME ↗
            </HeroCTA>
            <HeroCTA href={PERSONAL.github} label="GitHub profile">
              GITHUB ↗
            </HeroCTA>
          </div>
        </div>
      </div>

      {/* ─── Bottom hairline ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0"
        style={{ height: 1, background: "rgba(255,255,255,0.07)" }}
      />

      {/* ─── DEBUG coords (hidden by default) ────────────────────── */}
      {DEBUG_COORDS && (
        <DebugCoords />
      )}
    </section>
  );
}

/* ── CTA link component ────────────────────────────────────────────── */
function HeroCTA({
  href, children, label, primary = false,
}: {
  href: string; children: React.ReactNode; label: string; primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group flex items-center gap-3"
      style={{
        textDecoration: "none",
        color: primary ? "#E8E5DD" : "rgba(232,229,221,0.7)",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={e => {
        const arrow = e.currentTarget.querySelector<HTMLSpanElement>(".cta-arrow");
        if (arrow) { arrow.style.transform = "translate(2px, -2px)"; }
        e.currentTarget.style.color = "#E8E5DD";
      }}
      onMouseLeave={e => {
        const arrow = e.currentTarget.querySelector<HTMLSpanElement>(".cta-arrow");
        if (arrow) { arrow.style.transform = "translate(0,0)"; }
        e.currentTarget.style.color = primary ? "#E8E5DD" : "rgba(232,229,221,0.7)";
      }}
    >
      {/* leading line */}
      <span
        aria-hidden="true"
        style={{
          display: "block",
          width: 40,
          height: 1,
          background: "currentColor",
          flexShrink: 0,
          transformOrigin: "left",
          transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="group-hover:scale-x-125"
      />
      <span
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 13,
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
        }}
      >
        {/* split off arrow for nudge */}
        {typeof children === "string"
          ? children.slice(0, -1)
          : children}
        <span
          className="cta-arrow"
          aria-hidden="true"
          style={{ display: "inline-block", transition: "transform 0.2s ease" }}
        >
          {typeof children === "string" ? children.slice(-1) : ""}
        </span>
      </span>
    </a>
  );
}

/* ── Debug coords overlay ──────────────────────────────────────────── */
function DebugCoords() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (ref.current) ref.current.textContent = `X ${String(e.clientX).padStart(4,"0")}  Y ${String(e.clientY).padStart(4,"0")}`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed bottom-5 right-5 z-50 pointer-events-none select-none"
      style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)" }}
    />
  );
}
