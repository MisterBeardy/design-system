import { isValidElement, useId, useState } from "react";
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
  help,
  defaultHelpOpen = false,
  onClick,
  disabled = false,
  className,
  style,
  ...props
}) {
  const interactive = typeof onClick === "function";
  // `help` puts an ⓘ button after the row's control and opens the full
  // description under the row. A row that is itself a button can't hold
  // another one, so `help` applies to rows without an `onClick`.
  const hasHelp = help != null && help !== false && !interactive;
  const [helpOpen, setHelpOpen] = useState(defaultHelpOpen);
  const helpId = useId();

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
      {hasHelp && (
        <button
          type="button"
          className="ds-button ds-row-help"
          aria-label={typeof label === "string" ? `About ${label}` : "More information"}
          aria-expanded={helpOpen}
          aria-controls={helpOpen ? helpId : undefined}
          onClick={() => setHelpOpen(!helpOpen)}
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            margin: "-4px -6px -4px 0",
            padding: 0,
            border: "none",
            borderRadius: "var(--radius-pill)",
            background: "transparent",
            color: helpOpen ? "var(--info-text)" : "var(--text-muted)",
            cursor: "pointer",
          }}
        >
          <Icon name="info" size={16} />
        </button>
      )}
      {chevron && (
        <Icon name="chevron-right" size={14} style={{ color: "var(--text-muted)", opacity: 0.5 }} />
      )}
      {hasHelp && helpOpen && (
        <div
          id={helpId}
          role="note"
          style={{
            flexBasis: "100%",
            // Lines up with the label, past the glyph.
            paddingLeft: glyph ? "calc(var(--row-inset) - var(--row-pad-x))" : 0,
            font: "var(--type-row-sub)",
            color: "var(--text-muted)",
            overflowWrap: "anywhere",
            textAlign: "left",
          }}
        >
          {help}
        </div>
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
    style: hasHelp ? { flexWrap: "wrap", rowGap: 6, ...rowStyle } : rowStyle,
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
