import { useEffect, useRef, useState } from "react";
import { cx } from "./cx.js";

// A brief confirmation over the screen: one at a time, gone on its own.
// Show one Toast and change its `message` to replace it; the timer restarts.
export function Toast({
  open,
  message,
  action,
  onClose,
  duration,
  fixed = true,
  className,
  style,
  ...props
}) {
  // Long enough to read; longer when there's something to press.
  const ms = duration ?? (action ? 8000 : 5000);
  const [paused, setPaused] = useState(false);
  // The latest onClose, without restarting the timer every render.
  const close = useRef(onClose);
  close.current = onClose;

  // A toast closed while hovered or focused (its action pressed, Escape) never
  // sees the pointer leave or focus go; without this the next one would wait
  // forever.
  useEffect(() => {
    if (!open) setPaused(false);
  }, [open]);

  useEffect(() => {
    if (!open || paused || !Number.isFinite(ms)) return undefined;
    const id = setTimeout(() => close.current?.(), ms);
    return () => clearTimeout(id);
  }, [open, message, paused, ms]);

  // The live region is always in the page, so a toast that appears in it is
  // announced; one added to the page along with its region often isn't.
  return (
    <div
      role="status"
      aria-live="polite"
      className="ds-toast-region"
      style={
        !fixed
          ? { display: "flex" }
          : {
              position: "fixed",
              left: 0,
              right: 0,
              bottom: "calc(24px + env(safe-area-inset-bottom, 0px))",
              zIndex: 1000,
              display: "flex",
              justifyContent: "center",
              pointerEvents: "none",
            }
      }
    >
      {open && (
        <div
          {...props}
          className={cx("ds-toast", className)}
          // Held while someone is reading it or reaching for its action.
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") close.current?.();
          }}
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxSizing: "border-box",
            width: fixed ? "min(420px, calc(100% - 32px))" : "100%",
            minHeight: 48,
            padding: action ? "2px 6px 2px 16px" : "12px 16px",
            borderRadius: "var(--radius-md)",
            background: "var(--surface)",
            color: "var(--text-ink)",
            border: "1px solid var(--border)",
            // The popover shadow: a toast floats over the page, so it takes
            // the elevation the system keeps for floating things.
            boxShadow: "var(--shadow-popover)",
            ...style,
          }}
        >
          <span style={{ flex: 1, minWidth: 0, font: "var(--text-message-title)" }}>{message}</span>
          {action && (
            <button
              type="button"
              className="ds-button"
              onClick={() => {
                action.onClick?.();
                close.current?.();
              }}
              style={{
                flexShrink: 0,
                minHeight: 44,
                padding: "0 10px",
                border: "none",
                borderRadius: "var(--radius-sm)",
                background: "transparent",
                color: "var(--accent-text)",
                font: "var(--text-button)",
                cursor: "pointer",
              }}
            >
              {action.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
