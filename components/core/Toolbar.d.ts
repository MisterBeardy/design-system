import type { ReactNode, HTMLAttributes } from "react";

/**
 * The filters and secondary actions for a screen, loose on the page
 * background under the header. Built from the controls the system already
 * has; it scrolls away with the content it filters.
 *
 * @startingPoint section="Chrome" subtitle="Filters and secondary actions" viewport="390x200"
 */
export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Not shown; read by screen readers. Names the set of controls; without it the row is unlabelled. */
  label?: string;
  /** Wrap onto a second line instead of scrolling sideways. */
  wrap?: boolean;
  children?: ReactNode;
}
