# Contributing

Work happens on `dev`; `main` only moves when a version is released. Apps pin
tags, and every tag is on `main`, so `main` is always exactly the last release.

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
  `{{dark:--bg}}`, `{{spec:--text-body}}` — and the build fills it in from
  `tokens/*.css` (the forms are listed at the top of
  `scripts/build-guidelines.mjs`). Then a token change can't leave a guideline
  saying the old value.
- A pull request that changes what a person sees carries before and after
  screenshots, on the `session-screenshots` branch under `issue-N/`.

## Releasing

1. **Open a release pull request against `dev`**, from an up-to-date `dev`:
   - In `CHANGELOG.md`, rename `## [Unreleased]` to `## [X.Y.Z] — YYYY-MM-DD`,
     add a fresh empty `## [Unreleased]` above it, and update the compare links
     at the bottom.
   - `npm version X.Y.Z --no-git-tag-version`, then `npm run build` and
     `npm run check`.
   - Commit as "Release X.Y.Z", and merge it into `dev`.
2. **Open a pull request from `dev` to `main`** titled "Release X.Y.Z", and
   merge it with **Create a merge commit** — never squash, which would copy
   every change into one new commit `dev` doesn't have.
3. **Tag `main`**, using this release's changelog section as the notes:

   ```sh
   git checkout main && git pull
   awk -v v="X.Y.Z" '/^## \[/{p=index($0,"["v"]")} /^\[[^]]+\]: /{p=0} p' CHANGELOG.md | tail -n +2 > /tmp/notes.md
   gh release create vX.Y.Z --target main --title "vX.Y.Z" --notes-file /tmp/notes.md
   ```

4. **Bring `dev` level with `main`.** The merge commit is the one commit
   `main` has that `dev` doesn't; fast-forward `dev` to it, so the two are
   identical again and nothing reports them as diverged:

   ```sh
   git push origin main:dev
   ```

5. **Re-sync both mirrors from `main`** — the release you just tagged, not
   `dev`'s unreleased work: run `/design-sync` for the Claude Design project,
   and re-sync the Design System artifact.
6. **Close the milestone** on GitHub.

Apps then move to the new tag. `CHANGELOG.md`'s Upgrading notes are what they
read to decide whether that's safe.
