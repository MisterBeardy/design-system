---
category: Colors
---
<!-- Generated from guidelines/src/status.md by scripts/build-guidelines.mjs, with values from tokens/*.css. Edit that file, not this one, then run npm run build. -->

# Status — success / warning / danger / info

Semantic colours for outcomes (success, warning, danger) and for information that isn't one (info), each in the same solid / soft / text structure as the accent slot. Unlike the accent, status tokens are **app-agnostic — never overridden**, so the same state reads identically across every app in the portfolio.

| State | Solid | Soft (chip bg) | Text (on soft) | Use for |
|---|---|---|---|---|
| success | `--success` | `--success-soft` | `--success-text` | PAID, DONE, positive delta |
| warning | `--warning` | `--warning-soft` | `--warning-text` | PENDING, LOW STOCK |
| danger | `--danger` | `--danger-soft` | `--danger-text` | OVERDUE, FAILED |
| info | `--info` | `--info-soft` | `--info-text` | NEW, BETA, a hint or a note: information, not an outcome |

Light values: `success oklch(0.58 0.13 150)`, `warning oklch(0.64 0.13 80)`, `danger oklch(0.55 0.18 25)`, `info oklch(0.58 0.12 235)` (each with matching soft/text; all themed for dark).

- Reach for status **only for real outcome states** — `accent`/`neutral` cover everything that isn't a genuine success/warning/danger. Don't use status tones decoratively.
- The soft/text pair is the `Chip` recipe: `<Chip tone="success">PAID</Chip>`. The solid is for `GlyphTile tone=…` and `Switch` (on = `--success`); what sits on a solid takes its on-colour (`--on-success`, `--on-warning`, `--on-danger`, `--on-info`: white in light, dark ink in dark, where every solid is too light for white).
- Status as text on the surface (a `StatStrip` delta) uses the `-text` token, not the solid: the solids are fills, and as 11px text they fall under 4.5:1.
- Note: warning (H80) sits near some brand hues (H70–75) — a warning chip and an accent chip can look like siblings in those apps. Acceptable; both mean "attention".
- **Info is not data colour 3 either.** `--info` (H235) sits 25° from the teal `--data-3` (H210). They mean different things (a note, a category) and rarely meet; where a chart and an info chip share a screen, rely on the chip's label and the legend, not the hue.
- **Info is not the accent.** `--info` is a blue at lower chroma than any app's accent. Where an app's accent is also a blue (H230–256), an info chip and an accent chip can look like siblings, so an info message always carries its label or the info icon (`Banner tone="info"` does), never the hue alone.
- **Accent beside warning.** An accent near the warning hue (H70–80: OneOfUs, IdleAirport) is hard to tell from `--warning` on a dark surface when the two sit side by side (a HUD). Don't rely on hue to tell them apart there: give the warning its icon or its word, and keep the solid accent for the one primary action, not for status.
