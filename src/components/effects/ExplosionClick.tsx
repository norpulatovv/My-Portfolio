"use client";
import { useEffect } from "react";

export default function ExplosionClick() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const colors = ["#6366f1","#8b5cf6","#06b6d4","#ec4899","#22c55e","#f59e0b"];
      const count = 12;

      for (let i = 0; i < count; i++) {
        const dot = document.createElement("div");
        const angle = (360 / count) * i;
        const dist = Math.random() * 60 + 30;
        const size = Math.random() * 6 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];

        dot.style.cssText = `
          position:fixed;
          left:${e.clientX}px;
          top:${e.clientY}px;
          width:${size}px;
          height:${size}px;
          border-radius:50%;
          background:${color};
          pointer-events:none;
          z-index:99999;
          transform:translate(-50%,-50%);
          transition: transform 0.5s ease-out, opacity 0.5s ease-out;
        `;
        document.body.appendChild(dot);

        requestAnimationFrame(() => {
          const rad = (angle * Math.PI) / 180;
          dot.style.transform = `translate(calc(-50% + ${Math.cos(rad) * dist}px), calc(-50% + ${Math.sin(rad) * dist}px))`;
          dot.style.opacity = "0";
        });

        setTimeout(() => dot.remove(), 600);
      }
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return null;
}