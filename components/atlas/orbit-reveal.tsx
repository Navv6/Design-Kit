"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import "./orbit-reveal.css";

export function OrbitReveal({ cards, onSelect }: { cards: readonly ReactNode[]; onSelect?: (index: number) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<number>();
  const listId = useId();
  if (cards.length === 0) return null;
  return (
    <div className="atlas-orbit" data-expanded={expanded}>
      <div className="atlas-orbit-stage">
        <div className="atlas-orbit-track" aria-hidden="true" />
        <ul id={listId} className="atlas-orbit-cards" aria-label="카드" inert={!expanded}>
          {cards.map((card, index) => {
            const angle = index / cards.length * 2 * Math.PI - Math.PI / 2;
            return (
              <li key={index} style={{
                "--orbit-x": Math.cos(angle),
                "--orbit-y": Math.sin(angle),
                "--stack-tilt": `${(index - (cards.length - 1) / 2) * 6}deg`,
              } as CSSProperties}>{onSelect ? <button type="button" className="atlas-orbit-option" aria-pressed={selected === index}
                onClick={() => { setSelected(index); onSelect(index); }}>{card}</button> : card}</li>
            );
          })}
        </ul>
        <button type="button" className="atlas-orbit-toggle" aria-pressed={expanded} aria-controls={listId} onClick={() => setExpanded(value => !value)}>
          카드 펼치기
        </button>
      </div>
    </div>
  );
}
