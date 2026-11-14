"use client";

import type { CSSProperties } from "react";

/** CMP-001: accessible boolean setting. Controlled by parent. */
export function ToggleSwitch({
  checked,
  onCheckedChange,
  label = "설정 활성화",
  disabled = false,
}: {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-label={label}
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className="atlas-toggle"
      data-checked={checked}
      style={{ "--toggle-progress": checked ? "24px" : "0px" } as CSSProperties}
    >
      <span className="atlas-toggle-dot" aria-hidden="true" />
    </button>
  );
}
