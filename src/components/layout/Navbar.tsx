"use client";
import { useTheme } from "@/hooks/useTheme";
import { useLang } from "@/contexts/LangContext";
import { translations, Lang } from "@/lib/i18n";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { lang, changeLang } = useLang();
  const t = translations[lang].nav;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const ids = ["home","about","skills","projects","experience","contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.4 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const links = [
    { href:"#home", label:t.home, id:"home" },
    { href:"#about", label:t.about, id:"about" },
    { href:"#skills", label:t.skills, id:"skills" },
    { href:"#projects", label:t.projects, id:"projects" },
    { href:"#experience", label:t.experience, id:"experience" },
    { href:"#contact", label:t.contact, id:"contact" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: "60px",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        backgroundColor: scrolled ? "color-mix(in srgb, var(--color-background) 85%, transparent)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        transition: "background-color 0.3s, border-color 0.3s",
      }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 24px", height:"100%", display:"flex", alignItems:"center", justifyContent:"space-between" }}>

          <a href="#home" style={{ fontSize:"18px", fontWeight:700, color:"var(--color-primary)", textDecoration:"none", fontFamily:"monospace" }}>
            &lt;MN /&gt;
          </a>

          <div className="hide-mobile" style={{ display:"flex", alignItems:"center", gap:"4px" }}>
            {links.map(link => (
              <a key={link.id} href={link.href} style={{
                padding:"6px 14px", borderRadius:"8px", fontSize:"13px", fontWeight:500,
                color: active === link.id ? "var(--color-primary)" : "var(--color-foreground)",
                textDecoration:"none",
                backgroundColor: active === link.id ? "color-mix(in srgb, var(--color-primary) 10%, transparent)" : "transparent",
                opacity: active === link.id ? 1 : 0.65,
                transition:"all 0.2s",
              }}>
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <div style={{ display:"flex", gap:"2px", padding:"3px", borderRadius:"8px", backgroundColor:"var(--color-muted)", border:"1px solid var(--color-border)" }}>
              {(["en","ru","uz"] as Lang[]).map(l => (
                <button key={l} onClick={() => changeLang(l)} style={{
                  padding:"4px 10px", borderRadius:"6px", fontSize:"11px", fontWeight:700,
                  border:"none", cursor:"pointer", transition:"all 0.2s", letterSpacing:"0.05em",
                  backgroundColor: lang === l ? "var(--color-primary)" : "transparent",
                  color: lang === l ? "#fff" : "var(--color-foreground)",
                  opacity: lang === l ? 1 : 0.5,
                }}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <button onClick={toggleTheme} style={{
              width:"36px", height:"36px", borderRadius:"8px",
              border:"1px solid var(--color-border)", backgroundColor:"var(--color-muted)",
              color:"var(--color-foreground)", cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button className="show-mobile" onClick={() => setOpen(!open)} style={{
              width:"36px", height:"36px", borderRadius:"8px",
              border:"1px solid var(--color-border)", backgroundColor:"var(--color-muted)",
              color:"var(--color-foreground)", cursor:"pointer",
              display:"none", alignItems:"center", justifyContent:"center",
            }}>
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      <div style={{
        position:"fixed", top:"60px", left:0, right:0, zIndex:999,
        backgroundColor:"var(--color-background)",
        borderBottom: open ? "1px solid var(--color-border)" : "none",
        maxHeight: open ? "400px" : "0",
        overflow:"hidden",
        transition:"max-height 0.3s ease",
      }}>
        <div style={{ padding:"16px 24px", display:"flex", flexDirection:"column", gap:"4px" }}>
          {links.map(link => (
            <a key={link.id} href={link.href} onClick={() => setOpen(false)} style={{
              display:"block", padding:"12px 16px", fontSize:"15px", fontWeight:500,
              color:"var(--color-foreground)", textDecoration:"none",
              borderRadius:"8px", opacity:0.75,
            }}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}