'use client';
import {useId,useState} from 'react';
export function RadioGroup(){const id=useId();
 const [selected,setSelected]=useState('Pro');
 return <fieldset style={{border:0,display:'flex',gap:12,margin:0,padding:0,flexWrap:'wrap'}}>
  <legend style={{fontSize:12,color:'var(--sub,light-dark(#555b67,#bac3d4))',marginBottom:12}}>Choose your plan</legend>
  {['Basic','Pro','Team'].map(option=><label key={option} style={{display:'flex',alignItems:'center',gap:9,padding:'13px 17px',border:`1px solid ${selected===option?'var(--accent,#8b92ff)':'var(--border,#444)'}`,borderRadius:12,cursor:'pointer',background:selected===option?'#8895ff1c':'transparent',color:'var(--text,light-dark(#1d1d1f,#ededf2))'}}><input type="radio" name={id} value={option} checked={selected===option} onChange={()=>setSelected(option)} style={{accentColor:'var(--accent,#8b92ff)'}}/>{option}</label>)}
 </fieldset>;
}
