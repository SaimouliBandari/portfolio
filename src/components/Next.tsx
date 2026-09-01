/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * What's in flight — a roadmap rail with status, animated progress and tags.
 */

import React from 'react';
import { motion } from 'motion/react';
import { NEXT, type NextProject } from '../data/content';
import { SectionHeader } from './SectionHeader';
import { ScrambleText } from './ScrambleText';

const STATUS_STYLES: Record<NextProject['status'], string> = {
  Shipped: 'text-accent2 border-accent2/40 bg-accent2/10',
  Building: 'text-accent border-accent/40 bg-accent/10',
  Planning: 'text-muted border-white/15 bg-white/5',
};

const BAR_STYLES: Record<NextProject['status'], string> = {
  Shipped: 'bg-accent2',
  Building: 'bg-accent',
  Planning: 'bg-white/35',
};

const Row: React.FC<{ item: NextProject; index: number }> = ({ item, index }) => (
  <motion.li
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    className="group relative pl-6 md:pl-10 py-7 border-b border-white/8"
  >
    {/* Rail node */}
    <span className="absolute left-0 top-9 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-ink border-2 border-white/25 group-hover:border-accent group-hover:scale-125 transition-all duration-300" />

    <div className="flex flex-wrap items-center gap-3 mb-3">
      <span
        className={`font-mono text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border ${STATUS_STYLES[item.status]}`}
      >
        {item.status}
      </span>
      <ScrambleText
        text={item.title}
        as="h3"
        onView
        duration={550}
        className="text-xl md:text-2xl font-medium tracking-tight group-hover:text-accent transition-colors duration-300"
      />
      <span className="ml-auto font-mono text-xs text-muted tabular-nums">{item.progress}%</span>
    </div>

    {/* Progress */}
    <div className="h-px w-full bg-white/10 mb-4 overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: item.progress / 100 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, delay: 0.2 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
        className={`h-full origin-left ${BAR_STYLES[item.status]}`}
      />
    </div>

    <p className="text-muted text-sm font-light leading-relaxed max-w-2xl mb-4">
      {item.summary}
    </p>

    <div className="flex flex-wrap gap-2">
      {item.tags.map((tag) => (
        <span
          key={tag}
          className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-white/[0.04] text-muted"
        >
          {tag}
        </span>
      ))}
    </div>
  </motion.li>
);

export const Next: React.FC = () => (
  <section id="next" className="relative px-6 md:px-10 py-24 md:py-36">
    <div className="max-w-6xl mx-auto">
      <SectionHeader
        index="02 / Building Next"
        title="What's in flight"
        blurb="Work in progress and what's queued behind it. Percentages are honest, not marketing."
      />

      <ul className="relative border-l border-white/10 ml-1.5">
        {NEXT.map((item, i) => (
          <Row key={item.title} item={item} index={i} />
        ))}
      </ul>
    </div>
  </section>
);
