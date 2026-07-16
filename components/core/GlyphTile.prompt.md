GlyphTile — the small filled square that leads a `Row`.

```jsx
<GlyphTile tone="accent"><MapPinIcon /></GlyphTile>
<GlyphTile color="#f59e0b"><TrophyIcon /></GlyphTile>   {/* data, not state */}
```

**This is where colour lives.** The alternative — letting the card carry it, as
a `bg-gradient-to-br from-blue-50` wash — is how you end up with every surface
shouting and none of it meaning anything. Moving colour onto a 23px tile lets
the surface stay quiet and gives the colour a job.

Two ways to colour one, and the difference is the whole point:

- `tone` — **semantic**, from the status tokens. Use it when the colour
  communicates *state*: success, warning, danger, or just accent/neutral.
  App-agnostic, so the same state reads the same way in every app.
- `color` — **categorical**, an escape hatch for colour that encodes *data*
  rather than state: per-category stat palettes, per-vehicle colours,
  achievement tiers. Data colour is sacred and never collapses into the accent,
  which is why it can't be expressed as a tone. Pass the category's own colour.
  Do **not** use it to hand-pick a prettier accent.

Children must be an SVG icon, not an emoji. Keep the icon around 12–14px inside
the default 23px tile — the tile is the shape you notice, the glyph just tells
you which one it is.
