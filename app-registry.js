// Shared accent registry for the unified app theme.
// Single source of truth for which hue/chroma each app owns, plus a helper
// that suggests the next open slot so a new project doesn't have to be
// eyeballed against the existing set.
//
// The accent formula is the same for every app, and accentCssFor() emits it:
//
//   light  --accent oklch(0.54 C H)   --accent-soft oklch(0.95 0.03 H)
//          --accent-text oklch(0.42 C H)   --on-accent #ffffff
//   dark   --accent oklch(0.74 max(0.85C, 0.09) H)   --accent-soft oklch(0.32 0.07 H)
//          --accent-text oklch(0.85 0.1 H)   --on-accent #211f1c
//
// Light lightness is 0.54, not the 0.60 it used to be: at 0.60 neither a white
// nor a dark label reached 4.5:1 on a primary button for most apps. At 0.54
// white clears it for every app below. Not for every possible hue, though:
// greens and cyans (roughly H156-226) with chroma above 0.13 land too light once
// they're fitted into sRGB. `npm run check` fails for any row whose label
// misses 4.5:1 in either theme; lower that app's chroma to fix it.

export const APPS = [
  { key: 'oneofus',        name: 'OneOfUs',              hue: 70,  chroma: 0.17, note: 'Real brand color #d97706' },
  { key: 'idleairport',    name: 'IdleAirport',          hue: 75,  chroma: 0.14, note: 'Real brand color #ffd24a' },
  { key: 'drinkwin',       name: "Drink&Win",            hue: 95,  chroma: 0.15 },
  { key: 'parametricchaos',name: 'ParametricChaos',      hue: 155, chroma: 0.13 },
  { key: 'fivebucks',      name: "That'll Be 5 Bucks",   hue: 185, chroma: 0.13 },
  { key: 'washmycar',      name: 'WashMyCar',            hue: 230, chroma: 0.13 },
  { key: 'idrovewhere',    name: 'iDroveWhere',          hue: 256, chroma: 0.15 },
  { key: 'whatwillithink', name: 'WhatWillIThink',       hue: 300, chroma: 0.16 },
];

// Minimum hue separation (degrees) before two accents are considered "too
// close" for comfort if the apps might ever appear side by side.
export const MIN_HUE_GAP = 25;

/** Sorted (hue asc) copy of APPS, for wheel layout / gap math. */
export function sortedByHue() {
  return [...APPS].sort((a, b) => a.hue - b.hue);
}

/** Returns each adjacent gap around the wheel (wrapping 360 -> 0), sorted by
 *  size descending: [{ from, to, start, end, mid, size }]. */
export function hueGaps() {
  const sorted = sortedByHue();
  const gaps = [];
  for (let i = 0; i < sorted.length; i++) {
    const a = sorted[i];
    const b = sorted[(i + 1) % sorted.length];
    const start = a.hue;
    const end = i === sorted.length - 1 ? b.hue + 360 : b.hue;
    const size = end - start;
    gaps.push({ from: a.name, to: b.name, start, end: end % 360, mid: (start + size / 2) % 360, size });
  }
  return gaps.sort((x, y) => y.size - x.size);
}

/** Suggests up to `count` open hues for new apps: the widest gaps' midpoints,
 *  skipped if the gap is too tight to safely place anything in (< 2x MIN_HUE_GAP). */
export function suggestOpenSlots(count = 4) {
  return hueGaps()
    .filter((g) => g.size >= MIN_HUE_GAP * 2)
    .slice(0, count)
    .map((g) => ({ hue: Math.round(g.mid), betweenAfter: g.from, betweenBefore: g.to, gap: g.size }));
}

/** Flags any pair of apps whose hues sit closer than MIN_HUE_GAP. */
export function crowdedPairs() {
  const gaps = hueGaps();
  return gaps.filter((g) => g.size < MIN_HUE_GAP);
}

const LIGHT_L = 0.54;
const DARK_L = 0.74;

// The label and glyph colour on a solid accent. The dark theme lightens every
// accent, so white can't reach 4.5:1 on any of them there; a dark label can.
const ON_ACCENT = { light: "#ffffff", dark: "#211f1c" };

// Four decimals: 0.14 * 0.85 is 0.11900000000000001 in floating point, and
// that string would otherwise end up in someone's stylesheet.
const round4 = (n) => Math.round(n * 1e4) / 1e4;

function resolveApp(app, chroma) {
  if (typeof app !== "string") return { hue: app, chroma };
  const row = APPS.find((a) => a.key === app);
  if (!row) throw new Error(`No app "${app}" in the registry. Keys: ${APPS.map((a) => a.key).join(", ")}`);
  return row;
}

/** The solid accent colour for a hue and chroma, light or dark. */
export function accentFor(hue, chroma, dark = false) {
  return dark
    ? `oklch(${DARK_L} ${round4(Math.max(chroma * 0.85, 0.09))} ${hue})`
    : `oklch(${LIGHT_L} ${round4(chroma)} ${hue})`;
}

/** Every accent token for one app, light and dark: the three an app overrides
 *  per theme, plus the label colour that sits on the accent. Pass an app key
 *  from APPS (`accentTokensFor("washmycar")`), or a hue and a chroma. */
export function accentTokensFor(app, chroma) {
  const { hue, chroma: c } = resolveApp(app, chroma);
  return {
    light: {
      "--accent": accentFor(hue, c),
      "--accent-soft": `oklch(0.95 0.03 ${hue})`,
      "--accent-text": `oklch(0.42 ${round4(c)} ${hue})`,
      "--on-accent": ON_ACCENT.light,
    },
    dark: {
      "--accent": accentFor(hue, c, true),
      "--accent-soft": `oklch(0.32 0.07 ${hue})`,
      "--accent-text": `oklch(0.85 0.1 ${hue})`,
      "--on-accent": ON_ACCENT.dark,
    },
  };
}

/** The same tokens as the stylesheet block an app pastes into its root CSS. */
export function accentCssFor(app, chroma) {
  const { light, dark } = accentTokensFor(app, chroma);
  const block = (selector, vars) =>
    `${selector} {\n${Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`).join("\n")}\n}`;
  return `${block(":root", light)}\n${block('[data-theme="dark"]', dark)}\n`;
}
