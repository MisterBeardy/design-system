import { Children, cloneElement, useId } from "react";
import { cx } from "./cx.js";
import { Icon } from "./Icon.jsx";
import { Textarea } from "./Textarea.jsx";

// One labelled control as a row in a Group: label on the left, the value on
// the right, like a Row. It wires the label, the help or error line and the
// control together (id, aria-invalid, aria-describedby), and draws the
// control bare, because the Group is the box.
export function Field({ label, help, error, glyph, children, className, style, ...props }) {
  const autoId = useId();
  const child = Children.only(children);
  const id = child.props.id ?? `field${autoId.replace(/:/g, "")}`;
  const msgId = `${id}-msg`;
  const message = error || help;
  // Prose needs the row's width: the label goes above it instead of beside it.
  const stacked = child.type === Textarea;

  const control = cloneElement(child, {
    id,
    bare: true,
    "aria-invalid": error ? true : child.props["aria-invalid"],
    "aria-describedby": [child.props["aria-describedby"], message && msgId].filter(Boolean).join(" ") || undefined,
  });

  return (
    <div
      {...props}
      className={cx("ds-row", "ds-field", className)}
      data-glyph={glyph && !stacked ? "true" : undefined}
      data-invalid={error ? "true" : undefined}
      style={{ flexDirection: "column", alignItems: "stretch", gap: 4, ...style }}
    >
      <label
        htmlFor={id}
        style={{
          display: "flex",
          flexDirection: stacked ? "column" : "row",
          alignItems: stacked ? "stretch" : "center",
          gap: stacked ? 6 : "var(--row-gap)",
          cursor: "text",
        }}
      >
        {!stacked && glyph}
        <span
          style={{
            flexShrink: 0,
            font: stacked ? "var(--text-row-sub)" : "var(--text-row-label)",
            color: error ? "var(--danger-text)" : stacked ? "var(--text-muted)" : "var(--text-ink)",
          }}
        >
          {label}
        </span>
        {control}
        {/* Never colour alone: an error also gets a glyph and words. */}
        {error && !stacked && <Icon name="alert" size={14} style={{ color: "var(--danger-text)" }} />}
      </label>
      {message && (
        <div
          id={msgId}
          style={{
            font: "var(--text-row-sub)",
            color: error ? "var(--danger-text)" : "var(--text-muted)",
            // Under the label's leading edge, past the glyph if there is one.
            marginLeft: glyph && !stacked ? "calc(var(--row-inset) - var(--row-pad-x))" : 0,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
