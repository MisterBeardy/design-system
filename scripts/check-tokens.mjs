// Checks the colour rules that nothing else would catch until an app looked
// wrong: the default accent in tokens/colors.css matches the registry; every
// label or glyph drawn on a coloured fill meets its contrast floor, in both
// themes, for every app in app-registry.js; the data palette stays
// distinguishable for colour-blind viewers; and the ramp steps evenly.
//
// Run with `npm run check`. CI runs it on every push and pull request.

import { readFile } from "node:fs/promises";
import { APPS, DATA_SLOTS, accentFor, accentTokensFor } from "../app-registry.js";

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

const linear = (color) => (color.startsWith("#") ? parseHex(color) : parseOklch(color));

const luminance = (color) => {
  const [r, g, b] = linear(color);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// Colour blindness, simulated on linear sRGB (Machado, Oliveira & Fernandes
// 2009, full severity), and distance in OKLab x 100: how far apart two colours
// look to someone with that kind of vision.
const CVD = {
  normal: null,
  protan: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  deutan: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.01182, 0.04294, 0.968881]],
  tritan: [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.3039]],
};
const seenBy = (rgb, vision) =>
  CVD[vision] ? CVD[vision].map((row) => Math.min(1, Math.max(0, row[0] * rgb[0] + row[1] * rgb[1] + row[2] * rgb[2]))) : rgb;
function oklab([r, g, b]) {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}
const apart = (x, y, vision = "normal") => 100 * Math.hypot(...oklab(seenBy(linear(x), vision)).map((v, i) => v - oklab(seenBy(linear(y), vision))[i]));

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

// 4. The data palette: every slot carries its glyph (3:1) and reads as a mark
//    on the surface (3:1); every pair stays distinguishable for each kind of
//    vision; and each app's dataLast really is the slot nearest its accent.
const FLOOR = { normal: 12, protan: 12, deutan: 12, tritan: 10 };
for (const theme of ["light", "dark"]) {
  const v = themes[theme];
  const slots = Array.from({ length: DATA_SLOTS }, (_, i) => `--data-${i + 1}`);
  for (const slot of slots) {
    const glyph = contrast(v["--on-data"], v[slot]);
    expect(glyph >= 3, `${theme} --on-data on ${slot}: ${glyph.toFixed(2)}:1${glyph >= 3 ? "" : " (needs 3)"}`);
    const mark = contrast(v[slot], v["--surface"]);
    expect(mark >= 3, `${theme} ${slot} on --surface: ${mark.toFixed(2)}:1${mark >= 3 ? "" : " (needs 3)"}`);
  }
  for (const [vision, floor] of Object.entries(FLOOR)) {
    let closest = [Infinity];
    for (let i = 0; i < slots.length; i++)
      for (let j = i + 1; j < slots.length; j++) {
        const d = apart(v[slots[i]], v[slots[j]], vision);
        if (d < closest[0]) closest = [d, slots[i], slots[j]];
      }
    expect(
      closest[0] >= floor,
      `${theme} data palette, ${vision} vision: closest pair ${closest[1]}/${closest[2]} ${closest[0].toFixed(1)} apart` +
        (closest[0] >= floor ? "" : ` (needs ${floor})`),
    );
  }
  // 5. The ramp: neighbouring steps at least 10 apart for every kind of vision,
  //    and each step further from the page than the one before.
  const ramp = Array.from({ length: 7 }, (_, i) => v[`--ramp-${i + 1}`]);
  for (let i = 0; i < ramp.length - 1; i++) {
    const step = Math.min(...Object.keys(CVD).map((vision) => apart(ramp[i], ramp[i + 1], vision)));
    expect(step >= 10, `${theme} --ramp-${i + 1} to --ramp-${i + 2}: ${step.toFixed(1)} apart${step >= 10 ? "" : " (needs 10)"}`);
    const rising = contrast(ramp[i + 1], v["--bg"]) > contrast(ramp[i], v["--bg"]);
    expect(rising, `${theme} --ramp-${i + 2} ${rising ? "has more" : "does NOT have more"} contrast with --bg than --ramp-${i + 1}`);
  }
}
for (const app of APPS) {
  const accent = accentFor(app.hue, app.chroma);
  const nearest = Array.from({ length: DATA_SLOTS }, (_, i) => i + 1)
    .map((n) => [apart(themes.light[`--data-${n}`], accent), n])
    .sort((a, b) => a[0] - b[0])[0];
  expect(
    app.dataLast === nearest[1],
    `${app.name}: dataLast ${app.dataLast}` +
      (app.dataLast === nearest[1] ? ` is the slot nearest its accent (${nearest[0].toFixed(1)} apart)` : `, but --data-${nearest[1]} is nearest its accent. Set dataLast: ${nearest[1]}.`),
  );
}

// 6. Banner: its title, body and glyph are all drawn in the tone's -text
//    colour on the tone's -soft fill (4.5:1), and the neutral Banner in ink on
//    --surface-alt. The Skeleton's bars are --surface-alt too, but carry no
//    text, so they have no floor.
for (const theme of ["light", "dark"]) {
  const v = themes[theme];
  for (const [ink, fill] of [["--success-text", "--success-soft"], ["--warning-text", "--warning-soft"], ["--danger-text", "--danger-soft"], ["--text-ink", "--surface-alt"]]) {
    const r = contrast(v[ink], v[fill]);
    expect(r >= 4.5, `${theme} Banner ${ink} on ${fill}: ${r.toFixed(2)}:1${r >= 4.5 ? "" : " (needs 4.5)"}`);
  }
}

// 7. Toast: its action is drawn in each app's --accent-text on --surface.
for (const app of APPS) {
  const t = accentTokensFor(app.key);
  for (const theme of ["light", "dark"]) {
    const r = contrast(t[theme]["--accent-text"], themes[theme]["--surface"]);
    expect(r >= 4.5, `${app.name}, ${theme}: Toast action ${r.toFixed(2)}:1 on --surface${r >= 4.5 ? "" : " (needs 4.5)"}`);
  }
}

if (failures.length) {
  console.error(`${failures.length} colour check(s) failed:\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log(`All ${passes.length} colour checks pass (${APPS.length} apps, light and dark).`);
