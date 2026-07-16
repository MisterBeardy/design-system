StatStrip — a divided row of headline numbers, at the top of a `Group`.

```jsx
<Group header="This year">
  <StatStrip stats={[
    { label: "Miles",    value: "12,480", accent: true },
    { label: "Counties", value: "37" },
    { label: "Charging", value: "$412", sub: "-8%", subTone: "success" },
  ]} />
  <Row label="Every trip" chevron />
</Group>
```

`StatTile` is the standalone version — a bordered tile, one metric, for admin
KPI strips. This is the **grouped** version: several metrics sharing one card,
separated by hairlines. It reuses StatTile's typography (value in
`--font-display`, label in uppercase `--font-mono`) so the two read as the same
object, and deliberately doesn't re-implement its border — the enclosing Group
owns that.

**A number is the hero; its label is furniture.** That's the whole reason this
exists: it replaces the run-on summary strip ("546 mi total · 8h 27m drive · 3
counties"), where every number was the same size as its label and none of them
could be found at a glance.

Only **one** metric on a screen should set `accent`, so the accent keeps meaning
"this is the important number". Three or four stats per strip — past that the
values truncate and you've built a table with extra steps.
