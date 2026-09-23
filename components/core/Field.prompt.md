Field — one labelled control as a row in a Group.

```jsx
<Group header="Trip">
  <Field label="Trip name"><Input value={name} onChange={(e) => setName(e.target.value)} /></Field>
  <Field label="Distance unit">
    <Select value={unit} onChange={setUnit} options={[{ value: "mi", label: "Miles" }, { value: "km", label: "Kilometres" }]} />
  </Field>
  <Field label="Odometer at start" help="From the dashboard, whole miles." error={odoError}>
    <Input value={odo} inputMode="numeric" onChange={(e) => setOdo(e.target.value)} />
  </Field>
</Group>
```

**Forms are grouped lists.** Related fields go in one `Group`, with a header
naming the group, the same as settings. The Group is the box, so each control
inside a Field is drawn bare: no border or fill, the value right-aligned where
a Row's value would be. The label sits on the left in `type-row-label`.

Field does the wiring you'd otherwise forget. It gives the control an id, ties
the label to it, and points `aria-describedby` at the help or error line.
`error` sets `aria-invalid` too. Pass exactly one `Input`, `Select` or
`Textarea` as its child.

**Errors.** `error` replaces `help` under the row. The label, the value and
the line under it turn `danger-text`, and an alert glyph follows the value, so
an error never relies on colour alone. Say what's wrong and how to fix it, in
the person's words: "Numbers only: take out the km." Show it when the person
leaves the field or submits, not on every keystroke.

**A Textarea** puts its label above it, small and muted, and takes the row's
full width: prose needs the room.

A Field row is 44px tall on a touch screen, and the whole row draws the focus
ring. Pair fields with `Checkbox row` rows for yes-or-no choices, and put the
one primary action (`Button`, full width on a phone) after the last Group.
