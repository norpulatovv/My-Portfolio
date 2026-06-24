"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { translations } from "@/lib/i18n";
import GitHubGraph from "@/components/sections/GitHubGraph";

const GH = ({ size=18 }:{ size?:number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const GITHUB_USERNAME = "norpulatovv";

const langColors: Record<string,string> = {
  JavaScript:"#f7df1e", TypeScript:"#3178c6", Python:"#3776ab",
  HTML:"#e34f26", CSS:"#1572b6", Shell:"#89e051", Go:"#00add8",
  Vue:"#42b883", Rust:"#dea584",
};

interface Repo {
  id:number; name:string; description:string|null;
  stargazers_count:number; forks_count:number;
  html_url:string; language:string|null; topics:string[];
}

export default function Projects() {
  const { lang } = useLang();
  const t = translations[lang].projects;
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setLoading(true); setError(false);
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=18`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data: Repo[]) => {
        setRepos(data.filter(r => r.name !== GITHUB_USERNAME));
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const langs = ["All", ...Array.from(new Set(repos.map(r => r.language).filter(Boolean) as string[]))];
  const filtered = filter === "All" ? repos : repos.filter(r => r.language === filter);

  return (
    <section id="projects" style={{ padding:"120px 24px", backgroundColor:"var(--color-background)" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>

        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ textAlign:"center", marginBottom:"64px" }}>
          <span style={{ fontFamily:"monospace", fontSize:"13px", color:"var(--color-primary)", opacity:0.8 }}>{t.tag}</span>
          <h2 style={{ fontSize:"clamp(2rem,5vw,3rem)", fontWeight:800, marginTop:"8px", letterSpacing:"-0.02em" }}>{t.title}</h2>
          <p style={{ marginTop:"12px", opacity:0.5, fontSize:"15px" }}>{t.subtitle}</p>
          <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer"
            style={{
              display:"inline-flex", alignItems:"center", gap:"8px", marginTop:"16px",
              padding:"8px 18px", borderRadius:"8px", border:"1px solid var(--color-border)",
              color:"var(--color-foreground)", textDecoration:"none", fontSize:"13px",
              backgroundColor:"var(--color-card)", transition:"all 0.2s", opacity:0.7,
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.borderColor="var(--color-primary)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity="0.7"; e.currentTarget.style.borderColor="var(--color-border)"; }}>
            <GH size={15} /> @{GITHUB_USERNAME}
          </a>
        </motion.div>

        {!loading && !error && (
          <div style={{ display:"flex", justifyContent:"center", gap:"8px", marginBottom:"40px", flexWrap:"wrap" }}>
            {langs.map(l => (
              <button key={l} onClick={() => setFilter(l)} style={{
                padding:"6px 16px", borderRadius:"8px", fontSize:"12px", fontWeight:600,
                border:"1px solid var(--color-border)", cursor:"pointer", transition:"all 0.2s",
                backgroundColor: filter === l ? "var(--color-primary)" : "var(--color-card)",
                color: filter === l ? "#fff" : "var(--color-foreground)",
                opacity: filter === l ? 1 : 0.6,
                display:"flex", alignItems:"center", gap:"6px",
              }}>
                {l !== "All" && <span style={{ width:"7px", height:"7px", borderRadius:"50%", backgroundColor:langColors[l]||"#888", display:"inline-block" }} />}
                {l}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div style={{ textAlign:"center", padding:"80px 0" }}>
            <div style={{ width:"36px", height:"36px", border:"2px solid var(--color-border)", borderTopColor:"var(--color-primary)", borderRadius:"50%", animation:"spin 0.8s linear infinite", margin:"0 auto 16px" }} />
            <p style={{ opacity:0.5, fontSize:"14px" }}>{t.loading}</p>
          </div>
        )}

        {error && <p style={{ textAlign:"center", padding:"60px 0", opacity:0.4, fontSize:"14px" }}>{t.error}</p>}

        {!loading && !error && (
          <AnimatePresence>
            <motion.div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"16px" }}>
              {filtered.map((repo, i) => (
                <motion.div key={repo.id}
                  initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.05 }}
                  layout
                  style={{
                    padding:"22px", borderRadius:"14px",
                    border:"1px solid var(--color-border)", backgroundColor:"var(--color-card)",
                    display:"flex", flexDirection:"column", gap:"10px", transition:"all 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor="var(--color-primary)"; (e.currentTarget as HTMLDivElement).style.transform="translateY(-3px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor="var(--color-border)"; (e.currentTarget as HTMLDivElement).style.transform=""; }}>

                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <GH size={15} />
                      <h3 style={{ fontWeight:700, fontSize:"15px", wordBreak:"break-word" }}>{repo.name}</h3>
                    </div>
                    <a href={repo.html_url} target="_blank" rel="noreferrer"
                      style={{ color:"var(--color-foreground)", opacity:0.4, flexShrink:0, transition:"all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.color="var(--color-primary)"; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity="0.4"; e.currentTarget.style.color="var(--color-foreground)"; }}>
                      <ExternalLink size={15} />
                    </a>
                  </div>

                  <p style={{ fontSize:"13px", opacity:0.55, lineHeight:1.6, flex:1 }}>
                    {repo.description || "No description"}
                  </p>

                  {repo.topics.length > 0 && (
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
                      {repo.topics.slice(0,3).map(topic => (
                        <span key={topic} style={{
                          padding:"2px 8px", borderRadius:"6px", fontSize:"11px", fontWeight:600,
                          backgroundColor:"color-mix(in srgb, var(--color-primary) 12%, transparent)",
                          color:"var(--color-primary)",
                        }}>{topic}</span>
                      ))}
                    </div>
                  )}

                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:"10px", borderTop:"1px solid var(--color-border)" }}>
                    <div style={{ display:"flex", gap:"14px" }}>
                      <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"12px", opacity:0.5 }}>
                        <Star size={12} /> {repo.stargazers_count}
                      </span>
                      <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"12px", opacity:0.5 }}>
                        <GitFork size={12} /> {repo.forks_count}
                      </span>
                    </div>
                    {repo.language && (
                      <span style={{ display:"flex", alignItems:"center", gap:"5px", fontSize:"12px", opacity:0.6 }}>
                        <span style={{ width:"8px", height:"8px", borderRadius:"50%", backgroundColor:langColors[repo.language]||"#888", display:"inline-block" }} />
                        {repo.language}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      <GitHubGraph />
    </section>
  );
}