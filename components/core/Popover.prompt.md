Popover — a small panel anchored to the control that opened it.

```jsx
const [open, setOpen] = useState(false);

<Popover open={open} onClose={() => setOpen(false)} title="Filter trips"
         trigger={<Button variant="secondary" size="sm" onClick={() => setOpen(!open)}>Filter</Button>}>
  <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
    <Segmented label="Range" value={range} onChange={setRange} options={ranges} />
    <Checkbox label="Only unbilled" checked={unbilled} onChange={setUnbilled} />
  </div>
</Popover>
```

It holds anything: a filter, a short form, a menu made of `Row`s in a
`Group`. It floats, so it takes `--shadow-popover` — the same shadow as the
`Toast`, and the system's only other one. Everything that doesn't float stays
flat.

Give it the `trigger`; it adds `aria-expanded` and `aria-haspopup`, and you
own the trigger's `onClick`. The panel sits under the trigger, aligned to its
left edge, and flips above it or across to the right edge when the viewport
has no room.

Opening moves focus to its first control. **Focus stays inside while it's
open** — it's a small surface, and tabbing out into the page behind loses
people. Escape closes it, and so does a click outside or the close button;
closing puts focus back on the trigger.

A `title` adds a header row with that close button. Without one there's no
header, which suits a plain menu.

`width` is 300 by default and never exceeds the viewport. For anything taller
than about half the screen, or anything over live content, use a `Sheet`
instead: a popover that fills the screen is a screen.
