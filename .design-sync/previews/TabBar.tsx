import { useState } from 'react';
import { TabBar, PageHeader, Toolbar, Segmented, Group, Row, Button, Icon } from '@misterbeardy/design-system';

const TABS = [
  { value: 'trips', label: 'Trips', icon: 'map' as const },
  { value: 'stats', label: 'Stats', icon: 'trophy' as const },
  { value: 'places', label: 'Places', icon: 'pin' as const },
  { value: 'settings', label: 'Settings', icon: 'calendar' as const },
];
const TRIPS = [
  ['Home to office', 'Today, 8:14', '12.4 mi'], ['Office to gym', 'Yesterday, 18:02', '3.1 mi'],
  ['Weekend coast run', 'Sat, 10:30', '86.0 mi'], ['Airport pickup', 'Thu, 21:45', '24.7 mi'],
  ['Ferry terminal', 'Mon, 7:05', '8.2 mi'], ['Client site', 'Sun, 14:20', '41.6 mi'],
];

// A whole screen, because the tab bar only means anything at the foot of one:
// the list runs under it, and the scroll area leaves --tabbar-height at the
// bottom so the last row can clear it.
const Phone = ({ children }: { children: any }) => (
  <div style={{ position: 'relative', width: 390, height: 480, overflow: 'hidden', borderRadius: 22,
    border: '1px solid var(--border)', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
    {children}
  </div>
);

export function OnAScreen() {
  const [tab, setTab] = useState('trips');
  const [range, setRange] = useState('30d');
  return (
    <Phone>
      <PageHeader title="Trips" sub="128 mi this month"
                  trailing={<Button variant="ghost" size="sm" aria-label="Add trip"><Icon name="plus" /></Button>} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px calc(var(--tabbar-height) + 8px)' }}>
        <Toolbar label="Filter trips">
          <Segmented label="Range" options={[{ value: '30d', label: '30 days' }, { value: '1y', label: 'Year' }, { value: 'all', label: 'All' }]}
                     value={range} onChange={setRange} size="sm" style={{ flex: 1 }} />
        </Toolbar>
        <Group header="Recent">
          {TRIPS.map(([label, sub, value]) => <Row key={label} label={label} sub={sub} value={value} chevron onClick={() => {}} />)}
        </Group>
      </div>
      <TabBar items={TABS} value={tab} onChange={setTab} fixed={false}
              style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }} />
    </Phone>
  );
}

// Opaque, for an app whose content behind it is busy enough to make the
// labels swim.
export function Solid() {
  const [tab, setTab] = useState('stats');
  return (
    <div style={{ width: 390, borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)' }}>
      <TabBar items={TABS} value={tab} onChange={setTab} solid fixed={false} />
    </div>
  );
}
