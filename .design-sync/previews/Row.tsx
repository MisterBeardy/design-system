import { useState } from 'react';
import { Group, Row, GlyphTile, Switch, Icon } from '@misterbeardy/design-system';

const Ruler = () => <Icon name="ruler" size={13} />;
const Bolt = () => <Icon name="bolt" size={13} />;

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
