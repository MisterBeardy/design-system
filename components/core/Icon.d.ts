import type { SVGAttributes } from "react";
import type { IconName } from "./iconNames";

export type { IconName };

/**
 * The house icon set: 20×20, a 1.75 stroke with round caps and joins, drawn
 * in currentColor. 13px inside a GlyphTile, 16px beside text, 20px on its own
 * in a control, 24px standing alone.
 *
 * @startingPoint section="Components" subtitle="The house glyphs" viewport="700x300"
 */
export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, "name"> {
  name: IconName;
  /** Rendered width and height in px. The stroke scales with it. */
  size?: number;
  /** Not shown; read by screen readers. Give one only when the icon is the only thing saying what
   *  something is; without it the icon is hidden from screen readers. */
  label?: string;
}

/** Every name in the set, in alphabetical order. */
export declare const ICON_NAMES: readonly IconName[];
