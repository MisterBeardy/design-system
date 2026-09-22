import { cx } from "./cx.js";

// Every variant carries a 1px border, transparent where it isn't drawn, so a
// primary and a secondary button side by side are the same height. The
// padding is 1px less than the old borderless primary's, which keeps that
// variant's box exactly as it was.
const VARIANTS = {
  primary:   { background: "var(--accent)", color: "var(--on-accent)", borderColor: "transparent" },
  secondary: { background: "var(--surface)", color: "var(--text-ink)", borderColor: "var(--border)" },
  soft:      { background: "var(--accent-soft)", color: "var(--accent-text)", borderColor: "transparent" },
  ghost:     { background: "transparent", color: "var(--text-muted)", borderColor: "transparent" },
};

const SIZES = {
  sm: { font: "var(--text-button-sm)", padding: "7px 13px" },
  md: { font: "var(--text-button)", padding: "10px 19px" },
};

export function Button({ variant = "primary", size = "md", disabled = false, className, children, style, ...props }) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cx("ds-button", className)}
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: "var(--radius-md)",
        // Disabled reads the same as Row and Switch: half strength, no pointer.
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : undefined,
        ...SIZES[size],
        ...VARIANTS[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}
