import { cx } from "./cx.js";
import { Icon } from "./Icon.jsx";

// The one surface that takes a status tint. Everywhere else colour stays on
// small elements; a banner is a message, and its tint is what it says.
// Every pair here is the -text token on its -soft fill (6.5:1 or better in
// both themes; `npm run check` holds it there).
const TONES = {
  success: { fill: "var(--success-soft)", ink: "var(--success-text)", icon: "check" },
  warning: { fill: "var(--warning-soft)", ink: "var(--warning-text)", icon: "alert" },
  danger:  { fill: "var(--danger-soft)",  ink: "var(--danger-text)",  icon: "alert" },
  neutral: { fill: "var(--surface-alt)",  ink: "var(--text-ink)",     icon: "info" },
};

export function Banner({
  tone = "neutral",
  title,
  icon,
  action,
  onDismiss,
  dismissLabel = "Dismiss",
  children,
  className,
  style,
  ...props
}) {
  const t = TONES[tone] ?? TONES.neutral;
  // `icon={null}` hides it; leaving it out uses the tone's own.
  const glyph = icon === undefined ? <Icon name={t.icon} /> : icon;
  return (
    <div
      // A danger banner interrupts; the rest are announced politely.
      role={tone === "danger" ? "alert" : "status"}
      {...props}
      className={cx("ds-banner", className)}
      style={{
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        boxSizing: "border-box",
        padding: "12px 14px",
        borderRadius: "var(--radius-card)",
        background: t.fill,
        color: t.ink,
        ...style,
      }}
    >
      {glyph && <span style={{ display: "flex", flexShrink: 0, marginTop: 2 }}>{glyph}</span>}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ font: "var(--text-message-title)" }}>{title}</div>}
        {children && <div style={{ font: "var(--text-message)", marginTop: title ? 2 : 0 }}>{children}</div>}
        {action && <div style={{ marginTop: 10 }}>{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          aria-label={dismissLabel}
          onClick={onDismiss}
          className="ds-button"
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            margin: "-4px -6px 0 0",
            padding: 0,
            border: "none",
            borderRadius: "var(--radius-sm)",
            background: "transparent",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <Icon name="close" size={14} />
        </button>
      )}
    </div>
  );
}
