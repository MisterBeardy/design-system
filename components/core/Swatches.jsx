import { useRef } from "react";
import { cx } from "./cx.js";

// Pick one colour from a few: a theme, a livery, a label colour. A radiogroup
// like Segmented, drawn as round chips of the colours themselves.
//
// The colour is never the only thing that says which one is picked: the
// chosen chip carries a ring in ink, every chip has its name as its
// accessible label and tooltip, and the docs ask for the chosen name as text
// beside it (a Row's `sub` or `value`).
export function Swatches({ options, value, onChange, label, className, style, ...props }) {
  const refs = useRef([]);
  const enabled = options.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i >= 0);
  const current = options.findIndex((o) => o.value === value && !o.disabled);
  // Roving tabindex: Tab lands on the chosen chip (or the first one), and the
  // arrow keys move within the group, choosing as they go, the way native
  // radio buttons do.
  const tabStop = current >= 0 ? current : enabled[0];

  const pick = (i) => {
    if (i == null) return;
    onChange(options[i].value);
    refs.current[i]?.focus();
  };

  const onKeyDown = (event) => {
    const at = enabled.indexOf(Number(event.target.dataset.index));
    if (at < 0 || enabled.length === 0) return;
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (step) {
      // Right is forward in a left-to-right page and back in a right-to-left one.
      const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
      const dir = rtl && (event.key === "ArrowRight" || event.key === "ArrowLeft") ? -step : step;
      pick(enabled[(at + dir + enabled.length) % enabled.length]);
    } else if (event.key === "Home") {
      pick(enabled[0]);
    } else if (event.key === "End") {
      pick(enabled[enabled.length - 1]);
    } else {
      return;
    }
    event.preventDefault();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      {...props}
      onKeyDown={onKeyDown}
      className={cx("ds-swatches", className)}
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "var(--swatch-gap)",
        // The ring on the chosen chip is drawn outside it; this keeps it
        // inside the group's box so a wrapping parent doesn't clip it.
        padding: 4,
        ...style,
      }}
    >
      {options.map((opt, i) => {
        const active = i === current;
        return (
          <button
            key={opt.value}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={opt.label}
            title={opt.label}
            data-index={i}
            tabIndex={i === tabStop ? 0 : -1}
            disabled={opt.disabled}
            onClick={() => onChange(opt.value)}
            className="ds-swatch"
            style={{
              flexShrink: 0,
              boxSizing: "border-box",
              width: "var(--swatch-size)",
              height: "var(--swatch-size)",
              padding: 0,
              border: "none",
              borderRadius: "var(--radius-pill)",
              // Any CSS background: a colour, or a gradient for a two-tone livery.
              background: opt.color,
              cursor: opt.disabled ? "default" : "pointer",
              opacity: opt.disabled ? 0.4 : undefined,
              // An edge in ink at low strength, so a white chip on a white card
              // or a near-black one on the dark surface still has an outline;
              // the chosen chip adds a gap in the surface colour and a ring
              // in ink, which holds 3:1 on any surface in either theme.
              boxShadow: active
                ? "inset 0 0 0 1px var(--swatch-edge), 0 0 0 2px var(--surface), 0 0 0 4px var(--text-ink)"
                : "inset 0 0 0 1px var(--swatch-edge)",
            }}
          />
        );
      })}
    </div>
  );
}
