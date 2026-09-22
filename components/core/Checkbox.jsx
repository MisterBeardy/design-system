import { cx } from "./cx.js";
import { Icon } from "./Icon.jsx";

// A real checkbox underneath, like Switch: native keyboard behaviour, focus and
// form semantics. It says "tick this, it takes effect when you submit"; a
// change that takes effect now is a Switch.
export function Checkbox({ checked, onChange, label, sub, disabled = false, row = false, className, style, ...props }) {
  return (
    <label
      className={cx(row && "ds-row", "ds-checkbox", className)}
      data-glyph={row ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      style={{
        display: "flex",
        gap: row ? "var(--row-gap)" : 10,
        alignItems: sub ? "flex-start" : "center",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled && !row ? 0.5 : undefined,
        // In a row the box stands where a GlyphTile would, so the separator
        // insets to the label's edge past a 20px box instead of a 23px tile.
        ...(row ? { "--row-inset": "calc(var(--row-pad-x) + 20px + var(--row-gap))" } : null),
        ...style,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        {...props}
        className="ds-checkbox-input"
      />
      <span
        aria-hidden="true"
        className="ds-checkbox-box"
        style={{
          flexShrink: 0,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 20,
          height: 20,
          borderRadius: "var(--radius-sm)",
          // Ticking is an interactive choice, so it spends the accent.
          ...(checked
            ? { background: "var(--accent)", border: "1px solid transparent", color: "var(--on-accent)" }
            : { background: "var(--surface)", border: "1.5px solid var(--text-muted)", color: "transparent" }),
        }}
      >
        {checked && <Icon name="check" size={14} />}
      </span>
      {(label || sub) && (
        <span style={{ minWidth: 0, paddingTop: sub ? 1 : 0 }}>
          <span style={{ display: "block", font: row ? "var(--text-row-label)" : "var(--text-input)", color: "var(--text-ink)" }}>{label}</span>
          {sub && <span style={{ display: "block", font: "var(--text-row-sub)", color: "var(--text-muted)", marginTop: 2 }}>{sub}</span>}
        </span>
      )}
    </label>
  );
}
