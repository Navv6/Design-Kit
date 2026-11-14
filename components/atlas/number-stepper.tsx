'use client';
import {useState} from 'react';
export function NumberStepper(){
 const [n,setN]=useState(3);
 return <div style={{display:'flex',alignItems:'center',gap:10}}><button aria-label="감소" disabled={n===0} onClick={()=>setN(v=>Math.max(0,v-1))} style={{width:44,height:44,border:'1px solid #505b77',background:'#293147',color:'white',borderRadius:12}}>−</button><output style={{width:55,textAlign:'center',fontSize:30,fontWeight:750,color:'var(--text,light-dark(#1d1d1f,#ededf2))'}}>{n}</output><button aria-label="증가" disabled={n===10} onClick={()=>setN(v=>Math.min(10,v+1))} style={{width:44,height:44,border:'1px solid #505b77',background:'#293147',color:'white',borderRadius:12}}>+</button></div>;
}
