'use client';
import {useEffect,useState} from 'react';
export function BottomSheet(){
 const [open,setOpen]=useState(false);
 useEffect(() => {
  if (!open) return;
  function onKey(event: KeyboardEvent) {
   if (event.key === 'Escape') setOpen(false);
  }
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
 }, [open]);
 return <><button className="ad-button" onClick={()=>setOpen(true)}>Open bottom sheet ↑</button>{open&&<div style={{position:'fixed',inset:0,zIndex:1000,background:'#0009'}} onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false)}}><section role="dialog" aria-modal="true" aria-label="빠른 작업" style={{position:'absolute',bottom:0,left:0,right:0,background:'#181d2b',border:'1px solid #444c68',borderRadius:'24px 24px 0 0',padding:'14px 25px 40px',color:'#fff',maxWidth:700,margin:'auto',boxShadow:'0 -25px 80px #0007'}}><div style={{width:46,height:5,borderRadius:20,background:'#69728a',margin:'0 auto 22px'}}/><h3>Quick actions</h3><p style={{color:'#aab2c5',fontSize:13}}>Choose what to do with this project.</p>{['Share project','Duplicate','Move to collection'].map(action=><button key={action} style={{width:'100%',padding:'13px 0',background:'transparent',border:0,borderBottom:'1px solid #34394a',color:'#fff',textAlign:'left'}} onClick={()=>setOpen(false)}>{action} <span style={{float:'right'}}>↗</span></button>)}<button className="ad-secondary" onClick={()=>setOpen(false)} style={{marginTop:14}}>Close</button></section></div>}</>;
}
