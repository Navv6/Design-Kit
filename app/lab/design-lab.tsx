"use client";

import { useState, type CSSProperties } from "react";

const roles = { background: "배경", surface: "표면", text: "텍스트", accent: "강조", onAccent: "강조 위 텍스트" };
type Palette = Record<keyof typeof roles, string>;
const presets: { name: string; colors: Palette }[] = [
  { name: "해안", colors: { background: "#EDF4F1", surface: "#FFFFFF", text: "#16342C", accent: "#25644F", onAccent: "#FFFFFF" } },
  { name: "테라코타", colors: { background: "#F7EBE4", surface: "#FFF9F4", text: "#39231E", accent: "#963D31", onAccent: "#FFFFFF" } },
  { name: "미드나이트", colors: { background: "#141A2A", surface: "#202941", text: "#F1F4FC", accent: "#B9CDFC", onAccent: "#142138" } },
  { name: "올리브", colors: { background: "#ECEEDC", surface: "#FBFBF2", text: "#28321D", accent: "#536138", onAccent: "#FFFFFF" } },
];
const fonts = [
  { name: "시스템 산세리프", css: "system-ui, sans-serif" },
  { name: "맑은 고딕", css: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif" },
  { name: "명조", css: "'Batang', 'AppleMyungjo', 'Noto Serif CJK KR', serif" },
  { name: "고정폭", css: "'Consolas', 'SFMono-Regular', monospace" },
];

function luminance(hex: string) {
  const rgb = [1, 3, 5].map(offset => parseInt(hex.slice(offset, offset + 2), 16) / 255)
    .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2];
}

function contrast(a: string, b: string) {
  const values = [luminance(a), luminance(b)];
  return (Math.max(...values) + .05) / (Math.min(...values) + .05);
}

export function DesignLab() {
  const [colors, setColors] = useState(presets[0].colors);
  const [font, setFont] = useState(0);
  const [heading, setHeading] = useState(40);
  const [body, setBody] = useState(16);
  const [sample, setSample] = useState("바다가 보이는 오후");
  const [status, setStatus] = useState("");
  const tokens = { ...colors, font: fonts[font].css, "heading-size": heading + "px", "body-size": body + "px" };
  const css = Object.entries(tokens).map(([key, value]) => "  --atlas-" + key + ": " + value + ";").join("\n");
  const style = Object.fromEntries(Object.entries(tokens).map(([key, value]) => ["--atlas-" + key, value])) as CSSProperties;
  const pairs = [
    ["배경 위 텍스트", colors.background, colors.text],
    ["표면 위 텍스트", colors.surface, colors.text],
    ["강조 위 텍스트", colors.accent, colors.onAccent],
  ];

  return <div className="design-lab">
    <div className="lab-controls">
      <fieldset>
        <legend>색상 조합</legend>
        <div className="lab-presets">
          {presets.map(({ name, colors: palette }) => <button type="button" key={name} aria-pressed={colors === palette} onClick={() => setColors(palette)}>
            <span aria-hidden="true" style={{ background: palette.accent }} />{name}
          </button>)}
        </div>
        {Object.entries(roles).map(([key, label]) => {
          const role = key as keyof Palette;
          return <label className="lab-color" key={key}>{label}
            <input type="color" value={colors[role]} onChange={event => setColors({ ...colors, [role]: event.target.value })} />
            <code>{colors[role].toUpperCase()}</code>
          </label>;
        })}
      </fieldset>
      <fieldset>
        <legend>글꼴과 크기</legend>
        <label>글꼴 <select value={font} onChange={event => setFont(Number(event.target.value))}>
          {fonts.map(({ name }, index) => <option key={name} value={index}>{name}</option>)}
        </select></label>
        <label>제목 크기 <output>{heading}px</output><input type="range" min={20} max={72} value={heading} onChange={event => setHeading(Number(event.target.value))} /></label>
        <label>본문 크기 <output>{body}px</output><input type="range" min={12} max={28} value={body} onChange={event => setBody(Number(event.target.value))} /></label>
        <label>미리보기 제목 <input type="text" value={sample} onChange={event => setSample(event.target.value)} /></label>
      </fieldset>
    </div>
    <div className="lab-results">
      <div className="lab-preview" style={style}>
        <div className="lab-swatches" aria-hidden="true">{Object.values(colors).map((color, i) => <span key={i} style={{ background: color }} />)}</div>
        <h2>{sample || "바다가 보이는 오후"}</h2>
        <p>빛과 바람을 따라 천천히 걷는 해안 산책로.</p>
        <div className="lab-preview-surface"><strong>해안 산책로</strong><p>오늘의 코스 · 2.4 km</p><span className="lab-accent">추천 코스</span></div>
      </div>
      <dl className="lab-contrast">
        {pairs.map(([label, a, b]) => {
          const ratio = contrast(a, b);
          return <div key={label}><dt>{label}</dt><dd>{ratio.toFixed(2)}:1 · {ratio >= 4.5 ? "일반 텍스트 AA 충족" : "일반 텍스트 AA 미달"}</dd></div>;
        })}
      </dl>
      <button type="button" className="lab-copy" onClick={async () => {
        try { await navigator.clipboard.writeText(":root {\n" + css + "\n}"); setStatus("CSS 변수를 복사했습니다."); }
        catch { setStatus("복사할 수 없습니다. CSS 변수에서 직접 선택하세요."); }
      }}>CSS 변수 복사</button>
      <span role="status" className="lab-copy-status">{status}</span>
      <details><summary>CSS 변수 보기</summary><pre>{":root {\n" + css + "\n}"}</pre></details>
    </div>
  </div>;
}
