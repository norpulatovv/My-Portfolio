"use client";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { translations } from "@/lib/i18n";

const expData = {
  en:[
    {
      year:"2025 – Now",
      title:"Freelance Web Developer",
      org:"Self-employed",
      desc:"Building websites and web apps for clients using HTML, CSS, JavaScript and React.",
      type:"work",
    },
    {
      year:"2025",
      title:"Started Programming",
      org:"Self-taught",
      desc:"Began learning HTML, CSS and JavaScript. Quickly moved to React and Node.js. Built first real projects.",
      type:"edu",
    },
  ],
  ru:[
    {
      year:"2025 – Сейчас",
      title:"Freelance Web Developer",
      org:"Самозанятый",
      desc:"Создаю сайты и веб-приложения для клиентов на HTML, CSS, JavaScript и React.",
      type:"work",
    },
    {
      year:"2025",
      title:"Начал программировать",
      org:"Самообучение",
      desc:"Начал изучать HTML, CSS и JavaScript. Быстро перешёл на React и Node.js.",
      type:"edu",
    },
  ],
  uz:[
    {
      year:"2025 – Hozir",
      title:"Frilanser Web Dasturchi",
      org:"O'z hisobiga",
      desc:"Mijozlar uchun HTML, CSS, JavaScript va React bilan saytlar yaratdim.",
      type:"work",
    },
    {
      year:"2025",
      title:"Dasturlashni boshladim",
      org:"O'z-o'zidan",
      desc:"HTML, CSS va JavaScript o'rganishni boshladim. Tez React va Node.js ga o'tdim.",
      type:"edu",
    },
  ],
};

export default function Experience() {
  const { lang } = useLang();
  const t = translations[lang].experience;
  const items = expData[lang];

  return (
    <section id="experience" style={{ padding:"120px 24px", backgroundColor:"var(--color-background)" }}>
      <div style={{ maxWidth:"760px", margin:"0 auto" }}>

        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ textAlign:"center", marginBottom:"80px" }}>
          <span style={{ fontFamily:"monospace", fontSize:"13px", color:"var(--color-primary)", opacity:0.8 }}>{t.tag}</span>
          <h2 style={{ fontSize:"clamp(2rem,5vw,3rem)", fontWeight:800, marginTop:"8px", letterSpacing:"-0.02em" }}>{t.title}</h2>
        </motion.div>

        <div style={{ position:"relative" }}>
          <div style={{ position:"absolute", left:"20px", top:"8px", bottom:"8px", width:"1px", background:"linear-gradient(to bottom, var(--color-primary), transparent)" }} />

          <div style={{ display:"flex", flexDirection:"column", gap:"40px" }}>
            {items.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*0.12, duration:0.5 }}
                style={{ display:"flex", gap:"24px" }}>

                <div style={{
                  width:"40px", height:"40px", borderRadius:"10px", flexShrink:0,
                  background:"linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                  display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", zIndex:1,
                }}>
                  {item.type === "work" ? <Briefcase size={16}/> : <GraduationCap size={16}/>}
                </div>

                <div style={{
                  flex:1, padding:"20px", borderRadius:"14px",
                  border:"1px solid var(--color-border)", backgroundColor:"var(--color-card)", transition:"border-color 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor="var(--color-primary)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor="var(--color-border)"; }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"8px", marginBottom:"8px" }}>
                    <h3 style={{ fontWeight:700, fontSize:"16px" }}>{item.title}</h3>
                    <span style={{
                      padding:"3px 10px", borderRadius:"6px", fontSize:"11px", fontWeight:700, fontFamily:"monospace",
                      backgroundColor:"color-mix(in srgb, var(--color-primary) 12%, transparent)",
                      color:"var(--color-primary)",
                    }}>{item.year}</span>
                  </div>
                  <p style={{ fontSize:"12px", color:"var(--color-primary)", fontWeight:600, marginBottom:"10px", opacity:0.8 }}>{item.org}</p>
                  <p style={{ fontSize:"14px", opacity:0.6, lineHeight:1.7 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}