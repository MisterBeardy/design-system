const SUB_COLOR = {
  muted:   "var(--text-muted)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger:  "var(--danger)",
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
              font: "var(--text-stat)",
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
              font: "var(--text-stat-label)",
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
                font: "var(--text-row-sub)",
                fontVariantNumeric: "tabular-nums",
                color: SUB_COLOR[s.subTone ?? "muted"],
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
