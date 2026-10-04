"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

/* ─── Shared helpers ──────────────────────────────────────────────────── */

/** Tiny animated "signal" dot that travels along an SVG path */
function SignalDot({
  cx, cy, r = 3, delay = 0, duration = 2, color = "var(--accent)",
}: { cx: number; cy: number; r?: number; delay?: number; duration?: number; color?: string }) {
  const ref = useRef<SVGCircleElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, r: 0 },
      {
        opacity: 1, r,
        duration: 0.3,
        delay,
        ease: "power2.out",
        yoyo: true,
        repeat: -1,
        repeatDelay: duration - 0.3,
      }
    );
  }, [r, delay, duration]);
  return <circle ref={ref} cx={cx} cy={cy} r={r} fill={color} opacity={0} />;
}

/** Animated dashed flow line */
function FlowLine({
  d, delay = 0, duration = 2.5, color = "rgba(111,175,135,0.5)",
}: { d: string; delay?: number; duration?: number; color?: string }) {
  const ref = useRef<SVGPathElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const len = ref.current.getTotalLength?.() ?? 200;
    gsap.set(ref.current, { strokeDasharray: `6 ${len}`, strokeDashoffset: len });
    gsap.to(ref.current, {
      strokeDashoffset: -len,
      duration,
      delay,
      ease: "none",
      repeat: -1,
    });
  }, [delay, duration]);
  return <path ref={ref} d={d} stroke={color} strokeWidth={1} fill="none" />;
}

/* ─── NODE helper ─────────────────────────────────────────────────────── */
function Node({
  x, y, w = 120, h = 40, label, sub, accent = false, tier,
}: {
  x: number; y: number; w?: number; h?: number;
  label: string; sub?: string; accent?: boolean; tier?: string;
}) {
  return (
    <g>
      <rect
        x={x - w / 2} y={y - h / 2} width={w} height={h}
        rx={2}
        fill={accent ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.03)"}
        stroke={accent ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.1)"}
        strokeWidth={1}
      />
      {tier && (
        <text x={x} y={y - h / 2 + 10} textAnchor="middle"
          fontSize={7} fill={accent ? "#C9A84C" : "#777774"}
          fontFamily="IBM Plex Mono, monospace" letterSpacing={1}>
          {tier}
        </text>
      )}
      <text x={x} y={tier ? y + 2 : y + 4} textAnchor="middle"
        fontSize={10} fill={accent ? "#C9A84C" : "#E8E5DD"}
        fontFamily="IBM Plex Mono, monospace" fontWeight={500}>
        {label}
      </text>
      {sub && (
        <text x={x} y={y + 15} textAnchor="middle"
          fontSize={8} fill="#777774"
          fontFamily="IBM Plex Mono, monospace">
          {sub}
        </text>
      )}
    </g>
  );
}

