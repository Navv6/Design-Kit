import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from 'react';
import type { ComposerBlock } from '@/data/composer';

export type BlockDropPosition = 'before' | 'after';
type Reorder = (sourceId: string, targetId: string, position: BlockDropPosition) => void;
type DragPreview = { source: number; destination: number; height: number; offset: number; slot: number };

/** Preview the order while dragging and commit a single change on release. */
export function useBlockDrag(blocks: ComposerBlock[], onReorder?: Reorder) {
  const container = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<DragPreview | null>(null);
  const stop = useRef<(() => void) | null>(null);
  const previousPositions = useRef<Map<HTMLElement, number> | null>(null);

  useEffect(() => () => stop.current?.(), []);

  useLayoutEffect(() => {
    const positions = previousPositions.current;
    previousPositions.current = null;
    if (!positions || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    for (const [element, before] of positions) {
      const delta = before - element.getBoundingClientRect().top;
      if (Math.abs(delta) > 1) {
        element.animate([{ translate: `0 ${delta}px` }, { translate: '0 0' }], {
          duration: 220,
          easing: 'cubic-bezier(.2,.75,.25,1)',
        });
      }
    }
  }, [blocks, preview]);

  function start(event: PointerEvent<HTMLSpanElement>, source: number) {
    if (!onReorder || !container.current || stop.current || !event.isPrimary || event.button !== 0 || event.pointerType === 'touch') return;
    event.preventDefault();
    const region = container.current;
    const handle = event.currentTarget;
    const rows = Array.from(region.querySelectorAll<HTMLElement>(':scope > .composer-block'));
    const height = rows[source].offsetHeight;
    const pointerId = event.pointerId;
    const startY = event.clientY;
    const startTop = region.getBoundingClientRect().top;
    const header = region.closest('.builder-shell')?.querySelector('.builder-header');
    let pointerX = event.clientX;
    let pointerY = startY;
    let destination = source;
    let started = false;
    let frame = 0;
    let previousTime: number | null = null;

    function findDestination(x: number, y: number) {
      const bounds = region.getBoundingClientRect();
      if (x < bounds.left || x > bounds.right || y < bounds.top || y > bounds.bottom) return source;
      return rows.filter((row, index) => index !== source && y >= bounds.top + row.offsetTop + row.offsetHeight / 2).length;
    }

    function update(time: number) {
      const elapsed = previousTime === null ? 16 : Math.min(time - previousTime, 32);
      previousTime = time;
      const bounds = region.getBoundingClientRect();
      const inside = pointerX >= bounds.left && pointerX <= bounds.right;
      if (inside) {
        const top = Math.max(0, header?.getBoundingClientRect().bottom ?? 0);
        const edge = 72;
        const up = Math.max(0, Math.min(1, (top + edge - pointerY) / edge));
        const down = Math.max(0, Math.min(1, (pointerY - window.innerHeight + edge) / edge));
        if (up || down) window.scrollBy({ top: (down - up) * elapsed * 1.05, behavior: 'instant' });
      }
      const top = region.getBoundingClientRect().top;
      destination = findDestination(pointerX, pointerY);
      const offset = pointerY - startY + startTop - top;
      const row = rows[destination];
      const slot = row.offsetTop + (destination > source ? row.offsetHeight - height : 0);
      const next = { source, destination, height, offset, slot };
      setPreview(current => current?.destination === next.destination && current.offset === offset && current.slot === slot
        ? current
        : next);
      frame = requestAnimationFrame(update);
    }

    function move(next: globalThis.PointerEvent) {
      if (next.pointerId !== pointerId) return;
      pointerX = next.clientX;
      pointerY = next.clientY;
      if (!started && Math.abs(pointerY - startY) >= 4) {
        started = true;
        frame = requestAnimationFrame(update);
      }
    }

    function end(commit = false) {
      cancelAnimationFrame(frame);
      stop.current = null;
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', release);
      handle.removeEventListener('pointercancel', cancel);
      handle.removeEventListener('lostpointercapture', cancel);
      window.removeEventListener('keydown', escape);
      window.removeEventListener('blur', cancel);
      if (handle.hasPointerCapture(pointerId)) handle.releasePointerCapture(pointerId);
      if (started) previousPositions.current = new Map(rows.map(row => [row, row.getBoundingClientRect().top]));
      setPreview(null);
      if (commit && started && destination !== source) {
        onReorder?.(blocks[source].instanceId, blocks[destination].instanceId, destination < source ? 'before' : 'after');
      }
    }

    function release(next: globalThis.PointerEvent) {
      if (next.pointerId !== pointerId) return;
      destination = findDestination(next.clientX, next.clientY);
      end(true);
    }
    function cancel() { end(); }
    function escape(key: KeyboardEvent) {
      if (key.key === 'Escape') end();
    }

    stop.current = cancel;
    handle.setPointerCapture(pointerId);
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', release);
    handle.addEventListener('pointercancel', cancel);
    handle.addEventListener('lostpointercapture', cancel);
    window.addEventListener('keydown', escape);
    window.addEventListener('blur', cancel);
  }

  function offsetFor(index: number) {
    if (!preview) return 0;
    const { source, destination, height, offset } = preview;
    if (index === source) return offset;
    if (index > source && index <= destination) return -height;
    if (index < source && index >= destination) return height;
    return 0;
  }

  return { container, preview, start, offsetFor };
}
