/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Mail } from 'lucide-react';
import { PROFILE } from '../data/content';
import { ScrambleText } from './ScrambleText';
import { Magnetic } from './Magnetic';

export const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.25], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-10 pt-32 pb-16"
    >
      <motion.div style={{ y, opacity }} className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            {PROFILE.role}
          </span>
          <span className="w-1 h-1 rounded-full bg-accent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            {PROFILE.location}
          </span>
        </motion.div>

        <h1 className="font-medium tracking-tight leading-[0.94] text-[13vw] sm:text-[10vw] md:text-[7.6vw] lg:text-[6.6vw]">
          <ScrambleText text="Backend built" as="span" className="block" duration={800} />
          <ScrambleText text="for the load" as="span" className="block" duration={800} delay={130} />
          <ScrambleText
            text="you haven't hit yet."
            as="span"
            className="block text-stroke"
            duration={1000}
            delay={260}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-10 max-w-xl text-base md:text-lg text-muted font-light leading-relaxed"
        >
          {PROFILE.blurb}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <Magnetic strength={0.3}>
            <a
              href="#work"
              data-cursor="Scroll"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-chalk text-ink font-medium text-sm hover:bg-accent hover:text-white transition-colors duration-300"
            >
              See the work
              <ArrowDown size={16} />
            </a>
          </Magnetic>

          <Magnetic strength={0.3}>
            <a
              href={`mailto:${PROFILE.email}`}
              data-cursor="Email"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full border border-white/15 text-sm font-medium hover:border-accent/60 hover:bg-accent/10 transition-colors duration-300"
            >
              <Mail size={16} />
              Get in touch
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
      >
        Scroll
      </motion.div>
    </section>
  );
};
