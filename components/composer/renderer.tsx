'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import catalog from '@/data/catalog.json';
import type { ComposerBlock, Composition } from '@/data/composer';
import { MagneticButton } from '@/components/atlas/magnetic-button';
import { GradientButton } from '@/components/atlas/gradient-button';
import { ScrollReveal } from '@/components/atlas/scroll-reveal';
import { TiltCard } from '@/components/atlas/tilt-card';
import { AnimatedCounter } from '@/components/atlas/animated-counter';
import { SparklineChart } from '@/components/atlas/sparkline-chart';
import { AuroraBackground } from '@/components/atlas/aurora-background';
import { VerticalTimeline } from '@/components/atlas/vertical-timeline';
import { useWebGLScene } from '@/components/atlas/use-webgl-scene';
import { useBlockDrag, type BlockDropPosition } from './use-block-drag';
import './composer.css';

export type { BlockDropPosition } from './use-block-drag';

const ParticleField = dynamic(() => import('@/components/atlas/particle-field'), {ssr:false,loading:()=> <div className="composer-static-3d">파티클 로드 중…</div>});
const TorusKnot = dynamic(() => import('@/components/atlas/torus-knot').then(m=>m.TorusKnot), {ssr:false,loading:()=> <div className="composer-static-3d">3D 장면 로드 중…</div>});
const LiquidShader = dynamic(() => import('@/components/atlas/liquid-shader').then(m=>m.LiquidShader), {ssr:false,loading:()=> <div className="composer-static-3d">셰이더 로드 중…</div>});

/** GPU scenes load on intersection only, with WebGL/reduced-motion fallback. */
function GPUScene({type}:{type:'3D-001'|'3D-002'|'SHD-001'}){
 const ref=useRef<HTMLDivElement>(null);const [visible,setVisible]=useState(false);
 const allowed=useWebGLScene();
 useEffect(()=>{
  if(!('IntersectionObserver' in window)){setVisible(true);return;}
  const observer=new IntersectionObserver(entries=>{if(entries[0]?.isIntersecting){setVisible(true);observer.disconnect();}},{rootMargin:'180px'});
  if(ref.current)observer.observe(ref.current);
  return()=>observer.disconnect();
 },[]);
 return <div ref={ref} className="composer-gpu">{allowed&&visible ? (type==='3D-001'?<ParticleField/>:type==='3D-002'?<TorusKnot/>:<LiquidShader/>) : <div className="composer-static-3d" role="img" aria-label={allowed===false?'정적 3D 대체 화면':'3D 장면 로딩 전의 정적 미리보기'}><div className="composer-static-orb"/><small>{allowed===false?'정적 미리보기':visible?'WebGL 로드 중':'화면에 들어오면 로드됩니다'}</small></div>}</div>;
}

function SectionBlock({block}:{block:ComposerBlock}){
 const [clicked,setClicked]=useState(false);
 const commonHeading=<><span className="composer-kicker">{block.label}</span><h2>{block.title}</h2><p>{block.description}</p></>;
 switch(block.assetId){
 case 'LAY-002':return <section className="composer-section composer-hero"><div className="composer-hero-copy">{commonHeading}<a className="composer-cta" href="#composed-content">{block.label} <span aria-hidden="true">↗</span></a></div><div className="composer-hero-art" aria-hidden="true"><i/><b/></div></section>;
 case 'CMP-002':return <section className="composer-section"><div className="composer-glass"><span className="composer-kicker">{block.label}</span><div className="composer-card-row"><div><h2>{block.title}</h2><p>{block.description}</p></div><span aria-hidden="true" className="composer-card-symbol">✳</span></div></div></section>;
 case 'LAY-001':return <section className="composer-section composer-bento"><div className="composer-bento-main"><span className="composer-kicker">{block.label}</span><h2>{block.title}</h2><p>{block.description}</p><span className="composer-pill">작업 사례 01–03</span></div><div className="composer-bento-side"><span className="composer-kicker">디자인 시스템</span><strong>01 / 구축</strong><p>반응형 UI와 재사용 가능한 컴포넌트.</p></div><div className="composer-bento-side"><span className="composer-kicker">실험</span><strong>02 / 탐색</strong><p>모션, 셰이더, 인터랙션.</p></div></section>;
 case 'TYP-001':return <section className="composer-section composer-typo"><span className="composer-kicker">{block.label}</span><h2 className="composer-gradient-title">{block.title}</h2><p>{block.description}</p></section>;
 case 'MOT-001':return <section className="composer-section composer-center"><span className="composer-kicker">{block.label}</span><h2>{block.title}</h2><MagneticButton>{block.label}</MagneticButton><p>{block.description}</p></section>;
 case 'CMP-003':return <section className="composer-section composer-center">{commonHeading}<GradientButton type="button" onClick={()=>setClicked(true)}>{block.label}</GradientButton><small role="status" className="composer-disclaimer">{clicked ? "데모 클릭 확인 · 실제 행동은 프로젝트에서 연결" : "시연 버튼 · 실제 행동은 프로젝트에서 연결"}</small></section>;
 case 'MOT-002':return <section className="composer-section composer-center">{commonHeading}<ScrollReveal/></section>;
 case 'MOT-003':return <section className="composer-section composer-center">{commonHeading}<TiltCard/></section>;
 case 'MOT-004':return <section className="composer-section composer-center">{commonHeading}<AnimatedCounter/></section>;
 case 'DAT-001':return <section className="composer-section composer-center">{commonHeading}<SparklineChart/></section>;
 case 'BG-001':return <section className="composer-section composer-background">{commonHeading}<AuroraBackground/></section>;
 case 'LAY-003':return <section className="composer-section composer-timeline">{commonHeading}<VerticalTimeline/></section>;
 case '3D-001':case '3D-002':case 'SHD-001':return <section className="composer-section composer-scene"><div className="composer-scene-text">{commonHeading}<small>화면에 들어오면 WebGL 로드</small></div><GPUScene type={block.assetId}/></section>;
 default:return null;
 }
}

