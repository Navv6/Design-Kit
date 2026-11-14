"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "motion/react";

/** MOT-001: only translates on pointer input. Respects reduced motion. */
export function MagneticButton({ children = "Explore project" }: { children?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 18 });
  const sy = useSpring(y, { stiffness: 240, damping: 18 });
  const reduce = useReducedMotion();

  return (
    <motion.button
      ref={ref}
      type="button"
      className="atlas-magnetic-btn"
      style={reduce ? undefined : { x: sx, y: sy }}
      onPointerMove={(event) => {
        if (reduce || event.pointerType === "touch") return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((event.clientX - (rect.left + rect.width / 2)) * 0.13);
        y.set((event.clientY - (rect.top + rect.height / 2)) * 0.2);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      onBlur={() => { x.set(0); y.set(0); }}
    >
      {children} <span aria-hidden="true">↗</span>
    </motion.button>
  );
}
