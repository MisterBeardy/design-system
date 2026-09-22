import type { ReactNode, HTMLAttributes } from "react";

/**
 * The bar at the top of a screen: one compact height, title centred, and it
 * never changes shape on scroll.
 *
 * @startingPoint section="Chrome" subtitle="The bar at the top of a screen" viewport="390x260"
 */
export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title?: ReactNode;
  /** A second, quieter line under the title: a count, a date range, a state. */
  subtitle?: ReactNode;
  /** Leading control — a back button, a close. */
  leading?: ReactNode;
  /** Trailing controls: one or two, icon-only at this size. */
  actions?: ReactNode;
  /** Which heading element the title renders as. 1 on a screen's own header. */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Pinned above the content (the default) rather than scrolling away with it. */
  sticky?: boolean;
}
