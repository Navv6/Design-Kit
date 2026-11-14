"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import "./riff-interactions.css";

export function MagnifyingDock({ tools }: { tools: readonly { label: string; icon: string; content: ReactNode }[] }) {
  const [selected, setSelected] = useState(0);
  const [near, setNear] = useState<number | null>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  if (!tools.length) return null;
  const active = Math.min(selected, tools.length - 1);
  return <div className="riff-sample">
    <div className="sample-dock-view" aria-live="polite">{tools[active].content}</div>
    <div className="sample-dock" role="group" aria-label="도구"
      onPointerMove={event => {
        if (event.pointerType !== "mouse") return;
        const button = (event.target as HTMLElement).closest("button");
        const index = buttons.current.indexOf(button);
        if (index < 0 || !button) return;
        const bounds = button.getBoundingClientRect();
        const offset = (event.clientX - bounds.left) / bounds.width - .5;
        setNear(index + Math.max(-.5, Math.min(.5, offset)));
      }}
      onPointerLeave={() => setNear(null)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setNear(null); }}>
      {tools.map((tool, index) => {
        const distance = near === null ? 2 : Math.abs(index - near);
        return <button type="button" key={index} ref={node => { buttons.current[index] = node; }} style={{ "--dock-scale": 1 + Math.max(0, 2 - distance) * .17 } as CSSProperties}
          onPointerEnter={() => setNear(index)} onFocus={() => setNear(index)} aria-pressed={active === index}
          onKeyDown={event => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            buttons.current[(index + (event.key === "ArrowRight" ? 1 : -1) + tools.length) % tools.length]?.focus();
          }}
          onClick={() => setSelected(index)}><span aria-hidden="true">{tool.icon}</span>{tool.label}</button>;
      })}
    </div>
  </div>;
}
