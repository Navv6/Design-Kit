"use client";

import { useState, type CSSProperties } from "react";
import "./perspective-box.css";

export function PerspectiveBox() {
  const [x, setX] = useState(-20);
  const [y, setY] = useState(35);
  const [color, setColor] = useState("#2b81bb");
  return <section className="perspective-box-demo" aria-label="육면체 회전">
    <div className="perspective-box-stage" style={{ "--box-x": x + "deg", "--box-y": y + "deg", "--box-color": color } as CSSProperties}>
      <div className="perspective-box-shape" aria-hidden="true">
        {["앞", "뒤", "오른쪽", "왼쪽", "위", "아래"].map(face => <div key={face}>{face}</div>)}
      </div>
    </div>
    <label>가로 회전 {y}°<input type="range" min="-180" max="180" value={y} onChange={event => setY(Number(event.target.value))} /></label>
    <label>세로 회전 {x}°<input type="range" min="-90" max="90" value={x} onChange={event => setX(Number(event.target.value))} /></label>
    <label>표면 색상<input type="color" value={color} onChange={event => setColor(event.target.value)} /></label>
    <button type="button" onClick={() => { setX(-20); setY(35); setColor("#2b81bb"); }}>초기화</button>
    <p>CSS 육면체 체험 · 원본의 프리셋 질감과 자동 회전은 회전 조작과 그라디언트 표면으로 대체했습니다.</p>
  </section>;
}
