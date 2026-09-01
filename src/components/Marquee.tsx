/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { STACK } from '../data/content';

/** Continuously scrolling stack ticker. The list is duplicated for a seamless loop. */
export const Marquee: React.FC = () => {
  const items = [...STACK, ...STACK];

  return (
    <div className="relative border-y border-white/8 py-5 overflow-hidden marquee-mask">
      <div className="flex w-max animate-marquee gap-10">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.25em] text-muted whitespace-nowrap"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-accent/60" />
          </span>
        ))}
      </div>
    </div>
  );
};
