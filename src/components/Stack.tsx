"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  SKILLS_DATA,
  CAPABILITY_CATEGORIES,
  CORE_STACK_ITEMS,
  type SkillItemData,
  type SkillLevel,
} from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

/* ─── Core Stack Pills with Authentic Brand Logos ──────────────────────────── */
const CORE_PILL_LIST = [
  {
    name: "Python",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="flex-shrink-0" aria-hidden="true">
        <path d="M11.91 2C6.88 2 7.2 4.18 7.2 4.18L7.22 6.45H12.1V7.17H5.25C5.25 7.17 2 6.8 2 11.83C2 16.86 4.84 16.63 4.84 16.63H6.53V14.24C6.53 11.45 8.94 11.45 8.94 11.45H13.81C16.32 11.45 16.6 9.17 16.6 9.17V4.37C16.6 4.37 16.92 2 11.91 2ZM9.47 3.48C10.08 3.48 10.57 3.97 10.57 4.58C10.57 5.19 10.08 5.68 9.47 5.68C8.86 5.68 8.37 5.19 8.37 4.58C8.37 3.97 8.86 3.48 9.47 3.48Z" fill="#3776AB"/>
        <path d="M12.09 22C17.12 22 16.8 19.82 16.8 19.82L16.78 17.55H11.9V16.83H18.75C18.75 16.83 22 17.2 22 12.17C22 7.14 19.16 7.37 19.16 7.37H17.47V9.76C17.47 12.55 15.06 12.55 15.06 12.55H10.19C7.68 12.55 7.4 14.83 7.4 14.83V19.63C7.4 19.63 7.08 22 12.09 22ZM14.53 20.52C13.92 20.52 13.43 20.03 13.43 19.42C13.43 18.81 13.92 18.32 14.53 18.32C15.14 18.32 15.63 18.81 15.63 19.42C15.63 20.03 15.14 20.52 14.53 20.52Z" fill="#FFD43B"/>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="flex-shrink-0" aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#3178C6"/>
        <path d="M11.75 9H6.25V10.75H8.1V18H9.9V10.75H11.75V9Z" fill="white"/>
        <path d="M13.25 15.6C13.8 16.1 14.55 16.45 15.4 16.45C16.5 16.45 17.15 15.9 17.15 15.1C17.15 13.2 13.5 13.7 13.5 11.2C13.5 9.8 14.6 8.8 16.2 8.8C17.1 8.8 17.9 9.1 18.5 9.55L17.9 11C17.4 10.65 16.8 10.4 16.15 10.4C15.2 10.4 14.7 10.9 14.7 11.55C14.7 13.3 18.35 12.75 18.35 15.35C18.35 16.85 17.2 18 15.35 18C14.3 18 13.3 17.55 12.65 16.95L13.25 15.6Z" fill="white"/>
      </svg>
    ),
  },
  {
    name: "JavaScript",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="flex-shrink-0" aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
        <path d="M7 17.2C7.6 17.7 8.35 18 9.2 18C10.7 18 11.65 17.15 11.65 15.3V9.5H9.95V15.25C9.95 16.1 9.5 16.45 8.85 16.45C8.3 16.45 7.75 16.2 7.35 15.8L7 17.2Z" fill="#1A1A1A"/>
        <path d="M13.25 15.6C13.8 16.1 14.55 16.45 15.4 16.45C16.5 16.45 17.15 15.9 17.15 15.1C17.15 13.2 13.5 13.7 13.5 11.2C13.5 9.8 14.6 8.8 16.2 8.8C17.1 8.8 17.9 9.1 18.5 9.55L17.9 11C17.4 10.65 16.8 10.4 16.15 10.4C15.2 10.4 14.7 10.9 14.7 11.55C14.7 13.3 18.35 12.75 18.35 15.35C18.35 16.85 17.2 18 15.35 18C14.3 18 13.3 17.55 12.65 16.95L13.25 15.6Z" fill="#1A1A1A"/>
      </svg>
    ),
  },
  {
    name: "React / Next.js",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="flex-shrink-0" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(30 12 12)" stroke="#00D8FF" strokeWidth="1.5"/>
        <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(90 12 12)" stroke="#00D8FF" strokeWidth="1.5"/>
        <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(150 12 12)" stroke="#00D8FF" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="2" fill="#00D8FF"/>
      </svg>
    ),
  },
  {
    name: "FastAPI",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="flex-shrink-0" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="#059669"/>
        <path d="M13 3L6 13H12L11 21L18 11H12L13 3Z" fill="white"/>
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="flex-shrink-0" aria-hidden="true">
        <path d="M12.012 2c-3.136 0-5.836 1.76-7.14 4.354C4.33 6.136 3.784 6 3.204 6 1.434 6 0 7.434 0 9.204c0 1.464.98 2.697 2.324 3.064-.08.43-.124.877-.124 1.332 0 4.639 3.761 8.4 8.4 8.4.52 0 1.026-.048 1.516-.14.62.705 1.53 1.14 2.532 1.14 1.88 0 3.4-1.52 3.4-3.4 0-.3-.04-.59-.115-.867C20.91 17.3 22.8 14.86 22.8 12c0-5.523-4.836-10-10.788-10zm-1.412 2.8c4.64 0 8.4 3.76 8.4 8.4 0 2.22-.86 4.24-2.28 5.75-.41-.53-.99-.91-1.67-1.07.24-.72.38-1.49.38-2.28 0-3.98-3.22-7.2-7.2-7.2-.66 0-1.3.09-1.9.26C8.5 6.33 10.16 4.8 12.012 4.8z" fill="#336791"/>
      </svg>
    ),
  },
  {
    name: "LangGraph",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" aria-hidden="true">
        <circle cx="6" cy="6" r="2.5" fill="#2DD4BF" stroke="none" />
        <circle cx="18" cy="6" r="2.5" fill="#2DD4BF" stroke="none" />
        <circle cx="12" cy="18" r="2.5" fill="#2DD4BF" stroke="none" />
        <line x1="8.2" y1="6" x2="15.8" y2="6" stroke="#2DD4BF" strokeWidth="1.5" />
        <line x1="7.2" y1="8" x2="10.8" y2="16" stroke="#2DD4BF" strokeWidth="1.5" />
        <line x1="16.8" y1="8" x2="13.2" y2="16" stroke="#2DD4BF" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Git",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" aria-hidden="true">
        <line x1="6" y1="3" x2="6" y2="15" />
        <circle cx="18" cy="6" r="3" fill="#22C55E" stroke="none" />
        <circle cx="6" cy="18" r="3" fill="#22C55E" stroke="none" />
        <path d="M18 9a9 9 0 0 1-9 9" />
      </svg>
    ),
  },
];

