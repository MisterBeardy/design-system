MockupPicker — every open design choice in a mockup, A against B, on one live page.

```html
<link rel="stylesheet" href="…/styles.css">
<script src="…/components/mockup/mockup-picker.js"></script>
<script>
  MockupPicker.mount({
    title: "Overview reskin",
    decisions: [
      { key: "accent", label: "Accent", options: [
        { value: "125", label: "125 olive", recommended: true },
        { value: "45",  label: "45 orange" } ] },
      { key: "wordmark", label: "Wordmark", options: [
        { value: "grotesk", label: "Space Grotesk", recommended: true },
        { value: "serif",   label: "Instrument Serif" } ] },
    ],
  });
</script>
<style>
  :root[data-accent="45"] { --accent: …; }           /* option B, in CSS */
  :root[data-wordmark="serif"] .wordmark { font-family: "Instrument Serif"; }
</style>
```

For mockups and throwaway prototypes only, never an app. The rule it serves
is in `guidelines/mockups.md`.

Each decision is a row of buttons; pressing one sets `data-<key>` (or `attr`)
on `<html>`, and the mockup's own CSS draws each option from that attribute.
The page starts on each row's `recommended` option (else its first), marked
with a dot. A **Theme** row (Light / Dark / System) comes first and drives the
system's own `data-theme`; `theme: false` leaves it out.

**Config.** `title`; `decisions[]` of `{ key, label, attr?, default?,
options: [{ value, label, recommended? }], onChange? }`; `theme` (`false`, or
`{ default: "dark" }`); `collapsed`; `keys: false` to turn the shortcuts off;
`onChange(key, value, state)`. A `mockup-picker:change` event fires on
`document` too. `MockupPicker.get()` returns the state, `.set(key, value)`
changes it, `.unmount()` removes it. Or put the config as JSON in
`<script type="application/json" data-mockup-picker>` and it mounts itself.

**The URL is the state.** Every row reads `?<key>=` on load and writes it back
with `history.replaceState`, so a link reproduces exactly what you were
looking at. `?mock=min` starts it as a one-line pill (with the state as
letters, `A B A`), `?mock=off` hides it for clean screenshots; the choices in
the URL still apply.

**Keys**, when focus isn't in a text field: `A` / `B` / `C` pick that option
on the active row (the focused one, else the last one used), `X` flips it
between its first two, `M` collapses it.

Load it in `<head>`: it sets the attributes straight away, so the first paint
is already the chosen state, and adds the panel once `<body>` exists. It
injects its own CSS, which reads only the tokens, so `styles.css` (or the
token files) must be on the page. It's always a dark panel, whatever the
page's theme, so it never reads as part of the design. At phone width (600px
and under) it becomes a bottom sheet, with a spacer at the end of `<body>` so
the page can scroll clear of it; it never scrolls the page sideways.

Buttons carry `aria-pressed`, each row is a `group` labelled by its name, and
the recommended option says so to a screen reader. On a touch screen every
button takes 44px.
