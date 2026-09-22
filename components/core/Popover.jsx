import { cloneElement, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cx } from "./cx.js";
import { Icon } from "./Icon.jsx";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// A small surface anchored to the control that opened it: a filter, a form,
// a menu of rows. It floats, so it takes --shadow-popover — the same shadow as
// the Toast, the system's only two.
export function Popover({
  open,
  onClose,
  trigger,
  title,
  label,
  width = 300,
  placement = "bottom",
  align = "start",
  children,
  className,
  style,
  ...props
}) {
  const wrap = useRef(null);
  const panel = useRef(null);
  const close = useRef(onClose);
  close.current = onClose;
  // Flipped up or across when the panel would otherwise leave the viewport.
  const [side, setSide] = useState(placement);
  const [edge, setEdge] = useState(align);

  useLayoutEffect(() => {
    if (!open || !panel.current) return;
    const r = panel.current.getBoundingClientRect();
    const t = wrap.current?.getBoundingClientRect();
    if (!t) return;
    setSide(placement === "bottom" && t.bottom + r.height + 8 > window.innerHeight && t.top - r.height - 8 > 0 ? "top" : placement);
    setEdge(align === "start" && t.left + r.width > window.innerWidth - 8 ? "end" : align);
  }, [open, placement, align, width]);

  useEffect(() => {
    if (!open) return undefined;
    const previously = document.activeElement;
    // The first control of the content, so a keyboard lands on what the
    // popover is for rather than on its close button.
    const items = [...(panel.current?.querySelectorAll(FOCUSABLE) ?? [])];
    const first = items.find((el) => !el.hasAttribute("data-ds-close")) ?? items[0];
    (first ?? panel.current)?.focus({ preventScroll: true });

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close.current?.();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      // Focus stays in the panel while it's open: it's a small surface, and
      // tabbing out of it into the page behind loses people.
      const items = [...panel.current.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const [head, tail] = [items[0], items[items.length - 1]];
      if (e.shiftKey && document.activeElement === head) {
        e.preventDefault();
        tail.focus();
      } else if (!e.shiftKey && document.activeElement === tail) {
        e.preventDefault();
        head.focus();
      }
    };
    const onDown = (e) => {
      if (!wrap.current?.contains(e.target)) close.current?.();
    };
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("pointerdown", onDown, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("pointerdown", onDown, true);
      if (previously && document.contains(previously)) previously.focus({ preventScroll: true });
    };
  }, [open]);

  const dismiss = useCallback(() => close.current?.(), []);

  return (
    <span ref={wrap} style={{ position: "relative", display: "inline-flex" }}>
      {trigger && cloneElement(trigger, { "aria-expanded": open ? true : undefined, "aria-haspopup": "dialog" })}
      {open && (
        <div
          role="dialog"
          aria-label={label ?? (typeof title === "string" ? title : undefined)}
          tabIndex={-1}
          ref={panel}
          {...props}
          className={cx("ds-popover", className)}
          style={{
            position: "absolute",
            zIndex: 800,
            [side === "top" ? "bottom" : "top"]: "calc(100% + 6px)",
            [edge === "end" ? "right" : "left"]: 0,
            boxSizing: "border-box",
            width,
            maxWidth: "calc(100vw - 32px)",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-popover)",
            overflow: "hidden",
            ...style,
          }}
        >
          {title && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 12px",
                borderBottom: "var(--hairline) solid var(--border)",
              }}
            >
              <span style={{ flex: 1, minWidth: 0, font: "var(--text-message-title)", color: "var(--text-ink)" }}>{title}</span>
              <button
                type="button"
                aria-label="Close"
                data-ds-close=""
                onClick={dismiss}
                className="ds-button"
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 26,
                  height: 26,
                  padding: 0,
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  background: "transparent",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                }}
              >
                <Icon name="close" size={14} />
              </button>
            </div>
          )}
          {children}
        </div>
      )}
    </span>
  );
}
