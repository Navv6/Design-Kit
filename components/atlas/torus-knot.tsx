'use client';
import { WebGLScene } from './webgl-scene';
import {Canvas,useFrame} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import {useRef} from 'react';
import type {Mesh} from 'three';
function Knot(){const ref=useRef<Mesh>(null);useFrame((_,delta)=>{if(ref.current){ref.current.rotation.x+=delta*.12;ref.current.rotation.y+=delta*.22}});return <mesh ref={ref}><torusKnotGeometry args={[1,.3,150,14,2,3]}/><meshPhysicalMaterial color="#9b8cff" metalness={.42} roughness={.18} clearcoat={1} clearcoatRoughness={.08}/></mesh>}
export function TorusKnot(){return <WebGLScene label="토러스 매듭"><div style={{width:'100%',height:'100%',minHeight:230,background:'radial-gradient(circle at 50% 50%,#1f234a,#080d1d)',borderRadius:12}}><Canvas dpr={[1,1.5]} camera={{position:[0,0,4.5],fov:45}}><ambientLight intensity={1.1}/><pointLight position={[3,3,4]} intensity={30}/><pointLight position={[-3,-2,-2]} color="#70bfff" intensity={20}/><Knot/><OrbitControls enableZoom={false}/></Canvas></div></WebGLScene>}
