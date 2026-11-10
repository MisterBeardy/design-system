import type { HTMLAttributes, ReactNode } from "react";
import type { IconName } from "./iconNames";

export interface SideNavPage {
  value: string;
  label: string;
  /** An icon name, or your own element. Shown on top-level items only. */
  icon?: IconName | ReactNode;
}

export interface SideNavItem extends SideNavPage {
  /** Sections under this item, one level deep. An item with `children` is a
   *  heading for them, not a page: on the rail it opens and closes, and
   *  opening one that doesn't hold the current page goes to its first. */
  children?: SideNavPage[];
}

/**
 * The places in one part of an app (a settings screen, say), listed down its
 * side, with one level of sections under a place. Below `narrow` px it
 * becomes chevron rows in Groups, each section's pages under its name. Given
 * the current page as `children`, it lays the page out beside the rail, and
 * on a phone shows the list or the page with a back button.
 *
 * @startingPoint section="Chrome" subtitle="Side navigation" viewport="760x420"
 */
export interface SideNavProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  items: SideNavItem[];
  /** The `value` of the current page; `null` for none (on a phone, the list). */
  value: string | null;
  /** Called with a page's `value`, or with `null` from the back button. */
  onChange: (value: string | null) => void;
  /** The navigation region's name, read by screen readers; also the back
   *  button's text on a phone ("Settings"). Required. */
  label: string;
  /** "auto" (the default) is the rail, and the list below `narrow`. */
  layout?: "auto" | "rail" | "list";
  /** Viewport width, in px, below which "auto" becomes the list. Default 700,
   *  where Popover becomes a sheet. */
  narrow?: number;
  /** The page's heading level in the phone's back bar. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** The current page. Given, SideNav lays it out: beside the rail, or on a
   *  phone in place of the list, under a back bar. */
  children?: ReactNode;
}
