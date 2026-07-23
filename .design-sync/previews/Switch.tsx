import { useState } from 'react';
import { Switch, Group, Row } from '@misterbeardy/design-system';

export function States() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Switch checked={a} onChange={setA} label="On" />
      <Switch checked={b} onChange={setB} label="Off" />
      <Switch checked onChange={() => {}} disabled label="Locked on" />
    </div>
  );
}

export function InRow() {
  const [on, setOn] = useState(true);
  return (
    <div style={{ background: 'var(--bg)', padding: 20, borderRadius: 16, maxWidth: 420 }}>
      <Group>
        <Row label="Show chargers" trailing={<Switch checked={on} onChange={setOn} label="Show chargers" />} />
      </Group>
    </div>
  );
}
