"use client";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/LangContext";

const badges = [
  { emoji: "🚀", title: "Fast Learner", desc: { en: "Learned web dev in 6 months", ru: "Изучил веб за 6 месяцев", uz: "6 oyda web o'rgandim" }, color: "#6366f1" },
  { emoji: "💼", title: "Freelancer", desc: { en: "10+ client projects delivered", ru: "10+ проектов клиентам", uz: "10+ mijoz loyihasi" }, color: "#8b5cf6" },
  { emoji: "🌐", title: "Full Stack", desc: { en: "Frontend + Backend skills", ru: "Frontend + Backend", uz: "Frontend + Backend" }, color: "#06b6d4" },
  { emoji: "⚡", title: "Self-taught", desc: { en: "100% self-taught developer", ru: "100% самоучка", uz: "100% o'z-o'zidan" }, color: "#f59e0b" },
  { emoji: "🎨", title: "UI Focused", desc: { en: "Loves clean minimal design", ru: "Любит минимализм", uz: "Minimalizm sevadi" }, color: "#ec4899" },
  { emoji: "🔥", title: "15 y.o. Dev", desc: { en: "Building real products at 15", ru: "Создаёт продукты в 15", uz: "15 yoshda real mahsulot" }, color: "#22c55e" },
];

export default function Achievements() {
  const { lang } = useLang();

  return (
    <section style={{ padding: "120px 24px", backgroundColor: "var(--color-background)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "64px" }}>
          <span style={{ fontFamily: "monospace", fontSize: "13px", color: "var(--color-primary)", opacity: 0.8 }}>achievements</span>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, marginTop: "8px", letterSpacing: "-0.02em" }}>
            {lang === "en" ? "Achievements" : lang === "ru" ? "Достижения" : "Yutuqlar"}
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "16px" }}>
          {badges.map((b, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              style={{
                padding: "24px", borderRadius: "16px",
                border: "1px solid var(--color-border)", backgroundColor: "var(--color-card)",
                display: "flex", alignItems: "center", gap: "16px",
                transition: "all 0.2s", cursor: "default",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = b.color;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 32px ${b.color}22`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border)";
                (e.currentTarget as HTMLDivElement).style.transform = "";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "";
              }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
                backgroundColor: `${b.color}18`,
                border: `1px solid ${b.color}33`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "26px",
              }}>
                {b.emoji}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>{b.title}</div>
                <div style={{ fontSize: "12px", opacity: 0.55, lineHeight: 1.5 }}>{b.desc[lang]}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}