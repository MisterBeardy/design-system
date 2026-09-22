import { createElement } from "react";
import { ICONS } from "./iconData.js";

// The house icon set: a 20×20 box, a 1.75 stroke with round caps and joins,
// drawn in currentColor so it takes the colour of the text around it, or the
// on-colour inside a GlyphTile. The shapes come from icons/*.svg.
export const ICON_NAMES = Object.keys(ICONS);

export function Icon({ name, size = 16, label, style, ...props }) {
  const parts = ICONS[name];
  if (!parts) return null;
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      // Decorative unless it's the only thing saying what something is.
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      {...props}
      style={{ display: "block", flexShrink: 0, ...style }}
    >
      {parts.map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}
