import type { HTMLAttributes } from "react";

export interface SegmentedOption<T extends string = string> {
  value: T;
  label: string;
  /** Small second line under the label — a count, a qualifier. */
  sub?: string;
}

/**
 * A segmented control — "pick exactly one of a few".
 *
 * @startingPoint section="Components" subtitle="Segmented control" viewport="700x120"
 */
export interface SegmentedProps<T extends string = string>
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: ReadonlyArray<SegmentedOption<T>>;
  value: T;
  onChange: (next: T) => void;
  /** Accessible name for the group. Required. */
  label: string;
  size?: "sm" | "md";
}
