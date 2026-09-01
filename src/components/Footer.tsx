/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PROFILE } from '../data/content';

export const Footer: React.FC = () => (
  <footer className="relative px-6 md:px-10 py-10 border-t border-white/8">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
        © {new Date().getFullYear()} {PROFILE.name}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted/70">
        Built with React, Tailwind & WebGL
      </p>
    </div>
  </footer>
);
