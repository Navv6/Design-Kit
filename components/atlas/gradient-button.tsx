import type { ButtonHTMLAttributes } from "react";

/** CMP-003: primary action, preserves native button semantics. */
export function GradientButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`atlas-gradient-btn ${className}`.trim()}>
      {children}
      <span aria-hidden="true">↗</span>
    </button>
  );
}
