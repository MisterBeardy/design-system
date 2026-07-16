const TONE_BG = {
  accent:  "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger:  "var(--danger)",
  neutral: "var(--text-muted)",
};

export function GlyphTile({ tone = "neutral", color, size, children, style, ...props }) {
  return (
    <span
      aria-hidden
      {...props}
      style={{
        display: "inline-flex",
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "center",
        width: size ?? "var(--glyph-size)",
        height: size ?? "var(--glyph-size)",
        borderRadius: "var(--radius-sm)",
        background: color ?? TONE_BG[tone],
        color: "#fff",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
