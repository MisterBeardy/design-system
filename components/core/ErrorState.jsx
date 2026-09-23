import { cx } from "./cx.js";
import { Button } from "./Button.jsx";
import { GlyphTile } from "./GlyphTile.jsx";
import { Icon } from "./Icon.jsx";

// In place of content that failed to load, usually inside its Group: what
// happened, what's still safe, and one way forward.
export function ErrorState({
  title,
  onRetry,
  retryLabel = "Try again",
  action,
  icon,
  children,
  className,
  style,
  ...props
}) {
  return (
    <div
      role="alert"
      {...props}
      className={cx("ds-error", className)}
      style={{ display: "flex", gap: "var(--row-gap)", alignItems: "flex-start", padding: "14px var(--row-pad-x)", ...style }}
    >
      <GlyphTile tone="danger">{icon ?? <Icon name="alert" size={13} />}</GlyphTile>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ font: "var(--type-message-title)", color: "var(--text-ink)" }}>{title}</div>}
        {children && (
          <div style={{ font: "var(--type-message)", color: "var(--text-muted)", marginTop: title ? 3 : 0 }}>{children}</div>
        )}
        {(action || onRetry) && (
          <div style={{ marginTop: 10 }}>
            {action ?? (
              <Button variant="secondary" size="sm" onClick={onRetry}>
                {retryLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
