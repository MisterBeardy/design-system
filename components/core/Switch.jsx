import { cx } from "./cx.js";

export function Switch({ checked, onChange, disabled = false, label, className, style, ...props }) {
  return (
    <label
      style={{
        position: "relative",
        display: "inline-flex",
        flexShrink: 0,
        alignItems: "center",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      {/* A real checkbox underneath — native keyboard behaviour, focus, and form
          semantics for free. Only the presentation changes. */}
      <input
        type="checkbox"
        role="switch"
        aria-label={label}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        {...props}
        className={cx("ds-switch-input", className)}
      />
      <span
        aria-hidden
        className="ds-switch-track"
        style={{
          display: "block",
          width: 37,
          height: 22,
          borderRadius: "var(--radius-pill)",
          background: checked ? "var(--success)" : "var(--border)",
        }}
      />
      <span
        aria-hidden
        className="ds-switch-knob"
        style={{
          position: "absolute",
          left: 2,
          width: 18,
          height: 18,
          borderRadius: "var(--radius-pill)",
          // On, the knob sits on --success and takes its on-colour, dark in the
          // dark theme. Off, it stays white against the neutral track.
          background: checked ? "var(--on-success)" : "#fff",
          pointerEvents: "none",
          transform: checked ? "translateX(15px)" : "translateX(0)",
          boxShadow: "0 1px 3px rgb(0 0 0 / 0.3)",
        }}
      />
    </label>
  );
}
