// Write guidelines/*.md and guidelines/*.card.html from guidelines/src/, with
// every token value read from tokens/*.css. Run by `npm run build`, so CI's
// dist check also fails when a guideline states a value the tokens no longer
// have.
//
// The guidelines used to restate token values by hand, in two forms (the
// markdown and the visual card), and the only thing keeping them honest was a
// note asking whoever changed a token to edit both. That's the one kind of
// file whose whole job is to state the values correctly, so it's the one kind
// that shouldn't be trusted to a note.
//
// In a source file, a value is a placeholder:
//
//   {{--space-3}}         the light (:root) value, as written: 12px
//   {{dark:--bg}}         the [data-theme="dark"] value, or the light one when
//                         dark doesn't override it
//   {{px:--space-3}}      the number alone, var() chains followed: 12
//   {{spec:--type-body}}  a type token's weight size/line-height, plus " mono"
//                         for the mono face: 400 15px/1.65
//   {{size:--type-body}}  a type token's size alone: 15
//   {{contrast:--border}} its value under prefers-contrast: more, light
//   {{contrast-dark:--border}}  the same, dark. Both resolve the way the
//                         cascade does, so a token high contrast leaves
//                         alone gives its normal value
//
// No spaces inside the braces: that's what keeps a JSX example's
// style={{ … }} from being read as one.
//
// An unknown token fails the build, so renaming or removing a token breaks
// every guideline that names it until the guideline is fixed. And the
// reverse: a token defined in tokens/*.css that no guideline names fails it
// too, unless UNDOCUMENTED below says why it needn't be.

import { readdir, readFile, writeFile } from "node:fs/promises";

const SRC = "guidelines/src";
const OUT = "guidelines";
const KINDS = [".md", ".card.html"];

// Tokens that no guideline has to mention, each with the reason. Everything
// else defined in tokens/*.css must be named somewhere in guidelines/src/, or
// the build fails: a token the guidelines never mention is one nobody reading
// them will ever use correctly. An entry here that stops matching any token
// fails too, so the list can't outlive what it excuses.
const UNDOCUMENTED = [
  {
    match: /^--text-(?!ink$|muted$)/,
    reason: "the pre-1.0 names of the --type-* shorthands, kept as aliases until 2.0; UPGRADING-1.0.md and the changelog document them",
  },
];

// --- tokens/*.css --------------------------------------------------------

