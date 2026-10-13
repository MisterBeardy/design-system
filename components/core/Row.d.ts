import type { ReactNode, HTMLAttributes } from "react";

/**
 * One row inside a `Group`. One idea per row.
 *
 * @startingPoint section="Components" subtitle="Grouped list row" viewport="700x200"
 */
export interface RowProps extends Omit<HTMLAttributes<HTMLElement>, "onClick"> {
  /** A `GlyphTile`. Shifts the separator inset to the label's leading edge,
   *  following the tile's `size` if it has one. */
  glyph?: ReactNode;
  label: ReactNode;
  sub?: ReactNode;
  /** Right-aligned muted value, e.g. "250 mi". Mono, tabular. */
  value?: ReactNode;
  /** Right-aligned control — a `Switch`, a `Chip`, a button. Sits after `value`. */
  trailing?: ReactNode;
  chevron?: boolean;
  /** Let the label and sub-label wrap onto more lines. Default: one line each,
   *  ending in an ellipsis, with the full text in the element's `title`. Use it
   *  where the text can be long and there is no hover (a phone). */
  wrap?: boolean;
  /** Given, the row renders as a <button>; otherwise a <div>. */
  onClick?: () => void;
  disabled?: boolean;
}
