import type { ReactNode, HTMLAttributes } from "react";

/**
 * A grouped inset card — the container half of the list vocabulary. Related
 * `Row`s live inside one Group; the Group is what makes them read as a set.
 *
 * @startingPoint section="Components" subtitle="Grouped inset list" viewport="700x360"
 */
export interface GroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Small uppercase label above the card (the grouped-list section header). */
  header?: ReactNode;
  /** Muted explanatory text below the card. */
  footer?: ReactNode;
  children?: ReactNode;
}
