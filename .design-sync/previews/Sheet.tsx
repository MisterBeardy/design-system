import { useState } from 'react';
import { Sheet, Group, Row, Button } from '@misterbeardy/design-system';

// A stand-in for the live content a Sheet floats over: the map is the app's,
// never the system's.
const Map = ({ children }: { children: any }) => (
  <div style={{ position: 'relative', width: 390, height: 560, overflow: 'hidden', borderRadius: 22, border: '1px solid var(--border)',
    background: 'radial-gradient(120% 90% at 20% 15%, #dfe7dd 0%, #d7e0d6 40%, #cfd9cf 100%)' }}>
    <div style={{ position: 'absolute', left: 52, top: 96, width: 144, height: 160, borderLeft: '4px solid var(--accent)',
      borderBottom: '4px solid var(--accent)', borderBottomLeftRadius: 18, opacity: 0.85 }} />
    {children}
  </div>
);

export function OverAMap() {
  const [open, setOpen] = useState(true);
  return (
    <Map>
      {!open && <div style={{ padding: 16 }}><Button onClick={() => setOpen(true)}>Chargers nearby</Button></div>}
      <Sheet open={open} onClose={() => setOpen(false)} title="Chargers nearby" height={300}
             style={{ position: 'absolute' }}
             trailing={<span style={{ font: 'var(--type-row-value)', color: 'var(--text-muted)' }}>3 within 2 mi</span>}>
        <Group>
          <Row label="Fast charge · Harbour Road" sub="4 of 6 free · 150 kW" value="0.4 mi" chevron onClick={() => {}} />
          <Row label="Meridian Garage" sub="2 of 8 free · 50 kW" value="0.9 mi" chevron onClick={() => {}} />
          <Row label="Station Street" sub="All 4 free · 22 kW" value="1.6 mi" chevron onClick={() => {}} />
        </Group>
      </Sheet>
    </Map>
  );
}

export function Solid() {
  return (
    <Map>
      <Sheet open onClose={() => {}} title="Over video" height={240} solid style={{ position: 'absolute' }}>
        <Group footer="Opaque, for content that has to stay legible over moving pictures.">
          <Row label="Chapter 2" sub="Harbour Road" value="04:12" chevron onClick={() => {}} />
          <Row label="Chapter 3" sub="The coast" value="11:38" chevron onClick={() => {}} />
        </Group>
      </Sheet>
    </Map>
  );
}
