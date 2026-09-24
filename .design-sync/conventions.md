# MisterBeardy Design System — how to build with it

A small React kit (26 components) with a flat, calm, Apple-HIG-grouped-list
visual language. Inline styles reading CSS custom properties — **no utility
classes, no provider, no build step required.**

## Setup (do this once)

1. **Import the stylesheet.** Everything visual comes from `styles.css` and its
   `@import` closure (`tokens/*.css` + `_ds_bundle.css`). Without it, components
   render as unstyled boxes — the tokens they read are undefined.
2. **Tint the page.** Set the app background to `var(--bg)` (a warm off-white
   `#f6f5f3`, never pure white). The system is deliberately **flat — no
   shadows**; depth comes entirely from the `--surface`/`--bg` contrast plus 1px
   borders. (Only three things float over the page and carry a shadow token:
   a `Sheet`, a `Popover` and a `Toast`. The translucent `TabBar` has none.)
   A `Group` or `Card` on a white page looks like it's floating; the
   fix is the page background, not a shadow.
3. **Dark mode** is `[data-theme="dark"]` on a root element — every token has a
   dark value. **No provider or ThemeProvider exists or is needed.**
4. **High contrast is automatic.** When the reader's system asks for more
   contrast (`prefers-contrast: more`) the tokens move to a 7:1 theme by
   themselves, light and dark. Style with the tokens and it works; a
   hard-coded colour won't follow, and never add a contrast theme of your own.
5. **Set your own text in the system's faces.** Components set their own
   type; your layout glue doesn't inherit it. Put
   `font-family: var(--font-display)` on the page root, and set every number or
   data value you lay out yourself in `var(--font-mono)` with
   `font-variant-numeric: tabular-nums`. Never load another face.

## The styling idiom: tokens, not classes

Style your own layout glue with `var(--*)` tokens (in a `style` prop or your own
CSS). Components carry their own look; you compose them and space them.

| Group | Tokens |
|---|---|
| Surfaces | `--bg` `--surface` `--surface-alt` `--border` `--border-soft` `--hairline` |
| Text | `--text-ink` `--text-muted` |
| Accent slot (per-app) | `--accent` `--accent-soft` `--accent-text` `--on-accent` (text or glyph on a solid accent) |
| On-colours | `--on-success` `--on-warning` `--on-danger` `--on-neutral` (glyph on that solid fill) |
| Status (app-agnostic) | `--success[-soft/-text]` `--warning[-soft/-text]` `--danger[-soft/-text]` |
| Data (categories, series) | `--data-1`…`--data-6` (in that order), `--on-data` (glyph on a data fill) |
| Ramp (counts, density) | `--ramp-1` (least) … `--ramp-7` (most) |
| Fonts | `--font-display` (Space Grotesk), `--font-mono` (JetBrains Mono) |
| Type shorthands | `--type-display` `--type-heading` `--type-subhead` `--type-body` `--type-label` `--type-section` `--type-row-label` `--type-row-sub` `--type-row-value` `--type-stat` `--type-stat-label` `--type-message-title` `--type-message` `--type-page-sub` `--type-tab` |
| Spacing | `--space-1`…`--space-6` |
| Chrome | `--header-height` (a sticky offset under `PageHeader`), `--tabbar-height` (the room a list leaves above `TabBar`) |
| Radius | `--radius-sm` `--radius-md` `--radius-lg` `--radius-card` `--radius-pill` `--radius-xl` |
| Tracking | `--tracking-caps` `--tracking-label` `--tracking-stat` |

**The `--accent` is a slot** — each app overrides `--accent`/`--accent-soft`/
`--accent-text` with its own hue; everything else is identical across apps.
Status tokens are **never** overridden, so a "PAID" chip reads the same
everywhere. Color lives on small elements (a `GlyphTile`, a `Chip`), never as a
surface wash — that keeps color meaningful. (One exception: a `Banner`, whose
tint is the message.)

## Idiom rules that keep designs on-brand

