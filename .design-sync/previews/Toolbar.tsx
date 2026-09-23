import { useState } from 'react';
import { Toolbar, Segmented, Button, Icon, Chip } from '@misterbeardy/design-system';

const RANGES = [{ value: '30d', label: '30 days' }, { value: '1y', label: 'Year' }, { value: 'all', label: 'All' }];

// A phone-width content column: the toolbar has vertical padding only, so it
// lines up with whatever the column holds.
const Column = ({ children }: { children: any }) => (
  <div style={{ width: 358, padding: '0 16px', background: 'var(--bg)' }}>{children}</div>
);

export function RangeAndSearch() {
  const [range, setRange] = useState('30d');
  return (
    <Column>
      <Toolbar label="Filter trips">
        <Segmented label="Range" options={RANGES} value={range} onChange={setRange} size="sm" style={{ flex: 1 }} />
        <Button variant="ghost" size="sm" aria-label="Search"><Icon name="search" /></Button>
      </Toolbar>
    </Column>
  );
}

// More filters than fit scroll sideways; the half-visible chip at the edge
// says there's more.
export function MoreThanFit() {
  const [range, setRange] = useState('1y');
  return (
    <Column>
      <Toolbar label="Filter trips by range and tag">
        <Segmented label="Range" options={RANGES} value={range} onChange={setRange} size="sm" />
        <Chip tone="accent">Work</Chip>
        <Chip>Personal</Chip>
        <Chip>Errands</Chip>
        <Chip>Airport</Chip>
      </Toolbar>
    </Column>
  );
}
