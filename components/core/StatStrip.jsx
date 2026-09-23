// The -text tokens, not the solid fills: this is 11px text on the surface,
// where the solids measured 4.0 (success) and 3.4 (warning) in the light theme.
const SUB_COLOR = {
  neutral: "var(--text-muted)",
  success: "var(--success-text)",
  warning: "var(--warning-text)",
  danger:  "var(--danger-text)",
};

const truncate = { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };

export function StatStrip({ stats, style, ...props }) {
  return (
    <div {...props} style={{ display: "flex", ...style }}>
      {stats.map((s, i) => (
        <div
          key={s.label}
          style={{
            minWidth: 0,
            flex: 1,
            // The host app may not ship a box-sizing reset; flex: 1 sizes the
            // content box, so without this the padding widens each cell past
            // its share and the strip overflows its Group.
            boxSizing: "border-box",
            padding: "10px var(--space-2)",
            textAlign: "center",
            // Divider only between cells; the enclosing Group owns the outline.
            borderLeft: i > 0 ? "var(--hairline) solid var(--border)" : undefined,
          }}
        >
          <div
            style={{
              font: "var(--type-stat)",
              letterSpacing: "var(--tracking-stat)",
              fontVariantNumeric: "tabular-nums",
              color: s.accent ? "var(--accent)" : "var(--text-ink)",
              ...truncate,
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              font: "var(--type-stat-label)",
              letterSpacing: "var(--tracking-caps)",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginTop: 2,
              ...truncate,
            }}
          >
            {s.label}
          </div>
          {s.sub && (
            <div
              style={{
                font: "var(--type-row-sub)",
                fontVariantNumeric: "tabular-nums",
                color: SUB_COLOR[s.subTone ?? "neutral"],
                ...truncate,
              }}
            >
              {s.sub}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
