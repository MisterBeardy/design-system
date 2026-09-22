import type { ReactNode, ReactElement, HTMLAttributes } from "react";

/**
 * One labelled control as a row in a `Group`: the label on the left, the
 * value on the right, help or error under it. Wraps an `Input`, `Select` or
 * `Textarea` and wires the label, `aria-invalid` and `aria-describedby`.
 *
 * @startingPoint section="Components" subtitle="Labelled row in a form" viewport="700x260"
 */
export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  /** One line under the row: what goes here, or what it's for. */
  help?: ReactNode;
  /** Replaces `help` and marks the control invalid: say what's wrong and how
   *  to fix it. */
  error?: ReactNode;
  /** A `GlyphTile` before the label, like a Row. */
  glyph?: ReactNode;
  /** Exactly one `Input`, `Select` or `Textarea`. A `Textarea` puts the label
   *  above it. */
  children: ReactElement;
}
