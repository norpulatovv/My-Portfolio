"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LangContext";
import { translations } from "@/lib/i18n";

const cats = [
  {
    name:"Frontend", emoji:"🎨",
    skills:[
      { name:"HTML/CSS", level:95, color:"#e34f26" },
      { name:"JavaScript", level:88, color:"#f7df1e" },
      { name:"React", level:85, color:"#61dafb" },
      { name:"Tailwind CSS", level:90, color:"#06b6d4" },
    ],
  },
  {
    name:"Backend", emoji:"⚙️",
    skills:[
      { name:"Node.js", level:80, color:"#339933" },
      { name:"Express.js", level:75, color:"#8b5cf6" },
      { name:"Python", level:72, color:"#3776ab" },
      { name:"MongoDB", level:70, color:"#47a248" },
    ],
  },
  {
    name:"Tools", emoji:"🛠️",
    skills:[
      { name:"Git & GitHub", level:88, color:"#f05032" },
      { name:"VS Code", level:95, color:"#007acc" },
      { name:"Vercel", level:80, color:"#6366f1" },
    ],
  },
];

export default function Skills() {
  const { lang } = useLang();
  const t = translations[lang].skills;
  const [active, setActive] = useState(0);

  return (
    <section id="skills" style={{ padding:"120px 24px", backgroundColor:"var(--color-background)" }}>
      <div style={{ maxWidth:"900px", margin:"0 auto" }}>

        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ textAlign:"center", marginBottom:"64px" }}>
          <span style={{ fontFamily:"monospace", fontSize:"13px", color:"var(--color-primary)", opacity:0.8 }}>{t.tag}</span>
          <h2 style={{ fontSize:"clamp(2rem,5vw,3rem)", fontWeight:800, marginTop:"8px", letterSpacing:"-0.02em" }}>{t.title}</h2>
        </motion.div>

        <div style={{ display:"flex", justifyContent:"center", gap:"8px", marginBottom:"56px", flexWrap:"wrap" }}>
          {cats.map((c, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              padding:"10px 24px", borderRadius:"10px", fontWeight:600, fontSize:"14px",
              border:"1px solid var(--color-border)", cursor:"pointer", transition:"all 0.2s",
              backgroundColor: active === i ? "var(--color-primary)" : "var(--color-card)",
              color: active === i ? "#fff" : "var(--color-foreground)",
              opacity: active === i ? 1 : 0.6,
              display:"flex", alignItems:"center", gap:"8px",
            }}>
              {c.emoji} {c.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-16 }}
            transition={{ duration:0.3 }}
            style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
            {cats[active].skills.map((s, i) => (
              <motion.div key={s.name} initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.07 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"10px", alignItems:"center" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                    <span style={{ width:"8px", height:"8px", borderRadius:"50%", backgroundColor:s.color, display:"inline-block" }} />
                    <span style={{ fontWeight:600, fontSize:"14px" }}>{s.name}</span>
                  </div>
                  <span style={{ fontFamily:"monospace", fontSize:"13px", fontWeight:700, color:s.color }}>{s.level}%</span>
                </div>
                <div style={{ height:"6px", borderRadius:"9999px", backgroundColor:"var(--color-border)", overflow:"hidden" }}>
                  <motion.div
                    initial={{ width:0 }} animate={{ width:`${s.level}%` }}
                    transition={{ duration:0.9, delay:i*0.07, ease:[0.4,0,0.2,1] }}
                    style={{ height:"100%", borderRadius:"9999px", backgroundColor:s.color }} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}