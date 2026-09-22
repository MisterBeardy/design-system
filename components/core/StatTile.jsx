export function StatTile({ label, value, sub, accent = false, style, ...props }) {
  return (
    <div
      {...props}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "12px 14px",
        ...style,
      }}
    >
      <div style={{ font: "var(--text-tile-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-muted)" }}>
        {label}
      </div>
      <div style={{ font: "var(--text-tile-value)", color: accent ? "var(--accent)" : "var(--text-ink)", marginTop: 4 }}>
        {value}
      </div>
      {sub && (
        <div style={{ font: "var(--text-tile-sub)", color: "var(--text-muted)", marginTop: 2 }}>
          {sub}
        </div>
      )}
    </div>
  );
}
