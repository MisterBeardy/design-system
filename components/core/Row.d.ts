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
  /** The full description for a setting, kept out of the row until asked for.
   *  Puts an ⓘ button after the row's control; it opens this text under the row
   *  (`aria-expanded` / `aria-controls`). Keep a one-line `sub` for anything a
   *  person must not skim past ("One way, can't be undone"). Not for a row with
   *  `onClick`, which is already a button: `help` is ignored there. */
  help?: ReactNode;
  /** Start with the help open. Default closed. */
  defaultHelpOpen?: boolean;
  /** Given, the row renders as a <button>; otherwise a <div>. */
  onClick?: () => void;
  disabled?: boolean;
}
