import type { ReactNode, ButtonHTMLAttributes } from "react";

/**
 * The primary clickable control. Four variants share one shape/radius/type
 * scale; only fill + accent usage changes.
 *
 * @startingPoint section="Components" subtitle="Primary / secondary / soft / ghost" viewport="700x160"
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight. primary = solid accent fill. secondary = bordered surface.
   *  soft = accent-tinted fill (lower emphasis than primary). ghost = text-only. */
  variant?: "primary" | "secondary" | "soft" | "ghost";
  size?: "sm" | "md";
  children?: ReactNode;
}
