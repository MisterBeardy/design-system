# Contributing

## Every change

- Add a line under **Unreleased** in `CHANGELOG.md`: what changed, in terms an
  app can see. Anything an app has to act on, or will notice, goes under
  **Upgrading**.
- Run `npm run check` (colour rules and the changelog) and `npm run build`
  (commit the rebuilt `dist/`). CI runs both and fails if either is out of
  date.
- A pull request that changes what a person sees carries before and after
  screenshots, on the `session-screenshots` branch under `issue-N/`.

## Releasing

1. **Open a release pull request** from an up-to-date `main`:
   - In `CHANGELOG.md`, rename `## [Unreleased]` to `## [X.Y.Z] — YYYY-MM-DD`,
     add a fresh empty `## [Unreleased]` above it, and update the compare links
     at the bottom.
   - `npm version X.Y.Z --no-git-tag-version`, then `npm run build` and
     `npm run check`.
   - Commit as "Release X.Y.Z".
2. **Merge it, then tag the merge commit**, using this release's changelog
   section as the notes:

   ```sh
   awk -v v="X.Y.Z" '/^## \[/{p=index($0,"["v"]")} /^\[[^]]+\]: /{p=0} p' CHANGELOG.md | tail -n +2 > /tmp/notes.md
   gh release create vX.Y.Z --target main --title "vX.Y.Z" --notes-file /tmp/notes.md
   ```

3. **Re-sync both mirrors**: run `/design-sync` for the Claude Design project,
   and re-sync the Design System artifact.
4. **Close the milestone** on GitHub.

Apps then move to the new tag. `CHANGELOG.md`'s Upgrading notes are what they
read to decide whether that's safe.
