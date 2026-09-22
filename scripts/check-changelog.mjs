// Checks that CHANGELOG.md can take the next change and describes this
// release: an Unreleased section exists, and the version in package.json has
// its own entry. Without the second, a release can ship that no app can read
// the upgrade notes for.
//
// Runs as part of `npm run check`.

import { readFile } from "node:fs/promises";

const changelog = await readFile(new URL("../CHANGELOG.md", import.meta.url), "utf8");
const { version } = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));

const failures = [];
if (!/^## \[Unreleased\]/m.test(changelog)) {
  failures.push("CHANGELOG.md has no \"## [Unreleased]\" section for the next change to go under.");
}
if (!new RegExp(`^## \\[${version.replace(/\./g, "\\.")}\\] — \\d{4}-\\d{2}-\\d{2}`, "m").test(changelog)) {
  failures.push(`CHANGELOG.md has no "## [${version}] — YYYY-MM-DD" entry for the version in package.json.`);
}

if (failures.length) {
  console.error(`Changelog check failed:\n  ${failures.join("\n  ")}\nSee CONTRIBUTING.md, Releasing.`);
  process.exit(1);
}
console.log(`CHANGELOG.md has an Unreleased section and an entry for ${version}.`);
