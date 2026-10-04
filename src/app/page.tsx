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

      {/* Main Semantic Landmark */}
      <main id="main-content" className="relative z-10">
        <Hero />
        <WorkTransition />
        <Work />
        <Timeline />
        <Stack />
        <EngineeringNotes />
        <Contact />
      </main>
    </>
  );
}
