// Shared accent registry for the unified app theme.
// Single source of truth for which hue/chroma each app owns, plus a helper
// that suggests the next open slot so a new project doesn't have to be
// eyeballed against the existing set.
//
// Accent formula (same everywhere): light = oklch(0.58-0.64 C H),
// dark = oklch(0.7-0.76 C H) — see App Theme Kit / Palette Check.

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

/** Accent color strings for a given hue/chroma, light + dark. */
export function accentFor(hue, chroma, dark = false) {
  return dark ? `oklch(0.74 ${Math.max(chroma * 0.85, 0.09)} ${hue})` : `oklch(0.6 ${chroma} ${hue})`;
}
