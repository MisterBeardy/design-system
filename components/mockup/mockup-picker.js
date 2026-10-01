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
   first two options; M collapses and expands the panel; S saves.

   Save and Notes: a Notes field (draft kept in localStorage) and a Save button
   that records the choices and notes where Claude can read them. Published as
   a claude.ai artifact with capabilities {db: {}, user: {}}, Save writes
   mockup-saves/<timestamp> and mockup-saves/latest to the artifact's db. With
   no db (a local file, no window.claude) it copies the same JSON to the
   clipboard and downloads it as mockup-choices-<slug>-<timestamp>.json.
   save: false leaves both out.

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
    /* Notes and Save. */
    ".mp-notes{display:flex;flex-direction:column;gap:var(--space-1);min-width:0}",
    ".mp-notes label{opacity:.7;text-transform:uppercase;letter-spacing:var(--tracking-caps)}",
    ".mp textarea{font:inherit;color:inherit;margin:0;width:100%;min-width:0;display:block;resize:none;",
    "line-height:1.4;padding:var(--space-1) var(--space-2);min-height:calc(2 * 1.4em + 2 * var(--space-1) + 2px);",
    "max-height:calc(4 * 1.4em + 2 * var(--space-1) + 2px);overflow-y:auto;",
    "background:color-mix(in srgb,var(--text-ink) 6%,transparent);",
    "border:1px solid color-mix(in srgb,var(--text-ink) 35%,transparent);border-radius:var(--radius-sm)}",
    ".mp textarea:focus-visible{outline:2px solid var(--text-ink);outline-offset:2px}",
    ".mp-foot{display:flex;align-items:center;flex-wrap:wrap;gap:var(--space-1) var(--space-2);min-width:0}",
    ".mp-save{font-weight:700}",
    ".mp-save[aria-busy=\"true\"]{opacity:.6;cursor:progress}",
    ".mp-dirty{display:inline-flex;align-items:center;gap:var(--space-1);color:var(--warning-text)}",
    ".mp-dirty::before{content:\"\";width:6px;height:6px;border-radius:var(--radius-pill);background:var(--warning)}",
    ".mp-dirty[hidden]{display:none}",
    ".mp-status{flex-basis:100%;contain:inline-size;opacity:.75;overflow-wrap:anywhere}",
    ".mp-status:empty{display:none}",
    ".mp-status[data-error]{opacity:1;color:var(--danger-text)}",
    /* A dot in the pill when there are notes. */
    ".mp-ndot{display:none;width:6px;height:6px;border-radius:var(--radius-pill);background:currentColor;margin-left:var(--space-2);vertical-align:middle}",
    ".mp[data-min][data-has-notes] .mp-ndot{display:inline-block}",
    /* Collapsed: one line, the title and the state as letters. */
    ".mp[data-min] .mp-row,.mp[data-min] .mp-help,.mp[data-min] .mp-legend,.mp[data-min] .mp-notes,.mp[data-min] .mp-foot{display:none}",
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
    "@media (pointer:coarse){.mp-opt,.mp-toggle,.mp-save{min-height:44px}.mp-toggle{min-width:44px}.mp textarea{font-size:16px}}",
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
      paintDirty();
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

  /* --- notes and save ---------------------------------------------------- */
  var SAVE_COLLECTION = "mockup-saves";

  function saveConfig(c) {
    if (c.save === false) return null;
    var coll = c.save && typeof c.save === "object" && c.save.collection ? String(c.save.collection) : SAVE_COLLECTION;
    return { collection: coll };
  }
  function notesKey() {
    return "mockup-picker-notes:" + global.location.pathname + (state && state.config.title ? "#" + state.config.title : "");
  }
  function readDraft() {
    try { return global.localStorage.getItem(notesKey()) || ""; } catch (e) { return ""; }
  }
  function writeDraft(v) {
    try { if (v) global.localStorage.setItem(notesKey(), v); else global.localStorage.removeItem(notesKey()); } catch (e) {}
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function clock(d) { return pad(d.getHours()) + ":" + pad(d.getMinutes()); }
  function slug(s) {
    return (String(s || "mockup").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "mockup").slice(0, 40);
  }

  /* The same shape whether it goes to the db or to a file. */
  function payload(now) {
    var choices = {};
    state.rows.forEach(function (r) {
      var i = 0;
      for (; i < r.options.length; i++) if (r.options[i].value === r.value) break;
      var o = r.options[i] || { label: r.value };
      choices[r.key] = { value: r.value, label: o.label, option: i < LETTERS.length ? LETTERS[i].toUpperCase() : String(i + 1), recommended: !!o.recommended };
    });
    return {
      mockup: state.config.title || doc.title || "Mockup",
      url: global.location.href,
      savedAt: now.toISOString(),
      choices: choices,
      notes: state.notes || "",
      viewer: state.viewer || null,
    };
  }
  function fingerprint() { return JSON.stringify([snapshot(), state.notes || ""]); }

  function paintDirty() {
    if (!state || !state.dirty) return;
    var dirty = state.savedPrint != null && state.savedPrint !== fingerprint();
    state.dirty.hidden = !dirty;
    if (dirty) {
      state.dirty.textContent = "unsaved changes" + (state.savedAt ? " · last saved " + clock(state.savedAt) : "");
      if (state.status && !state.status.hasAttribute("data-error")) setStatus("");
    }
    if (state.saveBtn && !state.saving) state.saveBtn.textContent = state.savedAt && !dirty ? "Saved ✓ " + clock(state.savedAt) : "Save";
  }
  function setStatus(text, isError) {
    if (!state || !state.status) return;
    state.status.textContent = text || "";
    state.status.toggleAttribute("data-error", !!isError);
  }

  /* claude.use() never resolves during the first run, and resolves null when
     the page isn't in an artifact viewer (a local file, no window.claude). */
  function useCap(name) {
    try {
      var c = global.claude;
      if (!c || typeof c.use !== "function") return Promise.resolve(null);
      return Promise.resolve(c.use(name)).then(function (v) { return v || null; }, function () { return null; });
    } catch (e) { return Promise.resolve(null); }
  }
  function connect() {
    var st = state;
    var dbP = useCap("db");
    var userP = useCap("user").then(function (u) {
      if (!u) return;
      try {
        return Promise.all([
          Promise.resolve(u.id()).then(function (id) { st.viewer = id || null; }, function () {}),
          Promise.resolve(u.can("data.write")).then(function (ok) { st.canWrite = ok; }, function () {}),
        ]);
      } catch (e) {}
    }).catch(function () {});
    // Save waits for both, so the saved doc carries the viewer's id.
    state.dbReady = Promise.all([dbP, userP]).then(function (v) { return v[0]; });
  }

  function copyText(text) {
    function legacy() {
      try {
        var ta = el("textarea", { readonly: true, style: "position:fixed;top:0;left:0;opacity:0;pointer-events:none" });
        ta.value = text;
        doc.body.appendChild(ta);
        ta.select();
        var ok = doc.execCommand && doc.execCommand("copy");
        ta.remove();
        return !!ok;
      } catch (e) { return false; }
    }
    try {
      if (global.navigator && global.navigator.clipboard && global.navigator.clipboard.writeText) {
        return global.navigator.clipboard.writeText(text).then(function () { return true; }, function () { return legacy(); });
      }
    } catch (e) {}
    return Promise.resolve(legacy());
  }
  function download(name, text) {
    try {
      var url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
      var a = el("a", { href: url, download: name, style: "display:none" });
      doc.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
      return true;
    } catch (e) { return false; }
  }
  function saveLocal(data, stamp, why) {
    var text = JSON.stringify(data);
    var name = "mockup-choices-" + slug(data.mockup) + "-" + stamp + ".json";
    why = why || "Not in a published artifact, so the choices were";
    return copyText(text).then(function (copied) {
      var downloaded = download(name, text);
      var done = [copied ? "copied to the clipboard" : null, downloaded ? "downloaded as " + name : null].filter(Boolean);
      if (!done.length) return { ok: false, where: "none", error: why.replace(/, so the choices were$/, "") + ", and the choices couldn't be copied or downloaded." };
      return { ok: true, where: "local", file: downloaded ? name : null, copied: copied, message: why + " " + done.join(" and ") + "." };
    });
  }
  function describe(e) {
    return (e && (e.message || e.code)) || String(e);
  }
  function writeDb(db, data, id) {
    var coll = state.saveCfg.collection;
    function once() {
      return db.collection(coll).doc(id).set(data).then(function () { return db.collection(coll).doc("latest").set(data); });
    }
    return once().catch(function (e) {
      if (e && e.code === "unavailable") return new Promise(function (res) { setTimeout(res, 400 + Math.random() * 600); }).then(once);
      throw e;
    });
  }

  function doSave() {
    if (!state || !state.saveCfg) return Promise.resolve({ ok: false, where: "none", error: "Saving is turned off (save: false)." });
    if (state.saving) return state.saving;
    var st = state;
    var now = new Date();
    var data = payload(now);
    var print = fingerprint();
    var id = now.toISOString().replace(/:/g, "-");
    var stamp = id.replace(/\.\d+Z$/, "Z");
    if (st.saveBtn) { st.saveBtn.setAttribute("aria-busy", "true"); st.saveBtn.textContent = "Saving…"; }
    setStatus("");
    st.saving = (st.dbReady || Promise.resolve(null)).then(function (db) {
      data.viewer = st.viewer || null;
      if (!db) return saveLocal(data, stamp);
      if (st.canWrite === false) return saveLocal(data, stamp, "You can view this page but not save to it, so the choices were");
      return writeDb(db, data, id).then(function () {
        return { ok: true, where: "db", id: id, message: "Saved to this page. Tell Claude “saved”." };
      }, function (e) {
        return saveLocal(data, stamp, "Couldn't save to the page (" + describe(e) + "), so the choices were");
      });
    }).catch(function (e) {
      return { ok: false, where: "none", error: "Save failed: " + describe(e) };
    }).then(function (res) {
      st.saving = null;
      if (st !== state) return res;
      if (st.saveBtn) st.saveBtn.removeAttribute("aria-busy");
      if (res.ok) { st.savedAt = now; st.savedPrint = print; }
      setStatus(res.ok ? res.message : res.error, !res.ok);
      paintDirty();
      doc.dispatchEvent(new CustomEvent("mockup-picker:save", { detail: { result: res, data: data } }));
      return res;
    });
    return st.saving;
  }

  function autosize(ta) {
    ta.style.height = "auto";
    ta.style.height = (ta.scrollHeight + 2) + "px";
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
    if (!state.min && state.notesField) autosize(state.notesField);
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
      el("span", { class: "mp-title" }, ["Mockup" + (c.title ? " · " + c.title : ""), " ", state.sum,
        state.saveCfg ? el("span", { class: "mp-ndot", title: "Has notes", "aria-hidden": "true" }) : null]),
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
    if (state.saveCfg) {
      var ta = el("textarea", { id: id + "-notes", rows: "2", spellcheck: "true", placeholder: "Anything the choices don't say" });
      ta.value = state.notes;
      ta.addEventListener("input", function () {
        state.notes = ta.value;
        writeDraft(ta.value);
        state.panel.toggleAttribute("data-has-notes", !!ta.value.trim());
        autosize(ta);
        paintDirty();
      });
      state.notesField = ta;
      body.appendChild(el("div", { class: "mp-notes" }, [el("label", { for: id + "-notes", text: "Notes" }), ta]));
      state.saveBtn = el("button", { type: "button", class: "mp-save", title: "Save the choices and notes (S)", text: "Save" });
      state.saveBtn.addEventListener("click", function () { doSave(); });
      state.dirty = el("span", { class: "mp-dirty", hidden: true, text: "unsaved changes" });
      state.status = el("span", { class: "mp-status", role: "status", "aria-live": "polite" });
      body.appendChild(el("div", { class: "mp-foot" }, [state.saveBtn, state.dirty, state.status]));
    }
    if (c.keys !== false) body.appendChild(el("div", { class: "mp-help", text: "Keys: A / B pick · X flips · M collapses" + (state.saveCfg ? " · S saves" : "") }));

    state.panel = el("aside", { class: "mp", "aria-label": "Mockup picker: design choices, not part of the design", "data-mockup-picker": true, "data-theme": "dark" }, [head, body]);
    if (state.saveCfg && state.notes.trim()) state.panel.setAttribute("data-has-notes", "");
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
    if (state.notesField) autosize(state.notesField);
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
    if (k === "s" && state.saveCfg) { doSave(); e.preventDefault(); return; }
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
    state = { config: config, rows: normalise(config), min: false, active: null, saveCfg: saveConfig(config),
      notes: "", viewer: null, canWrite: null, savedAt: null, savedPrint: null, saving: null };
    if (state.saveCfg) { state.notes = readDraft(); connect(); }
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
    /** Save the choices and notes, as the Save button does. Never rejects:
        resolves { ok, where: "db" | "local" | "none", id?, file?, message?, error? }. */
    save: function () { return doSave(); },
    /** The Notes field's text ("" when empty or when save is off). */
    notes: function () { return state ? state.notes || "" : ""; },
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
