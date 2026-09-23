---
category: Foundations
---

# Motion — a response, or taking its time

Four durations and three curves. The scale is the one iDroveWhere converged on by usage, not an invention.

| Token | Value | Use it for |
|---|---|---|
| `--duration-fast` | {{--duration-fast}} | A press, a tooltip appearing |
| `--duration-base` | {{--duration-base}} | Hover and colour changes, disclosure chevrons. What the components use |
| `--duration-slow` | {{--duration-slow}} | A panel or sheet sliding in, a progress bar |
| `--duration-slower` | {{--duration-slower}} | The long, ambient things: a route drawing, a fill |
| `--ease-out` | `{{--ease-out}}` | Most transitions: Row and Checkbox row hover, Segmented, the Switch track |
| `--ease-in-out` | `{{--ease-in-out}}` | Things that loop or return, like the Skeleton's pulse |
| `--ease-out-expo` | `{{--ease-out-expo}}` | Anything that travels a distance: a sheet, the Switch knob, a chevron. Decisive, with no overshoot |

- **What the person triggered should feel like a response**: `--duration-fast` or `--duration-base`. **What the app decided on its own can take its time**: `--duration-slow` or `--duration-slower`.
- **Motion is decoration on a state change that has already happened**, never the thing that communicates it. So a reader who has asked their system for reduced motion loses nothing: under `prefers-reduced-motion` every duration collapses to about zero, and the Skeleton stops pulsing.
- Write `transition: background-color var(--duration-base) var(--ease-out)`, never a raw `200ms`, so that setting reaches your own transitions too.
