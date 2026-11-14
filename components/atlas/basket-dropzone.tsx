"use client";

import { useEffect, useRef, useState } from "react";
import "./riff-interactions.css";

export function BasketDropzone({ maxBytes = 5_000_000, onFileAccepted }: { maxBytes?: number; onFileAccepted?: (file: File) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [outcome, setOutcome] = useState<"idle" | "success" | "error">("idle");
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState("");
  const [round, setRound] = useState(0);
  useEffect(() => {
    if (!file) { setPreview(""); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  function receive(file?: File) {
    if (!file) return;
    setFileName(file.name);
    const valid = file.type.startsWith("image/") && file.size > 0 && file.size <= maxBytes;
    setOutcome(valid ? "success" : "error");
    setFile(valid ? file : undefined);
    if (valid) { setRound(value => value + 1); onFileAccepted?.(file); }
  }
  return <div className="riff-sample">
    <div className="sample-drop" data-dragging={dragging} data-outcome={outcome}
      onDragOver={event => { event.preventDefault(); setDragging(true); }}
      onDragLeave={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false); }}
      onDrop={event => { event.preventDefault(); setDragging(false); receive(event.dataTransfer.files[0]); }}>
      <div className="sample-hoop" aria-hidden="true"><i key={round} /></div>
      <strong>이미지를 놓아보세요</strong>
      <p>최대 {maxBytes / 1_000_000}MB · 로컬 검증</p>
      <input ref={input} type="file" accept="image/*" hidden onChange={event => { receive(event.currentTarget.files?.[0]); event.currentTarget.value = ""; }} />
      <button type="button" onClick={() => input.current?.click()}>이미지 선택</button>
    </div>
    {preview && <div className="sample-upload-result">
      <img src={preview} alt={fileName} onError={() => setPreview("")} />
      <button type="button" onClick={() => { setFile(undefined); setOutcome("idle"); }}>이미지 제거</button>
    </div>}
    <p role="status">{outcome === "success" ? fileName + " · 추가 완료" : outcome === "error" ? "용량 한도 내 이미지 파일을 선택하세요." : ""}</p>
  </div>;
}
