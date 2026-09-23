---
category: Colors
---

# High contrast — when the reader asks for more

A third theme, added beside light and dark rather than replacing either. It
applies by itself whenever the reader's system asks for more contrast
(`prefers-contrast: more`: "Increase contrast" on macOS and iOS, and the
equivalent elsewhere), in light and in dark. An app does nothing to support it
beyond pasting its current accent block, below.

It's the same warm palette, moved only as far as each role needs:

- **Every text colour reaches 7:1** on every surface it sits on. Large text
  (24px, or 18.66px bold) needs 4.5:1, and the accent-coloured stat numbers
  are the only text that relies on that.
- **Every border reaches 3:1**, so surfaces and controls are told apart by an
  edge, not by shade alone.
- **A status fill carries its glyph at 4.5:1**, above the 3:1 marks floor.
- **Ink, the surfaces and the data palette already pass**, so they don't move.

## What changes

| Token | Light | High contrast | Dark | High contrast, dark |
|---|---|---|---|---|
| `--text-muted` | `{{--text-muted}}` | `{{contrast:--text-muted}}` | `{{dark:--text-muted}}` | `{{contrast-dark:--text-muted}}` |
| `--border` | `{{--border}}` | `{{contrast:--border}}` | `{{dark:--border}}` | `{{contrast-dark:--border}}` |
| `--border-soft` | `{{--border-soft}}` | `{{contrast:--border-soft}}` | `{{dark:--border-soft}}` | `{{contrast-dark:--border-soft}}` |
| `--success` | `{{--success}}` | `{{contrast:--success}}` | `{{dark:--success}}` | `{{contrast-dark:--success}}` |
| `--warning` | `{{--warning}}` | `{{contrast:--warning}}` | `{{dark:--warning}}` | `{{contrast-dark:--warning}}` |
| `--warning-text` | `{{--warning-text}}` | `{{contrast:--warning-text}}` | `{{dark:--warning-text}}` | `{{contrast-dark:--warning-text}}` |
| `--accent` (default app) | `{{--accent}}` | `{{contrast:--accent}}` | `{{dark:--accent}}` | `{{contrast-dark:--accent}}` |
| `--accent-text` (default app) | `{{--accent-text}}` | `{{contrast:--accent-text}}` | `{{dark:--accent-text}}` | `{{contrast-dark:--accent-text}}` |
| `--hairline` | {{--hairline}} | {{contrast:--hairline}} | {{dark:--hairline}} | {{contrast-dark:--hairline}} |

Where a column repeats the one beside it, high contrast leaves that token
alone in that theme.

Beyond the tokens, three things change where shade was doing a border's job:

- **Separators are a full 1px**, so a Row's hairline reaches the 3:1 its
  colour is given.
- **The Segmented track gets an edge** in `--border`. It had none; its tint
  was the only thing marking it.
- **The Banner gets an outline** in its own text colour, which is already at
  7:1. Its tint was its only edge.

And translucency goes: the `Sheet` and `TabBar` turn opaque, as they do when the
reader asks for reduced transparency. Text on glass has no fixed contrast, only
whatever scrolls behind it, and this theme promises 7:1.

## Your app's accent

The accent is per app, so its high-contrast values are too:
`accentCssFor("<app-key>")` in `app-registry.js` prints them inside the same
block as the normal ones, in an `@media (prefers-contrast: more)` part. Paste
the whole block. An app's accent block comes after the package's CSS, so an
older block, without that part, overrides the package's high-contrast accent
and leaves the primary button's label at normal contrast.

High contrast moves every app's accent by the same amount, as the default
app's rows in the table show: the fill darkens in light so a white label
reaches 7:1, and lightens a touch in dark. `npm run check` holds every app in
the registry to 7:1 in both themes.

## What it doesn't cover

- **Forced colours** (Windows contrast themes, `forced-colors: active`)
  replace every colour with the system's own. That's a different mode, and the
  system's colours win there by design.
- **Disabled controls** are drawn at 50% opacity in every theme, and
  WCAG exempts them from contrast minimums. They stay that way here.

## Testing it

- Chrome and Edge: DevTools → Rendering → Emulate CSS media feature
  `prefers-contrast` → `more`.
- macOS: System Settings → Accessibility → Display → Increase contrast.
- In code, `npm run check` holds every value above to its target, for every
  app, in both themes.
