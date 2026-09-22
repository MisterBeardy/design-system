Select — pick one of a list, with the platform's own picker.

```jsx
<Field label="Distance unit">
  <Select value={unit} onChange={setUnit} options={[{ value: "mi", label: "Miles" }, { value: "km", label: "Kilometres" }]} />
</Field>

<Select aria-label="Sort" placeholder="Sort by" value={sort} onChange={setSort}
        options={["Newest", "Longest", "Most expensive"]} />
```

A native `<select>` underneath, so the open list is the platform's own: a
wheel on iOS, a sheet on Android, a menu on a desktop. It works with the
keyboard and in forms for free. Only the closed control is restyled.

Inside a `Field` it's drawn like a Row's value: mono, muted, right-aligned,
then a faint chevron. On its own it's boxed like `Input`, with a chevron-down.
`onChange` gets the new value, not the event.

Use it for five or more options, or a list that changes. Two to four peers,
always visible, is a `Segmented`. On and off is a `Switch`.

`placeholder` shows muted while nothing is chosen, and can't be picked again
once something is. On its own it needs an `aria-label`; in a Field, the
Field's label names it.
