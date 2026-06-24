"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { translations } from "@/lib/i18n";
import GlitchText from "@/components/effects/GlitchText";
import AuroraBackground from "@/components/effects/AuroraBackground";
import ShareButton from "@/components/effects/ShareButton";

const GH = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LI = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const rolesByLang = {
  en: ["Full Stack Developer","React Developer","Node.js Developer","UI/UX Enthusiast"],
  ru: ["Full Stack Разработчик","React Разработчик","Node.js Разработчик","UI/UX Энтузиаст"],
  uz: ["Full Stack Dasturchi","React Dasturchi","Node.js Dasturchi","UI/UX Ishqiboz"],
};

export default function Hero() {
  const { lang } = useLang();
  const t = translations[lang].hero;
  const roles = rolesByLang[lang];
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => { setTxt(""); setTyping(true); setIdx(0); }, [lang]);

  useEffect(() => {
    const cur = roles[idx];
    if (typing) {
      if (txt.length < cur.length) {
        const timer = setTimeout(() => setTxt(cur.slice(0, txt.length + 1)), 70);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(timer);
      }
    } else {
      if (txt.length > 0) {
        const timer = setTimeout(() => setTxt(txt.slice(0, -1)), 35);
        return () => clearTimeout(timer);
      } else {
        setIdx(i => (i + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [txt, typing, idx, roles]);

  return (
    <section id="home" style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      backgroundColor: "var(--color-background)",
      paddingTop: "60px",
    }}>
      <AuroraBackground />

      <div style={{
        maxWidth: "900px", margin: "0 auto", padding: "0 24px",
        textAlign: "center", position: "relative", zIndex: 1,
      }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "32px",
            padding: "6px 16px", borderRadius: "9999px",
            border: "1px solid var(--color-border)", backgroundColor: "var(--color-card)",
            fontSize: "13px",
          }}>
          <span style={{
            width: "7px", height: "7px", borderRadius: "50%",
            backgroundColor: "#22c55e", display: "inline-block",
            boxShadow: "0 0 6px #22c55e",
          }} />
          {t.badge}
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}
          style={{
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)", fontWeight: 800,
            lineHeight: 1.05, marginBottom: "16px", letterSpacing: "-0.03em",
          }}>
          {t.greeting}{" "}
          <GlitchText text="Miraziz" style={{
            background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }} />
        </motion.h1>

        {/* Typing */}
        <motion.div
          initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.2 }}
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)", fontFamily: "monospace",
            height: "40px", marginBottom: "24px",
            color: "var(--color-primary)", fontWeight: 500,
          }}>
          <span>{txt}</span>
          <span style={{ animation: "bounce-y 1s ease-in-out infinite", display: "inline-block", marginLeft: "1px" }}>|</span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.3 }}
          style={{
            fontSize: "1.05rem", maxWidth: "560px",
            margin: "0 auto 40px", opacity: 0.65, lineHeight: 1.75,
          }}>
          {t.description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.4 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "12px", flexWrap: "wrap", marginBottom: "48px",
          }}>
          <a href="#projects" style={{
            padding: "12px 28px", borderRadius: "10px", fontWeight: 600, fontSize: "14px",
            backgroundColor: "var(--color-primary)", color: "#fff",
            textDecoration: "none", transition: "all 0.2s",
            boxShadow: "0 4px 20px color-mix(in srgb, var(--color-primary) 30%, transparent)",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
            {t.projects_btn}
          </a>

          <a href="#contact" style={{
            padding: "12px 28px", borderRadius: "10px", fontWeight: 600, fontSize: "14px",
            border: "1px solid var(--color-border)", color: "var(--color-foreground)",
            textDecoration: "none", backgroundColor: "var(--color-card)", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "var(--color-primary)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "var(--color-border)"; }}>
            {t.contact_btn}
          </a>

          <a href="/cv.pdf" download style={{
            padding: "12px 28px", borderRadius: "10px", fontWeight: 600, fontSize: "14px",
            border: "1px solid var(--color-border)", color: "var(--color-foreground)",
            textDecoration: "none", display: "flex", alignItems: "center",
            gap: "8px", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
            <Download size={15} /> {t.cv_btn}
          </a>

          <ShareButton />
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.6, delay:0.55 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
          {[
            { href: "https://github.com/norpulatovv", icon: <GH /> },
            { href: "https://linkedin.com", icon: <LI /> },
          ].map(({ href, icon }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer" style={{
              width: "44px", height: "44px", borderRadius: "10px",
              border: "1px solid var(--color-border)", backgroundColor: "var(--color-card)",
              color: "var(--color-foreground)", display: "flex", alignItems: "center",
              justifyContent: "center", textDecoration: "none", transition: "all 0.2s", opacity: 0.7,
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.borderColor = "var(--color-primary)"; e.currentTarget.style.color = "var(--color-primary)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-foreground)"; e.currentTarget.style.transform = ""; }}>
              {icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="animate-bounce-y" style={{
        position: "absolute", bottom: "32px", left: "50%",
        transform: "translateX(-50%)", opacity: 0.3,
        color: "var(--color-foreground)",
      }}>
        <ArrowDown size={20} />
      </div>
    </section>
  );
}