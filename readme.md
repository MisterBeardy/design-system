# Unified App Theme — Design System

A shared design system for a personal portfolio of apps: **iDroveWhere**,
**WashMyCar**, **OneOfUs.beer**, **That'll Be 5 Bucks**, **Idle Airport
Manager**, **ParametricChaos**, **WhatWillIThinkOfNext**, and the
**lookwhatibuilt.today** landing page.

## Sources
- `github.com/MisterBeardy/that-will-be-five-bucks` — Next.js + Prisma quoting tool
- `github.com/MisterBeardy/oneofus.beer` — Next.js + Supabase saint-sticker calendar
- `github.com/MisterBeardy/IdleAirportManager` — Vite + React + TS idle game

Real screens and copy for the three repos above were pulled directly from
their source (components, schema, tokens.css) rather than invented — see
`ui_kits/` (once added) and the standalone `*.dc.html` applied examples in
the project root for the results.

## Philosophy
Every app shares the same **bones** — type system, spacing scale, radius
scale, and component shapes (buttons, chips, cards, inputs, stat tiles).
The one thing that changes per app is a single **accent hue**. Identical
apps would read as one product; shared bones with distinct accents read as
a portfolio of separate things that clearly belong to the same maker.

Where an app already has a real, meaningful brand color (OneOfUs's live
amber `#d97706`, Idle Airport Manager's HUD amber `#ffd24a`), that color is
preserved as the accent rather than replaced.

## Content fundamentals
- Copy is plain and functional — no marketing voice. Labels are literal
  ("Cash", "Print time", "Balance due"), not clever.
- Numbers/data are always set in JetBrains Mono, tabular where possible.
- Status is communicated with short, uppercase mono pill chips (SENT,
  DRAFT, PRINTED, ASSIGN, REPLACE), not verbose copy.
- No emoji in the UI chrome. The one exception is inline in real user-facing
  copy where the source app itself uses it (e.g. a 🍺/🏆 glyph standing in
  for an icon in a mocked detail row) — don't add new ones.

## Visual foundations
- **Color**: warm, slightly desaturated neutrals (`tokens/colors.css`).
  Dark mode is the same roles inverted, not a separate palette.
- **Status**: `--success` / `--warning` / `--danger`, each with `-soft` and
  `-text` variants mirroring the accent slot. App-agnostic — never override
  these per app; the same state must read identically across the portfolio.
  Chips are the primary consumer (`<Chip tone="success">PAID</Chip>`).
- **Type**: Space Grotesk (display/UI, weights 400–700) + JetBrains Mono
  (data/labels, weights 400–700). See `tokens/typography.css`.
- **Spacing**: 4px base scale, 4 → 32. **Radius**: 6 / 10 / 14 / 20 / pill —
  10–14px is the default for cards, buttons, inputs.
- **Shadows**: none by default. Cards are flat — depth comes from border +
  surface/bg contrast, not elevation. Chrome windows / device frames (used
  only for presenting mockups, not part of the UI itself) carry their own
  drop shadow.
- **Buttons**: primary (solid accent), secondary (bordered neutral), soft
  (accent-tinted), ghost (text-only). One primary action per view, max.
- **Motion**: not yet defined system-wide — apps currently animate
  independently (see each repo). No system-wide easing/duration tokens yet.

## Accent registry
`app-registry.js` (project root) is the single source of truth for which
hue/chroma belongs to which app, and computes open slots for new apps from
the widest remaining gaps around the hue wheel. See **Accent Registry** and
**Palette Check** in the design tools below.

Formula: `light = oklch(0.58–0.64 C H)`, `dark = oklch(0.70–0.76 C H)`.

**Adding app #9:**
1. Open Accent Registry — it computes the current open hue slots.
2. Pick an open slot (or keep a real existing brand color, accepting the
   tradeoff if it lands near another app).
3. Add a row to `app-registry.js` — every tool reads it, nothing else needs updating.
4. Build real screens from the app's actual repo/data where possible.

## Consuming this system from an app

This folder is an npm package (`@misterbeardy/design-system`). From any
sibling app:

```sh
npm install ../design_system
```

(or `npm install github:MisterBeardy/design-system` once the repo is pushed
to GitHub — same package.json either way).

```js
// styles — import once at the app root (globals.css / main.tsx)
import "@misterbeardy/design-system/styles.css";

// components
import { Button, Card, Chip, Input, StatTile } from "@misterbeardy/design-system";

// accent registry (build scripts, theme tooling)
import { APPS, accentFor } from "@misterbeardy/design-system/app-registry";
```

Then set the app's accent in its own root CSS, from its `app-registry.js` row:

```css
:root {
  --accent:      oklch(0.60 0.13 230); /* washmycar */
  --accent-soft: oklch(0.95 0.03 230);
  --accent-text: oklch(0.42 0.13 230);
}
```

**Next.js**: components ship as untranspiled `.jsx`, so add
`transpilePackages: ["@misterbeardy/design-system"]` to `next.config`.
**Vite**: works as-is.

Don't copy token files into apps — that's the drift this package exists to
prevent. The one exception: throwaway HTML mocks, where copying is fine.

Full per-stack adoption steps — non-React apps, static sites, dark-mode
bridging, and bridging existing frameworks (Tailwind, shadcn, MUI) — live in
`ADOPTING.md`, along with a universal kickoff prompt for coding agents.

## Index
- `styles.css` — root import list (tokens only)
- `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`
- `components/core/` — Button, Chip, Card, Input, StatTile (`.jsx` + `.d.ts` + `.prompt.md` each)
- `guidelines/` — foundation specimen cards (neutrals, accent, status, type scale, spacing, radius)
- `app-registry.js` — accent hue registry + gap-finding helpers
- Root `*.dc.html` files — the interactive tools (**App Theme Kit**,
  **Accent Registry**, **Palette Check**) and the three real-app applied
  examples (**That'll Be 5 Bucks**, **OneOfUs Beer**, **Idle Airport Manager**)
- `Theme Spec.dc.html` — the full printable written spec

## Known caveats
- Motion/animation tokens aren't defined system-wide yet.
- `ui_kits/` (full click-through recreations composed from the `components/`
  primitives) hasn't been built yet — the three real-app examples currently
  live as standalone `*.dc.html` files in the project root instead.
- Four apps haven't been pulled from their repos yet: iDroveWhere,
  ParametricChaos, WhatWillIThinkOfNext, and lookwhatibuilt.today.
