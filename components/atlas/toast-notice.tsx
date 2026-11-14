'use client';
import {useEffect,useState} from 'react';
export function ToastNotice(){
 const [open,setOpen]=useState(false);
 useEffect(()=>{if(!open)return;const t=setTimeout(()=>setOpen(false),3200);return()=>clearTimeout(t)},[open]);
 return <div style={{display:'flex',flexDirection:'column',gap:14,alignItems:'center'}}><button className="ad-button" onClick={()=>setOpen(true)}>Save changes</button><div role="status" aria-live="polite" style={{minHeight:42}}>{open&&<div style={{padding:'12px 18px',background:'#1b302c',border:'1px solid #326f61',borderRadius:11,color:'#bcf9e1',fontSize:13}}>✓ Saved successfully <button aria-label="닫기" onClick={()=>setOpen(false)} style={{border:0,background:'transparent',color:'inherit',marginLeft:20}}>×</button></div>}</div></div>;
}
