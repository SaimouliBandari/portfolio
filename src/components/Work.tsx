/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Selected work: numbered cards, each with its own WebGL visual that reacts to
 * hover, and a detail panel that slides up over the canvas.
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github } from 'lucide-react';
import { PROJECTS, type Project } from '../data/content';
import { ShaderCanvas } from './ShaderCanvas';
import { SectionHeader } from './SectionHeader';
import { ScrambleText } from './ScrambleText';

const Card: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const number = String(index + 1).padStart(2, '0');
  const href = project.link ?? project.github;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.015] transition-colors duration-500 hover:border-accent/40"
    >
      {/* Visual */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <ShaderCanvas
          variant={project.variant}
          hovered={hovered}
          className="absolute inset-0 w-full h-full"
        />

        {/* Number + metric rail */}
        <div className="absolute inset-x-0 top-0 p-5 flex items-start justify-between">
          <span className="font-mono text-xs tracking-[0.25em] text-chalk/70">{number}</span>
          {project.metric && (
            <div className="text-right">
              <div className="font-mono text-lg md:text-xl text-chalk leading-none">
                {project.metric.value}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-chalk/50 mt-1">
                {project.metric.label}
              </div>
            </div>
          )}
        </div>

        {/* Detail slides up over the canvas on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <div className="bg-gradient-to-t from-ink via-ink/95 to-ink/70 p-5 md:p-6">
            <p className="text-sm text-chalk/75 font-light leading-relaxed">
              {project.detail}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 md:p-7">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl md:text-2xl font-medium tracking-tight">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open"
                className="inline-flex items-center gap-2 hover:text-accent transition-colors"
              >
                <ScrambleText text={project.title} onView duration={550} />
                <ArrowUpRight
                  size={18}
                  className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </a>
            ) : (
              <ScrambleText text={project.title} onView duration={550} />
            )}
          </h3>
          <span className="font-mono text-[11px] text-muted pt-1.5 shrink-0">{project.year}</span>
        </div>

        <p className="text-muted text-sm font-light leading-relaxed mb-5">{project.summary}</p>

        <div className="flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10 text-muted group-hover:border-accent/30 group-hover:text-chalk/70 transition-colors"
            >
              {tag}
            </span>
          ))}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Code"
              aria-label={`${project.title} on GitHub`}
              className="ml-auto text-muted hover:text-chalk transition-colors"
            >
              <Github size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export const Work: React.FC = () => (
  <section id="work" className="relative px-6 md:px-10 py-24 md:py-36">
    <div className="max-w-6xl mx-auto">
      <SectionHeader
        index="01 / Selected Work"
        title="Things I've shipped"
        blurb="Five systems that carried real production traffic, and the numbers they moved."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
        {PROJECTS.map((project, i) => (
          <Card key={project.title} project={project} index={i} />
        ))}
      </div>
    </div>
  </section>
);
