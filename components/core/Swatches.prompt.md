Swatches — pick one colour from a few.

```jsx
<Group header="Livery">
  <Row label="Fleet colour" sub={current.label} />
  <div style={{ padding: "0 var(--row-pad-x) 12px" }}>
    <Swatches label="Fleet colour" value={livery} onChange={setLivery}
      options={[{ value: "night",   label: "Tower Night", color: "#0a1c2e" },
                { value: "sunrise", label: "Sunrise",     color: "#ffd24a" },
                { value: "twotone", label: "Two-tone",
                  color: "linear-gradient(135deg, #0a1c2e 50%, #ffd24a 50%)" }]} />
  </div>
</Group>
```

For a choice that **is** a colour: a theme preset, a livery, a label or
calendar colour. Anything else that's one of a few is a `Segmented`.

**Say the chosen colour's name in text.** Put it in the Row above as `sub`, or
as `value` when the swatches sit in the Row's `trailing`. A ring marks the
chosen chip, but a name is what a person with colour blindness, or a screen
reader, can use; every chip also carries its name as its accessible label and
tooltip, which is why `label` is required on each option.

**Up to three fit in a Row's `trailing`.** More go on their own line under the
Row, as above, and wrap. Past a dozen, it's a screen of its own.

`color` is any CSS background, so a two-tone preset is a gradient. These are
the app's own colours, not tokens: they're not themed and they don't follow
the data palette rules. A white chip on a white card and a near-black one on
the dark surface keep a faint edge, which strengthens in high contrast.

It's a `radiogroup`: Tab lands on the chosen chip, the arrow keys move and
choose, Home and End go to the ends, and disabled options are skipped. On a
touch screen the chips grow to 32px, 12px apart, so every one takes taps
across 44px without taking its neighbour's.
