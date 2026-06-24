"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MessageCircle, MapPin } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { translations } from "@/lib/i18n";
import Konfetti from "@/components/effects/Konfetti";

const GH = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 16px", borderRadius: "10px",
  border: "1px solid var(--color-border)", backgroundColor: "var(--color-card)",
  color: "var(--color-foreground)", fontSize: "14px", outline: "none",
  transition: "border-color 0.2s", boxSizing: "border-box", fontFamily: "inherit",
};

export default function Contact() {
  const [showKonfetti, setShowKonfetti] = useState(false);
  const { lang } = useLang();
  const t = translations[lang].contact;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.target.style.borderColor = "var(--color-primary)"; };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.target.style.borderColor = "var(--color-border)"; };

  const submit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1600));
    setStatus("done");
    setShowKonfetti(true);
    setTimeout(() => setShowKonfetti(false), 3000);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  const socials = [
    { icon: <GH />, label: "GitHub", sub: "@norpulatovv", href: "https://github.com/norpulatovv" },
    { icon: <Mail size={18} />, label: "Email", sub: "your@email.com", href: "mailto:your@email.com" },
    { icon: <MessageCircle size={18} />, label: "Telegram", sub: "@yourusername", href: "https://t.me/yourusername" },
    { icon: <MapPin size={18} />, label: "Location", sub: "Uzbekistan 🇺🇿", href: "#" },
  ];

  return (
    <section id="contact" style={{ padding: "120px 24px", backgroundColor: "var(--color-background)" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "72px" }}>
          <span style={{ fontFamily: "monospace", fontSize: "13px", color: "var(--color-primary)", opacity: 0.8 }}>{t.tag}</span>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, marginTop: "8px", letterSpacing: "-0.02em" }}>{t.title}</h2>
          <p style={{ marginTop: "12px", opacity: 0.5, fontSize: "15px" }}>{t.subtitle}</p>
        </motion.div>
        <Konfetti trigger={showKonfetti} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "48px" }}>

          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

            {[{ key: "name", label: t.name, type: "text" as const }, { key: "email", label: t.email, type: "email" as const }].map(({ key, label, type }) => (
              <div key={key}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, opacity: 0.5, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</label>
                <input type={type} value={form[key as keyof typeof form]}
                  onChange={e => set(key, e.target.value)}
                  onFocus={onFocus} onBlur={onBlur}
                  style={inputStyle} />
              </div>
            ))}

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, opacity: 0.5, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.message}</label>
              <textarea value={form.message} rows={5}
                onChange={e => set("message", e.target.value)}
                onFocus={onFocus} onBlur={onBlur}
                style={{ ...inputStyle, resize: "none" }} />
            </div>

            <motion.button onClick={submit} disabled={status === "sending"}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "13px 28px", borderRadius: "10px", border: "none", cursor: "pointer",
                fontWeight: 700, fontSize: "14px", fontFamily: "inherit",
                background: status === "done"
                  ? "linear-gradient(135deg,#22c55e,#16a34a)"
                  : "linear-gradient(135deg,var(--color-primary),var(--color-accent))",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                transition: "background 0.3s", opacity: status === "sending" ? 0.7 : 1,
              }}>
              {status === "idle" && <><Send size={15} /> {t.send}</>}
              {status === "sending" && t.sending}
              {status === "done" && t.success}
            </motion.button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", gap: "12px", justifyContent: "center" }}>
            <p style={{ fontSize: "14px", opacity: 0.5, marginBottom: "4px" }}>{t.or}</p>
            {socials.map(({ icon, label, sub, href }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : "_self"} rel="noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px",
                  borderRadius: "12px", border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-card)", textDecoration: "none", color: "var(--color-foreground)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-primary)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-border)"; (e.currentTarget as HTMLAnchorElement).style.transform = ""; }}>
                <span style={{ color: "var(--color-primary)", opacity: 0.8, display: "flex", flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "14px" }}>{label}</div>
                  <div style={{ fontSize: "12px", opacity: 0.5, marginTop: "2px" }}>{sub}</div>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}