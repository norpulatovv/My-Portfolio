"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [w, setW] = useState(0);

  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      setW((d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", zIndex: 9999 }}>
      <div style={{
        height: "100%",
        width: `${w}%`,
        background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)",
        transition: "width 0.1s linear",
        boxShadow: "0 0 8px #6366f199",
      }} />
    </div>
  );
}