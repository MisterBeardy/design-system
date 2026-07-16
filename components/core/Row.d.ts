import type { ReactNode, HTMLAttributes } from "react";

/**
 * One row inside a `Group`. One idea per row.
 *
 * @startingPoint section="Components" subtitle="Grouped list row" viewport="700x200"
 */
export interface RowProps extends Omit<HTMLAttributes<HTMLElement>, "onClick"> {
  /** A `GlyphTile`. Shifts the separator inset to the label's leading edge. */
  glyph?: ReactNode;
  label: ReactNode;
  sub?: ReactNode;
  /** Right-aligned muted value, e.g. "250 mi". Mono, tabular. */
  value?: ReactNode;
  /** Right-aligned control — a `Switch`, a `Chip`, a button. Sits after `value`. */
  trailing?: ReactNode;
  chevron?: boolean;
  /** Given, the row renders as a <button>; otherwise a <div>. */
  onClick?: () => void;
  disabled?: boolean;
}
