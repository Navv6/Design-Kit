"use client";
import { useState } from "react";
/** Curated Visual Core themes share markup; CSS overrides are scope-isolated by [data-core].
 * To copy one style: import base.css and the selected preset.css in your app/layout.tsx.
 */
export function VisualCorePreview({ core, compact=false }: {core:string;compact?:boolean}) {
  const [explored,setExplored] = useState(false);
  return <div className={`vc-stage${compact ? " vc-compact" : ""}`} data-core={core} aria-label={`${core} visual style preview`}>
    <div className="vc-top"><span className="vc-brand">N<span style={{color:"var(--vc-accent)"}}>.</span></span><span className="vc-nav">NAVV6 / DESIGN ATLAS</span></div>
    <div className="vc-main"><span className="vc-eyebrow">VISUAL CORE / {core.toUpperCase().replaceAll("-"," ")}</span>
      <h2 className="vc-headline">Design for<br/><em>what's next.</em></h2>
      <p className="vc-description">Explore a distinctive visual language. Reuse its tokens, typography, shape and atmosphere.</p>
      <div className="vc-actions">{compact ? <span className="vc-primary">Explore style <b aria-hidden="true">↗</b></span> : <button className="vc-primary" type="button" onClick={()=>setExplored(v=>!v)}>{explored ? "Style selected" : "Explore style"} <b aria-hidden="true">↗</b></button>}<span className="vc-secondary">CURATED AESTHETIC</span></div>
    </div>
    <div className="vc-art" aria-hidden="true"><i/><i/><i/></div>
    <div className="vc-bottom"><span>EXPERIMENT / COLLECTION 01</span><span>DESIGN ATLAS © 2026</span></div>
    {!compact && explored && <span className="vc-status" role="status">Preview action confirmed</span>}
  </div>
}
