'use client';
import { WebGLScene } from './webgl-scene';
import {Canvas,useFrame} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import {useRef} from 'react';
import type {Group} from 'three';
function Globe(){const r=useRef<Group>(null);useFrame((_,dt)=>{if(r.current)r.current.rotation.y+=dt*.08});return <group ref={r}><mesh><sphereGeometry args={[1.38,28,20]}/><meshBasicMaterial color="#81d4ff" wireframe transparent opacity={.3}/></mesh><mesh rotation={[.5,0,.3]}><torusGeometry args={[1.6,.009,6,130]}/><meshBasicMaterial color="#ba9bff"/></mesh><mesh rotation={[1.1,.8,0]}><torusGeometry args={[1.52,.008,6,130]}/><meshBasicMaterial color="#6fdcfa"/></mesh></group>}
export function WireGlobe(){return <WebGLScene label="와이어 지구본"><div style={{width:'100%',height:'100%',minHeight:230,background:'radial-gradient(circle,#122c4b,#08101f)',borderRadius:12}}><Canvas dpr={[1,1.5]} camera={{position:[0,0,4.5]}}><Globe/><OrbitControls enablePan={false} enableZoom={false}/></Canvas></div></WebGLScene>}
