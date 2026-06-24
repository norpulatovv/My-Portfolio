"use client";
import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const ref = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const TRAIL = 12;
    const dots = Array.from({ length: TRAIL }, (_, i) => {
      const d = document.createElement("div");
      const size = Math.max(4, 14 - i);
      d.style.cssText = `position:fixed;pointer-events:none;border-radius:50%;z-index:9999;transition:opacity 0.3s;background:linear-gradient(135deg,#6366f1,#8b5cf6);width:${size}px;height:${size}px;opacity:${1 - i / TRAIL};transform:translate(-50%,-50%);`;
      document.body.appendChild(d);
      return d;
    });
    ref.current = dots;

    const positions = Array.from({ length: TRAIL }, () => ({ x: -100, y: -100 }));

    const onMove = (e: MouseEvent) => { positions[0].x = e.clientX; positions[0].y = e.clientY; };
    window.addEventListener("mousemove", onMove);

    let animId: number;
    const animate = () => {
      for (let i = TRAIL - 1; i > 0; i--) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * 0.35;
        positions[i].y += (positions[i - 1].y - positions[i].y) * 0.35;
      }
      dots.forEach((d, i) => {
        d.style.left = positions[i].x + "px";
        d.style.top = positions[i].y + "px";
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      dots.forEach((d) => d.remove());
    };
  }, []);

  return null;
}
