export function Card({ children, style, ...props }) {
  return (
    <div
      {...props}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-4)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
