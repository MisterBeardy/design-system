import { isValidElement } from "react";
import { cx } from "./cx.js";
import { GlyphTile } from "./GlyphTile.jsx";

const truncate = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const px = (v) => (typeof v === "number" ? `${v}px` : v);

export function Row({
  glyph,
  label,
  sub,
  value,
  trailing,
  chevron = false,
  onClick,
  disabled = false,
  className,
  style,
  ...props
}) {
  const interactive = typeof onClick === "function";

  // --row-inset follows --glyph-size, but a GlyphTile given its own `size` is a
  // prop, which CSS can't see. Recompute the inset for this row's separator so
  // it still starts at the label's leading edge.
  const glyphSize = isValidElement(glyph) && glyph.type === GlyphTile ? glyph.props.size : undefined;
  const rowStyle = glyphSize != null
    ? { "--row-inset": `calc(var(--row-pad-x) + ${px(glyphSize)} + var(--row-gap))`, ...style }
    : style;

  const body = (
    <>
      {glyph}
      <span style={{ minWidth: 0, flex: 1, textAlign: "left" }}>
        <span style={{ display: "block", font: "var(--text-row-label)", color: "var(--text-ink)", ...truncate }}>
          {label}
        </span>
        {sub && (
          <span style={{ display: "block", font: "var(--text-row-sub)", color: "var(--text-muted)", marginTop: 1, ...truncate }}>
            {sub}
          </span>
        )}
      </span>
      {value !== undefined && value !== null && (
        <span style={{ flexShrink: 0, font: "var(--text-row-value)", color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>
          {value}
        </span>
      )}
      {trailing}
      {chevron && (
        <svg aria-hidden viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0, color: "var(--text-muted)", opacity: 0.5 }}>
          <path d="M7.5 4.5L13 10l-5.5 5.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  // Spread after the consumer's props: the class hook and data attributes are
  // what core.css draws the separator, hover and focus ring from.
  const shared = {
    className: cx("ds-row", className),
    "data-glyph": glyph ? "true" : undefined,
    "data-interactive": interactive && !disabled ? "true" : undefined,
    "data-disabled": disabled ? "true" : undefined,
    style: rowStyle,
  };

  // A row that does something must be reachable by keyboard; a row that doesn't
  // must not pretend it is.
  if (interactive) {
    return (
      <button type="button" onClick={onClick} disabled={disabled} {...props} {...shared}>
        {body}
      </button>
    );
  }
  return <div {...props} {...shared}>{body}</div>;
}
