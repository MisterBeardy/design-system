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
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}>
        {label}
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: accent ? "var(--accent)" : "var(--text-ink)", marginTop: 4 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
          {sub}
        </div>
      )}
    </div>
  );
}
