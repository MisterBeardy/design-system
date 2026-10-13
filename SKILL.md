---
name: unified-app-theme-design
description: Use this skill to generate well-branded interfaces and assets across the MisterBeardy app portfolio (iDroveWhere, WashMyCar, OneOfUs.beer, That'll Be 5 Bucks, Idle Airport Manager, ParametricChaos, WhatWillIThinkOfNext, lookwhatibuilt.today), either for production or throwaway prototypes/mocks.
user-invocable: true
---

Read the readme.md file within this skill, and explore the other available files.
Its **Visual language** section is the important one: settings-, list-, and
stats-shaped UI is built from `Group` / `Row` / `GlyphTile` / `Segmented` /
`Switch` / `StatStrip`, not from bespoke cards. Each has a `.prompt.md` next to
it in `components/core/` stating when it applies.

Three rules worth knowing before you design anything here: colour lives on the
glyph tile and never on the card surface; data colour never collapses into the
accent; translucency is only for panels floating over live content.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets
out and create static HTML files for the user to view.

**Every mockup gets the mockup picker.** Any mock or throwaway prototype with
open design choices presents each choice as an A / B (or A / B / C) row in
`components/mockup/mockup-picker.js`, on **one live page**, starting on the
option you recommend (`recommended: true`). Never hand over options as separate
static pages, or as screenshots alone. Each button sets an attribute on
`<html>`, and the mockup's CSS draws that option from it; the picker adds a
Theme row, puts the state in the URL so a link reproduces it, and hides with
`?mock=off` for clean screenshots. Paste the script into the page's `<head>`
(or `<script src>` it) and mount it:

```html
<script>
  MockupPicker.mount({ title: "Overview reskin", decisions: [
    { key: "accent", label: "Accent", options: [
      { value: "125", label: "125 olive", recommended: true },
      { value: "45",  label: "45 orange" } ] } ] });
</script>
<style>:root[data-accent="45"] { --accent: oklch(0.62 0.15 45); }</style>
```

The picker has **Notes** and **Save**, so the person can say "saved" instead
of retyping their choices. Publish a mockup as a private artifact with
`capabilities: {db: {}, user: {}}`, so Save writes `mockup-saves/latest` (and
a timestamped `mockup-saves/<id>` history) to the artifact's db. When they say
"saved", read `mockup-saves/latest` (and the history) with ArtifactData rather
than asking them to retype anything. From a local file, Save downloads
`mockup-choices-<slug>-<timestamp>.json` instead (and copies it): read the
newest one in `~/Downloads`.

**Publishing a mockup as a claude.ai Artifact.** The viewer's CSP breaks
mockups silently:
- Author ONE html file with no doctype/`html`/`head`/`body` tags: start with
  `<title>`, then `<style>`; the publisher adds the skeleton.
- Every image is a `data:` URI (images from other hosts are blocked with no
  error); downscale first, e.g. macOS `sips -Z 160`.
- Only Google Fonts stylesheets and scripts from cdnjs/jsdelivr/unpkg load:
  inline the picker.
- The page never gets a query string, only a bare `#token`: deep links use
  `#name`; the picker's `?key=` sync works in-page but not in shared links.
- Downloads and `alert`/`confirm` are blocked in the viewer, so Save relies on
  the db: declare `capabilities: {db: {}, user: {}}`.
- Combine several mockup screens into one page with an in-page view switch, so
  one db holds the saves.

The rule and the details are in `guidelines/mockups.md`; the full config is in
`components/mockup/MockupPicker.prompt.md`. If working on production
code, copy the token CSS files and component source and read the rules here to
become an expert in designing with this system.

When adding a new app to the portfolio: open `app-registry.js`, pick (or compute)
an open accent hue slot, add a row, and build real screens from that app's actual
source where possible — don't invent placeholder content when the real repo is
available.

To show an app off on lookwhatibuilt.today (a new app, a design-system
upgrade, or a new feature), follow `PRESSKIT.md`.

If the user invokes this skill without other guidance, ask them what they want to
build or design, ask some questions, and act as an expert designer who outputs
HTML artifacts _or_ production code, depending on the need.