/* ─── VISIONLINK DIAGRAM ─────────────────────────────────────────────── */
export function VisionLinkArchitecture() {
  return (
    <div className="relative w-full overflow-hidden" style={{ background: "rgba(11,12,11,0.85)" }}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
        <span className="font-mono text-[11px] tracking-[0.06em] text-zinc-400">
          System Flow · Multiprocessing WebSocket Pipeline
        </span>
        <span className="font-mono text-[11px] text-[var(--accent)] tracking-wider">
          Event-Loop Decoupled
        </span>
      </div>

      <svg viewBox="0 0 700 160" className="w-full" aria-label="VisionLink architecture diagram">
        {/* Blueprint grid */}
        <defs>
          <pattern id="vl-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth={0.5} />
          </pattern>
        </defs>
        <rect width="700" height="160" fill="url(#vl-grid)" />

        {/* Flow lines */}
        <FlowLine d="M 120 80 L 210 80" delay={0} duration={2.2} />
        <FlowLine d="M 310 80 L 390 80" delay={0.4} duration={2.0} color="rgba(201,168,76,0.7)" />
        <FlowLine d="M 490 80 L 580 80" delay={0.8} duration={2.2} />

        {/* Reverse flow — Redis back to FastAPI */}
        <FlowLine d="M 390 95 Q 350 120 310 95" delay={1} duration={3} color="rgba(201,168,76,0.35)" />

        {/* Nodes */}
        <Node x={70}  y={80} w={100} h={44} label="Browser" sub="WebSocket" tier="CLIENT" />
        <Node x={260} y={80} w={110} h={44} label="FastAPI" sub="Async I/O" tier="INGRESS" />
        <Node x={440} y={80} w={110} h={48} label="Redis Pub/Sub" sub="Message Bus" tier="BUS" accent />
        <Node x={630} y={80} w={120} h={44} label="MediaPipe" sub="Worker Process" tier="COMPUTE" />

        {/* Arrow heads */}
        {[[165,80],[345,80],[535,80]].map(([ax,ay],i)=>(
          <polygon key={i}
            points={`${ax},${ay} ${ax-6},${ay-3} ${ax-6},${ay+3}`}
            fill="rgba(255,255,255,0.2)"
          />
        ))}

        {/* Signal pulses */}
        <SignalDot cx={165} cy={80} delay={0} duration={2.2} />
        <SignalDot cx={345} cy={80} delay={0.4} duration={2} color="#C9A84C" />
        <SignalDot cx={535} cy={80} delay={0.8} duration={2.2} />

        {/* Axis label */}
        <text x="350" y="152" textAnchor="middle" fontSize={8}
          fill="rgba(255,255,255,0.2)" fontFamily="IBM Plex Mono, monospace" letterSpacing={2}>
          FRAME PIPELINE · REDIS PUB/SUB · POSTGRESQL PERSISTENCE
        </text>
      </svg>
    </div>
  );
}

/* ─── AIVOA DIAGRAM ──────────────────────────────────────────────────── */
export function AivoaArchitecture() {
  return (
    <div className="relative w-full overflow-hidden" style={{ background: "rgba(11,12,11,0.85)" }}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
        <span className="font-mono text-[11px] tracking-[0.06em] text-zinc-400">
          QMS Pipeline · Deviation Intake &amp; Copilot
        </span>
        <span className="font-mono text-[11px] text-[var(--accent)] tracking-wider">
          LangGraph &middot; FastAPI
        </span>
      </div>

      <svg viewBox="0 0 700 200" className="w-full" aria-label="AIVOA QMS architecture diagram">
        <defs>
          <pattern id="av-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth={0.5} />
          </pattern>
        </defs>
        <rect width="700" height="200" fill="url(#av-grid)" />

        {/* Input sources row */}
        <Node x={75}  y={45}  w={106} h={38} label="Chat Input"   sub="Text / paste" tier="INGEST" />
        <Node x={75}  y={95}  w={106} h={38} label="Document"     sub="PDF/DOCX/XLSX" tier="INGEST" />
        <Node x={75}  y={145} w={106} h={38} label="OCR"          sub="Scanned files" tier="INGEST" />

        {/* Flow lines: inputs → intent router */}
        <FlowLine d="M 128 45  L 202 95" delay={0}   duration={2} />
        <FlowLine d="M 128 95  L 202 95" delay={0.2} duration={2} />
        <FlowLine d="M 128 145 L 202 95" delay={0.4} duration={2} color="rgba(255,255,255,0.25)" />

        {/* Main pipeline */}
        <Node x={260} y={95} w={116} h={52} label="Intent Router" sub="LangGraph state" tier="ROUTE" accent />
        <Node x={410} y={95} w={116} h={52} label="LLM Extract"  sub="Groq / Pydantic" tier="EXTRACT" />
        <Node x={570} y={68}  w={116} h={42} label="Merge / Diff" sub="Incremental" tier="UPDATE" />
        <Node x={570} y={122} w={116} h={42} label="Risk Score"   sub="Downstream node" tier="ASSESS" accent />

        {/* Pipeline flows */}
        <FlowLine d="M 318 95 L 352 95" delay={0.3} duration={1.8} color="rgba(201,168,76,0.8)" />
        <FlowLine d="M 468 85 L 512 68"  delay={0.7} duration={1.8} />
        <FlowLine d="M 468 105 L 512 122" delay={0.9} duration={1.8} color="rgba(201,168,76,0.5)" />

        <SignalDot cx={335} cy={95} delay={0.3} color="#C9A84C" />
        <SignalDot cx={490} cy={76}  delay={0.7} />
        <SignalDot cx={490} cy={114} delay={0.9} color="rgba(201,168,76,0.7)" />

        <text x="350" y="188" textAnchor="middle" fontSize={8}
          fill="rgba(255,255,255,0.2)" fontFamily="IBM Plex Mono, monospace" letterSpacing={2}>
          LANGGRAPH · GROQ · PYDANTIC · POSTGRESQL · DOCKER COMPOSE
        </text>
      </svg>
    </div>
  );
}

