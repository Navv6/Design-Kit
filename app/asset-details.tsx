"use client";
import { publicPath } from "@/app/public-path";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ToggleSwitch } from "@/components/atlas/toggle-switch";
import { GlassCard } from "@/components/atlas/glass-card";
import { GradientButton } from "@/components/atlas/gradient-button";
import { BentoGrid } from "@/components/atlas/bento-grid";
import { ExtraPreview } from "./extra-previews";
import { VisualCorePreview } from "@/components/atlas/visual-core-preview";
import { BLOCK_LIBRARY } from "@/data/composer";

const MagneticButton = dynamic(() => import("@/components/atlas/magnetic-button").then(m => m.MagneticButton));
const ParticleField = dynamic(() => import("@/components/atlas/particle-field"), {
  ssr: false,
  loading: () => <div className="atlas-loading">3D 엔진 로딩 중…</div>,
});

export type Asset = {
  id: string;
  slug: string;
  name: string;
  nameKo: string;
  category: string;
  description: string;
  guide?: { tryIt: string; reuse: string };
  tags: string[];
  useWhen: string[];
  avoidWhen: string[];
  dependencies: string[];
  source: string;
  complexity: string;
  performance?: string;
  componentName?: string;
  files: { path: string; code: string }[];
  visualCore?: { family: string; base: string; preset: string; palette: Record<string,string>; font: string };
};

const idToVisualCore: Record<string,string> = {"VCR-001": "swiss-grid", "VCR-002": "editorial-minimal", "VCR-003": "quiet-luxury", "VCR-004": "blueprint", "VCR-005": "cyberpunk", "VCR-006": "cyber-minimal", "VCR-007": "liquid-chrome", "VCR-008": "retro-terminal", "VCR-009": "y2k", "VCR-010": "frutiger-aero", "VCR-011": "vaporwave", "VCR-012": "memphis-pop", "VCR-013": "glassmorphism", "VCR-014": "neumorphism", "VCR-015": "claymorphism", "VCR-016": "neo-brutalism", "VCR-017": "dark-academia", "VCR-018": "solarpunk", "VCR-019": "organic-nature", "VCR-020": "dreamcore"};

const builderAssetIds = new Set<string>(BLOCK_LIBRARY.map(block => block.id));

function LivePreview({ id }: { id: string }) {
  const [checked, setChecked] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  if (id.startsWith("VCR-")) return <VisualCorePreview core={idToVisualCore[id]} />;
  if (id === "CMP-001") return <div className="demo-centered"><ToggleSwitch checked={checked} onCheckedChange={setChecked} /><span>알림 {checked ? "활성화" : "비활성화"}</span></div>;
  if (id === "CMP-002") return <div className="demo-glass-bg"><GlassCard><small>PROJECT / 2026</small><h3>Interface, reimagined.</h3><p>Build precise experiences with reusable visual components.</p></GlassCard></div>;
  if (id === "CMP-003") return <div className="demo-centered"><GradientButton onClick={() => setClickCount(n => n + 1)}>Explore project</GradientButton><span>클릭 {clickCount}회</span></div>;
  if (id === "MOT-001") return <div className="demo-centered"><MagneticButton>Magnetic interaction</MagneticButton><span>포인터를 버튼 위에서 움직여 보세요</span></div>;
  if (id === "LAY-001") return <BentoGrid />;
  if (id === "3D-001") return <ParticleField />;
  return <ExtraPreview id={id} />;
}

