# Adopting the design system in an app

Step-by-step mechanics for wiring `@misterbeardy/design-system` into any
project — existing or brand new, any stack. Written for humans and AI coding
agents alike. `readme.md` owns the rules and philosophy; read it first. This
file only covers the how.

## 0. Locate and install the package

- Design system checked out as a sibling folder
  (`~/projects/MisterBeardy/design_system`): install `file:../design_system`
  while actively iterating — it's a live symlink, edits show up instantly.
- Otherwise: `npm install github:MisterBeardy/design-system#<latest-tag>`.
- **Deploys must always use a pinned tag.** `file:` dependencies break cloud
  builds (the sibling folder doesn't exist there). Switching is one command:
  `npm install github:MisterBeardy/design-system#vX.Y.Z`.
- **Moving to a newer tag?** Read the **Upgrading** notes in `CHANGELOG.md`
  for every release between the app's tag and the new one first. They list
  what the app will see change and anything it has to do.
- **The app already has its own styling?** Go through "Before you start"
  in `UPGRADING-1.0.md` first: variables with the system's names,
  `data-theme` used for something else, backgrounds fixed to one theme.
  They apply to adopting as much as to upgrading, and a build won't show
  them.

## 1. Register the app's accent

Every app owns exactly one hue. Check `app-registry.js` in this package:

- App already has a row → use its hue/chroma.
- New app → compute open slots (`suggestOpenSlots()` in `app-registry.js`),
  pick one, add a row, and commit + push + tag the registry change so the
  hue wheel stays accurate for the next app.
- App has a real pre-existing brand color → keep it as the accent (see
  readme), add a row with its hue and a `note`.

## 2. Wire by stack

**React + bundler (Next.js, Vite, …)**
- Install per step 0.
- No bundler configuration: components ship compiled (`dist/index.js`, React
  as a peer), and TypeScript finds the prop types on its own. Remove any
  `transpilePackages` entry left from before 0.3.0; it's harmless but no longer
  needed.
- Import `"@misterbeardy/design-system/styles.css"` once at the app root,
  before app-local styles.
- **Set your own text in the system's two faces**, not just the components'.
  Components set their own type; everything else on the page inherits from
  your `body` and your framework. So `body { font-family: var(--font-display); }`,
  and numbers and data in `var(--font-mono)` with
  `font-variant-numeric: tabular-nums`. If the app loaded faces of its own
  (Geist, Inter, …), stop loading them. An app that keeps them ends up with
  design-system Buttons in Space Grotesk among text in another face. Tailwind
  and shadcn/ui: see step 5.
- Use the primitives:
  ```js
  import {
    Button, Card, Chip, Input, StatTile,                  // page-level pieces
    Group, Row, GlyphTile, Segmented, Switch, StatStrip,  // grouped-list vocabulary
  } from "@misterbeardy/design-system";
  ```
  Usage rules are in the `.prompt.md` beside each component source.

**If you can't import `styles.css`** — it starts by downloading the fonts
from Google (`tokens/fonts.css`), which a strict `font-src` CSP will block,
and some bundlers (Turbopack) reject an `@import` that isn't first in the
file. In that case self-host the two faces (e.g. `next/font/google`) and
import every other file yourself — everything except `fonts.css`:

```css
@import "@misterbeardy/design-system/tokens/typography.css"; /* ← the type scale */
@import "@misterbeardy/design-system/tokens/colors.css";
@import "@misterbeardy/design-system/tokens/spacing.css";
@import "@misterbeardy/design-system/tokens/motion.css";
@import "@misterbeardy/design-system/tokens/materials.css";
@import "@misterbeardy/design-system/core.css";   /* ← easy to forget */
```

`typography.css` is not optional either, and it downloads nothing: it's the
type scale every component sets its text from (`--type-button`,
`--type-row-label`, …). Before 1.0 it also carried the Google Fonts import,
so apps that couldn't take the download left it out, and their Buttons,
Chips and StatTiles fell back to the page's font. Never copy its values into
your own CSS instead; import it.

`core.css` is not optional. It carries the rules that can't be inline styles —
`Row`'s hairline separators, `:last-child`, hover, focus rings, and the
`box-sizing` the rows depend on. Skip it and the list still renders, just
subtly wrong and with no focus rings, which is the worst kind of broken.

Self-hosting the fonts? `fonts.css` is the one file you skip, so declare what
it would have: map your faces onto the two names the type scale reads —
`--font-display` and `--font-mono` — and declare the font variables on
`<html>`, not `<body>`: a `:root` custom property can't resolve a variable
declared on a descendant, and every descendant then inherits the broken value.

**Non-React JS app with a build step**
- Install and import `styles.css` the same way.
- Replicate component shapes from `guidelines/*.card.html` and the inline
  styles in `components/core/*.jsx`, always via tokens.

**Static HTML / no npm**
- Vendor `styles.css` + `tokens/*.css` + `components/core/core.css` into the
  project with a header comment: `/* vendored from @misterbeardy/design-system
  vX.Y.Z — do not hand-edit; refresh from the repo */`. Rebuild component
  shapes from `guidelines/grouped-list.card.html`, which is plain HTML against
  the same classes and tokens.
- This is the one sanctioned copy. Recording the version is what makes it
  refreshable instead of drift.

## 3. Accent override

In the app's root stylesheet, paste the block the registry prints for it.
Don't apply the formula by hand; copying the output is what keeps every app
on the same one:

```sh
node -e 'import("@misterbeardy/design-system/app-registry").then(r => console.log(r.accentCssFor("<app-key>")))'
```

It prints `--accent`, `--accent-soft`, `--accent-text` and `--on-accent` for
`:root` and for `[data-theme="dark"]`, then the app's high-contrast accent in an
`@media (prefers-contrast: more)` part. Paste all of it: the block comes after
the package's CSS, so leaving that part out would override the package's
high-contrast accent with your normal one. Declare the accent nowhere else:
a second declaration on a more specific selector (`:root[data-theme="light"]`,
say) silently wins over the pasted block. A new app goes into
`app-registry.js` first (step 1); `npm run check` in this package then confirms
its button label and glyphs meet their contrast floor in both themes, and 7:1
in high contrast.

Never override neutrals or the status tokens — those are identical across
the portfolio by design.

## 4. Dark mode

Tokens flip under `[data-theme="dark"]` on `<html>`. If the app already has
a dark-mode mechanism (Tailwind `.dark` class, `prefers-color-scheme`, a
theme picker), have that mechanism **also set `data-theme="dark"` on
`<html>`** — do not duplicate token values under a different selector.

## 5. Bridging an existing UI framework

If the app already uses Tailwind, shadcn/ui, MUI, CSS modules, etc., don't
rip it out. Point the framework's theme layer at the tokens so existing
components inherit them:

- **Tailwind v4**: `@theme { --color-bg: var(--bg); --color-surface:
  var(--surface); … }`.
  For type, add `--font-sans: var(--font-display);` to an `@theme inline`
  block, so `font-sans` and Tailwind's default body font are Space Grotesk.
  Leave `--font-mono` out of `@theme`: it's the same name the type scale
  reads, so the design system's JetBrains Mono already reaches Tailwind's
  `font-mono`, and a value in `@theme inline` would replace it in every
  `font-mono` utility.
- **shadcn/ui**: map its CSS vars (`--background`, `--foreground`,
  `--primary`, `--border`, …) to the tokens in `globals.css`.
- **MUI / styled-components**: feed the CSS vars into the theme object.

New and touched UI migrates toward the system primitives. Migration is
always incremental — screens convert as they're touched, never a mass
restyle pass.

**What "migrates toward" means concretely.** Read the **Visual language**
section of `readme.md` before touching UI; it's the authority. The short
version, because it's what most conversions are:

- Settings-, list-, and stats-shaped UI is built from `Group` / `Row` /
  `GlyphTile` / `Segmented` / `Switch` / `StatStrip` — not bespoke cards.
- Colour lives on the `GlyphTile`, never as a wash on the card surface. If
  you're reaching for `bg-gradient-to-br from-*-50`, that's the pattern this
  language replaces.
- `tone` is for colour that means **state**; `color` is for colour that
  encodes **data** (category palettes, per-vehicle colours, medal tiers). Data
  colour never collapses into the accent.
- Tab rows and year/range pickers become `Segmented`. Settings checkboxes
  become `Switch`.
- Cards stay flat. The one sanctioned elevation and the one sanctioned
  translucency are the same thing: a panel floating over live content
  (`.ds-glass`). Vibrancy is a signal, not a texture.

An app that only bridges tokens has adopted the palette, not the design. The
palette was never the hard part.

## 6. Status + content rules (all stacks)

- Outcome states use `--success` / `--warning` / `--danger` (+ `-soft` /
  `-text`) — never ad-hoc greens and reds. React: `<Chip tone="success">PAID</Chip>`.
- Status renders as short uppercase mono chips, not verbose copy.
- Labels are literal; no emoji in UI chrome; numbers set in JetBrains Mono;
  at most one solid-accent action per view.

## 7. Record it in the app's CLAUDE.md

Add this section, filled in:

```markdown
## Design system
Uses @misterbeardy/design-system (github.com/MisterBeardy/design-system).
- Installed via: <file:../design_system | github:…#vX.Y.Z>
- Pre-deploy: switch to the latest pinned tag (file: breaks cloud builds)
- Accent: hue <H>, chroma <C> (key "<app-key>" in app-registry.js)
- Dark mode bridge: <how data-theme="dark" gets set>
- Framework bridge: <none | tailwind @theme | shadcn var map | …>
- Type: page text in var(--font-display) (Space Grotesk), numbers and data in
  var(--font-mono) (JetBrains Mono, tabular). No other faces loaded. Tailwind:
  --font-sans → var(--font-display); --font-mono stays out of @theme.
- Styles imported: <styles.css | every token file but fonts.css, plus core.css, because …>
- Settings/list/stats UI uses Group/Row/GlyphTile/Segmented/Switch/StatStrip.
  Colour goes on the glyph tile, never on the card surface. Data colour
  (<name the app's categorical palettes>) never collapses into the accent.
- Before UI work, read node_modules/@misterbeardy/design-system/readme.md —
  especially "Visual language" — and the .prompt.md beside each component used.
- Never copy tokens; never hardcode a color that exists as a token.
```

## 8. The universal kickoff prompt

Paste this into a session in any app, any stack:

```text
Adopt our shared design system in this project. It lives at ../design_system
if that folder exists, otherwise github:MisterBeardy/design-system (pin the
latest tag). Read readme.md — rules and philosophy, especially the "Visual
language" section — and ADOPTING.md (mechanics) inside it. Then detect this
app's stack and follow the matching ADOPTING.md path end to end: install,
accent registration from app-registry.js, dark-mode bridging to
data-theme="dark", framework bridging to the tokens, and the CLAUDE.md
section.

Do the wiring now, and show me one screen converted to the grouped-list
language (Group/Row/GlyphTile/Segmented/Switch/StatStrip) so I can see it
land. Then stop — the rest of the screens migrate incrementally as they're
touched, never in a mass restyle pass.

Two things that are easy to get wrong: if you can't import styles.css (CSP
blocks the Google Fonts download in tokens/fonts.css), you must still import
typography.css and core.css explicitly, or components lose their type and
separators and focus rings silently won't render. And don't bridge the app's
categorical/data colours to the accent — data colour is sacred; it comes from
the data palette (--data-1 … --data-6, <GlyphTile data={n}>), in the order
dataOrderFor("<app-key>") gives.
```

Already adopted an older version? Same prompt — it's incremental by
construction. Point it at the latest tag and it'll reconcile what's missing
(most likely: the grouped-list primitives, `core.css`, and the motion and
materials tokens, none of which existed before v0.2.0).
