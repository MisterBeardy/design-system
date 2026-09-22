---
category: Iconography
---

# Iconography — the house glyphs

One small set, drawn the same way, used everywhere. Emoji are banned in UI chrome; glyphs are SVG, and these are the ones to reach for first.

| Rule | Value |
|---|---|
| Grid | 20×20 viewBox, shapes kept inside about 2px of the edge |
| Stroke | 1.75, `currentColor`, round caps and round joins, no fill |
| Fill | Only `currentColor` dots (the point of `alert` and `info`) |
| Shapes | `path`, `circle`, `rect`, `line` only |
| Names | Lower-case kebab-case, named for what it shows (`pin`), not what it does (`location`) |

## The set

`check` `close` `plus` `chevron-right` `chevron-down` `alert` `info` `inbox` `search` `calendar` `pin` `map` `bolt` `ruler` `thermometer` `trophy`

In React: `<Icon name="pin" />`. Without React: `icons/pin.svg` (exported as `@misterbeardy/design-system/icons/pin.svg`); it draws in the colour of the text around it.

## Sizes

| Size | Where |
|---|---|
| 13px | Inside a 23px `GlyphTile` |
| 16px | Beside text: Buttons, Chips, copy (the default) |
| 20px | Alone in a control: an icon-only button |
| 24px | Standing alone: empty and error states, headings |

The stroke scales with the size, so small glyphs read lighter and large ones heavier, like type. Never thicken a small glyph.

## Colour

A glyph takes the colour of whatever holds it. Inside a `GlyphTile` that's the tile's on-colour, which holds 3:1 on every fill in both themes. Beside text it's the text colour. Colour a glyph only by an existing rule: `--text-muted` for a quiet one, a status `-text` token inside a message. A glyph never carries a data colour or the accent on its own; that's the tile's job.

## Adding one

1. Draw it on the 20×20 grid, in the style above, as `icons/<name>.svg`.
2. Run `npm run build`. It checks the file against the house style, fails on anything drawn another way (a different viewBox or stroke, a `<text>`, a coloured fill), and regenerates the component's data and the `IconName` type.
3. Add a line to `CHANGELOG.md` under Added.

Add a glyph when a second app needs it. A glyph one screen needs can stay in that app until then.
