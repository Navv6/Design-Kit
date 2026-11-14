'use client';

import { useEffect, useState } from 'react';

/** Three.js requires WebGL 2. Wait for the browser before enabling a scene. */
export function useWebGLScene(): boolean | null {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let supported: boolean | undefined;
    function sync() {
      if (media.matches) {
        setAllowed(false);
        return;
      }
      if (supported === undefined) {
        try {
          supported = !!document.createElement('canvas').getContext('webgl2');
        } catch {
          supported = false;
        }
      }
      setAllowed(supported);
    }

    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return allowed;
}
