# Bandari Sai Mouli — Portfolio

A dark, WebGL-driven portfolio for a backend/platform engineer. Built with
React 19, Vite, Tailwind v4 and Motion.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production bundle into dist/
npm run lint     # tsc --noEmit
```

## Editing content

**All copy lives in `data/content.ts`.** Projects, in-flight work, capabilities,
impact numbers, the timeline and the stack ticker are plain arrays — edit them
and the sections update. No component changes needed.

- `PROJECTS` — the Selected Work cards. `variant` (0–4) picks which WebGL
  visual renders as that card's thumbnail.
- `NEXT` — the Building Next roadmap. `status` is `Shipped | Building | Planning`
  and `progress` is a 0–100 number.
- `PROFILE.available` toggles the "Available" pill in the nav and the contact copy.

## WebGL

Two shader components, both raw WebGL2 with no 3D library:

- `components/FieldBackground.tsx` — the fullscreen ambient field. Reacts to
  pointer position, scroll offset and scroll velocity.
- `components/ShaderCanvas.tsx` — per-project procedural visuals (streams,
  query grid, particles, policy mesh, platform rings). Hover warps the field,
  brightens it and splits the colour channels. Rendering pauses via
  IntersectionObserver whenever a card is off-screen.

Both degrade to a plain dark background if WebGL2 is unavailable, and both
slow right down under `prefers-reduced-motion`.

## Interaction notes

- `components/Cursor.tsx` — custom cursor; add `data-cursor="Label"` to any
  element to swell the ring and print that label inside it. Disabled on
  coarse/touch pointers.
- `components/Magnetic.tsx` — wraps a child so it drifts toward the pointer.
- `components/ScrambleText.tsx` — CLI-style decode. Writes straight to the DOM
  node (one node update per frame, not a React re-render per frame) and renders
  the real text as children so it still reads with JS disabled.
