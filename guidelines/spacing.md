---
category: Spacing
---

# Spacing — a 4px base scale

Six steps on a 4px base. Use the tokens for layout gaps and padding so rhythm stays consistent across apps.

| Token | Value |
|---|---|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |

Reach for a token before a raw pixel value — `gap: var(--space-3)`, `padding: var(--space-5)`. Row and Group internal spacing is already handled by the components (`--row-gap`, `--row-pad-x`); you space the *layout around* them.
