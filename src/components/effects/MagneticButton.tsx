"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
  strength?: number;
}

export default function MagneticButton({ children, style, onClick, href, strength = 0.4 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
  };

  const onLeave = () => setPos({ x: 0, y: 0 });

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type:"spring", stiffness:300, damping:20 }}
      onClick={onClick}
      style={{ display:"inline-block", cursor:"pointer", ...style }}>
      {children}
    </motion.div>
  );

  if (href) return <a href={href} style={{ textDecoration:"none" }}>{content}</a>;
  return content;
}