/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Fullscreen WebGL2 ambient field: drifting violet/teal energy through a
 * noise-warped grid, reacting to pointer position and scroll velocity.
 */

import React, { useEffect, useRef } from 'react';
import { createFullscreenProgram, NOISE_GLSL, prefersReducedMotion } from './glUtils';

const FRAGMENT_SRC = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 outColor;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;     // smoothed pointer, 0..1
uniform float u_scroll;   // normalised scroll offset
uniform float u_velocity; // smoothed scroll velocity, roughly -1..1

${NOISE_GLSL}

void main() {
  vec2 uv = v_uv;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  float t = u_time * 0.06;

  // Scroll shifts the field vertically; velocity shears it horizontally.
  p.y += u_scroll * 0.35;
  p.x += u_velocity * 0.06;

  vec2 mouse = vec2(u_mouse.x * aspect, u_mouse.y);

  // Noise-warped sampling coordinates
  vec2 warp = vec2(fbm(p * 1.3 + t), fbm(p * 1.3 - t + 7.1));
  vec2 wp = p + (warp - 0.5) * 0.40;

  // Two drifting energy lobes
  vec2 c1 = vec2(0.26 * aspect + 0.16 * sin(t * 1.1), 0.72 + 0.10 * cos(t * 0.9));
  vec2 c2 = vec2(0.78 * aspect + 0.14 * cos(t * 0.8), 0.24 + 0.12 * sin(t * 1.25));

  float d1 = 1.0 - smoothstep(0.0, 0.62, length(wp - c1));
  float d2 = 1.0 - smoothstep(0.0, 0.70, length(wp - c2));

  vec3 violet = vec3(0.478, 0.361, 1.0);
  vec3 teal   = vec3(0.161, 0.890, 0.757);

  vec3 col = vec3(0.031, 0.031, 0.039); // near-black base
  col += violet * pow(d1, 1.9) * 0.60;
  col += teal   * pow(d2, 2.3) * 0.34;

  // Faint technical grid, warped by the same field
  vec2 gridUv = (wp + vec2(0.0, t * 0.4)) * 22.0;
  vec2 gridLine = abs(fract(gridUv) - 0.5);
  float grid = smoothstep(0.48, 0.5, max(gridLine.x, gridLine.y));
  float gridFade = smoothstep(1.1, 0.15, length(uv - 0.5) * 1.6);
  col += vec3(0.34, 0.32, 0.46) * grid * 0.10 * gridFade;

  // Pointer halo
  float halo = 1.0 - smoothstep(0.0, 0.45, length(p - mouse));
  col += violet * pow(halo, 3.0) * 0.26;
  col += teal * pow(halo, 6.0) * 0.14;

  // Horizontal energy sweep, tied to scroll velocity
  float sweep = exp(-pow((uv.y - fract(t * 0.5)) * 7.0, 2.0));
  col += violet * sweep * 0.05 * (0.4 + abs(u_velocity));

  // Vignette
  float vig = smoothstep(1.25, 0.25, length(uv - 0.5) * 1.45);
  col *= mix(0.62, 1.0, vig);

  col += dither(gl_FragCoord.xy);

  outColor = vec4(col, 1.0);
}
`;

export const FieldBackground: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false });
    if (!gl) return;

    let program: WebGLProgram;
    try {
      program = createFullscreenProgram(gl, FRAGMENT_SRC);
    } catch (err) {
      console.warn('FieldBackground disabled:', err);
      return;
    }

    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uScroll = gl.getUniformLocation(program, 'u_scroll');
    const uVelocity = gl.getUniformLocation(program, 'u_velocity');

    const reduced = prefersReducedMotion();

    const mouse = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };
    const onPointerMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    let scroll = 0;
    let velocity = 0;
    let lastScrollY = window.scrollY;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let raf = 0;
    let running = true;
    const onVisibility = () => {
      const nowVisible = document.visibilityState === 'visible';
      if (nowVisible && !running) {
        running = true;
        raf = requestAnimationFrame(render);
      } else if (!nowVisible) {
        running = false;
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    const start = performance.now();
    function render(now: number) {
      if (!running) return;
      const t = (now - start) / 1000;

      mouse.x += (target.x - mouse.x) * 0.045;
      mouse.y += (target.y - mouse.y) * 0.045;

      const y = window.scrollY;
      const delta = y - lastScrollY;
      lastScrollY = y;
      // Fast attack, slow release, clamped
      const targetVel = Math.max(-1, Math.min(1, delta / 60));
      velocity += (targetVel - velocity) * (Math.abs(targetVel) > Math.abs(velocity) ? 0.3 : 0.06);
      const docHeight = Math.max(1, document.body.scrollHeight - window.innerHeight);
      scroll = y / docHeight;

      gl!.useProgram(program);
      gl!.uniform2f(uResolution, canvas.width, canvas.height);
      gl!.uniform1f(uTime, reduced ? t * 0.2 : t);
      gl!.uniform2f(uMouse, mouse.x, mouse.y);
      gl!.uniform1f(uScroll, scroll);
      gl!.uniform1f(uVelocity, reduced ? 0 : velocity);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      raf = requestAnimationFrame(render);
    }
    raf = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};
