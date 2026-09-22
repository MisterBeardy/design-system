import type { ReactNode, HTMLAttributes } from "react";

/**
 * Fills the panel it's in when there's nothing to show yet: a neutral tile,
 * a title, one sentence and one way forward.
 *
 * @startingPoint section="Components" subtitle="Nothing here yet" viewport="700x320"
 */
export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Replaces the default glyph, drawn at about 22px in a 44px tile. */
  icon?: ReactNode;
  title?: ReactNode;
  /** The primary way forward, usually a primary `Button`. */
  action?: ReactNode;
  /** One sentence: why it's empty, or when it won't be. */
  children?: ReactNode;
}
