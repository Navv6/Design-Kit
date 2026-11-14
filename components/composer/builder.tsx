'use client';
import { publicPath } from "@/app/public-path";

import { useEffect, useMemo, useRef, useState } from 'react';
import rawCatalog from '@/data/catalog.json';
import { BLOCK_LIBRARY, COMPOSER_GROUPS, DEFAULT_COMPOSITION, generateAgentPrompt, generatePageSource, newBlock, parseComposition, type BlockId, type Composition } from '@/data/composer';
import { CompositionRenderer, type BlockDropPosition } from './renderer';
import './builder.css';

const cores=rawCatalog.filter(item=>item.category==='visual-core');
const coreIds=cores.map(item=>item.id);
const assetNames = new Map(rawCatalog.map(item => [item.id, item.nameKo]));
const groupLabels: Record<string, string> = { All: "전체", Sections: "섹션", UI: "UI", Motion: "모션", Data: "데이터", "3D & FX": "3D·효과" };
const deviceLabels = { desktop: "데스크톱", tablet: "태블릿", mobile: "모바일" };
const LOCAL_KEY='navv6-atlas-composition-v04';
type SaveStatus = 'loading' | 'saved' | 'read-error' | 'write-error';

async function copyText(text:string){
 try{await navigator.clipboard.writeText(text);return true;}catch{
  const field=document.createElement('textarea');field.value=text;field.style.cssText='position:fixed;opacity:0;top:0;';document.body.appendChild(field);field.select();let ok=false;try{ok=document.execCommand('copy')}catch{}field.remove();return ok;
 }
}
function downloadText(filename:string,contents:string,type='application/json'){
 const file=new Blob([contents],{type:`${type};charset=utf-8`});const url=URL.createObjectURL(file);const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();window.setTimeout(()=>URL.revokeObjectURL(url),4000);
}
export function ComposerBuilder({sample,incomingBlock}: {sample?: {id:string;title:string;composition:Composition};incomingBlock?:BlockId}){
 const initialConfig=sample?.composition ?? DEFAULT_COMPOSITION;
 const storageKey=sample ? `${LOCAL_KEY}:${sample.id}` : LOCAL_KEY;
 const [config,setConfig]=useState<Composition>(initialConfig);
 const [loaded,setLoaded]=useState(false);
 const [saveStatus,setSaveStatus]=useState<SaveStatus>('loading');
 const [saveAttempt,setSaveAttempt]=useState(0);
 const readFailed=useRef(false);
 const initialized=useRef(false);
 const [selected,setSelected]=useState<string|null>(initialConfig.blocks[0]?.instanceId ?? null);
 const [assetGroup,setAssetGroup]=useState('All');
 const [search,setSearch]=useState('');
 const [device,setDevice]=useState<'desktop'|'tablet'|'mobile'>('desktop');
 const [activeTab,setActiveTab]=useState<'properties'|'layers'|'export'>('properties');
 const [notice,setNotice]=useState('');
 const inputRef=useRef<HTMLInputElement>(null);
 useEffect(()=>{
  if(initialized.current)return;
  initialized.current=true;
  let next=initialConfig;
  try{
   const saved=window.localStorage.getItem(storageKey);
   if(saved)next=parseComposition(JSON.parse(saved),coreIds);
  }
  catch{
   readFailed.current=true;
   setSaveStatus('read-error');
  }
  let nextSelection=next.blocks[0]?.instanceId??null;
  if(incomingBlock){
   if(next.blocks.length<40){
    const block=newBlock(incomingBlock);
    next={...next,blocks:[...next.blocks,block]};
    nextSelection=block.instanceId;
    message(`${assetNames.get(incomingBlock)??incomingBlock} 추가됨`);
   }else{
    message('블록은 최대 40개까지 추가할 수 있습니다.');
   }
   const url=new URL(window.location.href);
   url.searchParams.delete('add');
   window.history.replaceState(window.history.state,'',url);
  }
  setConfig(next);
  setSelected(nextSelection);
  setLoaded(true);
 },[initialConfig,incomingBlock,storageKey]);
 useEffect(()=>{
  if(!loaded || (readFailed.current && saveAttempt===0))return;
  try{
   window.localStorage.setItem(storageKey,JSON.stringify(config));
   setSaveStatus('saved');
  }catch{
   setSaveStatus('write-error');
  }
 },[loaded,config,saveAttempt,storageKey]);
 useEffect(()=>{
  if((saveStatus!=='write-error' && saveStatus!=='read-error') || config===initialConfig)return;
  function warnBeforeLeaving(event:BeforeUnloadEvent){event.preventDefault();event.returnValue='';}
  window.addEventListener('beforeunload',warnBeforeLeaving);
  return ()=>window.removeEventListener('beforeunload',warnBeforeLeaving);
 },[config,initialConfig,saveStatus]);
 const filtered=useMemo(()=>BLOCK_LIBRARY.filter(item=>(assetGroup==='All'||item.group===assetGroup)&&`${item.id} ${item.name} ${assetNames.get(item.id)} ${item.description}`.toLowerCase().includes(search.toLowerCase())),[assetGroup,search]);
 const picked=config.blocks.find(x=>x.instanceId===selected)??null;
 const pickedDefinition=BLOCK_LIBRARY.find(x=>x.id===picked?.assetId);
 const core=cores.find(item=>item.id===config.visualCoreId)??cores[0];
 const currentAccent=config.accentOverride||core?.visualCore?.palette.accent||'#8b92ff';
 function showInspector(tab: typeof activeTab) {
  setActiveTab(tab);
  const inspector = document.getElementById('builder-settings');
  if (window.matchMedia('(max-width: 950px)').matches) {
   inspector?.focus({ preventScroll: true });
   inspector?.scrollIntoView({ block: 'start' });
  }
 }
 function message(value:string){setNotice(value);window.setTimeout(()=>setNotice(''),3500)}
 function resetExample(){
  setConfig(initialConfig);
  setSelected(initialConfig.blocks[0]?.instanceId ?? null);
  message('예제 구성으로 초기화했습니다.');
 }
 function patchConfig(patch:Partial<Composition>){setConfig(c=>({...c,...patch}))}
 function addBlock(id:BlockId){if(config.blocks.length>=40){message('최대 40개까지 추가할 수 있습니다.');return;}const b=newBlock(id);setConfig(c=>({...c,blocks:[...c.blocks,b]}));setSelected(b.instanceId);setActiveTab('properties');message(`${id} 추가됨`)}
 function patchBlock(patch:Partial<NonNullable<typeof picked>>){if(!selected)return;setConfig(c=>({...c,blocks:c.blocks.map(b=>b.instanceId===selected?{...b,...patch}:b)}))}
 function removeBlock(id:string){setConfig(c=>({...c,blocks:c.blocks.filter(b=>b.instanceId!==id)}));if(selected===id)setSelected(config.blocks.find(b=>b.instanceId!==id)?.instanceId??null);message('블록 삭제됨')}
 function reorderBlock(sourceId:string,targetId:string,position:BlockDropPosition){
  setConfig(current=>{
   const from=current.blocks.findIndex(block=>block.instanceId===sourceId);
   const target=current.blocks.findIndex(block=>block.instanceId===targetId);
   if(from<0||target<0||from===target)return current;
   const insertion=target+(position==='after'?1:0)-(from<target?1:0);
   if(from===insertion)return current;
   const blocks=[...current.blocks];
   const [block]=blocks.splice(from,1);
   blocks.splice(insertion,0,block);
   return {...current,blocks};
  });
 }
 function moveBlock(id:string,offset:-1|1){
  const index=config.blocks.findIndex(block=>block.instanceId===id);
  const target=config.blocks[index+offset];
  if(index>=0&&target)reorderBlock(id,target.instanceId,offset===-1?'before':'after');
 }
 function downloadConfig(){downloadText(`${config.name.replace(/[^가-힣a-zA-Z0-9-_]+/g,'-')||'navv6'}.composition.json`,JSON.stringify(config,null,2));message('JSON 저장됨')}
 async function importConfig(file:File|undefined){if(!file)return;try{if(file.size>200_000)throw new Error('200KB 이하의 JSON 파일만 지원합니다.');const parsed=parseComposition(JSON.parse(await file.text()),coreIds);setConfig(parsed);setSelected(parsed.blocks[0]?.instanceId??null);message('구성을 불러왔습니다.')}catch(error){message(`가져오기 실패: ${error instanceof Error?error.message:'파일 형식 확인 필요'}`)}}
 async function copy(value:string,label:string){const ok=await copyText(value);message(ok?`${label} 복사 완료`:'클립보드를 사용할 수 없습니다. 다운로드를 이용해 주세요.')}
 const sizePixels=device==='desktop'?980:device==='tablet'?720:390;
 return <div className="builder-shell">
  <header className="builder-header"><a className="builder-brand" href={publicPath("/")}><strong>NAVV6</strong><small>자산 라이브러리</small></a><div className="builder-header-center"><span className="builder-live-dot"/> 페이지 빌더 <b>블록 {config.blocks.length}개</b></div><div className="builder-header-right"><button className="builder-btn builder-btn-ghost" type="button" onClick={()=>inputRef.current?.click()}>JSON 불러오기</button><button className="builder-btn builder-btn-secondary" type="button" onClick={downloadConfig}>JSON 저장</button><button className="builder-btn builder-btn-primary" type="button" onClick={()=>showInspector('export')}>코드 내보내기</button></div></header>
  {(saveStatus==='read-error'||saveStatus==='write-error')&&<div className="builder-save-warning">
   <p role="alert">{saveStatus==='read-error'
    ? '저장된 구성을 읽지 못했습니다. 현재 구성을 저장하면 기존 브라우저 저장본을 덮어쓸 수 있습니다.'
    : '브라우저에 저장하지 못했습니다. 페이지를 닫기 전에 다시 저장하거나 JSON을 내려받으세요.'}</p>
   <div>
    <button className="builder-btn" type="button" onClick={()=>setSaveAttempt(attempt=>attempt+1)}>{saveStatus==='read-error'?'현재 구성 저장':'다시 저장'}</button>
    <button className="builder-btn" type="button" onClick={downloadConfig}>JSON 내려받기</button>
   </div>
  </div>}
  <div className="builder-columns">
   <aside className="builder-library"><div className="builder-column-heading"><h2>블록 추가</h2></div>
    <label className="builder-search"><span>⌕</span><input aria-label="빌더 자산 검색" value={search} onChange={e=>setSearch(e.target.value)} placeholder="블록 이름 또는 ID 검색"/></label>
    <div className="builder-group-tabs">{['All',...COMPOSER_GROUPS].map(cat=><button type="button" key={cat} onClick={()=>setAssetGroup(cat)} className={assetGroup===cat?'active':''} aria-pressed={assetGroup===cat}>{groupLabels[cat]}</button>)}</div>
    <div className="builder-library-list">{filtered.map(item=><button type="button" key={item.id} className="builder-library-asset" onClick={()=>addBlock(item.id)}><span className="builder-asset-symbol">{item.group==='3D & FX'?'✳':item.group==='Motion'?'↗':item.group==='Data'?'▥':item.group==='Sections'?'▦':'◈'}</span><span className="builder-asset-main"><small>{item.id}{item.heavy?' · GPU':''}</small><strong>{assetNames.get(item.id) ?? item.name}</strong><em>{item.description}</em></span><span className="builder-plus">＋</span></button>)}{!filtered.length&&<p className="builder-search-empty">검색 결과가 없습니다.</p>}</div>
       </aside>
   <main className="builder-workspace"><div className="builder-workspace-bar"><div><span className="builder-eyebrow">{sample ? sample.title : "미리보기"}</span><strong>{config.name}</strong></div><div className="builder-device-picker" role="group" aria-label="미리보기 화면 크기">{(['desktop','tablet','mobile'] as const).map(d=><button key={d} className={device===d?'active':''} type="button" onClick={()=>setDevice(d)} title={`${deviceLabels[d]} 너비`} aria-label={`${deviceLabels[d]} 미리보기`} aria-pressed={device===d}>{deviceLabels[d]}</button>)}</div><a className="builder-settings-link" href="#builder-settings">설정 ↓</a></div>
   <div className="builder-canvas-scroller"><div className="builder-canvas-wrap" style={{width:`min(100%, ${sizePixels}px)`}}><div className="builder-canvas-label"><span className="builder-live-dot"/> {core?.nameKo} <b>{deviceLabels[device]}</b></div><CompositionRenderer config={config} selectedId={selected} onSelect={(id)=>{setSelected(id);showInspector('properties')}} onReorder={reorderBlock} mode="editor"/></div></div>
   </main>
   <aside className="builder-inspector" id="builder-settings" tabIndex={-1}><div className="builder-column-heading"><h2>설정</h2></div>
    <div className="builder-inspector-tabs"><button type="button" className={activeTab==='properties'?'active':''} aria-pressed={activeTab==='properties'} onClick={()=>setActiveTab('properties')}>속성</button><button type="button" className={activeTab==='layers'?'active':''} aria-pressed={activeTab==='layers'} onClick={()=>setActiveTab('layers')}>블록 순서</button><button type="button" className={activeTab==='export'?'active':''} aria-pressed={activeTab==='export'} onClick={()=>setActiveTab('export')}>내보내기</button></div>
    <div className="builder-inspector-content">
    {activeTab==='properties'&&<>
      <div className="builder-field"><label htmlFor="builder-name">페이지 이름</label><input id="builder-name" maxLength={90} value={config.name} onChange={e=>patchConfig({name:e.target.value})}/></div>
      <div className="builder-field"><label htmlFor="builder-core">스타일 프리셋 <small>20종</small></label><select id="builder-core" value={config.visualCoreId} onChange={e=>patchConfig({visualCoreId:e.target.value,accentOverride:null})}>{cores.map(item=><option value={item.id} key={item.id}>{item.id} · {item.nameKo}</option>)}</select><div className="builder-core-chip" style={{background:core?.visualCore?.palette.background,color:core?.visualCore?.palette.foreground,borderColor:core?.visualCore?.palette.accent}}><span style={{background:core?.visualCore?.palette.accent}}/> {core?.nameKo}</div></div>
      <div className="builder-field"><label htmlFor="builder-accent">강조색</label><div className="builder-color"><input id="builder-accent" type="color" value={currentAccent} onChange={e=>patchConfig({accentOverride:e.target.value})}/><code>{currentAccent}</code><button type="button" onClick={()=>patchConfig({accentOverride:null})}>기본값</button></div></div>
      <div className="builder-divider"/>
      {picked?<><div className="builder-selection"><span>선택한 블록 <b>{picked.assetId}</b></span><strong>{assetNames.get(picked.assetId) ?? pickedDefinition?.name}</strong></div>
       <div className="builder-field">
        <label htmlFor="builder-block-type">블록 유형</label>
        <select id="builder-block-type" value={picked.assetId} onChange={event=>{
         const next=BLOCK_LIBRARY.find(block=>block.id===event.target.value);
         if(next)patchBlock({assetId:next.id});
        }}>
         {BLOCK_LIBRARY.map(block=><option key={block.id} value={block.id}>{assetNames.get(block.id) ?? block.name} · {block.id}</option>)}
        </select>
       </div>
       <div className="builder-field"><label htmlFor="builder-title">제목</label><input id="builder-title" maxLength={150} value={picked.title} onChange={e=>patchBlock({title:e.target.value})}/></div>
       <div className="builder-field"><label htmlFor="builder-desc">설명</label><textarea id="builder-desc" rows={4} maxLength={500} value={picked.description} onChange={e=>patchBlock({description:e.target.value})}/></div>
       <div className="builder-field"><label htmlFor="builder-label">머리말 / 버튼 문구</label><input id="builder-label" maxLength={100} value={picked.label} onChange={e=>patchBlock({label:e.target.value})}/></div>
       <div className="builder-field"><label htmlFor="builder-height">섹션 크기</label><select id="builder-height" value={picked.size} onChange={e=>patchBlock({size:e.target.value as typeof picked.size})}><option value="compact">작게</option><option value="normal">보통</option><option value="large">크게</option></select></div>
       <div className="builder-block-actions"><button type="button" onClick={()=>moveBlock(picked.instanceId,-1)} disabled={config.blocks[0]?.instanceId===picked.instanceId}>↑ 위로</button><button type="button" onClick={()=>moveBlock(picked.instanceId,1)} disabled={config.blocks[config.blocks.length-1]?.instanceId===picked.instanceId}>↓ 아래로</button><button className="danger" type="button" onClick={()=>removeBlock(picked.instanceId)}>삭제</button></div>
       <p className="builder-field-note">일부 블록의 데모 내부 문구는 고정되어 있습니다. 제목과 설명은 블록 바깥에 표시됩니다.</p>
      </>:<div className="builder-help">편집할 블록을 캔버스에서 선택하거나 새 블록을 추가해 주세요.</div>}
     </>}
    {activeTab==='layers'&&<><p className="builder-panel-hint">블록 순서를 바꾸거나 제거할 수 있습니다.</p>{config.blocks.map((b,i)=><div key={b.instanceId} className={`builder-layer ${selected===b.instanceId?'active':''}`}><button type="button" onClick={()=>{setSelected(b.instanceId);setActiveTab('properties')}}><small>{String(i+1).padStart(2,'0')} / {b.assetId}</small><strong>{assetNames.get(b.assetId)}</strong></button><div><button type="button" onClick={()=>moveBlock(b.instanceId,-1)} disabled={i===0} aria-label="위로 이동">↑</button><button type="button" onClick={()=>moveBlock(b.instanceId,1)} disabled={i===config.blocks.length-1} aria-label="아래로 이동">↓</button><button type="button" onClick={()=>removeBlock(b.instanceId)} aria-label="삭제">×</button></div></div>)}{!config.blocks.length&&<div className="builder-help">비어 있습니다. 자산을 추가하세요.</div>}<button type="button" className="builder-btn builder-btn-ghost builder-reset" onClick={resetExample}>↺ 예제 구성으로 초기화</button></>}
    {activeTab==='export'&&<><div className="builder-export-intro"><strong>페이지 내보내기</strong><p>JSON은 언제든 다시 불러올 수 있고, TSX는 같은 프로젝트의 CompositionRenderer를 사용합니다.</p></div><button className="builder-export-card" type="button" onClick={downloadConfig}><span>편집 가능한 구성</span><strong>JSON 다운로드 <b>↓</b></strong><small>편집 가능한 구성 · .composition.json</small></button><button className="builder-export-card" type="button" onClick={()=>copy(generatePageSource(config),'React TSX')}><span>React 소스</span><strong>page.tsx 복사 <b>↗</b></strong><small>현재 렌더러를 사용하는 페이지 코드</small></button><button className="builder-export-card" type="button" onClick={()=>downloadText('page.tsx',generatePageSource(config),'text/plain')}><span>Next.js 페이지</span><strong>page.tsx 다운로드 <b>↓</b></strong><small>Next.js App Router용 파일</small></button><button className="builder-export-card" type="button" onClick={()=>copy(generateAgentPrompt(config),'Agent prompt')}><span>에이전트 지시문</span><strong>적용 지시문 복사 <b>↗</b></strong><small>사용한 ID와 적용 규칙 포함</small></button><p className="builder-field-note">내보낸 페이지를 실행하려면 이 프로젝트의 공통 컴포넌트와 스타일 파일이 필요합니다.</p></>}
    </div>
    <div className="builder-inspector-footer">
     <span className="builder-save-status" role="status">
      {saveStatus==='saved'&&<span className="builder-live-dot"/>}
      {saveStatus==='loading'?'저장된 구성 불러오는 중':saveStatus==='saved'?(sample?'예제 작업에 자동 저장됨':'이 브라우저에 자동 저장됨'):saveStatus==='read-error'?'불러오기 실패':'자동 저장 실패'}
     </span>
     {sample&&<a href={publicPath("/builder")}>내 작업 열기</a>}
    </div>
   </aside>
  </div>
  <input ref={inputRef} hidden type="file" accept=".json,application/json" onChange={e=>{void importConfig(e.target.files?.[0]);e.target.value=''}}/>
  {notice&&<div role="status" className="builder-toast">{notice}</div>}
 </div>;
}
