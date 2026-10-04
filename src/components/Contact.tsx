"use client";

import { useState } from "react";
import { PERSONAL } from "@/data/content";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${PERSONAL.email}`;
    }
  };

  return (
    <footer
      id="contact"
      aria-label="Contact and closing statement"
      style={{
        background: "transparent",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
      }}
    >
      {/* ─── CONTACT SECTION · Editorial closing page ─── */}
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "clamp(80px,14vh,160px) clamp(24px,5vw,80px) clamp(64px,10vh,120px)",
        }}
      >

        {/* Large Editorial Headline */}
        <h2
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(42px, 7vw, 96px)",
            fontWeight: 400,
            fontStyle: "italic",
            letterSpacing: "-0.02em",
            lineHeight: 1.04,
            color: "#E8E5DD",
            margin: "0 0 28px",
            maxWidth: "20ch",
          }}
        >
          Let&apos;s connect
          <br />
          and build.
        </h2>

        {/* Supporting Copy */}
        <p
          style={{
            fontFamily: "var(--font-ui), -apple-system, sans-serif",
            fontSize: "clamp(16.5px, 1.25vw, 20px)",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.82)",
            maxWidth: "52ch",
            fontWeight: 300,
            margin: "0 0 56px",
          }}
        >
          2nd-year B.E. student in AI &amp; Data Science at DYPIT Pune. Open to{" "}
          <span className="recruiter-highlight">backend, applied AI, and full-stack internships</span>, or collaborating on interesting projects.
        </p>

        {/* Primary Contact Action — Direct Editorial Email Link */}
        <div className="mb-14">
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#A1A1AA",
              display: "block",
              marginBottom: 8,
            }}
          >
            Direct Inquiry // Email
          </span>

          <div className="inline-flex flex-col items-start group">
            <a
              href={`mailto:${PERSONAL.email}`}
              className="inline-flex items-center gap-3"
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(24px, 3.4vw, 44px)",
                fontWeight: 400,
                color: "#E8E5DD",
                textDecoration: "none",
                lineHeight: 1.2,
                transition: "color 0.25s ease",
              }}
            >
              <span>{PERSONAL.email}</span>
              <ArrowUpRight
                size={28}
                className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-250 text-[var(--accent)]"
                aria-hidden="true"
              />
            </a>

            {/* Expanding Underline on Hover via scaleX */}
            <span
              aria-hidden="true"
              className="w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
              style={{
                height: 1,
                background: "var(--accent, #78A88B)",
                display: "block",
                marginTop: 4,
              }}
            />

            {/* Quick copy trigger */}
            <button
              type="button"
              onClick={handleCopy}
              className="mt-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: copied ? "var(--accent, #78A88B)" : "#A1A1AA",
                transition: "color 0.2s ease",
              }}
            >
              {copied ? "✓ Copied to clipboard" : "Click to copy address"}
            </button>
          </div>
        </div>

        {/* Secondary Links — Editorial text links */}
        <div
          className="flex flex-wrap items-center gap-8 md:gap-12 pt-8"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 13.5,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E8E5DD")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
          >
            <span>GitHub</span>
            <ArrowUpRight size={14} className="text-white/40 group-hover:text-white transition-colors" />
          </a>

          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 13.5,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E8E5DD")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
          >
            <span>LinkedIn</span>
            <ArrowUpRight size={14} className="text-white/40 group-hover:text-white transition-colors" />
          </a>

          <a
            href={PERSONAL.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 13.5,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E8E5DD")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
          >
            <span>X / Twitter</span>
            <ArrowUpRight size={14} className="text-white/40 group-hover:text-white transition-colors" />
          </a>

          <a
            href={PERSONAL.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 13.5,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent, #78A88B)",
              textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
          >
            <span>Resume PDF</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* ─── FOOTER BAR — Minimal, quiet ─── */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "24px clamp(24px,5vw,80px)",
        }}
      >
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ maxWidth: 1440, margin: "0 auto" }}
        >
          {/* Left: Logo */}
          <span
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: 18,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            SP
          </span>

          {/* Center: Location */}
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 12.5,
              letterSpacing: "0.1em",
              color: "#A1A1AA",
            }}
          >
            Pune, India
          </span>

          {/* Right: Copyright */}
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 12.5,
              letterSpacing: "0.1em",
              color: "#A1A1AA",
            }}
          >
            &copy; {new Date().getFullYear()} Sameer Pandey
          </span>
        </div>
      </div>
    </footer>
  );
}
