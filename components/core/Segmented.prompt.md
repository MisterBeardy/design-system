Segmented — pick exactly one of a few.

```jsx
<Segmented label="Range" value={range} onChange={setRange}
  options={[{ value: "30d", label: "30 days" },
            { value: "1y",  label: "Year" },
            { value: "all", label: "All time" }]} />
```

Replaces tab rows, year pickers, date-range pickers — anything structurally "one
of a few". Why it earns its place: the pattern it replaces (a row of bordered
buttons, or two stacked option cards) spends far more width and height to say
the same thing, and reads as several decisions instead of one.

**Three or four options, maximum.** It stays legible down to about four; past
that use a `Row` with a chevron into a real picker rather than squeezing. If the
labels are truncating, you've already passed the limit.

Rendered as a `radiogroup`, not a row of buttons, so arrow keys and screen
readers treat it as the single choice it is. `label` is the group's accessible
name and isn't optional.

Not a toggle. Two options that are on/off ("Enabled" / "Disabled") is a
`Switch`; two options that are peers ("Miles" / "Kilometres") is this.
