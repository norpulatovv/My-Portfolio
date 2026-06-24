"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export default function KonamiCode() {
  const [keys, setKeys] = useState<string[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      setKeys(prev => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.join(",") === KONAMI.join(",")) {
          setShow(true);
          setTimeout(() => setShow(false), 4000);
        }
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity:0, scale:0.5 }}
          animate={{ opacity:1, scale:1 }}
          exit={{ opacity:0, scale:0.5 }}
          style={{
            position:"fixed", inset:0, zIndex:99999,
            display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column",
            backgroundColor:"rgba(0,0,0,0.85)", backdropFilter:"blur(8px)",
            gap:"16px",
          }}>
          <motion.div
            animate={{ rotate:[0,10,-10,10,-10,0], scale:[1,1.2,1] }}
            transition={{ duration:0.5 }}
            style={{ fontSize:"80px" }}>
            🎮
          </motion.div>
          <motion.h2
            animate={{ backgroundPosition:["0% 50%","100% 50%","0% 50%"] }}
            transition={{ duration:2, repeat:Infinity }}
            style={{
              fontSize:"2rem", fontWeight:800,
              background:"linear-gradient(90deg,#6366f1,#ec4899,#06b6d4,#6366f1)",
              backgroundSize:"200%",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>
            KONAMI CODE ACTIVATED!
          </motion.h2>
          <p style={{ color:"#fff", opacity:0.6, fontFamily:"monospace" }}>
            You found the secret! 🎉
          </p>
          <div style={{ display:"flex", gap:"8px", marginTop:"8px" }}>
            {KONAMI.map((k, i) => (
              <kbd key={i} style={{
                padding:"4px 8px", borderRadius:"6px", fontSize:"12px",
                backgroundColor:"#ffffff15", border:"1px solid #ffffff25",
                color:"#fff", fontFamily:"monospace",
              }}>{k === "ArrowUp" ? "↑" : k === "ArrowDown" ? "↓" : k === "ArrowLeft" ? "←" : k === "ArrowRight" ? "→" : k}</kbd>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}