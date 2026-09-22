Sheet — a panel over live content.

```jsx
<Sheet open={open} onClose={() => setOpen(false)} title="Chargers nearby"
       trailing={<span style={{ font: "var(--text-row-value)", color: "var(--text-muted)" }}>3 within 2 mi</span>}>
  <Group>
    {chargers.map((c) => <Row key={c.id} label={c.name} sub={c.status} value={c.distance} chevron onClick={...} />)}
  </Group>
</Sheet>
```

**This is the system's one elevation, and its one translucent surface.** Use it
only where content behind it is live and still matters: a map, a canvas, a
video. Vibrancy is a signal, not a texture — a translucent panel over a
static page is decoration, and that content belongs in a `Group`, a `Card` or
a screen of its own.

It never dims what's behind it. The map stays visible and usable around the
sheet; that's the whole reason the sheet exists rather than a new screen.
It's `role="dialog"` but not modal, and focus isn't trapped, so a screen
reader can still reach the map.

It sits on the bottom edge, full width, with `--radius-xl` top corners and
`--shadow-sheet`. The shadow is load-bearing here: it says the sheet is above
the map rather than printed on it.

Opening moves focus into the sheet; closing puts it back where it was.
Escape closes it, and so does dragging the handle down past about a third of
its height — a shorter drag springs back. `grabber={false}` removes the
handle, and with it dragging, so give another way out when you do.

`height` is the resting height in px (340 by default), capped at 85vh; the
content scrolls inside. `solid` makes it opaque, for content that must stay
legible over busy video. A reader who has asked their system for reduced
transparency gets the opaque version anyway, which is correct rather than
degraded: an opaque panel over a map is still a panel above the map.
