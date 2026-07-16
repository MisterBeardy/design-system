export function Group({ header, footer, children, style, ...props }) {
  return (
    <div {...props} style={style}>
      {header && (
        <div
          style={{
            font: "var(--text-section)",
            letterSpacing: "var(--tracking-caps)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            padding: "2px var(--row-pad-x) 6px",
          }}
        >
          {header}
        </div>
      )}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-card)",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
      {footer && (
        <div
          style={{
            font: "var(--text-row-sub)",
            color: "var(--text-muted)",
            padding: "6px var(--row-pad-x) 0",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
