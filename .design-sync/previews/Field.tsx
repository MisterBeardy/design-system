import { useState } from 'react';
import { Field, Input, Select, Textarea, Group, Button } from '@misterbeardy/design-system';

const Frame = ({ children }: { children: any }) => (
  <div style={{ background: 'var(--bg)', padding: 20, borderRadius: 16, maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
);

export function TripForm() {
  const [name, setName] = useState('Home to office');
  const [unit, setUnit] = useState('mi');
  const [odo, setOdo] = useState('12480');
  return (
    <Frame>
      <Group header="Trip">
        <Field label="Trip name"><Input value={name} onChange={(e) => setName(e.target.value)} /></Field>
        <Field label="Distance unit">
          <Select value={unit} onChange={setUnit} options={[{ value: 'mi', label: 'Miles' }, { value: 'km', label: 'Kilometres' }]} />
        </Field>
        <Field label="Odometer at start" help="From the dashboard, whole miles.">
          <Input value={odo} inputMode="numeric" onChange={(e) => setOdo(e.target.value)} />
        </Field>
      </Group>
      <Button style={{ width: '100%' }}>Save trip</Button>
    </Frame>
  );
}

export function WithError() {
  return (
    <Frame>
      <Group header="Trip">
        <Field label="Trip name"><Input defaultValue="Home to office" /></Field>
        <Field label="Odometer at start" error="Numbers only: take out the “km”.">
          <Input defaultValue="12,480 km" />
        </Field>
      </Group>
    </Frame>
  );
}

export function WithTextarea() {
  return (
    <Frame>
      <Group header="Notes">
        <Field label="Notes" help="Optional. Only you see these.">
          <Textarea placeholder="Anything worth remembering" />
        </Field>
      </Group>
    </Frame>
  );
}
