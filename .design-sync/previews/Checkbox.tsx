import { useState } from 'react';
import { Checkbox, Group } from '@misterbeardy/design-system';

export function InAGroup() {
  const [biz, setBiz] = useState(true);
  const [round, setRound] = useState(false);
  return (
    <div style={{ background: 'var(--bg)', padding: 20, borderRadius: 16, maxWidth: 420 }}>
      <Group header="Tags" footer="Business trips count toward mileage claims.">
        <Checkbox row label="Business trip" checked={biz} onChange={setBiz} />
        <Checkbox row label="Round trip" checked={round} onChange={setRound} />
      </Group>
    </div>
  );
}

export function OnItsOwn() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox label="Email me a receipt" checked={a} onChange={setA} />
      <Checkbox label="Remember this card" checked={b} onChange={setB} />
      <Checkbox label="Business trip" sub="Counts toward mileage claims." checked onChange={() => {}} />
      <Checkbox label="Locked on" checked disabled onChange={() => {}} />
    </div>
  );
}
