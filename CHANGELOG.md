# Changelog

What changed in each release of `@misterbeardy/design-system`, newest first.
Apps pin a tag (`github:MisterBeardy/design-system#vX.Y.Z`): before moving to a
newer one, read the **Upgrading** notes of every release in between. Those are
the changes an app can see or has to act on.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Every pull request adds its line under **Unreleased**; a release moves them
under its version (see `CONTRIBUTING.md`).

## [Unreleased]

### Upgrading

**Moving from any 0.x version? Start with `UPGRADING-1.0.md`**, which
collects every step from v0.1.0 onwards, in order, marked by the version it
applies to. (#47)

- **Paste your accent block again.** `accentCssFor("<app-key>")` now prints
  a third part, `@media (prefers-contrast: more) { … }`, with your app's
  high-contrast accent. Your block comes after the package's CSS, so an old
  one without that part keeps your primary buttons at normal contrast when a
  reader asks for more. (#18)
- **Input and Textarea placeholders** are `--text-muted` instead of the
  browser's grey: warmer in light, lighter in dark, where the browser's grey
  was 3.2:1 on the surface, under the 4.5:1 floor. (#18)

The public API was reviewed as a whole before 1.0 (#46), and everything that
named one idea two ways now names it one way. Each change below is a rename:
nothing renders differently.

- **Type tokens are `--type-*`.** The 26 font shorthands move from `--text-*`
  to `--type-*`: `font: var(--text-body)` becomes `font: var(--type-body)`,
  and the same for `display`, `heading`, `subhead`, `label`, `row-label`,
  `row-sub`, `row-value`, `section`, `stat`, `stat-label`, `button`,
  `button-sm`, `input`, `segment`, `segment-sm`, `segment-sub`, `chip`,
  `chip-display`, `tile-label`, `tile-value`, `tile-sub`, `page-sub`, `tab`,
  `message-title` and `message`. `--text-ink` and `--text-muted` are colours
  and **don't change**. The old names still work, as aliases, until 2.0: to
  move now, replace every `var(--text-…)` in your CSS that isn't `--text-ink`
  or `--text-muted`.
- **The Google Fonts download has its own file, `tokens/fonts.css`**, along
  with `--font-display` and `--font-mono`. `tokens/typography.css` is now just
  the type scale and downloads nothing, so every app can import it. Apps that
  import `styles.css` see no change. Apps that import token files one by one
  should now import `typography.css` too: without it, since 0.4.0, Button,
  Chip, StatTile and every other component have fallen back to the page's
  font. Add `fonts.css` as well unless you host the fonts yourself, in which
  case keep setting the two families in your own CSS. If you copied the type
  tokens into your CSS by hand, delete the copy and import the file. Found by
  testing the 1.0 upgrade guide on idrovewhere.today (#47).
- **`PageHeader`:** `actions` → `trailing`, `subtitle` → `sub`.
- **`Banner`:** `onDismiss` → `onClose`, `dismissLabel` → `closeLabel`.
- **`Toast`:** `inline` → `fixed={false}`. The polarity flips: `fixed`
  defaults to `true`, as TabBar's does.
- **`StatStrip`:** `subTone: "muted"` → `subTone: "neutral"`. The type of a
  `stats` entry is `StatStripItem`, not `Stat`.
- **`Checkbox`:** `onChange` is required in the types, as Switch's is.
  A checkbox without one couldn't be ticked anyway.
- **`.material-glass` → `.ds-glass`**, the one public class that lacked the
  `ds-` prefix.

None of the renamed props is used by an app today; the type tokens are, in
about 20 places across two apps, and the aliases cover them.

### Added

- **A high-contrast theme.** When the reader's system asks for more contrast
  (`prefers-contrast: more`), the tokens move by themselves, in light and
  dark: every text colour to 7:1 on every surface it sits on (4.5:1 for large
  text), every border to 3:1, status fills to 4.5:1 under their glyphs, and
  separators to a full 1px. It's the same warm palette, moved only as far as
  each role needs; ink, the surfaces and the data palette already pass. The
  Segmented track and the Banner, told apart by shade alone before, get an
  edge, and the Sheet and TabBar turn opaque, since text on glass has no
  fixed contrast. Each app's accent gets a high-contrast value from the
  registry. `npm run check` holds all of it to target for every app in both
  themes, and `guidelines/contrast.md` documents it. Light and dark are
  unchanged. (#18)
- `guidelines/motion.md`: the four durations and three curves, what each is
  for, and why motion never carries meaning. Motion was the one token family
  with no guideline; the check below found it. (#44)

### Changed

- The guideline build now fails when a token in `tokens/*.css` is named by
  no guideline, and says which. It already caught a guideline stating a wrong
  value; this catches a token nobody documented, which is how `--type-page-sub`,
  `--type-tab` and the message roles each went unlisted for a release. It also
  filled the gaps it found: `--on-neutral` in the neutrals table, and the
  glass recipe's `--glass-blur` and `--glass-saturate` in the elevation
  guide. The deprecated `--text-*` aliases are exempt, with the reason in
  the script. (#44)
- The conventions header the Claude Design agent reads lists the chrome
  tokens (`--type-page-sub`, `--type-tab`, `--header-height`,
  `--tabbar-height`) and `--type-label`, names the Popover among the three
  things that carry a shadow, and describes what `_ds_bundle.css` holds as it
  is now. It reaches the project at the 1.0 sync. (#45)
- Every `label` that's read by screen readers but not shown now says so, in
  the same words, where it's declared (Segmented, Switch, Sheet, Popover,
  TabBar, Toolbar, Icon, Skeleton). Toast's `action` says why it's an object
  where Banner's and EmptyState's are nodes. (#46)
- Work now lands on `dev`, and `main` moves only at a major release: the
  next version on `main` is 1.0.0. Until then an app that needs something
  early can pin a pre-release tag on `dev` (`v1.0.0-beta.1`, …); pinning
  `v0.8.0` keeps working exactly as before. `CONTRIBUTING.md` has both
  routines, and CI runs on pushes to `dev` as well as `main`.

### Fixed

- `guidelines/elevation.md` still called the `Sheet` the one translucent
  surface; since 0.8.0 the `TabBar` is too, on the same argument, and
  `guidelines/chrome.md` already said so. It now says translucency is spent
  twice, and that the TabBar takes the recipe but not the shadow.

## [0.8.0] — 2026-09-23

Elevation and app chrome, and generated guidelines. (#11, #16, #20)

### Upgrading

- Nothing changes for existing code. This release adds components, tokens
  and documentation; no existing component, token or class behaves
  differently.
- The guidelines are still at `guidelines/*.md` and `guidelines/*.card.html`.
  They're now built from `guidelines/src/`, which the package also ships, so
  a copy of a guideline in an app should be taken from `guidelines/`, never
  `src/`: the sources hold `{{--token}}` placeholders instead of values.

### Added

- `Sheet` and `Popover`, the elevation vocabulary the tokens have described
  all along. `Sheet` is a panel over live content — a map, a canvas, a video:
  translucent, `--radius-xl` top corners, `--shadow-sheet`, and it never dims
  what's behind it. It isn't modal, so the content behind stays usable and
  reachable; Escape closes it, and so does dragging its handle down. `solid`
  and the reader's own reduced-transparency setting both give the opaque
  version. `Popover` is a small panel anchored to its trigger, with
  `--shadow-popover`, a focus trap, Escape, click-outside and focus returned
  to the trigger; it flips above or across when the viewport has no room.
  A new `guidelines/elevation.md` says what may float and when translucency
  is allowed. (#11)
- `PageHeader`, `Toolbar` and `TabBar` — the frame around the content, the
  level the kit had nothing for. `PageHeader` is one compact height and stays
  one: title centred, optional subtitle, one or two icon actions, sticky by
  default. `Toolbar` sits loose on the page background under it, with no
  surface of its own, and scrolls away with the list it filters; it's built
  from the controls the system already has. `TabBar` is bottom navigation with
  `--accent-text` on the current tab and nothing else, translucent on the same
  argument as the `Sheet` — the list runs under it and keeps moving. New
  tokens: `--header-height`, `--tabbar-height`, `--text-page-sub`,
  `--text-tab`. A new `guidelines/chrome.md` says which screens take which and
  how they compose with `Group`. (#16)

### Changed

- The guidelines are generated. `guidelines/*.md` and `guidelines/*.card.html`
  are now written by `npm run build` from `guidelines/src/`, with every token
  value filled in from `tokens/*.css`, and CI fails when they're out of date.
  They used to restate the values by hand in two forms, kept honest only by a
  note asking for both to be edited. Generating them also fixed the drift it
  was there to prevent: `type-scale.md` was missing `--text-message-title` and
  `--text-message` (added in 0.6.0), and `radius.md` still described
  `--radius-xl` as app-code-only after the `Sheet` started using it. Nothing an
  app imports changed. (#20)

## [0.7.0] — 2026-09-22

The house icon set, the form vocabulary, and a token audit. (#14, #15, #21)

### Upgrading

- **An `Input` marked `aria-invalid` now draws a 2px `--danger` border.**
  Before, the attribute changed nothing visually. An app that already sets it
  gets the error look for free; one that sets it on a field it doesn't mean to
  mark should stop setting it.
- Nothing else changes for existing code: the rest of this release is new
  components, new files and documentation.

### Added

- `Icon` and the house icon set: 16 glyphs (`check`, `close`, `plus`,
  `chevron-right`, `chevron-down`, `alert`, `info`, `inbox`, `search`,
  `calendar`, `pin`, `map`, `bolt`, `ruler`, `thermometer`, `trophy`) on a
  20×20 grid with a 1.75 stroke, drawn in `currentColor`. `<Icon name="pin" />`
  in React; `@misterbeardy/design-system/icons/pin.svg` without it.
  `ICON_NAMES` lists them and `IconName` types them. `icons/*.svg` is the
  single source: `npm run build` generates the component's data from it and
  fails on a glyph drawn off the house style. A new
  `guidelines/iconography.md` covers sizes, colour and adding one. (#15)
- The form vocabulary: `Field`, `Select`, `Textarea` and `Checkbox`. A form
  is a grouped list: each `Field` is a row in a `Group` with the label on the
  left and the control drawn bare on the right, and it wires the label,
  `aria-invalid` and `aria-describedby`. Errors turn the row `danger-text`
  with an alert glyph and a line saying how to fix it. `Select` is a native
  select. `Checkbox` is a real checkbox with an accent tick box, on its own
  or as a `row`. `Input` gains `bare`, and a 2px `--danger` border when
  `aria-invalid`. A new `guidelines/forms.md`; `npm run check` holds the
  checkbox outline and the invalid border at 3:1. (#14)

### Changed

- Every token with no component consumer now says what app code it's for,
  beside its definition: `--border-soft` (a quiet divider inside a card),
  `--radius-xl` (large panels), `--duration-fast`, `--duration-slow` and
  `--duration-slower`, and the glass and sheet-shadow tokens. None were
  removed: the apps use them. The readme says how to decide this for a new
  token. (#21)

### Fixed

- `guidelines/radius.md` gave `--radius-pill` as 9999px; it's 999px.

## [0.6.0] — 2026-09-22

Feedback and states, touch targets, and a changelog. (#12, #13, #17, #19)

### Upgrading

- **On touch screens, tappable Rows are 44px tall** (37.5px without a
  sub-label before). Mouse and trackpad are unchanged.
- Controls stacked closer than their 44px tap areas now overlap on touch:
  the later one takes the tap. Two small Buttons (33px) stacked need 11px
  between them.

### Added

- `CHANGELOG.md`, reconstructed back to 0.1.0, and a release routine in
  `CONTRIBUTING.md`. `npm run check` now fails when the package version has no
  entry here. (#19)
- On touch screens, every control takes taps across at least 44×44px: Button,
  Segmented options and the Switch through an invisible tap area, drawn at the
  same size; tappable Rows by growing to 44px. Before, only Input reached it:
  the Switch took taps across 23px, a small Button 34px, a Segmented option
  31px. (#17)
- `Banner` and `Toast`, for feedback. A Banner is an outcome that stays until
  it's dealt with, in its tone's `-soft` fill and `-text` ink: the one surface
  allowed a status tint. A Toast is a brief "that worked" over the page, one
  at a time, 5 seconds or 8 with an action, held while hovered or focused,
  announced through a live region. It's a surface card with a border and
  `--shadow-popover`. New type roles `--text-message-title` and
  `--text-message`. (#12)
- `Skeleton`, `EmptyState` and `ErrorState`, for loading, empty and failed
  content, and a "States and feedback" section in the readme saying which
  goes where (offline is a warning Banner). `npm run check` now also holds
  the Banner's text on its fill, and each app's Toast action, at 4.5:1. (#13)

## [0.5.0] — 2026-09-22

Accent contrast, on-colours and the data palette. (#8, #9, #10)

### Upgrading

- **Every app's light-theme accent is darker** (lightness 0.60 → 0.54), so its
  button label reaches 4.5:1. An app that sets its own accent should replace
  that block with the one `accentCssFor("<app-key>")` prints: the old values
  fail contrast and have no `--on-accent`.
- **Dark theme: labels and glyphs on coloured fills are now dark**, not white:
  the primary Button's label, every GlyphTile glyph, and the Switch knob when
  on.
- **StatStrip deltas** use the status `-text` colours instead of the solid
  fills, so they read darker in light and lighter in dark.
- **Data colour has a palette.** Replace hand-picked `GlyphTile color=` data
  colours with `data={1…6}`, in the order `dataOrderFor("<app-key>")` gives;
  chart series use `var(--data-1)` … `var(--data-6)`, counts
  `var(--ramp-1)` … `var(--ramp-7)`. `color=` still works, unchanged.

### Added

- On-colours: `--on-accent`, `--on-success`, `--on-warning`, `--on-danger`,
  `--on-neutral`. White in light, `#211f1c` in dark.
- The data palette `--data-1` … `--data-6` with `--on-data`: six category
  colours that stay distinguishable for colour-blind viewers, first slots most
  distinct.
- The sequential ramp `--ramp-1` … `--ramp-7`: a warm ink stepping only in
  lightness.
- `GlyphTile data={1…6}`.
- `accentTokensFor()`, `accentCssFor()`, `dataOrderFor()`, `DATA_SLOTS` and a
  `dataLast` field per app in `app-registry.js`.
- `npm run check` (118 checks, also in CI): the default accent matches the
  registry, and every label, glyph, data colour and ramp step meets its
  contrast and colour-blind separation floor, for every registered app.
- `guidelines/data.md` and its specimen card.

### Changed

- `accentFor()` uses lightness 0.54 for the light theme.
- `ADOPTING.md` tells apps to paste `accentCssFor` output instead of applying
  the formula by hand.

### Fixed

- `accentFor()` printed floating-point noise for some dark accents
  (`0.11900000000000001` for IdleAirport); it now rounds to four places.

## [0.4.0] — 2026-09-22

Correctness: states, types and consistency. (#2, #3, #4, #5, #6, #7)

### Upgrading

- **Controls in apps with a Tailwind preflight get 3–9px shorter.** Button,
  Chip, Input, Segmented and StatTile now fix their line height at 1.3 instead
  of inheriting the host's (Tailwind sets 1.5), so they're the same height in
  every app.
- **Secondary buttons are 2px shorter**, matching primary (40px).
- **Input now fits its container.** It overflowed by 30px without a host
  box-sizing reset; drop any workaround.
- **TypeScript now sees the prop types**, so code that leaned on untyped
  imports may surface type errors.
- A `className` on Row, Switch, Button or Input now adds to the component's
  own class instead of replacing it (which used to drop separators and focus
  rings).

### Added

- Focus rings on Button and Input, and disabled states that fade to 50% like
  Row and Switch.
- Eleven control and tile type tokens (`--text-button`, `--text-input`,
  `--text-chip`, `--text-segment`, `--text-tile-value` and the rest); the
  components use them instead of literal sizes.
- A `types` entry in `package.json`.
- CI that fails when the committed `dist/` doesn't match the sources.

### Changed

- `--row-inset` is derived with `calc()`, and Row moves it for a GlyphTile
  with its own `size`.
- Chip tracking is `--tracking-caps` (0.05em, was 0.04em).

### Fixed

- `readme.md` and `ADOPTING.md` still told Next.js apps to add
  `transpilePackages`, and the readme listed files that aren't in the repo.
- `index.d.ts` used the global `JSX` namespace, which `@types/react` 19
  removed.

## [0.3.0] — 2026-08-20

### Upgrading

- `transpilePackages` is no longer needed. It's harmless if it stays.
- **Known issue: TypeScript lost the package's prop types in this release.**
  Moving the entry to `dist/index.js` left no types beside it, and the package
  declared no `types` entry. Fixed in 0.4.0.

### Changed

- Components ship compiled to plain JS (`dist/index.js`, ESM, React external)
  instead of raw `.jsx`. Next on DollarDeploy declined to transpile the `.jsx`
  and failed with "Module parse failed: Unexpected token".

### Added

- Markdown guidelines (`guidelines/*.md`) beside the specimen cards, and the
  inputs for syncing the system to the lookwhatibuilt.today Claude Design
  project (`.design-sync/`).

## [0.2.1] — 2026-07-16

### Changed

- `ADOPTING.md` teaches the grouped-list language: the primitives in the
  import example, `core.css` required when cherry-picking token files, font
  variables declared on `<html>`, data colour never bridged to the accent, and
  a kickoff prompt that converts one screen.

## [0.2.0] — 2026-07-16

The Apple HIG grouped-list language becomes the default UX.

### Upgrading

- Apps that cherry-pick token files instead of importing `styles.css` must
  also import `core.css`, or Row separators and focus rings don't render.
- Group's corner is 12px (was 14px) and GlyphTile is 23px (was 22px).

### Added

- Group, Row, GlyphTile, Segmented, Switch and StatStrip.
- `components/core/core.css`: Row hairlines, hover, focus rings and the
  box-sizing the rows depend on.
- Tokens: `--hairline`, `--glyph-size`, `--row-pad-x`, `--row-gap`,
  `--row-inset`, `--radius-card`, the grouped-list type roles, a motion scale
  that honours `prefers-reduced-motion`, and `.material-glass`.

### Fixed

- The default accent shipped lightness 0.58 while the registry computed 0.60;
  it now matches the registry.

## [0.1.2] — 2026-07-04

### Fixed

- `components/core/index.d.ts`: TypeScript couldn't resolve the package's
  exports at all.

## [0.1.1] — 2026-07-03

### Added

- `ADOPTING.md`: per-stack wiring, dark-mode and framework bridging, accent
  registration and a kickoff prompt for coding agents.

## [0.1.0] — 2026-07-03

### Added

- The system, imported from the Claude Design project: tokens, specimen
  cards, Button, Card, Chip, Input and StatTile, and the accent registry.
- Status tokens (`--success`, `--warning`, `--danger` with `-soft` and
  `-text`) and the matching Chip tones.
- npm packaging as `@misterbeardy/design-system`.

### Fixed

- `styles.css` imports `typography.css` first, so its Google Fonts `@import`
  stays valid.

[Unreleased]: https://github.com/MisterBeardy/design-system/compare/v0.8.0...HEAD
[0.8.0]: https://github.com/MisterBeardy/design-system/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/MisterBeardy/design-system/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/MisterBeardy/design-system/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/MisterBeardy/design-system/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/MisterBeardy/design-system/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/MisterBeardy/design-system/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/MisterBeardy/design-system/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/MisterBeardy/design-system/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/MisterBeardy/design-system/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/MisterBeardy/design-system/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/MisterBeardy/design-system/releases/tag/v0.1.0
