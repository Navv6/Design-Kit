"use client";

import { useState, type CSSProperties } from "react";
import "./riff-interactions.css";

export function PopcornBurst({ label = "저장", doneLabel = "저장됨", onSave, onChange }: {
  label?: string; doneLabel?: string; onSave?: () => void; onChange?: (saved: boolean) => void | Promise<void>;
}) {
  const [saved, setSaved] = useState(false);
  const [burst, setBurst] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  async function toggle() {
    const next = !saved;
    setPending(true);
    setError(false);
    try {
      await onChange?.(next);
      if (next) { onSave?.(); setBurst(value => value + 1); }
      setSaved(next);
    } catch { setError(true); }
    finally { setPending(false); }
  }
  return <div className="riff-sample sample-burst">
    <div className="sample-burst-stage">
      <button type="button" disabled={pending} aria-pressed={saved} onClick={() => void toggle()}>{pending ? "처리 중…" : saved ? doneLabel : label}</button>
      {saved && burst > 0 && <span key={burst} aria-hidden="true" onAnimationEnd={() => setBurst(0)}>{Array.from({ length: 12 }, (_, i) =>
        <i key={i} style={{ "--angle": i * 30 + "deg", "--distance": 34 + i % 4 * 12 + "px", "--spark": i * 24 } as CSSProperties} />)}</span>}
    </div>
    {error && <p role="status">변경하지 못했습니다. 다시 시도하세요.</p>}
  </div>;
}
