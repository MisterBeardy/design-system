---
category: Spacing
---

# Radius — the corner scale

| Token | Value | Used on |
|---|---|---|
| `--radius-sm` | 6px | `GlyphTile` |
| `--radius-md` | 10px | Inputs, buttons, segmented track |
| `--radius-lg` | 14px | `Card`, `StatTile` |
| `--radius-xl` | 20px | Large panels |
| `--radius-pill` | 9999px | `Chip`, `Switch` track |
| `--radius-card` | 12px | The grouped `Group` card |

`--radius-card` is **a role, not a step in the scale** — it's specifically the grouped-list card corner, sized to sit right with the inset rows. Use the named role tokens rather than picking a number, so corners stay consistent as the scale evolves.
