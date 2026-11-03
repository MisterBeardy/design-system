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
  /** Preferred side. It flips when there isn't room. "right" and "left" apply
   *  only with `anchor`; without one they are treated as "bottom". */
  placement?: "bottom" | "top" | "right" | "left";
  /** Which edge it lines up with. It flips when there isn't room. */
  align?: "start" | "end";
  /** Sit beside this box (an element, a ref, or a function returning either or a
   *  DOMRect) instead of under the trigger, so the thing being edited stays in
   *  view. `placement` then means "right" | "left" (default right, flips when
   *  there's no room), the top lines up with the box, and it follows the box on
   *  scroll and resize. Focus still returns to the trigger. */
  anchor?: HTMLElement | { current: HTMLElement | null } | (() => HTMLElement | DOMRect | null);
  /** With `anchor`: a small pointer on the near edge, aimed at the anchor and
   *  kept in line with it when the panel is clamped to the viewport. */
  pointer?: boolean;
  /** With `anchor`: below this viewport width (px) it becomes a bottom sheet
   *  (up to 52vh) and scrolls the anchor into view above it. Default 700. */
  narrow?: number;
  /** With `anchor`: px of sticky bar at the top of the page, so the scroll that
   *  makes room never slides the anchor under it. */
  topInset?: number;
  children?: ReactNode;
}
