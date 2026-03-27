"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MouseEvent, ReactNode, useState } from "react";

export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientY - rect.top) / rect.height - 0.5) * 4;
    const y = (((event.clientX - rect.left) / rect.width - 0.5) * -1) * 4;
    setTilt({ x, y });
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      whileHover={reduced ? {} : { y: -4 }}
      transition={{ duration: 0.2 }}
      style={{
        transform: reduced ? undefined : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        willChange: "transform",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
