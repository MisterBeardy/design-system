import { cx } from "./cx.js";
import { Icon } from "./Icon.jsx";

const truncate = { display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" };

// Bottom navigation: the three to five places the app is made of, always
// there, with the accent on the current one and nothing else.
//
// It's translucent, and it's the only thing besides the Sheet that is. The
// justification is the same one: the content behind it is live. The list runs
// under the bar and keeps moving there, so you can see there's more below and
// roughly how much — a solid bar would say the list ends where the bar starts.
// `solid` turns that off for an app whose content behind it is busy enough to
// make the labels swim, and a reader who has asked for reduced transparency
// gets the opaque version anyway.
//
// Because content runs under it, the scrolling area above needs room at the
// bottom: `calc(var(--tabbar-height) + env(safe-area-inset-bottom, 0px))`.
export function TabBar({
  items,
  value,
  onChange,
  label = "Main",
  solid = false,
  fixed = true,
  className,
  style,
  ...props
}) {
  return (
    <nav
      aria-label={label}
      {...props}
      className={cx("ds-tabbar", solid && "ds-tabbar-solid", className)}
      style={{
        ...(fixed ? { position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 700 } : null),
        boxSizing: "border-box",
        display: "flex",
        minHeight: "var(--tabbar-height)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        // No shadow. The Sheet is the system's one elevation; this bar is part
        // of the frame, and a hairline is all an edge needs.
        borderTop: "var(--hairline) solid var(--border)",
        ...style,
      }}
    >
      {items.map((item) => {
        const current = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            // aria-current, not aria-selected: these are links between places,
            // not tabs inside one panel. There's no tablist here.
            aria-current={current ? "page" : undefined}
            onClick={() => onChange?.(item.value)}
            className="ds-tab"
            style={{
              flex: 1,
              minWidth: 0,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              padding: "8px 4px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              // --accent-text, not --accent: this is text and a line-art glyph
              // on the page background, and it has to clear 4.5:1 there.
              color: current ? "var(--accent-text)" : "var(--text-muted)",
            }}
          >
            {item.icon && <Icon name={item.icon} size={20} />}
            <span style={{ ...truncate, font: "var(--type-tab)" }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
