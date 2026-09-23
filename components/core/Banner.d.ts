import type { ReactNode, HTMLAttributes } from "react";

export type BannerTone = "success" | "warning" | "danger" | "neutral";

/**
 * An outcome message in the page, above the content it's about, until
 * dismissed. The one surface that takes a status tint.
 *
 * @startingPoint section="Components" subtitle="Tinted outcome message" viewport="700x280"
 */
export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** success, warning, danger for outcomes; neutral for information that isn't one. */
  tone?: BannerTone;
  /** One short line: what happened. */
  title?: ReactNode;
  /** Replaces the tone's glyph; `null` hides it. */
  icon?: ReactNode;
  /** One way forward, usually a small secondary `Button`. */
  action?: ReactNode;
  /** Shows a close button when given, and is called when it's pressed. The
   *  same name as Sheet's, Popover's and Toast's. */
  onClose?: () => void;
  /** Accessible name of the close button. Defaults to "Dismiss". */
  closeLabel?: string;
  /** One plain sentence: what it means, or what to do. */
  children?: ReactNode;
}
