import type { ReactNode, ReactElement, HTMLAttributes } from "react";

/**
 * A small surface anchored to the control that opened it: a filter, a short
 * form, a menu of Rows. Floats, so it takes --shadow-popover.
 *
 * @startingPoint section="Components" subtitle="Anchored panel" viewport="700x360"
 */
export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  open: boolean;
  /** Called on Escape, on a click outside, and from the close button. */
  onClose?: () => void;
  /** The control that opens it. It gets `aria-expanded` and `aria-haspopup`;
   *  you own its onClick. */
  trigger?: ReactElement;
  /** Shown in a header row with a close button. Without it there's no header. */
  title?: ReactNode;
  /** Not shown; read by screen readers. Needed only when `title` isn't a plain string; otherwise the
   *  title is the name. */
  label?: string;
  /** Panel width in px (or any CSS length); it never exceeds the viewport. */
  width?: number | string;
  /** Preferred side. It flips when there isn't room. */
  placement?: "bottom" | "top";
  /** Which edge it lines up with. It flips when there isn't room. */
  align?: "start" | "end";
  children?: ReactNode;
}
