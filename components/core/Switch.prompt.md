Switch — a toggle that takes effect now.

```jsx
<Row label="Show chargers"
     trailing={<Switch checked={on} onChange={setOn} label="Show chargers" />} />
```

The rule for choosing it: **a checkbox says "tick this to submit later", a
switch says "this takes effect now".** In settings-shaped UI the latter is
almost always true, so this replaces the raw `<input type="checkbox">` there.
If there's a Save button, you wanted a checkbox.

Still a real checkbox underneath, so it keeps native keyboard behaviour, focus,
and form semantics for free.

The track is `--success` when on, not `--accent` — on/off is a state, and state
is app-agnostic. A switch that turned the app's accent colour would make "on"
mean something different in each app.

Give it a `label` unless it sits in a `Row` whose label already names it; a
switch with no accessible name is a control that screen readers announce as
nothing at all.
