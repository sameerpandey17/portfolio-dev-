"use client";

import { useState } from "react";

interface Insight {
  num: string;
  headline: string;
  context: string;
  note: string;
}

interface QuestionItem {
  id: string;
  num: string;
  question: string;
  answer: string;
}

const INSIGHTS: Insight[] = [
  {
    num: "01",
    headline: "Async does not automatically mean concurrent.",
    context: "VisionLink // MediaPipe + FastAPI",
    note: "Running CPU-bound computer vision inside FastAPI's async event loop starved the event loop and stalled WebSocket handshakes. Offloading inference to dedicated multiprocessing workers and coordinating over Redis Pub/Sub restored non-blocking frame delivery.",
  },
  {
    num: "02",
    headline: "A message broker is valuable only when boundaries are clear.",
    context: "VisionLink // Redis Pub/Sub",
    note: "Redis Pub/Sub decoupled high-frequency live video frames from persistent storage. Ingestion throughput never degrades database write locks, and dropped consumer sockets do not corrupt upstream state.",
  },
  {
    num: "03",
    headline: "Agents require deterministic state graphs, not prompt gymnastics.",
    context: "AIVOA // LangGraph + Groq",
    note: "Replacing single-prompt chains with a cyclical LangGraph state machine introduced deterministic conditional routing, strict Pydantic validation contracts, and automated provider failover within active turns.",
  },
];

const RECRUITER_QA: QuestionItem[] = [
  {
    id: "qa-role",
    num: "01",
    question: "What specific roles are you targeting?",
    answer: "Python Backend, Applied AI, or Full-Stack Engineering internships. I enjoy building clean APIs with FastAPI, working with PostgreSQL/SQLite, and developing AI agent workflows with LangGraph.",
  },
  {
    id: "qa-project",
    num: "02",
    question: "What project pushed your engineering the most?",
    answer: "VisionLink. Handling real-time video frames under concurrent WebSocket connections forced me to understand Python process boundaries, async event loops, and Redis Pub/Sub.",
  },
  {
    id: "qa-validation",
    num: "03",
    question: "How do you evaluate and validate technical claims?",
    answer: "Through clear and testable code: automated pytest suites, strict Pydantic data schemas, and public GitHub repositories documenting design decisions and tradeoffs.",
  },
  {
    id: "qa-learning",
    num: "04",
    question: "What are you currently learning?",
    answer: "Data Structures & Algorithms, database schema optimization with PostgreSQL and SQLAlchemy, and structured agent patterns with LangGraph.",
  },
  {
    id: "qa-location",
    num: "05",
    question: "Where are you available to work?",
    answer: "Based in Pune, India. Fully available for onsite roles in Pune, hybrid arrangements, or remote engineering teams globally.",
  },
];

function HighlightedAnswer({ text }: { text: string }) {
  const QA_HIGHLIGHTS = [
    "Python Backend, Applied AI, or Full-Stack Engineering internships",
    "building clean APIs with FastAPI",
    "automated pytest suites",
    "strict Pydantic data schemas",
    "Data Structures & Algorithms",
    "available for onsite roles in Pune, hybrid arrangements, or remote engineering teams globally",
  ];

  let parts: { text: string; highlight: boolean }[] = [{ text, highlight: false }];

  for (const term of QA_HIGHLIGHTS) {
    const nextParts: { text: string; highlight: boolean }[] = [];
    for (const part of parts) {
      if (part.highlight) {
        nextParts.push(part);
        continue;
      }
      const idx = part.text.indexOf(term);
      if (idx !== -1) {
        if (idx > 0) nextParts.push({ text: part.text.slice(0, idx), highlight: false });
        nextParts.push({ text: term, highlight: true });
        if (idx + term.length < part.text.length) {
          nextParts.push({ text: part.text.slice(idx + term.length), highlight: false });
        }
      } else {
        nextParts.push(part);
      }
    }
    parts = nextParts;
  }

  return (
    <>
      {parts.map((p, i) =>
        p.highlight ? (
          <span key={i} className="recruiter-highlight">
            {p.text}
          </span>
        ) : (
          p.text
        )
      )}
    </>
  );
}

