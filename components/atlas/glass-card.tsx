import type { ReactNode } from "react";

/** CMP-002: translucent content card. Uses atlas CSS design tokens. */
export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`atlas-glass ${className}`.trim()}>{children}</div>;
}
