/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { PROFILE } from '../data/content';
import { Magnetic } from './Magnetic';

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Next', href: '#next' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

function useClock(timeZone: string) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

const AvailableDot: React.FC<{ withLabel?: boolean }> = ({ withLabel = true }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border border-accent2/30 bg-accent2/10 ${
      withLabel ? 'px-3 py-1.5' : 'p-2'
    }`}
  >
    <span className="relative flex w-1.5 h-1.5">
      <span className="absolute inline-flex w-full h-full rounded-full bg-accent2 opacity-70 animate-ping" />
      <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-accent2" />
    </span>
    {withLabel && (
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent2">
        Available
      </span>
    )}
  </span>
);

export const Nav: React.FC = () => {
  const time = useClock(PROFILE.timezone);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open, and close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[65]"
      />

      <header
        // z-[60] keeps the bar (and its close button) above the z-[55] menu overlay.
        className={`fixed top-0 left-0 w-full z-[60] px-6 md:px-10 transition-all duration-500 ${
          scrolled && !open
            ? 'py-3 bg-ink/70 backdrop-blur-xl border-b border-white/8'
            : 'py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <a
            href="#top"
            data-cursor="Top"
            onClick={() => setOpen(false)}
            className="font-mono text-sm tracking-[0.28em] uppercase hover:text-accent transition-colors relative z-[60]"
          >
            {PROFILE.short}
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((link) => (
              <Magnetic key={link.href} strength={0.25}>
                <a
                  href={link.href}
                  className="px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted hover:text-chalk transition-colors"
                >
                  {link.label}
                </a>
              </Magnetic>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            {PROFILE.available && (
              <>
                <span className="hidden sm:inline-flex">
                  <AvailableDot />
                </span>
                <span className="sm:hidden inline-flex">
                  <AvailableDot withLabel={false} />
                </span>
              </>
            )}

            <span className="hidden md:inline font-mono text-[11px] tracking-[0.18em] text-muted tabular-nums">
              IST {time}
            </span>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="md:hidden relative z-[60] p-2 -mr-2 text-chalk"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] md:hidden bg-ink/95 backdrop-blur-xl flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-2">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.05, duration: 0.4 }}
                  className="py-3 text-4xl font-medium tracking-tight border-b border-white/8 flex items-baseline gap-4"
                >
                  <span className="font-mono text-[11px] text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 space-y-5"
            >
              {PROFILE.available && (
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent2">
                  ● {PROFILE.availableLabel}
                </p>
              )}
              <a
                href={`mailto:${PROFILE.email}`}
                className="block font-mono text-sm text-muted break-all"
              >
                {PROFILE.email}
              </a>
              <div className="flex flex-wrap gap-5 pt-2">
                {PROFILE.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
