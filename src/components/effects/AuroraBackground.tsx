"use client";
import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
      {/* Aurora blob 1 */}
      <motion.div
        animate={{
          x: [0, 80, -40, 60, 0],
          y: [0, -60, 40, -20, 0],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{ duration:18, repeat:Infinity, ease:"easeInOut" }}
        style={{
          position:"absolute", top:"10%", left:"15%",
          width:"500px", height:"500px", borderRadius:"50%",
          background:"radial-gradient(ellipse, color-mix(in srgb,#6366f1 18%,transparent), transparent 70%)",
          filter:"blur(40px)",
        }} />
      {/* Aurora blob 2 */}
      <motion.div
        animate={{
          x: [0, -60, 80, -30, 0],
          y: [0, 50, -70, 30, 0],
          scale: [1, 0.9, 1.2, 1, 1],
        }}
        transition={{ duration:14, repeat:Infinity, ease:"easeInOut", delay:2 }}
        style={{
          position:"absolute", top:"20%", right:"10%",
          width:"420px", height:"420px", borderRadius:"50%",
          background:"radial-gradient(ellipse, color-mix(in srgb,#8b5cf6 14%,transparent), transparent 70%)",
          filter:"blur(50px)",
        }} />
      {/* Aurora blob 3 */}
      <motion.div
        animate={{
          x: [0, 100, -50, 70, 0],
          y: [0, -30, 80, -50, 0],
          scale: [1, 1.3, 0.8, 1.1, 1],
        }}
        transition={{ duration:20, repeat:Infinity, ease:"easeInOut", delay:5 }}
        style={{
          position:"absolute", bottom:"15%", left:"30%",
          width:"380px", height:"380px", borderRadius:"50%",
          background:"radial-gradient(ellipse, color-mix(in srgb,#06b6d4 10%,transparent), transparent 70%)",
          filter:"blur(45px)",
        }} />
      {/* Grid */}
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.03 }}>
        <defs>
          <pattern id="agrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#agrid)" />
      </svg>
    </div>
  );
}