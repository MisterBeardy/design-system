import type { InputHTMLAttributes } from "react";

/**
 * A toggle that takes effect immediately. A real checkbox underneath.
 *
 * @startingPoint section="Components" subtitle="Switch" viewport="700x120"
 */
export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "checked" | "type" | "role"> {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  /** Accessible name. Required when the switch has no adjacent `Row` label. */
  label?: string;
}
