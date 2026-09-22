// The few glyphs the feedback and state components draw by default, in the
// house style: 20×20 viewBox, 1.75 stroke, round caps and joins, currentColor.
// Internal: pass your own `icon` to override any of them.

const Glyph = ({ size = 13, children }) => (
  <svg aria-hidden="true" viewBox="0 0 20 20" width={size} height={size} fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flexShrink: 0 }}>
    {children}
  </svg>
);

export const CheckGlyph = (p) => <Glyph {...p}><path d="M4.5 10.5 8.5 14.5 15.5 6" /></Glyph>;
export const AlertGlyph = (p) => (
  <Glyph {...p}><path d="M10 3.5 2.8 16h14.4L10 3.5Z" /><path d="M10 8.5v3.5" /><circle cx="10" cy="14" r="0.6" fill="currentColor" /></Glyph>
);
export const InfoGlyph = (p) => (
  <Glyph {...p}><circle cx="10" cy="10" r="7" /><path d="M10 9v5" /><circle cx="10" cy="6.5" r="0.6" fill="currentColor" /></Glyph>
);
export const InboxGlyph = (p) => <Glyph {...p}><path d="M3 11l2.5-6h9L17 11v5H3v-5Z" /><path d="M3 11h4l1 2h4l1-2h4" /></Glyph>;
export const CloseGlyph = (p) => <Glyph {...p}><path d="M5.5 5.5l9 9M14.5 5.5l-9 9" /></Glyph>;
