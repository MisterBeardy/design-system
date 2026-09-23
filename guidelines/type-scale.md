---
category: Type
---
<!-- Generated from guidelines/src/type-scale.md by scripts/build-guidelines.mjs, with values from tokens/*.css. Edit that file, not this one, then run npm run build. -->

# Type scale

Two families: **Space Grotesk** (`--font-display`) for all UI copy, **JetBrains Mono** (`--font-mono`) for data — numbers, codes, status labels. Both load via a remote `@import` in `tokens/typography.css`.

Use the `--text-*` shorthands (each packs weight/size/line-height/family) rather than setting font properties by hand.

| Token | Spec | Role |
|---|---|---|
| `--text-display` | 700 38px/1.05 | Page hero |
| `--text-heading` | 700 24px/1.15 | Section heading |
| `--text-subhead` | 600 17px/1.3 | Subheading |
| `--text-body` | 400 15px/1.65 | Body copy (all UI text) |
| `--text-label` | 500 11px/1.4 mono | Mono label, uppercase |
| `--text-section` | 600 10px/1.4 mono | `Group` header (uppercase) |
| `--text-row-label` | 400 13px/1.35 | `Row` label |
| `--text-row-sub` | 400 11px/1.35 | `Row` sub-label |
| `--text-row-value` | 400 12px/1.35 mono | `Row` value (tabular) |
| `--text-stat` | 700 19px/1.15 | `StatStrip` number |
| `--text-stat-label` | 400 9px/1.4 mono | `StatStrip` label (uppercase) |

Spec is weight, size and line height; **mono** marks JetBrains Mono, everything else is Space Grotesk.

The components set their own type from a third group of role tokens, so the scale describes what actually renders. Line height is fixed, so a control is the same height whatever the host app's inherited line-height (a Tailwind preflight sets 1.5).

| Token | Spec | Role |
|---|---|---|
| `--text-button` | 600 14px/1.3 | `Button` md |
| `--text-button-sm` | 600 13px/1.3 | `Button` sm |
| `--text-input` | 400 14px/1.3 | `Input`, `Select`, `Textarea`; the `Checkbox` label |
| `--text-segment` | 500 12px/1.3 | `Segmented` option |
| `--text-segment-sm` | 500 11px/1.3 | `Segmented` option, sm |
| `--text-segment-sub` | 400 10px/1.3 | `Segmented` option sub-label |
| `--text-chip` | 600 11px/1.3 mono | `Chip` (uppercase, `--tracking-caps`) |
| `--text-chip-display` | 600 11px/1.3 | `Chip mono={false}` |
| `--text-tile-label` | 400 10px/1.3 mono | `StatTile` label (uppercase, `--tracking-label`) |
| `--text-tile-value` | 700 24px/1.3 | `StatTile` number |
| `--text-tile-sub` | 400 11px/1.3 mono | `StatTile` sub-line |
| `--text-message-title` | 600 14px/1.35 | `Banner` and `ErrorState` title, `Toast` message, `Popover` title |
| `--text-message` | 400 13px/1.45 | `Banner` and `ErrorState` sentence |

Data (numbers, codes, deltas) goes in `--font-mono` with `font-variant-numeric: tabular-nums`; everything a person reads goes in `--font-display`. Pair mono values with `--tracking-caps` / `--tracking-stat` where the components already do.
