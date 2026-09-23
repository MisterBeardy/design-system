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
their source (components, schema, tokens.css) rather than invented. The
applied examples built from them live in the Claude Design project
**lookwhatibuilt.today**, not in this repository.

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
  (data/labels, weights 400–700). The type scale is `tokens/typography.css`;
  where the two faces come from (Google Fonts, or your own) is `tokens/fonts.css`.
- **Spacing**: 4px base scale, 4 → 32. **Radius**: 6 / 10 / 14 / 20 / pill —
  10–14px is the default for cards, buttons, inputs. Plus `--radius-card`
  (12px), a role rather than a step on that scale: it's the grouped `Group`
  card specifically, and adding 12 as a step would leave 10/12/14 sitting too
  close together to choose between deliberately.
- **Shadows**: none by default. Cards are flat — depth comes from border +
  surface/bg contrast, not elevation. The exception is something floating
  over the page: `Sheet` takes `--shadow-sheet`, `Popover` and `Toast`
  `--shadow-popover` (`tokens/materials.css`). In dark mode the shadow barely shows against the
  dark page, so the Toast's 1px border carries the separation. Chrome windows / device frames (used
  only for presenting mockups, not part of the UI itself) carry their own
  drop shadow.
- **Buttons**: primary (solid accent), secondary (bordered neutral), soft
  (accent-tinted), ghost (text-only). One primary action per view, max.
- **Materials**: solid by default. Translucency is allowed in exactly one
  situation — a panel floating over live content, e.g. a map — which is what
  `Sheet` is. *Vibrancy is a signal, not a texture.* A reader who asks for
  reduced transparency gets the opaque version. See `guidelines/elevation.md`.
- **Motion**: `--duration-fast|base|slow|slower` + `--ease-out`, `--ease-in-out`,
  `--ease-out-expo` (`tokens/motion.css`). User-triggered changes should feel
  like a response (fast/base); things the app decided on its own can take their
  time (slow/slower). Collapses to ~0 under `prefers-reduced-motion`.
- **Touch targets**: on a touch screen every control takes taps across at
  least 44×44px. Buttons, Segmented options and the Switch get an invisible
  tap area around them, so they're drawn at the same size; tappable Rows, Field
  rows and checkboxes grow to 44px. Mouse and trackpad keep the drawn size. Stack separate controls so
  their 44px areas don't overlap: two small Buttons (33px) stacked need 11px
  between them, since each area reaches about 5.5px past its edge.

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
| `GlyphTile` | 23px rounded square in a category colour; the glyph takes the fill's on-colour (`--on-accent`, `--on-success`, …). **This** carries colour — not the card surface. |
| `StatStrip` | The number is the hero; its label is furniture. One accent metric per screen. |
| `Segmented` | Replaces tab rows and year/range pickers. Three or four options, max. |
| `Switch` | Replaces the checkbox wherever the change takes effect immediately. |
| `Field` | A form is a grouped list whose rows take input: label left, bare control right, help or error under it. |
| `Sheet` | The one elevation and the one translucent surface: a panel over live content, which it never dims. |
| `Popover` | A small panel anchored to the control that opened it. Floats, so it takes the popover shadow. |
| Material | Translucency only over live content. Everywhere else, solid. |
| Accent | Interactive things only. Per-app, from the registry. |
| `Banner` | An outcome that stays until it's dealt with. The one surface that takes a status tint: the tone's `-soft` fill, its `-text` ink. |
| Data colour | **Sacred.** Categories and series use the data palette (`--data-1` … `--data-6`, `GlyphTile data={n}`); counts and density use the ramp (`--ramp-1` … `--ramp-7`). Data colour never collapses into the accent or a status hue. See `guidelines/data.md`. |

Two standing rules, both learned the hard way: **data colour is sacred**, and
**decoration isn't colour's job**. The pattern this replaces was a
`bg-gradient-to-br from-blue-50` wash on the card surface — every surface
shouting, none of it meaning anything. Colour moved onto the glyph tile, where
it has a job. The one exception is the `Banner`, where the tint *is* the
message ("this failed", "you're offline"); it's never used to decorate.

Emoji remain banned in UI chrome (see Content fundamentals); glyphs are SVG, from
the house set first: `<Icon name="pin" />`, or `icons/*.svg` without React.
See `guidelines/iconography.md` for the grid, the sizes and how to add one.

## Forms

