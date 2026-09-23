---
category: Components
---

# Elevation — the two things that float

The system is flat. A card is `surface` with a 1px `border` on a tinted `bg`, and that contrast is the only depth there is. Two components break the plane, and they are the only consumers of the shadow tokens.

| Component | Where | Token |
|---|---|---|
| `Sheet` | Bottom edge, over live content: a map, a canvas, a video | `--shadow-sheet`, `--radius-xl` corners |
| `Popover` | Anchored to the control that opened it | `--shadow-popover` (the Toast's too) |

The shadow is load-bearing in both: it says the surface is above the content rather than printed on it. Nowhere else in the system gets one.

## Translucency

Translucency is spent twice, and on one argument: the content behind is live and still matters. Under a `Sheet` you are reading the list *and* watching the map; under the `TabBar` the list keeps moving, which is how you know there's more below (see [chrome](chrome.md)). **Vibrancy is a signal, not a texture.** A translucent panel over a static page is decoration, and decoration isn't what the material is for.

- The sheet never dims what's behind it. If the content behind doesn't matter, the panel should be a screen, a `Group` or a `Card` instead.
- `solid` gives the opaque version, for content that must stay legible over busy video.
- A reader who asks their system for reduced transparency gets the opaque version automatically. That's correct rather than degraded: an opaque panel over a map is still a panel above the map.
- The `TabBar` shares the recipe but not the shadow: it's part of the frame, not something floating above it, so the Sheet stays the one elevation.
- `.material-glass` carries the same recipe for app code that needs the material elsewhere.

## Focus and dismissal

| | `Sheet` | `Popover` |
|---|---|---|
| Modal | No: the content behind stays usable and reachable | No, but focus is trapped inside while it's open |
| Opening | Focus moves into it | Focus moves to its first control |
| Escape | Closes | Closes |
| Also closes on | Dragging the handle down past about a third of its height | A click outside, or its close button |
| Closing | Focus returns to where it was | Focus returns to the trigger |

A `Popover` holds anything: a filter, a short form, a menu built from `Row`s in a `Group`. When the choice is one of a short list, that's a menu — build it from Rows; when it's one of two to four peers that should always be visible, it's a `Segmented` and needs no popover at all.
