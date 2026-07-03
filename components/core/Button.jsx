export function Button({ variant = "primary", size = "md", children, style, ...props }) {
  const variants = {
    primary:   { background: "var(--accent)", color: "#fff", border: "none" },
    secondary: { background: "var(--surface)", color: "var(--text-ink)", border: "1px solid var(--border)" },
    soft:      { background: "var(--accent-soft)", color: "var(--accent-text)", border: "none" },
    ghost:     { background: "transparent", color: "var(--text-muted)", border: "none" },
  };
  const sizes = {
    sm: { fontSize: 13, padding: "8px 14px" },
    md: { fontSize: 14, padding: "11px 20px" },
  };
  return (
    <button
      {...props}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        borderRadius: "var(--radius-md)",
        cursor: "pointer",
        ...sizes[size],
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}
