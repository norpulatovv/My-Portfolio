"use client";
import { useEffect, useRef } from "react";

interface Props { text: string; className?: string; style?: React.CSSProperties; }

export default function GlitchText({ text, style }: Props) {
  return (
    <span style={{ position:"relative", display:"inline-block", ...style }}
      data-text={text}
      className="glitch-text">
      {text}
      <style>{`
        .glitch-text { animation: glitch-main 4s infinite; }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0;
          background: transparent;
          -webkit-background-clip: text;
          background-clip: text;
        }
        .glitch-text::before {
          color: #06b6d4;
          animation: glitch-before 4s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
        }
        .glitch-text::after {
          color: #ec4899;
          animation: glitch-after 4s infinite;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
        }
        @keyframes glitch-main {
          0%,90%,100% { transform: none; }
          91% { transform: skew(-0.5deg); }
          93% { transform: skew(0.5deg); }
          95% { transform: skew(-0.3deg); }
        }
        @keyframes glitch-before {
          0%,90%,100% { transform: none; opacity: 0; }
          91% { transform: translate(-2px, -1px); opacity: 0.8; }
          93% { transform: translate(2px, 1px); opacity: 0.8; }
          95% { transform: translate(-1px, 0); opacity: 0; }
        }
        @keyframes glitch-after {
          0%,90%,100% { transform: none; opacity: 0; }
          91% { transform: translate(2px, 1px); opacity: 0.8; }
          93% { transform: translate(-2px, -1px); opacity: 0.8; }
          95% { transform: translate(1px, 0); opacity: 0; }
        }
      `}</style>
    </span>
  );
}