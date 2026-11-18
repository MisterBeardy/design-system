import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { cx } from "./cx.js";
import { Group } from "./Group.jsx";
import { Row } from "./Row.jsx";
import { GlyphTile } from "./GlyphTile.jsx";
import { Icon } from "./Icon.jsx";
import { PageHeader } from "./PageHeader.jsx";

// useLayoutEffect warns during server rendering; the effect only matters in
// a browser.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// True below `narrow` px of viewport width, the same breakpoint Popover uses.
function useNarrow(narrow) {
  const query = `(max-width: ${narrow - 0.02}px)`;
  const [match, setMatch] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useIsoLayoutEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return match;
}

const parentOf = (items, value) => items.find((it) => it.children?.some((c) => c.value === value));

const findItem = (items, value) => {
  for (const it of items) {
    if (it.value === value) return it;
    const child = it.children?.find((c) => c.value === value);
    if (child) return child;
  }
  return undefined;
};

const glyphFor = (icon, size) => (typeof icon === "string" ? <Icon name={icon} size={size} /> : icon);

const list = { listStyle: "none", margin: 0, padding: 0 };

// The places in a part of an app, a settings screen say, listed down its side,
// with one level of sections under a place. Below `narrow` it becomes the
// grouped list a phone expects: chevron rows, each section's pages under its
// name. Given the current page as `children`, it lays out the page too, and
// on a phone shows either the list or the page with a back button.
export function SideNav({
  items,
  value,
  onChange,
  label,
  layout = "auto",
  narrow = 700,
  headingLevel = 2,
  children,
  className,
  style,
  ...props
}) {
  const isNarrow = useNarrow(narrow);
  const mode = layout === "auto" ? (isNarrow ? "list" : "rail") : layout;
  const hasPage = children !== undefined && children !== null && children !== false;
  const showPage = mode === "list" && hasPage && value != null;

  // Which sections are open on the rail: the one holding the current page,
  // plus any the reader has opened.
  const [open, setOpen] = useState(() => new Set([parentOf(items, value)?.value].filter((v) => v != null)));
  const holder = parentOf(items, value)?.value;
  useEffect(() => {
    if (holder != null) setOpen((prev) => (prev.has(holder) ? prev : new Set(prev).add(holder)));
  }, [holder]);

  // Focus follows the reader on a phone: into the page's heading when a row
  // opens it, and back to that row when they return to the list.
  const pageRef = useRef(null);
  const navRef = useRef(null);
  const lastPage = useRef(value);
  const wasShowingPage = useRef(showPage);
  useEffect(() => {
    if (showPage && !wasShowingPage.current) {
      const heading = pageRef.current?.querySelector("h1, h2, h3, h4, h5, h6");
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    } else if (!showPage && wasShowingPage.current && mode === "list") {
      const row = [...(navRef.current?.querySelectorAll("[data-sidenav-value]") ?? [])].find(
        (el) => el.dataset.sidenavValue === String(lastPage.current),
      );
      row?.focus({ preventScroll: true });
    }
    wasShowingPage.current = showPage;
    if (value != null) lastPage.current = value;
  }, [showPage, mode, value]);

  const idBase = useId();

  // --- A phone: the page, with a way back to the list --------------------
  if (showPage) {
    const current = findItem(items, value);
    return (
      <div
        {...props}
        ref={pageRef}
        className={cx("ds-sidenav-page", className)}
        style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", ...style }}
      >
        <PageHeader
          sticky={false}
          headingLevel={headingLevel}
          title={current?.label}
          leading={
            <button
              type="button"
              className="ds-button ds-sidenav-back"
              onClick={() => onChange(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                maxWidth: "100%",
                minWidth: 0,
                padding: "6px 8px 6px 2px",
                border: "none",
                borderRadius: "var(--radius-sm)",
                background: "transparent",
                color: "var(--accent-text)",
                font: "var(--type-button-sm)",
                cursor: "pointer",
              }}
            >
              <Icon name="chevron-left" size={18} />
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
            </button>
          }
        />
        {children}
      </div>
    );
  }

  // --- A phone: chevron rows ---------------------------------------------
  if (mode === "list") {
    // Consecutive pages share one Group; a section is its own Group, headed
    // by its name.
    const groups = [];
    for (const it of items) {
      if (it.children?.length) groups.push({ header: it.label, key: it.value, rows: it.children });
      else if (groups.length && !groups[groups.length - 1].header) groups[groups.length - 1].rows.push(it);
      else groups.push({ key: it.value, rows: [it] });
    }
    const nav = (
      <nav
        {...(hasPage ? {} : props)}
        ref={navRef}
        aria-label={label}
        className={cx("ds-sidenav", "ds-sidenav-list", !hasPage && className)}
        style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", ...(hasPage ? null : style) }}
      >
        {groups.map((g) => (
          <Group key={g.key} header={g.header}>
            {g.rows.map((it) => (
              <Row
                key={it.value}
                data-sidenav-value={it.value}
                aria-current={it.value === value ? "page" : undefined}
                glyph={it.icon ? <GlyphTile>{glyphFor(it.icon, 13)}</GlyphTile> : undefined}
                label={it.label}
                chevron
                onClick={() => onChange(it.value)}
              />
            ))}
          </Group>
        ))}
      </nav>
    );
    return hasPage ? (
      <div {...props} className={cx("ds-sidenav-layout", className)} style={style}>
        {nav}
      </div>
    ) : (
      nav
    );
  }

  // --- Wider: the rail ---------------------------------------------------
  const withIcons = items.some((it) => it.icon);
  const itemStyle = (current, depth) => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
    boxSizing: "border-box",
    minHeight: "var(--sidenav-item-height)",
    padding: depth ? `6px 10px 6px ${withIcons ? 38 : 22}px` : "6px 10px",
    border: "none",
    borderRadius: "var(--radius-md)",
    // The hover tint arrives through --sidenav-item-bg (core.css), so an
    // app's own `button:hover` background can't replace it.
    background: current ? "var(--accent-soft)" : "var(--sidenav-item-bg, transparent)",
    color: current ? "var(--accent-text)" : depth ? "var(--text-muted)" : "var(--text-ink)",
    font: "var(--type-row-label)",
    fontWeight: current || !depth ? 500 : 400,
    textAlign: "start",
    cursor: "pointer",
  });
  const text = { flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };

  const rail = (
    <nav
      {...(hasPage ? {} : props)}
      ref={navRef}
      aria-label={label}
      className={cx("ds-sidenav", "ds-sidenav-rail", !hasPage && className)}
      style={hasPage ? { position: "sticky", top: "var(--space-4)", alignSelf: "start" } : style}
    >
      <ul role="list" style={{ ...list, display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map((it, i) => {
          const sections = it.children?.length ? it.children : null;
          if (!sections) {
            const current = it.value === value;
            return (
              <li key={it.value}>
                <button
                  type="button"
                  className="ds-sidenav-item"
                  data-sidenav-value={it.value}
                  aria-current={current ? "page" : undefined}
                  title={typeof it.label === "string" ? it.label : undefined}
                  onClick={() => onChange(it.value)}
                  style={itemStyle(current, 0)}
                >
                  {it.icon && glyphFor(it.icon, 18)}
                  <span style={text}>{it.label}</span>
                </button>
              </li>
            );
          }
          const isOpen = open.has(it.value);
          const holdsCurrent = it.value === holder;
          const listId = `${idBase}-${i}`;
          return (
            <li key={it.value}>
              <button
                type="button"
                className="ds-sidenav-item"
                aria-expanded={isOpen}
                aria-controls={isOpen ? listId : undefined}
                title={typeof it.label === "string" ? it.label : undefined}
                onClick={() => {
                  const next = new Set(open);
                  if (isOpen) next.delete(it.value);
                  else next.add(it.value);
                  setOpen(next);
                  // Opening a section somewhere else also goes to its first
                  // page, so a click always shows something new.
                  if (!isOpen && !holdsCurrent) onChange(sections[0].value);
                }}
                style={itemStyle(false, 0)}
              >
                {it.icon && glyphFor(it.icon, 18)}
                <span style={text}>{it.label}</span>
                <Icon
                  name="chevron-down"
                  size={14}
                  style={{
                    color: "var(--text-muted)",
                    transform: isOpen ? "none" : "rotate(-90deg)",
                    transition: "transform var(--duration-base) var(--ease-out)",
                  }}
                />
              </button>
              {isOpen && (
                <ul id={listId} role="list" style={{ ...list, display: "flex", flexDirection: "column", gap: 2, marginTop: 2 }}>
                  {sections.map((c) => {
                    const current = c.value === value;
                    return (
                      <li key={c.value}>
                        <button
                          type="button"
                          className="ds-sidenav-item"
                          data-sidenav-value={c.value}
                          aria-current={current ? "page" : undefined}
                          title={typeof c.label === "string" ? c.label : undefined}
                          onClick={() => onChange(c.value)}
                          style={itemStyle(current, 1)}
                        >
                          <span style={text}>{c.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );

  if (!hasPage) return rail;
  return (
    <div
      {...props}
      className={cx("ds-sidenav-layout", className)}
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(160px, 220px) minmax(0, 1fr)",
        gap: "var(--space-5)",
        alignItems: "start",
        ...style,
      }}
    >
      {rail}
      <div style={{ minWidth: 0 }}>{children}</div>
    </div>
  );
}

