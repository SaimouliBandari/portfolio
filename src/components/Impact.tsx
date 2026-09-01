/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { IMPACT } from '../data/content';
import { CountUp } from './CountUp';
import { Reveal } from './Reveal';

export const Impact: React.FC = () => (
  <section className="relative px-6 md:px-10 py-20 md:py-28">
    <div className="max-w-6xl mx-auto">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted mb-12">
          Numbers that moved
        </p>
      </Reveal>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {IMPACT.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div className="border-t border-white/10 pt-6">
              <div className="text-4xl md:text-5xl font-medium tracking-tight tabular-nums mb-3">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                />
              </div>
              <p className="text-sm text-muted font-light leading-snug max-w-[16ch]">
                {stat.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
