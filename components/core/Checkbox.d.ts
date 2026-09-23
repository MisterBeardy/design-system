import type { ReactNode, InputHTMLAttributes } from "react";

/**
 * Tick to choose, applied when the form is submitted. A real checkbox
 * underneath. The tick box spends the accent.
 *
 * @startingPoint section="Components" subtitle="Tick to choose" viewport="700x200"
 */
export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "checked" | "type"> {
  checked: boolean;
  /** Required, like Switch's: `checked` is controlled, so without this the
   *  box can't be ticked. */
  onChange: (next: boolean) => void;
  label?: ReactNode;
  /** A line under the label: what ticking it means. */
  sub?: ReactNode;
  disabled?: boolean;
  /** Draw it as a row inside a `Group`: tappable across the whole width, with
   *  the separator inset to the label. */
  row?: boolean;
}
