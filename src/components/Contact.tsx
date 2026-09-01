/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Check, Copy, ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/content';
import { ScrambleText } from './ScrambleText';
import { Magnetic } from './Magnetic';
import { Reveal } from './Reveal';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context or denied) — the mailto link still works.
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <section id="contact" className="relative px-6 md:px-10 py-28 md:py-44">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              05 / Contact
            </span>
            <span className="h-px flex-1 max-w-24 bg-white/15" />
          </div>
        </Reveal>

        <a
          href={`mailto:${PROFILE.email}`}
          data-cursor="Email"
          className="group block font-medium tracking-tight leading-[0.95] text-[12vw] md:text-[7vw]"
        >
          <ScrambleText text="Let's talk" as="span" onView className="block" duration={800} />
          <span className="flex items-center gap-5 text-stroke group-hover:text-chalk transition-colors duration-500">
            <ScrambleText text="shop." as="span" onView duration={900} delay={120} />
            <ArrowUpRight
              className="w-[0.5em] h-[0.5em] text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-500"
              strokeWidth={1.5}
            />
          </span>
        </a>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-lg text-muted font-light leading-relaxed">
            {PROFILE.available
              ? `${PROFILE.availableLabel}. If you're building something that has to stay up under load, I'd like to hear about it.`
              : 'Always happy to talk distributed systems, observability and database performance.'}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.25}>
              <button
                onClick={copyEmail}
                data-cursor={copied ? 'Copied' : 'Copy'}
                className="inline-flex items-center gap-3 px-6 py-4 rounded-full border border-white/15 font-mono text-sm hover:border-accent/60 hover:bg-accent/10 transition-colors duration-300"
              >
                {copied ? (
                  <Check size={15} className="text-accent2" />
                ) : (
                  <Copy size={15} className="text-muted" />
                )}
                {copied ? 'Copied to clipboard' : PROFILE.email}
              </button>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-wrap gap-8">
            {PROFILE.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Visit"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted hover:text-chalk transition-colors"
              >
                {social.label}
                <ArrowUpRight
                  size={13}
                  className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
