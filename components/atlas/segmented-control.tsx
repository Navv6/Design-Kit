'use client';
import {useState} from 'react';
export function SegmentedControl(){
 const [view,setView]=useState('Grid');
 return <div role="group" aria-label="보기 방식" style={{display:'flex',flexWrap:'wrap',padding:5,background:'var(--surface-2,light-dark(#eeeef1,#252937))',borderRadius:13,gap:5}}>
  {['Grid','List','Kanban'].map(v=><button key={v} aria-pressed={v===view} onClick={()=>setView(v)} style={{border:0,padding:'11px 20px',borderRadius:9,background:v===view?'var(--action-bg,#365ab0)':'transparent',color:v===view?'white':'var(--text,light-dark(#1d1d1f,#ededf2))',fontWeight:600}}>{v}</button>)}
 </div>;
}
