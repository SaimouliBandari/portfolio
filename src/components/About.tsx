/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { TIMELINE } from '../data/content';
import { SectionHeader } from './SectionHeader';
import { ScrambleText } from './ScrambleText';

export const About: React.FC = () => (
  <section id="about" className="relative px-6 md:px-10 py-24 md:py-36">
    <div className="max-w-6xl mx-auto">
      <SectionHeader
        index="04 / About"
        title="How I got here"
        blurb="Four years, three companies, and a steady drift from writing features to owning the platform they run on."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 lg:col-start-4">
          <ol className="relative border-l border-white/10">
            {TIMELINE.map((entry, i) => (
              <motion.li
                key={`${entry.year}-${entry.title}`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative pl-8 md:pl-12 pb-12 last:pb-0"
              >
                <span className="absolute left-0 top-1.5 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-ink border-2 border-white/25 group-hover:border-accent group-hover:scale-125 transition-all duration-300" />

                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                  {entry.year}
                </span>

                <ScrambleText
                  text={entry.title}
                  as="h3"
                  onView
                  duration={550}
                  className="block text-xl md:text-2xl font-medium tracking-tight mt-2 mb-3"
                />

                <p className="text-muted font-light leading-relaxed max-w-xl">{entry.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </section>
);