export default function EngineeringNotes() {
  const [openId, setOpenId] = useState<string | null>("qa-role");

  const toggleQA = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="insights"
      aria-label="Hard-earned project insights and recruiter notes"
      style={{
        background: "var(--bg, #0B0C0B)",
        padding: "clamp(64px,10vh,120px) clamp(24px,5vw,80px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "clamp(48px,8vh,80px)" }}>
          <h2
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(36px, 5vw, 68px)",
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "-0.015em",
              lineHeight: 1.08,
              color: "#E8E5DD",
              margin: "0 0 16px",
            }}
          >
            Hard-Earned
            <br />
            Project Insights
          </h2>
          <p
            style={{
              fontFamily: "var(--font-ui), -apple-system, sans-serif",
              fontSize: "clamp(15.5px, 1.15vw, 18px)",
              color: "#A1A1AA",
              maxWidth: "52ch",
              fontWeight: 300,
              margin: 0,
            }}
          >
            Tradeoffs, lessons from debugging sessions, and recruiter questions.
          </p>
        </div>

        {/* ── PART 1: Hard-Earned Insights ── */}
        <div className="mb-20 md:mb-28">
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.03em",
              color: "#A1A1AA",
              display: "block",
              marginBottom: 32,
            }}
          >
            Engineering Notes · Key Takeaways
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-t border-[rgba(255,255,255,0.06)] pt-8">
            {INSIGHTS.map((item) => (
              <div key={item.num} className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 12.5,
                        letterSpacing: "0.14em",
                        color: "var(--accent, #78A88B)",
                      }}
                    >
                      INSIGHT {item.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 13,
                        letterSpacing: "0.04em",
                        color: "#A1A1AA",
                      }}
                    >
                      {item.context}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      fontSize: "clamp(20px, 1.7vw, 24px)",
                      fontWeight: 400,
                      fontStyle: "italic",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                      color: "#E8E5DD",
                      margin: "0 0 16px",
                    }}
                  >
                    &ldquo;{item.headline}&rdquo;
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-ui), -apple-system, sans-serif",
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: "rgba(255,255,255,0.8)",
                      margin: 0,
                      fontWeight: 300,
                    }}
                  >
                    {item.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PART 2: Recruiter Inquiries (Editorial Q&A) ── */}
        <div style={{ maxWidth: 960 }}>
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.03em",
              color: "#A1A1AA",
              display: "block",
              marginBottom: 24,
            }}
          >
            Technical Recruiter FAQ
          </span>

          <div className="border-t border-[rgba(255,255,255,0.08)]">
            {RECRUITER_QA.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleQA(item.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between text-left py-6 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                  >
                    <div className="flex items-baseline gap-4 md:gap-8">
                      <span
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 13,
                          letterSpacing: "0.14em",
                          color: isOpen ? "var(--accent, #78A88B)" : "#A1A1AA",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {item.num}
                      </span>
                      <span
                        className="group-hover:translate-x-1.5 transition-transform duration-200"
                        style={{
                          fontFamily: "var(--font-display), Georgia, serif",
                          fontSize: "clamp(19px, 1.9vw, 25px)",
                          fontWeight: 400,
                          letterSpacing: "-0.01em",
                          color: isOpen ? "#E8E5DD" : "rgba(255,255,255,0.88)",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {item.question}
                      </span>
                    </div>

                    {/* Simple + rotates into × */}
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 20,
                        lineHeight: 1,
                        color: isOpen ? "var(--accent, #78A88B)" : "#A1A1AA",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease",
                        display: "inline-block",
                        flexShrink: 0,
                        marginLeft: 16,
                      }}
                    >
                      +
                    </span>
                  </button>

                  {/* Smooth answer reveal using CSS Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition: "grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <p
                        style={{
                          fontFamily: "var(--font-ui), -apple-system, sans-serif",
                          fontSize: "clamp(15px, 1.05vw, 17.5px)",
                          lineHeight: 1.7,
                          color: "rgba(255,255,255,0.85)",
                          maxWidth: "60ch",
                          paddingLeft: "clamp(24px, 4vw, 48px)",
                          paddingBottom: 24,
                          margin: 0,
                          fontWeight: 300,
                          opacity: isOpen ? 1 : 0,
                          transition: "opacity 0.25s ease",
                        }}
                      >
                        <HighlightedAnswer text={item.answer} />
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
