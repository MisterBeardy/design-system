import { cx } from "./cx.js";

// Stand-ins in the shape of what's loading: Row-shaped for lists (drop it
// inside a Group), StatTile-shaped for tiles. The widths vary so the rows
// don't read as a finished, identical list.
const LABEL_WIDTHS = ["62%", "48%", "70%", "40%", "56%", "66%"];
const VALUE_WIDTHS = [44, 36, 52, 30, 40, 48];

const Bar = ({ width, height, radius = 4 }) => (
  <span className="ds-skeleton-bar" style={{ display: "block", flexShrink: 0, width, height, borderRadius: radius }} />
);

export function Skeleton({ variant = "rows", count = 3, label = "Loading", className, style, ...props }) {
  const items = Array.from({ length: count }, (_, i) => i);
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      {...props}
      className={cx("ds-skeleton", className)}
      // Even columns that fit three across a phone, wrapping only below 100px.
      style={variant === "tiles" ? { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 10, ...style } : style}
    >
      <span className="ds-visually-hidden">{label}</span>
      {variant === "tiles"
        ? items.map((i) => (
            <div
              key={i}
              aria-hidden="true"
              style={{
                boxSizing: "border-box",
                padding: "12px 14px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <Bar width="55%" height={9} />
              <Bar width="70%" height={22} radius={6} />
            </div>
          ))
        : items.map((i) => (
            // The Row's own class: same padding, gap and inset separators.
            <div key={i} aria-hidden="true" className="ds-row" data-glyph="true" style={{ minHeight: 44 }}>
              <Bar width="var(--glyph-size)" height="var(--glyph-size)" radius="var(--radius-sm)" />
              <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                <Bar width={LABEL_WIDTHS[i % LABEL_WIDTHS.length]} height={10} />
                <Bar width="30%" height={8} />
              </span>
              <Bar width={VALUE_WIDTHS[i % VALUE_WIDTHS.length]} height={10} />
            </div>
          ))}
    </div>
  );
}
