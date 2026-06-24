"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const text = {
  en: { msg: "👋 Open to freelance work!", cta: "Hire Me" },
  ru: { msg: "👋 Открыт для фриланса!", cta: "Нанять" },
  uz: { msg: "👋 Frilansg tayyor!", cta: "Yollash" },
};

export default function HireMeBanner() {
  const { lang } = useLang();
  const t = text[lang];
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const id = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(id);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (progress > 0.3) setShow(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  return (
    <AnimatePresence>
      {show && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          style={{
            position: "fixed", bottom: "88px", left: "50%",
            transform: "translateX(-50%)",
            zIndex: 400,
            backgroundColor: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "14px", padding: "12px 20px",
            display: "flex", alignItems: "center", gap: "14px",
            boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
            whiteSpace: "nowrap",
          }}>
          <Zap size={16} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
          <span style={{ fontSize: "14px", fontWeight: 500 }}>{t.msg}</span>
          <a href="#contact"
            onClick={() => setDismissed(true)}
            style={{
              padding: "7px 16px", borderRadius: "8px",
              backgroundColor: "var(--color-primary)", color: "#fff",
              textDecoration: "none", fontSize: "13px", fontWeight: 700,
              transition: "opacity 0.2s", flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
            {t.cta}
          </a>
          <button onClick={() => setDismissed(true)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--color-foreground)", opacity: 0.4,
              display: "flex", padding: "2px", flexShrink: 0,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.4"; }}>
            <X size={15} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}