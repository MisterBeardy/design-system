const TONE_BG = {
  accent:  "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger:  "var(--danger)",
  neutral: "var(--text-muted)",
};

// The glyph on each tone's fill. White in the light theme, dark ink in the
// dark one, where every fill is too light for white.
const TONE_ON = {
  accent:  "var(--on-accent)",
  success: "var(--on-success)",
  warning: "var(--on-warning)",
  danger:  "var(--on-danger)",
  neutral: "var(--on-neutral)",
};

export function GlyphTile({ tone = "neutral", color, data, size, children, style, ...props }) {
  // Precedence: a raw `color`, then a palette slot (data={1…6}), then `tone`.
  // A palette slot brings a glyph colour for each theme (--on-data); a raw
  // colour is the consumer's own and isn't themed, so its glyph stays white.
  const background = color ?? (data ? `var(--data-${data})` : TONE_BG[tone]);
  const glyph = color ? "#fff" : data ? "var(--on-data)" : TONE_ON[tone];
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
        background,
        color: glyph,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
