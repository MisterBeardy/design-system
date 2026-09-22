// Turn icons/*.svg, the single source of the house icon set, into the data the
// Icon component draws (components/core/iconData.js) and its name type
// (components/core/iconNames.d.ts). Run by `npm run build`, so CI's dist check
// also fails when either is stale.
//
// It also holds every file to the house style, so a glyph drawn another way
// fails the build instead of shipping: a 20×20 viewBox, no fill, a 1.75
// currentColor stroke with round caps and joins, and only simple shapes
// (path, circle, rect, line). A shape may set fill="currentColor", for dots.

import { readdir, readFile, writeFile } from "node:fs/promises";

const ROOT = {
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.75",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
};
const SHAPES = new Set(["path", "circle", "rect", "line"]);
const SHAPE_ATTRS = new Set(["d", "cx", "cy", "r", "x", "y", "width", "height", "rx", "x1", "y1", "x2", "y2", "fill"]);

const attrsOf = (s) => Object.fromEntries([...s.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const camel = (k) => k.replace(/-(\w)/g, (_, c) => c.toUpperCase());

export async function buildIcons() {
  const files = (await readdir("icons")).filter((f) => f.endsWith(".svg")).sort();
  const icons = {};
  const problems = [];
  for (const file of files) {
    const name = file.slice(0, -4);
    if (!/^[a-z][a-z0-9-]*$/.test(name)) problems.push(`${file}: name it in lower-case kebab-case`);
    const src = await readFile(`icons/${file}`, "utf8");
    const root = /<svg\b([^>]*)>/.exec(src);
    if (!root) {
      problems.push(`${file}: no <svg> element`);
      continue;
    }
    const got = attrsOf(root[1]);
    for (const [k, v] of Object.entries(ROOT)) {
      if (got[k] !== v) problems.push(`${file}: <svg ${k}> is ${got[k] ?? "missing"}, the house style is "${v}"`);
    }
    const body = src.slice(root.index + root[0].length, src.lastIndexOf("</svg>"));
    const parts = [];
    for (const m of body.matchAll(/<(\w+)\b([^>]*?)\/?>/g)) {
      const [, tag, rest] = m;
      if (!SHAPES.has(tag)) {
        problems.push(`${file}: <${tag}> isn't one of ${[...SHAPES].join(", ")}`);
        continue;
      }
      const attrs = attrsOf(rest);
      for (const k of Object.keys(attrs)) {
        if (!SHAPE_ATTRS.has(k)) problems.push(`${file}: <${tag} ${k}> isn't allowed; strokes come from the <svg>`);
      }
      if (attrs.fill && attrs.fill !== "currentColor") problems.push(`${file}: fill="${attrs.fill}"; only currentColor, for dots`);
      parts.push([tag, Object.fromEntries(Object.entries(attrs).map(([k, v]) => [camel(k), v]))]);
    }
    if (!parts.length) problems.push(`${file}: draws nothing`);
    icons[name] = parts;
  }
  if (problems.length) throw new Error(`icons/ breaks the house style:\n  ${problems.join("\n  ")}`);

  const out =
    "// Generated from icons/*.svg by scripts/build-icons.mjs. Do not edit: change the\n" +
    "// SVG file and run `npm run build`.\n" +
    "export const ICONS = {\n" +
    Object.entries(icons)
      .map(([name, parts]) => `  ${JSON.stringify(name)}: ${JSON.stringify(parts)},`)
      .join("\n") +
    "\n};\n";
  await writeFile("components/core/iconData.js", out);
  await writeFile(
    "components/core/iconNames.d.ts",
    "// Generated from icons/*.svg by scripts/build-icons.mjs. Do not edit.\n" +
      `export type IconName =\n${Object.keys(icons).map((n) => `  | ${JSON.stringify(n)}`).join("\n")};\n`,
  );
  return Object.keys(icons);
}
