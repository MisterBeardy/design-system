import { useEffect, useRef, useState } from "react";
import { cx } from "./cx.js";

// The one panel that floats over live content: a map, a canvas, a video.
// It's translucent because the content behind it still matters — vibrancy is a
// signal, not a texture — and it leaves that content visible and usable, so it
// never dims the page behind it. Anything over a static page is a Group, a
// Card or a screen of its own.
export function Sheet({
  open,
  onClose,
  title,
  trailing,
  label,
  height = 340,
  solid = false,
  grabber = true,
  children,
  className,
  style,
  ...props
}) {
  const panel = useRef(null);
  const close = useRef(onClose);
  close.current = onClose;
  // How far the sheet has been dragged down, in px. null while not dragging.
  const [drag, setDrag] = useState(null);
  const start = useRef(0);

  // Focus moves into the sheet when it opens and back to where it was when it
  // closes. It isn't trapped: the map behind stays usable, which is the point.
  const restore = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    restore.current = document.activeElement;
    panel.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === "Escape") close.current?.();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      const back = restore.current;
      if (back && document.contains(back)) back.focus({ preventScroll: true });
    };
  }, [open]);

  if (!open) return null;

  // Drag the grabber (or the header) down to dismiss, the way the handle
  // promises. Past a third of the sheet, or a flick, it closes; otherwise it
  // springs back.
  const onPointerDown = (e) => {
    if (e.button != null && e.button !== 0) return;
    start.current = e.clientY;
    setDrag(0);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (drag === null) return;
    setDrag(Math.max(0, e.clientY - start.current));
  };
  const onPointerUp = () => {
    if (drag === null) return;
    const dismissed = drag > Math.min(120, height / 3);
    setDrag(null);
    if (dismissed) close.current?.();
  };

  return (
    <div
      role="dialog"
      // Not modal: the content behind stays live, and screen readers should
      // still reach it.
      aria-modal="false"
      aria-label={label ?? (typeof title === "string" ? title : undefined)}
      tabIndex={-1}
      ref={panel}
      {...props}
      className={cx("ds-sheet", solid && "ds-sheet-solid", className)}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 900,
        boxSizing: "border-box",
        height,
        maxHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        borderTop: "1px solid var(--border)",
        borderTopLeftRadius: "var(--radius-xl)",
        borderTopRightRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-sheet)",
        transform: drag ? `translateY(${drag}px)` : undefined,
        transition: drag === null ? "transform var(--duration-base) var(--ease-out-expo)" : undefined,
        touchAction: "none",
        ...style,
      }}
    >
      {grabber && (
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px", cursor: "grab" }}
        >
          {/* The handle says "drag me"; it isn't the only way out — Escape and
              whatever the app puts in the sheet also close it. */}
          <span aria-hidden="true" style={{ width: 36, height: 5, borderRadius: "var(--radius-pill)", background: "var(--border)" }} />
        </div>
      )}
      {(title || trailing) && (
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "var(--row-gap)",
            padding: grabber ? "2px var(--space-4) 0" : "14px var(--space-4) 0",
          }}
        >
          <span style={{ flex: 1, minWidth: 0, font: "var(--type-subhead)", color: "var(--text-ink)" }}>{title}</span>
          {trailing}
        </div>
      )}
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "var(--space-3) var(--space-4) var(--space-4)" }}>{children}</div>
    </div>
  );
}