/* ─── Project Anchor Mapping ──────────────────────────────────────────────── */
const PROJECT_ANCHORS: Record<string, string> = {
  VisionLink: "#project-visionlink",
  AIVOA: "#project-aivoa",
  CaloRupee: "#project-calorupee",
  NutriSync: "#project-nutrisync",
};

/* ─── Normalized Monochrome Technology Icons (20px, currentColor) ─────────── */
function TechIcon({ id }: { id: string }) {
  switch (id) {
    case "python":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="currentColor" aria-hidden="true">
          <path d="M12 0c-4.4 0-4.8.4-4.8 2.2V4h5v1H6.2C4.4 5 4 5.4 4 9.8c0 4.2.4 4.8 2.2 4.8h1.4v-2.1c0-1.7 1.4-3.1 3.1-3.1h5.1c1.5 0 2.7-1.2 2.7-2.7V4.9c0-1.8-.4-4.9-6.5-4.9zm-2.6 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zM17.8 9.4c-1.8 0-2.2-.4-2.2-4.8H14v2.1c0 1.7-1.4 3.1-3.1 3.1H5.8c-1.5 0-2.7 1.2-2.7 2.7v1.8c0 1.8.4 4.9 6.5 4.9 4.4 0 4.8-.4 4.8-2.2V20h-5v-1h6c1.8 0 2.2-.4 2.2-4.8 0-4.2-.4-4.8-2.2-4.8h-2.4zm-3.2 11.6c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" />
        </svg>
      );
    case "fastapi":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="currentColor" aria-hidden="true">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm1 14h-2v-4H9l3-6v4h2l-3 6z" />
        </svg>
      );
    case "postgresql":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="currentColor" aria-hidden="true">
          <path d="M12.012 2c-3.136 0-5.836 1.76-7.14 4.354C4.33 6.136 3.784 6 3.204 6 1.434 6 0 7.434 0 9.204c0 1.464.98 2.697 2.324 3.064-.08.43-.124.877-.124 1.332 0 4.639 3.761 8.4 8.4 8.4.52 0 1.026-.048 1.516-.14.62.705 1.53 1.14 2.532 1.14 1.88 0 3.4-1.52 3.4-3.4 0-.3-.04-.59-.115-.867C20.91 17.3 22.8 14.86 22.8 12c0-5.523-4.836-10-10.788-10zm-1.412 2.8c4.64 0 8.4 3.76 8.4 8.4 0 2.22-.86 4.24-2.28 5.75-.41-.53-.99-.91-1.67-1.07.24-.72.38-1.49.38-2.28 0-3.98-3.22-7.2-7.2-7.2-.66 0-1.3.09-1.9.26C8.5 6.33 10.16 4.8 12.012 4.8z" />
        </svg>
      );
    case "sqlalchemy":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 2v7.31L4.17 19.5A2 2 0 0 0 5.89 22h12.22a2 2 0 0 0 1.72-2.5L14 9.31V2" />
          <line x1="8" y1="2" x2="16" y2="2" />
          <line x1="8.5" y1="14" x2="15.5" y2="14" />
        </svg>
      );
    case "redis":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="currentColor" aria-hidden="true">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5L2 14.5l10 5 10-5-10-5zm0 7.5L4.5 19.5 12 23l7.5-3.5L12 17z" />
        </svg>
      );
    case "nginx":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="12 2 22 7.8 22 16.2 12 22 2 16.2 2 7.8 12 2" />
          <path d="M8 8v8l8-8v8" />
        </svg>
      );
    case "langgraph":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="12" cy="18" r="2.5" />
          <path d="M8.2 7.2L15.8 7.2M7.2 8.2L10.8 15.8M16.8 8.2L13.2 15.8" />
        </svg>
      );
    case "llm apis":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3v3m0 12v3M3 12h3m12 0h3m-2.6-6.4l-2.1 2.1m-8.6 8.6l-2.1 2.1m0-12.8l2.1 2.1m8.6 8.6l2.1 2.1" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "mediapipe":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
          <line x1="6" y1="3" x2="6" y2="21" />
          <circle cx="6" cy="8" r="2" fill="currentColor" stroke="none" />
          <line x1="12" y1="3" x2="12" y2="21" />
          <circle cx="12" cy="16" r="2" fill="currentColor" stroke="none" />
          <line x1="18" y1="3" x2="18" y2="21" />
          <circle cx="18" cy="11" r="2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "reinforcement learning":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
          <line x1="9" y1="21" x2="15" y2="21" />
        </svg>
      );
    case "reward shaping":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
          <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      );
    case "openenv":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7 8h6M10 8v8M15 11.5c.6-.4 1.3-.5 2-.5 1.1 0 2 .5 2 1.5s-.8 1.5-2 1.8c-1.2.3-2 .8-2 1.8 0 1.1.9 1.9 2.2 1.9.8 0 1.6-.2 2.2-.7" />
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 16c0 1.1-.9 2-2 2s-2-.9-2-2v-3M14 11.5c.6-.4 1.3-.5 2-.5 1.1 0 2 .5 2 1.5s-.8 1.5-2 1.8c-1.2.3-2 .8-2 1.8 0 1.1.9 1.9 2.2 1.9.8 0 1.6-.2 2.2-.7" />
        </svg>
      );
    case "react":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
          <ellipse cx="12" cy="12" rx="4" ry="9" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="4" ry="9" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="4" ry="9" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
        </svg>
      );
    case "tailwind css":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="currentColor" aria-hidden="true">
          <path d="M12 6c-3 0-4.5 1.5-4.5 4.5 1-1.5 2-2 3-1.5 1.2.6 1.8 1.8 2.6 3 1.4 2 3.1 4 6.9 4 3 0 4.5-1.5 4.5-4.5-1 1.5-2 2-3 1.5-1.2-.6-1.8-1.8-2.6-3-1.4-2-3.1-4-6.9-4zm-8 8c-3 0-4.5 1.5-4.5 4.5 1-1.5 2-2 3-1.5 1.2.6 1.8 1.8 2.6 3 1.4 2 3.1 4 6.9 4 3 0 4.5-1.5 4.5-4.5-1 1.5-2 2-3 1.5-1.2-.6-1.8-1.8-2.6-3-1.4-2-3.1-4-6.9-4z" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="currentColor" aria-hidden="true">
          <path d="M22.5 10.5h-2.7V8.7h2.7v1.8zm-3.6 0h-2.7V8.7h2.7v1.8zm-3.6 0h-2.7V8.7H15.3v1.8zm-3.6 0H9V8.7h2.7v1.8zm-3.6 0H5.4V8.7h2.7v1.8zm-3.6 0H1.8V8.7h2.7v1.8zm10.8-2.7h-2.7V6h2.7v1.8zm-3.6 0H9V6h2.7v1.8zm-3.6 0H5.4V6h2.7v1.8zM24 11.2c-.4-.3-1.6-.4-2.6.2-.2-.8-.7-1.5-1.3-2-.3-.2-.6-.3-.9-.3-.5 0-.9.3-1.2.7h-3.2V5.1H4.5V12H.9C.4 12 0 12.4 0 12.9c.2 4.6 3.4 8.7 8.1 9.9 5.8 1.5 11.6-.7 14.3-5.5 1.2-2.1 1.7-4.4 1.6-6.1z" />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="6" y1="3" x2="6" y2="15" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M18 9a9 9 0 0 1-9 9" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
  }
}

