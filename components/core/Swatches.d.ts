import type { HTMLAttributes } from "react";

export interface SwatchOption<T extends string = string> {
  value: T;
  /** The colour's name: the chip's accessible label and tooltip. Required,
   *  since the colour alone says nothing to a screen reader. */
  label: string;
  /** Any CSS background: a colour, or a gradient for a two-tone livery. */
  color: string;
  disabled?: boolean;
}

/**
 * Pick one colour from a few: a theme, a livery, a label colour. A
 * radiogroup of round chips, with a ring in ink on the chosen one.
 *
 * @startingPoint section="Components" subtitle="Colour picker" viewport="700x160"
 */
export interface SwatchesProps<T extends string = string>
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: ReadonlyArray<SwatchOption<T>>;
  value: T;
  onChange: (next: T) => void;
  /** Not shown; read by screen readers. The name of the group. Required. */
  label: string;
}
