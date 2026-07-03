import type { HTMLAttributes, ReactNode } from "react";

/**
 * A labeled metric tile — mono uppercase label above a large number.
 * Used for dashboards, KPI strips, HUDs.
 *
 * @startingPoint section="Components" subtitle="Labeled metric tile" viewport="700x140"
 */
export interface StatTileProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: ReactNode;
  /** Optional secondary line, e.g. a delta or count. */
  sub?: ReactNode;
  /** Colors the value in the accent — reserve for the one headline metric per view. */
  accent?: boolean;
}
