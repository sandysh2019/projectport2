"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export function FadeInSection({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ amount: 0.2, once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
