"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const data = {
  en: [
    { name: "Asilbek T.", role: "Business Owner", text: "Miraziz built our company website in just 3 days. Clean code, fast delivery, and great communication. Highly recommend!", avatar: "🧑‍💼" },
    { name: "Dilnoza M.", role: "Startup Founder", text: "Amazing developer for his age! Built our landing page with animations that our customers love. Will work with him again.", avatar: "👩‍💻" },
    { name: "Jasur K.", role: "Client", text: "Professional work, responsive design, and fixed all bugs quickly. Very satisfied with the results!", avatar: "👨‍🎨" },
  ],
  ru: [
    { name: "Асилбек Т.", role: "Владелец бизнеса", text: "Миразиз создал наш сайт всего за 3 дня. Чистый код, быстрая доставка и отличное общение. Очень рекомендую!", avatar: "🧑‍💼" },
    { name: "Дилноза М.", role: "Основатель стартапа", text: "Удивительный разработчик для своего возраста! Создал нашу посадочную страницу с анимациями. Будем работать снова.", avatar: "👩‍💻" },
    { name: "Жасур К.", role: "Клиент", text: "Профессиональная работа, адаптивный дизайн и быстрое исправление багов. Очень доволен результатами!", avatar: "👨‍🎨" },
  ],
  uz: [
    { name: "Asilbek T.", role: "Biznes egasi", text: "Miraziz bizning saytimizni atigi 3 kunda yaratdi. Toza kod, tez yetkazib berish va yaxshi muloqot. Tavsiya qilaman!", avatar: "🧑‍💼" },
    { name: "Dilnoza M.", role: "Startup asoschisi", text: "Yoshi uchun ajoyib dasturchi! Mijozlarimiz sevgan animatsiyalar bilan landing page yaratdi. Yana ishlaymiz.", avatar: "👩‍💻" },
    { name: "Jasur K.", role: "Mijoz", text: "Professional ish, responsive dizayn va xatolarni tez tuzatish. Natijalardan juda mamnunman!", avatar: "👨‍🎨" },
  ],
};

export default function Testimonials() {
  const { lang } = useLang();
  const items = data[lang];
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const prev = () => { setDir(-1); setIdx(i => (i - 1 + items.length) % items.length); };
  const next = () => { setDir(1); setIdx(i => (i + 1) % items.length); };

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ padding: "120px 24px", backgroundColor: "var(--color-background)" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "64px" }}>
          <span style={{ fontFamily: "monospace", fontSize: "13px", color: "var(--color-primary)", opacity: 0.8 }}>// testimonials</span>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, marginTop: "8px", letterSpacing: "-0.02em" }}>
            {lang === "en" ? "What Clients Say" : lang === "ru" ? "Отзывы клиентов" : "Mijozlar fikri"}
          </h2>
        </motion.div>

        <div style={{ position: "relative", minHeight: "220px" }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={idx}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.35 }}
              style={{
                padding: "36px", borderRadius: "20px",
                border: "1px solid var(--color-border)", backgroundColor: "var(--color-card)",
                position: "relative",
              }}>
              <Quote size={32} style={{ color: "var(--color-primary)", opacity: 0.2, position: "absolute", top: "24px", right: "24px" }} />
              <p style={{ fontSize: "16px", lineHeight: 1.8, opacity: 0.8, marginBottom: "24px", fontStyle: "italic" }}>
                {items[idx].text}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "36px" }}>{items[idx].avatar}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "15px" }}>{items[idx].name}</div>
                  <div style={{ fontSize: "12px", opacity: 0.5, marginTop: "2px" }}>{items[idx].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "24px" }}>
          <button onClick={prev} style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--color-border)", backgroundColor: "var(--color-card)", color: "var(--color-foreground)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-primary)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)"; }}>
            <ChevronLeft size={18} />
          </button>

          <div style={{ display: "flex", gap: "8px" }}>
            {items.map((_, i) => (
              <button key={i} onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
                style={{
                  width: i === idx ? "24px" : "8px", height: "8px",
                  borderRadius: "9999px", border: "none", cursor: "pointer",
                  backgroundColor: i === idx ? "var(--color-primary)" : "var(--color-border)",
                  transition: "all 0.3s",
                }} />
            ))}
          </div>

          <button onClick={next} style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--color-border)", backgroundColor: "var(--color-card)", color: "var(--color-foreground)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-primary)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)"; }}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}