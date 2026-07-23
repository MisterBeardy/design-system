---
category: Colors
---

# Accent — the per-app colour slot

The accent is a **slot**, not a fixed colour. Every consuming app overrides three tokens with its own hue; everything else in the system stays identical across the portfolio.

| Token | Role | Default (iDroveWhere blue, H256) |
|---|---|---|
| `--accent` | Solid fill — primary buttons, active states, the one headline metric | `oklch(0.6 0.15 256)` |
| `--accent-soft` | Tinted fill — soft buttons, accent chips (lower emphasis) | `oklch(0.95 0.03 256)` |
| `--accent-text` | Readable accent text on soft/surface backgrounds | `oklch(0.42 0.15 256)` |

- Apps set these from `app-registry.js` (`accentFor(hue, chroma)`) — the registry is the single source of truth, and the default in `tokens/colors.css` mirrors it exactly.
- Dark mode has its own accent values (lighter L, slightly reduced chroma) — every token is themed.
- **Reserve the accent for meaning:** the primary action, the active selection, the single hero number. Spread it across a screen and it stops signalling importance. Status colours (success/warning/danger) are separate and never overridden — see [status](status.md).
