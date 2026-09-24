# Contributing

Work happens on `dev`; `main` only moves at a release (a major like 1.0.0, or
a minor or patch like 1.1.0 or 1.0.1 to the current one), so `main` is always
exactly the last one. In between, `dev` can be tagged with
pre-releases (`v1.0.0-beta.1`) for an app that needs something early.
Releases up to v0.8.0 were made straight from `main`, before this.

## Every change

- Branch from `dev` and open the pull request against `dev`, never `main`.
- Add a line under **Unreleased** in `CHANGELOG.md`: what changed, in terms an
  app can see. Anything an app has to act on, or will notice, goes under
  **Upgrading**.
- Run `npm run check` (colour rules and the changelog) and `npm run build`
  (commit what it rebuilds: `dist/`, the icon data and `guidelines/`). CI runs
  both and fails if either is out of date.
- Guidelines are edited in `guidelines/src/`, never in `guidelines/`. Where a
  guideline states a token's value, write a placeholder — `{{--space-3}}`,
  `{{dark:--bg}}`, `{{spec:--type-body}}` — and the build fills it in from
  `tokens/*.css` (the forms are listed at the top of
  `scripts/build-guidelines.mjs`). Then a token change can't leave a guideline
  saying the old value.
- A new token has to be named in a guideline, in `guidelines/src/`, or the
  build fails and says which. The rare token that genuinely needn't be (a
  deprecated alias) goes in `UNDOCUMENTED` in the same script, with the
  reason.
- A pull request that changes what a person sees carries before and after
  screenshots, on the `session-screenshots` branch under `issue-N/`.

## Releasing

There are two kinds, and only one of them touches `main`.

### A pre-release, from `dev`

When an app needs work before the next major version is out, tag `dev` as a
pre-release of it: `v1.0.0-beta.1`, then `beta.2`, and so on. An app opts in
by pinning that tag; `main` and the two mirrors don't move.

1. **Open a pull request against `dev`**, from an up-to-date `dev`:
   - In `CHANGELOG.md`, rename `## [Unreleased]` to
     `## [X.0.0-beta.N] — YYYY-MM-DD`, add a fresh empty `## [Unreleased]`
     above it, and update the compare links at the bottom.
   - `npm version X.0.0-beta.N --no-git-tag-version`, then `npm run build` and
     `npm run check`.
   - Commit as "Release X.0.0-beta.N", and merge it into `dev`.
2. **Tag `dev`**, marked as a pre-release:

   ```sh
   git checkout dev && git pull
   awk -v v="X.0.0-beta.N" '/^## \[/{p=index($0,"["v"]")} /^\[[^]]+\]: /{p=0} p' CHANGELOG.md | tail -n +2 > /tmp/notes.md
   gh release create vX.0.0-beta.N --target dev --prerelease --title "vX.0.0-beta.N" --notes-file /tmp/notes.md
   ```

### A minor or patch release, `dev` to `main`

For changes to the current major that apps should get now, without waiting for
the next one. A patch (1.0.1) is corrected docs or a bug fix that changes no
API; a minor (1.1.0) adds something an app can use, like a new registry key,
and breaks nothing. Follow the major
release routine below with `X.Y.Z` in place of `X.0.0`: a version pull request
into `dev` (`package.json`, and `## [Unreleased]` renamed to
`## [X.Y.Z] — YYYY-MM-DD` with a fresh empty one above it), `dev` to `main`
with a merge commit, the tag with the changelog section as its notes, `dev`
fast-forwarded, and the mirrors re-synced. Tag only after the version pull
request is on `main`: the tag must point at a commit whose `package.json`
says the same version.

### A major release, `dev` to `main`

1. **Open the version pull request against `dev`**, exactly as for a
   pre-release but with `X.0.0`. Its changelog section summarises the major
   version; the beta sections under it stay, since an app moving from the
   last major reads every section in between.
2. **Open a pull request from `dev` to `main`** titled "Release X.0.0", and
   merge it with **Create a merge commit** — never squash, which would copy
   every change into one new commit `dev` doesn't have.
3. **Tag `main`**, using this release's changelog section as the notes:

   ```sh
   git checkout main && git pull
   awk -v v="X.0.0" '/^## \[/{p=index($0,"["v"]")} /^\[[^]]+\]: /{p=0} p' CHANGELOG.md | tail -n +2 > /tmp/notes.md
   gh release create vX.0.0 --target main --title "vX.0.0" --notes-file /tmp/notes.md
   ```

4. **Bring `dev` level with `main`.** The merge commit is the one commit
   `main` has that `dev` doesn't; fast-forward `dev` to it, so the two are
   identical again and nothing reports them as diverged:

   ```sh
   git push origin main:dev
   ```

5. **Re-sync both mirrors from `main`** — the release you just tagged, not
   `dev`'s work in progress: run `/design-sync` for the Claude Design project,
   and re-sync the Design System artifact.
6. **Close the milestone** on GitHub.

Apps then move to the new tag, or to a beta when they need to. `CHANGELOG.md`'s Upgrading notes are what they
read to decide whether that's safe.
