---
category: Type
---

# Type scale

Two families: **Space Grotesk** (`--font-display`) for all UI copy, **JetBrains Mono** (`--font-mono`) for data — numbers, codes, status labels. Both load via a remote `@import` in `tokens/fonts.css`; an app that hosts its own fonts skips that file and sets the two variables itself. The type scale below is `tokens/typography.css`, which downloads nothing.

Use the `--text-*` shorthands (each packs weight/size/line-height/family) rather than setting font properties by hand.

| Token | Spec | Role |
|---|---|---|
| `--type-display` | {{spec:--type-display}} | Page hero |
| `--type-heading` | {{spec:--type-heading}} | Section heading |
| `--type-subhead` | {{spec:--type-subhead}} | Subheading |
| `--type-body` | {{spec:--type-body}} | Body copy (all UI text) |
| `--type-label` | {{spec:--type-label}} | Mono label, uppercase |
| `--type-section` | {{spec:--type-section}} | `Group` header (uppercase) |
| `--type-row-label` | {{spec:--type-row-label}} | `Row` label |
| `--type-row-sub` | {{spec:--type-row-sub}} | `Row` sub-label |
| `--type-row-value` | {{spec:--type-row-value}} | `Row` value (tabular) |
| `--type-stat` | {{spec:--type-stat}} | `StatStrip` number |
| `--type-stat-label` | {{spec:--type-stat-label}} | `StatStrip` label (uppercase) |

Spec is weight, size and line height; **mono** marks JetBrains Mono, everything else is Space Grotesk.

The components set their own type from a third group of role tokens, so the scale describes what actually renders. Line height is fixed, so a control is the same height whatever the host app's inherited line-height (a Tailwind preflight sets 1.5).

| Token | Spec | Role |
|---|---|---|
| `--type-button` | {{spec:--type-button}} | `Button` md |
| `--type-button-sm` | {{spec:--type-button-sm}} | `Button` sm |
| `--type-input` | {{spec:--type-input}} | `Input`, `Select`, `Textarea`; the `Checkbox` label |
| `--type-segment` | {{spec:--type-segment}} | `Segmented` option |
| `--type-segment-sm` | {{spec:--type-segment-sm}} | `Segmented` option, sm |
| `--type-segment-sub` | {{spec:--type-segment-sub}} | `Segmented` option sub-label |
| `--type-chip` | {{spec:--type-chip}} | `Chip` (uppercase, `--tracking-caps`) |
| `--type-chip-display` | {{spec:--type-chip-display}} | `Chip mono={false}` |
| `--type-tile-label` | {{spec:--type-tile-label}} | `StatTile` label (uppercase, `--tracking-label`) |
| `--type-tile-value` | {{spec:--type-tile-value}} | `StatTile` number |
| `--type-tile-sub` | {{spec:--type-tile-sub}} | `StatTile` sub-line |
| `--type-message-title` | {{spec:--type-message-title}} | `Banner` and `ErrorState` title, `Toast` message, `Popover` title |
| `--type-message` | {{spec:--type-message}} | `Banner` and `ErrorState` sentence |
| `--type-page-sub` | {{spec:--type-page-sub}} | `PageHeader` sub-line |
| `--type-tab` | {{spec:--type-tab}} | `TabBar` label |

Data (numbers, codes, deltas) goes in `--font-mono` with `font-variant-numeric: tabular-nums`; everything a person reads goes in `--font-display`. Pair mono values with `--tracking-caps` / `--tracking-stat` where the components already do.
