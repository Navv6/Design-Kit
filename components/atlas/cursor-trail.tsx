"use client";

import { useRef, useState, type CSSProperties } from "react";
import "./riff-interactions.css";

export function CursorTrail({ images }: { images: readonly string[] }) {
  const [marks, setMarks] = useState<{ id: number; x: number; y: number }[]>([]);
  const last = useRef<{ x: number; y: number } | null>(null);
  const serial = useRef(0);
  function add(x: number, y: number) {
    const id = serial.current++;
    setMarks(previous => [...previous.slice(-11), { id, x, y }]);
  }
  return <div className="riff-sample">
    <div className="sample-trail" onPointerLeave={() => { last.current = null; }}
      onPointerMove={event => {
        if (event.pointerType === "touch" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - bounds.left, y = event.clientY - bounds.top;
        const previous = last.current;
        if (!previous) { last.current = { x, y }; add(x, y); return; }
        const distance = Math.hypot(x - previous.x, y - previous.y);
        if (distance < 28) return;
        const count = Math.min(5, Math.floor(distance / 28));
        for (let point = 1; point <= count; point += 1) {
          add(previous.x + (x - previous.x) * point / count, previous.y + (y - previous.y) * point / count);
        }
        last.current = { x, y };
      }}>
      <strong>움직임의 흔적</strong>
      {marks.map(mark => <span key={mark.id} aria-hidden="true" className="sample-trail-mark"
        onAnimationEnd={() => setMarks(previous => previous.filter(item => item.id !== mark.id))}
        style={{ left: mark.x, top: mark.y, "--trail-color": (mark.id * 57 + 180) % 360 } as CSSProperties}>
        {images.length > 0 && <img src={images[mark.id % images.length]} alt="" />}
      </span>)}
    </div>
    <button type="button" onClick={() => add(60 + (serial.current * 47) % 150, 65 + (serial.current * 33) % 110)}>이미지 흔적 남기기</button>
    <button type="button" disabled={marks.length === 0} onClick={() => { setMarks([]); last.current = null; }}>흔적 지우기</button>
  </div>;
}
