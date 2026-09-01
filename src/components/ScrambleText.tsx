/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Cycles each character through random glyphs before settling into the real
 * copy — a CLI decoding a message.
 *
 * The animation writes straight to the DOM node rather than through React
 * state: one node update per frame instead of a re-render per frame, and the
 * final text is always committed even if the effect is torn down mid-run.
 * The real text is rendered as children too, so it survives with JS disabled.
 */

import React, { useLayoutEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}*#$%&';

interface ScrambleTextProps {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  duration?: number;
  /** Wait until the element scrolls into view instead of firing on mount. */
  onView?: boolean;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  as = 'span',
  className = '',
  delay = 0,
  duration = 900,
  onView = false,
}) => {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = text;
      return;
    }

    const settle = () => {
      el.textContent = text;
      delete el.dataset.scrambling;
    };

    // Note: a whitespace-only placeholder collapses a block element to zero
    // height, and a zero-area target never satisfies an IntersectionObserver
    // threshold. So for the on-view case the real text stays in the DOM until
    // the animation actually starts — the first frame overwrites it with
    // glyphs anyway, so nothing flashes.
    if (!onView) el.textContent = text.replace(/\S/g, ' ');

    let raf = 0;
    let timeout = 0;
    let startedAt: number | null = null;
    let done = false;

    const step = (now: number) => {
      if (startedAt === null) {
        startedAt = now;
        el.dataset.scrambling = 'true';
      }
      const progress = Math.min((now - startedAt) / duration, 1);
      const revealed = Math.floor(progress * text.length);

      let out = '';
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === ' ') out += ' ';
        else if (i < revealed) out += char;
        else out += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      el.textContent = out;

      if (progress >= 1) {
        settle();
        done = true;
        return;
      }
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      timeout = window.setTimeout(() => {
        raf = requestAnimationFrame(step);
      }, delay);
    };

    let observer: IntersectionObserver | null = null;
    if (onView) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            observer?.disconnect();
            observer = null;
            start();
          }
        },
        { threshold: 0, rootMargin: '0px 0px -10% 0px' },
      );
      observer.observe(el);
    } else {
      start();
    }

    return () => {
      observer?.disconnect();
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
      // Never leave the reader staring at half-decoded glyphs.
      if (!done) settle();
    };
  }, [text, delay, duration, onView]);

  const Tag = as as any;
  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
};
