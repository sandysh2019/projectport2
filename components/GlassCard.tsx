import { ReactNode } from "react";

export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass rounded-2xl border border-border/70 ${className}`}>{children}</div>;
}
