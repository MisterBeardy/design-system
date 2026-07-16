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
  10–14px is the default for cards, buttons, inputs. Plus `--radius-card`
  (12px), a role rather than a step on that scale: it's the grouped `Group`
  card specifically, and adding 12 as a step would leave 10/12/14 sitting too
  close together to choose between deliberately.
- **Shadows**: none by default. Cards are flat — depth comes from border +
  surface/bg contrast, not elevation. Chrome windows / device frames (used
  only for presenting mockups, not part of the UI itself) carry their own
  drop shadow.
- **Buttons**: primary (solid accent), secondary (bordered neutral), soft
  (accent-tinted), ghost (text-only). One primary action per view, max.
- **Materials**: solid by default. Translucency (`.material-glass`) is allowed
  in exactly one situation — a panel floating over live content, e.g. a map.
  *Vibrancy is a signal, not a texture.* See `tokens/materials.css`.
- **Motion**: `--duration-fast|base|slow|slower` + `--ease-out`, `--ease-in-out`,
  `--ease-out-expo` (`tokens/motion.css`). User-triggered changes should feel
  like a response (fast/base); things the app decided on its own can take their
  time (slow/slower). Collapses to ~0 under `prefers-reduced-motion`.

## Visual language

The bones above say what things are made of. This says what shape they take —
adopted from Apple's structure, on top of the tokens we already had. It came out
of iDroveWhere's Apple-HIG redesign (`docs/rfc-apple-visual-language.html` in
that repo), which found that the palette was never the problem: *"we don't need
to fork the palette to get the look — we need to fix the form."* So none of this
changes colour, and per-app accents are untouched.

| Primitive | Rule |
|---|---|
| Page | Tinted, never white (`--bg`). Cards sit on it. The tint is what makes a white card read as an object. |
| `Group` | Related rows in one card. Flat: border + surface/bg contrast, not elevation. Cards group; they don't decorate. |
| `Row` | One idea. Glyph → label (+ sub) → value → chevron. Hairline separator, inset to the label's leading edge. |
| `GlyphTile` | 23px rounded square in a category colour, white glyph. **This** carries colour — not the card surface. |
| `StatStrip` | The number is the hero; its label is furniture. One accent metric per screen. |
| `Segmented` | Replaces tab rows and year/range pickers. Three or four options, max. |
| `Switch` | Replaces the checkbox wherever the change takes effect immediately. |
| Material | Translucency only over live content. Everywhere else, solid. |
| Accent | Interactive things only. Per-app, from the registry. |
| Data colour | **Sacred.** Visit ramps, per-vehicle colours, medal tiers and category palettes encode data and never collapse into the accent — pass them to `GlyphTile color=`, which exists for exactly this. |

Two standing rules, both learned the hard way: **data colour is sacred**, and
**decoration isn't colour's job**. The pattern this replaces was a
`bg-gradient-to-br from-blue-50` wash on the card surface — every surface
shouting, none of it meaning anything. Colour moved onto the glyph tile, where
it has a job.

Emoji remain banned in UI chrome (see Content fundamentals); glyphs are SVG.

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
import {
  Button, Card, Chip, Input, StatTile,          // page-level pieces
  Group, Row, GlyphTile, Segmented, Switch, StatStrip,  // grouped-list vocabulary
} from "@misterbeardy/design-system";

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
- `styles.css` — root import list (tokens + `core.css`)
- `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`,
  `tokens/motion.css`, `tokens/materials.css`
- `components/core/` — Button, Chip, Card, Input, StatTile, Group, Row,
  GlyphTile, Segmented, Switch, StatStrip (`.jsx` + `.d.ts` + `.prompt.md` each)
- `components/core/core.css` — the few component rules that need real selectors
  (Row's hairline `::after`, `:last-child`, hover, focus rings). Everything else
  is inline styles reading tokens, so the package needs no build step and no
  utility framework. Cherry-picking token files instead of `styles.css`? Import
  this too, or separators and focus rings silently won't render.
- `guidelines/` — foundation specimen cards (neutrals, accent, status, type
  scale, spacing, radius, grouped list)
- `app-registry.js` — accent hue registry + gap-finding helpers
- Root `*.dc.html` files — the interactive tools (**App Theme Kit**,
  **Accent Registry**, **Palette Check**) and the three real-app applied
  examples (**That'll Be 5 Bucks**, **OneOfUs Beer**, **Idle Airport Manager**)
- `Theme Spec.dc.html` — the full printable written spec

## Known caveats
- The grouped-list primitives assume a `Row`'s glyph is a default-size
  `GlyphTile`: `--row-inset` (45px) is hand-computed as
  `--row-pad-x + --glyph-size + --row-gap`. Resize the tile and the separator
  inset needs updating with it — CSS can't do that arithmetic across the
  component boundary.
- `Group` is on `--radius-card` (12px) while `Card` and `StatTile` are on
  `--radius-lg` (14px). Deliberate — a list container and a standalone object
  aren't the same thing — but if the two ever sit side by side, the 2px will be
  visible. Worth revisiting if it reads as sloppy rather than considered.
- `ui_kits/` (full click-through recreations composed from the `components/`
  primitives) hasn't been built yet — the three real-app examples currently
  live as standalone `*.dc.html` files in the project root instead.
- Four apps haven't been pulled from their repos yet: iDroveWhere,
  ParametricChaos, WhatWillIThinkOfNext, and lookwhatibuilt.today.
