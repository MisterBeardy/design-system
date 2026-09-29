---
category: Foundations
---
<!-- Generated from guidelines/src/mockups.md by scripts/build-guidelines.mjs, with values from tokens/*.css. Edit that file, not this one, then run npm run build. -->

# Mockups — every open choice, A against B, on one live page

A mockup exists to get a decision made. When it has open choices (which
accent, which wordmark, compact or comfortable), the person deciding needs to
see each option on the real layout, flip between them, and send a link to
exactly the state they mean. Separate pages or a row of screenshots can't do
that: the eye compares two pictures from memory, and nobody can say "B for the
accent, but A for the wordmark".

## The rule

Every mockup or throwaway prototype with open design choices:

- **Presents each choice as a row in the mockup picker** (`components/mockup/mockup-picker.js`):
  A / B, or A / B / C, never more than a handful of options per row. One row
  per decision, all on **one live page**.
- **Starts on the recommended option** of every row, marked `recommended: true`.
  If you have no recommendation, you haven't finished designing that row.
- **Never presents options only as separate static pages or screenshots.**
  Screenshots are fine as a record (take them with `?mock=off` and the state in
  the URL), but the live page with the picker is the deliverable.
- Keeps the **Theme row** unless the mockup is one theme by design: every
  option has to hold up in light and dark.
- Draws each option in the mockup's CSS from the attribute the picker sets on
  `<html>` (`:root[data-accent="45"] { … }`). Option A is the page's default
  styling; B and C are overrides. No option lives in JavaScript if CSS can do it.

A mockup with no open choices still gets the picker, with just its Theme row:
the same panel, the same links, the same way to take a clean screenshot.

## How to include it

It's one dependency-free file that injects its own CSS and reads only the
tokens, so the page needs `styles.css` (or the token files) too.

- **In this repo, or with the package installed**: `<script src>` it from
  `components/mockup/mockup-picker.js`, or import it for its side effect
  (`import "@misterbeardy/design-system/mockup-picker"`), which sets
  `window.MockupPicker`.
- **In a single-file artifact**: paste the file's contents into a `<script>`
  in `<head>`. Artifacts can't load it from GitHub.

Put it in `<head>`: it sets the attributes before the first paint and adds the
panel once `<body>` exists.

```html
<script src="components/mockup/mockup-picker.js"></script>
<script>
  MockupPicker.mount({
    title: "Overview reskin",
    decisions: [
      { key: "accent", label: "Accent", options: [
        { value: "125", label: "125 olive", recommended: true },
        { value: "45",  label: "45 orange" } ] },
      { key: "p3", label: "P3", options: [
        { value: "info",    label: "info-blue", recommended: true },
        { value: "neutral", label: "neutral" } ] },
    ],
  });
</script>
<style>
  :root[data-accent="45"] { --accent: oklch(0.62 0.15 45); }
  :root[data-p3="neutral"] .p3 { background: var(--surface-alt); color: var(--text-muted); }
</style>
```

The same object as JSON in `<script type="application/json" data-mockup-picker>`
mounts itself, for a page with no other script. `MockupPicker.prompt.md` has
the full config.

## Using it

| | |
|---|---|
| Share a state | Copy the URL. `?theme=dark&accent=45&p3=neutral` reproduces it |
| Compare fast | `A` / `B` pick on the active row, `X` flips it between its first two |
| Get it out of the way | The `–` button or `M` collapses it to a pill; `?mock=min` starts it collapsed |
| Clean screenshot | `?mock=off` hides it; the choices in the URL still apply |
| Phone | It's a bottom sheet at 600px and under, and never scrolls the page sideways |

The panel is always dark, in either theme, and set in mono: tooling, not
design. Don't restyle it to match the mockup; the point is that nobody
mistakes it for part of the page.
