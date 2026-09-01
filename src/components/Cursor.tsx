/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Custom cursor: a small dot that tracks the pointer directly and a ring that
 * trails behind it. Any element carrying `data-cursor="label"` swells the ring
 * and prints that label inside it. Disabled on touch/coarse pointers.
 */

import React, { useEffect, useRef, useState } from 'react';

export const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState('');
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add('custom-cursor');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let lastLabel = '';

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;

      const el = (e.target as HTMLElement)?.closest?.('[data-cursor]') as HTMLElement | null;
      const next = el?.dataset.cursor ?? '';
      if (next !== lastLabel) {
        lastLabel = next;
        setActive(!!el);
        setLabel(next);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    let raf = 0;
    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.body.classList.remove('custom-cursor');
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] hidden md:block" aria-hidden="true">
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent2 transition-opacity duration-200"
        style={{ opacity: active ? 0 : 1 }}
      />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-white/40 transition-[width,height,background-color,border-color] duration-300 ease-out"
        style={{
          width: active ? 78 : 30,
          height: active ? 78 : 30,
          backgroundColor: active ? 'rgba(122,92,255,0.22)' : 'transparent',
          borderColor: active ? 'rgba(122,92,255,0.75)' : 'rgba(255,255,255,0.35)',
        }}
      >
        <span
          className="font-mono text-[9px] uppercase tracking-[0.18em] text-chalk transition-opacity duration-200"
          style={{ opacity: active && label ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};
