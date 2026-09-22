import type { ReactNode, HTMLAttributes } from "react";

/**
 * In place of content that failed to load, usually inside its Group.
 *
 * @startingPoint section="Components" subtitle="Failed to load" viewport="700x160"
 */
export interface ErrorStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** What failed, in plain words: "Couldn't load trips". */
  title?: ReactNode;
  /** Shows a "Try again" button when given. */
  onRetry?: () => void;
  retryLabel?: string;
  /** Replaces the retry button with your own action. */
  action?: ReactNode;
  icon?: ReactNode;
  /** What to do, and what's still safe. */
  children?: ReactNode;
}
