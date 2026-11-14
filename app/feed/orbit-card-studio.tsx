"use client";

import { useState, type CSSProperties } from "react";
import { OrbitReveal } from "@/components/atlas/orbit-reveal";
import "./palette-studio.css";

const palettes = [
  { name: "해안", paper: "#E6EFE8", ink: "#173A33", accent: "#BEE582", landscape: "#769B83" },
  { name: "노을", paper: "#FAE7DB", ink: "#4E2928", accent: "#FFD18A", landscape: "#C2745D" },
  { name: "새벽", paper: "#E6ECF8", ink: "#212E57", accent: "#CDDAFA", landscape: "#7286B7" },
];

type Palette = (typeof palettes)[number];

function paletteStyle(palette: Palette) {
  return {
    "--studio-paper": palette.paper,
    "--studio-ink": palette.ink,
    "--studio-accent": palette.accent,
    "--studio-landscape": palette.landscape,
  } as CSSProperties;
}

function LandingPreview({ palette }: { palette: Palette }) {
  return <div className="palette-landing" style={paletteStyle(palette)}>
    <div className="palette-landing-brand">SLOW DAYS</div>
    <div className="palette-landing-copy">
      <small>제주 · 동쪽 해안</small>
      <strong>바람이 머무는 곳</strong>
      <span>바다를 따라 걷고, 한 박자 느리게 쉬는 하루.</span>
    </div>
    <div className="palette-landscape" aria-hidden="true"><i /><i /><i /></div>
  </div>;
}

export function OrbitCardStudio() {
  const [palette, selectPalette] = useState(palettes[0]);
  const [status, setStatus] = useState("");
  const colors = [
    { label: "배경", token: "background", value: palette.paper },
    { label: "텍스트", token: "text", value: palette.ink },
    { label: "강조", token: "accent", value: palette.accent },
    { label: "풍경", token: "landscape", value: palette.landscape },
  ];

  async function copyPalette() {
    const css = colors.map(({ token, value }) => `  --${token}: ${value};`).join("\n");
    try {
      await navigator.clipboard.writeText(`:root {\n${css}\n}`);
      setStatus("팔레트 CSS를 복사했습니다.");
    } catch {
      setStatus("복사할 수 없습니다. 아래 색상 코드를 선택해 복사하세요.");
    }
  }

  return <section className="palette-studio" aria-label="컬러 스튜디오">
    <LandingPreview palette={palette} />
    <div className="palette-tools">
      <div className="palette-tools-head">
        <div>
          <h2>테마 팔레트</h2>
          <p>테마를 선택해 제주 여행 페이지에 적용해 보세요.</p>
        </div>
        <button type="button" onClick={() => void copyPalette()}>팔레트 CSS 복사</button>
      </div>
      <div className="palette-options" role="group" aria-label="테마">
        {palettes.map(option => (
          <button type="button" key={option.name} aria-pressed={option === palette} onClick={() => { selectPalette(option); setStatus(""); }}>
            <span aria-hidden="true" style={{ background: option.landscape }} />{option.name}
          </button>
        ))}
      </div>
      <div className="palette-orbit">
        <OrbitReveal onSelect={index => { const color = colors[index]; if (color) setStatus(`${color.label} 색상을 선택했습니다. ${color.value}`); }}
          cards={colors.map(({ label, value }) => <span className="palette-orbit-swatch" key={label} role="img" aria-label={`${label} ${value}`} style={{ background: value }} />)} />
      </div>
      <dl className="palette-values">
        {colors.map(({ label, value }) => <div key={label}>
          <dt><span aria-hidden="true" style={{ background: value }} />{label}</dt>
          <dd><code>{value}</code></dd>
        </div>)}
      </dl>
      {status && <p role="status">{status}</p>}
    </div>
  </section>;
}
