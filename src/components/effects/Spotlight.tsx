"use client";
import { useEffect, useRef } from "react";

export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, color-mix(in srgb, var(--color-primary) 6%, transparent), transparent 40%)`;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={ref} style={{
      position: "fixed", inset: 0, zIndex: 1,
      pointerEvents: "none", transition: "background 0.1s",
    }} />
  );
}