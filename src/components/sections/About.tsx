"use client";
import { motion } from "framer-motion";
import { Calendar, MapPin, Code2, Zap } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { translations } from "@/lib/i18n";
import EyeAvatar from "@/components/effects/EyeAvatar";
import GitHubStats from "@/components/sections/GitHubStats";
import NumberCounter from "@/components/effects/NumberCounter";

const techs = [
  { name:"HTML", color:"#e34f26" }, { name:"CSS", color:"#1572b6" },
  { name:"JavaScript", color:"#f7df1e" },
  { name:"React", color:"#61dafb" },
  { name:"Node.js", color:"#339933" }, { name:"Python", color:"#3776ab" },
  { name:"MongoDB", color:"#47a248" }, { name:"Tailwind", color:"#06b6d4" },
  { name:"Git", color:"#f05032" }, 
];

export default function About() {
  const { lang } = useLang();
  const t = translations[lang].about;

  const stats = [
    { icon:<Calendar size={18}/>, label:t.age, value:"16" },
    { icon:<MapPin size={18}/>, label:t.location, value:t.location_val },
    { icon:<Code2 size={18}/>, label:t.projects, value:t.projects_val },
    { icon:<Zap size={18}/>, label:t.experience, value:t.experience_val },
  ];

  return (
    <section id="about" style={{ padding:"120px 24px", backgroundColor:"var(--color-background)" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>

        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ textAlign:"center", marginBottom:"80px" }}>
          <span style={{ fontFamily:"monospace", fontSize:"13px", color:"var(--color-primary)", opacity:0.8 }}>{t.tag}</span>
          <h2 style={{ fontSize:"clamp(2rem,5vw,3rem)", fontWeight:800, marginTop:"8px", letterSpacing:"-0.02em" }}>{t.title}</h2>
        </motion.div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"80px", alignItems:"center" }}>

          <motion.div initial={{ opacity:0, x:-32 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
            <div style={{ position:"relative", width:"180px", margin:"0 auto 40px" }}>
              <div style={{ width:"180px", height:"180px", borderRadius:"24px", background:"linear-gradient(135deg,var(--color-primary),var(--color-accent))", padding:"2px" }}>
                <div style={{ width:"100%", height:"100%", borderRadius:"22px", backgroundColor:"var(--color-card)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"72px" }}>
                  👨‍💻
                </div>
              </div>
              <div style={{ position:"absolute", bottom:"-12px", right:"-12px", backgroundColor:"var(--color-card)", border:"1px solid var(--color-border)", borderRadius:"10px", padding:"8px 12px", fontSize:"12px", fontWeight:700, color:"var(--color-primary)", fontFamily:"monospace" }}>
                {"<dev />"}
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
              {stats.map((s, i) => (
                <motion.div key={i} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
                  style={{ padding:"16px", borderRadius:"12px", border:"1px solid var(--color-border)", backgroundColor:"var(--color-card)", display:"flex", alignItems:"center", gap:"10px" }}>
                  <span style={{ color:"var(--color-primary)", opacity:0.8 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize:"16px", fontWeight:700, lineHeight:1 }}>{s.value}</div>
                    <div style={{ fontSize:"11px", opacity:0.5, marginTop:"3px" }}>{s.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0, x:32 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
            <h3 style={{ fontSize:"1.75rem", fontWeight:800, marginBottom:"20px", letterSpacing:"-0.02em" }}>
              {t.greeting}{" "}
              <span style={{ background:"linear-gradient(135deg,var(--color-primary),var(--color-accent))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Miraziz</span>
            </h3>
            <p style={{ opacity:0.65, lineHeight:1.8, marginBottom:"16px", fontSize:"15px" }}>{t.p1}</p>
            <p style={{ opacity:0.65, lineHeight:1.8, marginBottom:"36px", fontSize:"15px" }}>{t.p2}</p>

            <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
              {techs.map((tech, i) => (
                <motion.span key={i} initial={{ opacity:0, scale:0.85 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.04 }}
                  style={{ padding:"5px 12px", borderRadius:"8px", fontSize:"12px", fontWeight:600, border:"1px solid var(--color-border)", backgroundColor:"var(--color-card)", cursor:"default", transition:"all 0.2s", display:"flex", alignItems:"center", gap:"6px" }}
                  onMouseEnter={(e:React.MouseEvent<HTMLSpanElement>) => { e.currentTarget.style.borderColor=tech.color; e.currentTarget.style.color=tech.color; }}
                  onMouseLeave={(e:React.MouseEvent<HTMLSpanElement>) => { e.currentTarget.style.borderColor="var(--color-border)"; e.currentTarget.style.color="var(--color-foreground)"; }}>
                  <span style={{ width:"6px", height:"6px", borderRadius:"50%", backgroundColor:tech.color, display:"inline-block", flexShrink:0 }} />
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}