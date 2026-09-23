import type { ReactNode, HTMLAttributes } from "react";

/**
 * A panel over live content — a map, a canvas, a video. Translucent, so the
 * content behind still reads; it never dims the page. The system's one
 * elevation.
 *
 * @startingPoint section="Components" subtitle="Panel over live content" viewport="390x620"
 */
export interface SheetProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  open: boolean;
  /** Called on Escape, and when the sheet is dragged down far enough. */
  onClose?: () => void;
  title?: ReactNode;
  /** Sits opposite the title: a count, a small action. */
  trailing?: ReactNode;
  /** Not shown; read by screen readers. Needed only when `title` isn't a plain string; otherwise the
   *  title is the name. */
  label?: string;
  /** Height in px (or any CSS length), capped at 85vh. */
  height?: number | string;
  /** Opaque instead of translucent: for content that must stay legible over
   *  busy video. Readers who ask for reduced transparency get this anyway. */
  solid?: boolean;
  /** The drag handle. Off only when the sheet can't be dismissed by dragging. */
  grabber?: boolean;
  children?: ReactNode;
}
