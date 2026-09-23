---
category: Type
---

# Type scale

Two families: **Space Grotesk** (`--font-display`) for all UI copy, **JetBrains Mono** (`--font-mono`) for data — numbers, codes, status labels. Both load via a remote `@import` in `tokens/typography.css`.

Use the `--text-*` shorthands (each packs weight/size/line-height/family) rather than setting font properties by hand.

| Token | Spec | Role |
|---|---|---|
| `--text-display` | {{spec:--text-display}} | Page hero |
| `--text-heading` | {{spec:--text-heading}} | Section heading |
| `--text-subhead` | {{spec:--text-subhead}} | Subheading |
| `--text-body` | {{spec:--text-body}} | Body copy (all UI text) |
| `--text-label` | {{spec:--text-label}} | Mono label, uppercase |
| `--text-section` | {{spec:--text-section}} | `Group` header (uppercase) |
| `--text-row-label` | {{spec:--text-row-label}} | `Row` label |
| `--text-row-sub` | {{spec:--text-row-sub}} | `Row` sub-label |
| `--text-row-value` | {{spec:--text-row-value}} | `Row` value (tabular) |
| `--text-stat` | {{spec:--text-stat}} | `StatStrip` number |
| `--text-stat-label` | {{spec:--text-stat-label}} | `StatStrip` label (uppercase) |

Spec is weight, size and line height; **mono** marks JetBrains Mono, everything else is Space Grotesk.

The components set their own type from a third group of role tokens, so the scale describes what actually renders. Line height is fixed, so a control is the same height whatever the host app's inherited line-height (a Tailwind preflight sets 1.5).

| Token | Spec | Role |
|---|---|---|
| `--text-button` | {{spec:--text-button}} | `Button` md |
| `--text-button-sm` | {{spec:--text-button-sm}} | `Button` sm |
| `--text-input` | {{spec:--text-input}} | `Input`, `Select`, `Textarea`; the `Checkbox` label |
| `--text-segment` | {{spec:--text-segment}} | `Segmented` option |
| `--text-segment-sm` | {{spec:--text-segment-sm}} | `Segmented` option, sm |
| `--text-segment-sub` | {{spec:--text-segment-sub}} | `Segmented` option sub-label |
| `--text-chip` | {{spec:--text-chip}} | `Chip` (uppercase, `--tracking-caps`) |
| `--text-chip-display` | {{spec:--text-chip-display}} | `Chip mono={false}` |
| `--text-tile-label` | {{spec:--text-tile-label}} | `StatTile` label (uppercase, `--tracking-label`) |
| `--text-tile-value` | {{spec:--text-tile-value}} | `StatTile` number |
| `--text-tile-sub` | {{spec:--text-tile-sub}} | `StatTile` sub-line |
| `--text-message-title` | {{spec:--text-message-title}} | `Banner` and `ErrorState` title, `Toast` message, `Popover` title |
| `--text-message` | {{spec:--text-message}} | `Banner` and `ErrorState` sentence |
| `--text-page-sub` | {{spec:--text-page-sub}} | `PageHeader` subtitle |
| `--text-tab` | {{spec:--text-tab}} | `TabBar` label |

Data (numbers, codes, deltas) goes in `--font-mono` with `font-variant-numeric: tabular-nums`; everything a person reads goes in `--font-display`. Pair mono values with `--tracking-caps` / `--tracking-stat` where the components already do.
