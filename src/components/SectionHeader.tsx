/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Reveal } from './Reveal';
import { ScrambleText } from './ScrambleText';

interface SectionHeaderProps {
  index: string;
  title: string;
  blurb?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ index, title, blurb }) => (
  <div className="mb-14 md:mb-20">
    <Reveal>
      <div className="flex items-center gap-4 mb-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
          {index}
        </span>
        <span className="h-px flex-1 max-w-24 bg-white/15" />
      </div>
    </Reveal>

    <ScrambleText
      text={title}
      as="h2"
      onView
      duration={700}
      className="block text-4xl md:text-6xl font-medium tracking-tight leading-[1.02]"
    />

    {blurb && (
      <Reveal delay={0.1}>
        <p className="mt-5 max-w-xl text-muted font-light leading-relaxed">{blurb}</p>
      </Reveal>
    )}
  </div>
);