export function CompositionRenderer({config,selectedId,onSelect,onReorder,mode='page'}:{
 config:Composition;
 selectedId?:string|null;
 onSelect?:(id:string)=>void;
 onReorder?:(sourceId:string,targetId:string,position:BlockDropPosition)=>void;
 mode?:'page'|'editor';
}){
 const {container,preview,start,offsetFor}=useBlockDrag(config.blocks,onReorder);
 const core=useMemo(()=>catalog.find(item=>item.id===config.visualCoreId&&item.category==='visual-core'),[config.visualCoreId]);
 const palette=core?.visualCore?.palette;
 const customStyle={
  '--cv-bg':palette?.background||'#101724',
  '--cv-fg':palette?.foreground||'#ffffff',
  '--cv-accent':config.accentOverride||palette?.accent||'#8a90ff',
  '--cv-font':core?.visualCore?.font||'Arial,sans-serif',
 } as React.CSSProperties;
 return <div className={`composer-render ${mode==='editor'?'composer-render-editor':''}`} data-core={core?.slug||'cyber-minimal'} style={customStyle}>
  <div className="composer-sitebar"><div className="composer-logo">NAVV6<span>.</span></div><div className="composer-site-meta">{core?.nameKo || '스타일 프리셋'}</div><div className="composer-site-line">2026</div></div>
  <div id="composed-content" className="composer-content" ref={container} data-reordering={preview ? '' : undefined}>
  {preview&&<div aria-hidden="true" className="composer-drop-slot" style={{top:preview.slot,height:preview.height}}/>}
  {config.blocks.length===0&&<div className="composer-empty-canvas"><span>＋</span><strong>빈 페이지</strong><p>좌측 목록에서 디자인 자산을 추가해 보세요.</p></div>}
  {config.blocks.map((block,i)=><div
    key={block.instanceId}
    className={`composer-block composer-size-${block.size} ${selectedId===block.instanceId?'composer-block-selected':''}`}
    data-asset-id={block.assetId}
    data-dragging={preview?.source===i ? '' : undefined}
    style={preview ? { translate: `0 ${offsetFor(i)}px` } : undefined}
  >
    {(onSelect||onReorder)&&<div className="composer-block-tools">
     {onReorder&&<span
       className="composer-block-grip"
       aria-hidden="true"
       title="드래그하여 순서 변경"
       onPointerDown={event=>start(event,i)}
     >⠿</span>}
     {onSelect&&<button className="composer-block-select" aria-label={`${i+1}번째 ${block.assetId} 블록 편집`} onClick={()=>onSelect(block.instanceId)} type="button"><span>{block.assetId}</span><span>편집</span></button>}
    </div>}
    <SectionBlock key={block.assetId} block={block}/>
  </div>)}
  </div>
  <div className="composer-sitefooter"><span>NAVV6 / DESIGN ATLAS</span><span>{config.name}</span></div>
 </div>;
}
