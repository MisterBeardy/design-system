import { cx } from "./cx.js";
import { controlStyle, isInvalid } from "./controls.js";

export function Input({ disabled = false, bare = false, className, style, ...props }) {
  return (
    <input
      {...props}
      disabled={disabled}
      className={cx("ds-input", className)}
      data-bare={bare ? "true" : undefined}
      // border-box, like .ds-row: without a host reset, `width: 100%` plus the
      // padding and border overflows the container by 30px.
      style={{ ...controlStyle({ bare, invalid: isInvalid(props["aria-invalid"]), disabled }), ...style }}
    />
  );
}
