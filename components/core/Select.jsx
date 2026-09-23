import { cx } from "./cx.js";
import { controlStyle, isInvalid } from "./controls.js";
import { Icon } from "./Icon.jsx";

// A native <select>: the platform's own picker (a wheel on iOS, a sheet on
// Android, a menu on desktop), keyboard and form behaviour for free. Only the
// closed control is restyled.
export function Select({ options, value, onChange, disabled = false, bare = false, placeholder, className, style, ...props }) {
  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const invalid = isInvalid(props["aria-invalid"]);
  const box = controlStyle({ bare, invalid, disabled });
  const empty = value == null || value === "";
  return (
    <span
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        minWidth: 0,
        flex: bare ? "1 1 0" : undefined,
        width: bare ? undefined : "100%",
      }}
    >
      <select
        {...props}
        value={value ?? ""}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={cx("ds-input", "ds-select", className)}
        data-bare={bare ? "true" : undefined}
        style={{
          ...box,
          appearance: "none",
          WebkitAppearance: "none",
          cursor: disabled ? "default" : "pointer",
          ...(bare
            ? {
                // In a row it reads like a Row's value: mono, muted, then the chevron.
                width: "100%",
                font: "var(--type-row-value)",
                fontVariantNumeric: "tabular-nums",
                color: invalid ? "var(--danger-text)" : "var(--text-muted)",
                textAlignLast: "right",
                paddingRight: 20,
              }
            : {
                paddingRight: 38,
                // Showing the placeholder, not a choice: read it as one.
                ...(empty && placeholder != null ? { color: "var(--text-muted)" } : null),
              }),
          ...style,
        }}
      >
        {placeholder != null && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {opts.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
      <Icon
        name={bare ? "chevron-right" : "chevron-down"}
        size={bare ? 14 : 16}
        style={{
          position: "absolute",
          right: bare ? 0 : 14,
          color: "var(--text-muted)",
          opacity: bare ? 0.5 : 1,
          pointerEvents: "none",
        }}
      />
    </span>
  );
}