/* ─── CALORUPEE DIAGRAM ──────────────────────────────────────────────── */
export function CaloRupeeArchitecture() {
  return (
    <div className="relative w-full overflow-hidden" style={{ background: "rgba(11,12,11,0.85)" }}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
        <span className="font-mono text-[11px] tracking-[0.06em] text-zinc-400">
          Pipeline · Dual-LLM Budget Grounding
        </span>
        <span className="font-mono text-[11px] text-[var(--accent)] tracking-wider">
          Zero Hallucination
        </span>
      </div>

      <svg viewBox="0 0 700 140" className="w-full" aria-label="CaloRupee pipeline diagram">
        <defs>
          <pattern id="cr-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth={0.5} />
          </pattern>
        </defs>
        <rect width="700" height="140" fill="url(#cr-grid)" />

        <FlowLine d="M 120 70 L 215 70" delay={0} />
        <FlowLine d="M 320 70 L 400 70" delay={0.5} color="rgba(201,168,76,0.7)" />
        <FlowLine d="M 510 70 L 600 70" delay={1.0} />
        {/* Validation loop back */}
        <FlowLine d="M 600 80 Q 560 110 510 85 Q 460 110 400 85" delay={1.5} duration={3.5} color="rgba(201,168,76,0.3)" />

        <Node x={70}  y={70} w={100} h={40} label="₹80 to ₹120/day" sub="Budget Cap" tier="CONSTRAINT" />
        <Node x={265} y={70} w={110} h={40} label="Dual LLM" sub="Groq + Fallback" tier="GENERATION" accent />
        <Node x={455} y={70} w={110} h={40} label="Pydantic" sub="Schema Guard" tier="VALIDATION" />
        <Node x={640} y={70} w={100} h={40} label="Nutrition API" sub="Ground Truth" tier="VERIFY" />

        <SignalDot cx={168} cy={70} delay={0} />
        <SignalDot cx={360} cy={70} delay={0.5} color="#C9A84C" />
        <SignalDot cx={555} cy={70} delay={1.0} />

        <text x="350" y="132" textAnchor="middle" fontSize={8}
          fill="rgba(255,255,255,0.2)" fontFamily="IBM Plex Mono, monospace" letterSpacing={2}>
          PYDANTIC VALIDATION · NUTRITION API GROUNDING · AUTO-FAILOVER
        </text>
      </svg>
    </div>
  );
}

