# Adopting the design system in an app

Step-by-step mechanics for wiring `@misterbeardy/design-system` into any
project — existing or brand new, any stack. Written for humans and AI coding
agents alike. `readme.md` owns the rules and philosophy; read it first. This
file only covers the how.

## 0. Locate and install the package

- Design system checked out as a sibling folder
  (`~/projects/MisterBeardy/design_system`): install `file:../design_system`
  while actively iterating — it's a live symlink, edits show up instantly.
- Otherwise: `npm install github:MisterBeardy/design-system#<latest-tag>`.
- **Deploys must always use a pinned tag.** `file:` dependencies break cloud
  builds (the sibling folder doesn't exist there). Switching is one command:
  `npm install github:MisterBeardy/design-system#vX.Y.Z`.

## 1. Register the app's accent

Every app owns exactly one hue. Check `app-registry.js` in this package:

- App already has a row → use its hue/chroma.
- New app → compute open slots (`suggestOpenSlots()` in `app-registry.js`),
  pick one, add a row, and commit + push + tag the registry change so the
  hue wheel stays accurate for the next app.
- App has a real pre-existing brand color → keep it as the accent (see
  readme), add a row with its hue and a `note`.

## 2. Wire by stack

**React + bundler (Next.js, Vite, …)**
- Install per step 0.
- Next.js only: add `transpilePackages: ["@misterbeardy/design-system"]`
  (components ship as untranspiled `.jsx`).
- Import `"@misterbeardy/design-system/styles.css"` once at the app root,
  before app-local styles.
- Use the primitives:
  `import { Button, Card, Chip, Input, StatTile } from "@misterbeardy/design-system"`.
  Usage rules are in the `.prompt.md` beside each component source.

**Non-React JS app with a build step**
- Install and import `styles.css` the same way.
- Replicate component shapes from `guidelines/*.card.html` and the inline
  styles in `components/core/*.jsx`, always via tokens.

**Static HTML / no npm**
- Vendor `styles.css` + `tokens/*.css` into the project with a header
  comment: `/* vendored from @misterbeardy/design-system vX.Y.Z — do not
  hand-edit; refresh from the repo */`.
- This is the one sanctioned copy. Recording the version is what makes it
  refreshable instead of drift.

## 3. Accent override

In the app's root stylesheet, set exactly these six values from the app's
registry row (formula lives in `tokens/colors.css` and the readme):

```css
:root {
  --accent:       oklch(0.60 C H);
  --accent-soft:  oklch(0.95 0.03 H);
  --accent-text:  oklch(0.42 C H);
}
[data-theme="dark"] {
  --accent:       oklch(0.74 max(C×0.85, 0.09) H);
  --accent-soft:  oklch(0.32 0.07 H);
  --accent-text:  oklch(0.85 0.10 H);
}
```

Never override neutrals or the status tokens — those are identical across
the portfolio by design.

## 4. Dark mode

Tokens flip under `[data-theme="dark"]` on `<html>`. If the app already has
a dark-mode mechanism (Tailwind `.dark` class, `prefers-color-scheme`, a
theme picker), have that mechanism **also set `data-theme="dark"` on
`<html>`** — do not duplicate token values under a different selector.

## 5. Bridging an existing UI framework

If the app already uses Tailwind, shadcn/ui, MUI, CSS modules, etc., don't
rip it out. Point the framework's theme layer at the tokens so existing
components inherit them:

- **Tailwind v4**: `@theme { --color-bg: var(--bg); --color-surface:
  var(--surface); … }`
- **shadcn/ui**: map its CSS vars (`--background`, `--foreground`,
  `--primary`, `--border`, …) to the tokens in `globals.css`.
- **MUI / styled-components**: feed the CSS vars into the theme object.

New and touched UI migrates toward the system primitives. Migration is
always incremental — screens convert as they're touched, never a mass
restyle pass.

## 6. Status + content rules (all stacks)

- Outcome states use `--success` / `--warning` / `--danger` (+ `-soft` /
  `-text`) — never ad-hoc greens and reds. React: `<Chip tone="success">PAID</Chip>`.
- Status renders as short uppercase mono chips, not verbose copy.
- Labels are literal; no emoji in UI chrome; numbers set in JetBrains Mono;
  at most one solid-accent action per view.

## 7. Record it in the app's CLAUDE.md

Add this section, filled in:

```markdown
## Design system
Uses @misterbeardy/design-system (github.com/MisterBeardy/design-system).
- Installed via: <file:../design_system | github:…#vX.Y.Z>
- Pre-deploy: switch to the latest pinned tag (file: breaks cloud builds)
- Accent: hue <H>, chroma <C> (key "<app-key>" in app-registry.js)
- Dark mode bridge: <how data-theme="dark" gets set>
- Framework bridge: <none | tailwind @theme | shadcn var map | …>
- Before UI work, read node_modules/@misterbeardy/design-system/readme.md
  and the .prompt.md beside each component used.
- Never copy tokens; never hardcode a color that exists as a token.
```

## 8. The universal kickoff prompt

Paste this into a session in any app, any stack:

```text
Adopt our shared design system in this project. It lives at
../design_system if that folder exists, otherwise
github:MisterBeardy/design-system. Read readme.md (rules) and ADOPTING.md
(mechanics) inside it, detect this app's stack, and follow the matching
ADOPTING.md path end to end — install, accent registration, dark-mode and
framework bridging, and the CLAUDE.md section. Do the wiring now; restyle
screens incrementally as they're touched, not in a mass pass.
```
