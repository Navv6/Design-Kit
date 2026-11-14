"use client";

import { useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import "./riff-interactions.css";
import { CarouselNavigation } from "./carousel-navigation";

export function StackCarousel({ slides }: { slides: readonly ReactNode[] }) {
  const [current, setCurrent] = useState(0);
  const start = useRef<{ id: number; x: number } | null>(null);
  const [dragOffset, setDragOffset] = useState<number | null>(null);
  const track = useId();
  if (!slides.length) return null;
  const active = current % slides.length;
  const move = (step: number) => setCurrent(index => (index + step + slides.length) % slides.length);
  return <div className="riff-sample" aria-label="스택 캐러셀">
    <div id={track} className="sample-stack" tabIndex={0} aria-label="좌우 화살표 또는 밀어서 탐색"
      data-dragging={dragOffset !== null}
      style={{ "--drag-offset": `${dragOffset ?? 0}px` } as CSSProperties}
      onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1);
      }}
      onPointerDown={event => {
        if (slides.length < 2 || !event.isPrimary || event.button !== 0) return;
        if (event.target instanceof Element && event.target.closest("a, button, input, select, textarea, [contenteditable]")) return;
        start.current = { id: event.pointerId, x: event.clientX };
        event.currentTarget.setPointerCapture(event.pointerId);
        setDragOffset(0);
      }}
      onPointerMove={event => {
        if (start.current?.id === event.pointerId) setDragOffset(event.clientX - start.current.x);
      }}
      onLostPointerCapture={event => {
        if (start.current?.id !== event.pointerId) return;
        start.current = null;
        setDragOffset(null);
      }}
      onPointerUp={event => {
        if (start.current?.id !== event.pointerId) return;
        const distance = event.clientX - start.current.x;
        start.current = null;
        setDragOffset(null);
        const threshold = Math.max(32, Math.min(72, event.currentTarget.clientWidth * .16));
        if (Math.abs(distance) >= threshold) move(distance > 0 ? -1 : 1);
      }}>
      {slides.map((slide, index) => {
        const depth = (index - active + slides.length) % slides.length;
        return <div className="sample-stack-card" data-front={depth === 0} aria-hidden={depth !== 0}
          inert={depth !== 0}
          hidden={depth > 2} key={index} style={{ "--depth": depth, "--hue": 196 + (index * 64) % 155 } as CSSProperties}>{slide}</div>;
      })}
    </div>
    <CarouselNavigation index={active} count={slides.length} onMove={move} onSelect={setCurrent} controls={track} />
  </div>;
}
