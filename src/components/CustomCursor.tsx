"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize on devices with fine pointer and no reduced-motion preference
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const dot = dotRef.current;
    if (!dot) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, .interactive-hover"
      );
      if (interactive) {
        if (!isHovering) {
          isHovering = true;
          dot.classList.add("is-hovering");
        }
      } else {
        if (isHovering) {
          isHovering = false;
          dot.classList.remove("is-hovering");
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    let rafId: number;
    const render = () => {
      // Responsive smooth lerp follower
      currentX += (mouseX - currentX) * 0.32;
      currentY += (mouseY - currentY) * 0.32;
      dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true">
      <div className="custom-cursor-inner" />
    </div>
  );
}
