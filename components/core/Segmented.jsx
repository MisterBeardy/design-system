const SIZES = {
  sm: { padding: "4px 8px",   fontSize: 11 },
  md: { padding: "6px 12px",  fontSize: 12 },
};

const truncate = { display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };

export function Segmented({ options, value, onChange, label, size = "md", style, ...props }) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      {...props}
      style={{
        display: "flex",
        gap: 2,
        padding: 2,
        boxSizing: "border-box",
        background: "var(--surface-alt)",
        borderRadius: "var(--radius-md)",
        ...style,
      }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className="ds-segment"
            style={{
              flex: 1,
              textAlign: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              cursor: "pointer",
              // The thumb is inset inside the 2px-padded track, so its radius
              // has to come in from the track's by roughly that padding —
              // concentric, not the same number.
              borderRadius: 8,
              ...SIZES[size],
              ...(active
                ? { background: "var(--surface)", color: "var(--text-ink)", border: "1px solid var(--border)" }
                : { background: "transparent", color: "var(--text-muted)", border: "1px solid transparent" }),
            }}
          >
            <span style={truncate}>{opt.label}</span>
            {opt.sub && (
              <span style={{ ...truncate, fontSize: 10, fontWeight: 400, color: "var(--text-muted)" }}>{opt.sub}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
