'use client';
import { WebGLScene } from './webgl-scene';
import {Canvas,useFrame} from '@react-three/fiber';
import {useMemo,useRef} from 'react';
import type {ShaderMaterial} from 'three';
const vertex=`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const fragment=`uniform float uTime;varying vec2 vUv;void main(){vec2 p=vUv;float v=sin(p.x*7.0+uTime*.6)*cos(p.y*5.0-uTime*.5);float w=sin((p.x+p.y)*5.0-uTime*.35);vec3 a=vec3(.16,.22,.57);vec3 b=vec3(.62,.30,.84);vec3 c=vec3(.20,.73,.82);vec3 col=mix(a,b,smoothstep(-1.0,1.0,v));col=mix(col,c,smoothstep(.0,1.0,w)*.45);gl_FragColor=vec4(col,1.0);}`;
function Plane(){const mat=useRef<ShaderMaterial>(null);const uniforms=useMemo(()=>({uTime:{value:0}}),[]);useFrame((_,dt)=>{if(mat.current)mat.current.uniforms.uTime.value+=dt});return <mesh><planeGeometry args={[8,6]}/><shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms}/></mesh>}
export function LiquidShader(){return <WebGLScene label="리퀴드 셰이더"><div style={{width:'100%',height:'100%',minHeight:230,borderRadius:12,overflow:'hidden'}}><Canvas dpr={[1,1.5]} camera={{position:[0,0,5]}}><Plane/></Canvas></div></WebGLScene>}
