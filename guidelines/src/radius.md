---
category: Spacing
---

# Radius — the corner scale

| Token | Value | Used on |
|---|---|---|
| `--radius-sm` | {{--radius-sm}} | `GlyphTile` |
| `--radius-md` | {{--radius-md}} | Inputs, buttons, segmented track |
| `--radius-lg` | {{--radius-lg}} | `Card`, `StatTile` |
| `--radius-xl` | {{--radius-xl}} | `Sheet` top corners; for app code, other large panels (a modal, a hero card) |
| `--radius-pill` | {{--radius-pill}} | `Chip`, `Switch` track |
| `--radius-card` | {{--radius-card}} | The grouped `Group` card |

`--radius-card` is **a role, not a step in the scale** — it's specifically the grouped-list card corner, sized to sit right with the inset rows. Use the named role tokens rather than picking a number, so corners stay consistent as the scale evolves.
