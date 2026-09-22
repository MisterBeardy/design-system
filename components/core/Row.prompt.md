Row — one line inside a `Group`.

```
[glyph]  Label                    value  ›
         Sub-label
```

```jsx
<Row glyph={<GlyphTile tone="success">{icon}</GlyphTile>}
     label="Charging" sub="Default for new trips"
     trailing={<Switch checked={on} onChange={setOn} label="Charging" />} />
```

**One idea per row.** If a row needs two sentences to explain itself, it's two
rows, or it's a row with a chevron into a screen. The sub-label is a qualifier,
not a paragraph.

`value` is for data (mono, tabular, muted). `trailing` is for controls. A row
with both is fine; a row with neither is a label with a chevron, which is also
fine.

Pass `onClick` only when the row actually navigates or acts — it becomes a real
`<button>`, keyboard-reachable and focusable. A decorative row that renders as a
button is a keyboard trap that goes nowhere. On a touch screen a row with
`onClick` is at least 44px tall (Apple's minimum row height): rows stack edge to
edge, so it grows rather than borrowing tap area from its neighbours.

The separator is drawn on the row and inset to the label's leading edge, so it
starts where the text starts rather than cutting under the glyph. That inset is
the whole reason grouped lists read as tidy; without it you get a ladder of
full-width rules. It comes free: `--row-inset` is derived from the row padding,
the tile size and the gap, and a `GlyphTile` passed with its own `size` moves
the inset with it. A glyph that isn't a `GlyphTile` (or one wrapped in another
component) gets the default inset; set `--row-inset` on the row's `style` if it
needs another.
