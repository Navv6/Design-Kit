"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { PostAssets } from "./post-assets";
import type { Asset } from "../asset-details";

export function RiffCard({ title, description, image, video, sourceUrl, assets, children }: {
  title: string; description: string; image: string; video?: string; sourceUrl: string; assets: Asset[]; children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const preview = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  const [manualPlayback, setManualPlayback] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const element = preview.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    function sync() {
      if (visible && !open && !document.hidden && (manualPlayback ?? !motion.matches)) {
        void element!.play().catch(() => setPaused(true));
      } else element!.pause();
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.intersectionRatio >= 0.15; sync(); }, { threshold: 0.15 });
    observer.observe(element);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      element.pause();
    };
  }, [video, manualPlayback, open]);
  function show(button: HTMLButtonElement) {
    trigger.current = button;
    setOpen(true);
    dialog.current?.showModal();
  }
  function close() { setOpen(false); trigger.current?.focus({preventScroll:true}); }
  return <article className="riff-card">
    <div className="riff-media">
      <button className="riff-media-open" type="button" aria-label={`${title} 작품 열기`} aria-haspopup="dialog" onClick={event => show(event.currentTarget)} />
      {video ? <>
        <video ref={preview} src={video} poster={image} loop muted playsInline preload="metadata"
          onPlay={() => setPaused(false)} onPause={() => setPaused(true)} aria-label={`${title} 원본 영상`} />
        <button className="riff-play-toggle" type="button" aria-label={paused ? "영상 재생" : "영상 일시정지"} onClick={() => setManualPlayback(paused)}>
          {paused ? "▶" : "Ⅱ"}
        </button>
      </> : <img src={image} alt={title} loading="lazy" />}
    </div>
    <div className="riff-caption">
      <button type="button" aria-haspopup="dialog" onClick={event => show(event.currentTarget)}>{title}</button>
      <button type="button" aria-label={`${title} 상세 열기`} onClick={event => show(event.currentTarget)}>↗</button>
    </div>
    <dialog className="riff-dialog" ref={dialog} onClose={close} onClick={event=>{if(event.target===event.currentTarget)dialog.current?.close();}}>
      <div className="riff-dialog-panel">
        <div className="riff-dialog-head"><h2>{title}</h2><button type="button" onClick={()=>dialog.current?.close()}>닫기 ×</button></div>
        <div className="riff-dialog-body">
          <div className="riff-large-media">
            {open && children}
          </div>
          <aside className="riff-info">
            <h3>직접 체험</h3>
            <p>{description}</p>
            <h3>사용한 ASSET</h3>
            <PostAssets assets={assets} />
            <h3>Figma 원본</h3>
            <a href={sourceUrl} target="_blank" rel="noreferrer">원본에서 열기 · 복사 ↗</a>
          </aside>
        </div>
      </div>
    </dialog>
  </article>;
}
