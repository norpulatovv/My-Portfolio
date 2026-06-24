"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function WorldClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const t = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Tashkent",
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
      });
      const d = now.toLocaleDateString("en-US", {
        timeZone: "Asia/Tashkent",
        weekday: "short", month: "short", day: "numeric",
      });
      setTime(t);
      setDate(d);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        position: "fixed", top: "80px", right: "16px", zIndex: 100,
        backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)",
        borderRadius: "12px", padding: "10px 14px",
        display: "flex", alignItems: "center", gap: "8px",
        fontSize: "12px", fontFamily: "monospace",
      }}>
      <Clock size={13} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
      <div>
        <div style={{ fontWeight: 700, letterSpacing: "0.05em", color: "var(--color-primary)" }}>{time}</div>
        <div style={{ opacity: 0.5, fontSize: "10px" }}>🇺🇿 {date}</div>
      </div>
    </motion.div>
  );
}