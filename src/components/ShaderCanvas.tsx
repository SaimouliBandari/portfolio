/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * A small WebGL2 canvas that renders one of five procedural visuals, used as
 * the "thumbnail" for each project. Hovering warps the field, brightens it and
 * splits the colour channels. Rendering pauses whenever the card is off-screen.
 */

import React, { useEffect, useRef } from 'react';
import { createFullscreenProgram, NOISE_GLSL, prefersReducedMotion } from './glUtils';

const FRAGMENT_SRC = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 outColor;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_hover;   // 0..1 smoothed
uniform int u_variant;

${NOISE_GLSL}

// --- 0: flowing data streams -------------------------------------------------
float streams(vec2 p, float t) {
  float v = 0.0;
  for (int i = 0; i < 7; i++) {
    float fi = float(i);
    float base = 0.12 + fi * 0.125;
    float wave = sin(p.x * 3.4 + t * 1.4 + fi * 0.9) * 0.028
               + fbm(vec2(p.x * 2.2 - t * 0.7, fi * 3.1)) * 0.055;
    float line = exp(-pow((p.y - (base + wave)) * 52.0, 2.0));
    float pulse = exp(-pow(fract(p.x - t * 0.30 + fi * 0.17) - 0.5, 2.0) * 26.0);
    v += line * (0.30 + pulse * 1.9);
  }
  return v;
}

// --- 1: query grid -----------------------------------------------------------
float queryGrid(vec2 p, float t) {
  vec2 scale = vec2(11.0, 7.0);
  vec2 g = p * scale;
  vec2 id = floor(g);
  vec2 f = fract(g);

  float edge = min(min(f.x, f.y), min(1.0 - f.x, 1.0 - f.y));
  float lines = 1.0 - smoothstep(0.0, 0.045, edge);

  float h = fract(sin(dot(id, vec2(41.3, 289.1))) * 43758.5453);
  float lit = smoothstep(0.55, 1.0, sin(t * 1.1 + h * 6.2831) * 0.5 + 0.5);
  float cell = lit * smoothstep(0.0, 0.16, edge);

  // scan column sweeping across the table
  float scan = exp(-pow((p.x - fract(t * 0.22)) * 9.0, 2.0));

  return lines * 0.35 + cell * 0.85 + scan * 0.30;
}

// --- 2: sensor particles -----------------------------------------------------
float particles(vec2 p, float t) {
  vec2 scale = vec2(26.0, 16.0);
  vec2 g = p * scale;
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;

  float h = fract(sin(dot(id, vec2(27.1, 91.7))) * 43758.5453);
  float wave = sin(p.x * 6.5 - t * 2.1 + h * 3.4 + p.y * 3.0) * 0.5 + 0.5;
  float d = length(f);
  float dot0 = smoothstep(0.36, 0.04, d);
  return dot0 * (0.12 + pow(wave, 2.0) * 1.15);
}

// --- 3: policy mesh ----------------------------------------------------------
float mesh(vec2 p, float t) {
  vec2 g = p * 5.5;
  vec2 id = floor(g);
  vec2 f = fract(g);

  float d1 = 8.0;
  float d2 = 8.0;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 nb = vec2(float(x), float(y));
      vec2 rnd = hash2(id + nb) * 0.5 + 0.5;
      vec2 pt = nb + 0.5 + 0.42 * sin(t * 0.7 + 6.2831 * rnd);
      float d = length(pt - f);
      if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
    }
  }

  float nodes = smoothstep(0.24, 0.0, d1) * 1.25;
  float edges = smoothstep(0.045, 0.0, d2 - d1) * 0.55;
  return nodes + edges;
}

