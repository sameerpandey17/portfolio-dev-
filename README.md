# Sameer Pandey — Developer Portfolio

A personal portfolio built with Next.js 16, TypeScript, Tailwind CSS v4, GSAP, and Lenis smooth scrolling. Designed with a dark minimal aesthetic to showcase backend systems, AI workflows, and project architectures.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: GSAP + ScrollTrigger
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React + custom inline SVGs
- **Fonts**: Ysabeau / Ysabeau Infant (local woff2) + Inter & JetBrains Mono

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**: `v18.18.0` or higher (`v20+` recommended)
- **Package manager**: `npm` (bundled with Node), `pnpm`, or `yarn`
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sameerpandey17/portfolio-dev-.git
   cd portfolio-dev-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the local development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the site running locally with hot reloading.

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server on `localhost:3000` |
| `npm run build` | Compiles an optimized production build and checks types |
| `npm run start` | Runs the compiled production build locally |
| `npm run lint` | Runs ESLint to check for code style and syntax issues |

---

## Making It Yours (Customization Guide)

If you are using this codebase as a template for your own portfolio, most of what you need to change is located in a single configuration file:

### 1. Update personal details and projects
Open `src/data/content.ts`. This file acts as the single source of truth for:
- Your name, role, bio, location, and social links (GitHub, LinkedIn, X, email).
- Projects (titles, descriptions, problem-decision-result stories, tags, repository links).
- Education, hackathon wins, and experience timeline items.
- Tech stack categories and skills.

### 2. Replace static assets in `/public`
- **Profile Image**: Place your portrait in `public/` (e.g. `public/sameer-hd.jpg` or your own filename) and update the path in `src/data/content.ts` and `src/components/Hero.tsx`.
- **Resume**: Replace `public/resume.pdf` with your own resume PDF.
- **Favicon**: Replace `src/app/favicon.ico` with your custom icon.

### 3. Update SEO metadata
Edit `src/app/layout.tsx`, `src/app/robots.ts`, and `src/app/sitemap.ts` to replace `https://sameerpandey.dev` with your custom production domain and update metadata descriptions.

---

## Project Structure

```text
├── public/                     # Static assets (images, resume.pdf)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── favicon.ico
│   │   ├── globals.css         # Theme tokens, custom animations & utilities
│   │   ├── layout.tsx          # Root layout, metadata & font setup
│   │   ├── opengraph-image.tsx # Dynamic social sharing image
│   │   ├── page.tsx            # Main portfolio page entry point
│   │   ├── robots.ts           # Search engine indexing rules
│   │   └── sitemap.ts          # XML sitemap generator
│   ├── components/             # UI components
│   │   ├── Contact.tsx         # Contact links, copy email & footer
│   │   ├── CustomCursor.tsx    # Interactive dot cursor
│   │   ├── EngineeringNotes.tsx# Technical case studies & recruiter Q&A
│   │   ├── Hero.tsx            # Hero typography, portrait & intro
│   │   ├── ProjectArchitectures.tsx # Custom vector diagrams for projects
│   │   ├── ScrollProgress.tsx  # Top scroll position indicator
│   │   ├── SmoothScroll.tsx    # Lenis inertia scroll engine
│   │   ├── Stack.tsx           # Categorized tech stack grid
│   │   ├── StickyIdentityNav.tsx # Header navigation & mobile drawer
│   │   ├── Timeline.tsx        # Education & career timeline
│   │   ├── Work.tsx            # Interactive project showcase
│   │   └── WorkTransition.tsx  # Visual section transition
│   ├── data/
│   │   └── content.ts          # Central data source for all site content
│   └── fonts/                  # Self-hosted variable woff2 fonts
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Deployment

### Vercel (Recommended)

The easiest way to deploy this site is with Vercel:

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) and import your repository.
3. Keep default settings (`Framework Preset: Next.js`). No environment variables are required.
4. Click **Deploy**.

Alternatively, deploy directly from the CLI:
```bash
npx vercel
```

### Self-Hosted / Node Server

You can also run it on any server with Node.js:
```bash
npm run build
npm run start
```

---

## License

MIT License. Feel free to use this project as inspiration or as a starter for your own portfolio.
