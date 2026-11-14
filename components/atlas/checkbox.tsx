'use client';
import {useState} from 'react';
export function Checkbox(){
 const [checked,setChecked]=useState(true);
 return <label style={{display:'inline-flex',gap:14,alignItems:'center',cursor:'pointer',color:'var(--text,light-dark(#1d1d1f,#ededf2))'}}>
  <input type="checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)} style={{width:24,height:24,accentColor:'var(--accent,#8b92ff)',cursor:'pointer'}} />
  <span>프로젝트 업데이트 알림 받기</span>
 </label>;
}
