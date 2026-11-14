'use client';
import { WebGLScene } from './webgl-scene';
import {Canvas,useFrame} from '@react-three/fiber';
import {useMemo,useRef} from 'react';
import type {ShaderMaterial} from 'three';
const vertex=`uniform float uTime;varying float vHeight;void main(){vec3 p=position;p.z=.22*sin(p.x*4.5+uTime)*cos(p.y*3.7+uTime*.7);vHeight=p.z;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`;
const fragment=`varying float vHeight;void main(){vec3 a=vec3(.14,.26,.57);vec3 b=vec3(.56,.77,1.0);gl_FragColor=vec4(mix(a,b,smoothstep(-.22,.22,vHeight)),1.0);}`;
function Grid(){const mat=useRef<ShaderMaterial>(null);const u=useMemo(()=>({uTime:{value:0}}),[]);useFrame((_,dt)=>{if(mat.current)mat.current.uniforms.uTime.value+=dt});return <mesh rotation={[-.6,0,0]}><planeGeometry args={[5,3.2,70,45]}/><shaderMaterial ref={mat} uniforms={u} vertexShader={vertex} fragmentShader={fragment} wireframe/></mesh>}
export function WaveGridShader(){return <WebGLScene label="웨이브 그리드"><div style={{width:'100%',height:'100%',minHeight:230,background:'#090f20',borderRadius:12}}><Canvas dpr={[1,1.5]} camera={{position:[0,0,5.3]}}><Grid/></Canvas></div></WebGLScene>}
