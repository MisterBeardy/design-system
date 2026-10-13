import { isValidElement } from "react";
import { cx } from "./cx.js";
import { GlyphTile } from "./GlyphTile.jsx";
import { Icon } from "./Icon.jsx";

const truncate = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

// `wrap` lets label and sub run onto more lines; the default stays one line
// with an ellipsis, and the full text is in the title (a native tooltip on hover).
const flow = { overflowWrap: "anywhere", whiteSpace: "normal" };

const px = (v) => (typeof v === "number" ? `${v}px` : v);

export function Row({
  glyph,
  label,
  sub,
  value,
  trailing,
  chevron = false,
  wrap = false,
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

  const textStyle = wrap ? flow : truncate;
  const titleOf = (node) => (!wrap && typeof node === "string" ? node : undefined);

  const body = (
    <>
      {glyph}
      <span style={{ minWidth: 0, flex: 1, textAlign: "left" }}>
        <span style={{ display: "block", font: "var(--type-row-label)", color: "var(--text-ink)", ...textStyle }} title={titleOf(label)}>
          {label}
        </span>
        {sub && (
          <span style={{ display: "block", font: "var(--type-row-sub)", color: "var(--text-muted)", marginTop: 1, ...textStyle }} title={titleOf(sub)}>
            {sub}
          </span>
        )}
      </span>
      {value !== undefined && value !== null && (
        <span style={{ flexShrink: 0, font: "var(--type-row-value)", color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>
          {value}
        </span>
      )}
      {trailing}
      {chevron && (
        <Icon name="chevron-right" size={14} style={{ color: "var(--text-muted)", opacity: 0.5 }} />
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
