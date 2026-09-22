GlyphTile — the small filled square that leads a `Row`.

```jsx
<GlyphTile tone="accent"><Icon name="pin" size={13} /></GlyphTile>
<GlyphTile data={2}><Icon name="trophy" size={13} /></GlyphTile>   {/* data, not state */}
```

**This is where colour lives.** The alternative — letting the card carry it, as
a `bg-gradient-to-br from-blue-50` wash — is how you end up with every surface
shouting and none of it meaning anything. Moving colour onto a 23px tile lets
the surface stay quiet and gives the colour a job.

Three ways to colour one, and the difference is the whole point:

- `tone` — **semantic**, from the status tokens. Use it when the colour
  communicates *state*: success, warning, danger, or just accent/neutral.
  App-agnostic, so the same state reads the same way in every app.
- `data={1…6}` — **categorical**, a slot of the data palette (`--data-1` …
  `--data-6`), for colour that encodes *data* rather than state: category
  breakdowns, series, per-vehicle colours. Data colour is sacred and never
  collapses into the accent, which is why it can't be expressed as a tone.
  Assign slots in the app's order (`dataOrderFor(key)` in `app-registry.js`):
  1, 2, 3 … with the slot nearest its accent last. Past six categories, label
  them rather than reaching for more colours.
- `color` — an escape hatch for a colour the data **already owns**: a car's
  real paint colour, a team's kit. It isn't themed and its glyph stays white,
  so use `data` whenever the colour is just a way to tell categories apart.
  Do **not** use either to hand-pick a prettier accent.

Children must be an SVG icon, not an emoji: an `Icon` from the house set at
13px, or your own glyph drawn the same way. Keep it around 12–14px inside the
default 23px tile — the tile is the shape you notice, the glyph just tells
you which one it is. Draw it in `currentColor`: a `tone` tile colours it with
that fill's on-colour (`--on-accent`, `--on-success`, … — white in light, dark
in dark), so it holds 3:1 in both themes; a `data` tile uses `--on-data` the
same way. A `color` tile's glyph is always white, so a raw colour has to be
dark enough to carry it.
