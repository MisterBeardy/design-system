import { cx } from "./cx.js";
import { controlStyle, isInvalid } from "./controls.js";

export function Textarea({ disabled = false, bare = false, rows = 3, className, style, ...props }) {
  return (
    <textarea
      rows={rows}
      {...props}
      disabled={disabled}
      className={cx("ds-input", "ds-textarea", className)}
      data-bare={bare ? "true" : undefined}
      style={{
        ...controlStyle({ bare, invalid: isInvalid(props["aria-invalid"]), disabled }),
        // Prose runs longer than a field value: a looser line, left-aligned
        // even in a row, and it grows downward only.
        lineHeight: 1.45,
        textAlign: "left",
        resize: "vertical",
        ...(bare ? { width: "100%", flex: "none" } : null),
        ...style,
      }}
    />
  );
}
