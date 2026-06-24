"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Link, Check } from "lucide-react";

export default function ShareButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => { setCopied(false); setOpen(false); }, 2000);
  };

  const shareOptions = [
    {
      label: "Copy Link",
      icon: copied ? <Check size={15} /> : <Link size={15} />,
      onClick: copy,
      color: "var(--color-primary)",
    },
    {
      label: "Twitter / X",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      onClick: () => window.open(`https://twitter.com/intent/tweet?text=Check out this awesome portfolio!&url=${encodeURIComponent(window.location.href)}`, "_blank"),
      color: "#000",
    },
    {
      label: "Telegram",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/>
        </svg>
      ),
      onClick: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=Check out this awesome portfolio!`, "_blank"),
      color: "#229ed9",
    },
  ];

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "8px 16px", borderRadius: "8px",
          border: "1px solid var(--color-border)", backgroundColor: "var(--color-card)",
          color: "var(--color-foreground)", cursor: "pointer", fontSize: "13px", fontWeight: 600,
          fontFamily: "inherit",
        }}>
        <Share2 size={14} /> Share
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            style={{
              position: "absolute", top: "calc(100% + 8px)", right: 0,
              backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)",
              borderRadius: "12px", padding: "8px", minWidth: "160px",
              boxShadow: "0 12px 32px rgba(0,0,0,0.15)", zIndex: 100,
            }}>
            {shareOptions.map((opt, i) => (
              <button key={i} onClick={opt.onClick}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 12px", borderRadius: "8px", border: "none",
                  backgroundColor: "transparent", color: "var(--color-foreground)",
                  cursor: "pointer", fontSize: "13px", fontWeight: 500, fontFamily: "inherit",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-muted)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}>
                <span style={{ color: opt.color }}>{opt.icon}</span>
                {opt.label}
                {opt.label === "Copy Link" && copied && <span style={{ marginLeft: "auto", fontSize: "11px", color: "#22c55e" }}>Copied!</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}