---
category: Foundations
---

# Grouped lists — the default UX

The grouped-list vocabulary (`Group` + `Row` + `GlyphTile` + `Segmented` + `Switch` + `StatStrip`) is how this system builds settings, summaries, and detail screens. Assemble it the way it's meant to be used, and follow these rules.

- **Cards group, they don't decorate.** Related rows live in one `Group` card. The system is **flat — no shadow**; depth is the `--surface`/`--bg` contrast plus a 1px border. If a card looks like it's floating, fix the page background (`--bg`), don't add a shadow.
- **One idea per row.** The reading order is glyph → label → value → chevron. A row that needs two sentences is two rows, or a row with a chevron into a screen.
- **The tile carries colour, never the card surface.** `GlyphTile` is where colour lives: `tone` when colour means *state* (semantic status tokens), `color` when it means *data* (per-category hues). Keeping colour off surfaces is what keeps it meaningful.
- **Hairlines inset to the label's leading edge** (`--row-inset`) so the list reads as tidy rather than a ladder of full-width rules — and the last separator is suppressed so the Group's own border closes the list. The inset is arithmetic on the default `--glyph-size` (23px); a custom tile size needs a matching `--row-inset`.
- **The number is the hero, its label is furniture.** In `StatStrip`/`StatTile`, only **one** metric per screen sets `accent`, so the accent keeps meaning "this is the important number".
- **Vibrancy is a signal, not a texture.** Translucency (`.material-glass`) is the one sanctioned elevation — a panel over live content — never decoration.

The Group has no padding of its own — rows own their padding so separators can run edge to edge. Don't wrap rows in a padded div to "fix" spacing; it breaks the hairline inset.
