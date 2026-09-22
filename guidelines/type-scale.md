---
category: Type
---

# Type scale

Two families: **Space Grotesk** (`--font-display`) for all UI copy, **JetBrains Mono** (`--font-mono`) for data — numbers, codes, status labels. Both load via a remote `@import` in `tokens/typography.css`.

Use the `--text-*` shorthands (each packs weight/size/line-height/family) rather than setting font properties by hand.

| Token | Spec | Role |
|---|---|---|
| `--text-display` | 700 38px Space Grotesk | Page hero |
| `--text-heading` | 700 24px | Section heading |
| `--text-subhead` | 600 17px | Subheading |
| `--text-body` | 400 15px | Body copy (all UI text) |
| `--text-label` | 500 11px JetBrains Mono | Mono label, uppercase |
| `--text-section` | 600 10px mono | `Group` header (uppercase) |
| `--text-row-label` | 400 13px | `Row` label |
| `--text-row-sub` | 400 11px | `Row` sub-label |
| `--text-row-value` | 400 12px mono | `Row` value (tabular) |
| `--text-stat` | 700 19px | `StatStrip` number |
| `--text-stat-label` | 400 9px mono | `StatStrip` label (uppercase) |

The components set their own type from a third group of role tokens, so the scale describes what actually renders. Line height is fixed at 1.3, so a control is the same height whatever the host app's inherited line-height (a Tailwind preflight sets 1.5).

| Token | Spec | Role |
|---|---|---|
| `--text-button` / `--text-button-sm` | 600 14px / 13px | `Button` md / sm |
| `--text-input` | 400 14px | `Input` |
| `--text-segment` / `--text-segment-sm` | 500 12px / 11px | `Segmented` option |
| `--text-segment-sub` | 400 10px | `Segmented` option sub-label |
| `--text-chip` | 600 11px mono | `Chip` (uppercase, `--tracking-caps`) |
| `--text-chip-display` | 600 11px | `Chip mono={false}` |
| `--text-tile-label` | 400 10px mono | `StatTile` label (uppercase, `--tracking-label`) |
| `--text-tile-value` | 700 24px | `StatTile` number |
| `--text-tile-sub` | 400 11px mono | `StatTile` sub-line |

Data (numbers, codes, deltas) goes in `--font-mono` with `font-variant-numeric: tabular-nums`; everything a person reads goes in `--font-display`. Pair mono values with `--tracking-caps` / `--tracking-stat` where the components already do.
