# design-sync notes — @misterbeardy/design-system

Target Claude Design project: **lookwhatibuilt.today** (`38437aad-2039-4a1a-ad1d-73b3aeb3cec2`).
Shape: **package** (no Storybook). 11 components, all authored previews, all graded good.

## Repo-specific setup (the gotchas that cost time — do these before the converter)

- **No lockfile, no `node_modules`, `react` is a peerDep.** Install build deps into the
  repo's own `node_modules` WITHOUT touching `package.json`:
  `npm i --no-save react react-dom @types/react`. Point the converter at
  `--node-modules ./node_modules`. `@types/react` MUST sit next to the repo's `.d.ts`
  files or ts-morph resolves React utility types to `any` → empty prop bodies +
  `[ZERO_MATCH]`.
- **Component discovery can't use the `.d.ts` entry.** The package declares no
  `types`/`exports.*.types` and its type entry lives at `components/core/index.d.ts`,
  so `findTypesRoot` never locates it → `[ZERO_MATCH] no component exports`. Fixed by
  enumerating all 11 components in `cfg.componentSrcMap` (pins each to its
  `components/core/<Name>.jsx`). **When a component is added, add it to BOTH
  `componentSrcMap` and `docsMap`** — discovery won't auto-find it.
- **In-repo tokens need a self-symlink.** `copyTokens` only copies from a package in
  `node_modules`, and `tokensGlob` alone is a no-op without `tokensPkg`. We symlink the
  DS into its own node_modules so `tokensPkg` resolves:
  `mkdir -p node_modules/@misterbeardy && ln -sfn ../.. node_modules/@misterbeardy/design-system`.
  Then `cfg.tokensPkg="@misterbeardy/design-system"` + `cfg.tokensGlob="tokens/*.css"`
  copy the 5 token files. **This symlink is gitignored — recreate it on a fresh clone.**
- **`cssEntry` is `components/core/core.css`** (the real component stylesheet → `_ds_bundle.css`),
  NOT the repo's `styles.css` barrel. Pointing it at the barrel copies the barrel's
  `@import "./tokens/..."` lines into `_ds_bundle.css` at the bundle root where they
  404 (`[CSS_IMPORT_MISSING]`). The generated `styles.css` rebuilds the closure
  (tokens + `_ds_bundle.css`) correctly.
- **Playwright:** cached chromium build `1228` ↔ playwright `1.61.1`. Install that exact
  version into `.ds-sync/` or the render check fails with "Executable doesn't exist".

## Decisions

- **Docs = the repo's hand-authored `.prompt.md`.** Wired via `cfg.docsMap` (they end in
  `.md` so they pass the doc-extension gate). This preserves the rich design intent;
  the converter appends the synthesized `## Props` section. Far better than synthesizing.
- **`Input` uses `cardMode: column`** (`cfg.overrides.Input`) — its 320px stories overflow
  a grid cell otherwise (`[GRID_OVERFLOW]`).
- **Fonts load remotely.** `typography.css` `@import`s Google Fonts (Space Grotesk +
  JetBrains Mono) → `[FONT_REMOTE]`, non-blocking, assumed served at runtime. No local
  fonts shipped, no `fonts/` dir.
- **Guidelines are synced as markdown.** The repo's original `guidelines/*.card.html`
  are visual preview cards (not synced — they're HTML, not the markdown `guidelinesGlob`
  copies). We hand-wrote markdown equivalents at `guidelines/*.md` (accent, neutrals,
  status, spacing, radius, type-scale, grouped-list) capturing the real token values +
  rules, and set `cfg.guidelinesGlob="guidelines/*.md"`. They land at
  `guidelines/guidelines/*.md` in the bundle (the glob preserves the package-relative
  subpath) with a generated `guidelines/index.md` — the double-nesting is cosmetic; the
  index links resolve correctly. Keep the `.md` and `.card.html` in sync if the tokens
  change; the `category:` frontmatter sets each card's group in the DS pane.

## Known render warns

- None. Render check is fully clean (11/11, bad 0, thin 0). `[FONT_REMOTE]` is the only
  informational line and is expected (see above).

## Re-sync risks (what can silently go stale)

- **Per-clone setup is gitignored:** the `--no-save` react install AND the
  `node_modules/@misterbeardy/design-system` self-symlink. Recreate both before running
  `resync.mjs`, or the build fails at discovery/token-copy.
- **`componentSrcMap`/`docsMap` are hand-enumerated** because discovery can't read the
  types entry. A new component silently won't appear until added to both. (Best long-term
  fix: add `"types": "./components/core/index.d.ts"` to the package, then discovery works
  and these maps can shrink — not done here to avoid mutating tracked `package.json`.)
- **Remote fonts** depend on Google Fonts being reachable at render time.
- **Authored previews** in `.design-sync/previews/*.tsx` import from
  `@misterbeardy/design-system` and are tied to the current component APIs (props like
  `variant`, `tone`, `options`, `stats`). A breaking API change needs the preview updated.
