---
category: Colors
---

# Accent — the per-app colour slot

The accent is a **slot**, not a fixed colour. Every consuming app overrides four tokens with its own hue; everything else in the system stays identical across the portfolio.

| Token | Role | Default (iDroveWhere blue, H256) |
|---|---|---|
| `--accent` | Solid fill — primary buttons, active states, the one headline metric | `oklch(0.54 0.15 256)` |
| `--accent-soft` | Tinted fill — soft buttons, accent chips (lower emphasis) | `oklch(0.95 0.03 256)` |
| `--accent-text` | Readable accent text on soft/surface backgrounds | `oklch(0.42 0.15 256)` |
| `--on-accent` | The label on a solid accent (primary button) and the glyph on an accent tile | `#ffffff` light, `#211f1c` dark |

- Apps paste the block `accentCssFor("<key>")` prints from `app-registry.js` — the registry is the single source of truth, and `npm run check` fails if the default in `tokens/colors.css` drifts from it.
- Dark mode has its own accent values (lighter L, slightly reduced chroma), and so a dark label: white can't reach 4.5:1 on any dark-theme accent.
- Every app's button label clears 4.5:1 in both themes, and `npm run check` keeps it that way. Greens and cyans (roughly H156–226) need chroma of 0.13 or less to pass at the light lightness of 0.54.
- **Reserve the accent for meaning:** the primary action, the active selection, the single hero number. Spread it across a screen and it stops signalling importance. Status colours (success/warning/danger) are separate and never overridden — see [status](status.md).
