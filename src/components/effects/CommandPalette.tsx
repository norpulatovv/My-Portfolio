"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, User, Code2, FolderOpen, Briefcase, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const commands = [
  { id:"home", label:"Go to Home", icon:<Home size={16}/>, action:()=>{ document.getElementById("home")?.scrollIntoView({ behavior:"smooth" }); } },
  { id:"about", label:"Go to About", icon:<User size={16}/>, action:()=>{ document.getElementById("about")?.scrollIntoView({ behavior:"smooth" }); } },
  { id:"skills", label:"Go to Skills", icon:<Code2 size={16}/>, action:()=>{ document.getElementById("skills")?.scrollIntoView({ behavior:"smooth" }); } },
  { id:"projects", label:"Go to Projects", icon:<FolderOpen size={16}/>, action:()=>{ document.getElementById("projects")?.scrollIntoView({ behavior:"smooth" }); } },
  { id:"experience", label:"Go to Experience", icon:<Briefcase size={16}/>, action:()=>{ document.getElementById("experience")?.scrollIntoView({ behavior:"smooth" }); } },
  { id:"contact", label:"Go to Contact", icon:<Mail size={16}/>, action:()=>{ document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" }); } },
  { id:"github", label:"Open GitHub", icon:<Code2 size={16}/>, action:()=>{ window.open("https://github.com/norpulatovv","_blank"); } },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();

  const allCommands = [
    ...commands,
    { id:"theme", label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode", icon: theme === "dark" ? <Sun size={16}/> : <Moon size={16}/>, action: toggleTheme },
  ];

  const filtered = allCommands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setOpen(o => !o); setQuery(""); setSelected(0); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => { setSelected(0); }, [query]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === "Enter") { filtered[selected]?.action(); setOpen(false); setQuery(""); }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setOpen(false)}
            style={{ position:"fixed", inset:0, zIndex:9000, backgroundColor:"rgba(0,0,0,0.6)", backdropFilter:"blur(4px)" }}
          />
          <motion.div
            initial={{ opacity:0, scale:0.95, y:-20 }}
            animate={{ opacity:1, scale:1, y:0 }}
            exit={{ opacity:0, scale:0.95, y:-20 }}
            transition={{ duration:0.15 }}
            style={{
              position:"fixed", top:"20%", left:"50%", transform:"translateX(-50%)",
              width:"min(560px, 90vw)", zIndex:9001,
              backgroundColor:"var(--color-card)", borderRadius:"16px",
              border:"1px solid var(--color-border)",
              boxShadow:"0 24px 60px rgba(0,0,0,0.4)",
              overflow:"hidden",
            }}>
            {/* Search input */}
            <div style={{ display:"flex", alignItems:"center", gap:"12px", padding:"16px 20px", borderBottom:"1px solid var(--color-border)" }}>
              <Search size={18} style={{ opacity:0.4, flexShrink:0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a command..."
                style={{
                  flex:1, border:"none", outline:"none", fontSize:"15px",
                  backgroundColor:"transparent", color:"var(--color-foreground)",
                  fontFamily:"inherit",
                }}
              />
              <kbd style={{ fontSize:"11px", padding:"3px 8px", borderRadius:"6px", backgroundColor:"var(--color-muted)", border:"1px solid var(--color-border)", opacity:0.6 }}>ESC</kbd>
            </div>

            {/* Results */}
            <div style={{ maxHeight:"320px", overflowY:"auto" }}>
              {filtered.length === 0 ? (
                <p style={{ padding:"32px", textAlign:"center", opacity:0.4, fontSize:"14px" }}>No commands found</p>
              ) : filtered.map((cmd, i) => (
                <div key={cmd.id}
                  onClick={() => { cmd.action(); setOpen(false); setQuery(""); }}
                  style={{
                    display:"flex", alignItems:"center", gap:"14px",
                    padding:"12px 20px", cursor:"pointer", transition:"background 0.1s",
                    backgroundColor: selected === i ? "color-mix(in srgb, var(--color-primary) 10%, transparent)" : "transparent",
                    borderLeft: selected === i ? "2px solid var(--color-primary)" : "2px solid transparent",
                  }}
                  onMouseEnter={() => setSelected(i)}>
                  <span style={{ color:"var(--color-primary)", opacity:0.8 }}>{cmd.icon}</span>
                  <span style={{ fontSize:"14px", fontWeight:500 }}>{cmd.label}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ padding:"10px 20px", borderTop:"1px solid var(--color-border)", display:"flex", gap:"16px" }}>
              {[["↑↓","Navigate"],["↵","Select"],["Esc","Close"]].map(([key, label]) => (
                <span key={key} style={{ fontSize:"11px", opacity:0.4, display:"flex", alignItems:"center", gap:"5px" }}>
                  <kbd style={{ padding:"2px 6px", borderRadius:"4px", backgroundColor:"var(--color-muted)", border:"1px solid var(--color-border)", fontFamily:"monospace" }}>{key}</kbd>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}