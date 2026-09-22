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
