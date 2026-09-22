// Joins class names, skipping empty ones. A component's own hook (.ds-row,
// .ds-button, …) has to survive a consumer's className rather than be
// replaced by it: core.css hangs separators and focus rings off those hooks.
export const cx = (...names) => names.filter(Boolean).join(" ");
