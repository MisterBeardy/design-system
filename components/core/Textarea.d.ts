import type { TextareaHTMLAttributes } from "react";

/**
 * Multi-line text: Input's surface, border and radius, a looser line, and it
 * grows downward only.
 *
 * @startingPoint section="Components" subtitle="Multi-line text" viewport="700x160"
 */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** No border or fill: for inside a `Field` row, which sets it for you and
   *  puts the label above. */
  bare?: boolean;
}
