import { Icon, ICON_NAMES, GlyphTile, Button } from '@misterbeardy/design-system';

export function TheSet() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 72px)', gap: 8 }}>
      {ICON_NAMES.map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '12px 4px 8px',
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-ink)' }}>
          <Icon name={name} size={24} />
          <span style={{ font: 'var(--text-row-sub)', color: 'var(--text-muted)' }}>{name}</span>
        </div>
      ))}
    </div>
  );
}

export function InUse() {
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
      <GlyphTile tone="accent"><Icon name="pin" size={13} /></GlyphTile>
      <GlyphTile tone="success"><Icon name="check" size={13} /></GlyphTile>
      <GlyphTile data={3}><Icon name="map" size={13} /></GlyphTile>
      <Button variant="secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <Icon name="plus" /> Add trip
      </Button>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: 'var(--text-row-label)', color: 'var(--text-muted)' }}>
        <Icon name="calendar" /> Tue 22 Sep
      </span>
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 28, alignItems: 'flex-end', color: 'var(--text-ink)' }}>
      {[13, 16, 20, 24].map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Icon name="bolt" size={s} />
          <span style={{ font: 'var(--text-row-value)', color: 'var(--text-muted)' }}>{s}px</span>
        </div>
      ))}
    </div>
  );
}
