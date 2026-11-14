"use client";

import { useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import "./riff-interactions.css";

export function LiquidTabs({ tabs, onChange }: { tabs: readonly { label: string; content: ReactNode }[]; onChange?: (index: number) => void }) {
  const base = useId();
  const indicator = useRef<HTMLElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [index, setIndex] = useState(0);
  if (!tabs.length) return null;
  const active = Math.min(index, tabs.length - 1);
  function select(next: number) {
    if (next === active) return;
    setIndex(next);
    onChange?.(next);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      indicator.current?.getAnimations().forEach(animation => {
        if (!(animation instanceof CSSTransition)) animation.cancel();
      });
      indicator.current?.animate([{ scale: "1 .96" }, { scale: "1.16 .84", offset: .44 }, { scale: "1 1" }], { duration: 340, easing: "ease-out" });
    }
  }
  return <div className="riff-sample">
    <div className="sample-liquid" role="tablist" aria-label="콘텐츠 전환" style={{ "--tab-count": tabs.length, "--tab-index": active } as CSSProperties}>
      <i ref={indicator} aria-hidden="true" />
      {tabs.map((tab, i) => <button key={i} ref={node => { buttons.current[i] = node; }} type="button"
        id={base + "-tab-" + i} role="tab" tabIndex={active === i ? 0 : -1} aria-selected={active === i} aria-controls={base + "-panel-" + i}
        onClick={() => select(i)} onKeyDown={event => {
          const destinations: Record<string, number> = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 };
          const next = destinations[event.key];
          if (next === undefined) return;
          event.preventDefault(); select(next); buttons.current[next]?.focus();
        }}>{tab.label}</button>)}
    </div>
    {tabs.map((tab, i) => <div key={i} className="sample-tab-panel" role="tabpanel" tabIndex={0} id={base + "-panel-" + i} aria-labelledby={base + "-tab-" + i} hidden={active !== i}>{tab.content}</div>)}
  </div>;
}
