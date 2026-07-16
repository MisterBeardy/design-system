const truncate = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export function Row({
  glyph,
  label,
  sub,
  value,
  trailing,
  chevron = false,
  onClick,
  disabled = false,
  style,
  ...props
}) {
  const interactive = typeof onClick === "function";

  const body = (
    <>
      {glyph}
      <span style={{ minWidth: 0, flex: 1, textAlign: "left" }}>
        <span style={{ display: "block", font: "var(--text-row-label)", color: "var(--text-ink)", ...truncate }}>
          {label}
        </span>
        {sub && (
          <span style={{ display: "block", font: "var(--text-row-sub)", color: "var(--text-muted)", marginTop: 1, ...truncate }}>
            {sub}
          </span>
        )}
      </span>
      {value !== undefined && value !== null && (
        <span style={{ flexShrink: 0, font: "var(--text-row-value)", color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>
          {value}
        </span>
      )}
      {trailing}
      {chevron && (
        <svg aria-hidden viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0, color: "var(--text-muted)", opacity: 0.5 }}>
          <path d="M7.5 4.5L13 10l-5.5 5.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  const shared = {
    className: "ds-row",
    "data-glyph": glyph ? "true" : undefined,
    "data-interactive": interactive && !disabled ? "true" : undefined,
    "data-disabled": disabled ? "true" : undefined,
    style,
  };

  // A row that does something must be reachable by keyboard; a row that doesn't
  // must not pretend it is.
  if (interactive) {
    return (
      <button type="button" onClick={onClick} disabled={disabled} {...shared} {...props}>
        {body}
      </button>
    );
  }
  return <div {...shared} {...props}>{body}</div>;
}
