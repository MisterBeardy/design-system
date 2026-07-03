export function Input({ style, ...props }) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        fontFamily: "var(--font-display)",
        fontSize: 14,
        color: "var(--text-ink)",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: "12px 14px",
        ...style,
      }}
    />
  );
}
