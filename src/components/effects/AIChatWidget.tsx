"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Trash2, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What skills does Miraziz have?",
  "How can I hire him?",
  "What projects has he built?",
];

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! 👋 I'm Miraziz's AI assistant. Ask me anything about his skills, projects, or how to work with him!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const send = async (text?: string) => {
    const userMsg = (text || input).trim();
    if (!userMsg || loading) return;
    setInput("");

    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages(m => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Sorry, something went wrong. Please try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setMessages([{ role: "assistant", content: "Hi! 👋 I'm Miraziz's AI assistant. Ask me anything about his skills, projects, or how to work with him!" }]);
  };

  const showSuggestions = messages.length === 1;

  return (
    <div style={{ position: "fixed", bottom: "24px", left: "24px", zIndex: 500 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute", bottom: "64px", left: 0,
              width: "320px", borderRadius: "20px",
              backgroundColor: "var(--color-card)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}>

            {/* Header */}
            <div style={{
              padding: "14px 16px",
              borderBottom: "1px solid var(--color-border)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#fff" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Bot size={16} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "13px", lineHeight: 1, display: "flex", alignItems: "center", gap: "6px" }}>
                    Miraziz's AI
                    <Sparkles size={12} style={{ opacity: 0.8 }} />
                  </div>
                  <div style={{ fontSize: "10px", opacity: 0.8, display: "flex", alignItems: "center", gap: "4px", marginTop: "3px" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#22c55e", display: "inline-block", boxShadow: "0 0 4px #22c55e" }} />
                    Powered by Gemini AI
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "4px" }}>
                <button onClick={clear} title="Clear chat"
                  style={{
                    background: "none", border: "none", color: "#fff", cursor: "pointer",
                    opacity: 0.7, display: "flex", padding: "5px", borderRadius: "6px", transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.15)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.7"; (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}>
                  <Trash2 size={14} />
                </button>
                <button onClick={() => setOpen(false)}
                  style={{
                    background: "none", border: "none", color: "#fff", cursor: "pointer",
                    opacity: 0.7, display: "flex", padding: "5px", borderRadius: "6px", transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.15)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.7"; (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}>
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div style={{
              height: "300px", overflowY: "auto", padding: "16px",
              display: "flex", flexDirection: "column", gap: "10px",
            }}>
              {messages.map((m, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "flex",
                    justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                    alignItems: "flex-end", gap: "8px",
                  }}>
                  {m.role === "assistant" && (
                    <div style={{
                      width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                      background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Bot size={13} color="#fff" />
                    </div>
                  )}
                  <div style={{
                    maxWidth: "78%", padding: "10px 14px", fontSize: "13px", lineHeight: 1.65,
                    borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    backgroundColor: m.role === "user" ? "var(--color-primary)" : "var(--color-muted)",
                    color: m.role === "user" ? "#fff" : "var(--color-foreground)",
                  }}>
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing dots */}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                  <div style={{
                    width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                    background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Bot size={13} color="#fff" />
                  </div>
                  <div style={{
                    padding: "12px 16px", borderRadius: "16px 16px 16px 4px",
                    backgroundColor: "var(--color-muted)",
                    display: "flex", gap: "5px", alignItems: "center",
                  }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{
                        width: "6px", height: "6px", borderRadius: "50%",
                        backgroundColor: "var(--color-primary)",
                        animation: "bounce-y 0.8s ease-in-out infinite",
                        animationDelay: `${i * 0.15}s`,
                      }} />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {showSuggestions && (
              <div style={{ padding: "0 12px 10px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => send(s)}
                    style={{
                      padding: "5px 10px", borderRadius: "9999px",
                      fontSize: "11px", fontWeight: 600,
                      border: "1px solid var(--color-border)",
                      backgroundColor: "transparent",
                      color: "var(--color-primary)",
                      cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "color-mix(in srgb, var(--color-primary) 10%, transparent)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{
              padding: "10px 12px",
              borderTop: "1px solid var(--color-border)",
              display: "flex", gap: "8px", alignItems: "center",
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Ask me anything..."
                style={{
                  flex: 1, padding: "10px 14px", borderRadius: "10px",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-foreground)",
                  fontSize: "13px", outline: "none", fontFamily: "inherit",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => { e.target.style.borderColor = "var(--color-primary)"; }}
                onBlur={e => { e.target.style.borderColor = "var(--color-border)"; }}
              />
              <motion.button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: "38px", height: "38px", borderRadius: "10px", border: "none",
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                  color: "#fff", cursor: "pointer", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: loading || !input.trim() ? 0.4 : 1,
                  transition: "opacity 0.2s",
                }}>
                <Send size={15} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: "52px", height: "52px", borderRadius: "50%", border: "none",
          background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
          color: "#fff", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px color-mix(in srgb, var(--color-primary) 40%, transparent)",
          position: "relative",
        }}>
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={20} /></motion.div>
            : <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><MessageCircle size={20} /></motion.div>
          }
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <span style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            border: "2px solid var(--color-primary)",
            animation: "pulse-ring 2s ease-out infinite",
          }} />
        )}
      </motion.button>

      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}