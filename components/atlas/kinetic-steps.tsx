"use client";

import { useState } from "react";
import "./riff-interactions.css";

export function KineticSteps({ steps }: { steps: readonly { title: string; description: string }[] }) {
  const [index, setIndex] = useState(0);
  if (!steps.length) return null;
  const active = Math.min(index, steps.length - 1);
  const step = steps[active];
  return <div className="riff-sample">
    <div className="sample-type" aria-live="polite">
      <span>{String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
      <div key={active} className="sample-type-step"><h3>{step.title}</h3><p>{step.description}</p></div>
    </div>
    <progress className="sample-step-progress" value={active + 1} max={steps.length} aria-label="단계 진행률" />
    <div className="riff-page-points" role="group" aria-label="단계 바로 이동">
      {steps.map(({ title }, i) => <button type="button" key={i} aria-label={`${i + 1}단계 · ${title}`} aria-current={active === i ? "step" : undefined} onClick={() => setIndex(i)} />)}
    </div>
    <div className="sample-actions">
      <button type="button" disabled={active === 0} onClick={() => setIndex(active - 1)}>이전 단계</button>
      <button type="button" disabled={active === steps.length - 1} onClick={() => setIndex(active + 1)}>다음 단계</button>
    </div>
  </div>;
}
