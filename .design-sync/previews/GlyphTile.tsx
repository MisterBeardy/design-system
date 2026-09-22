import { GlyphTile, Icon } from '@misterbeardy/design-system';

const Pin = () => <Icon name="pin" size={13} />;
const Bolt = () => <Icon name="bolt" size={13} />;
const Check = () => <Icon name="check" size={13} />;
const Alert = () => <Icon name="alert" size={13} />;
const Trophy = () => <Icon name="trophy" size={13} />;

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
  // The six data palette slots, in order: data, not state.
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <GlyphTile data={1}><Trophy /></GlyphTile>
      <GlyphTile data={2}><Trophy /></GlyphTile>
      <GlyphTile data={3}><Bolt /></GlyphTile>
      <GlyphTile data={4}><Pin /></GlyphTile>
      <GlyphTile data={5}><Check /></GlyphTile>
      <GlyphTile data={6}><Alert /></GlyphTile>
    </div>
  );
}
