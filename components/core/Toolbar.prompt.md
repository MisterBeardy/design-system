Toolbar — the filters and secondary actions for a screen.

```jsx
<Toolbar label="Filter trips">
  <Segmented label="Range" options={ranges} value={range} onChange={setRange} size="sm" style={{ flex: 1 }} />
  <Button variant="ghost" size="sm" aria-label="Search"><Icon name="search" /></Button>
</Toolbar>
```

It sits loose on the page background between the header and the content, with
no surface and no border of its own, and it scrolls away with the list it
filters. Attaching it to the `PageHeader` would make a tall block of chrome
that's always there; these controls belong to the content, not to the app.

It brings nothing new to draw. The row is `Segmented`, `Button`, `Chip` and
`Switch`, composed by the app — the Toolbar is the spacing and the label.

Vertical padding only, so it lines up with the `Group`s in the same column
instead of double-padding the screen's gutter. More controls than fit scroll
sideways, with the scrollbar hidden: one control is always half-visible at the
edge, which is the affordance. `wrap` puts them on a second line instead, for
a wide screen.

`label` names the set for a screen reader. It's `role="group"`, not
`role="toolbar"`: that role promises arrow-key movement between the controls,
and the control most often in here is a `Segmented`, which is a radiogroup and
owns the arrow keys already.