async function readTokens() {
  const light = {};
  const dark = {};
  const source = {};
  // The high-contrast theme: :root and [data-theme="dark"] blocks inside a
  // top-level @media (prefers-contrast: more).
  const contrastLight = {};
  const contrastDark = {};
  for (const file of (await readdir("tokens")).filter((f) => f.endsWith(".css")).sort()) {
    // Comments first: they mention tokens in prose ("--accent / --accent-soft"),
    // and a colon in the wrong place would read as a definition.
    const css = (await readFile(`tokens/${file}`, "utf8")).replace(/\/\*[\s\S]*?\*\//g, "");
    // Top-level blocks only. motion.css redefines its durations inside
    // @media (prefers-reduced-motion) { :root { … } }, and those are the
    // exception, not the values.
    let depth = 0;
    let start = 0;
    let selector = "";
    for (let i = 0; i < css.length; i++) {
      if (css[i] === "{") {
        if (depth === 0) {
          selector = css.slice(start, i).split(";").pop().trim();
          start = i + 1;
        }
        depth++;
      } else if (css[i] === "}") {
        depth--;
        if (depth === 0) {
          if (/^@media\s*\(prefers-contrast:\s*more\)$/.test(selector)) {
            for (const [, sel, body] of css.slice(start, i).matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
              const into = sel.trim() === ":root" ? contrastLight : sel.trim() === '[data-theme="dark"]' ? contrastDark : null;
              if (!into) continue;
              for (const [, name, value] of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) into[name] = value.trim().replace(/\s+/g, " ");
            }
          }
          const target = selector === ":root" ? light : selector === '[data-theme="dark"]' ? dark : null;
          if (target) {
            for (const [, name, value] of css.slice(start, i).matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
              target[name] = value.trim().replace(/\s+/g, " ");
              source[name] ??= `tokens/${file}`;
            }
          }
          start = i + 1;
        }
      }
    }
  }
  return { light, dark, source, contrastLight, contrastDark };
}

function formatter({ light, dark, contrastLight, contrastDark }) {
  // Each theme resolves the way the cascade does on one element: high
  // contrast dark, then high contrast light, then dark, then light.
  const chains = {
    light: [light],
    dark: [dark, light],
    "contrast-light": [contrastLight, light],
    "contrast-dark": [contrastDark, contrastLight, dark, light],
  };
  const get = (theme, name) => {
    const value = chains[theme].map((t) => t[name]).find((v) => v !== undefined);
    if (value === undefined) throw new Error(`no token ${name}`);
    return value;
  };
  // Follow var(--x) to a literal, for the numeric forms.
  const resolve = (name, seen = new Set()) => {
    if (seen.has(name)) throw new Error(`${name} refers to itself`);
    const value = get("light", name);
    const ref = value.match(/^var\((--[\w-]+)\)$/);
    return ref ? resolve(ref[1], seen.add(name)) : value;
  };
  // A px length, or a calc() that adds them up (--row-inset is the sum of
  // three others), as a number.
  const pixels = (name) => {
    const value = resolve(name);
    const sum = value.match(/^calc\((.*)\)$/);
    const terms = sum ? sum[1].split("+").map((t) => t.trim()) : [value];
    return terms.reduce((total, term) => {
      const ref = term.match(/^var\((--[\w-]+)\)$/);
      if (ref) return total + pixels(ref[1]);
      const px = term.match(/^([\d.]+)px$/);
      if (!px) throw new Error(`${name} is ${value}, not a px length or a sum of them`);
      return total + Number(px[1]);
    }, 0);
  };
  const font = (name) => {
    const m = resolve(name).match(/^(\d+)\s+([\d.]+)px\/([\d.]+)\s+var\((--font-[\w-]+)\)$/);
    if (!m) throw new Error(`${name} isn't a font shorthand (weight size/line-height family)`);
    return { weight: m[1], size: m[2], lineHeight: m[3], mono: m[4] === "--font-mono" };
  };
  return {
    "": (n) => get("light", n),
    dark: (n) => get("dark", n),
    contrast: (n) => get("contrast-light", n),
    "contrast-dark": (n) => get("contrast-dark", n),
    px: (n) => String(pixels(n)),
    spec: (n) => {
      const f = font(n);
      return `${f.weight} ${f.size}px/${f.lineHeight}${f.mono ? " mono" : ""}`;
    },
    size: (n) => font(n).size,
  };
}

// --- the files -------------------------------------------------------------

const kindOf = (file) => KINDS.find((k) => file.endsWith(k));

// Where the "don't edit this" note goes: after the frontmatter in markdown
// (design-sync reads `category:` from it, so it must stay first), and after
// the @dsCard line in a card (which must be the file's first line).
function withNote(file, text) {
  const note = `<!-- Generated from ${SRC}/${file} by scripts/build-guidelines.mjs, with values from tokens/*.css. Edit that file, not this one, then run npm run build. -->`;
  if (file.endsWith(".md")) {
    const fm = text.match(/^---\n[\s\S]*?\n---\n/);
    return fm ? `${fm[0]}${note}\n${text.slice(fm[0].length)}` : `${note}\n${text}`;
  }
  const nl = text.indexOf("\n");
  return `${text.slice(0, nl + 1)}${note}\n${text.slice(nl + 1)}`;
}

export async function buildGuidelines() {
  const tokens = await readTokens();
  const format = formatter(tokens);
  const sources = (await readdir(SRC)).filter(kindOf).sort();
  const problems = [];
  const written = [];

  for (const file of sources) {
    const src = await readFile(`${SRC}/${file}`, "utf8");
    // Double braces with no whitespace inside are meant as a placeholder, so
    // one this doesn't understand ({{bogus:--bg}}, {{space-3}}) is a mistake,
    // not text. Whitespace is what tells a JSX style object in a code example
    // (style={{ padding: 0 }}) apart from a placeholder.
    const out = src.replace(/\{\{([^\s{}]+)\}\}/g, (whole, inner) => {
      const m = inner.match(/^(?:(dark|px|spec|size|contrast|contrast-dark):)?(--[\w-]+)$/);
      if (!m) {
        problems.push(`${SRC}/${file}: ${whole} isn't a placeholder this understands (see the top of scripts/build-guidelines.mjs)`);
        return whole;
      }
      try {
        return format[m[1] ?? ""](m[2]);
      } catch (e) {
        problems.push(`${SRC}/${file}: ${whole} — ${e.message}`);
        return whole;
      }
    });
    written.push([file, withNote(file, out)]);
  }

  // A guideline written straight into guidelines/ would be overwritten by the
  // next build, or never built at all. Say so rather than guess.
  const outputs = (await readdir(OUT)).filter(kindOf);
  for (const file of outputs) {
    if (!sources.includes(file)) problems.push(`${OUT}/${file} has no source in ${SRC}/ — move it there (or delete it)`);
  }

  // Every token is named somewhere in the sources, as a placeholder or in
  // prose, unless UNDOCUMENTED says why not.
  let everything = "";
  for (const file of sources) everything += await readFile(`${SRC}/${file}`, "utf8");
  const used = new Set();
  for (const [name, file] of Object.entries(tokens.source)) {
    const exempt = UNDOCUMENTED.find((u) => u.match.test(name));
    if (exempt) {
      used.add(exempt);
      continue;
    }
    if (!new RegExp(`${name}(?![\\w-])`).test(everything)) {
      problems.push(`${name} (${file}) isn't mentioned in any guideline — name it in the guideline for its family, or add it to UNDOCUMENTED in scripts/build-guidelines.mjs with a reason`);
    }
  }
  for (const u of UNDOCUMENTED) {
    if (!used.has(u)) problems.push(`UNDOCUMENTED entry ${u.match} matches no token any more — remove it`);
  }

  if (problems.length) throw new Error(`guidelines:\n  ${problems.join("\n  ")}`);

  for (const [file, text] of written) {
    const path = `${OUT}/${file}`;
    const before = await readFile(path, "utf8").catch(() => null);
    if (before !== text) await writeFile(path, text);
  }
  return written.map(([file]) => file);
}

// `node scripts/build-guidelines.mjs` on its own, outside the full build.
if (import.meta.url === `file://${process.argv[1]}`) {
  const files = await buildGuidelines();
  console.log(`guidelines/ written (${files.length} files)`);
}
