import type { ReactNode, HTMLAttributes } from "react";

export interface ToastAction {
  label: string;
  onClick?: () => void;
}

/**
 * A brief confirmation over the screen, gone on its own. One at a time:
 * change `message` to replace it.
 *
 * @startingPoint section="Components" subtitle="Brief confirmation" viewport="700x120"
 */
export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "onClose"> {
  open: boolean;
  message: ReactNode;
  /** One action, like Undo. Pressing it also closes the toast. */
  action?: ToastAction;
  /** Called when it times out, on Escape, and after its action. */
  onClose?: () => void;
  /** Milliseconds shown. Defaults to 5000, or 8000 with an action;
   *  `Infinity` keeps it until closed. Paused while hovered or focused. */
  duration?: number;
  /** Renders in the flow instead of fixed to the bottom of the viewport:
   *  for a toast inside a panel, and for previews. */
  inline?: boolean;
}
