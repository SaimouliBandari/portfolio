/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { CAPABILITIES } from '../data/content';
import { SectionHeader } from './SectionHeader';

export const Capabilities: React.FC = () => (
  <section id="capabilities" className="relative px-6 md:px-10 py-24 md:py-36">
    <div className="max-w-6xl mx-auto">
      <SectionHeader
        index="03 / What I Do"
        title="Where I'm useful"
        blurb="The problems I reach for first, and the ones teams tend to hand me."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8 border border-white/8 rounded-2xl overflow-hidden">
        {CAPABILITIES.map((cap, i) => (
          <motion.div
            key={cap.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group relative bg-ink p-7 md:p-8 min-h-[13rem] flex flex-col hover:bg-panel transition-colors duration-500"
          >
            <span className="font-mono text-[10px] tracking-[0.25em] text-accent mb-6">
              {String(i + 1).padStart(2, '0')}
            </span>

            <h3 className="text-lg font-medium tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">
              {cap.title}
            </h3>

            <p className="text-sm text-muted font-light leading-relaxed">{cap.body}</p>

            {/* Accent underline grows on hover */}
            <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 bg-accent transition-transform duration-500 ease-out" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
