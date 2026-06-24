"use client";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function UISounds() {
  const ctx = useRef<AudioContext | null>(null);
  const [enabled, setEnabled] = useState(false);

  const getCtx = () => {
    if (!ctx.current) ctx.current = new AudioContext();
    return ctx.current;
  };

  const playTone = (freq: number, duration: number, type: OscillatorType = "sine", vol = 0.05) => {
    if (!enabled) return;
    try {
      const ac = getCtx();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.frequency.value = freq;
      osc.type = type;
      gain.gain.setValueAtTime(vol, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
      osc.start();
      osc.stop(ac.currentTime + duration);
    } catch {}
  };

  useEffect(() => {
    if (!enabled) return;

    const onHover = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.matches("a,button")) playTone(800, 0.08, "sine", 0.03);
    };
    const onClick = () => playTone(600, 0.12, "triangle", 0.05);

    document.addEventListener("mouseover", onHover);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("mouseover", onHover);
      document.removeEventListener("click", onClick);
    };
  }, [enabled]);

  return (
    <motion.button
      onClick={() => setEnabled(e => !e)}
      whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
      title={enabled ? "Mute sounds" : "Enable sounds"}
      style={{
        position:"fixed", bottom:"76px", right:"24px", zIndex:500,
        width:"44px", height:"44px", borderRadius:"50%", border:"none",
        backgroundColor:"var(--color-card)", border:"1px solid var(--color-border)",
        color: enabled ? "var(--color-primary)" : "var(--color-foreground)",
        cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
        opacity: enabled ? 1 : 0.5,
        boxShadow:"0 4px 16px rgba(0,0,0,0.15)",
        transition:"color 0.2s, opacity 0.2s",
      }}>
      {enabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </motion.button>
  );
}