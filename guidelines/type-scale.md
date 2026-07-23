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

Data (numbers, codes, deltas) goes in `--font-mono` with `font-variant-numeric: tabular-nums`; everything a person reads goes in `--font-display`. Pair mono values with `--tracking-caps` / `--tracking-stat` where the components already do.
