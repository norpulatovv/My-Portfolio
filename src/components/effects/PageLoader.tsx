"use client";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1200);
    const t2 = setTimeout(() => setVisible(false), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "var(--color-background)",
      display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "24px",
      opacity: fading ? 0 : 1,
      transition: "opacity 0.5s ease",
      pointerEvents: fading ? "none" : "all",
    }}>
      <div style={{
        width: "44px", height: "44px", borderRadius: "50%",
        border: "2px solid var(--color-border)",
        borderTopColor: "var(--color-primary)",
        animation: "spin 0.8s linear infinite",
      }} />
      <span style={{
        fontFamily: "monospace", fontSize: "12px",
        color: "var(--color-primary)", letterSpacing: "0.15em", opacity: 0.7,
      }}>
        LOADING...
      </span>
    </div>
  );
}