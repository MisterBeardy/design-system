import type { InputHTMLAttributes } from "react";

/**
 * Single-line text input — surface background, 1px border, 10px radius.
 *
 * @startingPoint section="Components" subtitle="Text input" viewport="700x100"
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** No border or fill, value right-aligned: for inside a `Field` row, which
   *  sets it for you. */
  bare?: boolean;
}