- **Grouped lists are the default UX.** Related `Row`s live inside one `Group`;
  the `Group` header is where the grouping earns its keep. Rows own their
  padding so separators inset to the label edge — don't wrap rows in a padded div.
- **`GlyphTile` carries color, holds an `Icon`** at 13px (never an emoji — the
  system bans emoji in chrome). `Icon name=…` draws the house glyphs: `check`
  `close` `plus` `chevron-right` `chevron-down` `alert` `info` `inbox` `search`
  `calendar` `pin` `map` `bolt` `ruler` `thermometer` `trophy`; 16px beside text. `tone` = semantic state; `data={1…6}` = a category
  from the data palette. Charts colour series with `var(--data-1)` …
  `var(--data-6)` in that order and counts with `var(--ramp-1)` (least) …
  `var(--ramp-7)` (most); never the accent or a status colour for data.
- **`Switch`** is on/off *now* (track goes `--success`, not accent). **`Segmented`**
  is "one of a few peers" (3–4 max). **`Chip`** is `mono` uppercase for status.
- One headline metric per screen sets `accent` on `StatTile`/`StatStrip`.
- **Elevation is two components, nothing else.** `Sheet` is a panel over live
  content (a map, a video): translucent, never dims what's behind, not modal.
  `Popover` is a small panel anchored to its trigger (`trigger={<Button …/>}`),
  focus trapped, Escape closes. Everything else stays flat — no shadows.
- **Forms are grouped lists.** Each input is a `Field` row in a `Group`
  (`<Field label="Trip name"><Input … /></Field>`; also `Select`, `Textarea`);
  Field draws the control bare and wires the label, `aria-invalid` and
  `aria-describedby`. Errors go in Field's `error`. Yes/no on submit is
  `<Checkbox row … />`; takes-effect-now is `Switch`. Boxed `Input`/`Select`/
  `Textarea` only for a lone control (a search box).
- **Feedback and states.** `Banner` for an outcome that stays until it's dealt
  with (errors, offline is a warning Banner); `Toast` only for "that worked",
  one at a time, never an error. Loading is a `Skeleton` in the shape of the
  content, inside its `Group`; empty is an `EmptyState` filling the panel;
  failed is an `ErrorState` where the content would be. The Banner is the one
  surface allowed a status tint.
- **App chrome is three components.** `PageHeader` is one compact height and
  never collapses on scroll (title centred, one or two icon actions, sticky by
  default). `Toolbar` sits loose on the page background under it and scrolls
  away with the list it filters — no surface, no border, built from `Segmented`,
  `Button` and `Chip`. `TabBar` is the bottom navigation, translucent like the
  `Sheet` because the list runs under it, with `--accent-text` on the current
  tab and nothing else; the scrolling area above needs
  `calc(var(--tabbar-height) + env(safe-area-inset-bottom, 0px))` at its foot.

## Where the truth lives

- `styles.css` → `tokens/*.css` (the token definitions) and `_ds_bundle.css`
  (the rules that need real selectors: Row separators and hover, the focus
  rings, the Switch and Checkbox inputs, the Sheet's and TabBar's glass, the
  Toolbar's sideways scroll, the Skeleton's pulse, and touch targets).
- Per component: `components/core/<Name>/<Name>.prompt.md` (usage + intent, hand
  written) and `<Name>.d.ts` (the props contract).

## One idiomatic snippet

```jsx
import { Group, Row, GlyphTile, Icon, Switch } from '@misterbeardy/design-system';

<div style={{ background: 'var(--bg)', padding: 'var(--space-5)' }}>
  <Group header="Units" footer="Applies to every trip.">
    <Row glyph={<GlyphTile tone="accent"><Icon name="ruler" size={13} /></GlyphTile>}
         label="Distance" value="Miles" chevron />
    <Row label="Show chargers"
         trailing={<Switch checked={on} onChange={setOn} label="Show chargers" />} />
  </Group>
</div>
```
