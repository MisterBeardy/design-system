import { useState } from 'react';
import { Popover, Button, Segmented, Checkbox, Group, Row, Icon } from '@misterbeardy/design-system';

const Frame = ({ children }: { children: any }) => (
  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', minHeight: 300, padding: 4 }}>{children}</div>
);

export function Filter() {
  const [open, setOpen] = useState(true);
  const [range, setRange] = useState('30d');
  const [unbilled, setUnbilled] = useState(true);
  return (
    <Frame>
      <Popover open={open} onClose={() => setOpen(false)} title="Filter trips"
               trigger={<Button variant="secondary" size="sm" onClick={() => setOpen(!open)}>Filter</Button>}>
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Segmented label="Range" value={range} onChange={setRange}
                     options={[{ value: '30d', label: '30 days' }, { value: '1y', label: 'Year' }, { value: 'all', label: 'All' }]} />
          <Checkbox label="Only unbilled" checked={unbilled} onChange={setUnbilled} />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="secondary" size="sm">Clear</Button>
            <Button size="sm">Apply</Button>
          </div>
        </div>
      </Popover>
    </Frame>
  );
}

export function AsAMenu() {
  const [open, setOpen] = useState(true);
  const [sort, setSort] = useState('Newest first');
  return (
    <Frame>
      <Popover open={open} onClose={() => setOpen(false)} label="Sort trips" width={210}
               trigger={<Button variant="secondary" size="sm" onClick={() => setOpen(!open)}>Sort</Button>}>
        <Group>
          {['Newest first', 'Longest first', 'Most expensive', 'Nearest'].map((o) => (
            <Row key={o} label={o} trailing={o === sort ? <Icon name="check" label="Selected" /> : undefined}
                 onClick={() => { setSort(o); setOpen(false); }} />
          ))}
        </Group>
      </Popover>
    </Frame>
  );
}
