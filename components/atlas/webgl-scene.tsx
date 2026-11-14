'use client';

import type { ReactNode } from 'react';
import { useWebGLScene } from './use-webgl-scene';

/** Keep a reusable scene readable when WebGL 2 or motion is unavailable. */
export function WebGLScene({ label, children }: { label: string; children: ReactNode }) {
  const allowed = useWebGLScene();

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 250,
      display: 'grid',
      gridTemplateRows: 'minmax(0, 1fr)',
    }}>
      {allowed ? children : (
        <div role="img" aria-label={`${label} 정적 미리보기`} className="atlas-3d-static" style={{
          display: 'grid',
          placeItems: 'center',
          borderRadius: 12,
          background: 'radial-gradient(circle, #304f97, #101a31 68%)',
          color: '#edf2ff',
        }}>
          {label} · 정적 미리보기
        </div>
      )}
    </div>
  );
}
