"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const USERNAME = "norpulatovv";

interface Week { contributionDays: { contributionCount: number; date: string }[] }

export default function GitHubGraph() {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use GitHub contributions API via proxy
    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`)
      .then(r => r.json())
      .then(data => {
        if (data.contributions) {
          // Group into weeks
          const days: { date: string; count: number }[] = data.contributions;
          const grouped: Week[] = [];
          for (let i = 0; i < days.length; i += 7) {
            grouped.push({
              contributionDays: days.slice(i, i + 7).map(d => ({
                contributionCount: d.count,
                date: d.date,
              })),
            });
          }
          setWeeks(grouped.slice(-26));
          setTotal(days.reduce((s, d) => s + d.count, 0));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getColor = (count: number) => {
    if (count === 0) return "var(--color-border)";
    if (count < 3) return "color-mix(in srgb, var(--color-primary) 30%, transparent)";
    if (count < 6) return "color-mix(in srgb, var(--color-primary) 55%, transparent)";
    if (count < 10) return "color-mix(in srgb, var(--color-primary) 80%, transparent)";
    return "var(--color-primary)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      style={{
        padding: "24px", borderRadius: "16px",
        border: "1px solid var(--color-border)", backgroundColor: "var(--color-card)",
        marginTop: "32px",
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ fontSize: "13px", fontWeight: 700, opacity: 0.7 }}>GitHub Contributions</span>
        {!loading && <span style={{ fontSize: "12px", color: "var(--color-primary)", fontWeight: 700 }}>{total} contributions this year</span>}
      </div>

      {loading ? (
        <div style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "24px", height: "24px", border: "2px solid var(--color-border)", borderTopColor: "var(--color-primary)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        </div>
      ) : (
        <div style={{ display: "flex", gap: "3px", overflowX: "auto" }}>
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {week.contributionDays.map((day, di) => (
                <motion.div
                  key={di}
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: (wi * 7 + di) * 0.002 }}
                  title={`${day.date}: ${day.contributionCount} contributions`}
                  style={{
                    width: "11px", height: "11px", borderRadius: "2px",
                    backgroundColor: getColor(day.contributionCount),
                    cursor: "default", transition: "transform 0.1s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.4)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; }}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px", justifyContent: "flex-end" }}>
        <span style={{ fontSize: "10px", opacity: 0.4 }}>Less</span>
        {[0, 2, 5, 8, 12].map(v => (
          <div key={v} style={{ width: "10px", height: "10px", borderRadius: "2px", backgroundColor: getColor(v) }} />
        ))}
        <span style={{ fontSize: "10px", opacity: 0.4 }}>More</span>
      </div>
    </motion.div>
  );
}