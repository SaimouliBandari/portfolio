/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FieldBackground } from './components/FieldBackground';
import { Cursor } from './components/Cursor';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Work } from './components/Work';
import { Next } from './components/Next';
import { Impact } from './components/Impact';
import { Capabilities } from './components/Capabilities';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    // No background colour here — body carries it, so the fixed canvas at -z-10 stays visible.
    <div className="relative min-h-screen text-chalk grain-overlay">
      <FieldBackground className="fixed inset-0 w-full h-full -z-10" />
      <Cursor />
      <Nav />

      <main>
        <Hero />
        <Marquee />
        <Work />
        <Next />
        <Impact />
        <Capabilities />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
