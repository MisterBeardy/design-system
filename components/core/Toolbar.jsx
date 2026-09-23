import { cx } from "./cx.js";

// The filters and secondary actions for a screen, sitting loose on the page
// background between the header and the content. It has no surface and no
// border of its own: attaching it to the header would make the chrome a tall
// block that never goes away, and these controls belong to the list, not to
// the app. So it scrolls away with the content it filters.
//
// It brings nothing new to draw — the row is Segmented, Button, Chip and
// Switch, composed by the app. Vertical padding only, so it lines up with the
// Groups in the same column instead of double-padding the screen's gutter.
export function Toolbar({ label, wrap = false, children, className, style, ...props }) {
  return (
    <div
      // Deliberately not role="toolbar": that role promises arrow-key
      // navigation between the controls, and the control most often in here is
      // a Segmented, which is a radiogroup and owns the arrow keys already.
      // A group is what this actually is — a labelled set of controls.
      {...(label ? { role: "group", "aria-label": label } : null)}
      {...props}
      className={cx("ds-toolbar", className)}
      style={{
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: "var(--space-3) 0 var(--space-2)",
        ...(wrap
          ? { flexWrap: "wrap" }
          : // More filters than fit: they scroll sideways rather than wrapping
            // into a second row that changes the height of the screen.
            { flexWrap: "nowrap", overflowX: "auto" }),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
