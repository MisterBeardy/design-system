import type { ReactNode, HTMLAttributes } from "react";

/**
 * A small pill label — status badges (SENT / PRINTED), category tags, counts.
 *
 * @startingPoint section="Components" subtitle="Status / tag pill" viewport="700x120"
 */
export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "accent" | "ink" | "success" | "warning" | "danger";
  /** Mono (JetBrains Mono, uppercase-friendly) is the default for status/data
   *  chips; set false for a friendlier display-font tag. */
  mono?: boolean;
  children?: ReactNode;
}
