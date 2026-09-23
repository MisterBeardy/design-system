import type { HTMLAttributes } from "react";

/**
 * Placeholders in the shape of what's loading: Row-shaped for a list
 * (inside a Group), StatTile-shaped for tiles.
 *
 * @startingPoint section="Components" subtitle="Loading placeholders" viewport="700x200"
 */
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "rows" | "tiles";
  /** How many rows or tiles to stand in for. */
  count?: number;
  /** Not shown; read by screen readers. What they hear while it's showing; "Loading" by default. */
  label?: string;
}
