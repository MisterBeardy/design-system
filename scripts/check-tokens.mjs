// Checks the colour rules that nothing else would catch until an app looked
// wrong: the default accent in tokens/colors.css matches the registry, and
// every label or glyph drawn on a coloured fill meets its contrast floor, in
// both themes, for every app in app-registry.js.
//
// Run with `npm run check`. CI runs it on every push and pull request.

import { readFile } from "node:fs/promises";
import { APPS, accentTokensFor } from "../app-registry.js";

// --- Colour maths: CSS colour string -> WCAG 2 contrast ratio -------------

function parseHex(hex) {
  const h = hex.slice(1);
  const full = h.length === 3 ? [...h].map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => {
    const c = parseInt(full.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
}

// OKLCH -> linear sRGB (Björn Ottosson's matrices), clipped to the gamut the
// way a browser shows an out-of-gamut colour.
function parseOklch(str) {
  const [L, C, H] = str.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/).slice(1).map(Number);
  const a = C * Math.cos((H * Math.PI) / 180);
  const b = C * Math.sin((H * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map((v) => Math.min(1, Math.max(0, v)));
}

const luminance = (color) => {
  const [r, g, b] = color.startsWith("#") ? parseHex(color) : parseOklch(color);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

function contrast(fg, bg) {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// --- tokens/colors.css ---------------------------------------------------

const css = await readFile(new URL("../tokens/colors.css", import.meta.url), "utf8");
const blockFor = (selector) => {
  const start = css.indexOf(`${selector} {`);
  const body = css.slice(start, css.indexOf("\n}", start));
  return Object.fromEntries([...body.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
};
const themes = { light: blockFor(":root"), dark: blockFor('[data-theme="dark"]') };

const failures = [];
const passes = [];
const expect = (ok, line) => (ok ? passes : failures).push(line);

// 1. The default accent is the registry's iDroveWhere row, exactly.
const expected = accentTokensFor("idrovewhere");
for (const theme of ["light", "dark"]) {
  for (const [name, value] of Object.entries(expected[theme])) {
    expect(
      themes[theme][name] === value,
      `${theme} ${name} in colors.css is ${themes[theme][name] ?? "missing"}, registry says ${value}`,
    );
  }
}

// 2. Every app: the primary button label on its accent (4.5:1, 14px text) and
//    accent-text on accent-soft, the accent Chip (4.5:1).
for (const app of APPS) {
  const t = accentTokensFor(app.key);
  for (const theme of ["light", "dark"]) {
    const v = t[theme];
    const label = contrast(v["--on-accent"], v["--accent"]);
    expect(
      label >= 4.5,
      `${app.name}, ${theme}: button label ${label.toFixed(2)}:1 on ${v["--accent"]}` +
        (label >= 4.5 ? "" : ` (needs 4.5). Lower this app's chroma in app-registry.js.`),
    );
    const chip = contrast(v["--accent-text"], v["--accent-soft"]);
    expect(chip >= 4.5, `${app.name}, ${theme}: accent chip ${chip.toFixed(2)}:1${chip >= 4.5 ? "" : " (needs 4.5)"}`);
  }
}

// 3. Glyphs on status and neutral tiles (marks: 3:1), and status text on the
//    surface, e.g. a StatStrip delta (4.5:1).
for (const theme of ["light", "dark"]) {
  const v = themes[theme];
  for (const [fill, on] of [["--success", "--on-success"], ["--warning", "--on-warning"], ["--danger", "--on-danger"], ["--text-muted", "--on-neutral"]]) {
    const r = contrast(v[on], v[fill]);
    expect(r >= 3, `${theme} ${on} on ${fill}: ${r.toFixed(2)}:1${r >= 3 ? "" : " (needs 3)"}`);
  }
  for (const status of ["success", "warning", "danger"]) {
    const r = contrast(v[`--${status}-text`], v["--surface"]);
    expect(r >= 4.5, `${theme} --${status}-text on --surface: ${r.toFixed(2)}:1${r >= 4.5 ? "" : " (needs 4.5)"}`);
  }
}

if (failures.length) {
  console.error(`${failures.length} colour check(s) failed:\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log(`All ${passes.length} colour checks pass (${APPS.length} apps, light and dark).`);
