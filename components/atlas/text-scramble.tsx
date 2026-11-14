'use client';
import {useEffect,useRef,useState} from 'react';
export function TextScramble(){
 const target='DESIGN THE FUTURE';const chars='X01#@*∆◇▒';const [text,setText]=useState(target);const ref=useRef<ReturnType<typeof setInterval>|null>(null);
 useEffect(()=>()=>{if(ref.current)clearInterval(ref.current)},[]);
 function replay(){if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;if(ref.current)clearInterval(ref.current);let count=0;ref.current=setInterval(()=>{count++;setText([...target].map((char,i)=>char===' '?' ':i<count/2?char:chars[Math.floor(Math.random()*chars.length)]).join(''));if(count>target.length*2){if(ref.current)clearInterval(ref.current);setText(target)}},45)}
 return <button type="button" onClick={replay} style={{border:0,background:'none',color:'var(--text,light-dark(#1d1d1f,#ededf2))',fontFamily:'monospace',fontSize:'clamp(17px,3vw,28px)',fontWeight:800,letterSpacing:'.06em'}} aria-label="애니메이션 재생: DESIGN THE FUTURE">{text}<span style={{display:'block',fontSize:10,marginTop:14,color:'var(--accent,#8b92ff)'}}>CLICK TO SCRAMBLE ↗</span></button>;
}
