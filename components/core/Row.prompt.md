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

Text that doesn't fit is cut with an ellipsis and its full string goes in the
`title`, for hover. A touch screen has no hover, so pass `wrap` where a sub-label
can run long (an empty-state hint, a status line): label and sub-label then flow
onto more lines and the row grows. Leave it off for short, fixed labels, so a
list stays one even height.

**A long description goes behind `help`.** For a setting that needs a sentence or
two of explanation, keep a one-line `sub` and pass the rest as `help`: an ⓘ
button after the control opens the full text under the row, closed again by the
same button. It suits a settings list better than a wrapping sub-label (every
row grows) or a paragraph under every row (the list stops being scannable).

```jsx
<Row label="Auto-save" sub="Every 5 minutes"
     trailing={<Switch checked={on} onChange={setOn} label="Auto-save" />}
     help="Saves a copy to this device while you work. It never replaces the file on the server until you press Save." />
```

A setting a person must not skim past keeps its warning in the `sub` ("One way,
can't be undone"), not behind the button. `help` is ignored on a row with
`onClick`, which is already a button; put the explanation on the screen it opens.

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
