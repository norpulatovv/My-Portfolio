"use client";
import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = 0, y = 0, tx = 0, ty = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={ref} style={{
      position: "fixed", top: 0, left: 0,
      width: "400px", height: "400px", borderRadius: "50%",
      pointerEvents: "none", zIndex: 0,
      background: "radial-gradient(circle, color-mix(in srgb, #6366f1 8%, transparent) 0%, transparent 70%)",
      willChange: "transform",
    }} />
  );
}