import type { ReactNode, HTMLAttributes } from "react";

export interface StatStripItem {
  label: string;
  value: ReactNode;
  /** Small line under the value — a delta, a qualifier. */
  sub?: ReactNode;
  /** Colour for `sub` (e.g. a success-toned delta). `neutral` (the default)
   *  is muted text, the same tone name as Chip's, GlyphTile's and Banner's. */
  subTone?: "neutral" | "success" | "warning" | "danger";
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
  stats: StatStripItem[];
}
