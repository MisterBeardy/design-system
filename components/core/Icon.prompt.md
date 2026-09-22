Icon — the house glyphs, drawn in the colour of whatever holds them.

```jsx
<GlyphTile tone="accent"><Icon name="ruler" size={13} /></GlyphTile>
<Button variant="ghost"><Icon name="plus" /> Add trip</Button>
<Icon name="alert" size={24} label="Sync failed" />
```

Sixteen glyphs on one 20×20 grid, with a 1.75 stroke and round caps and joins:
`check`, `close`, `plus`, `chevron-right`, `chevron-down`, `alert`, `info`,
`inbox`, `search`, `calendar`, `pin`, `map`, `bolt`, `ruler`, `thermometer`,
`trophy`. `ICON_NAMES` lists them. Use these before drawing your own, so the
same idea looks the same in every app. Never use an emoji instead.

Sizes, by where it sits:

- **13px** inside a 23px `GlyphTile`. The tile is the shape you notice; the
  glyph says which one it is.
- **16px** (the default) beside text: in a Button, a Chip, a line of copy.
- **20px** alone in a control, like an icon-only button.
- **24px** standing alone: an empty or error state, a heading.

The stroke scales with the size, so a small glyph reads lighter and a large one
heavier, like type. Don't thicken a small one to compensate.

It draws in `currentColor`. Inside a `GlyphTile` it takes the tile's on-colour
(`--on-accent`, `--on-success`, … `--on-data`), so it holds 3:1 in both
themes. Beside text it takes the text's colour. Set `color` on it, or on its
parent, only to follow a rule that already exists: `--text-muted` for a quiet
glyph, a status `-text` token in a message.

It's hidden from screen readers unless you give it a `label`. Give one only
when the glyph is the only thing saying what something is; when a word
beside it already says it, a label makes screen readers say it twice. An
icon-only button takes `aria-label` on the button, not a `label` on the icon.

The shapes live in `icons/*.svg`, which apps without React can use as files
(`@misterbeardy/design-system/icons/pin.svg`). To add one, draw it to the same
grid and add the file; `npm run build` rejects a glyph drawn off the house
style. See `guidelines/iconography.md`.
