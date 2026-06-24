"use client";
import { motion } from "framer-motion";
import { Heart, Mail, MessageCircle, ArrowUp } from "lucide-react";

const GH = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop:"1px solid var(--color-border)", padding:"40px 24px", backgroundColor:"var(--color-background)" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"20px" }}>

        <span style={{ fontFamily:"monospace", fontWeight:700, color:"var(--color-primary)", fontSize:"16px" }}>
          &lt;MN /&gt;
        </span>

        <p style={{ fontSize:"13px", opacity:0.4, display:"flex", alignItems:"center", gap:"5px" }}>
          Made with <Heart size={12} fill="#ec4899" color="#ec4899" /> by Miraziz — {year}
        </p>

        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          {[
            { href:"https://github.com/norpulatovv", icon:<GH /> },
            { href:"mailto:your@email.com", icon:<Mail size={16} /> },
            { href:"https://t.me/yourusername", icon:<MessageCircle size={16} /> },
          ].map(({ href, icon }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer" style={{
              width:"34px", height:"34px", borderRadius:"8px",
              border:"1px solid var(--color-border)", backgroundColor:"var(--color-card)",
              color:"var(--color-foreground)", display:"flex", alignItems:"center", justifyContent:"center",
              textDecoration:"none", opacity:0.5, transition:"all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.borderColor="var(--color-primary)"; e.currentTarget.style.color="var(--color-primary)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity="0.5"; e.currentTarget.style.borderColor="var(--color-border)"; e.currentTarget.style.color="var(--color-foreground)"; }}>
              {icon}
            </a>
          ))}

          <motion.button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
            whileHover={{ y:-2 }} whileTap={{ scale:0.95 }}
            style={{ width:"34px", height:"34px", borderRadius:"8px", border:"none", backgroundColor:"var(--color-primary)", color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <ArrowUp size={15} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}