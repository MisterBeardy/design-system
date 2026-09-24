# Upgrading to 1.0

Everything an app on any 0.x version has to do to reach 1.0, in one place.
It's collected from the **Upgrading** notes of every release in
`CHANGELOG.md`, so nothing here is new; it's just the whole route at once
instead of eight stops.

Most of it is looking, not editing. For an app that only uses the tokens and
a few components, the edits come down to three things: a couple of CSS imports, the
accent block, and a search-and-replace on the type tokens.

## 1. Find where you're starting

Your version is the tag your `package.json` pins:

```json
"@misterbeardy/design-system": "github:MisterBeardy/design-system#v0.3.0"
```

Every step below says which versions it applies to, like **(before 0.5.0)**.
Do a step only if your version is older than the one it names. An app on
v0.6.0 skips everything marked before 0.6.0 or earlier.

## 2. Move the pin

Install the new tag by name. This one command both installs 1.0 and rewrites
the pin in `package.json`:

```sh
npm install github:MisterBeardy/design-system#v1.0.1
```

(`pnpm add` or `yarn add` with the same argument, if you use those.)

Don't only edit the tag in `package.json` and run `npm install`. For a
GitHub dependency, npm keeps the commit recorded in `package-lock.json`,
reports "up to date", and leaves you on the old version. Check what you
have with `npm ls @misterbeardy/design-system`: it should say `1.0.1`, or a
later 1.x.

To try 1.0 before it's released, install a beta instead (`#v1.0.0-beta.1`);
the steps are the same.

## 3. Build setup

- **(before 0.3.0) `transpilePackages` is no longer needed.** The package
  ships compiled JavaScript (`dist/index.js`) instead of raw `.jsx`. A
  `transpilePackages: ["@misterbeardy/design-system"]` entry in your Next
  config is harmless; remove it when convenient.
- **(before 0.4.0) TypeScript can see the prop types now.** Code that relied
  on untyped imports may report type errors after the upgrade. They're real:
  fix them rather than cast them away. From v0.1.2 to v0.3.0, TypeScript
  either couldn't resolve the package or saw no types at all.

## 4. CSS imports

If you import the barrel, `@misterbeardy/design-system/styles.css`, this
whole step is already done: skip to 5. It's for apps that import the token
files one by one, usually because a strict `font-src` CSP or Turbopack won't
take the Google Fonts download.

- **(before 1.0) Import `typography.css`.** It's the type scale every
  component sets its text from. Until 1.0 it also carried the Google Fonts
  download, so apps that couldn't take that left it out, and since 0.4.0
  their Buttons, Chips and StatTiles have been falling back to the page's
  font: a StatTile's number renders at your body size instead of 24px bold.
  The download now lives in `tokens/fonts.css`, and `typography.css`
  downloads nothing:

  ```css
  @import "@misterbeardy/design-system/tokens/typography.css";
  ```

  If you host the fonts yourself, don't import `fonts.css`. Keep declaring
  `--font-display` and `--font-mono` in your own CSS, as you do now: the type
  scale is built on those two names. If you copied the `--text-*` type tokens
  into your own CSS to make up for the missing file, delete the copy.

  In a Tailwind 4 app, `--font-mono` is also the variable Tailwind's own
  `font-mono` class reads, so one setting serves both. Point it at JetBrains
  Mono and every `font-mono` in your app changes with it. Leave it on your
  app's mono face and the design system's mono text (chips, tile and stat
  labels) uses that face instead. Either works; the second leaves your app
  looking as it does today.
- **(before 0.2.0) Import `core.css`.** It carries the rules components can't
  set inline: Row separators, hover states, focus rings, touch targets.
  Without it, those don't render, and nothing warns you:

  ```css
  @import "@misterbeardy/design-system/core.css";
  ```

A complete list, for an app hosting its own fonts:

```css
@import "@misterbeardy/design-system/tokens/typography.css";
@import "@misterbeardy/design-system/tokens/colors.css";
@import "@misterbeardy/design-system/tokens/spacing.css";
@import "@misterbeardy/design-system/tokens/motion.css";
@import "@misterbeardy/design-system/tokens/materials.css";
@import "@misterbeardy/design-system/core.css";
```

## 5. Your accent

