import type { HTMLAttributes } from "react";
import type { IconName } from "./iconNames";

export interface TabBarItem {
  value: string;
  label: string;
  icon?: IconName;
}

/**
 * Bottom navigation: the three to five places the app is made of, with the
 * accent on the current one and nothing else. Translucent, so the content
 * keeps running under it.
 *
 * @startingPoint section="Chrome" subtitle="Bottom navigation" viewport="390x620"
 */
export interface TabBarProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  items: TabBarItem[];
  /** The `value` of the current item. */
  value?: string;
  onChange?: (value: string) => void;
  /** Not shown; read by screen readers. The name of the navigation region; "Main" by default. */
  label?: string;
  /** Opaque instead of translucent, for busy content behind. Readers who ask
   *  for reduced transparency get this anyway. */
  solid?: boolean;
  /** Fixed to the bottom of the viewport (the default). */
  fixed?: boolean;
}
