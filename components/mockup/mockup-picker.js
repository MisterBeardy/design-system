/* Mockup picker — compare a mockup's open design choices, A against B, on
   one live page. See MockupPicker.prompt.md and guidelines/mockups.md.

   A floating panel (a bottom sheet at phone width) with one row per open
   decision. Each button sets a data attribute on <html>; the mockup's own CSS
   keys off it ([data-accent="45"] { … }), so every option is seen on the real
   layout, not on a separate page. Theme (light / dark / system) is built in
   and drives the system's own data-theme.

   Dependency-free, framework-free, one file: it injects its own CSS, which
   reads only the design system's tokens. Load it as a classic script (or
   paste it inline) and call:

     MockupPicker.mount({
       title: "Overview reskin",
       decisions: [
         { key: "accent", label: "Accent", options: [
           { value: "125", label: "125 olive", recommended: true },
           { value: "45",  label: "45 orange" } ] },
       ],
     });

   or put the same object, as JSON, in
     <script type="application/json" data-mockup-picker>{ … }</script>
   and it mounts itself.

   URL: every row reads its value from ?<key>= on load and writes it back with
   history.replaceState, so a link reproduces the state. ?mock=min starts it
   collapsed, ?mock=off hides it (clean screenshots) without changing the
   choices.

   Keys (when focus isn't in a text field): A / B / C… pick that option on the
   active row (the focused one, else the last one used); X flips it between its
   first two options; M collapses and expands the panel.

   Not part of any app. It exists for mockups and throwaway prototypes only. */