A form is a grouped list whose rows take input: related fields share a
`Group`, each one a `Field` (label left, bare control right, help or error
under it) wrapping an `Input`, `Select` or `Textarea`. Yes-or-no choices are
`Checkbox row` rows; they apply on submit, where a `Switch` takes effect now.
Errors say what's wrong and how to fix it, turn the row `danger-text` and add
an alert glyph, never colour alone. On their own, the controls are boxed like
`Input`. See `guidelines/forms.md`.

## App chrome

The frame around the content: `PageHeader`, `Toolbar`, `TabBar`.

| | Where it sits | Scrolls away? |
|---|---|---|
| `PageHeader` | `--surface`, pinned at the top | No (`sticky={false}` if it should) |
| `Toolbar` | page background, under the header | Yes, with the content |
| `TabBar` | fixed to the bottom, translucent | No |

The header is one compact height and stays one: a large title that collapses
on scroll spends the top third of a phone on the word you just tapped, and
becomes a second thing to learn on every screen. The toolbar isn't attached to
it — the filters belong to the list, so they scroll away with it.

The `TabBar` is the system's second translucent surface, on the same argument
as the `Sheet`: the list runs under it and keeps moving. That means the
scrolling area above it needs
`calc(var(--tabbar-height) + env(safe-area-inset-bottom, 0px))` at the bottom.
The accent marks the current tab and nothing else. See `guidelines/chrome.md`.

## States and feedback

Every screen that loads something meets four states. Each has one component
and one place.

| State | Component | Where |
|---|---|---|
| Loading | `Skeleton` | Where the content will be, in its shape: rows inside the real Group, tiles in the tile row. After ~300ms, never a flash. No spinners in content. |
| Empty | `EmptyState` | Filling the panel: a neutral tile, a title, one sentence saying why or when it won't be, and one primary action. |
| Error | `ErrorState` | Where the content failed, inside its Group, with Try again. The rest of the screen keeps working. |
| Offline | `Banner tone="warning"` | Top of the screen. Not an error: the app still works, and the Banner goes when the connection comes back. |

Messages about something the person did:

- **`Toast`** for "that worked" (saved, copied, archived), with at most one
  way back (Undo). One at a time, 5 seconds or 8 with an action, held while
  hovered or focused. **Never for an error**: it leaves on its own, so it
  can't hold a problem.
- **`Banner`** for anything that has to stay until it's dealt with: a save
  that failed, a limit reached. Above the content it's about, one per screen.

Write both in plain words: what happened, then what to do. "Couldn't save
the trip. Try again, or keep editing and it'll save when you're back online",
not "Error: request failed".

## Accent registry
`app-registry.js` (project root) is the single source of truth for which
hue/chroma belongs to which app, and computes open slots for new apps from
the widest remaining gaps around the hue wheel. The **Accent Registry** and
**Palette Check** tools that visualise it live in the Claude Design project.

One formula for every app, and `accentCssFor(key)` prints it: light
`--accent: oklch(0.54 C H)` with a white label, dark
`--accent: oklch(0.74 max(0.85C, 0.09) H)` with a dark label (`--on-accent`).
The light lightness was 0.60 until 0.5.0, where neither white nor dark text
reached 4.5:1 on a primary button for most apps.

**Adding app #9:**
1. Run `suggestOpenSlots()` from `app-registry.js` (or open the Accent Registry
   tool in the Claude Design project) — it computes the current open hue slots.
2. Pick an open slot (or keep a real existing brand color, accepting the
   tradeoff if it lands near another app). Greens and cyans (roughly H156–226)
   need chroma of 0.13 or less, or the button label misses 4.5:1.
