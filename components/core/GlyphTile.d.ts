import type { ReactNode, HTMLAttributes } from "react";

export type GlyphTone = "accent" | "success" | "warning" | "danger" | "neutral";

/**
 * The small rounded, filled square that leads a `Row`. This is where colour
 * lives in the list vocabulary — the tile carries it, the card stays quiet.
 *
 * @startingPoint section="Components" subtitle="Row glyph tile" viewport="700x120"
 */
export interface GlyphTileProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic colour, from the status tokens. Use when colour means STATE. */
  tone?: GlyphTone;
  /** Data-encoding colour. Overrides `tone`. Use when colour means DATA. */
  color?: string;
  /** Defaults to `--glyph-size` (23px). Overriding this breaks `Row`'s
   *  separator inset — set `--row-inset` to match if you do. */
  size?: number;
  /** An SVG icon. Not an emoji — the system bans emoji in UI chrome. */
  children?: ReactNode;
}
