import Link from "next/link";
import { ReactNode } from "react";

export function BorderBeamButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`beam-border inline-flex items-center justify-center rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] ${className}`}
    >
      {children}
    </Link>
  );
}
