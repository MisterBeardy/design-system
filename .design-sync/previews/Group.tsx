import { useState } from 'react';
import { Group, Row, GlyphTile, Switch } from '@misterbeardy/design-system';

const S = { width: 13, height: 13, fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const Ruler = () => <svg viewBox="0 0 20 20" {...S}><path d="M3 7h14v6H3zM6 7v3M9 7v4M12 7v3M15 7v4" /></svg>;
const Thermo = () => <svg viewBox="0 0 20 20" {...S}><path d="M10 3.5a2 2 0 0 0-2 2v6.2a3 3 0 1 0 4 0V5.5a2 2 0 0 0-2-2Z" /></svg>;
const Bolt = () => <svg viewBox="0 0 20 20" {...S}><path d="M11 2 4 11h5l-1 7 7-9h-5l1-7Z" /></svg>;
const Map = () => <svg viewBox="0 0 20 20" {...S}><path d="M7.5 4 3 6v11l4.5-2 5 2 4.5-2V2l-4.5 2-5-2ZM7.5 4v11M12.5 6v11" /></svg>;

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
