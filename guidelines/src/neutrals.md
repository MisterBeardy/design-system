---
category: Colors
---

# Neutrals — the warm greyscale

A warm (not blue-grey) neutral scale, tinted so surfaces read as calm paper rather than cold UI chrome. Six steps, from page background to ink, themed light and dark.

| Token | Role | Light | Dark |
|---|---|---|---|
| `--bg` | Page background — **never pure white** | `{{--bg}}` | `{{dark:--bg}}` |
| `--surface` | Card / row / input surface | `{{--surface}}` | `{{dark:--surface}}` |
| `--surface-alt` | Recessed surface — segmented track, chips | `{{--surface-alt}}` | `{{dark:--surface-alt}}` |
| `--border` | 1px hairline borders and dividers | `{{--border}}` | `{{dark:--border}}` |
| `--border-soft` | For app code: a divider inside a card between loose content (1.17:1, decoration only) | `{{--border-soft}}` | `{{dark:--border-soft}}` |
| `--text-muted` | Secondary text, labels, values | `{{--text-muted}}` | `{{dark:--text-muted}}` |
| `--text-ink` | Primary text | `{{--text-ink}}` | `{{dark:--text-ink}}` |

The whole system depends on `--bg` being tinted: a card is just `--surface` + a 1px `--border` sitting on `--bg`, and that contrast is the only depth there is (no shadows). Dark mode is `[data-theme="dark"]` on a root element.
