import { Group, StatStrip, Row } from '@misterbeardy/design-system';

const Frame = ({ children }: { children: any }) => (
  <div style={{ background: 'var(--bg)', padding: 22, borderRadius: 16, maxWidth: 440 }}>{children}</div>
);

export function YearSummary() {
  return (
    <Frame>
      <Group header="This year">
        <StatStrip
          stats={[
            { label: 'Miles', value: '12,480', accent: true },
            { label: 'Counties', value: '37' },
            { label: 'Charging', value: '$412', sub: '-8%', subTone: 'success' },
          ]}
        />
        <Row label="Every trip" chevron />
      </Group>
    </Frame>
  );
}

export function TwoUp() {
  return (
    <Frame>
      <Group header="Open quotes">
        <StatStrip
          stats={[
            { label: 'Value', value: '$128.40', accent: true },
            { label: 'Active', value: '3', sub: '+1', subTone: 'success' },
          ]}
        />
      </Group>
    </Frame>
  );
}
