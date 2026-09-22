import { useState } from 'react';
import { Group, Row, GlyphTile, Switch, Icon } from '@misterbeardy/design-system';

const Ruler = () => <Icon name="ruler" size={13} />;
const Thermo = () => <Icon name="thermometer" size={13} />;
const Bolt = () => <Icon name="bolt" size={13} />;
const Map = () => <Icon name="map" size={13} />;

const Frame = ({ children }: { children: any }) => (
  <div style={{ background: 'var(--bg)', padding: 22, borderRadius: 16, maxWidth: 440 }}>{children}</div>
);

export function SettingsList() {
  return (
    <Frame>
      <Group header="Units" footer="Applies to every trip, past and future.">
        <Row glyph={<GlyphTile tone="accent"><Ruler /></GlyphTile>} label="Distance" value="Miles" chevron />
        <Row glyph={<GlyphTile tone="neutral"><Thermo /></GlyphTile>} label="Temperature" value="°F" chevron />
      </Group>
    </Frame>
  );
}

export function ToggleList() {
  const [chargers, setChargers] = useState(true);
  const [tolls, setTolls] = useState(false);
  return (
    <Frame>
      <Group header="Map layers">
        <Row
          glyph={<GlyphTile tone="success"><Bolt /></GlyphTile>}
          label="Show chargers"
          trailing={<Switch checked={chargers} onChange={setChargers} label="Show chargers" />}
        />
        <Row
          glyph={<GlyphTile tone="neutral"><Map /></GlyphTile>}
          label="Avoid tolls"
          trailing={<Switch checked={tolls} onChange={setTolls} label="Avoid tolls" />}
        />
      </Group>
    </Frame>
  );
}
