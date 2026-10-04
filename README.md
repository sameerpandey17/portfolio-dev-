# Sameer Pandey — Personal Portfolio (Python Backend · AI)

A premium, minimal black engineering portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, Lenis, and GSAP. Designed to showcase real system architectures, high-concurrency Python pipelines, and multi-agent AI systems to technical recruiters and senior engineers.

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build & type check
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the live app.

---

## 🎨 Design System & Aesthetic

- **Theme**: "Premium Minimal Black"
- **Palette**:
  - Background: `#0A0A0A`
  - Raised Surface: `#111111`
  - Card Surface: `#141414`
  - Hairline Border: `rgba(255, 255, 255, 0.08)`
  - Strong Border: `rgba(255, 255, 255, 0.16)`
  - High-Contrast Text: `#EDEDED`
  - Secondary Text: `#9A9A9A`
  - Tertiary / Mono Meta: `#6B6B6B`
  - Status Indicator: `#3DDC84` (availability dot)
- **Subtle Depth**: 2.8% SVG noise grain overlay and faint radial highlight.
- **Typography**: Neo-grotesk display (`Instrument Sans`) paired with monospace metadata (`JetBrains Mono`). Fluid typography scale via `clamp()`.
- **Motion & Scroll**: Lenis smooth inertia scroll synchronized with GSAP ticker and ScrollTrigger, masked line reveals, Andrew McCarthy character scramble reveal, sticky stacking project cards, and full `prefers-reduced-motion` compliance.

---

## 🗂️ Single Source of Truth (`src/data/content.ts`)

All personal details, project problem/decision/results, milestones, skills, and FAQ entries are configured in a single typed file:

```typescript
// Edit this file to update copy without touching UI components:
src/data/content.ts
```

---

## 📋 TODO Checklist for Sameer

Before final public launch, review and supply the following assets:

- [ ] **Real Portrait**: Replace `/public/me-placeholder.jpg` with your personal high-resolution studio or casual portrait.
- [ ] **Resume PDF**: Verify `/public/resume.pdf` has your latest formatting, links, and contact information.
- [ ] **Cloud Demo URLs**: When staging cloud instances for VisionLink (WebSockets/GPU) or AIVOA (voice gateway) are deployed, add their URLs to `liveUrl` in `src/data/content.ts`.
- [ ] **Project Videos/GIFs**: Optionally add short screen recordings of VisionLink pose tracking and AIVOA conversations.
- [ ] **DNS & Domain**: Configure your custom domain (`sameerpandey.dev`) on Vercel.

---

## 🚀 Deployment to Vercel

```bash
npx vercel
```
Or connect your GitHub repository directly to Vercel. Builds with zero environment variables required.
