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
`onChange(key, value, state)`; `save` (`true` by default, `false`, or
`{ collection: "my-saves" }`). A `mockup-picker:change` event fires on
`document` too. `MockupPicker.get()` returns the state, `.set(key, value)`
changes it, `.save()` saves it, `.notes()` returns the notes, `.unmount()`
removes it. Or put the config as JSON in
`<script type="application/json" data-mockup-picker>` and it mounts itself.

**Notes and Save.** Under the rows is a **Notes** field (it grows to about
four lines, and keeps a draft in `localStorage`) and a **Save** button, so the
person deciding can say "saved" instead of retyping their choices. Save
records one document:

```json
{ "mockup": "Overview reskin", "url": "https://…?accent=45",
  "savedAt": "2026-09-30T18:32:10.123Z",
  "choices": { "theme":  { "value": "dark", "label": "Dark", "option": "B", "recommended": false },
               "accent": { "value": "45", "label": "45 orange", "option": "B", "recommended": false } },
  "notes": "B for the accent, but the wordmark still feels heavy",
  "viewer": "u_…" }
```

- **Published as a claude.ai artifact** with `capabilities: {db: {}, user: {}}`,
  it goes to the artifact's db twice: `mockup-saves/<id>` (the id is the ISO
  time with `:` as `-`, so the history sorts) and `mockup-saves/latest`.
  `viewer` is the viewer's `user.id()`, or `null`. The db's default rules
  already say what this needs (everyone who can open the page reads, a
  Contributor or above writes); to pin that down, declare
  `db: { rules: [{ path: "mockup-saves", read: "view", write: "interact" }] }`.
  Claude then reads `mockup-saves/latest`, and the history, with ArtifactData.
- **With no db** (a local file, `window.claude` missing, `claude.use("db")`
  resolving `null`, a view-only viewer, or a write that fails), it copies the
  same JSON to the clipboard and downloads it as
  `mockup-choices-<slug>-<timestamp>.json`, and says which of the two
  happened.

After a save the button reads **Saved ✓ 14:32** (local time); while the
choices or notes differ from that save, an **unsaved changes** marker shows
beside it. Errors show inline, in the panel, and nothing throws. Collapsed,
the pill shows a dot when there are notes. `save: false` leaves Notes and
Save out entirely. A `mockup-picker:save` event fires on `document` with
`{ result, data }`.

**The URL is the state.** Every row reads `?<key>=` on load and writes it back
with `history.replaceState`, so a link reproduces exactly what you were
looking at. `?mock=min` starts it as a one-line pill (with the state as
letters, `A B A`), `?mock=off` hides it for clean screenshots; the choices in
the URL still apply.

**Keys**, when focus isn't in a text field: `A` / `B` / `C` pick that option
on the active row (the focused one, else the last one used), `X` flips it
between its first two, `M` collapses it, `S` saves.

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
