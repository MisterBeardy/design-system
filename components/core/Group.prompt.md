Group — a grouped inset card holding related rows.

```jsx
<Group header="Units" footer="Applies to every trip, past and future.">
  <Row glyph={<GlyphTile tone="accent">{icon}</GlyphTile>} label="Distance" value="Miles" chevron />
  <Row label="Temperature" value="°F" chevron />
</Group>
```

Cards group; they don't decorate. A Group means "these things belong together" —
if you can't say why the rows are in the same box, they shouldn't be. Two short
Groups beat one long one: the header is where the grouping earns its keep.

Deliberately **flat** — no shadow. Depth here comes from the border plus the
`--surface`/`--bg` contrast, which only exists because the page behind it is
tinted (`--bg`, never white). If a Group ever looks like it's floating on a
white page, the fix is the page background, not a shadow. The one sanctioned
elevation in the system is a panel over live content — see `.material-glass`.

The Group has no padding of its own: rows own their padding so their separators
can run edge to edge. Don't wrap rows in a padded div to "fix" that — you'll
break the hairline inset that makes the list read as a list.
