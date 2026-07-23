import { GlyphTile } from '@misterbeardy/design-system';

const S = { width: 13, height: 13, fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

const Pin = () => (
  <svg viewBox="0 0 20 20" {...S}><path d="M10 2.5a5 5 0 0 0-5 5c0 3.6 5 10 5 10s5-6.4 5-10a5 5 0 0 0-5-5Z" /><circle cx={10} cy={7.3} r={1.6} /></svg>
);
const Bolt = () => (
  <svg viewBox="0 0 20 20" {...S}><path d="M11 2 4 11h5l-1 7 7-9h-5l1-7Z" /></svg>
);
const Check = () => (
  <svg viewBox="0 0 20 20" {...S}><path d="M4.5 10.5 8.5 14.5 15.5 6" /></svg>
);
const Alert = () => (
  <svg viewBox="0 0 20 20" {...S}><path d="M10 3.5 2.8 16h14.4L10 3.5Z" /><path d="M10 8.5v3.5" /><circle cx={10} cy={14} r={0.6} fill="currentColor" /></svg>
);
const Trophy = () => (
  <svg viewBox="0 0 20 20" {...S}><path d="M6 3h8v4a4 4 0 0 1-8 0V3Z" /><path d="M6 4H3.5v1.5A2.5 2.5 0 0 0 6 8M14 4h2.5v1.5A2.5 2.5 0 0 1 14 8M8 13h4M7.5 17h5M10 11v2" /></svg>
);

export function Tones() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <GlyphTile tone="accent"><Pin /></GlyphTile>
      <GlyphTile tone="success"><Check /></GlyphTile>
      <GlyphTile tone="warning"><Bolt /></GlyphTile>
      <GlyphTile tone="danger"><Alert /></GlyphTile>
      <GlyphTile tone="neutral"><Pin /></GlyphTile>
    </div>
  );
}

export function DataColor() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <GlyphTile color="#f59e0b"><Trophy /></GlyphTile>
      <GlyphTile color="#8b5cf6"><Trophy /></GlyphTile>
      <GlyphTile color="#0ea5e9"><Bolt /></GlyphTile>
    </div>
  );
}
