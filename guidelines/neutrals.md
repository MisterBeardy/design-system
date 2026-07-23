---
category: Colors
---

# Neutrals — the warm greyscale

A warm (not blue-grey) neutral scale, tinted so surfaces read as calm paper rather than cold UI chrome. Six steps, from page background to ink, themed light and dark.

| Token | Role | Light | Dark |
|---|---|---|---|
| `--bg` | Page background — **never pure white** | `#f6f5f3` | `#211f1c` |
| `--surface` | Card / row / input surface | `#ffffff` | `#2a2723` |
| `--surface-alt` | Recessed surface — segmented track, chips | `#f1ede6` | `#322f2a` |
| `--border` | 1px hairline borders and dividers | `#e2ded7` | `#3a352f` |
| `--border-soft` | Even quieter divider | `#f1ede6` | `#332f29` |
| `--text-muted` | Secondary text, labels, values | `#6c675f` | `#a39c91` |
| `--text-ink` | Primary text | `#1c1b19` | `#f3f1ed` |

The whole system depends on `--bg` being tinted: a card is just `--surface` + a 1px `--border` sitting on `--bg`, and that contrast is the only depth there is (no shadows). Dark mode is `[data-theme="dark"]` on a root element.