/* ─── Column Category Header Icon ─────────────────────────────────────────── */
function ColumnHeaderIcon({ num }: { num: string }) {
  if (num === "01") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <rect x="3" y="4" width="18" height="4.5" rx="1.5" />
        <rect x="3" y="10" width="18" height="4.5" rx="1.5" />
        <rect x="3" y="16" width="18" height="4.5" rx="1.5" />
        <circle cx="6.5" cy="6.25" r="0.75" fill="currentColor" stroke="none" />
        <circle cx="6.5" cy="12.25" r="0.75" fill="currentColor" stroke="none" />
        <circle cx="6.5" cy="18.25" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (num === "02") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

/* ─── Level Indicator Component ───────────────────────────────────────────── */
function LevelBadge({ level }: { level: SkillLevel }) {
  if (level === "daily") {
    return (
      <span
        title="Daily: What I reach for by default"
        className="inline-flex items-center gap-1.5 flex-shrink-0"
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-[var(--accent,#78A88B)]"
          aria-hidden="true"
        />
        <span className="sr-only">Proficiency: Daily</span>
      </span>
    );
  }
  if (level === "project") {
    return (
      <span
        title="Project: Used in a shipped project"
        className="inline-flex items-center gap-1.5 flex-shrink-0"
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-zinc-300"
          aria-hidden="true"
        />
        <span className="sr-only">Proficiency: Project</span>
      </span>
    );
  }
  return (
    <span
      title="Learning: Familiar, actively building depth"
      className="inline-flex items-center gap-1.5 flex-shrink-0"
    >
      <span
        className="w-1.5 h-1.5 rounded-full border border-zinc-500 bg-transparent"
        aria-hidden="true"
      />
      <span className="sr-only">Proficiency: Learning</span>
    </span>
  );
}

/* ─── Main Stack Component ────────────────────────────────────────────────── */
export default function Stack() {
  const [activePill, setActivePill] = useState<string>("Python");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const coreStripRef = useRef<HTMLDivElement>(null);
  const columnsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!sectionRef.current) return;

    if (prefersReduced) {
      if (headerRef.current) headerRef.current.style.opacity = "1";
      if (coreStripRef.current) coreStripRef.current.style.opacity = "1";
      if (columnsContainerRef.current) columnsContainerRef.current.style.opacity = "1";
      return;
    }

    const ctx = gsap.context(() => {
      /* Header entrance */
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 14,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      /* Core strip entrance */
      if (coreStripRef.current) {
        gsap.from(coreStripRef.current, {
          opacity: 0,
          y: 12,
          duration: 0.55,
          delay: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      /* 3 Columns entrance with subtle stagger */
      if (columnsContainerRef.current) {
        const columns = columnsContainerRef.current.querySelectorAll("[data-capability-column]");
        gsap.from(columns, {
          opacity: 0,
          y: 16,
          duration: 0.65,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stack"
      ref={sectionRef}
      aria-label="Technical capabilities and systems capability map"
      className="relative bg-transparent border-t border-white/[0.06] overflow-hidden scroll-mt-24 md:scroll-mt-28 py-16 md:py-24"
    >
      {/* ── Main Symmetric Container (Centered with equal left and right margins) ── */}
      <div
        className="relative z-10 w-full"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 clamp(24px,5vw,80px)",
        }}
      >
        {/* ── Section Header ── */}
            <div
              ref={headerRef}
              style={{ marginBottom: "clamp(28px, 3.5vw, 44px)" }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-4"
            >
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "clamp(36px, 4.5vw, 64px)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.05,
                    color: "#E8E5DD",
                    margin: "0 0 10px",
                  }}
                >
                  Technical Stack
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-ui), -apple-system, sans-serif",
                    fontSize: "clamp(14.5px, 1.05vw, 16.5px)",
                    color: "#A1A1AA",
                    maxWidth: "54ch",
                    fontWeight: 300,
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Tools I&apos;ve used to build my <span className="recruiter-highlight">projects</span>.
                </p>
              </div>

              {/* Upper-right supporting statement (Short, neutral, one line) */}
              <div className="flex items-center gap-2.5 md:justify-end pb-1 text-zinc-400">
                <span
                  aria-hidden="true"
                  className="w-4 h-[1.5px] bg-[var(--accent,#78A88B)]"
                />
                <span
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontStyle: "italic",
                    fontSize: 14,
                    lineHeight: 1.4,
                  }}
                >
                  Tools I&apos;ve used in <span className="recruiter-highlight">shipped projects</span>.
                </span>
              </div>
            </div>

            {/* ── CORE STACK DOCK (Compact horizontal pill bar matching reference shape & size) ── */}
            <div
              ref={coreStripRef}
              style={{
                marginTop: 0,
                marginBottom: "clamp(48px, 5.5vw, 80px)",
              }}
              className="w-full rounded-2xl md:rounded-full bg-[#0D0F0E]/85 backdrop-blur-xl border border-white/[0.08] px-4 sm:px-6 py-2.5 sm:py-3 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto scrollbar-none relative"
            >
              {/* Left: Glowing dot + CORE STACK / */}
              <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 select-none">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent,#78A88B)] shadow-[0_0_10px_rgba(120,168,139,0.95)]" />
                <span className="font-mono text-[11.5px] sm:text-[12.5px] font-semibold tracking-[0.18em] uppercase text-zinc-200">
                  CORE STACK
                </span>
                <span className="text-zinc-600 font-mono text-[13px] sm:text-[14px]">/</span>
              </div>

              {/* Center: Tech Pills */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                {CORE_PILL_LIST.map((pill) => {
                  const isActive = activePill === pill.name;
                  return (
                    <button
                      key={pill.name}
                      type="button"
                      onClick={() => setActivePill(pill.name)}
                      className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12.5px] sm:text-[13px] font-sans font-medium transition-all duration-200 select-none cursor-pointer ${
                        isActive
                          ? "bg-[rgba(120,168,139,0.08)] border border-[var(--accent,#78A88B)]/80 text-white shadow-[0_0_14px_rgba(120,168,139,0.25)]"
                          : "bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20 text-zinc-300 hover:text-white"
                      }`}
                    >
                      {pill.icon}
                      <span>{pill.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right: LEVEL Legend with circular outline indicators */}
              <div
                className="flex items-center gap-3 sm:gap-4 text-[12px] font-mono text-zinc-400 flex-shrink-0 select-none pl-1"
                aria-label="Skill proficiency legend"
              >
                <span className="text-zinc-500 font-mono tracking-widest text-[11px]">LEVEL:</span>
                <div className="flex items-center gap-1.5" title="Daily: What I reach for by default">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-[var(--accent,#78A88B)] bg-transparent flex items-center justify-center flex-shrink-0" />
                  <span className="text-zinc-200 font-sans text-[12px]">Daily</span>
                </div>
                <div className="flex items-center gap-1.5" title="Project: Used in a shipped project">
                  <span className="w-3.5 h-3.5 rounded-full border border-zinc-500 bg-transparent flex items-center justify-center flex-shrink-0" />
                  <span className="text-zinc-400 font-sans text-[12px]">Project</span>
                </div>
                <div className="flex items-center gap-1.5" title="Learning: Actively building depth">
                  <span className="w-3.5 h-3.5 rounded-full border border-zinc-600 bg-transparent flex items-center justify-center flex-shrink-0" />
                  <span className="text-zinc-500 font-sans text-[12px]">Learning</span>
                </div>
              </div>
            </div>

            {/* ── 3 Balanced Columns (min-w-0 on every column prevents blowout) ── */}
            <div
              ref={columnsContainerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8"
            >
              {CAPABILITY_CATEGORIES.map((cat) => {
                const categorySkills = SKILLS_DATA.filter((s) => s.category === cat.key);

                return (
                  <div
                    key={cat.number}
                    data-capability-column
                    className="min-w-0 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Number Line: 01 ───────────────────────── */}
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          style={{
                            fontFamily: "var(--font-mono), monospace",
                            fontSize: 13,
                            letterSpacing: "0.14em",
                            color: "rgba(255,255,255,0.85)",
                            fontWeight: 500,
                          }}
                        >
                          {cat.number}
                        </span>
                        <div
                          aria-hidden="true"
                          className="h-px flex-1 bg-white/[0.08]"
                        />
                      </div>

                      {/* Category Header: Icon + Title & Tagline */}
                      <div className="flex items-start gap-3.5 mb-3">
                        <div
                          className="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center flex-shrink-0"
                          style={{ marginTop: 2 }}
                        >
                          <ColumnHeaderIcon num={cat.number} />
                        </div>

                        <div className="min-w-0">
                          <h3
                            style={{
                              fontFamily: "var(--font-display), Georgia, serif",
                              fontSize: "clamp(22px, 1.7vw, 25px)",
                              fontWeight: 400,
                              fontStyle: "italic",
                              letterSpacing: "-0.01em",
                              color: "#E8E5DD",
                              margin: "0 0 2px",
                              lineHeight: 1.15,
                            }}
                            className="truncate"
                          >
                            {cat.title}
                          </h3>

                          <span
                            style={{
                              fontFamily: "var(--font-mono), monospace",
                              fontSize: 11,
                              letterSpacing: "0.14em",
                              color: "#A1A1AA",
                              textTransform: "uppercase",
                              display: "block",
                            }}
                            className="truncate"
                          >
                            {cat.tagline}
                          </span>
                        </div>
                      </div>

                      {/* Short Description (Short, factual, single line) */}
                      <p
                        style={{
                          fontFamily: "var(--font-ui), -apple-system, sans-serif",
                          fontSize: 13.5,
                          lineHeight: 1.5,
                          color: "#A1A1AA",
                          margin: "0 0 16px",
                          fontWeight: 300,
                        }}
                        className="truncate"
                      >
                        {cat.shortDesc}
                      </p>

                      {/* Single Column Header for the list */}
                      <div className="flex items-center justify-between text-[11px] font-mono tracking-wider uppercase text-zinc-500 px-3 pb-2 border-b border-white/[0.08] mb-1">
                        <span>Skill & Focus</span>
                        <span>Used in</span>
                      </div>

                      {/* Technology Rows: List of 6 items */}
                      <ul className="space-y-1 list-none p-0 m-0">
                        {categorySkills.map((skill: SkillItemData) => {
                          const displayProjects = skill.projects.slice(0, 2);
                          const hasOverflow = skill.projects.length > 2;

                          return (
                            <li
                              key={skill.name}
                              className="group py-2.5 px-3 transition-colors duration-200 hover:bg-white/[0.02] rounded-lg flex items-center justify-between gap-2.5 min-h-[58px]"
                            >
                              {/* Left: Icon + Tech Name & Descriptor + Level Dot */}
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                                  <TechIcon id={skill.icon} />
                                </div>

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span
                                      style={{
                                        fontFamily: "var(--font-ui), -apple-system, sans-serif",
                                        fontSize: 16,
                                        fontWeight: 500,
                                        letterSpacing: "-0.01em",
                                      }}
                                      className="text-zinc-100 group-hover:text-white transition-colors duration-200 truncate"
                                    >
                                      {skill.name}
                                    </span>
                                    <LevelBadge level={skill.level} />
                                  </div>

                                  <div
                                    style={{
                                      fontFamily: "var(--font-mono), monospace",
                                      fontSize: 13,
                                      letterSpacing: "0.01em",
                                      lineHeight: 1.35,
                                    }}
                                    className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200 truncate"
                                  >
                                    {skill.descriptor}
                                  </div>
                                </div>
                              </div>

                              {/* Right: Redesigned Chips (flex-shrink-0, wrapping enabled, no clipping) */}
                              <div className="flex items-center gap-1.5 flex-shrink-0 flex-wrap justify-end">
                                {displayProjects.map((pName) => {
                                  const isEverywhere = pName === "Everywhere";
                                  const anchor = PROJECT_ANCHORS[pName];

                                  if (isEverywhere || !anchor) {
                                    return (
                                      <span
                                        key={pName}
                                        className="font-mono text-[11.5px] px-2 py-0.5 rounded-md border border-white/[0.06] bg-white/[0.02] text-zinc-400 cursor-default select-none"
                                      >
                                        {pName}
                                      </span>
                                    );
                                  }

                                  return (
                                    <a
                                      key={pName}
                                      href={anchor}
                                      title={`View project: ${pName}`}
                                      className="font-mono text-[11.5px] px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.02] text-zinc-300 hover:border-[var(--accent,#78A88B)]/60 hover:text-[var(--accent,#78A88B)] hover:bg-[var(--accent,#78A88B)]/[0.08] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent,#78A88B)] transition-colors cursor-pointer no-underline"
                                    >
                                      {pName}
                                    </a>
                                  );
                                })}

                                {hasOverflow && (
                                  <span
                                    title={`+${skill.projects.length - 2} more projects`}
                                    className="font-mono text-[10.5px] px-1.5 py-0.5 rounded border border-white/[0.06] bg-white/[0.02] text-zinc-500 select-none"
                                  >
                                    +{skill.projects.length - 2}
                                  </span>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
      </div>
    </section>
  );
}
