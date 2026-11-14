"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWebGLScene } from "./use-webgl-scene";

/** 3D-001: lazily import this component in Next.js with ssr:false. */
function ParticleCloud() {
  const ref = useRef<THREE.Group>(null);
  const positions = useMemo(() => {
    const count = 560;
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 0.25 + Math.sqrt((i + 0.5) / count) * 2.1;
      const theta = i * 2.399963229728653;
      const ripple = Math.sin(theta * 2.3 + radius * 4) * 0.33;
      data[i * 3] = Math.cos(theta) * radius;
      data[i * 3 + 1] = Math.sin(theta) * radius * 0.72;
      data[i * 3 + 2] = ripple + Math.cos(i * 0.23) * 0.35;
    }
    return data;
  }, []);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.065;
      ref.current.rotation.z += delta * 0.03;
    }
  });
  return (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#8a9cff" size={0.047} sizeAttenuation transparent opacity={0.9} depthWrite={false} />
      </points>
      <mesh>
        <icosahedronGeometry args={[0.57, 2]} />
        <meshBasicMaterial color="#243b83" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function ParticleField() {
  const allowed = useWebGLScene();
  return (
    <div className="atlas-3d-stage" aria-label="추상적인 3차원 파티클 장면">
      {!allowed ? (
        <div className="atlas-3d-static" role="img" aria-label="WebGL 미지원 또는 모션 감소 설정으로 제공하는 정적 파티클 배경" />
      ) : (
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.7], fov: 48 }}
          gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}>
          <ambientLight intensity={0.6} />
          <ParticleCloud />
        </Canvas>
      )}
      <span className="atlas-3d-caption">THREE.JS / REACT THREE FIBER</span>
    </div>
  );
}
