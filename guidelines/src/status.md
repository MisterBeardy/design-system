---
category: Colors
---

# Status — success / warning / danger

Semantic outcome colours, each in the same solid / soft / text structure as the accent slot. Unlike the accent, status tokens are **app-agnostic — never overridden**, so the same state reads identically across every app in the portfolio.

| State | Solid | Soft (chip bg) | Text (on soft) | Use for |
|---|---|---|---|---|
| success | `--success` | `--success-soft` | `--success-text` | PAID, DONE, positive delta |
| warning | `--warning` | `--warning-soft` | `--warning-text` | PENDING, LOW STOCK |
| danger | `--danger` | `--danger-soft` | `--danger-text` | OVERDUE, FAILED |

Light values: `success {{--success}}`, `warning {{--warning}}`, `danger {{--danger}}` (each with matching soft/text; all themed for dark).

- Reach for status **only for real outcome states** — `accent`/`neutral` cover everything that isn't a genuine success/warning/danger. Don't use status tones decoratively.
- The soft/text pair is the `Chip` recipe: `<Chip tone="success">PAID</Chip>`. The solid is for `GlyphTile tone=…` and `Switch` (on = `--success`); what sits on a solid takes its on-colour (`--on-success`, `--on-warning`, `--on-danger`: white in light, dark ink in dark, where every solid is too light for white).
- Status as text on the surface (a `StatStrip` delta) uses the `-text` token, not the solid: the solids are fills, and as 11px text they fall under 4.5:1.
- Note: warning (H80) sits near some brand hues (H70–75) — a warning chip and an accent chip can look like siblings in those apps. Acceptable; both mean "attention".
