"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import "./saved-card-transfer.css";

type Item = { id: string; title: string; description: string };
type Flight = { id: string; title: string; style: CSSProperties };

export function SavedCardTransfer({ items, onChange }: {
  items: readonly Item[];
  onChange?: (savedIds: string[]) => void;
}) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [view, setView] = useState<"all" | "saved">("all");
  const [flights, setFlights] = useState<Flight[]>([]);
  const [status, setStatus] = useState("");
  const destination = useRef<HTMLButtonElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const sequence = useRef(0);
  const base = useId();
  const saved = items.filter(item => savedIds.includes(item.id));
  const visible = view === "all" ? items : saved;
  const tabs = ["all", "saved"] as const;

  useEffect(() => {
    if (!flights.length) return;
    const timeout = window.setTimeout(() => setFlights([]), 750);
    return () => window.clearTimeout(timeout);
  }, [flights]);

  function toggle(item: Item, button: HTMLButtonElement) {
    const wasSaved = savedIds.includes(item.id);
    const next = wasSaved ? savedIds.filter(id => id !== item.id) : [...savedIds, item.id];
    setSavedIds(next);
    onChange?.(next);
    setStatus(item.title + (wasSaved ? " 저장을 해제했습니다." : " 항목을 저장했습니다."));
    if (wasSaved && view === "saved") destination.current?.focus({ preventScroll: true });
    if (wasSaved || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = button.closest("article")?.getBoundingClientRect();
    const target = destination.current?.getBoundingClientRect();
    if (!card || !target) return;
    const id = String(sequence.current++);
    setFlights(previous => [...previous, {
      id, title: item.title,
      style: {
        left: card.left + card.width / 2,
        top: card.top + card.height / 2,
        "--flight-x": target.left + target.width / 2 - card.left - card.width / 2 + "px",
        "--flight-y": target.top + target.height / 2 - card.top - card.height / 2 + "px",
      } as CSSProperties,
    }]);
  }

  return <section className="saved-transfer" aria-label="카드 저장 목록">
    <div role="tablist" aria-label="항목 보기" className="saved-transfer-tabs">
      {tabs.map((tab, index) => <button type="button" key={tab}
        ref={node => { buttons.current[index] = node; if (tab === "saved") destination.current = node; }}
        role="tab" id={base + "-" + tab} aria-selected={view === tab} aria-controls={base + "-panel"}
        tabIndex={view === tab ? 0 : -1} onClick={() => setView(tab)}
        onKeyDown={event => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          const next = event.key === "Home" ? 0 : event.key === "End" ? 1 : 1 - index;
          setView(tabs[next]); buttons.current[next]?.focus();
        }}>
        {tab === "all" ? "전체" : "저장됨"} <span>{tab === "all" ? items.length : saved.length}</span>
      </button>)}
    </div>
    <div role="tabpanel" id={base + "-panel"} aria-labelledby={base + "-" + view} tabIndex={0}>
      {visible.length ? visible.map(item => <article key={item.id} className="saved-transfer-card">
        <div><h3>{item.title}</h3><p>{item.description}</p></div>
        <button type="button" aria-pressed={savedIds.includes(item.id)}
          aria-label={item.title + " 저장"} onClick={event => toggle(item, event.currentTarget)}>
          {savedIds.includes(item.id) ? "저장 해제" : "저장"}
        </button>
      </article>) : <p>저장한 항목이 없습니다. 전체 탭에서 항목을 골라보세요.</p>}
    </div>
    <p role="status">{status}</p>
    {flights.map(flight => <span className="saved-transfer-flight" key={flight.id} aria-hidden="true"
      style={flight.style} onAnimationEnd={() => setFlights(previous => previous.filter(item => item.id !== flight.id))}>{flight.title}</span>)}
  </section>;
}
