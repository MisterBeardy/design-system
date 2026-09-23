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
  /** One action, like Undo. Pressing it also closes the toast. An object, not
   *  a node like Banner's or EmptyState's `action`: the Toast draws the button
   *  itself, so it can close once the action has run. */
  action?: ToastAction;
  /** Called when it times out, on Escape, and after its action. */
  onClose?: () => void;
  /** Milliseconds shown. Defaults to 5000, or 8000 with an action;
   *  `Infinity` keeps it until closed. Paused while hovered or focused. */
  duration?: number;
  /** Fixed to the bottom of the viewport (the default). `false` renders it in
   *  the flow instead: for a toast inside a panel, and for previews. The same
   *  prop, with the same default, as TabBar's. */
  fixed?: boolean;
}
