Input — standard text field.

```jsx
<Input placeholder="Search…" />
```

Same radius/border/surface family as Card and Button so a form reads as one
system. It fills its container (border-box), so size it with the container, not
the input.

Built-in states, nothing to add per app: focus draws the system's 2px `--accent`
ring over the border, so the field keeps its size; `disabled` drops to 50%
opacity, the same as `Button`, `Row` and `Switch`.

Inside a `Field` row it's drawn `bare`: no border or fill, the value
right-aligned, because the Group is the box. Field sets that for you. On its
own, an invalid Input (`aria-invalid`) takes a 2px `--danger` border, the
weight as well as the colour saying something's wrong; put the words next to
it too.
