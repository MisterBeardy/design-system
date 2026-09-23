import { createElement } from "react";
import { cx } from "./cx.js";

const truncate = { display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };

// The bar at the top of a screen: one compact height, title centred, and it
// never changes shape. A header that grows tall then collapses on scroll is a
// second thing to learn on every screen; this one is furniture, and the screen
// opens on content rather than on chrome.
//
// It sits on --surface, the same material as a Group, so the chrome reads as
// the app's frame rather than as a card floating above the page.
export function PageHeader({
  title,
  sub,
  leading,
  trailing,
  headingLevel = 1,
  sticky = true,
  className,
  style,
  ...props
}) {
  // Three columns rather than a flex row, and the shape of them is load-
  // bearing. The side tracks share one floor (the width of a small icon
  // button), so they stay equal when only one side carries a control and the
  // title is centred in the bar rather than in what's left of it. The title
  // track is fit-content, so it takes what it needs and no more — with an
  // `auto` track there it would grow to the full title and push the controls
  // off the ends instead of truncating, which is what a nowrap title's
  // min-content size does to grid.
  const side = { display: "flex", alignItems: "center", gap: "var(--space-1)", minWidth: 0 };

  return (
    <header
      {...props}
      className={cx("ds-page-header", className)}
      style={{
        ...(sticky ? { position: "sticky", top: 0, zIndex: 700 } : null),
        boxSizing: "border-box",
        display: "grid",
        gridTemplateColumns: "minmax(32px, auto) fit-content(100%) minmax(32px, auto)",
        alignItems: "center",
        gap: "var(--space-2)",
        minHeight: "var(--header-height)",
        padding: "6px var(--space-2)",
        paddingTop: "calc(6px + env(safe-area-inset-top, 0px))",
        background: "var(--surface)",
        borderBottom: "var(--hairline) solid var(--border)",
        ...style,
      }}
    >
      <div style={{ ...side, justifyContent: "flex-start" }}>{leading}</div>
      <div style={{ minWidth: 0, textAlign: "center" }}>
        {createElement(
          `h${headingLevel}`,
          { style: { margin: 0, font: "var(--text-subhead)", color: "var(--text-ink)", ...truncate } },
          title,
        )}
        {sub && (
          <span style={{ ...truncate, font: "var(--text-page-sub)", color: "var(--text-muted)" }}>{sub}</span>
        )}
      </div>
      <div style={{ ...side, justifyContent: "flex-end" }}>{trailing}</div>
    </header>
  );
}
