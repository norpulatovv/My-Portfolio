"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, Users, BookOpen } from "lucide-react";

const USERNAME = "norpulatovv";

interface Stats {
  public_repos: number;
  followers: number;
  following: number;
  totalStars: number;
}

export default function GitHubStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`).then(r => r.json()),
    ]).then(([user, repos]) => {
      const totalStars = Array.isArray(repos)
        ? repos.reduce((sum: number, r: { stargazers_count: number }) => sum + r.stargazers_count, 0)
        : 0;
      setStats({ public_repos: user.public_repos, followers: user.followers, following: user.following, totalStars });
    }).catch(() => {});
  }, []);

  if (!stats) return null;

  const items = [
    { icon:<BookOpen size={20}/>, label:"Repos", value:stats.public_repos },
    { icon:<Star size={20}/>, label:"Stars", value:stats.totalStars },
    { icon:<Users size={20}/>, label:"Followers", value:stats.followers },
    { icon:<GitFork size={20}/>, label:"Following", value:stats.following },
  ];

  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:"12px", marginTop:"32px" }}>
      {items.map((item, i) => (
        <motion.div key={i}
          initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
          style={{
            padding:"16px", borderRadius:"12px", textAlign:"center",
            border:"1px solid var(--color-border)", backgroundColor:"var(--color-card)",
            transition:"all 0.2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-primary)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border)"; }}>
          <div style={{ color:"var(--color-primary)", display:"flex", justifyContent:"center", marginBottom:"8px" }}>{item.icon}</div>
          <div style={{ fontSize:"22px", fontWeight:800, letterSpacing:"-0.02em" }}>{item.value}</div>
          <div style={{ fontSize:"11px", opacity:0.5, marginTop:"2px", textTransform:"uppercase", letterSpacing:"0.06em" }}>{item.label}</div>
        </motion.div>
      ))}
    </div>
  );
}