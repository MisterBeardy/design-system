import { cloneElement, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cx } from "./cx.js";
import { Icon } from "./Icon.jsx";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const GAP = 12;
const EDGE = 8;

// The box the popover sits beside: an element, a ref, or a function that
// returns either (or a DOMRect), read fresh each time so it follows the target.
function anchorRect(anchor) {
  const a = typeof anchor === "function" ? anchor() : anchor;
  const el = a && "current" in a ? a.current : a;
  if (!el) return null;
  return typeof el.getBoundingClientRect === "function" ? el.getBoundingClientRect() : el;
}

// A small surface anchored to the control that opened it: a filter, a form,
// a menu of rows. It floats, so it takes --shadow-popover — the same shadow as
// the Toast, the system's only two.
//
// With an `anchor` it sits beside that box instead of under the trigger, so
// the thing being edited stays in view. Below `narrow` px wide it becomes a
// bottom sheet and scrolls the anchor above it.
export function Popover({
  open,
  onClose,
  trigger,
  title,
  label,
  width = 300,
  placement = "bottom",
  align = "start",
  anchor,
  pointer = false,
  narrow = 700,
  topInset = 0,
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

  // Beside an anchor box: fixed to the viewport, placed by `place`. If the
  // anchor never resolves it sits under the trigger, in the same portal, so
  // the panel is never remounted (which would drop focus).
  const beside = anchor != null;
  const [pos, setPos] = useState(null);
  const replace = useRef(null);
  const lastWidth = useRef(null);
  // Read through a ref so an inline `anchor={() => ...}` doesn't re-run the effect.
  const anchorNow = useRef(anchor);
  anchorNow.current = anchor;

  useLayoutEffect(() => {
    if (!open || !beside) {
      setPos(null);
      return undefined;
    }
    let frame = 0;
    let tries = 0;
    let sheeted = false;
    let scrolled = false;
    let placedOnce = false;
    const place = () => {
      const el = panel.current;
      const t = anchorRect(anchorNow.current);
      if (!el) return;
      if (!t) {
        // The anchor's ref may not be attached yet (an ancestor's ref is set
        // after this child's effects run, when it opens on first render).
        // Retry for a few frames; if it never resolves, sit under the trigger.
        // Once placed, a dropout keeps the last position.
        if (placedOnce) return;
        if (++tries <= 12) again();
        else {
          const wr = wrap.current?.getBoundingClientRect();
          if (wr) {
            const left = Math.max(EDGE, Math.min(wr.left, window.innerWidth - el.offsetWidth - EDGE));
            setPos((p) => (p && p.left === left && p.top === wr.bottom + 6 ? p : { left, top: wr.bottom + 6, side: "bottom", arrow: null }));
          }
        }
        return;
      }
      placedOnce = true;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // The width it would have beside the anchor, even while it is a sheet.
      const w = typeof width === "number" ? Math.min(width, vw - 32) : sheeted ? lastWidth.current ?? 300 : el.offsetWidth;
      const room = (side) => (side === "right" ? vw - t.right - GAP - EDGE : t.left - GAP - EDGE);
      let at = placement === "left" ? "left" : "right";
      const other = at === "right" ? "left" : "right";
      if (room(at) < w && room(other) >= w) at = other;
      if (vw < narrow || room(at) < w) {
        // No room beside the anchor: a sheet from the bottom. Lay it out
        // first, then scroll the target into the space above it, once.
        if (!sheeted) {
          sheeted = true;
          setPos({ sheet: true });
          again();
          return;
        }
        if (!scrolled) {
          scrolled = true;
          const limit = vh - el.offsetHeight - EDGE;
          if (t.bottom > limit) {
            const by = Math.min(t.bottom - limit, Math.max(0, t.top - topInset - EDGE));
            if (by > 0) window.scrollBy(0, by);
          }
        }
        return;
      }
      sheeted = false;
      scrolled = false;
      lastWidth.current = el.offsetWidth;
      const h = el.offsetHeight;
      const left = Math.max(EDGE, Math.min(at === "right" ? t.right + GAP : t.left - GAP - w, vw - w - EDGE));
      const top = Math.max(EDGE, Math.min(t.top, vh - h - EDGE));
      // Aim at the middle of the part of the target that is on screen, and
      // keep the pointer on the panel's edge when the panel is clamped. No
      // pointer when the target is off screen.
      const onScreen = t.bottom > 0 && t.top < vh;
      const mid = (Math.max(t.top, 0) + Math.min(t.bottom, vh)) / 2;
      const arrow = onScreen ? Math.max(16, Math.min(mid - top, h - 16)) : null;
      setPos((p) => (p && p.left === left && p.top === top && p.side === at && p.arrow === arrow ? p : { left, top, side: at, arrow }));
    };
    const again = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(place);
    };
    const follow = () => {
      tries = 0;
      again();
    };
    replace.current = follow;
    place();
    window.addEventListener("resize", follow);
    window.addEventListener("scroll", follow, true);
    // The target and the panel change size while it is being edited.
    const watch = typeof ResizeObserver === "function" ? new ResizeObserver(follow) : null;
    if (watch) {
      if (panel.current) watch.observe(panel.current);
      const a = anchorNow.current;
      const el = typeof a === "function" ? null : a && "current" in a ? a.current : a;
      if (el && el.nodeType === 1) watch.observe(el);
    }
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", follow);
      window.removeEventListener("scroll", follow, true);
      watch?.disconnect();
    };
  }, [open, beside, placement, narrow, topInset, width]);

  // A different `anchor` while open: place again.
  useEffect(() => {
    replace.current?.();
  }, [anchor]);

  useLayoutEffect(() => {
    if (beside) return;
    if (!open || !panel.current) return;
    const r = panel.current.getBoundingClientRect();
    const t = wrap.current?.getBoundingClientRect();
    if (!t) return;
    setSide(placement === "bottom" && t.bottom + r.height + 8 > window.innerHeight && t.top - r.height - 8 > 0 ? "top" : placement);
    setEdge(align === "start" && t.left + r.width > window.innerWidth - 8 ? "end" : align);
  }, [open, beside, placement, align, width]);

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
      if (!wrap.current?.contains(e.target) && !panel.current?.contains(e.target)) close.current?.();
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

  const sheet = beside && pos?.sheet;
  const placed = beside ? pos : true;
  const where = !beside
    ? {
        position: "absolute",
        [side === "top" ? "bottom" : "top"]: "calc(100% + 6px)",
        [edge === "end" ? "right" : "left"]: 0,
        width,
        maxWidth: "calc(100vw - 32px)",
        borderRadius: "var(--radius-md)",
      }
    : sheet
      ? {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          maxHeight: "52vh",
          overflowY: "auto",
          borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
        }
      : {
          position: "fixed",
          left: pos?.left ?? 0,
          top: pos?.top ?? 0,
          width,
          maxWidth: "calc(100vw - 32px)",
          borderRadius: "var(--radius-md)",
          // Measured before it is placed, so it never flashes in the corner.
          // Not visibility:hidden, which would stop it taking focus on open.
          opacity: placed ? undefined : 0,
          pointerEvents: placed ? undefined : "none",
        };
  const content = (
    <>
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
              <span style={{ flex: 1, minWidth: 0, font: "var(--type-message-title)", color: "var(--text-ink)" }}>{title}</span>
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
    </>
  );
  const box = (
    <div
      role="dialog"
      aria-label={label ?? (typeof title === "string" ? title : undefined)}
      tabIndex={-1}
      ref={panel}
      data-ds-side={beside && !sheet ? pos?.side : undefined}
      {...props}
      className={cx("ds-popover", className)}
      style={{
        zIndex: 800,
        boxSizing: "border-box",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-popover)",
        overflow: sheet ? "auto" : beside ? "visible" : "hidden",
        ...where,
        ...style,
      }}
    >
      {pointer && beside && !sheet && pos && pos.arrow != null && (
        <span
          aria-hidden="true"
          className="ds-popover-pointer"
          style={{
            position: "absolute",
            top: pos.arrow - 6,
            [pos.side === "right" ? "left" : "right"]: -7,
            width: 12,
            height: 12,
            transform: "rotate(45deg)",
            background: "var(--surface)",
            [pos.side === "right" ? "borderLeft" : "borderRight"]: "1px solid var(--border)",
            [pos.side === "right" ? "borderBottom" : "borderTop"]: "1px solid var(--border)",
          }}
        />
      )}
      {beside ? <div style={{ overflow: "hidden", borderRadius: "inherit" }}>{content}</div> : content}
    </div>
  );

  return (
    <span ref={wrap} style={{ position: "relative", display: "inline-flex" }}>
      {trigger && cloneElement(trigger, { "aria-expanded": open ? true : undefined, "aria-haspopup": "dialog" })}
      {open && (beside && typeof document !== "undefined" ? createPortal(box, document.body) : box)}
    </span>
  );
}
