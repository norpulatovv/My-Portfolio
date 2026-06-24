"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let x = 0, y = 0, rx = 0, ry = 0, rafId: number;

    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.matches("a,button,[data-hover]")) setHovering(true);
    };
    const onLeave = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.matches("a,button,[data-hover]")) setHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    // Hide default cursor
    document.documentElement.style.cursor = "none";

    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot && ring) {
        dot.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
        rx += (x - rx) * 0.12;
        ry += (y - ry) * 0.12;
        ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.documentElement.style.cursor = "";
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0, zIndex: 99999,
        width: "8px", height: "8px", borderRadius: "50%",
        backgroundColor: "var(--color-primary)",
        pointerEvents: "none", willChange: "transform",
        transform: clicking ? "scale(0.5)" : "scale(1)",
        transition: "transform 0.1s, background-color 0.2s",
        mixBlendMode: "difference",
      }} />
      {/* Ring */}
      {/* Ring */}
      <div ref={ringRef} style={{
        position: "fixed", top: 0, left: 0, zIndex: 99998,
        width: "40px", height: "40px", borderRadius: "50%",
        border: `2px solid ${hovering ? "var(--color-primary)" : "color-mix(in srgb, var(--color-primary) 50%, transparent)"}`,
        pointerEvents: "none", willChange: "transform",
        transition: "border-color 0.2s, width 0.2s, height 0.2s",
      }} />
    </>
  );
}