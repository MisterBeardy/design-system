import { useState } from 'react';
import { Segmented } from '@misterbeardy/design-system';

export function Range() {
  const [v, setV] = useState('30d');
  return (
    <div style={{ maxWidth: 320 }}>
      <Segmented
        label="Range"
        value={v}
        onChange={setV}
        options={[
          { value: '30d', label: '30 days' },
          { value: '1y', label: 'Year' },
          { value: 'all', label: 'All time' },
        ]}
      />
    </div>
  );
}

export function WithSublabels() {
  const [v, setV] = useState('miles');
  return (
    <div style={{ maxWidth: 320 }}>
      <Segmented
        label="Units"
        value={v}
        onChange={setV}
        options={[
          { value: 'miles', label: 'Miles', sub: 'imperial' },
          { value: 'km', label: 'Kilometres', sub: 'metric' },
        ]}
      />
    </div>
  );
}

export function Small() {
  const [v, setV] = useState('map');
  return (
    <div style={{ maxWidth: 260 }}>
      <Segmented
        size="sm"
        label="View"
        value={v}
        onChange={setV}
        options={[
          { value: 'map', label: 'Map' },
          { value: 'list', label: 'List' },
        ]}
      />
    </div>
  );
}
