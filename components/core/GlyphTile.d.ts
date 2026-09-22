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
  /** A slot of the data palette (`--data-1` … `--data-6`). Use when colour
   *  means DATA: a category, a series. Overrides `tone`; the glyph takes
   *  `--on-data`, so it holds 3:1 in both themes. */
  data?: 1 | 2 | 3 | 4 | 5 | 6;
  /** A raw colour the data already owns (a vehicle's real paint colour).
   *  Overrides `data` and `tone`. Isn't themed, and its glyph stays white, so
   *  prefer `data` unless the colour itself is the information. */
  color?: string;
  /** Defaults to `--glyph-size` (23px). A `Row` leading with this tile moves
   *  its separator inset to match. */
  size?: number;
  /** An SVG icon. Not an emoji — the system bans emoji in UI chrome. */
  children?: ReactNode;
}