3. Add a row to `app-registry.js` and run `npm run check`, which fails if the
   new app's labels miss their contrast floor, and names the `dataLast` slot
   (the data colour nearest its accent) to put in the row. Every tool reads
   the registry; nothing else needs updating.
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
import { APPS, accentCssFor, dataOrderFor } from "@misterbeardy/design-system/app-registry";
```

Then set the app's accent in its own root CSS: paste what
`accentCssFor("<its key>")` prints. For WashMyCar:

```css
:root {
  --accent: oklch(0.54 0.13 230);
  --accent-soft: oklch(0.95 0.03 230);
  --accent-text: oklch(0.42 0.13 230);
  --on-accent: #ffffff;
}
[data-theme="dark"] {
  --accent: oklch(0.74 0.1105 230);
  --accent-soft: oklch(0.32 0.07 230);
  --accent-text: oklch(0.85 0.1 230);
  --on-accent: #211f1c;
}
```

Components ship compiled to plain JS (`dist/index.js`, React as a peer
dependency), so no bundler configuration is needed: Next.js, Vite and anything
else that resolves ESM work as-is. A `transpilePackages` entry left over from
before 0.3.0 is harmless and can be removed. TypeScript picks up the prop types
from `components/core/index.d.ts` automatically.

Don't copy token files into apps — that's the drift this package exists to
prevent. The one exception: throwaway HTML mocks, where copying is fine.

Full per-stack adoption steps — non-React apps, static sites, dark-mode
bridging, and bridging existing frameworks (Tailwind, shadcn, MUI) — live in
`ADOPTING.md`, along with a universal kickoff prompt for coding agents.

## Index
- `styles.css` — root import list (tokens + `core.css`)
- `tokens/fonts.css` (the Google Fonts download and the two families; skip it
  when you host your own fonts), `tokens/typography.css`, `tokens/colors.css`,
  `tokens/spacing.css`,
  `tokens/motion.css`, `tokens/materials.css`
- `components/core/` — Button, Chip, Card, Input, StatTile, Group, Row,
  GlyphTile, Segmented, Switch, StatStrip, Icon; for elevation Sheet and
  Popover; for forms Field, Select, Textarea, Checkbox; for feedback and
  states Banner, Toast, Skeleton, EmptyState, ErrorState; and for app chrome
  PageHeader, Toolbar, TabBar (`.jsx` + `.d.ts` + `.prompt.md` each)
- `components/core/core.css` — the few component rules that need real selectors
  (Row's hairline `::after`, `:last-child`, hover, focus rings). Everything else
  is inline styles reading tokens, so consumers need no CSS build step and no
  utility framework. Cherry-picking token files instead of `styles.css`? Import
  this too, or separators and focus rings silently won't render, and import
  `tokens/typography.css`, or components lose their type. Only `fonts.css` is
  optional (it's the Google Fonts download).
- `dist/index.js` — the compiled components, generated by `npm run build`
  (`build.mjs`) and committed. Never edit it by hand: CI rebuilds it on every
  push and pull request and fails if the committed copy is stale.
- `guidelines/` — foundation guides and specimen cards (neutrals, accent, status, data
  colour, type scale, spacing, radius, grouped list, and the component guides), built
  by `npm run build` from `guidelines/src/` with every token value read from
  `tokens/*.css`. Edit the source, not the output.
- `icons/` — the house glyphs as SVG files, the single source for `Icon`
  (`scripts/build-icons.mjs` generates its data and checks the house style)
- `app-registry.js` — accent hue registry + gap-finding helpers
- `CHANGELOG.md` — what changed in each release, with **Upgrading** notes for
  apps moving between tags; `UPGRADING-1.0.md` — every step from any 0.x
  version to 1.0 in one place; `CONTRIBUTING.md` — the per-change and release
  routine
- Not in this repository: the interactive tools (**App Theme Kit**, **Accent
  Registry**, **Palette Check**), the printable **Theme Spec**, and the three
  real-app applied examples (**That'll Be 5 Bucks**, **OneOfUs Beer**, **Idle
  Airport Manager**) live in the Claude Design project **lookwhatibuilt.today**.

## Adding, keeping or removing a token

Every token either has a consumer in `components/core/` or says, in a comment
beside its definition, what app code it's for. A token that can't say either is
a leftover. Before adding one, name the component or the app use; before
removing one, search the apps (they use tokens the components don't, like
`--border-soft` and `--duration-slow`). A removal is a breaking change: it goes
under **Upgrading** in `CHANGELOG.md`.

## Known caveats
- `Group` is on `--radius-card` (12px) while `Card` and `StatTile` are on
  `--radius-lg` (14px). Deliberate — a list container and a standalone object
  aren't the same thing — but if the two ever sit side by side, the 2px will be
  visible. Worth revisiting if it reads as sloppy rather than considered.
- There are no full click-through recreations composed from the `components/`
  primitives yet; the three real-app examples exist only in the Claude Design
  project.
- Four apps haven't been pulled from their repos yet: iDroveWhere,
  ParametricChaos, WhatWillIThinkOfNext, and lookwhatibuilt.today.
