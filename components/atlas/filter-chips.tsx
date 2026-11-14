'use client';
import {useState} from 'react';
const options=['React','AI','3D','Design'];
export function FilterChips(){
 const [active,setActive]=useState(['React','3D']);
 return <div style={{display:'flex',flexWrap:'wrap',gap:9}}>{options.map(s=><button key={s} aria-pressed={active.includes(s)} onClick={()=>setActive(prev=>prev.includes(s)?prev.filter(v=>v!==s):[...prev,s])} style={{padding:'9px 15px',borderRadius:30,border:`1px solid ${active.includes(s)?'var(--accent-text,#8b92ff)':'#596074'}`,background:active.includes(s)?'var(--selection,#8b92ff28)':'transparent',color:active.includes(s)?'var(--accent-text,#cdd0ff)':'var(--text,light-dark(#1d1d1f,#ededf2))'}}> {active.includes(s)?'✓ ': '+ '}{s}</button>)}</div>;
}
