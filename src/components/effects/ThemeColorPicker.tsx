"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";

const presets = [
  { name:"Indigo", primary:"#6366f1", accent:"#8b5cf6" },
  { name:"Cyan", primary:"#06b6d4", accent:"#0891b2" },
  { name:"Rose", primary:"#f43f5e", accent:"#e11d48" },
  { name:"Emerald", primary:"#10b981", accent:"#059669" },
  { name:"Orange", primary:"#f97316", accent:"#ea580c" },
  { name:"Pink", primary:"#ec4899", accent:"#db2777" },
];

export default function ThemeColorPicker() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const apply = (i: number) => {
    const p = presets[i];
    document.documentElement.style.setProperty("--color-primary", p.primary);
    document.documentElement.style.setProperty("--color-accent", p.accent);
    setActive(i);
    localStorage.setItem("theme-color", String(i));
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme-color");
    if (saved !== null) apply(Number(saved));
  }, []);

  return (
    <div style={{ position:"fixed", bottom:"24px", right:"24px", zIndex:500 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:8, scale:0.95 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:8, scale:0.95 }}
            style={{
              position:"absolute", bottom:"52px", right:0,
              backgroundColor:"var(--color-card)", border:"1px solid var(--color-border)",
              borderRadius:"14px", padding:"16px", minWidth:"180px",
              boxShadow:"0 16px 40px rgba(0,0,0,0.2)",
            }}>
            <p style={{ fontSize:"11px", fontWeight:700, opacity:0.5, marginBottom:"12px", textTransform:"uppercase", letterSpacing:"0.08em" }}>Theme Color</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px" }}>
              {presets.map((p, i) => (
                <button key={i} onClick={() => apply(i)}
                  title={p.name}
                  style={{
                    width:"36px", height:"36px", borderRadius:"50%", border:"none",
                    backgroundColor:p.primary, cursor:"pointer", transition:"transform 0.2s",
                    outline: active === i ? `3px solid ${p.primary}` : "none",
                    outlineOffset:"2px",
                    transform: active === i ? "scale(1.15)" : "scale(1)",
                  }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
        style={{
          width:"44px", height:"44px", borderRadius:"50%", border:"none",
          backgroundColor:"var(--color-primary)", color:"#fff",
          cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"0 4px 16px color-mix(in srgb, var(--color-primary) 40%, transparent)",
        }}>
        <Palette size={18} />
      </motion.button>
    </div>
  );
}