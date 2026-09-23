---
category: Spacing
---
<!-- Generated from guidelines/src/radius.md by scripts/build-guidelines.mjs, with values from tokens/*.css. Edit that file, not this one, then run npm run build. -->

# Radius — the corner scale

| Token | Value | Used on |
|---|---|---|
| `--radius-sm` | 6px | `GlyphTile` |
| `--radius-md` | 10px | Inputs, buttons, segmented track |
| `--radius-lg` | 14px | `Card`, `StatTile` |
| `--radius-xl` | 20px | `Sheet` top corners; for app code, other large panels (a modal, a hero card) |
| `--radius-pill` | 999px | `Chip`, `Switch` track |
| `--radius-card` | 12px | The grouped `Group` card |

`--radius-card` is **a role, not a step in the scale** — it's specifically the grouped-list card corner, sized to sit right with the inset rows. Use the named role tokens rather than picking a number, so corners stay consistent as the scale evolves.
