'use client';
import {useEffect,useRef,useState} from 'react';
export function ScrollReveal(){
 const ref=useRef<HTMLDivElement>(null);const [visible,setVisible]=useState(false);
 useEffect(()=>{
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(preference.matches || !('IntersectionObserver' in window)){setVisible(true);return;}
  const observer=new IntersectionObserver(entries=>{if(entries[0]?.isIntersecting){setVisible(true);observer.disconnect();}},{threshold:.15});
  const reveal=()=>{if(preference.matches){setVisible(true);observer.disconnect();}};
  if(ref.current)observer.observe(ref.current);
  preference.addEventListener('change',reveal);
  return()=>{observer.disconnect();preference.removeEventListener('change',reveal);};
 },[]);
 return <div ref={ref} className="atlas-scroll-reveal" style={{padding:28,background:'linear-gradient(140deg,#383b70,#242f44)',color:'#fff',borderRadius:16,opacity:visible?1:0,transform:visible?'translateY(0)':'translateY(28px)',transition:'opacity .7s,transform .7s'}}>
  <small>SCROLL ANIMATION</small><h2 style={{margin:'7px 0 0'}}>Reveal on entry.</h2>
  <style>{'@media (prefers-reduced-motion: reduce) {.atlas-scroll-reveal {opacity:1!important;transform:none!important;transition:none!important}}'}</style>
 </div>;
}
