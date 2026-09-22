import { cx } from "./cx.js";

export function Input({ disabled = false, className, style, ...props }) {
  return (
    <input
      {...props}
      disabled={disabled}
      className={cx("ds-input", className)}
      style={{
        width: "100%",
        // Same reason as .ds-row: without a host reset, `width: 100%` plus the
        // padding and border below overflows the container by 30px.
        boxSizing: "border-box",
        font: "var(--text-input)",
        color: "var(--text-ink)",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: "12px 14px",
        cursor: disabled ? "default" : undefined,
        opacity: disabled ? 0.5 : undefined,
        ...style,
      }}
    />
  );
}