/* ─── NUTRISYNC DIAGRAM ──────────────────────────────────────────────── */
export function NutriSyncArchitecture() {
  return (
    <div className="relative w-full overflow-hidden" style={{ background: "rgba(11,12,11,0.85)" }}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
        <span className="font-mono text-[11px] tracking-[0.06em] text-zinc-400">
          RL Environment · 15-Factor Reward Shaping
        </span>
        <span className="font-mono text-[11px] text-[var(--accent)] tracking-wider">
          Multi-Factor Shaping
        </span>
      </div>

      <svg viewBox="0 0 700 160" className="w-full" aria-label="NutriSync RL diagram">
        <defs>
          <pattern id="ns-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth={0.5} />
          </pattern>
        </defs>
        <rect width="700" height="160" fill="url(#ns-grid)" />

        {/* RL loop — circular arrows */}
        <FlowLine d="M 160 80 L 270 80" delay={0} />
        <FlowLine d="M 420 80 L 530 80" delay={0.6} color="rgba(201,168,76,0.7)" />
        {/* Reward back to agent */}
        <FlowLine d="M 530 95 Q 500 130 350 130 Q 200 130 160 95" delay={1.2} duration={3} color="rgba(201,168,76,0.4)" />

        <Node x={100} y={80} w={110} h={44} label="RL Agent" sub="Policy Network" tier="AGENT" />
        <Node x={345} y={80} w={130} h={48} label="Reward Engine" sub="15-Factor Shape" tier="OBJECTIVE" accent />
        <Node x={590} y={80} w={110} h={44} label="Gradio" sub="Policy Visualizer" tier="MONITOR" />

        <SignalDot cx={215} cy={80} delay={0} />
        <SignalDot cx={475} cy={80} delay={0.6} color="#C9A84C" />
        <SignalDot cx={350} cy={130} delay={1.2} r={2} color="rgba(201,168,76,0.6)" />

        {/* 50 foods label */}
        <text x="345" y="54" textAnchor="middle" fontSize={9}
          fill="rgba(201,168,76,0.5)" fontFamily="IBM Plex Mono, monospace">
          ACTION SPACE: 50 Indian food items
        </text>

        <text x="350" y="154" textAnchor="middle" fontSize={8}
          fill="rgba(255,255,255,0.2)" fontFamily="IBM Plex Mono, monospace" letterSpacing={2}>
          OPENAI GYM · REWARD SHAPING · GRADIO · OPENENV
        </text>
      </svg>
    </div>
  );
}

/* ─── HACKATHON DIAGRAM ──────────────────────────────────────────────── */
export function HackathonArchitecture() {
  return (
    <div className="relative w-full overflow-hidden" style={{ background: "rgba(11,12,11,0.85)" }}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
        <span className="font-mono text-[11px] tracking-[0.06em] text-zinc-400">
          Sprint · 180-Minute Full-Stack Delivery
        </span>
        <span className="font-mono text-[11px] text-[var(--accent)] tracking-wider">
          1st Place
        </span>
      </div>

      <svg viewBox="0 0 700 130" className="w-full" aria-label="Hackathon architecture">
        <defs>
          <pattern id="hk-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth={0.5} />
          </pattern>
        </defs>
        <rect width="700" height="130" fill="url(#hk-grid)" />

        <FlowLine d="M 120 65 L 215 65" delay={0} />
        <FlowLine d="M 320 65 L 395 65" delay={0.4} />
        <FlowLine d="M 500 65 L 580 65" delay={0.8} />

        <Node x={65}  y={65} w={100} h={40} label="Live Orders" sub="Student Queue" tier="INPUT" />
        <Node x={265} y={65} w={110} h={40} label="Order Queue" sub="State Manager" tier="QUEUE" accent />
        <Node x={445} y={65} w={110} h={40} label="Admin Panel" sub="RBAC Dashboard" tier="CONTROL" />
        <Node x={630} y={65} w={100} h={40} label="Payments" sub="Reconciliation" tier="FINANCE" />

        <SignalDot cx={168} cy={65} delay={0} />
        <SignalDot cx={358} cy={65} delay={0.4} />
        <SignalDot cx={540} cy={65} delay={0.8} color="#C9A84C" />

        <text x="350" y="122" textAnchor="middle" fontSize={8}
          fill="rgba(255,255,255,0.2)" fontFamily="IBM Plex Mono, monospace" letterSpacing={2}>
          SHIPPED IN 180 MINUTES · FULL-STACK · ROLE-BASED ACCESS
        </text>
      </svg>
    </div>
  );
}
