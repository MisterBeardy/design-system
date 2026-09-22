Textarea — multi-line text.

```jsx
<Group header="Notes">
  <Field label="Notes" help="Optional. Only you see these.">
    <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything worth remembering" />
  </Field>
</Group>
```

Input's surface, border and radius, a looser line (1.45) for prose, three
rows tall by default, and it only resizes downward. Inside a `Field` it's
bare and full width, with the Field's label above it. On its own it's boxed
and needs an `aria-label` or a visible label.

A placeholder is an example, not a label: it disappears as soon as someone
types.
