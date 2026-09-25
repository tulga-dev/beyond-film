# BEYOND

A four-minute film about shapes the human mind can't picture: objects from four, ten and eight-dimensional space, computed exactly and shown as slices and shadows. Every frame is rendered live on your GPU and every note is synthesized in your browser. There is no video, image or audio file: the whole film is one HTML page of about 130 KB.

**Watch:** https://beyond-film.fly.dev · in Mongolian: https://beyond-film.fly.dev/mn/

Best on a desktop, with headphones. It needs WebGL2 with floating-point render targets, which any recent desktop Chrome, Edge, Firefox or Safari has.

## The five acts

| Act | | What happens |
|---|---|---|
| Prologue | | A point is dragged into a line, a square, a cube and a tesseract, with one voice for each new dimension. |
| I | ℝ² ⊂ ℝ³ | Flatland. A sphere passes through a plane of flat creatures, who only ever see a circle. |
| II | ℝ⁴ ∩ ℝ³ | Slices of four-dimensional shapes: a 4D ball, a tesseract arriving corner first (tetrahedra, then an octahedron), and a 4D torus that splits into two rings and merges again. |
| III | ℝ⁴ → ℝ³ | Shadows: a rotating tesseract, all 600 corners and 1,200 edges of the 120-cell, and the Hopf fibration built up one circle at a time. |
| IV | n → ∞ | High dimensions: the volume of the unit ball, an orange that is 99.997% peel, random directions that are almost always at right angles, and a ten-dimensional cube. |
| V | E₈ | The 240 roots of E8 glide through random shadows until they lock into the Coxeter plane with 30-fold symmetry. |
| Coda | | The tesseract folds back down to a point. |

After the film, **Explore in 4D** lets you turn the tesseract, 24-cell, 120-cell and 600-cell through the fourth dimension yourself.

## How it works

- **Slices:** each pixel's ray runs through a 3D slice of 4D space and is ray marched against 4D signed distance functions. The color is the component of the 4D surface normal along the fourth direction, so it shows which way each surface leans into the fourth dimension.
- **Polytopes:** the 120-cell's 600 vertices come from permutations of coordinates involving the golden ratio. Every edge is subdivided along its great circle on the 3-sphere and projected stereographically, so edges appear as arcs.
- **Hopf fibration:** 196 great circles of the 3-sphere, one over each point of seven latitude circles on the 2-sphere. Every pair of them is linked exactly once.
- **High dimensions:** 160 pairs of random directions in 1,000 dimensions are drawn once and kept as running sums, so the angle between them in any dimension from 2 to 1,000 can be read off instantly.
- **E8:** the 240 roots are generated from their coordinates, and the 6,720 edges join roots whose inner product is 1. The Coxeter plane comes from eigenvectors of a Coxeter element of order 30, built from the eight simple reflections. Before the lock, the view glides between random projections from 8D to 3D, kept orthonormal with Gram–Schmidt.
- **Sound:** a small Web Audio synthesizer in D Lydian. The prologue adds one voice per dimension. In the E8 act, 120 sine voices, one for each pair of opposite roots, follow the projection: they drift as a cloud during the random tour and resolve into a single chord when the symmetry locks.
- **Rendering:** WebGL2 with floating-point HDR buffers, bloom and ACES tone mapping. The ray-marched scenes adapt their resolution to GPU timer measurements.

## Files

| File | Purpose |
|---|---|
| `beyond.html` | The film, and the single source of truth. Opens in English by default. |
| `build.mjs` | Builds the Mongolian version and the standalone pages from `beyond.html`, and adds the link-preview tags. |
| `assets/og.jpg`, `assets/og-mn.jpg` | Link-preview images (1200×630), rendered from the film's E8 scene. |
| `Dockerfile`, `nginx.conf`, `fly.toml` | Serve the film on Fly.io. |

## Build and run locally

```bash
node build.mjs
```

This writes `site/index.html` (English) and `site/mn/index.html` (Mongolian). Both open directly in a browser. It also writes `beyond-mn.html`.

## Deploy to Fly.io

```bash
fly apps create beyond-film
```

```bash
fly deploy
```

If `beyond-film` is taken, pick another name and change `app` in `fly.toml`. The Docker build runs `build.mjs` itself, so the deployed site always matches `beyond.html`.

Viewers only download one page, and their own devices do the rendering and the sound. One small machine can therefore serve any size of audience.

## Language

The film plays in English or Mongolian. There is a switch on the start and end screens. Adding `#mn` or `#en` to a link also chooses the language, for example `https://beyond-film.fly.dev/#mn-act5` plays in Mongolian starting from the E8 act. All on-screen text lives in the `I18N` table in `beyond.html`.

---

Made with [Claude](https://claude.ai). A companion to [LIMIT](https://limit-film.fly.dev).
