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

Light values: `success oklch(0.58 0.13 150)`, `warning oklch(0.64 0.13 80)`, `danger oklch(0.55 0.18 25)` (each with matching soft/text; all themed for dark).

- Reach for status **only for real outcome states** — `accent`/`neutral` cover everything that isn't a genuine success/warning/danger. Don't use status tones decoratively.
- The soft/text pair is the `Chip` recipe: `<Chip tone="success">PAID</Chip>`. The solid is for `GlyphTile tone=…` and `Switch` (on = `--success`).
- Note: warning (H80) sits near some brand hues (H70–75) — a warning chip and an accent chip can look like siblings in those apps. Acceptable; both mean "attention".
