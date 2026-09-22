import type { SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Pick one of a list, with the platform's own picker: a native <select>,
 * restyled closed.
 *
 * @startingPoint section="Components" subtitle="Pick one of a list" viewport="700x120"
 */
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
  /** Strings, or `{ value, label }` when what's shown differs from what's stored. */
  options: ReadonlyArray<string | SelectOption>;
  value?: string;
  onChange?: (next: string) => void;
  /** Shown, muted, while nothing is chosen. */
  placeholder?: string;
  /** Mono and muted with a trailing chevron, like a Row's value: for inside a
   *  `Field` row, which sets it for you. */
  bare?: boolean;
}
