import type { ReactNode, HTMLAttributes } from "react";

/**
 * The base container — flat by default (no drop shadow), 1px border,
 * 14px radius. Every panel/list-row/stat-tile in the system is a Card
 * with different padding.
 *
 * @startingPoint section="Components" subtitle="Base panel container" viewport="700x140"
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
