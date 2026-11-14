'use client';
import {useRef} from 'react';
export function TiltCard(){
 const ref=useRef<HTMLDivElement>(null);
 return <div ref={ref} onPointerMove={e=>{if(!ref.current||e.pointerType==='touch'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const b=ref.current.getBoundingClientRect();const rx=(e.clientY-b.top-b.height/2)/b.height*-12;const ry=(e.clientX-b.left-b.width/2)/b.width*12;ref.current.style.transform=`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`}} onPointerLeave={()=>{if(ref.current)ref.current.style.transform='perspective(800px) rotateX(0deg) rotateY(0deg)'}} style={{width:260,height:155,display:'grid',placeItems:'center',background:'linear-gradient(135deg,#5c45a4,#242d55)',border:'1px solid #938de6',borderRadius:20,boxShadow:'0 25px 60px #24275b66',color:'white',transition:'transform .16s ease-out',transformStyle:'preserve-3d'}}><div style={{textAlign:'center',transform:'translateZ(30px)'}}><div style={{fontSize:26}}>✦</div><strong style={{fontSize:23}}>Tilt to explore</strong><p style={{fontSize:11,opacity:.7}}>Move your cursor</p></div></div>;
}
