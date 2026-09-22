// The two looks every text control shares, so Input, Select and Textarea
// can't drift apart.
//
// boxed: a field on its own, with its own surface, border and radius (a
//   search box, a single field on a card).
// bare: inside a Field row in a Group, where the Group is the box. No border
//   or fill; the value sits right-aligned, like a Row's value.
export function controlStyle({ bare, invalid, disabled }) {
  const base = {
    boxSizing: "border-box",
    minWidth: 0,
    margin: 0,
    color: invalid && bare ? "var(--danger-text)" : "var(--text-ink)",
    cursor: disabled ? "default" : undefined,
    opacity: disabled ? 0.5 : undefined,
  };
  if (bare) {
    return {
      ...base,
      flex: "1 1 0",
      width: "auto",
      font: "var(--text-row-label)",
      textAlign: "right",
      background: "transparent",
      border: "none",
      borderRadius: 0,
      padding: 0,
    };
  }
  return {
    ...base,
    width: "100%",
    font: "var(--text-input)",
    background: "var(--surface)",
    border: `1px solid ${invalid ? "var(--danger)" : "var(--border)"}`,
    // A second pixel of danger inside the border, so an invalid field reads
    // by weight as well as colour.
    boxShadow: invalid ? "inset 0 0 0 1px var(--danger)" : undefined,
    borderRadius: "var(--radius-md)",
    padding: "12px 14px",
  };
}

export const isInvalid = (v) => v === true || v === "true";
