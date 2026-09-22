import { useState } from 'react';
import { Select, Field, Group } from '@misterbeardy/design-system';

export function InAField() {
  const [unit, setUnit] = useState('mi');
  return (
    <div style={{ background: 'var(--bg)', padding: 20, borderRadius: 16, maxWidth: 420 }}>
      <Group header="Units">
        <Field label="Distance unit">
          <Select value={unit} onChange={setUnit} options={[{ value: 'mi', label: 'Miles' }, { value: 'km', label: 'Kilometres' }]} />
        </Field>
      </Group>
    </div>
  );
}

export function OnItsOwn() {
  const [sort, setSort] = useState('');
  return (
    <div style={{ maxWidth: 320 }}>
      <Select aria-label="Sort" placeholder="Sort by" value={sort} onChange={setSort} options={['Newest', 'Longest', 'Most expensive']} />
    </div>
  );
}
