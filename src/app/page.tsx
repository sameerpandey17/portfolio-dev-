import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import StickyIdentityNav from "@/components/StickyIdentityNav";
import Hero from "@/components/Hero";
import WorkTransition from "@/components/WorkTransition";
import Work from "@/components/Work";
import Timeline from "@/components/Timeline";
import Stack from "@/components/Stack";
import EngineeringNotes from "@/components/EngineeringNotes";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      {/* Motion & Scroll Utilities */}
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />

      {/* Sticky Identity Nav (Scrolled Desktop & Mobile) */}
      <StickyIdentityNav />

      {/* Main Semantic Landmark with full-length drafting grid */}
      <main id="main-content" className="relative z-10 overflow-hidden bg-[var(--bg,#0B0C0B)]">
        {/* Full-page continuous blueprint drafting grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10">
          <Hero />
          <WorkTransition />
          <Work />
          <Timeline />
          <Stack />
          <EngineeringNotes />
          <Contact />
        </div>
      </main>
    </>
  );
}
