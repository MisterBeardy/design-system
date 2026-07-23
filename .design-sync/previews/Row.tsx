import { useState } from 'react';
import { Group, Row, GlyphTile, Switch } from '@misterbeardy/design-system';

const S = { width: 13, height: 13, fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const Ruler = () => <svg viewBox="0 0 20 20" {...S}><path d="M3 7h14v6H3zM6 7v3M9 7v4M12 7v3M15 7v4" /></svg>;
const Bolt = () => <svg viewBox="0 0 20 20" {...S}><path d="M11 2 4 11h5l-1 7 7-9h-5l1-7Z" /></svg>;

const Frame = ({ children }: { children: any }) => (
  <div style={{ background: 'var(--bg)', padding: 20, borderRadius: 16, maxWidth: 420 }}>{children}</div>
);

export function ValueRows() {
  return (
    <Frame>
      <Group>
        <Row glyph={<GlyphTile tone="accent"><Ruler /></GlyphTile>} label="Distance" value="Miles" chevron />
        <Row label="Temperature" value="°F" chevron />
      </Group>
    </Frame>
  );
}

export function WithControl() {
  const [on, setOn] = useState(true);
  return (
    <Frame>
      <Group>
        <Row
          glyph={<GlyphTile tone="success"><Bolt /></GlyphTile>}
          label="Charging"
          sub="Default for new trips"
          trailing={<Switch checked={on} onChange={setOn} label="Charging" />}
        />
      </Group>
    </Frame>
  );
}

export function Navigation() {
  return (
    <Frame>
      <Group>
        <Row label="Every trip" sub="546 mi total" chevron />
      </Group>
    </Frame>
  );
}
