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
than about half the screen, use a `Sheet`: a popover that fills the screen is
a screen.

## Editing live content: beside it, with a pointer

A popover under a gear covers the thing the gear changes. When the person
edits something that redraws as they go, pass `anchor` (the panel, card or
widget being edited) and `pointer`:

```jsx
const widget = useRef(null);

<div ref={widget} className={open ? "ds-editing" : undefined}> … the widget … </div>

<Popover open={open} onClose={() => setOpen(false)} title="Widget options"
         anchor={widget} pointer topInset={56}
         trigger={<Button variant="ghost" size="sm" icon="settings" onClick={() => setOpen(!open)} />}>
  …
</Popover>
```

It opens beside the anchor, to the right, or the left when there's no room,
lined up with the anchor's top, and it follows the anchor on scroll and resize.
The pointer aims at the anchor and stays aimed when the panel is clamped to the
viewport. Pressing the trigger again closes it; focus returns to the trigger.

Mark the target with `ds-editing` (2px `--accent` outline, faint `--accent-soft`
wash; it sets `box-shadow`, so a target that has its own shadow loses it), so it's clear which of several similar widgets the panel changes.

Below `narrow` (700px), or when neither side of the anchor has room for the
panel, it becomes a bottom sheet up to 52vh and the page scrolls to keep the anchor just above it. Give
`topInset` the height of any sticky bar.

Without `anchor`, over live content use this; a `Sheet` hides part of the page
and loses the link between the control and what it controls.

If `anchor` never resolves (its ref is never attached), the panel gives up after
about a dozen frames and sits under the trigger. A string `width` should be one
the panel can hold on both layouts; a `style.width` overrides `width`.
