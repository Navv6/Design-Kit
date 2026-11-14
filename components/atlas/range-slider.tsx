'use client';
import {useId,useState} from 'react';
export function RangeSlider(){const id=useId();
 const [value,setValue]=useState(68);
 return <div style={{minWidth:255,color:'var(--text,light-dark(#1d1d1f,#ededf2))'}}><div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:15}}><label htmlFor={id}>Intensity</label><output>{value}%</output></div><input id={id} type="range" min="0" max="100" value={value} onChange={e=>setValue(Number(e.target.value))} style={{width:'100%',accentColor:'var(--accent,#8b92ff)'}}/></div>;
}
