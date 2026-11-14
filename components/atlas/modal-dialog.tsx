'use client';
import {useEffect,useId,useState} from 'react';
export function ModalDialog(){const id=useId();
 const [open,setOpen]=useState(false);
 useEffect(()=>{if(!open)return;function onKey(e:KeyboardEvent){if(e.key==='Escape')setOpen(false)}window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[open]);
 return <><button className="ad-button" onClick={()=>setOpen(true)}>Open dialog ↗</button>{open&&<div role="presentation" style={{position:'fixed',inset:0,zIndex:1000,background:'#050811bb',display:'grid',placeItems:'center',padding:20}} onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false)}}><section role="dialog" aria-modal="true" aria-labelledby={id} style={{background:'#171d2b',color:'white',border:'1px solid #58607d',borderRadius:20,padding:28,width:'min(370px,100%)',boxShadow:'0 35px 90px #0009'}}><span style={{fontSize:28}}>✧</span><h3 id={id}>Publish changes?</h3><p style={{fontSize:13,color:'#9ba6bd',lineHeight:1.7}}>Your updates will become visible to everyone who views the project.</p><div style={{display:'flex',justifyContent:'end',gap:8,marginTop:20}}><button className="ad-secondary" onClick={()=>setOpen(false)}>Cancel</button><button className="ad-button" onClick={()=>setOpen(false)}>Publish</button></div></section></div>}</>;
}