- **(before 1.0) Replace your accent block with the registry's.** Every app
  does this once for 1.0, for up to two reasons:
  - **1.0 adds the high-contrast theme**, and your accent block has to carry
    its part: an `@media (prefers-contrast: more)` section with your app's
    high-contrast accent. Your block comes after the package's CSS, so an old
    one without that section overrides the package's high-contrast accent,
    and your primary buttons stay at normal contrast when a reader asks for
    more.
  - **(before 0.5.0)** Light-theme accents also moved darker (lightness 0.60
    → 0.54) so a primary button's label clears 4.5:1, and the slot gained
    `--on-accent`, the colour of whatever sits on an accent fill.

  From the design system repo, print the current block for your app and paste
  it over the old one, all of it:

  ```sh
  node -e 'import("./app-registry.js").then(r => console.log(r.accentCssFor("<your-app-key>")))'
  ```

  It prints a `:root { … }` block, a `[data-theme="dark"] { … }` block and an
  `@media (prefers-contrast: more) { … }` block. If
  your app isn't registered yet, add it to `app-registry.js` first (see
  `ADOPTING.md`).

  Then **delete every other place your CSS sets the accent**, not just the
  old block. A leftover can outrank the new one without any error: an app
  that sets its light theme on `:root[data-theme="light"]` beats the
  printed `:root`, so the old light accent stays, and in light the
  high-contrast one never applies. From your app's root, this lists them in
  your stylesheets:

  ```sh
  grep -rnE --include='*.css' --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=dist -e '--(accent|accent-soft|accent-text|on-accent):' .
  ```

  Every line it prints should be inside the block you just pasted, or in a
  stylesheet your app never loads (a leftover from a starter kit, say).
  Those don't reach the page and can stay.

- **(before 1.0) If your CSS sets its own neutrals, high contrast only
  reaches your accent.** The package's high-contrast theme also moves
  `--text-muted`, the borders, the status colours and `--hairline`, but only
  through `tokens/colors.css` and `tokens/spacing.css`. An app that declares
  those itself instead (a dark-first app, or one whose tokens were copied in
  before the package existed) keeps them at normal contrast. The fix is
  what `ADOPTING.md` asks anyway: delete the copies and import the files, so
  the app follows the package. Don't copy the high-contrast values in; a
  copy drifts from the package the next time they change.

## 6. Tokens in your own CSS

- **(before 1.0) Type tokens are `--type-*`.** The 26 font shorthands moved
  from `--text-*` to `--type-*`, because `--text-ink` and `--text-muted` are
  colours and one prefix for both invited `color: var(--text-body)`. **The
  two colours don't change.** The old names still work until 2.0, as aliases,
  so nothing breaks today; move them while you're here. It takes two
  searches, from your app's root. First, **copies to delete**: lines that
  declare one of the 26 themselves.

  ```sh
  grep -rnE --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=dist -e '--text-(body|button|button-sm|chip|chip-display|display|heading|input|label|message|message-title|page-sub|row-label|row-sub|row-value|section|segment|segment-sm|segment-sub|stat|stat-label|subhead|tab|tile-label|tile-sub|tile-value):' .
  ```

  Each is a copy of the package's value, left from before your app imported
  it. Delete the line; don't rename it. Renamed, it would become a copy of
  `--type-*` that overrides the package's own. Then, **uses to rename**:

  ```sh
  grep -rnoE --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=dist -e 'var\(--text-[a-z-]+' . \
    | grep -E -e ':var\(--text-(body|button|button-sm|chip|chip-display|display|heading|input|label|message|message-title|page-sub|row-label|row-sub|row-value|section|segment|segment-sm|segment-sub|stat|stat-label|subhead|tab|tile-label|tile-sub|tile-value)$'
  ```

  Rename each `var(--text-<name>)` to `var(--type-<name>)`. Every one of the
  26 keeps its name after the prefix: `--text-row-label` → `--type-row-label`.
  Both searches name the 26 on purpose. Your app may have `--text-*` names
  of its own, usually colours like `--text-faint`. Those aren't type
  tokens, and renaming them would leave that text with no colour. Notes that
  mention the old names (a `CLAUDE.md`, a README) aren't in either search;
  update those by hand.
- **(before 1.0) `.material-glass` is `.ds-glass`.** Unlike the tokens, the
  class has **no alias**: rename it wherever you use it.
- **(before 0.8.0) Guidelines copied into your app** should come from
  `guidelines/*.md` or `guidelines/*.card.html`. The package also ships
  `guidelines/src/`, but those files hold `{{--token}}` placeholders instead
  of values.

## 7. Component props