(function (global) {
  "use strict";
  if (global.MockupPicker) return;

  var doc = global.document;
  var root = doc.documentElement;
  var LETTERS = "abcdefghi";
  var THEME_KEY = "mockup-picker-theme";
  var PHONE = "(max-width: 600px)";

  var CSS = [
    /* Always a dark panel, whatever the page's theme: the panel carries
       data-theme="dark", so the tokens inside it are the dark ones, and its
       ground is a shade under the dark --bg, so it still stands off a dark
       page. The tooling look is the point: it must never read as part of the
       design it sits on. */
    ".mp{position:fixed;z-index:2147483000;box-sizing:border-box;",
    "top:calc(var(--header-height) + var(--space-3));right:var(--space-3);",
    "width:max-content;max-width:min(420px,calc(100vw - 2 * var(--space-3)));",
    "max-height:calc(100vh - var(--header-height) - 2 * var(--space-3));overflow-y:auto;overflow-x:hidden;",
    "display:flex;flex-direction:column;gap:var(--space-2);padding:var(--space-2) var(--space-3) var(--space-3);",
    "border-radius:var(--radius-md);border:1px solid var(--border);",
    "background:color-mix(in srgb,var(--bg) 80%,black);color:var(--text-ink);",
    "font:var(--type-label);box-shadow:var(--shadow-popover);",
    "-webkit-text-size-adjust:100%;text-align:left}",
    ".mp *{box-sizing:border-box}",
    ".mp[hidden]{display:none}",
    ".mp-head{display:flex;align-items:center;justify-content:space-between;gap:var(--space-3);min-width:0}",
    ".mp-title{font-weight:700;letter-spacing:var(--tracking-label);text-transform:uppercase;min-width:0;overflow-wrap:anywhere}",
    ".mp-sum{display:none;letter-spacing:var(--tracking-caps);opacity:.7}",
    ".mp-legend{opacity:.6;font-size:.91em}",
    ".mp-row{display:flex;align-items:center;flex-wrap:wrap;gap:var(--space-1) var(--space-2);min-width:0;",
    "padding-left:var(--space-2);margin-left:calc(-1 * var(--space-2));border-left:2px solid transparent}",
    ".mp-row[data-active]{border-left-color:color-mix(in srgb,var(--text-ink) 55%,transparent)}",
    ".mp-label{min-width:10ch;opacity:.7;text-transform:uppercase;letter-spacing:var(--tracking-caps)}",
    ".mp-opts{display:flex;flex-wrap:wrap;gap:var(--space-1);min-width:0}",
    ".mp button{font:inherit;color:inherit;background:transparent;cursor:pointer;margin:0;",
    "border:1px solid color-mix(in srgb,var(--text-ink) 35%,transparent);border-radius:var(--radius-sm);",
    "padding:var(--space-1) var(--space-2);max-width:100%;overflow-wrap:anywhere;text-align:left;",
    "transition:background-color var(--duration-fast) var(--ease-out),color var(--duration-fast) var(--ease-out)}",
    ".mp button:hover{border-color:var(--text-ink)}",
    ".mp button:focus-visible{outline:2px solid var(--text-ink);outline-offset:2px}",
    ".mp-opt[aria-pressed=\"true\"]{background:var(--text-ink);color:var(--bg);border-color:var(--text-ink)}",
    ".mp-key{opacity:.55;margin-right:var(--space-1)}",
    /* Recommended: a dot after the label, and the words for a screen reader. */
    ".mp-rec{display:inline-block;width:5px;height:5px;border-radius:var(--radius-pill);background:currentColor;margin-left:var(--space-1);vertical-align:middle}",
    ".mp-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}",
    ".mp-toggle{border:0 !important;padding:0 var(--space-1) !important;min-width:24px;text-align:center !important;font-weight:700}",
    ".mp-help{opacity:.5;font-size:.91em}",
    /* Collapsed: one line, the title and the state as letters. */
    ".mp[data-min] .mp-row,.mp[data-min] .mp-help,.mp[data-min] .mp-legend{display:none}",
    ".mp[data-min] .mp-sum{display:inline}",
    ".mp[data-min]{padding:var(--space-1) var(--space-1) var(--space-1) var(--space-3);border-radius:var(--radius-pill)}",
    ".mp-spacer{display:none}",
    /* Phone: a bottom sheet across the width. The spacer at the end of <body>
       takes its height, so the last of the page can scroll clear of it. */
    "@media " + PHONE + "{",
    ".mp{top:auto;right:0;left:0;bottom:0;width:auto;max-width:none;max-height:50vh;",
    "border-radius:var(--radius-lg) var(--radius-lg) 0 0;",
    "padding-bottom:calc(var(--space-3) + env(safe-area-inset-bottom,0px));box-shadow:var(--shadow-sheet)}",
    ".mp-label{min-width:0;flex-basis:100%}",
    ".mp-help{display:none}",
    ".mp[data-min]{left:auto;right:var(--space-3);bottom:calc(var(--space-3) + env(safe-area-inset-bottom,0px));border-radius:var(--radius-pill);box-shadow:var(--shadow-popover)}",
    ".mp-spacer{display:block;height:var(--mockup-picker-inset,0px)}",
    "}",
    /* Touch: 44px tap targets, as everywhere else in the system. */
    "@media (pointer:coarse){.mp-opt,.mp-toggle{min-height:44px}.mp-toggle{min-width:44px}}",
  ].join("");

  var state = null; // the mounted instance

  function el(tag, attrs, kids) {
    var n = doc.createElement(tag);
    for (var k in attrs || {}) {
      if (attrs[k] == null || attrs[k] === false) continue;
      if (k === "text") n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k] === true ? "" : attrs[k]);
    }
    (kids || []).forEach(function (c) { if (c) n.appendChild(typeof c === "string" ? doc.createTextNode(c) : c); });
    return n;
  }

  function params() { return new URLSearchParams(global.location.search); }

  function writeUrl() {
    if (!state || !global.history || !global.history.replaceState) return;
    var q = params();
    state.rows.forEach(function (r) { q.set(r.key, r.value); });
    if (q.get("mock") !== "off") {
      if (state.min) q.set("mock", "min"); else q.delete("mock");
    }
    var s = q.toString();
    try { global.history.replaceState(global.history.state, "", global.location.pathname + (s ? "?" + s : "") + global.location.hash); } catch (e) {}
  }

  /* --- theme: the system's data-theme, plus "system" ---------------------- */
  var mq = global.matchMedia ? global.matchMedia("(prefers-color-scheme: dark)") : null;
  function applyTheme(mode) {
    root.setAttribute("data-theme-mode", mode);
    root.setAttribute("data-theme", mode === "system" ? (mq && mq.matches ? "dark" : "light") : mode);
    try { global.localStorage.setItem(THEME_KEY, mode); } catch (e) {}
  }
  if (mq) {
    var onScheme = function () { if (root.getAttribute("data-theme-mode") === "system") applyTheme("system"); };
    if (mq.addEventListener) mq.addEventListener("change", onScheme); else if (mq.addListener) mq.addListener(onScheme);
  }

  function normalise(config) {
    var q = params();
    var rows = [];
    if (config.theme !== false) {
      var saved = null;
      try { saved = global.localStorage.getItem(THEME_KEY); } catch (e) {}
      var t = typeof config.theme === "object" ? config.theme : {};
      rows.push({
        key: "theme", label: t.label || "Theme", theme: true,
        options: [{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }, { value: "system", label: "System" }],
        initial: q.get("theme") || saved || t.default || "system",
      });
    }
    (config.decisions || []).forEach(function (d) {
      if (!d || !d.key || !d.options || !d.options.length) return;
      var rec = d.options.filter(function (o) { return o.recommended; })[0];
      rows.push({
        key: d.key, label: d.label || d.key, attr: d.attr || "data-" + d.key,
        options: d.options.map(function (o) { return { value: String(o.value), label: o.label || String(o.value), recommended: !!o.recommended }; }),
        initial: q.get(d.key) != null ? q.get(d.key) : String(d.default != null ? d.default : (rec || d.options[0]).value),
        onChange: d.onChange,
      });
    });
    rows.forEach(function (r) {
      var valid = r.options.some(function (o) { return o.value === r.initial; });
      r.value = valid ? r.initial : (r.options.filter(function (o) { return o.recommended; })[0] || r.options[0]).value;
    });
    return rows;
  }

  function setRow(r, value, opts) {
    if (!r.options.some(function (o) { return o.value === value; })) return;
    r.value = value;
    if (r.theme) applyTheme(value); else root.setAttribute(r.attr, value);
    (r.buttons || []).forEach(function (b) { b.setAttribute("aria-pressed", String(b.value === value)); });
    if (state) {
      paintSummary();
      if (!(opts && opts.silent)) {
        writeUrl();
        if (typeof r.onChange === "function") r.onChange(value);
        if (typeof state.config.onChange === "function") state.config.onChange(r.key, value, snapshot());
        doc.dispatchEvent(new CustomEvent("mockup-picker:change", { detail: { key: r.key, value: value, state: snapshot() } }));
      }
    }
  }

  function snapshot() {
    var o = {};
    state.rows.forEach(function (r) { o[r.key] = r.value; });
    return o;
  }

  function letterOf(r) {
    for (var i = 0; i < r.options.length; i++) if (r.options[i].value === r.value) return LETTERS[i].toUpperCase();
    return "?";
  }
  function paintSummary() {
    if (!state || !state.sum) return;
    state.sum.textContent = state.rows.filter(function (r) { return !r.theme; }).map(letterOf).join(" ");
  }

  function setActive(r) {
    if (!state) return;
    state.active = r;
    state.rows.forEach(function (x) { if (x.node) x.node.toggleAttribute("data-active", x === r); });
  }

  function setMin(min) {
    state.min = !!min;
    state.panel.toggleAttribute("data-min", state.min);
    state.toggle.textContent = state.min ? "+" : "–";
    state.toggle.setAttribute("aria-expanded", String(!state.min));
    state.toggle.setAttribute("aria-label", state.min ? "Expand the mockup picker" : "Collapse the mockup picker");
    measure();
  }

  function measure() {
    if (!state || !state.spacer) return;
    var h = state.panel.hidden ? 0 : state.panel.getBoundingClientRect().height;
    root.style.setProperty("--mockup-picker-inset", Math.ceil(h) + "px");
  }

  function build() {
    var c = state.config;
    var id = "mp-" + Math.random().toString(36).slice(2, 8);
    state.toggle = el("button", { type: "button", class: "mp-toggle", "aria-controls": id + "-body", "aria-expanded": "true" });
    state.sum = el("span", { class: "mp-sum", "aria-hidden": "true" });
    var hasRec = state.rows.some(function (r) { return r.options.some(function (o) { return o.recommended; }); });
    var head = el("div", { class: "mp-head" }, [
      el("span", { class: "mp-title" }, ["Mockup" + (c.title ? " · " + c.title : ""), " ", state.sum]),
      state.toggle,
    ]);
    var body = el("div", { id: id + "-body", style: "display:contents" });
    state.rows.forEach(function (r, i) {
      var labelId = id + "-l" + i;
      r.buttons = r.options.map(function (o, j) {
        var b = el("button", { type: "button", class: "mp-opt", "aria-pressed": String(o.value === r.value), title: o.recommended ? "Recommended" : null }, [
          j < LETTERS.length && r.options.length > 1 ? el("span", { class: "mp-key", "aria-hidden": "true", text: LETTERS[j].toUpperCase() }) : null,
          o.label,
          o.recommended ? el("span", { class: "mp-rec", "aria-hidden": "true" }) : null,
          o.recommended ? el("span", { class: "mp-sr", text: " (recommended)" }) : null,
        ]);
        b.value = o.value;
        b.addEventListener("click", function () { setActive(r); setRow(r, o.value); });
        b.addEventListener("focus", function () { setActive(r); });
        return b;
      });
      r.node = el("div", { class: "mp-row", role: "group", "aria-labelledby": labelId }, [
        el("span", { class: "mp-label", id: labelId, text: r.label }),
        el("div", { class: "mp-opts" }, r.buttons),
      ]);
      body.appendChild(r.node);
    });
    if (hasRec) body.appendChild(el("div", { class: "mp-legend" }, [el("span", { class: "mp-rec", "aria-hidden": "true", style: "margin:0 var(--space-1) 0 0" }), "recommended"]));
    if (c.keys !== false) body.appendChild(el("div", { class: "mp-help", text: "Keys: A / B pick · X flips · M collapses" }));

    state.panel = el("aside", { class: "mp", "aria-label": "Mockup picker: design choices, not part of the design", "data-mockup-picker": true, "data-theme": "dark" }, [head, body]);
    state.toggle.addEventListener("click", function () { setMin(!state.min); writeUrl(); });

    var mode = params().get("mock");
    if (mode === "off") state.panel.hidden = true;
    doc.body.appendChild(state.panel);
    state.spacer = el("div", { class: "mp-spacer", "aria-hidden": "true" });
    doc.body.appendChild(state.spacer);
    setMin(mode === "min" || !!c.collapsed);
    paintSummary();
    var firstChoice = state.rows.filter(function (r) { return !r.theme; })[0] || state.rows[0];
    if (firstChoice) setActive(firstChoice);
    if (global.ResizeObserver) new ResizeObserver(measure).observe(state.panel);
    global.addEventListener("resize", measure);
    measure();
  }

  function onKey(e) {
    if (!state || state.config.keys === false || state.panel.hidden) return;
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    var k = (e.key || "").toLowerCase();
    if (k === "m") { setMin(!state.min); writeUrl(); e.preventDefault(); return; }
    var focused = state.rows.filter(function (r) { return r.node && r.node.contains(doc.activeElement); })[0];
    var r = focused || state.active;
    if (!r) return;
    if (k === "x" && r.options.length > 1) {
      setRow(r, r.value === r.options[0].value ? r.options[1].value : r.options[0].value);
      e.preventDefault();
      return;
    }
    var i = LETTERS.indexOf(k);
    if (k.length === 1 && i >= 0 && i < r.options.length) { setRow(r, r.options[i].value); e.preventDefault(); }
  }

  function mount(config) {
    if (state) unmount();
    config = config || {};
    state = { config: config, rows: normalise(config), min: false, active: null };
    // Attributes go on <html> now, even from <head>, so the first paint is
    // already the chosen state. The panel waits for <body>.
    state.rows.forEach(function (r) { setRow(r, r.value, { silent: true }); });
    if (!doc.getElementById("mockup-picker-css")) {
      doc.head.appendChild(el("style", { id: "mockup-picker-css", text: CSS }));
    }
    var go = function () { if (state && state.config === config) { build(); doc.addEventListener("keydown", onKey); } };
    if (doc.body) go(); else doc.addEventListener("DOMContentLoaded", go, { once: true });
    return api;
  }

  function unmount() {
    if (!state) return;
    doc.removeEventListener("keydown", onKey);
    if (state.panel) state.panel.remove();
    if (state.spacer) state.spacer.remove();
    root.style.removeProperty("--mockup-picker-inset");
    state = null;
  }

  var api = {
    mount: mount,
    unmount: unmount,
    /** Current value of every row, { theme: "system", accent: "125", … } */
    get: function () { return state ? snapshot() : {}; },
    /** Set a row by key, as if its button were pressed. */
    set: function (key, value) {
      var r = state && state.rows.filter(function (x) { return x.key === key; })[0];
      if (r) setRow(r, String(value));
    },
  };
  global.MockupPicker = api;

  // Declarative form: <script type="application/json" data-mockup-picker>{…}</script>
  function auto() {
    if (state) return;
    var s = doc.querySelector('script[type="application/json"][data-mockup-picker]');
    if (!s) return;
    try { mount(JSON.parse(s.textContent)); } catch (e) { console.error("mockup-picker: bad JSON config", e); }
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", auto, { once: true }); else auto();
})(globalThis);
