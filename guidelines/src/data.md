---
category: Colors
---

# Data colour — categories, series and counts

Data colour says **what** something is: which category, which series, how many. It never says how something went (that's status) and never borrows the accent (that's for interaction). Keeping the three apart is what lets each of them mean something.

## The palette: six categories

| Token | Light | Dark | Use it for |
|---|---|---|---|
| `--data-1` | `{{--data-1}}` ochre | `{{dark:--data-1}}` | The first series or category |
| `--data-2` | `{{--data-2}}` plum | `{{dark:--data-2}}` | The second |
| `--data-3` | `{{--data-3}}` teal | `{{dark:--data-3}}` | The third |
| `--data-4` | `{{--data-4}}` indigo | `{{dark:--data-4}}` | The fourth |
| `--data-5` | `{{--data-5}}` rust | `{{dark:--data-5}}` | The fifth |
| `--data-6` | `{{--data-6}}` violet | `{{dark:--data-6}}` | The sixth |
| `--on-data` | `{{--on-data}}` | `{{dark:--on-data}}` | A glyph or label on any data fill |

- **Use the slots in order.** They're ordered so the first ones are the most distinct: slots 1 and 2 are 22.6 apart (OKLab × 100) for every kind of vision, and the first three stay at least 13.8 apart. A two-series chart uses 1 and 2.
- **Each app lists the slot nearest its accent last.** `dataOrderFor("<app-key>")` in `app-registry.js` gives the order, so an app's first series never reads as its accent.
- **Six is the limit.** Past six categories, label the series, group the small ones into "Other", or use a table. More colours can't stay distinguishable.
- **There's no green, on purpose.** Green collapses into red for red-green colour blindness (about 1 in 12 men), so a "green = good" chart belongs to the status colours, not the data palette.
- **Tiles:** `<GlyphTile data={3}>`, which takes `--on-data` for its glyph. Keep `GlyphTile color=` for a colour the data already owns, like a car's real paint colour.
- **Charts:** fill bars, lines and legend swatches with `var(--data-n)`. Every slot reads as a mark on the surface at 3:1 or better in both themes, and carries its glyph at 3:1.

All six stay at least 13.3 apart for normal and red-green colour-blind vision and 10.8 for blue-yellow, in both themes. `npm run check` fails if a change breaks that.

## The ramp: counts and density

`--ramp-1` (least) to `--ramp-7` (most): a warm ink, one hue stepping only in lightness.

- For anything with an order: visit frequency, heat maps, counts per day. Not for categories: that's the palette.
- More always means more contrast with the page: the ramp darkens in the light theme and lightens in the dark theme, so the same token reads right in both.
- Neighbouring steps are at least 10 apart for every kind of vision. A single hue stepping in lightness is the one ramp colour blindness can't flatten.
- It's warm and near-neutral, so keep it away from UI greys that carry meaning: pair a ramp with a legend ("fewer" to "more"), and don't use it for chrome.
