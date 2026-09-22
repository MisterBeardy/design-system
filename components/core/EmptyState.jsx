import { cx } from "./cx.js";
import { GlyphTile } from "./GlyphTile.jsx";
import { InboxGlyph } from "./glyphs.jsx";

// Fills the panel it's in: the first-run moment for a screen with nothing
// to show yet. A neutral tile, one line, one sentence, one way forward.
export function EmptyState({ icon, title, action, children, className, style, ...props }) {
  return (
    <div
      {...props}
      className={cx("ds-empty", className)}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        boxSizing: "border-box",
        padding: "var(--space-5)",
        textAlign: "center",
        ...style,
      }}
    >
      <GlyphTile tone="neutral" size={44}>{icon ?? <InboxGlyph size={22} />}</GlyphTile>
      {title && <div style={{ font: "var(--text-subhead)", color: "var(--text-ink)" }}>{title}</div>}
      {children && (
        <div style={{ font: "var(--text-body)", color: "var(--text-muted)", maxWidth: 300 }}>{children}</div>
      )}
      {action && <div style={{ marginTop: 4 }}>{action}</div>}
    </div>
  );
}