These changed in the 1.0 API review (#46). They only affect components that
arrived in 0.6.0–0.8.0; an app on an older version isn't using any of them
yet.

| Component | Was | Is |
|---|---|---|
| `PageHeader` | `actions={…}` | `trailing={…}` |
| `PageHeader` | `subtitle="…"` | `sub="…"` |
| `Banner` | `onDismiss={…}` | `onClose={…}` |
| `Banner` | `dismissLabel="…"` | `closeLabel="…"` |
| `Toast` | `inline` | `fixed={false}` |
| `StatStrip` | `subTone: "muted"` | `subTone: "neutral"` |
| `StatStrip` | type `Stat` | type `StatStripItem` |
| `Checkbox` | `onChange` optional | `onChange` required (types only) |

```jsx
// before
<PageHeader title="Trips" subtitle="128 mi this month" actions={<AddButton />} />
<Banner tone="warning" title="You're offline" onDismiss={hide} />
<Toast open message="Saved" inline />

// 1.0
<PageHeader title="Trips" sub="128 mi this month" trailing={<AddButton />} />
<Banner tone="warning" title="You're offline" onClose={hide} />
<Toast open message="Saved" fixed={false} />
```

In TypeScript every old name is a type error, so the compiler finds them for
you. In JavaScript, search for `actions=`, `subtitle=`, `onDismiss`,
`dismissLabel`, `inline` on a Toast, and `"muted"`.

## 8. What will look different

None of these need an edit. They're here so a changed screenshot isn't a
surprise, and so you can drop workarounds you no longer need.

- **(before 0.4.0)**
  - **Controls get shorter in an app with a tall line height.** Button,
    Chip, Input, Segmented and StatTile fix their own line height instead of
    inheriting yours, so they're the same height in every app. With
    Tailwind's 1.5 that's 3–9px per control; with a taller body line height
    it's more: a StatTile under a 1.65 body is 16px shorter.
  - **Secondary buttons are 2px shorter**, matching primary (40px).
  - **Input fits its container.** It used to overflow by 30px without a
    box-sizing reset. Remove any width workaround.
  - **A `className` adds to a component's own class** instead of replacing
    it. If you were re-adding the component's styles by hand, drop that.
- **(before 0.5.0)**
  - **Dark theme: labels and glyphs on coloured fills are dark ink**, not
    white. That's the primary Button's label, GlyphTile glyphs and the Switch
    knob when on.
  - **StatStrip deltas are darker in light and lighter in dark.** They use
    the status `-text` colours now.
  - **Data colour has a palette.** `GlyphTile color=` still works unchanged;
    where the colour means a category rather than a real-world colour,
    `data={1…6}` gives one that holds contrast in both themes. Charts use
    `var(--data-1)` … `var(--data-6)` and counts `var(--ramp-1)` …
    `var(--ramp-7)`. This is optional.
- **(before 0.6.0)** **On touch screens, tappable Rows are 44px tall** (37.5px
  before), and controls closer together than their 44px tap areas overlap:
  the later one takes the tap. Two small Buttons stacked need 11px between
  them.
- **(before 0.7.0)** **An `Input` with `aria-invalid` draws a red border.** It
  used to change nothing. If you set `aria-invalid` on a field you don't mean
  to mark as wrong, stop setting it.
- **(before 1.0)** Nothing. The 1.0 renames change no pixels.

## 9. Check it

1. **Build and type-check** as you normally would. Any type error mentioning a
   design-system prop is step 7, or step 3's second point.
2. **Search for leftovers:**
   - anything step 6's two searches still print is step 6
   - an accent line outside your pasted block, in a stylesheet your app
     loads, is step 5
   - `material-glass` is step 6
   - `transpilePackages` is step 3
3. **Look at one screen in light and one in dark,** against step 8's list.
   Then turn on your system's increased-contrast setting and look again: the
   primary buttons should darken in light and brighten in dark. If nothing
   changes, step 5.

If something changed that this guide doesn't mention, that's a gap in the
guide: open an issue on the design system repo.

## How this guide was checked

It was followed step by step on a copy of idrovewhere.today, upgrading from
v0.1.2, the oldest version any app pins, so every step applied. The copy
type-checked and built afterwards. The test found three things the first
draft got wrong, all fixed above: apps that import token files one by one
had silently lost component type since 0.4.0 (step 4, and the reason
`tokens/fonts.css` exists); `core.css`'s import path was not the one the
package exports; and the search command in step 6 missed matches.

It was then followed on a copy of that-will-be-five-bucks, from v0.3.0: a
dark-first app that copied its tokens into its own CSS. That copy built and
passed its tests, and its screens were compared before and after. It found
five more things, also fixed above: `npm install` alone doesn't move a
GitHub pin (step 2); leftover accent lines can outrank the pasted block, and
high contrast doesn't reach neutrals an app sets itself (step 5); step 6's
search listed the app's own `--text-faint` colour as a type token; and the
shorter controls in step 8 weren't only a Tailwind effect.

Last, it was followed on a copy of oneofus.beer, from v0.1.2: an app that
imports `styles.css`, with Tailwind and shadcn/ui on top. It type-checked,
built and passed its tests, and its screens were compared before and after.
It found two more things, fixed above: step 5's search also listed HTML
reports and a stylesheet nothing loads; and step 6 treated the app's copied
type tokens as uses to rename, when they're copies to delete.

idrovewhere.today was then upgraded again from v0.1.2 by the corrected guide,
with no further errors. It added the note on `--font-mono` in Tailwind 4
apps to step 4.
