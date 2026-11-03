---
category: Colors
---
<!-- Generated from guidelines/src/map.md by scripts/build-guidelines.mjs, with values from tokens/*.css. Edit that file, not this one, then run npm run build. -->

# Map base layer — derive it from the neutrals

An app whose screen is mostly a basemap (a HUD, a trip map, a dispatch view) draws land, water, boundaries and labels itself. Don't pick those by eye: derive them from the tokens, so the map follows light, dark and high contrast with the rest of the screen. The card shows the recipe in both themes.

| Layer | Light | Dark | Why |
|---|---|---|---|
| Land | `--bg` | `--surface` | The page colour in light, so the map sits in the screen; one step up in dark, so land reads as the lit thing |
| Water | 24% `--info`, 76% `--bg` | 62% `--bg`, 38% black | **A cool tint in light.** Pure warm neutral for water makes coastlines vanish (land and water are both paper); the blue tint is what separates them. In dark the water is the deepest layer, darker than land, so no tint is needed |
| Coastline and boundaries | `--border` | `--border` | A hairline that reads on both land colours, and it strengthens to 3:1 under high contrast |
| Labels | `--text-muted` | `--text-muted` | With a halo (a stroke of the land colour behind the text), so a label stays legible over land and water alike |
| Overlays on the map (a HUD panel, a legend) | `--surface` at 80–90% | `--surface` at 80–90% | Translucent, so the map shows through; the text on them is `--text-ink`, which clears 4.5:1 on solid `--surface` but not automatically over a translucent one, so check it over the darkest and lightest areas of the map |
| Marks (a pin, a route) | `--accent` | `--accent` | The accent is for the one thing the screen is about; the surfaces above never use it |

Mix with `color-mix(in oklch, …)`, not by hand-picking a hex, so the water follows the tokens when they move.

- **Check both themes and high contrast.** The recipe is for the default look; under `prefers-contrast: more` the boundary and label strengthen on their own, and the water mix should be looked at once.
- **Information on a map is `--info`, not the accent.** A layer note or a "new" mark is information: give it a label or an icon, since `--info` is the same blue the light water is tinted with and the hue alone won't separate them.
- **Accent beside warning on a map.** If an app's accent is near the warning hue (70–80), an accent pin beside a warning mark is hard to tell apart on dark; pair either with an icon or a label, never the hue alone.
