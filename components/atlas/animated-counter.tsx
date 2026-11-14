'use client';
import {useEffect,useState} from 'react';
export function AnimatedCounter(){
 const [value,setValue]=useState(0);const [run,setRun]=useState(0);
 useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){setValue(1248);return}let start:number;let id=0;function frame(t:number){if(!start)start=t;const p=Math.min((t-start)/1250,1);setValue(Math.round(1248*(1-(1-p)**3)));if(p<1)id=requestAnimationFrame(frame)}id=requestAnimationFrame(frame);return()=>cancelAnimationFrame(id)},[run]);
 return <div style={{textAlign:'center',color:'var(--text,light-dark(#1d1d1f,#ededf2))'}}><div style={{fontSize:56,fontWeight:850,letterSpacing:'-.07em'}}>{value.toLocaleString()}<span style={{color:'var(--accent,#8b92ff)'}}>+</span></div><small style={{color:'var(--sub,light-dark(#555b67,#bac3d4))',letterSpacing:'.1em'}}>PROJECT IMPRESSIONS</small><p><button className="ad-secondary" onClick={()=>setRun(n=>n+1)}>↻ Replay</button></p></div>;
}
