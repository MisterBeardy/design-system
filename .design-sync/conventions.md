# MisterBeardy Design System — how to build with it

A small React kit (11 components) with a flat, calm, Apple-HIG-grouped-list
visual language. Inline styles reading CSS custom properties — **no utility
classes, no provider, no build step required.**

## Setup (do this once)

1. **Import the stylesheet.** Everything visual comes from `styles.css` and its
   `@import` closure (`tokens/*.css` + `_ds_bundle.css`). Without it, components
   render as unstyled boxes — the tokens they read are undefined.
2. **Tint the page.** Set the app background to `var(--bg)` (a warm off-white
   `#f6f5f3`, never pure white). The system is deliberately **flat — no
   shadows**; depth comes entirely from the `--surface`/`--bg` contrast plus 1px
   borders. A `Group` or `Card` on a white page looks like it's floating; the
   fix is the page background, not a shadow.
3. **Dark mode** is `[data-theme="dark"]` on a root element — every token has a
   dark value. **No provider or ThemeProvider exists or is needed.**

## The styling idiom: tokens, not classes

Style your own layout glue with `var(--*)` tokens (in a `style` prop or your own
CSS). Components carry their own look; you compose them and space them.

| Group | Tokens |
|---|---|
| Surfaces | `--bg` `--surface` `--surface-alt` `--border` `--border-soft` `--hairline` |
| Text | `--text-ink` `--text-muted` |
| Accent slot (per-app) | `--accent` `--accent-soft` `--accent-text` |
| Status (app-agnostic) | `--success[-soft/-text]` `--warning[-soft/-text]` `--danger[-soft/-text]` |
| Fonts | `--font-display` (Space Grotesk), `--font-mono` (JetBrains Mono) |
| Type shorthands | `--text-display` `--text-heading` `--text-subhead` `--text-body` `--text-section` `--text-row-label` `--text-row-sub` `--text-row-value` `--text-stat` `--text-stat-label` |
| Spacing | `--space-1`…`--space-6` |
| Radius | `--radius-sm` `--radius-md` `--radius-lg` `--radius-card` `--radius-pill` `--radius-xl` |
| Tracking | `--tracking-caps` `--tracking-label` `--tracking-stat` |

**The `--accent` is a slot** — each app overrides `--accent`/`--accent-soft`/
`--accent-text` with its own hue; everything else is identical across apps.
Status tokens are **never** overridden, so a "PAID" chip reads the same
everywhere. Color lives on small elements (a `GlyphTile`, a `Chip`), never as a
surface wash — that keeps color meaningful.

## Idiom rules that keep designs on-brand

- **Grouped lists are the default UX.** Related `Row`s live inside one `Group`;
  the `Group` header is where the grouping earns its keep. Rows own their
  padding so separators inset to the label edge — don't wrap rows in a padded div.
- **`GlyphTile` carries color, needs an SVG icon** (never an emoji — the system
  bans emoji in chrome). `tone` = semantic state; `color` = categorical data.
- **`Switch`** is on/off *now* (track goes `--success`, not accent). **`Segmented`**
  is "one of a few peers" (3–4 max). **`Chip`** is `mono` uppercase for status.
- One headline metric per screen sets `accent` on `StatTile`/`StatStrip`.

## Where the truth lives

- `styles.css` → `tokens/*.css` (the token definitions) and `_ds_bundle.css`
  (the few real selectors: Row separators, Switch, Segmented focus).
- Per component: `components/core/<Name>/<Name>.prompt.md` (usage + intent, hand
  written) and `<Name>.d.ts` (the props contract).

## One idiomatic snippet

```jsx
import { Group, Row, GlyphTile, Switch } from '@misterbeardy/design-system';

<div style={{ background: 'var(--bg)', padding: 'var(--space-5)' }}>
  <Group header="Units" footer="Applies to every trip.">
    <Row glyph={<GlyphTile tone="accent"><RulerIcon /></GlyphTile>}
         label="Distance" value="Miles" chevron />
    <Row label="Show chargers"
         trailing={<Switch checked={on} onChange={setOn} label="Show chargers" />} />
  </Group>
</div>
```