// --- 4: platform rings -------------------------------------------------------
float rings(vec2 p, float t) {
  vec2 c1 = vec2(0.34 + 0.05 * sin(t * 0.7), 0.46 + 0.04 * cos(t * 0.6));
  vec2 c2 = vec2(0.70 + 0.04 * cos(t * 0.5), 0.56 + 0.05 * sin(t * 0.8));
  float r1 = length(p - c1);
  float r2 = length(p - c2);
  float w = sin(r1 * 46.0 - t * 2.6) * sin(r2 * 38.0 + t * 2.0);
  float falloff = smoothstep(1.0, 0.05, r1) * smoothstep(1.1, 0.05, r2);
  return pow(abs(w), 2.0) * falloff * 1.5;
}

float pattern(vec2 p, float t) {
  if (u_variant == 0) return streams(p, t);
  if (u_variant == 1) return queryGrid(p, t);
  if (u_variant == 2) return particles(p, t);
  if (u_variant == 3) return mesh(p, t);
  return rings(p, t);
}

void main() {
  vec2 uv = v_uv;
  float aspect = max(u_resolution.x / max(u_resolution.y, 1.0), 0.001);
  vec2 p = vec2(uv.x * aspect, uv.y);

  float t = u_time * (1.0 + u_hover * 0.55);

  // Hover pulls the field very slightly toward the centre
  vec2 centre = vec2(0.5 * aspect, 0.5);
  p = mix(p, centre + (p - centre) * 0.93, u_hover);

  // Chromatic split grows with hover
  float split = u_hover * 0.010;
  float r = pattern(p + vec2(split, 0.0), t);
  float g = pattern(p, t);
  float b = pattern(p - vec2(split, 0.0), t);
  vec3 intensity = vec3(r, g, b);

  vec3 violet = vec3(0.478, 0.361, 1.0);
  vec3 teal = vec3(0.161, 0.890, 0.757);
  vec3 tint = mix(violet, teal, clamp(uv.x * 0.85 + uv.y * 0.25, 0.0, 1.0));

  vec3 col = vec3(0.043, 0.043, 0.055);            // card base
  col += tint * intensity * (0.55 + u_hover * 0.75);
  col += vec3(1.0) * pow(max(g - 0.85, 0.0), 2.0) * 0.5; // hot highlights

  // Vignette so the card edges stay dark
  float vig = smoothstep(1.15, 0.30, length(uv - 0.5) * 1.5);
  col *= mix(0.45, 1.0, vig);

  col += dither(gl_FragCoord.xy);

  outColor = vec4(col, 1.0);
}
`;

interface ShaderCanvasProps {
  variant: number;
  hovered: boolean;
  className?: string;
}

export const ShaderCanvas: React.FC<ShaderCanvasProps> = ({
  variant,
  hovered,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hoverRef = useRef(0);
  const targetHover = useRef(0);

  useEffect(() => {
    targetHover.current = hovered ? 1 : 0;
  }, [hovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false });
    if (!gl) return;

    let program: WebGLProgram;
    try {
      program = createFullscreenProgram(gl, FRAGMENT_SRC);
    } catch (err) {
      console.warn('ShaderCanvas disabled:', err);
      return;
    }

    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uHover = gl.getUniformLocation(program, 'u_hover');
    const uVariant = gl.getUniformLocation(program, 'u_variant');

    const reduced = prefersReducedMotion();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Only render while the card is actually on screen.
    let onScreen = true;
    let raf = 0;
    let running = false;

    const startLoop = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(render);
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        if (onScreen && document.visibilityState === 'visible') startLoop();
        else stopLoop();
      },
      { rootMargin: '120px' },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && onScreen) startLoop();
      else stopLoop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const start = performance.now();
    function render(now: number) {
      if (!running) return;
      const t = (now - start) / 1000;

      hoverRef.current += (targetHover.current - hoverRef.current) * 0.09;

      gl!.useProgram(program);
      gl!.uniform2f(uResolution, canvas.width, canvas.height);
      gl!.uniform1f(uTime, reduced ? t * 0.25 : t);
      gl!.uniform1f(uHover, hoverRef.current);
      gl!.uniform1i(uVariant, variant);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      raf = requestAnimationFrame(render);
    }
    startLoop();

    return () => {
      stopLoop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [variant]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};
