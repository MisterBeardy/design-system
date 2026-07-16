import type { ReactNode, HTMLAttributes } from "react";

export interface Stat {
  label: string;
  value: ReactNode;
  /** Small line under the value — a delta, a qualifier. */
  sub?: ReactNode;
  /** Colour for `sub` (e.g. a success-toned delta). Defaults to muted. */
  subTone?: "muted" | "success" | "warning" | "danger";
  /** At most one stat per screen should set this. */
  accent?: boolean;
}

/**
 * A divided row of headline numbers, for the top of a `Group`. The grouped
 * counterpart to the standalone, bordered `StatTile`.
 *
 * @startingPoint section="Components" subtitle="Grouped stat strip" viewport="700x140"
 */
export interface StatStripProps extends HTMLAttributes<HTMLDivElement> {
  stats: Stat[];
}