export function AssetDetails({ asset, onClose }: { asset: Asset; onClose: () => void }) {
  const canCompose = builderAssetIds.has(asset.id);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const backdropPressed = useRef(false);
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [fileIndex, setFileIndex] = useState(0);
  const source = asset.files[fileIndex];
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const instruction = `NAVV6 Design Atlas의 ${asset.id} (${asset.name})을 적용해줘. 소스 파일: ${asset.files.map(file => file.path).join(", ")}. 의존성: ${asset.dependencies.join(", ") || "React 및 CSS"}. ${asset.visualCore ? "base.css와 선택한 프리셋 CSS를 불러오고 VisualCorePreview 또는 .vc-stage 구조를 사용해줘." : "CSS 파일이 있으면 앱의 CSS 진입점에서 불러와줘."} 적용할 화면에서 동작을 확인해줘.`;

  async function copyText(value: string, success: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus(success);
    } catch {
      setCopyStatus("클립보드에 복사하지 못했습니다.");
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="atlas-asset-dialog"
      aria-labelledby="atlas-asset-title"
      onClose={event => { event.stopPropagation(); onClose(); }}
      onPointerDown={event => { backdropPressed.current = event.target === event.currentTarget; }}
      onClick={event => {
        if (backdropPressed.current && event.target === event.currentTarget) event.currentTarget.close();
        backdropPressed.current = false;
      }}
      onKeyDownCapture={event => {
        // Escape belongs to an open overlay demo before it belongs to the catalog dialog.
        if (event.key === "Escape" && event.currentTarget.querySelector('[role="dialog"][aria-modal="true"]')) {
          event.preventDefault();
        }
      }}
    >
      <div className="atlas-dialog-panel">
        <header className="atlas-detail-head">
          <div>
            <span className="atlas-section-kicker">{asset.id}</span>
            <h2 id="atlas-asset-title">{asset.nameKo} <small>{asset.name}</small></h2>
            <p className="atlas-detail-description">{asset.description}</p>
          </div>
          <button type="button" className="atlas-dialog-close" autoFocus onClick={() => dialogRef.current?.close()}>
            닫기 <span aria-hidden="true">×</span>
          </button>
        </header>
        <div className="atlas-preview-header">
          <div className="atlas-preview-tabs" role="group" aria-label="ASSET 보기">
            <button type="button" className={tab === "preview" ? "active" : ""} aria-pressed={tab === "preview"} onClick={() => setTab("preview")}>미리보기</button>
            <button type="button" className={tab === "code" ? "active" : ""} aria-pressed={tab === "code"} onClick={() => setTab("code")}>소스 코드</button>
            <button type="button" aria-describedby="atlas-instruction-help" title="AI에게 이 ASSET 적용을 요청하는 문장 복사" onClick={() => void copyText(instruction, "적용 지시문을 복사했습니다. AI 채팅에 붙여넣으세요.")}>적용 지시문 복사</button>
          </div>

        </div>
        <div className="atlas-instruction-help" id="atlas-instruction-help">
          <details><summary>적용 지시문이란?</summary><p>Codex 같은 AI에게 이 ASSET을 프로젝트에 적용해 달라고 요청하는 문장입니다. ASSET ID, 소스 파일 경로, 의존성과 적용 방법을 포함합니다. 복사 후 AI 채팅에 붙여넣으세요. AI가 이 저장소에 접근하거나 소스 파일을 전달받아야 합니다.</p><pre>{instruction}</pre></details>
          <span role="status">{copyStatus}</span>
        </div>
        <div className="atlas-dialog-content">
          {tab === "preview" ? (
            <div className="atlas-preview-area" data-gpu={asset.category === "three" || asset.category === "shader" ? "" : undefined}>
              <LivePreview id={asset.id} />
            </div>
          ) : (
            <div className="atlas-code-area">
              <div className="atlas-source-tools">
                {asset.files.length > 1 && (
                  <select aria-label="소스 파일" value={fileIndex} onChange={event => setFileIndex(Number(event.target.value))}>
                    {asset.files.map((file, index) => <option key={file.path} value={index}>{file.path}</option>)}
                  </select>
                )}
                <button type="button" onClick={() => void copyText(source.code, "소스 코드를 복사했습니다.")}>코드 복사</button>
              </div>
              <pre><code>{source.code}</code></pre>
            </div>
          )}
          {asset.guide && <dl className="atlas-asset-guide">
            <div><dt>직접 확인할 동작</dt><dd>{asset.guide.tryIt}</dd></div>
            <div><dt>프로젝트에 적용하는 방법</dt><dd>{asset.guide.reuse}</dd></div>
          </dl>}
          <div className="atlas-inspector-info">
            <div><small>사용하기 좋은 경우</small><p>{asset.useWhen.join(" · ")}</p></div>
            <div><small>피해야 할 경우</small><p>{asset.avoidWhen.join(" · ")}</p></div>
            <div>
              <small>의존성 및 성능</small>
              <p>{asset.dependencies.length ? asset.dependencies.join(", ") : "React / CSS"} · 부하 {asset.performance === "high" ? "높음" : asset.performance === "medium" ? "보통" : "낮음"}</p>
            </div>
          </div>
          <footer className="atlas-inspector-actions">
            {canCompose && (
              <a className="cb-inline-launch" href={publicPath(`/builder/?add=${encodeURIComponent(asset.id)}`)}>빌더에 추가</a>
            )}
          </footer>
        </div>
      </div>
    </dialog>
  );
}
