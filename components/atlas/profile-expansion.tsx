"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import "./riff-interactions.css";

export function ProfileExpansion({ name, role, children }: { name: string; role: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const details = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  return <div className="riff-sample">
    <article className="sample-profile" data-open={open} onKeyDown={event => {
      if (event.key !== "Escape" || !open) return;
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
      trigger.current?.focus();
    }}>
      <div className="sample-avatar" aria-hidden="true">{name.trim().slice(0, 1)}</div>
      <div><h3>{name}</h3><p>{role}</p></div>
      <button ref={trigger} type="button" aria-controls={details} aria-expanded={open} onClick={() => setOpen(value => !value)}>{open ? "소개 접기" : "소개 펼치기"}</button>
      <div id={details} className="sample-profile-detail" inert={!open} aria-hidden={!open}><div>{children}</div></div>
    </article>
  </div>;
}
