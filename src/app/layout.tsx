import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { PERSONAL } from "@/data/content";

const ysabeauInfant = localFont({
  src: [
    {
      path: "../fonts/YsabeauInfant-Variable.woff2",
      style: "normal",
    },
    {
      path: "../fonts/YsabeauInfant-Italic-Variable.woff2",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

const ysabeau = localFont({
  src: [
    {
      path: "../fonts/Ysabeau-Variable.woff2",
      style: "normal",
    },
    {
      path: "../fonts/Ysabeau-Italic-Variable.woff2",
      style: "italic",
    },
  ],
  variable: "--font-ui",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B0C0B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sameerpandey.dev"),
  title: `${PERSONAL.name} | ${PERSONAL.role}`,
  description: `${PERSONAL.positioning} Second-year AI & Data Science student at DYPIT Pune targeting Python Backend & AI internships.`,
  keywords: [
    "Sameer Pandey",
    "Python Backend",
    "AI Engineer",
    "FastAPI",
    "Redis Pub/Sub",
    "LangGraph",
    "WebSockets",
    "OpenEnv",
    "Reinforcement Learning",
    "Pune",
    "Backend Internship",
  ],
  authors: [{ name: PERSONAL.name, url: PERSONAL.github }],
  creator: PERSONAL.name,
  openGraph: {
    title: `${PERSONAL.name} | ${PERSONAL.role}`,
    description: PERSONAL.positioning,
    url: "https://sameerpandey.dev",
    siteName: PERSONAL.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL.name} | ${PERSONAL.role}`,
    description: PERSONAL.positioning,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONAL.name,
    jobTitle: PERSONAL.role,
    description: PERSONAL.positioning,
    url: "https://sameerpandey.dev",
    sameAs: [PERSONAL.github, PERSONAL.linkedin],
    email: PERSONAL.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "D.Y. Patil Institute of Technology, Pune",
    },
    knowsAbout: [
      "Python",
      "FastAPI",
      "Redis",
      "LangGraph",
      "WebSockets",
      "Docker",
      "PostgreSQL",
      "Reinforcement Learning",
    ],
  };

  return (
    <html
      lang="en"
      className={`dark ${ysabeauInfant.variable} ${ysabeau.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <div className="grain-overlay" aria-hidden="true" />
        <div className="vignette-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
