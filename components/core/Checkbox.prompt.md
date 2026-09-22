Checkbox — tick to choose; it applies when the form is submitted.

```jsx
<Group header="Tags" footer="Business trips count toward mileage claims.">
  <Checkbox row label="Business trip" checked={biz} onChange={setBiz} />
  <Checkbox row label="Round trip" checked={round} onChange={setRound} />
</Group>

<Checkbox label="Email me a receipt" checked={receipt} onChange={setReceipt} />
```

**Checkbox or Switch?** A checkbox says "tick this, and it happens when you
submit". A switch says "this takes effect now". A form with a Save button uses
checkboxes; a settings screen that saves as you go uses Switches.

Still a real checkbox underneath, like `Switch`, so it keeps native keyboard
behaviour (Space toggles), focus and form semantics. The ring draws on the box.

Ticked, the box is `accent` with an `on-accent` tick: choosing is an
interactive act, and the accent marks interactive things. That clears 4.5:1
for every app in both themes. Unticked, it's a `text-muted` outline, 5.4:1 or
better on the surface.

`row` draws it as a row in a `Group`: the whole row toggles it, it's 44px tall
on a touch screen, and the separator insets to the label. On its own, give it
a `label`; `sub` adds one line saying what ticking it means. `disabled` fades
it to 50%.
