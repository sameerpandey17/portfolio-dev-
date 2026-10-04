"use client";

import { useEffect, useState, useRef } from "react";
import { PERSONAL } from "@/data/content";
import { ArrowUpRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Work",      href: "#work"     },
  { label: "Timeline",  href: "#timeline" },
  { label: "Stack",     href: "#stack"    },
  { label: "Notes",     href: "#insights" },
  { label: "Contact",   href: "#contact"  },
];

export default function StickyIdentityNav() {
  const [scrolled,    setScrolled]    = useState(false);
  const [activeHref,  setActiveHref]  = useState("");
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const observerRef   = useRef<IntersectionObserver | null>(null);

  /* ── scroll → blur ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── active section via IntersectionObserver ── */
  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.slice(1));
    const els = sections.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    els.forEach(el => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  /* ── close mobile on scroll ── */
  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [mobileOpen]);

  /* ── lock body scroll when mobile open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── smooth scroll handler ── */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMobileOpen(false);
      const target = document.querySelector<HTMLElement>(href);
      if (target) {
        if (typeof window !== "undefined" && window.__lenisInstance) {
          window.__lenisInstance.scrollTo(target, { offset: -20, duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
        style={{
          background: scrolled ? "rgba(8,9,8,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            height: 68,
            padding: "0 clamp(20px,4vw,64px)",
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            aria-label="Sameer Pandey: back to top"
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: 18,
              fontStyle: "italic",
              letterSpacing: "0.02em",
              color: "rgba(255,255,255,0.9)",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            SP
          </a>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center"
            style={{ gap: "clamp(18px, 2.2vw, 36px)" }}
          >
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeHref === href;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="nav-link group relative"
                  aria-current={isActive ? "page" : undefined}
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 13.5,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase" as const,
                    color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    paddingBottom: 2,
                    transition: "color 0.25s ease",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                  onMouseLeave={e => (e.currentTarget.style.color = isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)")}
                >
                  {label}
                  {/* animated underline */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 w-full h-px pointer-events-none"
                    style={{
                      background: "var(--accent, #78A88B)",
                      transformOrigin: "left",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 0.3s cubic-bezier(.16,1,.3,1)",
                    }}
                  />
                  {/* hover underline */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 w-full h-px pointer-events-none"
                    style={{
                      background: "rgba(255,255,255,0.25)",
                      transformOrigin: "left",
                      transform: "scaleX(0)",
                      transition: "transform 0.3s cubic-bezier(.16,1,.3,1)",
                    }}
                  />
                  {/* active dot */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: -6,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 3,
                        height: 3,
                        borderRadius: "50%",
                        background: "var(--accent, #78A88B)",
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: resume + mobile toggle */}
          <div className="flex items-center" style={{ gap: 24 }}>
            <a
              href={PERSONAL.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View resume PDF"
              className="hidden md:flex items-center gap-2 group"
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 13.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: "rgba(255,255,255,0.55)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            >
              Resume
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>

            {/* Mobile hamburger */}
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="md:hidden flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
              style={{
                width: 44, height: 44,
                color: "rgba(255,255,255,0.7)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setMobileOpen(v => !v)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className="fixed inset-0 z-40 md:hidden flex flex-col"
        style={{
          background: "rgba(7,7,7,0.97)",
          backdropFilter: "blur(16px)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.35s cubic-bezier(.16,1,.3,1)",
          paddingTop: 80,
          paddingLeft: "clamp(24px,8vw,64px)",
          paddingRight: "clamp(24px,8vw,64px)",
        }}
      >
        <nav aria-label="Mobile navigation">
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {NAV_LINKS.map(({ label, href }, i) => (
              <li
                key={href}
                style={{
                  transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: mobileOpen ? 1 : 0,
                  transition: `transform 0.4s cubic-bezier(.16,1,.3,1) ${i * 0.07}s, opacity 0.4s ease ${i * 0.07}s`,
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  padding: "20px 0",
                }}
              >
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: "clamp(28px, 8vw, 48px)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: activeHref === href ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                    textDecoration: "none",
                    display: "block",
                    transition: "color 0.2s ease",
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
            <li
              style={{
                transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                opacity: mobileOpen ? 1 : 0,
                transition: `transform 0.4s cubic-bezier(.16,1,.3,1) ${NAV_LINKS.length * 0.07}s, opacity 0.4s ease ${NAV_LINKS.length * 0.07}s`,
                paddingTop: 24,
              }}
            >
              <a
                href={PERSONAL.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 13,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase" as const,
                  color: "var(--accent, #78A88B)",
                  textDecoration: "none",
                }}
              >
                Resume <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
