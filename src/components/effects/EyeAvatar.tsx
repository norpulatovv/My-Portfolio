"use client";
import { useEffect, useRef } from "react";

export default function EyeAvatar() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      [leftRef, rightRef].forEach(ref => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
        const dist = Math.min(5, Math.hypot(e.clientX - cx, e.clientY - cy) * 0.1);
        el.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const eyeStyle: React.CSSProperties = {
    width:"48px", height:"48px", borderRadius:"50%",
    backgroundColor:"var(--color-background)",
    border:"2px solid var(--color-border)",
    display:"flex", alignItems:"center", justifyContent:"center",
    position:"relative",
  };

  const pupilStyle: React.CSSProperties = {
    width:"18px", height:"18px", borderRadius:"50%",
    backgroundColor:"var(--color-foreground)",
    transition:"transform 0.05s linear",
  };

  return (
    <div style={{ position:"relative", width:"180px", height:"180px", borderRadius:"24px", background:"linear-gradient(135deg,var(--color-primary),var(--color-accent))", padding:"2px", margin:"0 auto 40px" }}>
      <div style={{ width:"100%", height:"100%", borderRadius:"22px", backgroundColor:"var(--color-card)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"12px" }}>
        <div style={{ fontSize:"32px" }}>👨‍💻</div>
        <div style={{ display:"flex", gap:"12px" }}>
          <div style={eyeStyle}>
            <div ref={leftRef} style={pupilStyle} />
          </div>
          <div style={eyeStyle}>
            <div ref={rightRef} style={pupilStyle} />
          </div>
        </div>
      </div>
    </div>
  );
}