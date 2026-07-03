export function Chip({ tone = "neutral", mono = true, children, style, ...props }) {
  const tones = {
    neutral: { background: "var(--surface-alt)", color: "var(--text-muted)" },
    accent:  { background: "var(--accent-soft)", color: "var(--accent-text)" },
    ink:     { background: "var(--text-ink)", color: "var(--bg)" },
    success: { background: "var(--success-soft)", color: "var(--success-text)" },
    warning: { background: "var(--warning-soft)", color: "var(--warning-text)" },
    danger:  { background: "var(--danger-soft)", color: "var(--danger-text)" },
  };
  return (
    <span
      {...props}
      style={{
        display: "inline-block",
        fontFamily: mono ? "var(--font-mono)" : "var(--font-display)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: mono ? "0.04em" : "normal",
        borderRadius: "var(--radius-pill)",
        padding: "5px 12px",
        ...tones[tone],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
